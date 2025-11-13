import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Flame, Activity } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface NutritionEntry {
  id: string;
  title: string;
  description: string;
  food_items: string[];
  meal_type: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
  benefits: string;
  image_url: string;
  entry_date: string;
}

interface NutritionEntryListProps {
  entries: NutritionEntry[];
  isLoading: boolean;
}

export const NutritionEntryList = ({ entries, isLoading }: NutritionEntryListProps) => {
  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <Skeleton className="h-48 w-full" />
            <CardContent className="p-6 space-y-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No nutrition entries yet. Add your first meal!</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {entries.map((entry) => (
        <Card key={entry.id} className="group hover-scale overflow-hidden">
          {entry.image_url && (
            <div className="relative h-48 overflow-hidden">
              <img
                src={entry.image_url}
                alt={entry.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
              />
              <Badge className="absolute top-4 right-4">{entry.meal_type}</Badge>
            </div>
          )}
          <CardContent className="p-6 space-y-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">{entry.title}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <Calendar className="w-4 h-4" />
                {new Date(entry.entry_date).toLocaleDateString()}
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {entry.food_items.map((item, idx) => (
                  <Badge key={idx} variant="outline">{item}</Badge>
                ))}
              </div>
            </div>

            {entry.description && (
              <p className="text-sm text-muted-foreground">{entry.description}</p>
            )}

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              {entry.calories && (
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{entry.calories} cal</span>
                </div>
              )}
              {entry.protein && (
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">{entry.protein}g protein</span>
                </div>
              )}
            </div>

            {entry.benefits && (
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Benefits:</strong> {entry.benefits}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};