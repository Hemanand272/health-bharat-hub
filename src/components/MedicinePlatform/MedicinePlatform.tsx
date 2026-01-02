import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, ShoppingCart, Star, Package, Truck, 
  Shield, Percent, Heart, Plus, Minus, Pill,
  Filter, ChevronDown
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const categories = [
  "All", "Vitamins", "Pain Relief", "Immunity", "Digestive", 
  "Skin Care", "Hair Care", "Ayurvedic", "Homeopathic"
];

const medicines = [
  { id: 1, name: "Vitamin D3 2000 IU", brand: "HealthFirst", price: 299, mrp: 399, rating: 4.8, reviews: 2345, category: "Vitamins", image: "💊", prescription: false, discount: 25 },
  { id: 2, name: "Omega-3 Fish Oil Capsules", brand: "NaturePlus", price: 449, mrp: 599, rating: 4.7, reviews: 1876, category: "Vitamins", image: "🐟", prescription: false, discount: 25 },
  { id: 3, name: "Paracetamol 500mg", brand: "MediCare", price: 35, mrp: 45, rating: 4.9, reviews: 5432, category: "Pain Relief", image: "💉", prescription: false, discount: 22 },
  { id: 4, name: "Immunity Booster Tablets", brand: "AyurVeda", price: 399, mrp: 499, rating: 4.6, reviews: 987, category: "Immunity", image: "🛡️", prescription: false, discount: 20 },
  { id: 5, name: "Probiotics 50 Billion CFU", brand: "GutHealth", price: 599, mrp: 799, rating: 4.5, reviews: 765, category: "Digestive", image: "🦠", prescription: false, discount: 25 },
  { id: 6, name: "Biotin 10000mcg", brand: "HairGlow", price: 349, mrp: 449, rating: 4.7, reviews: 2134, category: "Hair Care", image: "💇", prescription: false, discount: 22 },
  { id: 7, name: "Ashwagandha Capsules", brand: "HerbNature", price: 279, mrp: 399, rating: 4.8, reviews: 3456, category: "Ayurvedic", image: "🌿", prescription: false, discount: 30 },
  { id: 8, name: "Vitamin C 1000mg", brand: "CitrusPower", price: 199, mrp: 299, rating: 4.9, reviews: 4567, category: "Immunity", image: "🍊", prescription: false, discount: 33 },
  { id: 9, name: "Multivitamin for Men", brand: "ManPower", price: 549, mrp: 699, rating: 4.6, reviews: 1234, category: "Vitamins", image: "💪", prescription: false, discount: 21 },
  { id: 10, name: "Aloe Vera Gel", brand: "SkinCare Pro", price: 149, mrp: 199, rating: 4.7, reviews: 2567, category: "Skin Care", image: "🧴", prescription: false, discount: 25 },
  { id: 11, name: "Triphala Churna", brand: "VedicHerbs", price: 129, mrp: 179, rating: 4.8, reviews: 1890, category: "Ayurvedic", image: "🌱", prescription: false, discount: 28 },
  { id: 12, name: "Zinc Tablets 50mg", brand: "MineralMax", price: 179, mrp: 249, rating: 4.5, reviews: 876, category: "Immunity", image: "⚡", prescription: false, discount: 28 },
];

interface CartItem {
  id: number;
  quantity: number;
}

export const MedicinePlatform = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const filteredMedicines = medicines.filter(med => {
    const matchesSearch = med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         med.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || med.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (id: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        return prev.map(item => 
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id, quantity: 1 }];
    });
    toast({
      title: "Added to cart",
      description: "Item has been added to your cart",
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing && existing.quantity > 1) {
        return prev.map(item => 
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prev.filter(item => item.id !== id);
    });
  };

  const toggleWishlist = (id: number) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const getCartQuantity = (id: number) => {
    return cart.find(item => item.id === id)?.quantity || 0;
  };

  const cartTotal = cart.reduce((total, item) => {
    const med = medicines.find(m => m.id === item.id);
    return total + (med?.price || 0) * item.quantity;
  }, 0);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary mb-4">
            <Pill className="w-4 h-4" />
            <span className="text-sm font-medium">Medicine & Health Store</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 gradient-text">
            Order Medicines Online
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse, research, and order genuine medicines with great discounts. Fast delivery to your doorstep.
          </p>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="flex items-center gap-3 p-4 bg-secondary/30 rounded-xl border border-border">
            <Shield className="w-8 h-8 text-green-500" />
            <div>
              <p className="font-semibold text-sm">100% Genuine</p>
              <p className="text-xs text-muted-foreground">Verified products</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-secondary/30 rounded-xl border border-border">
            <Truck className="w-8 h-8 text-blue-500" />
            <div>
              <p className="font-semibold text-sm">Fast Delivery</p>
              <p className="text-xs text-muted-foreground">Within 24-48 hrs</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-secondary/30 rounded-xl border border-border">
            <Percent className="w-8 h-8 text-orange-500" />
            <div>
              <p className="font-semibold text-sm">Best Prices</p>
              <p className="text-xs text-muted-foreground">Up to 50% off</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 bg-secondary/30 rounded-xl border border-border">
            <Package className="w-8 h-8 text-purple-500" />
            <div>
              <p className="font-semibold text-sm">Free Returns</p>
              <p className="text-xs text-muted-foreground">Easy returns</p>
            </div>
          </div>
        </div>

        {/* Search and Cart */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search medicines, vitamins, health products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          <Button variant="outline" className="h-12 gap-2 relative">
            <ShoppingCart className="w-5 h-5" />
            <span>Cart</span>
            {cartCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center">
                {cartCount}
              </Badge>
            )}
            {cartTotal > 0 && (
              <span className="font-semibold">₹{cartTotal}</span>
            )}
          </Button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className="whitespace-nowrap"
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMedicines.map((med) => (
            <Card key={med.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-4">
                <div className="relative">
                  <div className="text-6xl text-center py-6 bg-secondary/30 rounded-xl mb-4">
                    {med.image}
                  </div>
                  <Badge className="absolute top-2 left-2 bg-green-500">
                    {med.discount}% OFF
                  </Badge>
                  <button
                    onClick={() => toggleWishlist(med.id)}
                    className="absolute top-2 right-2 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
                  >
                    <Heart 
                      className={`w-5 h-5 ${wishlist.includes(med.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
                    />
                  </button>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-primary font-medium">{med.brand}</p>
                  <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    {med.name}
                  </h3>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{med.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      ({med.reviews} reviews)
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-primary">₹{med.price}</span>
                    <span className="text-sm text-muted-foreground line-through">₹{med.mrp}</span>
                  </div>

                  {getCartQuantity(med.id) > 0 ? (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() => removeFromCart(med.id)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-10 text-center font-semibold">
                        {getCartQuantity(med.id)}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() => addToCart(med.id)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      className="w-full"
                      onClick={() => addToCart(med.id)}
                    >
                      Add to Cart
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMedicines.length === 0 && (
          <div className="text-center py-16">
            <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No products found</h3>
            <p className="text-muted-foreground">Try searching with different keywords</p>
          </div>
        )}
      </div>
    </section>
  );
};
