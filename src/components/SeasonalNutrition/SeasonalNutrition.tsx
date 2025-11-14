import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Apple, Leaf, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import seasonalNutrition from "@/assets/seasonal-nutrition.jpg";

// Comprehensive global nutrition database
const nutritionDatabase = [
  // Vegetables
  { id: "1", name: "Carrot", category: "vegetable", season: ["winter", "spring"], calories_per_100g: 41, protein_per_100g: 0.9, carbs_per_100g: 9.6, fiber_per_100g: 2.8, fats_per_100g: 0.2, benefits: ["Improves vision", "Boosts immunity", "Supports heart health", "Rich in Vitamin A"], best_time_to_eat: "Morning or evening" },
  { id: "2", name: "Spinach", category: "vegetable", season: ["winter", "spring"], calories_per_100g: 23, protein_per_100g: 2.9, carbs_per_100g: 3.6, fiber_per_100g: 2.2, fats_per_100g: 0.4, benefits: ["Rich in iron", "Bone health", "Anti-inflammatory", "Improves eye health"], best_time_to_eat: "Lunch" },
  { id: "3", name: "Broccoli", category: "vegetable", season: ["winter"], calories_per_100g: 34, protein_per_100g: 2.8, carbs_per_100g: 7, fiber_per_100g: 2.6, fats_per_100g: 0.4, benefits: ["Cancer prevention", "Heart health", "Digestive support", "Vitamin C rich"], best_time_to_eat: "Lunch or dinner" },
  { id: "4", name: "Tomato", category: "vegetable", season: ["all"], calories_per_100g: 18, protein_per_100g: 0.9, carbs_per_100g: 3.9, fiber_per_100g: 1.2, fats_per_100g: 0.2, benefits: ["Lycopene for heart", "Skin health", "Cancer prevention", "Rich in antioxidants"], best_time_to_eat: "Lunch or evening" },
  { id: "5", name: "Cucumber", category: "vegetable", season: ["summer"], calories_per_100g: 16, protein_per_100g: 0.7, carbs_per_100g: 3.6, fiber_per_100g: 0.5, fats_per_100g: 0.1, benefits: ["Hydration", "Cooling effect", "Weight loss", "Skin health"], best_time_to_eat: "Morning or summer afternoons" },
  { id: "6", name: "Beetroot", category: "vegetable", season: ["winter"], calories_per_100g: 43, protein_per_100g: 1.6, carbs_per_100g: 9.6, fiber_per_100g: 2.8, fats_per_100g: 0.2, benefits: ["Blood pressure control", "Athletic performance", "Brain health", "Liver detox"], best_time_to_eat: "Morning" },
  { id: "7", name: "Sweet Potato", category: "vegetable", season: ["winter"], calories_per_100g: 86, protein_per_100g: 1.6, carbs_per_100g: 20.1, fiber_per_100g: 3, fats_per_100g: 0.1, benefits: ["Energy boost", "Vitamin A rich", "Digestive health", "Blood sugar control"], best_time_to_eat: "Lunch" },
  { id: "8", name: "Bell Pepper", category: "vegetable", season: ["all"], calories_per_100g: 31, protein_per_100g: 1, carbs_per_100g: 6, fiber_per_100g: 2.1, fats_per_100g: 0.3, benefits: ["Vitamin C boost", "Eye health", "Metabolism support", "Anti-inflammatory"], best_time_to_eat: "Lunch or dinner" },
  { id: "9", name: "Cauliflower", category: "vegetable", season: ["winter"], calories_per_100g: 25, protein_per_100g: 1.9, carbs_per_100g: 5, fiber_per_100g: 2, fats_per_100g: 0.3, benefits: ["Brain health", "Detoxification", "Weight loss", "Anti-cancer"], best_time_to_eat: "Dinner" },
  { id: "10", name: "Kale", category: "vegetable", season: ["winter"], calories_per_100g: 35, protein_per_100g: 2.9, carbs_per_100g: 4.4, fiber_per_100g: 4.1, fats_per_100g: 1.5, benefits: ["Nutrient powerhouse", "Bone health", "Heart health", "Anti-inflammatory"], best_time_to_eat: "Lunch" },
  { id: "11", name: "Cabbage", category: "vegetable", season: ["winter"], calories_per_100g: 25, protein_per_100g: 1.3, carbs_per_100g: 5.8, fiber_per_100g: 2.5, fats_per_100g: 0.1, benefits: ["Digestive health", "Cancer prevention", "Vitamin K rich", "Weight loss"], best_time_to_eat: "Lunch or dinner" },
  { id: "12", name: "Eggplant", category: "vegetable", season: ["summer", "monsoon"], calories_per_100g: 25, protein_per_100g: 1, carbs_per_100g: 5.9, fiber_per_100g: 3, fats_per_100g: 0.2, benefits: ["Brain health", "Heart health", "Antioxidants", "Blood sugar control"], best_time_to_eat: "Dinner" },
  { id: "13", name: "Pumpkin", category: "vegetable", season: ["autumn", "winter"], calories_per_100g: 26, protein_per_100g: 1, carbs_per_100g: 6.5, fiber_per_100g: 0.5, fats_per_100g: 0.1, benefits: ["Eye health", "Immunity boost", "Skin health", "Weight loss"], best_time_to_eat: "Lunch or dinner" },
  { id: "14", name: "Zucchini", category: "vegetable", season: ["summer"], calories_per_100g: 17, protein_per_100g: 1.2, carbs_per_100g: 3.1, fiber_per_100g: 1, fats_per_100g: 0.3, benefits: ["Weight loss", "Heart health", "Digestion", "Eye health"], best_time_to_eat: "Dinner" },
  { id: "15", name: "Radish", category: "vegetable", season: ["winter"], calories_per_100g: 16, protein_per_100g: 0.7, carbs_per_100g: 3.4, fiber_per_100g: 1.6, fats_per_100g: 0.1, benefits: ["Liver detox", "Hydration", "Digestive aid", "Skin health"], best_time_to_eat: "Morning or lunch" },
  { id: "16", name: "Okra (Bhindi)", category: "vegetable", season: ["summer", "monsoon"], calories_per_100g: 33, protein_per_100g: 1.9, carbs_per_100g: 7.5, fiber_per_100g: 3.2, fats_per_100g: 0.2, benefits: ["Blood sugar control", "Digestive health", "Heart health", "Pregnancy health"], best_time_to_eat: "Lunch" },
  { id: "17", name: "Bottle Gourd (Lauki)", category: "vegetable", season: ["summer"], calories_per_100g: 14, protein_per_100g: 0.6, carbs_per_100g: 3.4, fiber_per_100g: 0.5, fats_per_100g: 0, benefits: ["Cooling effect", "Weight loss", "Heart health", "Liver health"], best_time_to_eat: "Dinner" },
  { id: "18", name: "Bitter Gourd (Karela)", category: "vegetable", season: ["summer", "monsoon"], calories_per_100g: 17, protein_per_100g: 1, carbs_per_100g: 3.7, fiber_per_100g: 2.8, fats_per_100g: 0.2, benefits: ["Diabetes control", "Blood purification", "Weight loss", "Immunity boost"], best_time_to_eat: "Morning (empty stomach)" },
  { id: "19", name: "Green Beans", category: "vegetable", season: ["all"], calories_per_100g: 31, protein_per_100g: 1.8, carbs_per_100g: 7, fiber_per_100g: 2.7, fats_per_100g: 0.2, benefits: ["Bone health", "Heart health", "Digestive support", "Vitamin K rich"], best_time_to_eat: "Lunch or dinner" },
  { id: "20", name: "Asparagus", category: "vegetable", season: ["spring"], calories_per_100g: 20, protein_per_100g: 2.2, carbs_per_100g: 3.9, fiber_per_100g: 2.1, fats_per_100g: 0.1, benefits: ["Digestive health", "Brain health", "Pregnancy support", "Anti-aging"], best_time_to_eat: "Lunch" },
  { id: "21", name: "Artichoke", category: "vegetable", season: ["spring"], calories_per_100g: 47, protein_per_100g: 3.3, carbs_per_100g: 10.5, fiber_per_100g: 5.4, fats_per_100g: 0.2, benefits: ["Liver health", "Digestive support", "Cholesterol control", "Antioxidants"], best_time_to_eat: "Lunch" },
  { id: "22", name: "Brussels Sprouts", category: "vegetable", season: ["winter"], calories_per_100g: 43, protein_per_100g: 3.4, carbs_per_100g: 9, fiber_per_100g: 3.8, fats_per_100g: 0.3, benefits: ["Cancer prevention", "Heart health", "Bone health", "Vitamin K rich"], best_time_to_eat: "Dinner" },
  { id: "23", name: "Celery", category: "vegetable", season: ["all"], calories_per_100g: 16, protein_per_100g: 0.7, carbs_per_100g: 3, fiber_per_100g: 1.6, fats_per_100g: 0.2, benefits: ["Hydration", "Anti-inflammatory", "Blood pressure", "Digestive aid"], best_time_to_eat: "Morning or snack" },
  { id: "24", name: "Leek", category: "vegetable", season: ["winter"], calories_per_100g: 61, protein_per_100g: 1.5, carbs_per_100g: 14.2, fiber_per_100g: 1.8, fats_per_100g: 0.3, benefits: ["Heart health", "Bone health", "Eye health", "Immunity"], best_time_to_eat: "Lunch or dinner" },
  { id: "25", name: "Bok Choy", category: "vegetable", season: ["all"], calories_per_100g: 13, protein_per_100g: 1.5, carbs_per_100g: 2.2, fiber_per_100g: 1, fats_per_100g: 0.2, benefits: ["Bone health", "Heart health", "Anti-inflammatory", "Low calorie"], best_time_to_eat: "Lunch or dinner" },

  // Fruits
  { id: "26", name: "Banana", category: "fruit", season: ["all"], calories_per_100g: 89, protein_per_100g: 1.1, carbs_per_100g: 22.8, fiber_per_100g: 2.6, fats_per_100g: 0.3, benefits: ["Quick energy", "Potassium rich", "Digestive health", "Mood boost"], best_time_to_eat: "Morning or post-workout" },
  { id: "27", name: "Apple", category: "fruit", season: ["autumn", "winter"], calories_per_100g: 52, protein_per_100g: 0.3, carbs_per_100g: 13.8, fiber_per_100g: 2.4, fats_per_100g: 0.2, benefits: ["Heart health", "Weight loss", "Digestive health", "Brain health"], best_time_to_eat: "Morning or evening snack" },
  { id: "28", name: "Mango", category: "fruit", season: ["summer"], calories_per_100g: 60, protein_per_100g: 0.8, carbs_per_100g: 15, fiber_per_100g: 1.6, fats_per_100g: 0.4, benefits: ["Immunity boost", "Eye health", "Digestive support", "Skin glow"], best_time_to_eat: "Morning or afternoon" },
  { id: "29", name: "Orange", category: "fruit", season: ["winter"], calories_per_100g: 47, protein_per_100g: 0.9, carbs_per_100g: 11.8, fiber_per_100g: 2.4, fats_per_100g: 0.1, benefits: ["Vitamin C rich", "Immunity boost", "Skin health", "Heart health"], best_time_to_eat: "Morning or evening" },
  { id: "30", name: "Watermelon", category: "fruit", season: ["summer"], calories_per_100g: 30, protein_per_100g: 0.6, carbs_per_100g: 7.6, fiber_per_100g: 0.4, fats_per_100g: 0.2, benefits: ["Hydration", "Heart health", "Muscle recovery", "Skin health"], best_time_to_eat: "Morning or afternoon" },
  { id: "31", name: "Papaya", category: "fruit", season: ["all"], calories_per_100g: 43, protein_per_100g: 0.5, carbs_per_100g: 10.8, fiber_per_100g: 1.7, fats_per_100g: 0.3, benefits: ["Digestive enzyme", "Anti-inflammatory", "Skin health", "Immunity boost"], best_time_to_eat: "Morning (empty stomach)" },
  { id: "32", name: "Pomegranate", category: "fruit", season: ["winter"], calories_per_100g: 83, protein_per_100g: 1.7, carbs_per_100g: 18.7, fiber_per_100g: 4, fats_per_100g: 1.2, benefits: ["Heart health", "Anti-inflammatory", "Memory boost", "Antioxidant rich"], best_time_to_eat: "Morning or evening" },
  { id: "33", name: "Grapes", category: "fruit", season: ["summer", "autumn"], calories_per_100g: 69, protein_per_100g: 0.7, carbs_per_100g: 18.1, fiber_per_100g: 0.9, fats_per_100g: 0.2, benefits: ["Heart health", "Brain health", "Eye health", "Anti-aging"], best_time_to_eat: "Morning or snack" },
  { id: "34", name: "Pineapple", category: "fruit", season: ["summer"], calories_per_100g: 50, protein_per_100g: 0.5, carbs_per_100g: 13.1, fiber_per_100g: 1.4, fats_per_100g: 0.1, benefits: ["Digestive enzymes", "Anti-inflammatory", "Immunity boost", "Bone health"], best_time_to_eat: "Morning or post-meal" },
  { id: "35", name: "Strawberry", category: "fruit", season: ["winter", "spring"], calories_per_100g: 32, protein_per_100g: 0.7, carbs_per_100g: 7.7, fiber_per_100g: 2, fats_per_100g: 0.3, benefits: ["Heart health", "Blood sugar control", "Brain health", "Anti-inflammatory"], best_time_to_eat: "Morning or snack" },
  { id: "36", name: "Kiwi", category: "fruit", season: ["winter"], calories_per_100g: 61, protein_per_100g: 1.1, carbs_per_100g: 14.7, fiber_per_100g: 3, fats_per_100g: 0.5, benefits: ["Vitamin C boost", "Digestive health", "Sleep improvement", "Immunity"], best_time_to_eat: "Morning or before bed" },
  { id: "37", name: "Guava", category: "fruit", season: ["winter"], calories_per_100g: 68, protein_per_100g: 2.6, carbs_per_100g: 14.3, fiber_per_100g: 5.4, fats_per_100g: 1, benefits: ["Immunity boost", "Digestive health", "Blood sugar control", "Weight loss"], best_time_to_eat: "Evening snack" },
  { id: "38", name: "Avocado", category: "fruit", season: ["all"], calories_per_100g: 160, protein_per_100g: 2, carbs_per_100g: 8.5, fiber_per_100g: 6.7, fats_per_100g: 14.7, benefits: ["Heart health", "Brain health", "Healthy fats", "Nutrient absorption"], best_time_to_eat: "Breakfast or lunch" },
  { id: "39", name: "Blueberry", category: "fruit", season: ["summer"], calories_per_100g: 57, protein_per_100g: 0.7, carbs_per_100g: 14.5, fiber_per_100g: 2.4, fats_per_100g: 0.3, benefits: ["Brain health", "Heart health", "Anti-aging", "Antioxidant powerhouse"], best_time_to_eat: "Morning or snack" },
  { id: "40", name: "Lychee", category: "fruit", season: ["summer"], calories_per_100g: 66, protein_per_100g: 0.8, carbs_per_100g: 16.5, fiber_per_100g: 1.3, fats_per_100g: 0.4, benefits: ["Vitamin C rich", "Skin health", "Digestive aid", "Immunity boost"], best_time_to_eat: "Afternoon snack" },
  { id: "41", name: "Dragon Fruit", category: "fruit", season: ["summer"], calories_per_100g: 60, protein_per_100g: 1.2, carbs_per_100g: 13, fiber_per_100g: 3, fats_per_100g: 0, benefits: ["Antioxidants", "Digestive health", "Blood sugar control", "Iron rich"], best_time_to_eat: "Morning or evening" },
  { id: "42", name: "Peach", category: "fruit", season: ["summer"], calories_per_100g: 39, protein_per_100g: 0.9, carbs_per_100g: 9.5, fiber_per_100g: 1.5, fats_per_100g: 0.3, benefits: ["Skin health", "Digestive support", "Eye health", "Heart health"], best_time_to_eat: "Morning or snack" },
  { id: "43", name: "Plum", category: "fruit", season: ["summer"], calories_per_100g: 46, protein_per_100g: 0.7, carbs_per_100g: 11.4, fiber_per_100g: 1.4, fats_per_100g: 0.3, benefits: ["Bone health", "Digestive health", "Antioxidants", "Heart health"], best_time_to_eat: "Evening snack" },
  { id: "44", name: "Cherry", category: "fruit", season: ["summer"], calories_per_100g: 50, protein_per_100g: 1, carbs_per_100g: 12.2, fiber_per_100g: 1.6, fats_per_100g: 0.3, benefits: ["Sleep improvement", "Anti-inflammatory", "Exercise recovery", "Brain health"], best_time_to_eat: "Evening or post-workout" },
  { id: "45", name: "Coconut", category: "fruit", season: ["all"], calories_per_100g: 354, protein_per_100g: 3.3, carbs_per_100g: 15.2, fiber_per_100g: 9, fats_per_100g: 33.5, benefits: ["Energy boost", "Heart health", "Brain health", "Hydration"], best_time_to_eat: "Morning (coconut water)" },

  // Dry Fruits & Nuts
  { id: "46", name: "Almonds", category: "dryfruit", season: ["all"], calories_per_100g: 579, protein_per_100g: 21.2, carbs_per_100g: 21.6, fiber_per_100g: 12.5, fats_per_100g: 49.9, benefits: ["Heart health", "Brain function", "Weight management", "Vitamin E rich"], best_time_to_eat: "Morning (soaked overnight)" },
  { id: "47", name: "Walnuts", category: "dryfruit", season: ["all"], calories_per_100g: 654, protein_per_100g: 15.2, carbs_per_100g: 13.7, fiber_per_100g: 6.7, fats_per_100g: 65.2, benefits: ["Brain health", "Omega-3 fatty acids", "Heart health", "Anti-inflammatory"], best_time_to_eat: "Morning or evening" },
  { id: "48", name: "Cashews", category: "dryfruit", season: ["all"], calories_per_100g: 553, protein_per_100g: 18.2, carbs_per_100g: 30.2, fiber_per_100g: 3.3, fats_per_100g: 43.9, benefits: ["Heart health", "Bone health", "Energy boost", "Copper rich"], best_time_to_eat: "Morning or snack" },
  { id: "49", name: "Pistachios", category: "dryfruit", season: ["all"], calories_per_100g: 560, protein_per_100g: 20.2, carbs_per_100g: 27.2, fiber_per_100g: 10.6, fats_per_100g: 45.3, benefits: ["Eye health", "Weight management", "Heart health", "Antioxidants"], best_time_to_eat: "Evening snack" },
  { id: "50", name: "Dates", category: "dryfruit", season: ["all"], calories_per_100g: 277, protein_per_100g: 1.8, carbs_per_100g: 75, fiber_per_100g: 6.7, fats_per_100g: 0.2, benefits: ["Energy boost", "Digestive health", "Bone health", "Natural sweetener"], best_time_to_eat: "Morning or pre-workout" },
  { id: "51", name: "Raisins", category: "dryfruit", season: ["all"], calories_per_100g: 299, protein_per_100g: 3.1, carbs_per_100g: 79.2, fiber_per_100g: 3.7, fats_per_100g: 0.5, benefits: ["Iron rich", "Digestive health", "Bone health", "Energy boost"], best_time_to_eat: "Morning (soaked)" },
  { id: "52", name: "Figs (Dry)", category: "dryfruit", season: ["all"], calories_per_100g: 249, protein_per_100g: 3.3, carbs_per_100g: 63.9, fiber_per_100g: 9.8, fats_per_100g: 0.9, benefits: ["Digestive health", "Bone health", "Heart health", "Antioxidants"], best_time_to_eat: "Morning (soaked)" },
  { id: "53", name: "Brazil Nuts", category: "dryfruit", season: ["all"], calories_per_100g: 656, protein_per_100g: 14.3, carbs_per_100g: 11.7, fiber_per_100g: 7.5, fats_per_100g: 66.4, benefits: ["Selenium rich", "Thyroid health", "Brain health", "Antioxidants"], best_time_to_eat: "Morning (1-2 nuts only)" },
  { id: "54", name: "Pumpkin Seeds", category: "dryfruit", season: ["all"], calories_per_100g: 446, protein_per_100g: 18.6, carbs_per_100g: 53.8, fiber_per_100g: 18.4, fats_per_100g: 19, benefits: ["Prostate health", "Heart health", "Sleep improvement", "Magnesium rich"], best_time_to_eat: "Evening snack" },

  // Grains & Legumes
  { id: "55", name: "Rice (white, cooked)", category: "grain", season: ["all"], calories_per_100g: 130, protein_per_100g: 2.7, carbs_per_100g: 28.2, fiber_per_100g: 0.4, fats_per_100g: 0.3, benefits: ["Energy source", "Easy to digest", "Gluten-free", "Quick fuel"], best_time_to_eat: "Lunch or dinner" },
  { id: "56", name: "Brown Rice", category: "grain", season: ["all"], calories_per_100g: 111, protein_per_100g: 2.6, carbs_per_100g: 23, fiber_per_100g: 1.8, fats_per_100g: 0.9, benefits: ["Weight management", "Heart health", "Digestive health", "Blood sugar control"], best_time_to_eat: "Lunch" },
  { id: "57", name: "Quinoa", category: "grain", season: ["all"], calories_per_100g: 120, protein_per_100g: 4.4, carbs_per_100g: 21.3, fiber_per_100g: 2.8, fats_per_100g: 1.9, benefits: ["Complete protein", "Gluten-free", "Mineral rich", "Weight management"], best_time_to_eat: "Lunch or dinner" },
  { id: "58", name: "Oats", category: "grain", season: ["all"], calories_per_100g: 389, protein_per_100g: 16.9, carbs_per_100g: 66.3, fiber_per_100g: 10.6, fats_per_100g: 6.9, benefits: ["Heart health", "Cholesterol control", "Sustained energy", "Digestive health"], best_time_to_eat: "Breakfast" },
  { id: "59", name: "Whole Wheat", category: "grain", season: ["all"], calories_per_100g: 340, protein_per_100g: 13.2, carbs_per_100g: 71.2, fiber_per_100g: 12.2, fats_per_100g: 2.5, benefits: ["Digestive health", "Heart health", "Energy sustain", "Nutrient rich"], best_time_to_eat: "Breakfast or lunch" },
  { id: "60", name: "Lentils (Dal)", category: "grain", season: ["all"], calories_per_100g: 116, protein_per_100g: 9, carbs_per_100g: 20.1, fiber_per_100g: 7.9, fats_per_100g: 0.4, benefits: ["Protein rich", "Iron source", "Heart health", "Blood sugar control"], best_time_to_eat: "Lunch" },
  { id: "61", name: "Chickpeas", category: "grain", season: ["all"], calories_per_100g: 164, protein_per_100g: 8.9, carbs_per_100g: 27.4, fiber_per_100g: 7.6, fats_per_100g: 2.6, benefits: ["Protein rich", "Digestive health", "Weight management", "Blood sugar control"], best_time_to_eat: "Lunch or evening" },
  { id: "62", name: "Barley", category: "grain", season: ["all"], calories_per_100g: 354, protein_per_100g: 12.5, carbs_per_100g: 73.5, fiber_per_100g: 17.3, fats_per_100g: 2.3, benefits: ["Heart health", "Digestive health", "Blood sugar control", "Weight loss"], best_time_to_eat: "Lunch" },
  { id: "63", name: "Millets", category: "grain", season: ["all"], calories_per_100g: 378, protein_per_100g: 11, carbs_per_100g: 73, fiber_per_100g: 8.5, fats_per_100g: 4.2, benefits: ["Gluten-free", "Heart health", "Diabetes control", "Alkaline grain"], best_time_to_eat: "Lunch or dinner" },
  { id: "64", name: "Black Beans", category: "grain", season: ["all"], calories_per_100g: 132, protein_per_100g: 8.9, carbs_per_100g: 23.7, fiber_per_100g: 8.7, fats_per_100g: 0.5, benefits: ["Protein rich", "Heart health", "Digestive health", "Antioxidants"], best_time_to_eat: "Lunch" },
];

