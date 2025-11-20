import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Brain, Wind, Activity, Bone, Shield, Droplet, Eye } from "lucide-react";
import ayurvedaMeditation from "@/assets/ayurveda-meditation.jpg";
import barefootWalking from "@/assets/barefoot-walking.jpg";
import junkFoodEffects from "@/assets/junk-food-effects.jpg";
import budgetHealthyEating from "@/assets/budget-healthy-eating.jpg";
import heartHealth from "@/assets/heart-health.jpg";

const bodySystemsGuide = [
  { title: "Heart & Blood", icon: Heart, color: "text-red-500", image: heartHealth, description: "Keep your cardiovascular system healthy naturally.", tips: ["Eat pomegranate, beetroot, garlic", "30 min daily walking", "Reduce salt intake", "Manage stress"], ayurvedicRemedies: ["Arjuna bark tea", "Turmeric milk"] },
  { title: "Lungs & Airways", icon: Wind, color: "text-blue-500", image: ayurvedaMeditation, description: "Breathe better with proper care.", tips: ["Practice pranayama daily", "Avoid pollution", "Eat ginger, turmeric, honey"], ayurvedicRemedies: ["Tulsi tea", "Steam with eucalyptus"] },
  { title: "Digestive System", icon: Activity, color: "text-yellow-600", image: budgetHealthyEating, description: "Support optimal digestion naturally.", tips: ["Fiber-rich foods", "Probiotics daily", "Avoid maida", "Warm water after meals"], ayurvedicRemedies: ["Triphala powder", "Ginger tea"] },
  { title: "Brain & Nerves", icon: Brain, color: "text-purple-500", image: ayurvedaMeditation, description: "Nourish your brain for peak performance.", tips: ["Walnuts, almonds", "7-8 hours sleep", "Meditation", "Limit screen time"], ayurvedicRemedies: ["Brahmi", "Ashwagandha"] },
  { title: "Bones & Muscles", icon: Bone, color: "text-gray-600", image: barefootWalking, description: "Keep bones and muscles strong.", tips: ["Calcium from milk, greens", "Sunlight for Vitamin D", "Protein daily", "Exercise regularly"], ayurvedicRemedies: ["Sesame oil massage", "Moringa"] },
  { title: "Immune System", icon: Shield, color: "text-green-600", image: ayurvedaMeditation, description: "Strengthen natural defense.", tips: ["Vitamin C foods", "Turmeric, ginger, garlic", "Adequate sleep", "Exercise"], ayurvedicRemedies: ["Chyawanprash", "Giloy juice", "Tulsi tea"] },
  { title: "Kidneys & Bladder", icon: Droplet, color: "text-cyan-500", image: budgetHealthyEating, description: "Keep kidneys healthy.", tips: ["8-10 glasses water", "Limit salt", "Cranberries, cucumber"], ayurvedicRemedies: ["Punarnava", "Coconut water"] },
  { title: "Eyes & Ears", icon: Eye, color: "text-indigo-500", image: ayurvedaMeditation, description: "Protect your senses.", tips: ["Carrots, spinach, almonds", "20-20-20 rule", "Avoid loud noises"], ayurvedicRemedies: ["Triphala eye wash", "Almond oil"] },
];

const lifestyleGuides = [
  { title: "Ayurveda & Meditation", image: ayurvedaMeditation, description: "Ancient wisdom for modern wellness.", topics: ["Wake before sunrise", "Warm lemon water", "Oil pulling", "Yoga 30 min", "Meditation daily"] },
  { title: "Barefoot Walking", image: barefootWalking, description: "Grounding for diabetic & fatty liver patients.", topics: ["Walk barefoot 20-30 min", "Improves circulation", "Regulates blood sugar", "Reduces stress", "Best on morning grass"] },
  { title: "Dangers of Junk Food", image: junkFoodEffects, description: "How processed foods destroy health.", topics: ["Maida blocks nutrients", "Deep-fried causes inflammation", "Low-quality oils damage cells", "Trans fats harm heart", "Preservatives disrupt hormones"] },
  { title: "Healthy Eating on Budget", image: budgetHealthyEating, description: "Affordable nutrition for all.", topics: ["Buy seasonal produce", "Local grains: millets, brown rice", "Protein from dals, eggs", "Cook at home", "Grow herbs"] },
];

export const HealthEducation = () => {
  return (
    <section id="health-education" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">
            Complete Body Systems Health Guide
          </h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive guides for every organ system - ancient Ayurveda meets modern science
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center">Body Systems & How to Keep Them Healthy</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bodySystemsGuide.map((system, index) => (
              <Card key={index} className="hover-scale">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <system.icon className={`w-8 h-8 ${system.color}`} />
                    <h4 className="font-bold">{system.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">{system.description}</p>
                  <div>
                    <h5 className="font-semibold text-sm mb-2">Tips:</h5>
                    <ul className="space-y-1">
                      {system.tips.map((tip, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex gap-1">
                          <span className="text-primary">•</span>{tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="pt-2 border-t">
                    <h5 className="font-semibold text-xs mb-1">Ayurvedic:</h5>
                    {system.ayurvedicRemedies.map((r, i) => (
                      <p key={i} className="text-xs text-muted-foreground">✓ {r}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-8 text-center">Lifestyle & Wellness</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {lifestyleGuides.map((guide, index) => (
            <Card key={index} className="group hover-scale overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent"></div>
                <h3 className="absolute bottom-4 left-6 right-6 text-2xl font-bold text-foreground">
                  {guide.title}
                </h3>
              </div>
              <CardContent className="p-6 space-y-4">
                <p className="text-muted-foreground">{guide.description}</p>
                <div className="space-y-2">
                  <h4 className="font-semibold">Key Topics:</h4>
                  <ul className="space-y-1">
                    {guide.topics.map((item, idx) => (
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
      </div>
    </section>
  );
};