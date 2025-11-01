import { Leaf, Users, Brain, CheckCircle, Video, Shield } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Verified Home Remedies",
    description: "Natural cures using kitchen ingredients like turmeric, black pepper, and garlic — backed by research and traditional wisdom.",
  },
  {
    icon: Users,
    title: "Community Stories",
    description: "Real people sharing personal experiences about managing health conditions and reducing medical expenses.",
  },
  {
    icon: Brain,
    title: "AI Nutrition Tracking",
    description: "Upload meal photos and get instant insights on vitamins, minerals, calories, and nutritional value.",
  },
  {
    icon: Shield,
    title: "Expert-Verified Articles",
    description: "Doctors and researchers publish verified medical and nutritional information you can trust.",
  },
  {
    icon: Video,
    title: "Wellness Learning Hub",
    description: "Video lessons, health articles, and awareness programs to educate and empower your wellness journey.",
  },
  {
    icon: CheckCircle,
    title: "Preventive Care Focus",
    description: "Learn to prevent health issues before they start with proper nutrition and lifestyle guidance.",
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
                className="bg-card rounded-2xl p-8 shadow-soft hover:shadow-medium transition-smooth group"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-bounce">
                  <Icon className="w-7 h-7 text-primary group-hover:text-white transition-smooth" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
