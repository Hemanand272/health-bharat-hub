import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { NutritionEntryForm } from "./NutritionEntryForm";
import { NutritionEntryList } from "./NutritionEntryList";

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

export const NutritionTracker = () => {
  const [entries, setEntries] = useState<NutritionEntry[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (user) {
      loadEntries();
    } else {
      setIsLoading(false);
    }
  };

  const loadEntries = async () => {
    try {
      const { data, error } = await supabase
        .from("nutrition_entries")
        .select("*")
        .order("entry_date", { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <section id="nutrition-tracker" className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">
              Track Your Nutrition Journey
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Please sign in to start tracking your meals and nutrition intake
            </p>
            <Button size="lg" onClick={() => window.location.href = "/auth"}>
              Sign In to Continue
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="nutrition-tracker" className="py-20 md:py-32 gradient-soft">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">
            Nutrition Tracker
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Track what you eat, upload photos of your meals, and see how your food benefits your body
          </p>
          <Button
            size="lg"
            onClick={() => setIsFormOpen(true)}
            className="gap-2"
          >
            <Plus className="w-5 h-5" />
            Add New Entry
          </Button>
        </div>

        {isFormOpen && (
          <div className="mb-12">
            <NutritionEntryForm
              onSuccess={() => {
                setIsFormOpen(false);
                loadEntries();
              }}
              onCancel={() => setIsFormOpen(false)}
            />
          </div>
        )}

        <NutritionEntryList entries={entries} isLoading={isLoading} />
      </div>
    </section>
  );
};