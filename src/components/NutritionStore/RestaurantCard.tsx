import { Star, Clock, MapPin, Percent, Heart, Verified } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface RestaurantCardProps {
  restaurant: {
    id: string;
    name: string;
    image: string;
    cuisine: string[];
    rating: number;
    deliveryTime: string;
    priceForTwo: number;
    distance: string;
    offer?: string;
    promoted?: boolean;
    isPureVeg?: boolean;
  };
  onClick?: () => void;
}

const RestaurantCard = ({ restaurant, onClick }: RestaurantCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div 
      className="group cursor-pointer"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3">
        <img 
          src={restaurant.image} 
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        
        {/* Top badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {restaurant.promoted && (
            <Badge className="bg-primary/90 text-primary-foreground text-[10px]">
              Promoted
            </Badge>
          )}
          {restaurant.isPureVeg && (
            <Badge className="bg-green-500/90 text-white text-[10px]">
              🥬 Pure Veg
            </Badge>
          )}
        </div>
        
        {/* Favorite Button */}
        <button 
          className="absolute top-3 right-3 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
        >
          <Heart className={cn(
            "h-5 w-5 transition-colors",
            isFavorite ? "fill-red-500 text-red-500" : "text-white"
          )} />
        </button>
        
        {/* Offer Badge */}
        {restaurant.offer && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-blue-600 text-white px-2.5 py-1.5 rounded-lg">
            <Percent className="h-3.5 w-3.5" />
            <span className="text-xs font-bold">{restaurant.offer}</span>
          </div>
        )}
        
        {/* Delivery Time */}
        <div className="absolute bottom-3 right-3 bg-white text-foreground px-2.5 py-1.5 rounded-lg">
          <span className="text-xs font-bold">{restaurant.deliveryTime}</span>
        </div>
      </div>

      {/* Content */}
      <div className="px-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-foreground text-lg line-clamp-1 flex items-center gap-1.5">
            {restaurant.name}
            <Verified className="h-4 w-4 text-blue-500 fill-blue-500" />
          </h3>
          <div className="flex items-center gap-1 bg-green-600 text-white px-1.5 py-0.5 rounded shrink-0">
            <span className="text-xs font-bold">{restaurant.rating}</span>
            <Star className="h-3 w-3 fill-white" />
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-1">
          <span className="line-clamp-1">{restaurant.cuisine.join(', ')}</span>
          <span className="shrink-0">₹{restaurant.priceForTwo} for two</span>
        </div>
        
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <span>{restaurant.distance}</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
