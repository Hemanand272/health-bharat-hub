export interface NutritionFood {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'fruits' | 'vegetables' | 'salads' | 'smoothies';
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
