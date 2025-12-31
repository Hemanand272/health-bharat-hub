import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Apple } from "lucide-react";

const fruitsData = [
  { id: "26", name: "Banana", season: ["all"], calories_per_100g: 89, protein_per_100g: 1.1, carbs_per_100g: 22.8, fiber_per_100g: 2.6, fats_per_100g: 0.3, benefits: ["Quick energy", "Potassium rich", "Digestive health", "Mood boost"], best_time_to_eat: "Morning or post-workout" },
  { id: "27", name: "Apple", season: ["autumn", "winter"], calories_per_100g: 52, protein_per_100g: 0.3, carbs_per_100g: 13.8, fiber_per_100g: 2.4, fats_per_100g: 0.2, benefits: ["Heart health", "Weight loss", "Digestive health", "Brain health"], best_time_to_eat: "Morning or evening snack" },
  { id: "28", name: "Mango", season: ["summer"], calories_per_100g: 60, protein_per_100g: 0.8, carbs_per_100g: 15, fiber_per_100g: 1.6, fats_per_100g: 0.4, benefits: ["Immunity boost", "Eye health", "Digestive support", "Skin glow"], best_time_to_eat: "Morning or afternoon" },
  { id: "29", name: "Orange", season: ["winter"], calories_per_100g: 47, protein_per_100g: 0.9, carbs_per_100g: 11.8, fiber_per_100g: 2.4, fats_per_100g: 0.1, benefits: ["Vitamin C rich", "Immunity boost", "Skin health", "Heart health"], best_time_to_eat: "Morning or evening" },
  { id: "30", name: "Watermelon", season: ["summer"], calories_per_100g: 30, protein_per_100g: 0.6, carbs_per_100g: 7.6, fiber_per_100g: 0.4, fats_per_100g: 0.2, benefits: ["Hydration", "Heart health", "Muscle recovery", "Skin health"], best_time_to_eat: "Morning or afternoon" },
  { id: "31", name: "Papaya", season: ["all"], calories_per_100g: 43, protein_per_100g: 0.5, carbs_per_100g: 10.8, fiber_per_100g: 1.7, fats_per_100g: 0.3, benefits: ["Digestive enzyme", "Anti-inflammatory", "Skin health", "Immunity boost"], best_time_to_eat: "Morning (empty stomach)" },
  { id: "32", name: "Pomegranate", season: ["winter"], calories_per_100g: 83, protein_per_100g: 1.7, carbs_per_100g: 18.7, fiber_per_100g: 4, fats_per_100g: 1.2, benefits: ["Heart health", "Anti-inflammatory", "Memory boost", "Antioxidant rich"], best_time_to_eat: "Morning or evening" },
  { id: "33", name: "Grapes", season: ["summer", "autumn"], calories_per_100g: 69, protein_per_100g: 0.7, carbs_per_100g: 18.1, fiber_per_100g: 0.9, fats_per_100g: 0.2, benefits: ["Heart health", "Brain health", "Eye health", "Anti-aging"], best_time_to_eat: "Morning or snack" },
  { id: "34", name: "Pineapple", season: ["summer"], calories_per_100g: 50, protein_per_100g: 0.5, carbs_per_100g: 13.1, fiber_per_100g: 1.4, fats_per_100g: 0.1, benefits: ["Digestive enzymes", "Anti-inflammatory", "Immunity boost", "Bone health"], best_time_to_eat: "Morning or post-meal" },
  { id: "35", name: "Strawberry", season: ["winter", "spring"], calories_per_100g: 32, protein_per_100g: 0.7, carbs_per_100g: 7.7, fiber_per_100g: 2, fats_per_100g: 0.3, benefits: ["Heart health", "Blood sugar control", "Brain health", "Anti-inflammatory"], best_time_to_eat: "Morning or snack" },
  { id: "36", name: "Kiwi", season: ["winter"], calories_per_100g: 61, protein_per_100g: 1.1, carbs_per_100g: 14.7, fiber_per_100g: 3, fats_per_100g: 0.5, benefits: ["Vitamin C boost", "Digestive health", "Sleep improvement", "Immunity"], best_time_to_eat: "Morning or before bed" },
  { id: "37", name: "Guava", season: ["winter"], calories_per_100g: 68, protein_per_100g: 2.6, carbs_per_100g: 14.3, fiber_per_100g: 5.4, fats_per_100g: 1, benefits: ["Immunity boost", "Digestive health", "Blood sugar control", "Weight loss"], best_time_to_eat: "Evening snack" },
  { id: "38", name: "Avocado", season: ["all"], calories_per_100g: 160, protein_per_100g: 2, carbs_per_100g: 8.5, fiber_per_100g: 6.7, fats_per_100g: 14.7, benefits: ["Heart health", "Brain health", "Healthy fats", "Nutrient absorption"], best_time_to_eat: "Breakfast or lunch" },
  { id: "39", name: "Blueberry", season: ["summer"], calories_per_100g: 57, protein_per_100g: 0.7, carbs_per_100g: 14.5, fiber_per_100g: 2.4, fats_per_100g: 0.3, benefits: ["Brain health", "Heart health", "Anti-aging", "Antioxidant powerhouse"], best_time_to_eat: "Morning or snack" },
  { id: "40", name: "Lychee", season: ["summer"], calories_per_100g: 66, protein_per_100g: 0.8, carbs_per_100g: 16.5, fiber_per_100g: 1.3, fats_per_100g: 0.4, benefits: ["Vitamin C rich", "Skin health", "Digestive aid", "Immunity boost"], best_time_to_eat: "Afternoon snack" },
  { id: "41", name: "Dragon Fruit", season: ["summer"], calories_per_100g: 60, protein_per_100g: 1.2, carbs_per_100g: 13, fiber_per_100g: 3, fats_per_100g: 0, benefits: ["Antioxidants", "Digestive health", "Blood sugar control", "Iron rich"], best_time_to_eat: "Morning or evening" },
  { id: "42", name: "Peach", season: ["summer"], calories_per_100g: 39, protein_per_100g: 0.9, carbs_per_100g: 9.5, fiber_per_100g: 1.5, fats_per_100g: 0.3, benefits: ["Skin health", "Digestive support", "Eye health", "Heart health"], best_time_to_eat: "Morning or snack" },
  { id: "43", name: "Plum", season: ["summer"], calories_per_100g: 46, protein_per_100g: 0.7, carbs_per_100g: 11.4, fiber_per_100g: 1.4, fats_per_100g: 0.3, benefits: ["Bone health", "Digestive health", "Antioxidants", "Heart health"], best_time_to_eat: "Evening snack" },
  { id: "44", name: "Cherry", season: ["summer"], calories_per_100g: 50, protein_per_100g: 1, carbs_per_100g: 12.2, fiber_per_100g: 1.6, fats_per_100g: 0.3, benefits: ["Sleep improvement", "Anti-inflammatory", "Exercise recovery", "Brain health"], best_time_to_eat: "Evening or post-workout" },
  { id: "45", name: "Coconut", season: ["all"], calories_per_100g: 354, protein_per_100g: 3.3, carbs_per_100g: 15.2, fiber_per_100g: 9, fats_per_100g: 33.5, benefits: ["Energy boost", "Heart health", "Brain health", "Hydration"], best_time_to_eat: "Morning (coconut water)" },
];

export const FruitsSection = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Apple className="w-10 h-10 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold gradient-text">
              Fruits Nutritional Benefits
            </h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the amazing health benefits of fruits from around the world
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {fruitsData.map((fruit) => (
            <Card key={fruit.id} className="hover-scale overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Apple className="w-6 h-6 text-primary" />
                  <h3 className="font-bold text-lg">{fruit.name}</h3>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {fruit.season.map((s) => (
                    <Badge key={s} variant="secondary" className="text-xs capitalize">
                      {s === "all" ? "Year-round" : s}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs mb-4 bg-secondary/50 rounded-lg p-3">
                  <div><span className="text-muted-foreground">Calories:</span> {fruit.calories_per_100g}</div>
                  <div><span className="text-muted-foreground">Protein:</span> {fruit.protein_per_100g}g</div>
                  <div><span className="text-muted-foreground">Carbs:</span> {fruit.carbs_per_100g}g</div>
                  <div><span className="text-muted-foreground">Fiber:</span> {fruit.fiber_per_100g}g</div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Health Benefits:</h4>
                  <ul className="space-y-1">
                    {fruit.benefits.map((benefit, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                        <span className="text-primary">✓</span> {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Best time:</span> {fruit.best_time_to_eat}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
