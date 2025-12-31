import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ayurvedaMeditation from "@/assets/ayurveda-meditation.jpg";
import barefootWalking from "@/assets/barefoot-walking.jpg";
import junkFoodEffects from "@/assets/junk-food-effects.jpg";
import budgetHealthyEating from "@/assets/budget-healthy-eating.jpg";

const lifestyleGuides = [
  { 
    title: "Ayurveda & Daily Rituals", 
    image: ayurvedaMeditation, 
    description: "Ancient wisdom for modern wellness and daily routines.", 
    topics: [
      "Wake before sunrise for optimal health",
      "Start day with warm lemon water",
      "Practice oil pulling for 10-15 minutes",
      "Yoga asanas for 30 minutes",
      "Meditation for mental clarity",
      "Eat main meal at noon when digestion is strongest",
      "Light dinner before sunset",
      "Sleep by 10 PM for rejuvenation"
    ] 
  },
  { 
    title: "Barefoot Walking & Grounding", 
    image: barefootWalking, 
    description: "Natural therapy for diabetic & fatty liver patients.", 
    topics: [
      "Walk barefoot on grass 20-30 min daily",
      "Improves blood circulation significantly",
      "Helps regulate blood sugar levels",
      "Reduces inflammation and stress",
      "Best done on morning dew grass",
      "Strengthens foot muscles and posture",
      "Connects with Earth's natural energy",
      "Beneficial for sleep quality"
    ] 
  },
  { 
    title: "Dangers of Processed Foods", 
    image: junkFoodEffects, 
    description: "How junk food destroys your health silently.", 
    topics: [
      "Refined flour (maida) blocks nutrient absorption",
      "Deep-fried foods cause chronic inflammation",
      "Low-quality oils damage cell membranes",
      "Trans fats increase heart disease risk by 23%",
      "Artificial preservatives disrupt hormones",
      "Added sugars lead to fatty liver disease",
      "MSG affects brain function and appetite",
      "Processed meats linked to cancer"
    ] 
  },
  { 
    title: "Healthy Eating on a Budget", 
    image: budgetHealthyEating, 
    description: "Affordable nutrition strategies for everyone.", 
    topics: [
      "Buy seasonal produce for best prices",
      "Local grains: millets, bajra, jowar, brown rice",
      "Protein from dals, eggs, and legumes",
      "Cook at home to save 60% on food costs",
      "Grow herbs and greens in small spaces",
      "Buy in bulk during harvest season",
      "Meal prep on weekends to save time",
      "Freeze excess vegetables and fruits"
    ] 
  },
];

export const LifestyleSection = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Lifestyle & Wellness Guides
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Transform your life with ancient wisdom and modern wellness practices
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {lifestyleGuides.map((guide, index) => (
            <Card key={index} className="group hover-scale overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent"></div>
                <h3 className="absolute bottom-4 left-6 right-6 text-2xl font-bold text-foreground">
                  {guide.title}
                </h3>
              </div>
              <CardContent className="p-6 space-y-4">
                <p className="text-muted-foreground">{guide.description}</p>
                <div className="space-y-2">
                  <h4 className="font-semibold">Key Topics:</h4>
                  <ul className="grid grid-cols-1 gap-1">
                    {guide.topics.map((topic, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button variant="outline" className="w-full group/btn">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-smooth" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
