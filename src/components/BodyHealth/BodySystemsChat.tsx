import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { 
  Send, Loader2, Sparkles, Brain, Heart, 
  Activity, Dna
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const BodySystemsChat = () => {
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [conversationHistory, setConversationHistory] = useState<Array<{
    type: "user" | "assistant";
    content: string;
  }>>([]);
  const { toast } = useToast();

  const askQuestion = async () => {
    if (!query.trim()) {
      toast({
        title: "Please enter a question",
        description: "Type a question about body systems or organ functions",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResponse("");

    const userMessage = { type: "user" as const, content: query };
    setConversationHistory(prev => [...prev, userMessage]);

    try {
      const resp = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/health-assistant`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({ query, type: "body-systems" }),
        }
      );

      if (!resp.ok) {
        const errorData = await resp.json();
        throw new Error(errorData.error || "Request failed");
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
    } catch (error: any) {
      toast({
        title: "Request failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      askQuestion();
    }
  };

  const suggestedQuestions = [
    "How does the digestive system work?",
    "What are signs of heart problems?",
    "How to maintain brain health?",
    "What does the liver do?",
  ];

  const bodySystemIcons = [
    { icon: Brain, label: "Nervous", color: "text-purple-500" },
    { icon: Heart, label: "Heart", color: "text-red-500" },
    { icon: Activity, label: "Respiratory", color: "text-blue-500" },
    { icon: Dna, label: "Immune", color: "text-green-500" },
  ];

  return (
    <section className="py-6 md:py-16 lg:py-24 min-h-[calc(100vh-5rem)]">
      <div className="container mx-auto px-3 md:px-4 max-w-4xl">
        <div className="text-center mb-4 md:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-primary/10 rounded-full text-primary mb-2 md:mb-4">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
            <span className="text-[10px] md:text-sm font-medium">AI Body Health Guide</span>
          </div>
          <h2 className="text-lg md:text-3xl lg:text-4xl font-bold mb-2 md:mb-3 gradient-text">
            Body Systems Guide
          </h2>
          <p className="text-[10px] md:text-base text-muted-foreground max-w-2xl mx-auto px-2">
            Ask questions about how your body works, organ functions, and when to seek medical attention.
          </p>
        </div>

        {/* Body System Icons */}
        <div className="grid grid-cols-4 gap-2 mb-4 md:mb-6">
          {bodySystemIcons.map((item, idx) => (
            <div key={idx} className="p-2 md:p-3 rounded-xl bg-secondary/30 border border-border text-center">
              <item.icon className={`w-5 h-5 md:w-7 md:h-7 ${item.color} mx-auto mb-1`} />
              <span className="text-[9px] md:text-xs font-medium">{item.label}</span>
            </div>
          ))}
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
                  <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap text-xs md:text-sm">
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && response && (
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
          <div className="flex items-end gap-2">
            <Textarea
              placeholder="Ask about body systems..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-[36px] md:min-h-[44px] max-h-20 md:max-h-28 resize-none text-xs md:text-sm"
              disabled={isLoading}
            />
            <Button
              onClick={askQuestion}
              disabled={isLoading || !query.trim()}
              className="shrink-0 h-9 w-9 md:h-11 md:w-11"
              size="icon"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
          <p className="text-[8px] md:text-[10px] text-muted-foreground mt-1.5 md:mt-2 text-center">
            Get instant answers about how your body works
          </p>
        </Card>
      </div>
    </section>
  );
};