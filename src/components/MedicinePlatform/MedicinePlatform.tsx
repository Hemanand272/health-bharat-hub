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
import medications1 from "@/assets/medications-1.jpg";
import medications2 from "@/assets/medications-2.jpg";
import medications3 from "@/assets/medications-3.jpg";
import medications4 from "@/assets/medications-4.jpg";

const categories = [
  "All", "Vitamins", "Pain Relief", "Immunity", "Digestive", 
  "Skin Care", "Hair Care", "Ayurvedic", "Homeopathic"
];

const medicineImages = [medications1, medications2, medications3, medications4];

const medicines = [
  { id: 1, name: "Vitamin D3 2000 IU", brand: "HealthFirst", price: 299, mrp: 399, rating: 4.8, reviews: 2345, category: "Vitamins", imageIndex: 0, prescription: false, discount: 25 },
  { id: 2, name: "Omega-3 Fish Oil Capsules", brand: "NaturePlus", price: 449, mrp: 599, rating: 4.7, reviews: 1876, category: "Vitamins", imageIndex: 1, prescription: false, discount: 25 },
  { id: 3, name: "Paracetamol 500mg", brand: "MediCare", price: 35, mrp: 45, rating: 4.9, reviews: 5432, category: "Pain Relief", imageIndex: 3, prescription: false, discount: 22 },
  { id: 4, name: "Immunity Booster Tablets", brand: "AyurVeda", price: 399, mrp: 499, rating: 4.6, reviews: 987, category: "Immunity", imageIndex: 2, prescription: false, discount: 20 },
  { id: 5, name: "Probiotics 50 Billion CFU", brand: "GutHealth", price: 599, mrp: 799, rating: 4.5, reviews: 765, category: "Digestive", imageIndex: 3, prescription: false, discount: 25 },
  { id: 6, name: "Biotin 10000mcg", brand: "HairGlow", price: 349, mrp: 449, rating: 4.7, reviews: 2134, category: "Hair Care", imageIndex: 0, prescription: false, discount: 22 },
  { id: 7, name: "Ashwagandha Capsules", brand: "HerbNature", price: 279, mrp: 399, rating: 4.8, reviews: 3456, category: "Ayurvedic", imageIndex: 2, prescription: false, discount: 30 },
  { id: 8, name: "Vitamin C 1000mg", brand: "CitrusPower", price: 199, mrp: 299, rating: 4.9, reviews: 4567, category: "Immunity", imageIndex: 3, prescription: false, discount: 33 },
  { id: 9, name: "Multivitamin for Men", brand: "ManPower", price: 549, mrp: 699, rating: 4.6, reviews: 1234, category: "Vitamins", imageIndex: 3, prescription: false, discount: 21 },
  { id: 10, name: "Aloe Vera Gel", brand: "SkinCare Pro", price: 149, mrp: 199, rating: 4.7, reviews: 2567, category: "Skin Care", imageIndex: 2, prescription: false, discount: 25 },
  { id: 11, name: "Triphala Churna", brand: "VedicHerbs", price: 129, mrp: 179, rating: 4.8, reviews: 1890, category: "Ayurvedic", imageIndex: 2, prescription: false, discount: 28 },
  { id: 12, name: "Zinc Tablets 50mg", brand: "MineralMax", price: 179, mrp: 249, rating: 4.5, reviews: 876, category: "Immunity", imageIndex: 0, prescription: false, discount: 28 },
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
    <section className="py-12 md:py-20 lg:py-32 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-3 md:px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-2 bg-primary/10 rounded-full text-primary mb-3 md:mb-4">
            <Pill className="w-4 h-4" />
            <span className="text-xs md:text-sm font-medium">Medicine & Health Store</span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 gradient-text">
            Order Medicines Online
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            Browse, research, and order genuine medicines with great discounts. Fast delivery to your doorstep.
          </p>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-6 md:mb-8">
          <div className="flex items-center gap-2 md:gap-3 p-2 md:p-4 bg-secondary/30 rounded-xl border border-border">
            <Shield className="w-6 h-6 md:w-8 md:h-8 text-green-500 shrink-0" />
            <div>
              <p className="font-semibold text-xs md:text-sm">100% Genuine</p>
              <p className="text-[10px] md:text-xs text-muted-foreground hidden sm:block">Verified products</p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3 p-2 md:p-4 bg-secondary/30 rounded-xl border border-border">
            <Truck className="w-6 h-6 md:w-8 md:h-8 text-blue-500 shrink-0" />
            <div>
              <p className="font-semibold text-xs md:text-sm">Fast Delivery</p>
              <p className="text-[10px] md:text-xs text-muted-foreground hidden sm:block">Within 24-48 hrs</p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3 p-2 md:p-4 bg-secondary/30 rounded-xl border border-border">
            <Percent className="w-6 h-6 md:w-8 md:h-8 text-orange-500 shrink-0" />
            <div>
              <p className="font-semibold text-xs md:text-sm">Best Prices</p>
              <p className="text-[10px] md:text-xs text-muted-foreground hidden sm:block">Up to 50% off</p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3 p-2 md:p-4 bg-secondary/30 rounded-xl border border-border">
            <Package className="w-6 h-6 md:w-8 md:h-8 text-purple-500 shrink-0" />
            <div>
              <p className="font-semibold text-xs md:text-sm">Free Returns</p>
              <p className="text-[10px] md:text-xs text-muted-foreground hidden sm:block">Easy returns</p>
            </div>
          </div>
        </div>

        {/* Search and Cart */}
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
            <Input
              placeholder="Search medicines, vitamins, health products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 md:pl-10 h-10 md:h-12 text-sm"
            />
          </div>
          <Button variant="outline" className="h-10 md:h-12 gap-2 relative">
            <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-sm">Cart</span>
            {cartCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 md:h-6 md:w-6 rounded-full p-0 flex items-center justify-center text-xs">
                {cartCount}
              </Badge>
            )}
            {cartTotal > 0 && (
              <span className="font-semibold text-sm">₹{cartTotal}</span>
            )}
          </Button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-6 md:mb-8 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat)}
              className="whitespace-nowrap text-xs md:text-sm h-8 md:h-9"
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
          {filteredMedicines.map((med) => (
            <Card key={med.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-2 md:p-4">
                <div className="relative">
                  <div className="aspect-square rounded-xl mb-2 md:mb-4 overflow-hidden">
                    <img 
                      src={medicineImages[med.imageIndex]} 
                      alt={med.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <Badge className="absolute top-1 md:top-2 left-1 md:left-2 bg-green-500 text-xs">
                    {med.discount}% OFF
                  </Badge>
                  <button
                    onClick={() => toggleWishlist(med.id)}
                    className="absolute top-1 md:top-2 right-1 md:right-2 p-1.5 md:p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
                  >
                    <Heart 
                      className={`w-4 h-4 md:w-5 md:h-5 ${wishlist.includes(med.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
                    />
                  </button>
                </div>

                <div className="space-y-1 md:space-y-2">
                  <p className="text-[10px] md:text-xs text-primary font-medium">{med.brand}</p>
                  <h3 className="font-semibold text-xs md:text-sm line-clamp-2 group-hover:text-primary transition-colors">
                    {med.name}
                  </h3>
                  
                  <div className="flex items-center gap-1 md:gap-2">
                    <div className="flex items-center gap-0.5 md:gap-1 text-xs">
                      <Star className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
                      <span>{med.rating}</span>
                    </div>
                    <span className="text-[10px] md:text-xs text-muted-foreground">
                      ({med.reviews})
                    </span>
                  </div>

                  <div className="flex items-center gap-1 md:gap-2">
                    <span className="text-sm md:text-xl font-bold text-primary">₹{med.price}</span>
                    <span className="text-[10px] md:text-sm text-muted-foreground line-through">₹{med.mrp}</span>
                  </div>

                  {getCartQuantity(med.id) > 0 ? (
                    <div className="flex items-center gap-1 md:gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 md:h-10 md:w-10"
                        onClick={() => removeFromCart(med.id)}
                      >
                        <Minus className="w-3 h-3 md:w-4 md:h-4" />
                      </Button>
                      <span className="w-6 md:w-10 text-center font-semibold text-sm">
                        {getCartQuantity(med.id)}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 md:h-10 md:w-10"
                        onClick={() => addToCart(med.id)}
                      >
                        <Plus className="w-3 h-3 md:w-4 md:h-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      className="w-full h-8 md:h-10 text-xs md:text-sm"
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
          <div className="text-center py-12 md:py-16">
            <Package className="w-12 h-12 md:w-16 md:h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg md:text-xl font-semibold mb-2">No products found</h3>
            <p className="text-sm text-muted-foreground">Try searching with different keywords</p>
          </div>
        )}
      </div>
    </section>
  );
};
