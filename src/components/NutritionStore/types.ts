export interface NutritionFood {
  id: string;
  name: string;
  description: string;
  benefits?: string;
  price: number;
  image: string;
  category: 'drinks' | 'shakes' | 'mealbox' | 'bowls';
  season: string[];
  nutrients: string[];
  calories: number;
  rating: number;
  deliveryTime: string;
  vendor: string;
  vendorLogo?: string;
}

export interface CartItem extends NutritionFood {
  quantity: number;
}

export interface NutritionCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}
