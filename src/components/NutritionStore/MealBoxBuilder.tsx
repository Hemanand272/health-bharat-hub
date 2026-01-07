import { useState, useMemo } from 'react';
import { Package, Plus, Minus, Sparkles, Check, Apple, Carrot, Salad } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
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

const mealBoxIngredients: MealBoxItem[] = [
  { id: 'apple', name: 'Apple Slices', category: 'fruits', icon: '🍎', calories: 52, nutrients: ['fiber', 'antioxidants'], pricePerUnit: 25 },
  { id: 'orange', name: 'Orange Segments', category: 'fruits', icon: '🍊', calories: 47, nutrients: ['vitamin-d', 'antioxidants'], pricePerUnit: 20 },
  { id: 'banana', name: 'Banana Chunks', category: 'fruits', icon: '🍌', calories: 89, nutrients: ['fiber', 'protein'], pricePerUnit: 15 },
  { id: 'berries', name: 'Mixed Berries', category: 'fruits', icon: '🫐', calories: 32, nutrients: ['antioxidants', 'fiber'], pricePerUnit: 40 },
  { id: 'mango', name: 'Mango Cubes', category: 'fruits', icon: '🥭', calories: 60, nutrients: ['vitamin-d', 'antioxidants'], pricePerUnit: 35 },
  { id: 'grapes', name: 'Seedless Grapes', category: 'fruits', icon: '🍇', calories: 67, nutrients: ['antioxidants', 'fiber'], pricePerUnit: 30 },
  { id: 'kiwi', name: 'Kiwi Slices', category: 'fruits', icon: '🥝', calories: 61, nutrients: ['vitamin-d', 'fiber'], pricePerUnit: 35 },
  { id: 'pomegranate', name: 'Pomegranate Seeds', category: 'fruits', icon: '🍎', calories: 83, nutrients: ['iron', 'antioxidants'], pricePerUnit: 45 },
  { id: 'cucumber', name: 'Cucumber Sticks', category: 'vegetables', icon: '🥒', calories: 16, nutrients: ['fiber', 'calcium'], pricePerUnit: 15 },
  { id: 'carrot', name: 'Carrot Sticks', category: 'vegetables', icon: '🥕', calories: 41, nutrients: ['vitamin-d', 'fiber'], pricePerUnit: 15 },
  { id: 'celery', name: 'Celery Sticks', category: 'vegetables', icon: '🥬', calories: 14, nutrients: ['fiber', 'calcium'], pricePerUnit: 15 },
  { id: 'beetroot', name: 'Beetroot Cubes', category: 'vegetables', icon: '🔴', calories: 43, nutrients: ['iron', 'fiber'], pricePerUnit: 20 },
  { id: 'nuts', name: 'Mixed Nuts', category: 'extras', icon: '🥜', calories: 607, nutrients: ['omega-3', 'protein'], pricePerUnit: 50 },
  { id: 'seeds', name: 'Chia & Flax Seeds', category: 'extras', icon: '🌱', calories: 486, nutrients: ['omega-3', 'fiber', 'protein'], pricePerUnit: 40 },
  { id: 'honey', name: 'Organic Honey', category: 'extras', icon: '🍯', calories: 304, nutrients: ['antioxidants'], pricePerUnit: 30 },
  { id: 'yogurt', name: 'Greek Yogurt', category: 'extras', icon: '🥛', calories: 59, nutrients: ['protein', 'calcium', 'collagen'], pricePerUnit: 45 },
];

interface SelectedItem {
  item: MealBoxItem;
  quantity: number;
}

interface MealBoxBuilderProps {
  onAddToCart: (mealBox: { name: string; price: number; calories: number; items: string[] }) => void;
}

const MealBoxBuilder = ({ onAddToCart }: MealBoxBuilderProps) => {
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});
  const [boxSize, setBoxSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [focusNutrients, setFocusNutrients] = useState<string[]>([]);

  const boxSizes = {
    small: { label: 'Small Box', maxItems: 4, basePrice: 49 },
    medium: { label: 'Medium Box', maxItems: 6, basePrice: 79 },
    large: { label: 'Large Box', maxItems: 10, basePrice: 99 },
  };

  const currentBox = boxSizes[boxSize];

  const totalSelectedItems = Object.values(selectedItems).reduce((sum, qty) => sum + qty, 0);

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

  const { totalCalories, totalPrice, selectedNutrients } = useMemo(() => {
    let calories = 0;
    let price = currentBox.basePrice;
    const nutrients = new Set<string>();

    Object.entries(selectedItems).forEach(([itemId, qty]) => {
      const item = mealBoxIngredients.find(i => i.id === itemId);
      if (item) {
        calories += item.calories * qty;
        price += item.pricePerUnit * qty;
        item.nutrients.forEach(n => nutrients.add(n));
      }
    });

    return { totalCalories: calories, totalPrice: price, selectedNutrients: Array.from(nutrients) };
  }, [selectedItems, currentBox.basePrice]);

  const handleAddToCart = () => {
    const items = Object.entries(selectedItems).map(([itemId, qty]) => {
      const item = mealBoxIngredients.find(i => i.id === itemId);
      return `${item?.name} x${qty}`;
    });

    onAddToCart({
      name: `Custom ${currentBox.label}`,
      price: totalPrice,
      calories: totalCalories,
      items,
    });

    setSelectedItems({});
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'fruits': return <Apple className="h-4 w-4" />;
      case 'vegetables': return <Carrot className="h-4 w-4" />;
      default: return <Salad className="h-4 w-4" />;
    }
  };

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" />
          Build Your Custom Meal Box
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Choose fresh-cut seasonal fruits & veggies for your perfect daily nutrition box
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
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
        <div>
          <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            Focus on Nutrients (optional)
          </h4>
          <div className="flex flex-wrap gap-2">
            {nutrientFilters.map((nutrient) => (
              <Badge
                key={nutrient.id}
                variant={focusNutrients.includes(nutrient.id) ? 'default' : 'outline'}
                className="cursor-pointer hover:bg-primary/20 transition-colors"
                onClick={() => toggleNutrient(nutrient.id)}
              >
                <span className="mr-1">{nutrient.icon}</span>
                {nutrient.name}
              </Badge>
            ))}
          </div>
          {suggestedItems.length > 0 && (
            <div className="mt-3 p-3 bg-primary/10 rounded-lg">
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
        </div>

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
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${(totalSelectedItems / currentBox.maxItems) * 100}%` }}
            />
          </div>
        </div>

        {/* Summary */}
        {totalSelectedItems > 0 && (
          <div className="p-4 bg-card rounded-lg border border-border space-y-3">
            <h4 className="font-medium">Your Custom Box</h4>
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
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Total Calories</p>
                <p className="font-semibold text-lg">{totalCalories} kcal</p>
              </div>
              <div>
                <p className="text-muted-foreground">Total Price</p>
                <p className="font-semibold text-lg text-primary">₹{totalPrice}</p>
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
  );
};

export default MealBoxBuilder;
