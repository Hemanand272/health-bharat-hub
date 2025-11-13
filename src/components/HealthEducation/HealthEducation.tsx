import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import ayurvedaMeditation from "@/assets/ayurveda-meditation.jpg";
import barefootWalking from "@/assets/barefoot-walking.jpg";
import junkFoodEffects from "@/assets/junk-food-effects.jpg";
import budgetHealthyEating from "@/assets/budget-healthy-eating.jpg";
import heartHealth from "@/assets/heart-health.jpg";

const educationTopics = [
  {
    title: "Ayurveda & Meditation",
    image: ayurvedaMeditation,
    description: "Discover ancient wisdom of Ayurveda combined with modern meditation practices. Learn daily routines, dosha balancing, and mindfulness techniques for holistic wellness.",
    topics: [
      "Ayurvedic daily routine (Dinacharya)",
      "Meditation for stress relief",
      "Dosha identification and balancing",
      "Digestive health practices",
      "Best times for water consumption"
    ]
  },
  {
    title: "Barefoot Walking Benefits",
    image: barefootWalking,
    description: "Especially beneficial for diabetic and fatty liver patients. Connect with nature and improve your health through grounding techniques.",
    topics: [
      "Benefits for diabetic patients",
      "Fatty liver management",
      "Improved blood circulation",
      "Natural foot pressure points",
      "Morning routine practices"
    ]
  },
  {
    title: "Understanding Junk Food Impact",
    image: junkFoodEffects,
    description: "Learn how deep fried foods, low-quality oils, and processed ingredients destroy your health and prevent nutrient absorption.",
    topics: [
      "Dangers of refined flour (maida)",
      "Low-quality oil effects",
      "Deep fried food impact",
      "Nutrient absorption blockers",
      "Inflammation and disease link"
    ]
  },
  {
    title: "Budget-Friendly Healthy Eating",
    image: budgetHealthyEating,
    description: "Affordable nutrition guide for Indian families. Learn to eat healthy without breaking the bank using seasonal ingredients.",
    topics: [
      "Seasonal vegetable benefits",
      "Cost-effective protein sources",
      "Meal planning on budget",
      "Local market shopping tips",
      "Traditional healthy recipes"
    ]
  },
  {
    title: "Heart Health & Blood Flow",
    image: heartHealth,
    description: "Comprehensive guide to improving cardiovascular health, blood circulation, and maintaining a healthy heart naturally.",
    topics: [
      "Foods for heart health",
      "Circulation improvement exercises",
      "Natural blood thinners",
      "Cholesterol management",
      "Stress and heart connection"
    ]
  }
];

export const HealthEducation = () => {
  return (
    <section id="health-education" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">
            Health Education Hub
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive guides combining ancient Ayurvedic wisdom with modern science for a healthier you
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {educationTopics.map((topic, index) => (
            <Card key={index} className="group hover-scale overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={topic.image}
                  alt={topic.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
                <h3 className="absolute bottom-4 left-6 right-6 text-2xl font-bold text-foreground">
                  {topic.title}
                </h3>
              </div>
              <CardContent className="p-6 space-y-4">
                <p className="text-muted-foreground">{topic.description}</p>
                <div className="space-y-2">
                  <h4 className="font-semibold">Key Topics:</h4>
                  <ul className="space-y-1">
                    {topic.topics.map((item, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{item}</span>
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