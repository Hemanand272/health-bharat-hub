import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wheat } from "lucide-react";

const grainsData = [
  // Dry Fruits & Nuts
  { id: "46", name: "Almonds", category: "Dry Fruit", season: ["all"], calories_per_100g: 579, protein_per_100g: 21.2, carbs_per_100g: 21.6, fiber_per_100g: 12.5, fats_per_100g: 49.9, benefits: ["Heart health", "Brain function", "Weight management", "Vitamin E rich"], best_time_to_eat: "Morning (soaked overnight)" },
  { id: "47", name: "Walnuts", category: "Dry Fruit", season: ["all"], calories_per_100g: 654, protein_per_100g: 15.2, carbs_per_100g: 13.7, fiber_per_100g: 6.7, fats_per_100g: 65.2, benefits: ["Brain health", "Omega-3 fatty acids", "Heart health", "Anti-inflammatory"], best_time_to_eat: "Morning or evening" },
  { id: "48", name: "Cashews", category: "Dry Fruit", season: ["all"], calories_per_100g: 553, protein_per_100g: 18.2, carbs_per_100g: 30.2, fiber_per_100g: 3.3, fats_per_100g: 43.9, benefits: ["Heart health", "Bone health", "Energy boost", "Copper rich"], best_time_to_eat: "Morning or snack" },
  { id: "49", name: "Pistachios", category: "Dry Fruit", season: ["all"], calories_per_100g: 560, protein_per_100g: 20.2, carbs_per_100g: 27.2, fiber_per_100g: 10.6, fats_per_100g: 45.3, benefits: ["Eye health", "Weight management", "Heart health", "Antioxidants"], best_time_to_eat: "Evening snack" },
  { id: "50", name: "Dates", category: "Dry Fruit", season: ["all"], calories_per_100g: 277, protein_per_100g: 1.8, carbs_per_100g: 75, fiber_per_100g: 6.7, fats_per_100g: 0.2, benefits: ["Energy boost", "Digestive health", "Bone health", "Natural sweetener"], best_time_to_eat: "Morning or pre-workout" },
  { id: "51", name: "Raisins", category: "Dry Fruit", season: ["all"], calories_per_100g: 299, protein_per_100g: 3.1, carbs_per_100g: 79.2, fiber_per_100g: 3.7, fats_per_100g: 0.5, benefits: ["Iron rich", "Digestive health", "Bone health", "Energy boost"], best_time_to_eat: "Morning (soaked)" },
  { id: "52", name: "Figs (Dry)", category: "Dry Fruit", season: ["all"], calories_per_100g: 249, protein_per_100g: 3.3, carbs_per_100g: 63.9, fiber_per_100g: 9.8, fats_per_100g: 0.9, benefits: ["Digestive health", "Bone health", "Heart health", "Antioxidants"], best_time_to_eat: "Morning (soaked)" },
  { id: "53", name: "Brazil Nuts", category: "Dry Fruit", season: ["all"], calories_per_100g: 656, protein_per_100g: 14.3, carbs_per_100g: 11.7, fiber_per_100g: 7.5, fats_per_100g: 66.4, benefits: ["Selenium rich", "Thyroid health", "Brain health", "Antioxidants"], best_time_to_eat: "Morning (1-2 nuts only)" },
  { id: "54", name: "Pumpkin Seeds", category: "Dry Fruit", season: ["all"], calories_per_100g: 446, protein_per_100g: 18.6, carbs_per_100g: 53.8, fiber_per_100g: 18.4, fats_per_100g: 19, benefits: ["Prostate health", "Heart health", "Sleep improvement", "Magnesium rich"], best_time_to_eat: "Evening snack" },
  // Grains & Legumes
  { id: "55", name: "Rice (White)", category: "Grain", season: ["all"], calories_per_100g: 130, protein_per_100g: 2.7, carbs_per_100g: 28.2, fiber_per_100g: 0.4, fats_per_100g: 0.3, benefits: ["Energy source", "Easy to digest", "Gluten-free", "Quick fuel"], best_time_to_eat: "Lunch or dinner" },
  { id: "56", name: "Brown Rice", category: "Grain", season: ["all"], calories_per_100g: 111, protein_per_100g: 2.6, carbs_per_100g: 23, fiber_per_100g: 1.8, fats_per_100g: 0.9, benefits: ["Weight management", "Heart health", "Digestive health", "Blood sugar control"], best_time_to_eat: "Lunch" },
  { id: "57", name: "Quinoa", category: "Grain", season: ["all"], calories_per_100g: 120, protein_per_100g: 4.4, carbs_per_100g: 21.3, fiber_per_100g: 2.8, fats_per_100g: 1.9, benefits: ["Complete protein", "Gluten-free", "Mineral rich", "Weight management"], best_time_to_eat: "Lunch or dinner" },
  { id: "58", name: "Oats", category: "Grain", season: ["all"], calories_per_100g: 389, protein_per_100g: 16.9, carbs_per_100g: 66.3, fiber_per_100g: 10.6, fats_per_100g: 6.9, benefits: ["Heart health", "Cholesterol control", "Sustained energy", "Digestive health"], best_time_to_eat: "Breakfast" },
  { id: "59", name: "Whole Wheat", category: "Grain", season: ["all"], calories_per_100g: 340, protein_per_100g: 13.2, carbs_per_100g: 71.2, fiber_per_100g: 12.2, fats_per_100g: 2.5, benefits: ["Digestive health", "Heart health", "Energy sustain", "Nutrient rich"], best_time_to_eat: "Breakfast or lunch" },
  { id: "60", name: "Lentils (Dal)", category: "Legume", season: ["all"], calories_per_100g: 116, protein_per_100g: 9, carbs_per_100g: 20.1, fiber_per_100g: 7.9, fats_per_100g: 0.4, benefits: ["Protein rich", "Iron source", "Heart health", "Blood sugar control"], best_time_to_eat: "Lunch" },
  { id: "61", name: "Chickpeas", category: "Legume", season: ["all"], calories_per_100g: 164, protein_per_100g: 8.9, carbs_per_100g: 27.4, fiber_per_100g: 7.6, fats_per_100g: 2.6, benefits: ["Protein rich", "Digestive health", "Weight management", "Blood sugar control"], best_time_to_eat: "Lunch or evening" },
  { id: "62", name: "Barley", category: "Grain", season: ["all"], calories_per_100g: 354, protein_per_100g: 12.5, carbs_per_100g: 73.5, fiber_per_100g: 17.3, fats_per_100g: 2.3, benefits: ["Heart health", "Digestive health", "Blood sugar control", "Weight loss"], best_time_to_eat: "Lunch" },
  { id: "63", name: "Millet (Bajra)", category: "Grain", season: ["all"], calories_per_100g: 378, protein_per_100g: 11, carbs_per_100g: 72.9, fiber_per_100g: 8.5, fats_per_100g: 4.2, benefits: ["Heart health", "Diabetes control", "Gluten-free", "Weight loss"], best_time_to_eat: "Lunch or dinner" },
  { id: "64", name: "Flax Seeds", category: "Seed", season: ["all"], calories_per_100g: 534, protein_per_100g: 18.3, carbs_per_100g: 28.9, fiber_per_100g: 27.3, fats_per_100g: 42.2, benefits: ["Omega-3 rich", "Heart health", "Digestive health", "Hormone balance"], best_time_to_eat: "Morning" },
];

export const GrainsSection = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Wheat className="w-10 h-10 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold gradient-text">
              Grains, Nuts & Seeds Benefits
            </h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover the power of whole grains, dry fruits, nuts, and seeds for optimal health
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {grainsData.map((item) => (
            <Card key={item.id} className="hover-scale overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Wheat className="w-6 h-6 text-primary" />
                    <h3 className="font-bold text-lg">{item.name}</h3>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {item.category}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs mb-4 bg-secondary/50 rounded-lg p-3">
                  <div><span className="text-muted-foreground">Calories:</span> {item.calories_per_100g}</div>
                  <div><span className="text-muted-foreground">Protein:</span> {item.protein_per_100g}g</div>
                  <div><span className="text-muted-foreground">Carbs:</span> {item.carbs_per_100g}g</div>
                  <div><span className="text-muted-foreground">Fiber:</span> {item.fiber_per_100g}g</div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Health Benefits:</h4>
                  <ul className="space-y-1">
                    {item.benefits.map((benefit, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                        <span className="text-primary">✓</span> {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Best time:</span> {item.best_time_to_eat}
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
