
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Copy, Bookmark, Code, Info } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const BookmarkletGenerator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const bookmarkletCode = `javascript:(function(){
    var deepguardPopup = document.getElementById('deepguard-popup');
    if (deepguardPopup) {
      deepguardPopup.remove();
      return;
    }
    
    var popup = document.createElement('div');
    popup.id = 'deepguard-popup';
    popup.style.cssText = 'position:fixed;top:20px;right:20px;width:320px;height:400px;background:white;border:2px solid #e2e8f0;border-radius:8px;box-shadow:0 10px 25px rgba(0,0,0,0.1);z-index:999999;font-family:system-ui,-apple-system,sans-serif;';
    
    popup.innerHTML = \`
      <div style="padding:16px;height:100%;display:flex;flex-direction:column;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
          <h3 style="margin:0;font-size:14px;font-weight:600;color:#1f2937;">🛡️ DeepGuard Detector</h3>
          <button onclick="document.getElementById('deepguard-popup').remove();" style="background:none;border:none;font-size:18px;cursor:pointer;color:#6b7280;">×</button>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;gap:12px;">
          <button id="analyze-page-btn" style="width:100%;padding:8px;background:#3b82f6;color:white;border:none;border-radius:4px;font-size:12px;cursor:pointer;">
            🌐 Analyze Current Page
          </button>
          <div style="display:flex;gap:8px;">
            <input id="url-input" type="url" placeholder="Enter URL to analyze..." style="flex:1;padding:6px;border:1px solid #d1d5db;border-radius:4px;font-size:12px;" />
            <button id="analyze-url-btn" style="padding:6px 12px;background:#10b981;color:white;border:none;border-radius:4px;font-size:12px;cursor:pointer;">Scan</button>
          </div>
          <div id="result-area" style="flex:1;padding:12px;background:#f9fafb;border-radius:4px;font-size:12px;overflow-y:auto;"></div>
          <div style="text-align:center;font-size:10px;color:#6b7280;padding-top:8px;border-top:1px solid #e5e7eb;">
            Powered by AI deepfake detection
          </div>
        </div>
      </div>
    \`;
    
    document.body.appendChild(popup);
    
    // Add event listeners
    document.getElementById('analyze-page-btn').onclick = function() {
      analyzeUrl(window.location.href);
    };
    
    document.getElementById('analyze-url-btn').onclick = function() {
      var url = document.getElementById('url-input').value;
      if (url) analyzeUrl(url);
    };
    
    async function analyzeUrl(url) {
      var resultArea = document.getElementById('result-area');
      resultArea.innerHTML = '<div style="text-align:center;padding:20px;">🔍 Analyzing...</div>';
      
      try {
        var response = await fetch('${window.location.origin}/api/analyze-url', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: url })
        });
        
        var data = await response.json();
        var confidence = data.result?.score || 0;
        var status = confidence >= 70 ? 'Likely Fake' : confidence >= 40 ? 'Suspicious' : 'Likely Authentic';
        var color = confidence >= 70 ? '#ef4444' : confidence >= 40 ? '#f59e0b' : '#10b981';
        
        resultArea.innerHTML = \`
          <div style="text-align:center;">
            <div style="font-weight:600;margin-bottom:8px;">Detection Result</div>
            <div style="padding:8px;background:\${color};color:white;border-radius:4px;margin-bottom:8px;font-size:11px;">
              \${status}
            </div>
            <div style="font-size:11px;color:#6b7280;">
              Confidence: \${confidence}%
            </div>
            \${confidence >= 40 ? '<div style="margin-top:8px;padding:6px;background:#fef3c7;color:#92400e;border-radius:4px;font-size:10px;">⚠️ May contain synthetic content</div>' : ''}
          </div>
        \`;
      } catch (error) {
        resultArea.innerHTML = '<div style="color:#ef4444;text-align:center;padding:20px;">❌ Analysis failed</div>';
      }
    }
  })();`;

  const copyBookmarklet = () => {
    navigator.clipboard.writeText(bookmarkletCode);
    setCopied(true);
    toast({
      title: "Bookmarklet Copied!",
      description: "Now create a new bookmark and paste this code as the URL"
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bookmark className="h-5 w-5" />
          Browser Bookmarklet
          <Badge variant="secondary">Chrome Extension Alternative</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
          <Info className="h-4 w-4 text-blue-600 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">How to install:</p>
            <ol className="list-decimal list-inside space-y-1 text-xs">
              <li>Copy the bookmarklet code below</li>
              <li>Create a new bookmark in your browser</li>
              <li>Paste the code as the bookmark URL</li>
              <li>Click the bookmark on any page to analyze it</li>
            </ol>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Bookmarklet Code:</label>
            <Button 
              onClick={copyBookmarklet}
              size="sm"
              variant="outline"
              className="h-8"
            >
              <Copy className="h-3 w-3 mr-2" />
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
          <Textarea
            value={bookmarkletCode}
            readOnly
            className="font-mono text-xs h-32 resize-none"
            placeholder="Bookmarklet code will appear here..."
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Code className="h-3 w-3" />
          This bookmarklet creates a popup similar to a Chrome extension
        </div>
      </CardContent>
    </Card>
  );
};

export default BookmarkletGenerator;
