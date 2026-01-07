import { Star, Clock, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { NutritionFood, CartItem } from './types';
import { nutrientFilters } from './foodData';

interface FoodCardProps {
  food: NutritionFood;
  cartItem?: CartItem;
  onAddToCart: (food: NutritionFood) => void;
  onUpdateQuantity: (foodId: string, quantity: number) => void;
}

const FoodCard = ({ food, cartItem, onAddToCart, onUpdateQuantity }: FoodCardProps) => {
  const getNutrientIcon = (nutrientId: string) => {
    const nutrient = nutrientFilters.find(n => n.id === nutrientId);
    return nutrient?.icon || '💊';
  };

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border group">
      {/* Image Section */}
      <div className="relative h-40 overflow-hidden">
        <img 
          src={food.image} 
          alt={food.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 left-2 flex gap-1">
          {food.nutrients.slice(0, 2).map((nutrient) => (
            <span key={nutrient} className="text-sm bg-background/90 backdrop-blur-sm px-2 py-0.5 rounded-full">
              {getNutrientIcon(nutrient)}
            </span>
          ))}
        </div>
        <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-lg">
          ₹{food.price}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-foreground line-clamp-1">{food.name}</h3>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{food.rating}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{food.description}</p>

        {/* Nutrients */}
        <div className="flex flex-wrap gap-1 mb-3">
          {food.nutrients.map((nutrient) => (
            <Badge key={nutrient} variant="secondary" className="text-xs capitalize">
              {nutrient.replace('-', ' ')}
            </Badge>
          ))}
        </div>

        {/* Vendor & Delivery */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <span className="font-medium text-primary">{food.vendor}</span>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{food.deliveryTime}</span>
          </div>
        </div>

        {/* Calories */}
        <div className="text-xs text-muted-foreground mb-3">
          <span className="font-medium">{food.calories} kcal</span> per serving
        </div>

        {/* Add to Cart */}
        {cartItem ? (
          <div className="flex items-center justify-between bg-primary/10 rounded-lg p-2">
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8"
              onClick={() => onUpdateQuantity(food.id, cartItem.quantity - 1)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="font-semibold text-primary">{cartItem.quantity}</span>
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8"
              onClick={() => onUpdateQuantity(food.id, cartItem.quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button 
            className="w-full" 
            onClick={() => onAddToCart(food)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        )}
      </div>
    </div>
  );
};

export default FoodCard;
