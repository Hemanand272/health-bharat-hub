import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carrot } from "lucide-react";

const vegetablesData = [
  { id: "1", name: "Carrot", season: ["winter", "spring"], calories_per_100g: 41, protein_per_100g: 0.9, carbs_per_100g: 9.6, fiber_per_100g: 2.8, fats_per_100g: 0.2, benefits: ["Improves vision", "Boosts immunity", "Supports heart health", "Rich in Vitamin A"], best_time_to_eat: "Morning or evening" },
  { id: "2", name: "Spinach", season: ["winter", "spring"], calories_per_100g: 23, protein_per_100g: 2.9, carbs_per_100g: 3.6, fiber_per_100g: 2.2, fats_per_100g: 0.4, benefits: ["Rich in iron", "Bone health", "Anti-inflammatory", "Improves eye health"], best_time_to_eat: "Lunch" },
  { id: "3", name: "Broccoli", season: ["winter"], calories_per_100g: 34, protein_per_100g: 2.8, carbs_per_100g: 7, fiber_per_100g: 2.6, fats_per_100g: 0.4, benefits: ["Cancer prevention", "Heart health", "Digestive support", "Vitamin C rich"], best_time_to_eat: "Lunch or dinner" },
  { id: "4", name: "Tomato", season: ["all"], calories_per_100g: 18, protein_per_100g: 0.9, carbs_per_100g: 3.9, fiber_per_100g: 1.2, fats_per_100g: 0.2, benefits: ["Lycopene for heart", "Skin health", "Cancer prevention", "Rich in antioxidants"], best_time_to_eat: "Lunch or evening" },
  { id: "5", name: "Cucumber", season: ["summer"], calories_per_100g: 16, protein_per_100g: 0.7, carbs_per_100g: 3.6, fiber_per_100g: 0.5, fats_per_100g: 0.1, benefits: ["Hydration", "Cooling effect", "Weight loss", "Skin health"], best_time_to_eat: "Morning or summer afternoons" },
  { id: "6", name: "Beetroot", season: ["winter"], calories_per_100g: 43, protein_per_100g: 1.6, carbs_per_100g: 9.6, fiber_per_100g: 2.8, fats_per_100g: 0.2, benefits: ["Blood pressure control", "Athletic performance", "Brain health", "Liver detox"], best_time_to_eat: "Morning" },
  { id: "7", name: "Sweet Potato", season: ["winter"], calories_per_100g: 86, protein_per_100g: 1.6, carbs_per_100g: 20.1, fiber_per_100g: 3, fats_per_100g: 0.1, benefits: ["Energy boost", "Vitamin A rich", "Digestive health", "Blood sugar control"], best_time_to_eat: "Lunch" },
  { id: "8", name: "Bell Pepper", season: ["all"], calories_per_100g: 31, protein_per_100g: 1, carbs_per_100g: 6, fiber_per_100g: 2.1, fats_per_100g: 0.3, benefits: ["Vitamin C boost", "Eye health", "Metabolism support", "Anti-inflammatory"], best_time_to_eat: "Lunch or dinner" },
  { id: "9", name: "Cauliflower", season: ["winter"], calories_per_100g: 25, protein_per_100g: 1.9, carbs_per_100g: 5, fiber_per_100g: 2, fats_per_100g: 0.3, benefits: ["Brain health", "Detoxification", "Weight loss", "Anti-cancer"], best_time_to_eat: "Dinner" },
  { id: "10", name: "Kale", season: ["winter"], calories_per_100g: 35, protein_per_100g: 2.9, carbs_per_100g: 4.4, fiber_per_100g: 4.1, fats_per_100g: 1.5, benefits: ["Nutrient powerhouse", "Bone health", "Heart health", "Anti-inflammatory"], best_time_to_eat: "Lunch" },
  { id: "11", name: "Cabbage", season: ["winter"], calories_per_100g: 25, protein_per_100g: 1.3, carbs_per_100g: 5.8, fiber_per_100g: 2.5, fats_per_100g: 0.1, benefits: ["Digestive health", "Cancer prevention", "Vitamin K rich", "Weight loss"], best_time_to_eat: "Lunch or dinner" },
  { id: "12", name: "Eggplant", season: ["summer", "monsoon"], calories_per_100g: 25, protein_per_100g: 1, carbs_per_100g: 5.9, fiber_per_100g: 3, fats_per_100g: 0.2, benefits: ["Brain health", "Heart health", "Antioxidants", "Blood sugar control"], best_time_to_eat: "Dinner" },
  { id: "13", name: "Pumpkin", season: ["autumn", "winter"], calories_per_100g: 26, protein_per_100g: 1, carbs_per_100g: 6.5, fiber_per_100g: 0.5, fats_per_100g: 0.1, benefits: ["Eye health", "Immunity boost", "Skin health", "Weight loss"], best_time_to_eat: "Lunch or dinner" },
  { id: "14", name: "Zucchini", season: ["summer"], calories_per_100g: 17, protein_per_100g: 1.2, carbs_per_100g: 3.1, fiber_per_100g: 1, fats_per_100g: 0.3, benefits: ["Weight loss", "Heart health", "Digestion", "Eye health"], best_time_to_eat: "Dinner" },
  { id: "15", name: "Radish", season: ["winter"], calories_per_100g: 16, protein_per_100g: 0.7, carbs_per_100g: 3.4, fiber_per_100g: 1.6, fats_per_100g: 0.1, benefits: ["Liver detox", "Hydration", "Digestive aid", "Skin health"], best_time_to_eat: "Morning or lunch" },
  { id: "16", name: "Okra (Bhindi)", season: ["summer", "monsoon"], calories_per_100g: 33, protein_per_100g: 1.9, carbs_per_100g: 7.5, fiber_per_100g: 3.2, fats_per_100g: 0.2, benefits: ["Blood sugar control", "Digestive health", "Heart health", "Pregnancy health"], best_time_to_eat: "Lunch" },
  { id: "17", name: "Bottle Gourd (Lauki)", season: ["summer"], calories_per_100g: 14, protein_per_100g: 0.6, carbs_per_100g: 3.4, fiber_per_100g: 0.5, fats_per_100g: 0, benefits: ["Cooling effect", "Weight loss", "Heart health", "Liver health"], best_time_to_eat: "Dinner" },
  { id: "18", name: "Bitter Gourd (Karela)", season: ["summer", "monsoon"], calories_per_100g: 17, protein_per_100g: 1, carbs_per_100g: 3.7, fiber_per_100g: 2.8, fats_per_100g: 0.2, benefits: ["Diabetes control", "Blood purification", "Weight loss", "Immunity boost"], best_time_to_eat: "Morning (empty stomach)" },
  { id: "19", name: "Green Beans", season: ["all"], calories_per_100g: 31, protein_per_100g: 1.8, carbs_per_100g: 7, fiber_per_100g: 2.7, fats_per_100g: 0.2, benefits: ["Bone health", "Heart health", "Digestive support", "Vitamin K rich"], best_time_to_eat: "Lunch or dinner" },
  { id: "20", name: "Asparagus", season: ["spring"], calories_per_100g: 20, protein_per_100g: 2.2, carbs_per_100g: 3.9, fiber_per_100g: 2.1, fats_per_100g: 0.1, benefits: ["Digestive health", "Brain health", "Pregnancy support", "Anti-aging"], best_time_to_eat: "Lunch" },
  { id: "21", name: "Artichoke", season: ["spring"], calories_per_100g: 47, protein_per_100g: 3.3, carbs_per_100g: 10.5, fiber_per_100g: 5.4, fats_per_100g: 0.2, benefits: ["Liver health", "Digestive support", "Cholesterol control", "Antioxidants"], best_time_to_eat: "Lunch" },
  { id: "22", name: "Brussels Sprouts", season: ["winter"], calories_per_100g: 43, protein_per_100g: 3.4, carbs_per_100g: 9, fiber_per_100g: 3.8, fats_per_100g: 0.3, benefits: ["Cancer prevention", "Heart health", "Bone health", "Vitamin K rich"], best_time_to_eat: "Dinner" },
  { id: "23", name: "Celery", season: ["all"], calories_per_100g: 16, protein_per_100g: 0.7, carbs_per_100g: 3, fiber_per_100g: 1.6, fats_per_100g: 0.2, benefits: ["Hydration", "Anti-inflammatory", "Blood pressure", "Digestive aid"], best_time_to_eat: "Morning or snack" },
  { id: "24", name: "Leek", season: ["winter"], calories_per_100g: 61, protein_per_100g: 1.5, carbs_per_100g: 14.2, fiber_per_100g: 1.8, fats_per_100g: 0.3, benefits: ["Heart health", "Bone health", "Eye health", "Immunity"], best_time_to_eat: "Lunch or dinner" },
  { id: "25", name: "Bok Choy", season: ["all"], calories_per_100g: 13, protein_per_100g: 1.5, carbs_per_100g: 2.2, fiber_per_100g: 1, fats_per_100g: 0.2, benefits: ["Bone health", "Heart health", "Anti-inflammatory", "Low calorie"], best_time_to_eat: "Lunch or dinner" },
];

