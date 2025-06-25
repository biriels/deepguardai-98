
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-api-key',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

const togetherApiKey = Deno.env.get('TOGETHER_AI_API_KEY');

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!togetherApiKey) {
      throw new Error('TOGETHER_AI_API_KEY is not configured');
    }

    // For public API, we can accept an API key in headers for authentication
    const apiKey = req.headers.get('x-api-key');
    
    const { url } = await req.json();
    
    if (!url) {
      return new Response(JSON.stringify({ error: 'URL is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log(`Public API: Analyzing URL: ${url}`);
    const startTime = Date.now();

    // Fetch the content from the URL
    let content = '';
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'DeepGuard-Bot/1.0'
        }
      });
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
            content: 'You are an expert in detecting AI-generated content, deepfakes, and misinformation. Analyze the provided content for signs of artificial generation, manipulation, or synthetic media. Provide a confidence score from 0-100 where higher scores indicate more likely manipulation.'
          },
          {
            role: 'user',
            content: `Analyze this web content from ${url} for potential deepfake, AI-generated text, or manipulated media. Content: ${content.substring(0, 3000)}... Provide a confidence score (0-100) and brief analysis.`
          }
        ],
        max_tokens: 400,
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
        analysis: analysis.substring(0, 500), // Limit response size for extension
        url,
        detectionType: 'url_analysis',
        modelUsed: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
        processingTime: processingTime
      }
    };

    console.log(`Public URL analysis completed in ${processingTime}ms`);

    return new Response(JSON.stringify({
      success: true,
      result: detectionResult,
      processingTime,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in public analyze-url function:', error);
    return new Response(JSON.stringify({ 
      success: false,
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
  
  const manipulationKeywords = ['fake', 'artificial', 'generated', 'manipulated', 'synthetic', 'suspicious'];
  const authenticKeywords = ['authentic', 'real', 'genuine', 'natural', 'legitimate'];
  
  let score = 45;
  
  manipulationKeywords.forEach(keyword => {
    if (analysis.toLowerCase().includes(keyword)) {
      score += 12;
    }
  });
  
  authenticKeywords.forEach(keyword => {
    if (analysis.toLowerCase().includes(keyword)) {
      score -= 10;
    }
  });
  
  return Math.min(100, Math.max(0, score));
}
