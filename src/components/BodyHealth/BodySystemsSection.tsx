import { Card, CardContent } from "@/components/ui/card";
import { Heart, Brain, Wind, Activity, Bone, Shield, Droplet, Eye, Ear, Smile, Fingerprint } from "lucide-react";

const bodySystemsGuide = [
  { 
    title: "Heart & Cardiovascular System", 
    icon: Heart, 
    color: "text-red-500", 
    description: "Keep your heart and blood vessels healthy naturally.", 
    tips: ["Eat pomegranate, beetroot, garlic daily", "30 min walking or cardio daily", "Reduce sodium intake below 2300mg", "Manage stress with meditation", "Avoid trans fats and processed foods", "Include omega-3 rich foods"], 
    ayurvedicRemedies: ["Arjuna bark tea for heart strength", "Turmeric milk (golden milk)", "Ashwagandha for stress", "Triphala for circulation"] 
  },
  { 
    title: "Lungs & Respiratory System", 
    icon: Wind, 
    color: "text-blue-500", 
    description: "Breathe better with proper lung care.", 
    tips: ["Practice pranayama and deep breathing", "Avoid pollution and smoke", "Stay hydrated for mucus clearance", "Exercise to increase lung capacity", "Maintain good posture for breathing", "Use air purifiers indoors"], 
    ayurvedicRemedies: ["Tulsi tea for respiratory health", "Steam inhalation with eucalyptus", "Ginger-honey for congestion", "Licorice root tea"] 
  },
  { 
    title: "Digestive System", 
    icon: Activity, 
    color: "text-yellow-600", 
    description: "Support optimal digestion and gut health.", 
    tips: ["Eat fiber-rich foods daily", "Include probiotics and fermented foods", "Avoid refined flour (maida)", "Drink warm water after meals", "Chew food thoroughly", "Don't eat late at night"], 
    ayurvedicRemedies: ["Triphala powder before bed", "Ginger tea after meals", "Cumin-coriander-fennel water", "Aloe vera juice morning"] 
  },
  { 
    title: "Brain & Nervous System", 
    icon: Brain, 
    color: "text-purple-500", 
    description: "Nourish your brain for peak mental performance.", 
    tips: ["Eat walnuts, almonds, fatty fish", "Get 7-8 hours quality sleep", "Meditate for 20 minutes daily", "Limit screen time before bed", "Learn new skills regularly", "Stay socially connected"], 
    ayurvedicRemedies: ["Brahmi for memory", "Ashwagandha for stress relief", "Shankhpushpi for focus", "Jatamansi for sleep"] 
  },
  { 
    title: "Bones & Skeletal System", 
    icon: Bone, 
    color: "text-gray-600", 
    description: "Keep bones and joints strong and flexible.", 
    tips: ["Calcium from milk, cheese, leafy greens", "Get sunlight for Vitamin D synthesis", "Weight-bearing exercises regularly", "Avoid excessive caffeine", "Include magnesium-rich foods", "Maintain healthy body weight"], 
    ayurvedicRemedies: ["Sesame oil self-massage (abhyanga)", "Moringa for bone density", "Shallaki for joint health", "Dashamoola for inflammation"] 
  },
  { 
    title: "Immune System", 
    icon: Shield, 
    color: "text-green-600", 
    description: "Strengthen your natural defense mechanisms.", 
    tips: ["Vitamin C rich citrus fruits", "Turmeric, ginger, garlic in diet", "7-8 hours sleep for immune repair", "Regular moderate exercise", "Manage stress effectively", "Stay hydrated"], 
    ayurvedicRemedies: ["Chyawanprash daily", "Giloy (Guduchi) juice", "Tulsi tea", "Amla (Indian gooseberry)"] 
  },
  { 
    title: "Kidneys & Urinary System", 
    icon: Droplet, 
    color: "text-cyan-500", 
    description: "Keep kidneys functioning optimally.", 
    tips: ["Drink 8-10 glasses water daily", "Limit sodium and processed foods", "Eat cranberries, cucumber, watermelon", "Avoid excessive protein intake", "Monitor blood pressure", "Limit alcohol consumption"], 
    ayurvedicRemedies: ["Punarnava for kidney health", "Coconut water for hydration", "Gokshura for urinary health", "Varun bark for stones"] 
  },
  { 
    title: "Eyes & Vision", 
    icon: Eye, 
    color: "text-indigo-500", 
    description: "Protect and enhance your eyesight.", 
    tips: ["Carrots, spinach, sweet potatoes for Vitamin A", "Follow 20-20-20 rule for screens", "Wear sunglasses outdoors", "Get regular eye checkups", "Adequate sleep for eye rest", "Omega-3 for dry eyes"], 
    ayurvedicRemedies: ["Triphala eye wash", "Almond oil around eyes", "Netra Basti treatment", "Ghee in diet for lubrication"] 
  },
  { 
    title: "Ears & Hearing", 
    icon: Ear, 
    color: "text-orange-500", 
    description: "Maintain healthy hearing throughout life.", 
    tips: ["Avoid loud noises above 85 decibels", "Don't use cotton swabs inside ears", "Keep ears dry after swimming", "Regular hearing checkups after 50", "Treat infections promptly", "Reduce headphone volume"], 
    ayurvedicRemedies: ["Warm mustard oil drops", "Bilva oil for ear health", "Garlic oil for infections", "Sesame oil massage around ears"] 
  },
  { 
    title: "Skin & Integumentary System", 
    icon: Fingerprint, 
    color: "text-pink-500", 
    description: "Achieve healthy, glowing skin naturally.", 
    tips: ["Stay hydrated for skin elasticity", "Eat antioxidant-rich berries", "Use sunscreen daily", "Get adequate sleep", "Avoid harsh chemicals", "Exercise for blood circulation"], 
    ayurvedicRemedies: ["Neem for skin purification", "Aloe vera gel topically", "Kumkumadi oil for glow", "Manjistha for blood purification"] 
  },
  { 
    title: "Oral Health & Teeth", 
    icon: Smile, 
    color: "text-teal-500", 
    description: "Maintain strong teeth and healthy gums.", 
    tips: ["Brush twice daily with fluoride", "Floss daily", "Limit sugary foods and drinks", "Visit dentist every 6 months", "Chew sugar-free gum", "Drink water after meals"], 
    ayurvedicRemedies: ["Oil pulling with coconut oil", "Neem twigs for brushing", "Clove for toothache", "Turmeric and salt for gums"] 
  },
];

export const BodySystemsSection = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-10 h-10 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold gradient-text">
              Complete Body Systems Health Guide
            </h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tips and Ayurvedic remedies for every body system
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bodySystemsGuide.map((system, index) => (
            <Card key={index} className="hover-scale">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-full bg-secondary`}>
                    <system.icon className={`w-8 h-8 ${system.color}`} />
                  </div>
                  <h3 className="font-bold text-lg">{system.title}</h3>
                </div>
                
                <p className="text-sm text-muted-foreground">{system.description}</p>
                
                <div>
                  <h4 className="font-semibold text-sm mb-2">Health Tips:</h4>
                  <ul className="space-y-1">
                    {system.tips.map((tip, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-1">
                        <span className="text-primary mt-0.5">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-3 border-t border-border">
                  <h4 className="font-semibold text-xs mb-2 text-primary">Ayurvedic Remedies:</h4>
                  <div className="space-y-1">
                    {system.ayurvedicRemedies.map((remedy, i) => (
                      <p key={i} className="text-xs text-muted-foreground flex items-start gap-1">
                        <span className="text-green-500">✓</span> {remedy}
                      </p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