export const VegetablesSection = () => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Carrot className="w-10 h-10 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold gradient-text">
              Vegetables Nutritional Benefits
            </h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore the incredible health benefits of vegetables from around the world
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {vegetablesData.map((veg) => (
            <Card key={veg.id} className="hover-scale overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Carrot className="w-6 h-6 text-primary" />
                  <h3 className="font-bold text-lg">{veg.name}</h3>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {veg.season.map((s) => (
                    <Badge key={s} variant="secondary" className="text-xs capitalize">
                      {s === "all" ? "Year-round" : s}
                    </Badge>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs mb-4 bg-secondary/50 rounded-lg p-3">
                  <div><span className="text-muted-foreground">Calories:</span> {veg.calories_per_100g}</div>
                  <div><span className="text-muted-foreground">Protein:</span> {veg.protein_per_100g}g</div>
                  <div><span className="text-muted-foreground">Carbs:</span> {veg.carbs_per_100g}g</div>
                  <div><span className="text-muted-foreground">Fiber:</span> {veg.fiber_per_100g}g</div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold text-sm">Health Benefits:</h4>
                  <ul className="space-y-1">
                    {veg.benefits.map((benefit, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1">
                        <span className="text-primary">✓</span> {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-medium">Best time:</span> {veg.best_time_to_eat}
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
