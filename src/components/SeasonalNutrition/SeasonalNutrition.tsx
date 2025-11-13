import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Apple, Leaf, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import seasonalNutrition from "@/assets/seasonal-nutrition.jpg";

// Sample data - in production this would come from the database
const sampleNutritionData = [
  {
    id: "1",
    name: "Carrot",
    category: "vegetable",
    season: ["winter", "spring"],
    calories_per_100g: 41,
    protein_per_100g: 0.9,
    carbs_per_100g: 9.6,
    fiber_per_100g: 2.8,
    fats_per_100g: 0.2,
    benefits: ["Improves vision", "Boosts immunity", "Supports heart health"],
    best_time_to_eat: "Morning or evening",
  },
  {
    id: "2",
    name: "Rice (white, cooked)",
    category: "grain",
    season: ["all"],
    calories_per_100g: 130,
    protein_per_100g: 2.7,
    carbs_per_100g: 28.2,
    fiber_per_100g: 0.4,
    fats_per_100g: 0.3,
    benefits: ["Energy source", "Easy to digest", "Gluten-free"],
    best_time_to_eat: "Lunch or dinner",
  },
  {
    id: "3",
    name: "Almonds",
    category: "dryfruit",
    season: ["all"],
    calories_per_100g: 579,
    protein_per_100g: 21.2,
    carbs_per_100g: 21.6,
    fiber_per_100g: 12.5,
    fats_per_100g: 49.9,
    benefits: ["Heart healthy", "Brain function", "Weight management"],
    best_time_to_eat: "Morning (soaked overnight)",
  },
  {
    id: "4",
    name: "Spinach",
    category: "vegetable",
    season: ["winter", "spring"],
    calories_per_100g: 23,
    protein_per_100g: 2.9,
    carbs_per_100g: 3.6,
    fiber_per_100g: 2.2,
    fats_per_100g: 0.4,
    benefits: ["Rich in iron", "Bone health", "Anti-inflammatory"],
    best_time_to_eat: "Lunch",
  },
  {
    id: "5",
    name: "Banana",
    category: "fruit",
    season: ["all"],
    calories_per_100g: 89,
    protein_per_100g: 1.1,
    carbs_per_100g: 22.8,
    fiber_per_100g: 2.6,
    fats_per_100g: 0.3,
    benefits: ["Quick energy", "Potassium rich", "Digestive health"],
    best_time_to_eat: "Morning or post-workout",
  },
];

export const SeasonalNutrition = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [filteredData, setFilteredData] = useState(sampleNutritionData);

  useEffect(() => {
    let filtered = sampleNutritionData;

    if (category !== "all") {
      filtered = filtered.filter(item => item.category === category);
    }

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filtered);
  }, [searchTerm, category]);

  return (
    <section id="seasonal-nutrition" className="py-20 md:py-32 gradient-soft">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">
            Seasonal Nutrition Database
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Search for vegetables, fruits, and grains to see their complete nutritional breakdown. 
            Learn what's in your food and plan your diet wisely.
          </p>
        </div>

        <div className="mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-2 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    placeholder="Search for food items (e.g., carrot, rice, almonds)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="vegetable">Vegetables</SelectItem>
                    <SelectItem value="fruit">Fruits</SelectItem>
                    <SelectItem value="dryfruit">Dry Fruits</SelectItem>
                    <SelectItem value="grain">Grains</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {filteredData.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No items found. Try a different search term.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((item) => (
              <Card key={item.id} className="hover-scale">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                      <Badge variant="secondary">
                        {item.category === "vegetable" && <Leaf className="w-3 h-3 mr-1" />}
                        {item.category === "fruit" && <Apple className="w-3 h-3 mr-1" />}
                        {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <h4 className="font-semibold text-primary">Nutritional Value (per 100g)</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex justify-between p-2 bg-secondary/50 rounded">
                        <span className="text-muted-foreground">Calories:</span>
                        <span className="font-medium">{item.calories_per_100g}</span>
                      </div>
                      <div className="flex justify-between p-2 bg-secondary/50 rounded">
                        <span className="text-muted-foreground">Protein:</span>
                        <span className="font-medium">{item.protein_per_100g}g</span>
                      </div>
                      <div className="flex justify-between p-2 bg-secondary/50 rounded">
                        <span className="text-muted-foreground">Carbs:</span>
                        <span className="font-medium">{item.carbs_per_100g}g</span>
                      </div>
                      <div className="flex justify-between p-2 bg-secondary/50 rounded">
                        <span className="text-muted-foreground">Fiber:</span>
                        <span className="font-medium">{item.fiber_per_100g}g</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Benefits:</h4>
                    <ul className="space-y-1">
                      {item.benefits.map((benefit, idx) => (
                        <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      <strong>Best time to eat:</strong> {item.best_time_to_eat}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            More foods coming soon! This database will help you track seasonal nutrition intake.
          </p>
        </div>
      </div>
    </section>
  );
};