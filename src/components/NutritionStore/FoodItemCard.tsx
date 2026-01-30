import { Star, Clock, Plus, Minus, Info, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { NutritionFood, CartItem } from './types';
import { nutrientFilters } from './foodData';
import { cn } from '@/lib/utils';

interface FoodItemCardProps {
  food: NutritionFood;
  cartItem?: CartItem;
  onAddToCart: (food: NutritionFood) => void;
  onUpdateQuantity: (foodId: string, quantity: number) => void;
  variant?: 'grid' | 'list';
}

const FoodItemCard = ({ food, cartItem, onAddToCart, onUpdateQuantity, variant = 'grid' }: FoodItemCardProps) => {
  const getNutrientIcon = (nutrientId: string) => {
    const nutrient = nutrientFilters.find(n => n.id === nutrientId);
    return nutrient?.icon || '💊';
  };

  if (variant === 'list') {
    return (
      <div className="flex gap-4 p-4 bg-card rounded-xl border border-border hover:shadow-lg transition-all duration-300 group">
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-4 h-4 border-2 border-green-600 flex items-center justify-center rounded-sm">
              <span className="w-2 h-2 bg-green-600 rounded-full" />
            </span>
            {food.rating >= 4.5 && (
              <Badge variant="outline" className="text-[10px] border-orange-400 text-orange-500 bg-orange-50 dark:bg-orange-950">
                🔥 Bestseller
              </Badge>
            )}
          </div>
          
          <h3 className="font-bold text-foreground mb-1 line-clamp-1">{food.name}</h3>
          
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-3.5 w-3.5 fill-green-600 text-green-600" />
              <span className="font-medium text-green-600">{food.rating}</span>
            </div>
            <span className="text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">₹{food.price}</span>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{food.description}</p>
          
          <div className="flex flex-wrap gap-1">
            {food.nutrients.slice(0, 3).map((nutrient) => (
              <span key={nutrient} className="text-xs bg-secondary/50 px-2 py-0.5 rounded-full">
                {getNutrientIcon(nutrient)} {nutrient.replace('-', ' ')}
              </span>
            ))}
          </div>
        </div>
        
        {/* Image & Cart */}
        <div className="relative w-32 h-32 shrink-0">
          <img 
            src={food.image} 
            alt={food.name}
            className="w-full h-full object-cover rounded-xl"
          />
          
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[90%]">
            {cartItem ? (
              <div className="flex items-center justify-between bg-primary text-primary-foreground rounded-lg px-2 py-1.5 shadow-lg">
                <button onClick={() => onUpdateQuantity(food.id, cartItem.quantity - 1)}>
                  <Minus className="h-4 w-4" />
                </button>
                <span className="font-bold text-sm">{cartItem.quantity}</span>
                <button onClick={() => onUpdateQuantity(food.id, cartItem.quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Button 
                size="sm"
                variant="outline"
                className="w-full bg-card border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold shadow-lg"
                onClick={() => onAddToCart(food)}
              >
                ADD
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border group">
      {/* Image Section */}
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={food.image} 
          alt={food.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Top badges */}
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          {food.nutrients.slice(0, 2).map((nutrient) => (
            <span key={nutrient} className="text-sm bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm">
              {getNutrientIcon(nutrient)}
            </span>
          ))}
        </div>
        
        {/* Rating */}
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded-lg">
            <Star className="h-3 w-3 fill-white" />
            <span className="text-xs font-bold">{food.rating}</span>
          </div>
        </div>
        
        {/* Bottom Info */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-white/80 text-xs mb-1">
              <Clock className="h-3 w-3" />
              <span>{food.deliveryTime}</span>
            </div>
            <div className="flex items-center gap-1.5 text-white/80 text-xs">
              <Flame className="h-3 w-3" />
              <span>{food.calories} kcal</span>
            </div>
          </div>
          <div className="bg-white text-foreground px-3 py-1.5 rounded-lg shadow-lg">
            <span className="font-bold">₹{food.price}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-foreground line-clamp-1">{food.name}</h3>
          <span className="w-4 h-4 border-2 border-green-600 flex items-center justify-center rounded-sm shrink-0">
            <span className="w-2 h-2 bg-green-600 rounded-full" />
          </span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{food.description}</p>

        {/* Health Benefits */}
        {food.benefits && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-lg p-2.5 mb-3 border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-1.5 mb-1">
              <Info className="h-3.5 w-3.5 text-green-600" />
              <span className="text-xs font-semibold text-green-700 dark:text-green-400">Health Benefits</span>
            </div>
            <p className="text-xs text-green-800 dark:text-green-300 leading-relaxed line-clamp-3">{food.benefits}</p>
          </div>
        )}

        {/* Nutrients */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {food.nutrients.map((nutrient) => (
            <Badge key={nutrient} variant="secondary" className="text-[10px] capitalize">
              {nutrient.replace('-', ' ')}
            </Badge>
          ))}
        </div>

        {/* Vendor */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <span className="font-semibold text-primary">{food.vendor}</span>
        </div>

        {/* Add to Cart */}
        {cartItem ? (
          <div className="flex items-center justify-between bg-primary text-primary-foreground rounded-xl py-2 px-4">
            <button 
              className="p-1 hover:bg-primary-foreground/20 rounded-lg transition-colors"
              onClick={() => onUpdateQuantity(food.id, cartItem.quantity - 1)}
            >
              <Minus className="h-5 w-5" />
            </button>
            <span className="font-bold text-lg">{cartItem.quantity}</span>
            <button 
              className="p-1 hover:bg-primary-foreground/20 rounded-lg transition-colors"
              onClick={() => onUpdateQuantity(food.id, cartItem.quantity + 1)}
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <Button 
            className="w-full font-bold" 
            size="lg"
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

export default FoodItemCard;
