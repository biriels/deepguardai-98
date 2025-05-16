
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FeedbackButtonsProps {
  resultId?: string;
  onFeedback?: (type: "like" | "dislike") => void;
}

const FeedbackButtons = ({ resultId, onFeedback }: FeedbackButtonsProps) => {
  const [feedback, setFeedback] = useState<"like" | "dislike" | null>(null);
  const { toast } = useToast();

  const handleFeedback = (type: "like" | "dislike") => {
    // Don't allow changing feedback once submitted
    if (feedback !== null) return;
    
    setFeedback(type);
    
    // Send feedback to parent component if callback provided
    if (onFeedback) {
      onFeedback(type);
    }
    
    // Show a thank you toast
    toast({
      title: "Thank you for your feedback!",
      description: "Your input helps us improve our detection system."
    });
    
    // In a real app, you would send this to your backend
    console.log(`User feedback for result ${resultId || "unknown"}: ${type}`);
  };

  return (
    <div className="flex items-center gap-3 mt-4">
      <p className="text-sm text-muted-foreground">Was this analysis helpful?</p>
      <div className="flex gap-2">
        <Button 
          variant={feedback === "like" ? "default" : "outline"}
          size="sm"
          onClick={() => handleFeedback("like")}
          disabled={feedback !== null}
          className={feedback === "like" ? "bg-violet-600 hover:bg-violet-700" : ""}
        >
          <ThumbsUp className={`mr-1 h-4 w-4 ${feedback === "like" ? "text-white" : ""}`} />
          Helpful
        </Button>
        <Button 
          variant={feedback === "dislike" ? "default" : "outline"}
          size="sm"
          onClick={() => handleFeedback("dislike")}
          disabled={feedback !== null}
          className={feedback === "dislike" ? "bg-red-600 hover:bg-red-700" : ""}
        >
          <ThumbsDown className={`mr-1 h-4 w-4 ${feedback === "dislike" ? "text-white" : ""}`} />
          Not helpful
        </Button>
      </div>
    </div>
  );
};

export default FeedbackButtons;
