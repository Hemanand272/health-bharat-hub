-- Create nutrition_entries table for tracking food intake
CREATE TABLE IF NOT EXISTS public.nutrition_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  food_items TEXT[] NOT NULL,
  meal_type TEXT NOT NULL CHECK (meal_type IN ('breakfast', 'lunch', 'dinner', 'snack')),
  calories INTEGER,
  protein DECIMAL,
  carbs DECIMAL,
  fats DECIMAL,
  fiber DECIMAL,
  benefits TEXT,
  image_url TEXT,
  entry_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.nutrition_entries ENABLE ROW LEVEL SECURITY;

-- Create policies for nutrition_entries
CREATE POLICY "Users can view their own nutrition entries"
  ON public.nutrition_entries
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own nutrition entries"
  ON public.nutrition_entries
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own nutrition entries"
  ON public.nutrition_entries
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own nutrition entries"
  ON public.nutrition_entries
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create storage bucket for food photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('nutrition-photos', 'nutrition-photos', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for nutrition photos
CREATE POLICY "Users can view nutrition photos"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'nutrition-photos');

CREATE POLICY "Users can upload their own nutrition photos"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'nutrition-photos' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can update their own nutrition photos"
  ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'nutrition-photos' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete their own nutrition photos"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'nutrition-photos' 
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- Create seasonal_nutrition table for vegetable/fruit database
CREATE TABLE IF NOT EXISTS public.seasonal_nutrition (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('vegetable', 'fruit', 'dryfruit', 'grain', 'legume')),
  season TEXT[] NOT NULL,
  calories_per_100g DECIMAL NOT NULL,
  protein_per_100g DECIMAL,
  carbs_per_100g DECIMAL,
  fiber_per_100g DECIMAL,
  fats_per_100g DECIMAL,
  vitamins JSONB,
  minerals JSONB,
  benefits TEXT[],
  precautions TEXT[],
  best_time_to_eat TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for seasonal_nutrition (public read access)
ALTER TABLE public.seasonal_nutrition ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view seasonal nutrition data"
  ON public.seasonal_nutrition
  FOR SELECT
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for nutrition_entries
CREATE TRIGGER update_nutrition_entries_updated_at
  BEFORE UPDATE ON public.nutrition_entries
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_nutrition_entries_user_id ON public.nutrition_entries(user_id);
CREATE INDEX idx_nutrition_entries_entry_date ON public.nutrition_entries(entry_date);
CREATE INDEX idx_seasonal_nutrition_category ON public.seasonal_nutrition(category);
CREATE INDEX idx_seasonal_nutrition_season ON public.seasonal_nutrition USING GIN(season);