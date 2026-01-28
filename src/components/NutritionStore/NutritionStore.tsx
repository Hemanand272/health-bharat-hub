import { useState, useMemo } from 'react';
import { 
  Search, ShoppingCart, Leaf, Sparkles, Package, Calculator, 
  MapPin, ChevronRight, Zap, Truck, ShieldCheck, Timer,
  Grid, List, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import FoodItemCard from './FoodItemCard';
import CartDrawer from './CartDrawer';
import MealBoxBuilder from './MealBoxBuilder';
import CalorieTracker from './CalorieTracker';
import QuickFilters from './QuickFilters';
import { NutritionFood, CartItem } from './types';
import { nutritionFoods, nutritionCategories, nutrientFilters, techVendors } from './foodData';
import { cn } from '@/lib/utils';

const NutritionStore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedNutrients, setSelectedNutrients] = useState<string[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('menu');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredFoods = useMemo(() => {
    return nutritionFoods.filter((food) => {
      const matchesSearch = food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        food.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || food.category === selectedCategory;
      const matchesNutrients = selectedNutrients.length === 0 || 
        selectedNutrients.some(nutrient => food.nutrients.includes(nutrient));
      
      // Additional filters
      let matchesFilters = true;
      if (activeFilters.includes('rating4')) {
        matchesFilters = matchesFilters && food.rating >= 4.0;
      }
      if (activeFilters.includes('vitamin-d')) {
        matchesFilters = matchesFilters && food.nutrients.includes('vitamin-d');
      }
      if (activeFilters.includes('omega-3')) {
        matchesFilters = matchesFilters && food.nutrients.includes('omega-3');
      }
      if (activeFilters.includes('high-protein')) {
        matchesFilters = matchesFilters && food.nutrients.includes('protein');
      }
      if (activeFilters.includes('low-calorie')) {
        matchesFilters = matchesFilters && food.calories < 150;
      }
      
      return matchesSearch && matchesCategory && matchesNutrients && matchesFilters;
    });
  }, [searchQuery, selectedCategory, selectedNutrients, activeFilters]);

  const toggleNutrient = (nutrientId: string) => {
    setSelectedNutrients(prev => 
      prev.includes(nutrientId) 
        ? prev.filter(n => n !== nutrientId)
        : [...prev, nutrientId]
    );
  };

  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev =>
      prev.includes(filterId)
        ? prev.filter(f => f !== filterId)
        : [...prev, filterId]
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
      category: 'mealbox' as const,
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
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <section className="min-h-screen bg-background">
      {/* Header Bar */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="font-semibold">Deliver to</span>
                <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                  <span>Current Location</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <div className="md:hidden">
                <h1 className="font-bold text-lg text-primary flex items-center gap-2">
                  <Leaf className="h-5 w-5" />
                  NutriStore
                </h1>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search for healthy drinks, shakes, meal boxes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10 h-11 rounded-xl bg-secondary/30 border-0 focus-visible:ring-2"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                  </button>
                )}
              </div>
            </div>
            
            {/* Cart Button */}
            <Button 
              variant="outline" 
              className="relative gap-2 h-11 rounded-xl"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:inline">Cart</span>
              {totalCartItems > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {totalCartItems}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden mb-8 bg-gradient-to-r from-primary/20 to-accent/20">
          <div className="p-8 md:p-12">
            <div className="max-w-lg">
              <Badge className="mb-4 bg-primary/20 text-primary border-0">
                <Zap className="h-3 w-3 mr-1" />
                Express Delivery
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                Fresh & Nutritious
                <br />
                <span className="text-primary">Delivered Fast</span>
              </h1>
              <p className="text-muted-foreground mb-6">
                Get seasonal fruits, vegetables & nutrition-rich meals delivered in 30 minutes. 
                Fulfill your daily Vitamin D, Omega-3, Protein & more.
              </p>
              <div className="flex flex-wrap gap-4">
                {[
                  { icon: Truck, text: '30 min delivery' },
                  { icon: ShieldCheck, text: '100% Organic' },
                  { icon: Timer, text: 'Freshly prepared' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <item.icon className="h-4 w-4 text-primary" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Vendor Partners */}
        <div className="mb-8">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Our Partners
          </h3>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {techVendors.map((vendor) => (
              <div 
                key={vendor.id}
                className="flex items-center gap-3 bg-card border border-border rounded-2xl px-5 py-4 hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer shrink-0"
              >
                <span className="text-3xl">{vendor.logo}</span>
                <div>
                  <h4 className="font-bold text-sm">{vendor.name}</h4>
                  <p className="text-xs text-muted-foreground">{vendor.tagline}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <TabsList className="bg-secondary/30 p-1 rounded-xl">
              <TabsTrigger value="menu" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-background">
                <Leaf className="h-4 w-4" />
                <span>Menu</span>
              </TabsTrigger>
              <TabsTrigger value="custom-box" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-background">
                <Package className="h-4 w-4" />
                <span>Custom Box</span>
              </TabsTrigger>
              <TabsTrigger value="tracker" className="flex items-center gap-2 rounded-lg data-[state=active]:bg-background">
                <Calculator className="h-4 w-4" />
                <span>Tracker</span>
              </TabsTrigger>
            </TabsList>
            
            {activeTab === 'menu' && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    viewMode === 'grid' ? "bg-primary text-primary-foreground" : "bg-secondary/50 hover:bg-secondary"
                  )}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={cn(
                    "p-2 rounded-lg transition-colors",
                    viewMode === 'list' ? "bg-primary text-primary-foreground" : "bg-secondary/50 hover:bg-secondary"
                  )}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>

          <TabsContent value="menu" className="space-y-6">
            {/* Quick Filters */}
            <QuickFilters activeFilters={activeFilters} onFilterChange={toggleFilter} />
            
            {/* Category Pills */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {nutritionCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all shrink-0 min-w-[100px]",
                    selectedCategory === category.id
                      ? "border-primary bg-primary/10"
                      : "border-transparent bg-secondary/30 hover:bg-secondary/50"
                  )}
                >
                  <span className="text-3xl">{category.icon}</span>
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              ))}
            </div>

            {/* Nutrient Filters */}
            <div className="p-4 bg-secondary/20 rounded-2xl">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="font-semibold text-sm">Filter by Nutrients</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {nutrientFilters.map((nutrient) => (
                  <Badge
                    key={nutrient.id}
                    variant={selectedNutrients.includes(nutrient.id) ? 'default' : 'outline'}
                    className="cursor-pointer hover:scale-105 transition-transform py-1.5 px-3"
                    onClick={() => toggleNutrient(nutrient.id)}
                  >
                    <span className="mr-1.5">{nutrient.icon}</span>
                    {nutrient.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                <span className="font-bold text-foreground text-lg">{filteredFoods.length}</span> items found
              </p>
              {(selectedNutrients.length > 0 || activeFilters.length > 0) && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setSelectedNutrients([]);
                    setActiveFilters([]);
                  }}
                  className="text-primary"
                >
                  Clear all filters
                </Button>
              )}
            </div>

            {/* Food Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredFoods.map((food) => (
                  <FoodItemCard
                    key={food.id}
                    food={food}
                    cartItem={cartItems.find(item => item.id === food.id)}
                    onAddToCart={addToCart}
                    onUpdateQuantity={updateQuantity}
                    variant="grid"
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFoods.map((food) => (
                  <FoodItemCard
                    key={food.id}
                    food={food}
                    cartItem={cartItems.find(item => item.id === food.id)}
                    onAddToCart={addToCart}
                    onUpdateQuantity={updateQuantity}
                    variant="list"
                  />
                ))}
              </div>
            )}

            {filteredFoods.length === 0 && (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary/50 flex items-center justify-center">
                  <Leaf className="h-10 w-10 text-muted-foreground/50" />
                </div>
                <h3 className="font-bold text-xl mb-2">No items found</h3>
                <p className="text-muted-foreground text-sm">Try adjusting your filters or search query</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="custom-box">
            <div className="grid lg:grid-cols-2 gap-6">
              <MealBoxBuilder onAddToCart={addCustomMealBox} />
              <div className="flex flex-col gap-4">
                <div className="p-6 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl border border-primary/20">
                  <h3 className="font-bold text-xl mb-3">🥗 Perfect Daily Meal Box</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Build your own freshly cut & mixed seasonal fruit box. Choose ingredients based on your nutritional goals.
                  </p>
                  <ul className="space-y-3 text-sm">
                    {[
                      'Freshly cut & prepared daily',
                      '100% organic seasonal produce',
                      'Delivered within 30 minutes',
                      'Customize based on your health goals',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tracker">
            <div className="grid lg:grid-cols-2 gap-6">
              <CalorieTracker />
              <div className="flex flex-col gap-4">
                <div className="p-6 bg-gradient-to-br from-accent/10 to-transparent rounded-2xl border border-accent/20">
                  <h3 className="font-bold text-xl mb-3">📊 Track Your Journey</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Use our smart calculator to determine your daily calorie needs.
                  </p>
                  <ul className="space-y-3 text-sm">
                    {[
                      'Calculate BMR & TDEE accurately',
                      'Get personalized calorie targets',
                      'Track daily food intake',
                      'Monitor progress towards goals',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Floating Cart */}
        {totalCartItems > 0 && !isCartOpen && (
          <div className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-auto z-50">
            <Button 
              size="lg"
              className="w-full md:w-auto rounded-2xl shadow-2xl gap-4 h-14 px-6"
              onClick={() => setIsCartOpen(true)}
            >
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                <Badge variant="secondary" className="bg-primary-foreground text-primary">
                  {totalCartItems}
                </Badge>
              </div>
              <div className="h-6 w-px bg-primary-foreground/30" />
              <span className="font-bold">₹{cartTotal}</span>
              <ChevronRight className="h-5 w-5" />
            </Button>
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
