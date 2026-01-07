import { useState, useMemo } from 'react';
import { Search, ShoppingCart, Filter, Leaf, Sparkles, Package, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FoodCard from './FoodCard';
import CartDrawer from './CartDrawer';
import MealBoxBuilder from './MealBoxBuilder';
import CalorieTracker from './CalorieTracker';
import { NutritionFood, CartItem } from './types';
import { nutritionFoods, nutritionCategories, nutrientFilters, techVendors } from './foodData';

const NutritionStore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedNutrients, setSelectedNutrients] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('menu');

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

  const addCustomMealBox = (mealBox: { name: string; price: number; calories: number; items: string[] }) => {
    const customId = `custom-${Date.now()}`;
    setCartItems(prev => [...prev, {
      id: customId,
      name: mealBox.name,
      description: mealBox.items.join(', '),
      price: mealBox.price,
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
      category: 'salads' as const,
      season: ['all'],
      nutrients: [],
      calories: mealBox.calories,
      rating: 5.0,
      deliveryTime: '25-30 min',
      vendor: 'Custom Box',
      quantity: 1,
    }]);
    setIsCartOpen(true);
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

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="menu" className="flex items-center gap-2">
              <Leaf className="h-4 w-4" />
              <span className="hidden sm:inline">Menu</span>
            </TabsTrigger>
            <TabsTrigger value="custom-box" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Custom Box</span>
            </TabsTrigger>
            <TabsTrigger value="tracker" className="flex items-center gap-2">
              <Calculator className="h-4 w-4" />
              <span className="hidden sm:inline">Calorie Tracker</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="menu" className="space-y-6">
            {/* Search & Cart */}
            <div className="flex flex-col sm:flex-row gap-4">
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
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
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
            <div>
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
            <div className="flex items-center justify-between">
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
          </TabsContent>

          <TabsContent value="custom-box">
            <div className="grid lg:grid-cols-2 gap-6">
              <MealBoxBuilder onAddToCart={addCustomMealBox} />
              <div className="flex flex-col gap-4">
                <div className="p-6 bg-gradient-to-br from-primary/10 to-transparent rounded-xl border border-primary/20">
                  <h3 className="font-semibold text-lg mb-2">🥗 Perfect Daily Meal Box</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Build your own freshly cut & mixed seasonal fruit box. Choose ingredients based on your nutritional goals - whether it's boosting Vitamin D, Omega-3, Iron, or Collagen.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Freshly cut & prepared daily
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      100% organic seasonal produce
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Delivered within 30 minutes
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      Customize based on your health goals
                    </li>
                  </ul>
                </div>
                <Button 
                  variant="outline" 
                  className="relative"
                  onClick={() => setIsCartOpen(true)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  View Cart
                  {totalCartItems > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                      {totalCartItems}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tracker">
            <div className="grid lg:grid-cols-2 gap-6">
              <CalorieTracker />
              <div className="flex flex-col gap-4">
                <div className="p-6 bg-gradient-to-br from-accent/10 to-transparent rounded-xl border border-accent/20">
                  <h3 className="font-semibold text-lg mb-2">📊 Track Your Weight Loss Journey</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Use our smart calculator to determine your daily calorie needs based on your body metrics and activity level. Track every meal to stay on target.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      Calculate BMR & TDEE accurately
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      Get personalized calorie targets
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      Track daily food intake
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      Monitor progress towards your ideal weight
                    </li>
                  </ul>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">💡 Pro Tip</h4>
                  <p className="text-xs text-muted-foreground">
                    Order from our nutrition store and we'll automatically add the calorie count to your tracker when you place an order!
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

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
