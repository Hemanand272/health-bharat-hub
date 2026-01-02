import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { image, query } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const messages: any[] = [
      {
        role: "system",
        content: `You are an expert nutritionist and food analyst. When given an image of food, analyze it and provide:
1. **Food Identification**: What food items are visible
2. **Nutritional Information**: Estimated calories, protein, carbs, fats, fiber per serving
3. **Health Benefits**: Key vitamins, minerals, and health benefits
4. **Dietary Information**: Whether it's vegetarian, vegan, gluten-free, etc.
5. **Tips**: Best time to eat, combinations to enhance nutrition, or any precautions

If no image is provided, answer the nutrition-related question directly with helpful, accurate information.
Format your response in a clear, organized manner using markdown.`
      }
    ];

    if (image) {
      messages.push({
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: {
              url: image
            }
          },
          {
            type: "text",
            text: query || "Analyze this food image and provide nutritional information, health benefits, and any relevant dietary tips."
          }
        ]
      });
    } else {
      messages.push({
        role: "user",
        content: query || "What are some healthy food choices?"
      });
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages,
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI analysis failed" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("analyze-food error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
