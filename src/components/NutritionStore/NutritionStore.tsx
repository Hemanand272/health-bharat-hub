import { useState, useMemo } from 'react';
import { Search, ShoppingCart, Filter, Leaf, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import FoodCard from './FoodCard';
import CartDrawer from './CartDrawer';
import { NutritionFood, CartItem } from './types';
import { nutritionFoods, nutritionCategories, nutrientFilters, techVendors } from './foodData';

const NutritionStore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedNutrients, setSelectedNutrients] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const filteredFoods = useMemo(() => {
    return nutritionFoods.filter((food) => {
      const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        food.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || food.category === selectedCategory;
      const matchesNutrients = selectedNutrients.length === 0 || 
        selectedNutrients.some(nutrient => food.nutrients.includes(nutrient));
      return matchesSearch && matchesCategory && matchesNutrients;
    });
  }, [searchQuery, selectedCategory, selectedNutrients]);

  const toggleNutrient = (nutrientId: string) => {
    setSelectedNutrients(prev => 
      prev.includes(nutrientId) 
        ? prev.filter(n => n !== nutrientId)
        : [...prev, nutrientId]
    );
  };

  const addToCart = (food: NutritionFood) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === food.id);
      if (existing) {
        return prev.map(item => 
          item.id === food.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...food, quantity: 1 }];
    });
  };

  const updateQuantity = (foodId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== foodId));
    } else {
      setCartItems(prev => 
        prev.map(item => 
          item.id === foodId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Leaf className="h-4 w-4" />
            <span className="text-sm font-medium">Fresh & Nutritious</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Order Nutrition-Rich Foods
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get seasonal fruits, vegetables, salads & smoothies delivered to your doorstep. 
            Fulfill your daily nutritional requirements with Vitamin D, Omega-3, Collagen & more.
          </p>
        </div>

        {/* Tech Vendors Banner */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex gap-4 min-w-max">
            {techVendors.map((vendor) => (
              <div 
                key={vendor.id}
                className="flex items-center gap-3 bg-card border border-border rounded-xl px-4 py-3 hover:border-primary/50 transition-colors cursor-pointer"
              >
                <span className="text-2xl">{vendor.logo}</span>
                <div>
                  <h4 className="font-semibold text-sm">{vendor.name}</h4>
                  <p className="text-xs text-muted-foreground">{vendor.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search & Cart */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search for fruits, vegetables, salads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button 
            variant="outline" 
            className="relative"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Cart
            {totalCartItems > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                {totalCartItems}
              </Badge>
            )}
          </Button>
        </div>

        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
          {nutritionCategories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="whitespace-nowrap"
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>

        {/* Nutrient Filters */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="font-medium text-sm">Filter by Nutrients</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {nutrientFilters.map((nutrient) => (
              <Badge
                key={nutrient.id}
                variant={selectedNutrients.includes(nutrient.id) ? 'default' : 'outline'}
                className="cursor-pointer hover:bg-primary/20 transition-colors"
                onClick={() => toggleNutrient(nutrient.id)}
              >
                <span className="mr-1">{nutrient.icon}</span>
                {nutrient.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredFoods.length}</span> items
          </p>
          {selectedNutrients.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSelectedNutrients([])}
            >
              Clear filters
            </Button>
          )}
        </div>

        {/* Food Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFoods.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
              cartItem={cartItems.find(item => item.id === food.id)}
              onAddToCart={addToCart}
              onUpdateQuantity={updateQuantity}
            />
          ))}
        </div>

        {filteredFoods.length === 0 && (
          <div className="text-center py-12">
            <Filter className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="font-semibold text-lg mb-2">No items found</h3>
            <p className="text-muted-foreground text-sm">Try adjusting your filters or search query</p>
          </div>
        )}

        {/* Cart Drawer */}
        <CartDrawer 
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={updateQuantity}
          onClearCart={clearCart}
        />
      </div>
    </section>
  );
};

export default NutritionStore;