export const SeasonalNutrition = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [filteredData, setFilteredData] = useState(nutritionDatabase);

  useEffect(() => {
    let filtered = nutritionDatabase;

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
            Global Nutrition Database
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Search from 64+ foods including vegetables, fruits, grains, and dry fruits from around the world. 
            See complete nutritional breakdown, health benefits, and best times to eat each food item.
          </p>
        </div>

        <div className="mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-2 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    placeholder="Search foods (e.g., carrot, mango, almonds, quinoa)..."
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
                    <SelectItem value="dryfruit">Dry Fruits & Nuts</SelectItem>
                    <SelectItem value="grain">Grains & Legumes</SelectItem>
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
          <>
            <div className="mb-6 text-center">
              <p className="text-sm text-muted-foreground">
                Showing <strong>{filteredData.length}</strong> {filteredData.length === 1 ? 'item' : 'items'}
              </p>
            </div>
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
                          {item.category.charAt(0).toUpperCase() + item.category.slice(1).replace('dryfruit', 'Dry Fruit').replace('grain', 'Grain')}
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
                    <h4 className="font-semibold text-sm">Health Benefits:</h4>
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
          </>
        )}

        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground mb-4">
            This comprehensive database helps you make informed dietary choices. Track your nutrition intake using our Nutrition Tracker above!
          </p>
        </div>
      </div>
    </section>
  );
};