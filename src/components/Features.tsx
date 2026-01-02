import { Leaf, Users, Brain, CheckCircle, Video, Shield } from "lucide-react";
import remediesImage from "@/assets/remedies-feature.jpg";
import communityImage from "@/assets/community-feature.jpg";
import aiNutritionImage from "@/assets/ai-nutrition.jpg";
import expertArticlesImage from "@/assets/expert-articles.jpg";
import wellnessLearningImage from "@/assets/wellness-learning.jpg";
import preventiveHealthImage from "@/assets/preventive-health.jpg";

const features = [
  {
    icon: Leaf,
    title: "Verified Home Remedies",
    description: "Natural cures using kitchen ingredients like turmeric, black pepper, and garlic — backed by research and traditional wisdom.",
    image: remediesImage,
  },
  {
    icon: Users,
    title: "Community Stories",
    description: "Real people sharing personal experiences about managing health conditions and reducing medical expenses.",
    image: communityImage,
  },
  {
    icon: Brain,
    title: "AI Nutrition Tracking",
    description: "Upload meal photos and get instant insights on vitamins, minerals, calories, and nutritional value.",
    image: aiNutritionImage,
  },
  {
    icon: Shield,
    title: "Expert-Verified Articles",
    description: "Doctors and researchers publish verified medical and nutritional information you can trust.",
    image: expertArticlesImage,
  },
  {
    icon: Video,
    title: "Wellness Learning Hub",
    description: "Video lessons, health articles, and awareness programs to educate and empower your wellness journey.",
    image: wellnessLearningImage,
  },
  {
    icon: CheckCircle,
    title: "Preventive Care Focus",
    description: "Learn to prevent health issues before they start with proper nutrition and lifestyle guidance.",
    image: preventiveHealthImage,
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 md:py-32 gradient-soft">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="mb-6 text-foreground">What We Offer</h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Everything you need to take control of your health and wellness journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-card rounded-2xl overflow-hidden shadow-soft hover-lift hover-glow group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {feature.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                    />
                    <div className="absolute inset-0 gradient-accent opacity-20 group-hover:opacity-30 transition-smooth"></div>
                  </div>
                )}
                <div className="p-8">
                  <div className="w-14 h-14 gradient-vibrant rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-bounce shadow-soft">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
