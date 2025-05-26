
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const togetherApiKey = Deno.env.get('TOGETHER_AI_API_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!togetherApiKey) {
      throw new Error('TOGETHER_AI_API_KEY is not configured');
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      req.headers.get('Authorization')?.replace('Bearer ', '') || ''
    );

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { url } = await req.json();
    
    if (!url) {
      return new Response(JSON.stringify({ error: 'URL is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Analyzing URL: ${url}`);
    const startTime = Date.now();

    // Fetch the content from the URL
    let content = '';
    try {
      const response = await fetch(url);
      content = await response.text();
    } catch (error) {
      console.error('Failed to fetch URL content:', error);
      content = `URL analysis for: ${url}`;
    }

    // Analyze the content using Together AI
    const analysisResponse = await fetch('https://api.together.xyz/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${togetherApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an expert in detecting AI-generated content, deepfakes, and misinformation. Analyze the provided content for signs of artificial generation, manipulation, or synthetic media. Focus on linguistic patterns, consistency, and authenticity markers.'
          },
          {
            role: 'user',
            content: `Analyze this content from URL ${url} for potential deepfake, AI-generated text, or manipulated media. Content preview: ${content.substring(0, 2000)}... Provide a confidence score (0-100) and detailed analysis of any suspicious elements.`
          }
        ],
        max_tokens: 500,
        temperature: 0.2
      })
    });

    const analysisData = await analysisResponse.json();
    const analysis = analysisData.choices?.[0]?.message?.content || 'Analysis failed';
    
    // Extract confidence score
    const score = extractConfidenceScore(analysis);
    const isDeepfake = score > 60;
    const processingTime = Date.now() - startTime;

    const detectionResult = {
      score,
      isDeepfake,
      confidence: score > 75 ? 'high' : score > 50 ? 'medium' : 'low',
      details: {
        analysis,
        url,
        contentPreview: content.substring(0, 500),
        detectionType: 'url_analysis',
        modelUsed: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
        artifacts: extractArtifacts(analysis)
      }
    };

    // Save detection result to database
    const { data: savedResult, error: dbError } = await supabase
      .from('detection_results')
      .insert({
        user_id: user.id,
        file_name: `URL Analysis: ${new URL(url).hostname}`,
        file_url: url,
        detection_score: score,
        is_deepfake: isDeepfake,
        confidence_level: detectionResult.confidence,
        analysis_details: detectionResult.details,
        processing_time_ms: processingTime,
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to save detection result');
    }

    console.log(`URL analysis completed in ${processingTime}ms`);

    return new Response(JSON.stringify({
      id: savedResult.id,
      result: detectionResult,
      processingTime
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in analyze-url function:', error);
    return new Response(JSON.stringify({ 
      error: 'URL analysis failed', 
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function extractConfidenceScore(analysis: string): number {
  const scoreMatch = analysis.match(/(\d+)%|score[:\s]*(\d+)|confidence[:\s]*(\d+)/i);
  if (scoreMatch) {
    const score = parseInt(scoreMatch[1] || scoreMatch[2] || scoreMatch[3]);
    return Math.min(100, Math.max(0, score));
  }
  
  const manipulationKeywords = ['fake', 'artificial', 'generated', 'manipulated', 'synthetic', 'ai-generated'];
  const authenticKeywords = ['authentic', 'real', 'genuine', 'natural', 'human-written'];
  
  let score = 45; // baseline for URL content
  
  manipulationKeywords.forEach(keyword => {
    if (analysis.toLowerCase().includes(keyword)) {
      score += 12;
    }
  });
  
  authenticKeywords.forEach(keyword => {
    if (analysis.toLowerCase().includes(keyword)) {
      score -= 8;
    }
  });
  
  return Math.min(100, Math.max(0, score));
}

function extractArtifacts(analysis: string): string[] {
  const artifacts = [];
  const keywords = [
    'repetitive patterns', 'unnatural phrasing', 'statistical anomalies',
    'inconsistent style', 'generic language', 'formulaic structure',
    'lack of personality', 'artificial coherence'
  ];
  
  keywords.forEach(keyword => {
    if (analysis.toLowerCase().includes(keyword)) {
      artifacts.push(keyword);
    }
  });
  
  return artifacts.length > 0 ? artifacts : ['Content structure analysis'];
}
