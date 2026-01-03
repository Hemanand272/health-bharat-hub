import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { 
  ImagePlus, Send, Loader2, X, Sparkles, Apple, 
  Utensils, Leaf, Info
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

    // Add user message to history
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

      // Add assistant response to history
      setConversationHistory(prev => [...prev, {
        type: "assistant",
        content: assistantResponse,
      }]);

      // Clear inputs after successful analysis
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
    <section id="nutrition-analyzer" className="py-8 md:py-20 lg:py-32">
      <div className="container mx-auto px-3 md:px-4 max-w-4xl">
        <div className="text-center mb-6 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 bg-primary/10 rounded-full text-primary mb-3 md:mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs md:text-sm font-medium">AI-Powered Nutrition Analysis</span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 gradient-text">
            Analyze Your Food
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            Upload a photo of your meal or ask any nutrition question. Get instant AI-powered analysis with detailed nutritional information.
          </p>
        </div>

        {/* Conversation History */}
        {conversationHistory.length > 0 && (
          <div className="space-y-3 md:space-y-4 mb-6 md:mb-8 max-h-[50vh] md:max-h-[60vh] overflow-y-auto">
            {conversationHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[90%] md:max-w-[85%] rounded-2xl p-3 md:p-4 ${
                    msg.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="Food"
                      className="rounded-lg mb-2 md:mb-3 max-h-32 md:max-h-48 object-cover"
                    />
                  )}
                  <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap text-sm md:text-base">
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Current streaming response */}
            {isAnalyzing && response && (
              <div className="flex justify-start">
                <div className="max-w-[90%] md:max-w-[85%] rounded-2xl p-3 md:p-4 bg-secondary text-secondary-foreground">
                  <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap text-sm md:text-base">
                    {response}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Suggested Questions */}
        {conversationHistory.length === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 mb-6 md:mb-8">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => setQuery(q)}
                className="p-3 text-xs md:text-sm text-left bg-secondary/50 hover:bg-secondary rounded-xl transition-colors border border-border"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input Area */}
        <Card className="p-3 md:p-4 shadow-lg border-2 border-border/50">
          {/* Image Preview */}
          {imagePreview && (
            <div className="relative inline-block mb-3 md:mb-4">
              <img
                src={imagePreview}
                alt="Upload preview"
                className="max-h-24 md:max-h-32 rounded-lg object-cover"
              />
              <button
                onClick={removeImage}
                className="absolute -top-2 -right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
              >
                <X className="w-3 h-3 md:w-4 md:h-4" />
              </button>
            </div>
          )}

          <div className="flex items-end gap-2 md:gap-3">
            {/* Image Upload Button */}
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
              className="shrink-0 h-10 w-10 md:h-12 md:w-12"
              disabled={isAnalyzing}
            >
              <ImagePlus className="w-4 h-4 md:w-5 md:h-5" />
            </Button>

            {/* Text Input */}
            <Textarea
              placeholder="Ask about nutrition or describe your meal..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-[40px] md:min-h-[48px] max-h-24 md:max-h-32 resize-none text-sm md:text-base"
              disabled={isAnalyzing}
            />

            {/* Send Button */}
            <Button
              onClick={analyzeFood}
              disabled={isAnalyzing || (!query.trim() && !image)}
              className="shrink-0 h-10 w-10 md:h-12 md:w-12"
              size="icon"
            >
              {isAnalyzing ? (
                <Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" />
              ) : (
                <Send className="w-4 h-4 md:w-5 md:h-5" />
              )}
            </Button>
          </div>

          <p className="text-[10px] md:text-xs text-muted-foreground mt-2 md:mt-3 text-center">
            Upload food images or ask nutrition questions for instant AI analysis
          </p>
        </Card>

        {/* Feature Cards */}
        <div className="grid grid-cols-3 gap-2 md:gap-4 mt-8 md:mt-12">
          <div className="p-3 md:p-4 rounded-xl bg-secondary/30 border border-border text-center">
            <Apple className="w-6 h-6 md:w-8 md:h-8 text-primary mx-auto mb-1 md:mb-2" />
            <h3 className="font-semibold text-xs md:text-base mb-0.5 md:mb-1">Food Recognition</h3>
            <p className="text-[10px] md:text-sm text-muted-foreground hidden sm:block">
              Identify foods from photos instantly
            </p>
          </div>
          <div className="p-3 md:p-4 rounded-xl bg-secondary/30 border border-border text-center">
            <Utensils className="w-6 h-6 md:w-8 md:h-8 text-primary mx-auto mb-1 md:mb-2" />
            <h3 className="font-semibold text-xs md:text-base mb-0.5 md:mb-1">Nutrition Data</h3>
            <p className="text-[10px] md:text-sm text-muted-foreground hidden sm:block">
              Get calories, macros & micronutrients
            </p>
          </div>
          <div className="p-3 md:p-4 rounded-xl bg-secondary/30 border border-border text-center">
            <Leaf className="w-6 h-6 md:w-8 md:h-8 text-primary mx-auto mb-1 md:mb-2" />
            <h3 className="font-semibold text-xs md:text-base mb-0.5 md:mb-1">Health Tips</h3>
            <p className="text-[10px] md:text-sm text-muted-foreground hidden sm:block">
              Personalized dietary recommendations
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
