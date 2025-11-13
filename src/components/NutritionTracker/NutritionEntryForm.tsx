import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload } from "lucide-react";

interface NutritionEntryFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const NutritionEntryForm = ({ onSuccess, onCancel }: NutritionEntryFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) throw new Error("Not authenticated");

      let imageUrl = "";
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from("nutrition-photos")
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("nutrition-photos")
          .getPublicUrl(fileName);

        imageUrl = publicUrl;
      }

      const foodItems = (formData.get("food_items") as string).split(",").map(item => item.trim());

      const { error } = await supabase.from("nutrition_entries").insert({
        user_id: user.id,
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        food_items: foodItems,
        meal_type: formData.get("meal_type") as string,
        calories: parseInt(formData.get("calories") as string) || null,
        protein: parseFloat(formData.get("protein") as string) || null,
        carbs: parseFloat(formData.get("carbs") as string) || null,
        fats: parseFloat(formData.get("fats") as string) || null,
        fiber: parseFloat(formData.get("fiber") as string) || null,
        benefits: formData.get("benefits") as string,
        image_url: imageUrl,
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Your nutrition entry has been saved.",
      });
      onSuccess();
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Nutrition Entry</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Meal Title*</Label>
              <Input id="title" name="title" placeholder="Breakfast Bowl" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="meal_type">Meal Type*</Label>
              <Select name="meal_type" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select meal type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breakfast">Breakfast</SelectItem>
                  <SelectItem value="lunch">Lunch</SelectItem>
                  <SelectItem value="dinner">Dinner</SelectItem>
                  <SelectItem value="snack">Snack</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="food_items">Food Items* (comma-separated)</Label>
            <Input id="food_items" name="food_items" placeholder="Rice, Vegetables, Dal" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" placeholder="How did you prepare this meal?" rows={3} />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="calories">Calories</Label>
              <Input id="calories" name="calories" type="number" placeholder="450" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="protein">Protein (g)</Label>
              <Input id="protein" name="protein" type="number" step="0.1" placeholder="25" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="carbs">Carbs (g)</Label>
              <Input id="carbs" name="carbs" type="number" step="0.1" placeholder="60" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fats">Fats (g)</Label>
              <Input id="fats" name="fats" type="number" step="0.1" placeholder="15" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fiber">Fiber (g)</Label>
              <Input id="fiber" name="fiber" type="number" step="0.1" placeholder="8" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="benefits">Health Benefits</Label>
            <Textarea id="benefits" name="benefits" placeholder="How does this meal benefit your body?" rows={3} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Upload Photo</Label>
            <div className="flex items-center gap-4">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="flex-1"
              />
              <Upload className="w-5 h-5 text-muted-foreground" />
            </div>
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="mt-4 rounded-lg max-h-48 object-cover" />
            )}
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Entry
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};