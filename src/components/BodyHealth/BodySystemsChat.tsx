import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { 
  Send, Loader2, Sparkles, Brain, Heart, 
  Activity, Eye, Ear, Bone, Dna
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
    { icon: Brain, label: "Nervous System", color: "text-purple-500" },
    { icon: Heart, label: "Cardiovascular", color: "text-red-500" },
    { icon: Activity, label: "Respiratory", color: "text-blue-500" },
    { icon: Dna, label: "Immune System", color: "text-green-500" },
  ];

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI Body Health Guide</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 gradient-text">
            Body Systems Guide
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ask questions about how your body works, organ functions, symptoms, and when to seek medical attention.
          </p>
        </div>

        {/* Body System Icons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {bodySystemIcons.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-secondary/30 border border-border text-center">
              <item.icon className={`w-8 h-8 ${item.color} mx-auto mb-2`} />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Conversation History */}
        {conversationHistory.length > 0 && (
          <div className="space-y-4 mb-8">
            {conversationHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-4 ${
                    msg.type === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && response && (
              <div className="flex justify-start">
                <div className="max-w-[85%] rounded-2xl p-4 bg-secondary text-secondary-foreground">
                  <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                    {response}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Suggested Questions */}
        {conversationHistory.length === 0 && (
          <div className="grid grid-cols-2 gap-3 mb-8">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => setQuery(q)}
                className="p-3 text-sm text-left bg-secondary/50 hover:bg-secondary rounded-xl transition-colors border border-border"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input Area */}
        <Card className="p-4 shadow-lg border-2 border-border/50">
          <div className="flex items-end gap-3">
            <Textarea
              placeholder="Ask about body systems, organ functions, symptoms..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-[48px] max-h-32 resize-none"
              disabled={isLoading}
            />
            <Button
              onClick={askQuestion}
              disabled={isLoading || !query.trim()}
              className="shrink-0 h-12 w-12"
              size="icon"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Get instant answers about how your body works and health concerns
          </p>
        </Card>
      </div>
    </section>
  );
};
