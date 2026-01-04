import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { 
  ImagePlus, Send, Loader2, X, Sparkles, Apple, 
  Utensils, Leaf
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const NutritionAnalyzer = () => {
  const [query, setQuery] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [response, setResponse] = useState("");
  const [conversationHistory, setConversationHistory] = useState<Array<{
    type: "user" | "assistant";
    content: string;
    image?: string;
  }>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Image too large",
          description: "Please upload an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImage(base64);
        setImagePreview(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const analyzeFood = async () => {
    if (!query.trim() && !image) {
      toast({
        title: "Please add a query or image",
        description: "Type a question or upload a food image to analyze",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    setResponse("");

    const userMessage = {
      type: "user" as const,
      content: query || "Analyze this food image",
      image: imagePreview || undefined,
    };
    setConversationHistory(prev => [...prev, userMessage]);

    try {
      const resp = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-food`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ image, query }),
        }
      );

      if (!resp.ok) {
        const errorData = await resp.json();
        throw new Error(errorData.error || "Analysis failed");
      }

      if (!resp.body) throw new Error("No response body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let assistantResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        textBuffer += decoder.decode(value, { stream: true });
        
        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantResponse += content;
              setResponse(assistantResponse);
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      setConversationHistory(prev => [...prev, {
        type: "assistant",
        content: assistantResponse,
      }]);

      setQuery("");
      removeImage();
    } catch (error: any) {
      toast({
        title: "Analysis failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      analyzeFood();
    }
  };

  const suggestedQuestions = [
    "What are the health benefits of spinach?",
    "Best foods for muscle building",
    "High protein vegetarian foods",
    "Foods to boost immunity",
  ];

  return (
    <section id="nutrition-analyzer" className="py-6 md:py-16 lg:py-24 min-h-[calc(100vh-5rem)]">
      <div className="container mx-auto px-3 md:px-4 max-w-4xl">
        <div className="text-center mb-4 md:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-primary/10 rounded-full text-primary mb-2 md:mb-4">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
            <span className="text-[10px] md:text-sm font-medium">AI-Powered Nutrition Analysis</span>
          </div>
          <h2 className="text-lg md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3 gradient-text">
            Analyze Your Food
          </h2>
          <p className="text-[10px] md:text-base text-muted-foreground max-w-2xl mx-auto px-2">
            Upload a photo of your meal or ask any nutrition question for instant AI-powered analysis.
          </p>
        </div>

        {/* Conversation History */}
        {conversationHistory.length > 0 && (
          <div className="space-y-2 md:space-y-4 mb-4 md:mb-6 max-h-[40vh] md:max-h-[50vh] overflow-y-auto scrollbar-hide">
            {conversationHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] md:max-w-[80%] rounded-2xl p-2.5 md:p-4 ${
                    msg.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="Food"
                      className="rounded-lg mb-2 max-h-24 md:max-h-40 object-cover"
                    />
                  )}
                  <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap text-xs md:text-sm">
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            
            {isAnalyzing && response && (
              <div className="flex justify-start">
                <div className="max-w-[85%] md:max-w-[80%] rounded-2xl p-2.5 md:p-4 bg-secondary text-secondary-foreground">
                  <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap text-xs md:text-sm">
                    {response}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Suggested Questions */}
        {conversationHistory.length === 0 && (
          <div className="grid grid-cols-2 gap-2 mb-4 md:mb-6">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => setQuery(q)}
                className="p-2 md:p-3 text-[10px] md:text-sm text-left bg-secondary/50 hover:bg-secondary rounded-xl transition-colors border border-border"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input Area with Cyberpunk Neon */}
        <Card className="p-2.5 md:p-4 shadow-lg neon-border">
          {/* Image Preview */}
          {imagePreview && (
            <div className="relative inline-block mb-2 md:mb-3">
              <img
                src={imagePreview}
                alt="Upload preview"
                className="max-h-20 md:max-h-28 rounded-lg object-cover"
              />
              <button
                onClick={removeImage}
                className="absolute -top-1.5 -right-1.5 p-0.5 md:p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          )}

          <div className="flex items-end gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              className="shrink-0 h-9 w-9 md:h-11 md:w-11"
              disabled={isAnalyzing}
            >
              <ImagePlus className="w-4 h-4" />
            </Button>

            <Textarea
              placeholder="Ask about nutrition..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-[36px] md:min-h-[44px] max-h-20 md:max-h-28 resize-none text-xs md:text-sm"
              disabled={isAnalyzing}
            />

            <Button
              onClick={analyzeFood}
              disabled={isAnalyzing || (!query.trim() && !image)}
              className="shrink-0 h-9 w-9 md:h-11 md:w-11"
              size="icon"
            >
              {isAnalyzing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>

          <p className="text-[8px] md:text-[10px] text-muted-foreground mt-1.5 md:mt-2 text-center">
            Upload food images or ask nutrition questions
          </p>
        </Card>

        {/* Feature Cards */}
        <div className="grid grid-cols-3 gap-2 md:gap-3 mt-4 md:mt-8">
          <div className="p-2 md:p-3 rounded-xl bg-secondary/30 border border-border text-center">
            <Apple className="w-5 h-5 md:w-7 md:h-7 text-primary mx-auto mb-1" />
            <h3 className="font-semibold text-[10px] md:text-sm">Food Recognition</h3>
            <p className="text-[8px] md:text-xs text-muted-foreground hidden sm:block">
              Identify foods instantly
            </p>
          </div>
          <div className="p-2 md:p-3 rounded-xl bg-secondary/30 border border-border text-center">
            <Utensils className="w-5 h-5 md:w-7 md:h-7 text-primary mx-auto mb-1" />
            <h3 className="font-semibold text-[10px] md:text-sm">Nutrition Data</h3>
            <p className="text-[8px] md:text-xs text-muted-foreground hidden sm:block">
              Get calories & macros
            </p>
          </div>
          <div className="p-2 md:p-3 rounded-xl bg-secondary/30 border border-border text-center">
            <Leaf className="w-5 h-5 md:w-7 md:h-7 text-primary mx-auto mb-1" />
            <h3 className="font-semibold text-[10px] md:text-sm">Health Tips</h3>
            <p className="text-[8px] md:text-xs text-muted-foreground hidden sm:block">
              Dietary recommendations
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};