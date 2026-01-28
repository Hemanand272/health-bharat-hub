import { useState, useMemo } from 'react';
import { Package, Plus, Minus, Sparkles, Check, Apple, Carrot, Salad, Star, MessageSquare, Clock, Sun, Moon, Utensils, Heart, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { nutrientFilters } from './foodData';

interface MealBoxItem {
  id: string;
  name: string;
  category: 'fruits' | 'vegetables' | 'extras';
  icon: string;
  calories: number;
  nutrients: string[];
  pricePerUnit: number;
}

interface PreMadeMealBox {
  id: string;
  name: string;
  description: string;
  mealTime: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  focusNutrients: string[];
  items: string[];
  calories: number;
  protein: number;
  fiber: number;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  benefits: string[];
  reviews: Review[];
}

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

const mealBoxIngredients: MealBoxItem[] = [
  { id: 'apple', name: 'Apple Slices', category: 'fruits', icon: '🍎', calories: 52, nutrients: ['fiber', 'antioxidants'], pricePerUnit: 25 },
  { id: 'orange', name: 'Orange Segments', category: 'fruits', icon: '🍊', calories: 47, nutrients: ['vitamin-d', 'antioxidants'], pricePerUnit: 20 },
  { id: 'banana', name: 'Banana Chunks', category: 'fruits', icon: '🍌', calories: 89, nutrients: ['fiber', 'protein', 'vitamin-b12'], pricePerUnit: 15 },
  { id: 'berries', name: 'Mixed Berries', category: 'fruits', icon: '🫐', calories: 32, nutrients: ['antioxidants', 'fiber', 'vitamin-d'], pricePerUnit: 40 },
  { id: 'mango', name: 'Mango Cubes', category: 'fruits', icon: '🥭', calories: 60, nutrients: ['vitamin-d', 'antioxidants', 'fiber'], pricePerUnit: 35 },
  { id: 'grapes', name: 'Seedless Grapes', category: 'fruits', icon: '🍇', calories: 67, nutrients: ['antioxidants', 'fiber'], pricePerUnit: 30 },
  { id: 'kiwi', name: 'Kiwi Slices', category: 'fruits', icon: '🥝', calories: 61, nutrients: ['vitamin-d', 'fiber', 'vitamin-b12'], pricePerUnit: 35 },
  { id: 'pomegranate', name: 'Pomegranate Seeds', category: 'fruits', icon: '🍎', calories: 83, nutrients: ['iron', 'antioxidants'], pricePerUnit: 45 },
  { id: 'papaya', name: 'Papaya Cubes', category: 'fruits', icon: '🍈', calories: 43, nutrients: ['fiber', 'vitamin-d', 'collagen'], pricePerUnit: 30 },
  { id: 'pineapple', name: 'Pineapple Chunks', category: 'fruits', icon: '🍍', calories: 50, nutrients: ['fiber', 'collagen', 'antioxidants'], pricePerUnit: 35 },
  { id: 'cucumber', name: 'Cucumber Sticks', category: 'vegetables', icon: '🥒', calories: 16, nutrients: ['fiber', 'calcium'], pricePerUnit: 15 },
  { id: 'carrot', name: 'Carrot Sticks', category: 'vegetables', icon: '🥕', calories: 41, nutrients: ['vitamin-d', 'fiber', 'vitamin-b12'], pricePerUnit: 15 },
  { id: 'celery', name: 'Celery Sticks', category: 'vegetables', icon: '🥬', calories: 14, nutrients: ['fiber', 'calcium'], pricePerUnit: 15 },
  { id: 'beetroot', name: 'Beetroot Cubes', category: 'vegetables', icon: '🔴', calories: 43, nutrients: ['iron', 'fiber'], pricePerUnit: 20 },
  { id: 'spinach', name: 'Baby Spinach', category: 'vegetables', icon: '🥬', calories: 23, nutrients: ['iron', 'protein', 'vitamin-b12'], pricePerUnit: 25 },
  { id: 'broccoli', name: 'Broccoli Florets', category: 'vegetables', icon: '🥦', calories: 34, nutrients: ['protein', 'fiber', 'calcium'], pricePerUnit: 30 },
  { id: 'nuts', name: 'Mixed Nuts', category: 'extras', icon: '🥜', calories: 607, nutrients: ['omega-3', 'protein', 'vitamin-b12'], pricePerUnit: 50 },
  { id: 'seeds', name: 'Chia & Flax Seeds', category: 'extras', icon: '🌱', calories: 486, nutrients: ['omega-3', 'fiber', 'protein'], pricePerUnit: 40 },
  { id: 'honey', name: 'Organic Honey', category: 'extras', icon: '🍯', calories: 304, nutrients: ['antioxidants'], pricePerUnit: 30 },
  { id: 'yogurt', name: 'Greek Yogurt', category: 'extras', icon: '🥛', calories: 59, nutrients: ['protein', 'calcium', 'collagen', 'vitamin-b12'], pricePerUnit: 45 },
  { id: 'oats', name: 'Rolled Oats', category: 'extras', icon: '🌾', calories: 389, nutrients: ['fiber', 'protein', 'iron'], pricePerUnit: 35 },
  { id: 'quinoa', name: 'Cooked Quinoa', category: 'extras', icon: '🍚', calories: 120, nutrients: ['protein', 'fiber', 'iron'], pricePerUnit: 55 },
  { id: 'salmon', name: 'Smoked Salmon', category: 'extras', icon: '🐟', calories: 208, nutrients: ['omega-3', 'protein', 'vitamin-b12', 'vitamin-d'], pricePerUnit: 120 },
  { id: 'eggs', name: 'Boiled Eggs', category: 'extras', icon: '🥚', calories: 155, nutrients: ['protein', 'vitamin-b12', 'vitamin-d'], pricePerUnit: 40 },
];

const preMadeMealBoxes: PreMadeMealBox[] = [
  {
    id: 'high-protein-breakfast',
    name: 'Power Protein Breakfast Box',
    description: 'Start your day with a protein-packed meal to fuel your muscles and keep you energized until lunch.',
    mealTime: 'breakfast',
    focusNutrients: ['protein', 'vitamin-b12', 'omega-3'],
    items: ['Greek Yogurt', 'Boiled Eggs', 'Mixed Nuts', 'Banana Chunks', 'Chia Seeds'],
    calories: 485,
    protein: 35,
    fiber: 8,
    price: 249,
    rating: 4.8,
    reviewCount: 234,
    image: '🍳',
    benefits: ['Builds muscle', 'Sustained energy', 'Brain function'],
    reviews: [
      { id: '1', userName: 'Rahul M.', rating: 5, comment: 'Perfect breakfast for my gym days! Love the protein content.', date: '2024-01-15', helpful: 23 },
      { id: '2', userName: 'Priya S.', rating: 4, comment: 'Great taste and keeps me full for hours. Would love more egg options.', date: '2024-01-12', helpful: 15 },
      { id: '3', userName: 'Amit K.', rating: 5, comment: 'Best protein breakfast I have had. Fresh and delicious!', date: '2024-01-10', helpful: 18 },
    ]
  },
  {
    id: 'high-fiber-lunch',
    name: 'Fiber Rich Lunch Bowl',
    description: 'A perfect midday meal packed with fiber to support digestion and keep you feeling satisfied.',
    mealTime: 'lunch',
    focusNutrients: ['fiber', 'iron', 'protein'],
    items: ['Baby Spinach', 'Quinoa', 'Broccoli Florets', 'Beetroot Cubes', 'Carrot Sticks', 'Chia Seeds'],
    calories: 380,
    protein: 18,
    fiber: 22,
    price: 299,
    rating: 4.6,
    reviewCount: 189,
    image: '🥗',
    benefits: ['Improves digestion', 'Heart health', 'Blood sugar control'],
    reviews: [
      { id: '1', userName: 'Sneha R.', rating: 5, comment: 'My go-to lunch! Feels so healthy and light.', date: '2024-01-14', helpful: 28 },
      { id: '2', userName: 'Vikram P.', rating: 4, comment: 'Good portion size and very filling. Great for weight management.', date: '2024-01-11', helpful: 12 },
    ]
  },
  {
    id: 'vitamin-d-boost',
    name: 'Sunshine Vitamin D Box',
    description: 'Boost your vitamin D levels with this specially curated box for bone health and immunity.',
    mealTime: 'snack',
    focusNutrients: ['vitamin-d', 'calcium', 'omega-3'],
    items: ['Smoked Salmon', 'Boiled Eggs', 'Orange Segments', 'Mixed Berries', 'Greek Yogurt'],
    calories: 420,
    protein: 28,
    fiber: 6,
    price: 349,
    rating: 4.9,
    reviewCount: 156,
    image: '☀️',
    benefits: ['Bone strength', 'Immune support', 'Mood enhancement'],
    reviews: [
      { id: '1', userName: 'Ananya G.', rating: 5, comment: 'Doctor recommended I increase Vitamin D. This box is perfect!', date: '2024-01-13', helpful: 45 },
      { id: '2', userName: 'Karthik N.', rating: 5, comment: 'Love the salmon quality. Fresh and tasty every time.', date: '2024-01-09', helpful: 32 },
    ]
  },
  {
    id: 'omega-3-heart',
    name: 'Heart Health Omega-3 Box',
    description: 'Support your cardiovascular health with omega-3 rich foods for a healthy heart.',
    mealTime: 'dinner',
    focusNutrients: ['omega-3', 'protein', 'antioxidants'],
    items: ['Smoked Salmon', 'Mixed Nuts', 'Chia & Flax Seeds', 'Kiwi Slices', 'Baby Spinach'],
    calories: 520,
    protein: 32,
    fiber: 12,
    price: 399,
    rating: 4.7,
    reviewCount: 178,
    image: '❤️',
    benefits: ['Heart health', 'Reduces inflammation', 'Brain function'],
    reviews: [
      { id: '1', userName: 'Deepak S.', rating: 5, comment: 'My cholesterol levels improved after regular consumption!', date: '2024-01-16', helpful: 56 },
      { id: '2', userName: 'Meera L.', rating: 4, comment: 'Delicious and healthy. Worth every penny.', date: '2024-01-08', helpful: 21 },
    ]
  },
  {
    id: 'b12-energy',
    name: 'Energy Boost B12 Box',
    description: 'Combat fatigue and boost energy levels with vitamin B12 rich foods.',
    mealTime: 'breakfast',
    focusNutrients: ['vitamin-b12', 'iron', 'protein'],
    items: ['Boiled Eggs', 'Baby Spinach', 'Greek Yogurt', 'Banana Chunks', 'Mixed Nuts'],
    calories: 445,
    protein: 30,
    fiber: 8,
    price: 279,
    rating: 4.8,
    reviewCount: 203,
    image: '⚡',
    benefits: ['Energy boost', 'Nervous system health', 'Red blood cell formation'],
    reviews: [
      { id: '1', userName: 'Rohan T.', rating: 5, comment: 'No more afternoon slumps! This box gives me sustained energy.', date: '2024-01-17', helpful: 38 },
      { id: '2', userName: 'Kavitha M.', rating: 5, comment: 'Perfect for vegetarians like me who struggle with B12.', date: '2024-01-14', helpful: 42 },
    ]
  },
  {
    id: 'collagen-glow',
    name: 'Glow Collagen Beauty Box',
    description: 'Nourish your skin from within with collagen-boosting foods for a radiant glow.',
    mealTime: 'snack',
    focusNutrients: ['collagen', 'antioxidants', 'vitamin-d'],
    items: ['Papaya Cubes', 'Pineapple Chunks', 'Greek Yogurt', 'Mixed Berries', 'Honey'],
    calories: 320,
    protein: 12,
    fiber: 10,
    price: 259,
    rating: 4.9,
    reviewCount: 312,
    image: '✨',
    benefits: ['Skin health', 'Anti-aging', 'Hair & nails strength'],
    reviews: [
      { id: '1', userName: 'Ishita R.', rating: 5, comment: 'My skin has never looked better! Ordering this every week.', date: '2024-01-18', helpful: 67 },
      { id: '2', userName: 'Neha D.', rating: 5, comment: 'Delicious and my beautician noticed the difference in my skin!', date: '2024-01-15', helpful: 54 },
    ]
  },
  {
    id: 'iron-power',
    name: 'Iron Power Lunch Box',
    description: 'Combat anemia and boost iron levels with this nutrient-dense lunch option.',
    mealTime: 'lunch',
    focusNutrients: ['iron', 'vitamin-b12', 'fiber'],
    items: ['Baby Spinach', 'Beetroot Cubes', 'Quinoa', 'Pomegranate Seeds', 'Rolled Oats'],
    calories: 395,
    protein: 16,
    fiber: 18,
    price: 289,
    rating: 4.6,
    reviewCount: 145,
    image: '💪',
    benefits: ['Increases hemoglobin', 'Energy production', 'Oxygen transport'],
    reviews: [
      { id: '1', userName: 'Sunita P.', rating: 5, comment: 'My hemoglobin levels improved significantly. Doctor approved!', date: '2024-01-12', helpful: 48 },
      { id: '2', userName: 'Arjun K.', rating: 4, comment: 'Great for recovery after workouts. Love the beetroot!', date: '2024-01-10', helpful: 22 },
    ]
  },
  {
    id: 'balanced-dinner',
    name: 'Complete Balanced Dinner',
    description: 'A perfectly balanced dinner with all essential nutrients for restful sleep and recovery.',
    mealTime: 'dinner',
    focusNutrients: ['protein', 'fiber', 'calcium'],
    items: ['Broccoli Florets', 'Quinoa', 'Greek Yogurt', 'Carrot Sticks', 'Cucumber Sticks', 'Honey'],
    calories: 365,
    protein: 22,
    fiber: 14,
    price: 319,
    rating: 4.7,
    reviewCount: 198,
    image: '🌙',
    benefits: ['Better sleep', 'Muscle recovery', 'Weight management'],
    reviews: [
      { id: '1', userName: 'Aditya G.', rating: 5, comment: 'Light yet satisfying. Perfect for dinner without feeling heavy.', date: '2024-01-16', helpful: 31 },
      { id: '2', userName: 'Pooja S.', rating: 4, comment: 'Helps me maintain my weight while eating delicious food!', date: '2024-01-13', helpful: 25 },
    ]
  },
];

interface SelectedItem {
  item: MealBoxItem;
  quantity: number;
}

interface MealBoxBuilderProps {
  onAddToCart: (mealBox: { name: string; price: number; calories: number; items: string[] }) => void;
}

const MealBoxBuilder = ({ onAddToCart }: MealBoxBuilderProps) => {
  const [activeTab, setActiveTab] = useState('premade');
  const [selectedMealTime, setSelectedMealTime] = useState<string>('all');
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});
  const [boxSize, setBoxSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [focusNutrients, setFocusNutrients] = useState<string[]>([]);
  const [expandedReviews, setExpandedReviews] = useState<string | null>(null);
  const [userReview, setUserReview] = useState<{ boxId: string; rating: number; comment: string } | null>(null);
  const [customMealTime, setCustomMealTime] = useState<'breakfast' | 'lunch' | 'dinner'>('breakfast');

  const mealTimeOptions = [
    { id: 'all', label: 'All Meals', icon: Utensils },
    { id: 'breakfast', label: 'Breakfast', icon: Sun },
    { id: 'lunch', label: 'Lunch', icon: Clock },
    { id: 'dinner', label: 'Dinner', icon: Moon },
    { id: 'snack', label: 'Snacks', icon: Apple },
  ];

  const boxSizes = {
    small: { label: 'Small Box', maxItems: 4, basePrice: 49 },
    medium: { label: 'Medium Box', maxItems: 6, basePrice: 79 },
    large: { label: 'Large Box', maxItems: 10, basePrice: 99 },
  };

  const currentBox = boxSizes[boxSize];

  const totalSelectedItems = Object.values(selectedItems).reduce((sum, qty) => sum + qty, 0);

  const filteredMealBoxes = useMemo(() => {
    let boxes = preMadeMealBoxes;
    if (selectedMealTime !== 'all') {
      boxes = boxes.filter(box => box.mealTime === selectedMealTime);
    }
    if (focusNutrients.length > 0) {
      boxes = boxes.filter(box => 
        focusNutrients.some(n => box.focusNutrients.includes(n))
      );
    }
    return boxes;
  }, [selectedMealTime, focusNutrients]);

  const addItem = (itemId: string) => {
    if (totalSelectedItems >= currentBox.maxItems) return;
    setSelectedItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeItem = (itemId: string) => {
    setSelectedItems(prev => {
      const newQty = (prev[itemId] || 0) - 1;
      if (newQty <= 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: newQty };
    });
  };

  const toggleNutrient = (nutrientId: string) => {
    setFocusNutrients(prev => 
      prev.includes(nutrientId) 
        ? prev.filter(n => n !== nutrientId)
        : [...prev, nutrientId]
    );
  };

  const suggestedItems = useMemo(() => {
    if (focusNutrients.length === 0) return [];
    return mealBoxIngredients
      .filter(item => item.nutrients.some(n => focusNutrients.includes(n)))
      .slice(0, 4);
  }, [focusNutrients]);

  const { totalCalories, totalPrice, selectedNutrients, totalProtein, totalFiber } = useMemo(() => {
    let calories = 0;
    let price = currentBox.basePrice;
    let protein = 0;
    let fiber = 0;
    const nutrients = new Set<string>();

    Object.entries(selectedItems).forEach(([itemId, qty]) => {
      const item = mealBoxIngredients.find(i => i.id === itemId);
      if (item) {
        calories += item.calories * qty;
        price += item.pricePerUnit * qty;
        if (item.nutrients.includes('protein')) protein += 5 * qty;
        if (item.nutrients.includes('fiber')) fiber += 3 * qty;
        item.nutrients.forEach(n => nutrients.add(n));
      }
    });

    return { totalCalories: calories, totalPrice: price, selectedNutrients: Array.from(nutrients), totalProtein: protein, totalFiber: fiber };
  }, [selectedItems, currentBox.basePrice]);

  const handleAddToCart = () => {
    const items = Object.entries(selectedItems).map(([itemId, qty]) => {
      const item = mealBoxIngredients.find(i => i.id === itemId);
      return `${item?.name} x${qty}`;
    });

    onAddToCart({
      name: `Custom ${customMealTime.charAt(0).toUpperCase() + customMealTime.slice(1)} ${currentBox.label}`,
      price: totalPrice,
      calories: totalCalories,
      items,
    });

    setSelectedItems({});
  };

  const handleAddPreMadeToCart = (box: PreMadeMealBox) => {
    onAddToCart({
      name: box.name,
      price: box.price,
      calories: box.calories,
      items: box.items,
    });
  };

  const renderStars = (rating: number, interactive = false, onRate?: (r: number) => void) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-muted-foreground/30'
            } ${interactive ? 'cursor-pointer hover:scale-110 transition-transform' : ''}`}
            onClick={() => interactive && onRate && onRate(star)}
          />
        ))}
      </div>
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'fruits': return <Apple className="h-4 w-4" />;
      case 'vegetables': return <Carrot className="h-4 w-4" />;
      default: return <Salad className="h-4 w-4" />;
    }
  };

  const getMealTimeIcon = (mealTime: string) => {
    switch (mealTime) {
      case 'breakfast': return <Sun className="h-4 w-4" />;
      case 'lunch': return <Clock className="h-4 w-4" />;
      case 'dinner': return <Moon className="h-4 w-4" />;
      default: return <Apple className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
          <Package className="h-6 w-6 text-primary" />
          Nutrition Meal Boxes
        </h2>
        <p className="text-muted-foreground mt-2">
          Fresh-cut seasonal meals designed to meet your daily nutritional needs
        </p>
      </div>

      {/* Nutrient Filters */}
      <div className="bg-card rounded-xl p-4 border border-border">
        <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          Filter by Nutrient Focus
        </h4>
        <div className="flex flex-wrap gap-2">
          {nutrientFilters.map((nutrient) => (
            <Badge
              key={nutrient.id}
              variant={focusNutrients.includes(nutrient.id) ? 'default' : 'outline'}
              className="cursor-pointer hover:bg-primary/20 transition-colors py-1.5 px-3"
              onClick={() => toggleNutrient(nutrient.id)}
            >
              <span className="mr-1.5">{nutrient.icon}</span>
              {nutrient.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="premade" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Pre-Made Boxes
          </TabsTrigger>
          <TabsTrigger value="custom" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Build Your Own
          </TabsTrigger>
        </TabsList>

        {/* Pre-Made Meal Boxes */}
        <TabsContent value="premade" className="mt-6 space-y-4">
          {/* Meal Time Filter */}
          <div className="flex flex-wrap gap-2">
            {mealTimeOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Button
                  key={option.id}
                  variant={selectedMealTime === option.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedMealTime(option.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {option.label}
                </Button>
              );
            })}
          </div>

          {/* Meal Boxes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredMealBoxes.map((box) => (
              <Card key={box.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-4xl">{box.image}</div>
                      <div>
                        <CardTitle className="text-lg">{box.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs flex items-center gap-1">
                            {getMealTimeIcon(box.mealTime)}
                            {box.mealTime.charAt(0).toUpperCase() + box.mealTime.slice(1)}
                          </Badge>
                          <div className="flex items-center gap-1">
                            {renderStars(Math.round(box.rating))}
                            <span className="text-sm font-medium">{box.rating}</span>
                            <span className="text-xs text-muted-foreground">({box.reviewCount})</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-primary">₹{box.price}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{box.description}</p>
                  
                  {/* Nutrition Badges */}
                  <div className="flex flex-wrap gap-1.5">
                    {box.focusNutrients.map((nutrient) => {
                      const n = nutrientFilters.find(nf => nf.id === nutrient);
                      return (
                        <Badge key={nutrient} variant="outline" className="text-xs">
                          {n?.icon} {n?.name}
                        </Badge>
                      );
                    })}
                  </div>

                  {/* Nutrition Stats */}
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-muted/50 rounded-lg p-2">
                      <p className="text-lg font-bold text-primary">{box.calories}</p>
                      <p className="text-xs text-muted-foreground">Calories</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-2">
                      <p className="text-lg font-bold text-accent-foreground">{box.protein}g</p>
                      <p className="text-xs text-muted-foreground">Protein</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-2">
                      <p className="text-lg font-bold text-secondary-foreground">{box.fiber}g</p>
                      <p className="text-xs text-muted-foreground">Fiber</p>
                    </div>
                  </div>

                  {/* Items */}
                  <div>
                    <p className="text-xs font-medium text-muted-foreground mb-1.5">Includes:</p>
                    <div className="flex flex-wrap gap-1">
                      {box.items.map((item, i) => (
                        <Badge key={i} variant="secondary" className="text-xs font-normal">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="flex flex-wrap gap-1.5">
                    {box.benefits.map((benefit, i) => (
                      <span key={i} className="text-xs text-primary flex items-center gap-1">
                        <Check className="h-3 w-3" />
                        {benefit}
                      </span>
                    ))}
                  </div>

                  {/* Reviews Section */}
                  <div className="border-t pt-3">
                    <button
                      className="flex items-center justify-between w-full text-sm font-medium"
                      onClick={() => setExpandedReviews(expandedReviews === box.id ? null : box.id)}
                    >
                      <span className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Customer Reviews ({box.reviews.length})
                      </span>
                      {expandedReviews === box.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                    
                    {expandedReviews === box.id && (
                      <div className="mt-3 space-y-3">
                        {box.reviews.map((review) => (
                          <div key={review.id} className="bg-muted/30 rounded-lg p-3 space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium">
                                  {review.userName.charAt(0)}
                                </div>
                                <div>
                                  <p className="text-sm font-medium">{review.userName}</p>
                                  <p className="text-xs text-muted-foreground">{review.date}</p>
                                </div>
                              </div>
                              {renderStars(review.rating)}
                            </div>
                            <p className="text-sm text-muted-foreground">{review.comment}</p>
                            <p className="text-xs text-muted-foreground">
                              👍 {review.helpful} people found this helpful
                            </p>
                          </div>
                        ))}
                        
                        {/* Add Review */}
                        <div className="border-t pt-3">
                          <p className="text-sm font-medium mb-2">Write a Review</p>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">Your Rating:</span>
                              {renderStars(
                                userReview?.boxId === box.id ? userReview.rating : 0,
                                true,
                                (r) => setUserReview({ boxId: box.id, rating: r, comment: userReview?.comment || '' })
                              )}
                            </div>
                            <Textarea
                              placeholder="Share your experience..."
                              className="h-20 text-sm"
                              value={userReview?.boxId === box.id ? userReview.comment : ''}
                              onChange={(e) => setUserReview({ 
                                boxId: box.id, 
                                rating: userReview?.rating || 0, 
                                comment: e.target.value 
                              })}
                            />
                            <Button size="sm" className="w-full">
                              Submit Review
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <Button 
                    className="w-full" 
                    onClick={() => handleAddPreMadeToCart(box)}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredMealBoxes.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No meal boxes match your filters</p>
              <Button variant="link" onClick={() => { setSelectedMealTime('all'); setFocusNutrients([]); }}>
                Clear filters
              </Button>
            </div>
          )}
        </TabsContent>

        {/* Custom Meal Box Builder */}
        <TabsContent value="custom" className="mt-6">
          <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Build Your Custom Meal Box
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Choose fresh-cut seasonal items for your perfect daily nutrition box
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Meal Time Selection */}
              <div>
                <h4 className="text-sm font-medium mb-3">Select Meal Time</h4>
                <div className="grid grid-cols-3 gap-2">
                  {(['breakfast', 'lunch', 'dinner'] as const).map((meal) => (
                    <Button
                      key={meal}
                      variant={customMealTime === meal ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCustomMealTime(meal)}
                      className="flex items-center gap-2"
                    >
                      {getMealTimeIcon(meal)}
                      {meal.charAt(0).toUpperCase() + meal.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Box Size Selection */}
              <div>
                <h4 className="text-sm font-medium mb-3">Select Box Size</h4>
                <div className="grid grid-cols-3 gap-2">
                  {Object.entries(boxSizes).map(([size, config]) => (
                    <Button
                      key={size}
                      variant={boxSize === size ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => {
                        setBoxSize(size as 'small' | 'medium' | 'large');
                        setSelectedItems({});
                      }}
                      className="flex-col h-auto py-3"
                    >
                      <span className="font-semibold">{config.label}</span>
                      <span className="text-xs opacity-80">Up to {config.maxItems} items</span>
                      <span className="text-xs opacity-80">₹{config.basePrice} base</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Nutrient Focus */}
              {suggestedItems.length > 0 && (
                <div className="p-3 bg-primary/10 rounded-lg">
                  <p className="text-xs text-muted-foreground mb-2">Suggested for your goals:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedItems.map(item => (
                      <Button
                        key={item.id}
                        size="sm"
                        variant="secondary"
                        onClick={() => addItem(item.id)}
                        disabled={totalSelectedItems >= currentBox.maxItems}
                        className="text-xs"
                      >
                        {item.icon} {item.name}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Ingredient Selection */}
              <div className="space-y-4">
                {(['fruits', 'vegetables', 'extras'] as const).map(category => (
                  <div key={category}>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2 capitalize">
                      {getCategoryIcon(category)}
                      {category}
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {mealBoxIngredients
                        .filter(item => item.category === category)
                        .map(item => {
                          const qty = selectedItems[item.id] || 0;
                          return (
                            <div
                              key={item.id}
                              className={`flex items-center justify-between p-2 rounded-lg border transition-colors ${
                                qty > 0 ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/30'
                              }`}
                            >
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                <span className="text-lg">{item.icon}</span>
                                <div className="min-w-0">
                                  <p className="text-xs font-medium truncate">{item.name}</p>
                                  <p className="text-xs text-muted-foreground">₹{item.pricePerUnit}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                {qty > 0 && (
                                  <>
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      className="h-6 w-6"
                                      onClick={() => removeItem(item.id)}
                                    >
                                      <Minus className="h-3 w-3" />
                                    </Button>
                                    <span className="w-4 text-center text-sm font-medium">{qty}</span>
                                  </>
                                )}
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-6 w-6"
                                  onClick={() => addItem(item.id)}
                                  disabled={totalSelectedItems >= currentBox.maxItems}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Items selected</span>
                  <span className="font-medium">{totalSelectedItems} / {currentBox.maxItems}</span>
                </div>
                <Progress value={(totalSelectedItems / currentBox.maxItems) * 100} className="h-2" />
              </div>

              {/* Summary */}
              {totalSelectedItems > 0 && (
                <div className="p-4 bg-card rounded-lg border border-border space-y-3">
                  <h4 className="font-medium">Your Custom {customMealTime.charAt(0).toUpperCase() + customMealTime.slice(1)} Box</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedNutrients.map(nutrientId => {
                      const nutrient = nutrientFilters.find(n => n.id === nutrientId);
                      return (
                        <Badge key={nutrientId} variant="secondary" className="text-xs">
                          <Check className="h-3 w-3 mr-1" />
                          {nutrient?.name}
                        </Badge>
                      );
                    })}
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center text-sm">
                    <div className="bg-muted/50 rounded-lg p-2">
                      <p className="font-bold text-primary">{totalCalories}</p>
                      <p className="text-xs text-muted-foreground">kcal</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-2">
                      <p className="font-bold text-accent-foreground">{totalProtein}g</p>
                      <p className="text-xs text-muted-foreground">Protein</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-2">
                      <p className="font-bold text-secondary-foreground">{totalFiber}g</p>
                      <p className="text-xs text-muted-foreground">Fiber</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-2">
                      <p className="font-bold text-primary">₹{totalPrice}</p>
                      <p className="text-xs text-muted-foreground">Total</p>
                    </div>
                  </div>
                  <Button className="w-full" onClick={handleAddToCart}>
                    <Package className="h-4 w-4 mr-2" />
                    Add Box to Cart
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MealBoxBuilder;
