import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, ShoppingCart, Star, Package, Truck, 
  Shield, Percent, Heart, Plus, Minus, Pill,
  X, FileText, Receipt, CreditCard, Tag,
  CheckCircle, ArrowLeft, Stethoscope, Sparkles,
  Baby, Eye, Brain, Bone, Droplet, Leaf
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import medications1 from "@/assets/medications-1.jpg";
import medications2 from "@/assets/medications-2.jpg";
import medications3 from "@/assets/medications-3.jpg";
import medications4 from "@/assets/medications-4.jpg";

const categories = [
  { id: "All", name: "All", icon: Package },
  { id: "Vitamins", name: "Vitamins", icon: Sparkles },
  { id: "Pain Relief", name: "Pain Relief", icon: Pill },
  { id: "Immunity", name: "Immunity", icon: Shield },
  { id: "Digestive", name: "Digestive", icon: Droplet },
  { id: "Skin Care", name: "Skin Care", icon: Heart },
  { id: "Hair Care", name: "Hair Care", icon: Sparkles },
  { id: "Ayurvedic", name: "Ayurvedic", icon: Leaf },
  { id: "Eye Care", name: "Eye Care", icon: Eye },
  { id: "Bone Health", name: "Bone Health", icon: Bone },
  { id: "Baby Care", name: "Baby Care", icon: Baby },
  { id: "Brain Health", name: "Brain Health", icon: Brain },
  { id: "Devices", name: "Devices", icon: Stethoscope },
];

const medicineImages = [medications1, medications2, medications3, medications4];

const medicines = [
  // Vitamins
  { id: 1, name: "Vitamin D3 2000 IU", brand: "HealthFirst", price: 299, mrp: 399, rating: 4.8, reviews: 2345, category: "Vitamins", imageIndex: 0, prescription: false, discount: 25 },
  { id: 2, name: "Omega-3 Fish Oil Capsules", brand: "NaturePlus", price: 449, mrp: 599, rating: 4.7, reviews: 1876, category: "Vitamins", imageIndex: 1, prescription: false, discount: 25 },
  { id: 9, name: "Multivitamin for Men", brand: "ManPower", price: 549, mrp: 699, rating: 4.6, reviews: 1234, category: "Vitamins", imageIndex: 3, prescription: false, discount: 21 },
  { id: 12, name: "Zinc Tablets 50mg", brand: "MineralMax", price: 179, mrp: 249, rating: 4.5, reviews: 876, category: "Immunity", imageIndex: 0, prescription: false, discount: 28 },
  { id: 13, name: "Vitamin B12 1500mcg", brand: "NeuroVita", price: 329, mrp: 449, rating: 4.7, reviews: 1567, category: "Vitamins", imageIndex: 2, prescription: false, discount: 27 },
  { id: 14, name: "Vitamin E 400 IU", brand: "SkinGlow", price: 249, mrp: 349, rating: 4.6, reviews: 987, category: "Vitamins", imageIndex: 1, prescription: false, discount: 29 },
  { id: 15, name: "Folic Acid 5mg", brand: "FemCare", price: 129, mrp: 179, rating: 4.8, reviews: 2134, category: "Vitamins", imageIndex: 0, prescription: false, discount: 28 },
  
  // Pain Relief
  { id: 3, name: "Paracetamol 500mg", brand: "MediCare", price: 35, mrp: 45, rating: 4.9, reviews: 5432, category: "Pain Relief", imageIndex: 3, prescription: false, discount: 22 },
  { id: 16, name: "Ibuprofen 400mg", brand: "PainAway", price: 49, mrp: 65, rating: 4.8, reviews: 3421, category: "Pain Relief", imageIndex: 2, prescription: false, discount: 25 },
  { id: 17, name: "Diclofenac Gel", brand: "JointFlex", price: 149, mrp: 199, rating: 4.7, reviews: 1876, category: "Pain Relief", imageIndex: 1, prescription: false, discount: 25 },
  { id: 18, name: "Muscle Relaxant Spray", brand: "RelaxMuscle", price: 179, mrp: 249, rating: 4.5, reviews: 1234, category: "Pain Relief", imageIndex: 0, prescription: false, discount: 28 },
  
  // Immunity
  { id: 4, name: "Immunity Booster Tablets", brand: "AyurVeda", price: 399, mrp: 499, rating: 4.6, reviews: 987, category: "Immunity", imageIndex: 2, prescription: false, discount: 20 },
  { id: 8, name: "Vitamin C 1000mg", brand: "CitrusPower", price: 199, mrp: 299, rating: 4.9, reviews: 4567, category: "Immunity", imageIndex: 3, prescription: false, discount: 33 },
  { id: 19, name: "Elderberry Extract", brand: "BerryBoost", price: 449, mrp: 599, rating: 4.7, reviews: 876, category: "Immunity", imageIndex: 1, prescription: false, discount: 25 },
  { id: 20, name: "Echinacea Capsules", brand: "HerbShield", price: 279, mrp: 379, rating: 4.6, reviews: 654, category: "Immunity", imageIndex: 2, prescription: false, discount: 26 },
  
  // Digestive
  { id: 5, name: "Probiotics 50 Billion CFU", brand: "GutHealth", price: 599, mrp: 799, rating: 4.5, reviews: 765, category: "Digestive", imageIndex: 3, prescription: false, discount: 25 },
  { id: 21, name: "Digestive Enzymes", brand: "DigestPro", price: 349, mrp: 449, rating: 4.6, reviews: 1234, category: "Digestive", imageIndex: 0, prescription: false, discount: 22 },
  { id: 22, name: "Fiber Supplement", brand: "FiberPlus", price: 249, mrp: 329, rating: 4.5, reviews: 876, category: "Digestive", imageIndex: 1, prescription: false, discount: 24 },
  { id: 23, name: "Antacid Tablets", brand: "AcidRelief", price: 89, mrp: 129, rating: 4.8, reviews: 3456, category: "Digestive", imageIndex: 2, prescription: false, discount: 31 },
  
  // Hair Care
  { id: 6, name: "Biotin 10000mcg", brand: "HairGlow", price: 349, mrp: 449, rating: 4.7, reviews: 2134, category: "Hair Care", imageIndex: 0, prescription: false, discount: 22 },
  { id: 24, name: "Hair Growth Serum", brand: "FolliCare", price: 599, mrp: 799, rating: 4.6, reviews: 1567, category: "Hair Care", imageIndex: 1, prescription: false, discount: 25 },
  { id: 25, name: "Keratin Supplements", brand: "KeratinPlus", price: 449, mrp: 599, rating: 4.5, reviews: 987, category: "Hair Care", imageIndex: 2, prescription: false, discount: 25 },
  
  // Ayurvedic
  { id: 7, name: "Ashwagandha Capsules", brand: "HerbNature", price: 279, mrp: 399, rating: 4.8, reviews: 3456, category: "Ayurvedic", imageIndex: 2, prescription: false, discount: 30 },
  { id: 11, name: "Triphala Churna", brand: "VedicHerbs", price: 129, mrp: 179, rating: 4.8, reviews: 1890, category: "Ayurvedic", imageIndex: 2, prescription: false, discount: 28 },
  { id: 26, name: "Brahmi Capsules", brand: "MindHerbs", price: 249, mrp: 349, rating: 4.7, reviews: 1234, category: "Ayurvedic", imageIndex: 0, prescription: false, discount: 29 },
  { id: 27, name: "Tulsi Drops", brand: "AyurLife", price: 149, mrp: 199, rating: 4.9, reviews: 2345, category: "Ayurvedic", imageIndex: 1, prescription: false, discount: 25 },
  { id: 28, name: "Shilajit Capsules", brand: "VitalHerbs", price: 499, mrp: 699, rating: 4.6, reviews: 876, category: "Ayurvedic", imageIndex: 3, prescription: false, discount: 29 },
  
  // Skin Care
  { id: 10, name: "Aloe Vera Gel", brand: "SkinCare Pro", price: 149, mrp: 199, rating: 4.7, reviews: 2567, category: "Skin Care", imageIndex: 2, prescription: false, discount: 25 },
  { id: 29, name: "Collagen Peptides", brand: "GlowSkin", price: 799, mrp: 999, rating: 4.8, reviews: 1567, category: "Skin Care", imageIndex: 0, prescription: false, discount: 20 },
  { id: 30, name: "Hyaluronic Acid Serum", brand: "HydraGlow", price: 549, mrp: 749, rating: 4.7, reviews: 1234, category: "Skin Care", imageIndex: 1, prescription: false, discount: 27 },
  { id: 31, name: "Vitamin C Face Serum", brand: "BrightFace", price: 399, mrp: 549, rating: 4.8, reviews: 2345, category: "Skin Care", imageIndex: 3, prescription: false, discount: 27 },
  
  // Eye Care
  { id: 32, name: "Lutein Eye Support", brand: "VisionPlus", price: 449, mrp: 599, rating: 4.6, reviews: 876, category: "Eye Care", imageIndex: 0, prescription: false, discount: 25 },
  { id: 33, name: "Eye Drops Lubricant", brand: "ClearVision", price: 149, mrp: 199, rating: 4.8, reviews: 3456, category: "Eye Care", imageIndex: 1, prescription: false, discount: 25 },
  { id: 34, name: "Bilberry Extract", brand: "EyeHerb", price: 349, mrp: 449, rating: 4.5, reviews: 654, category: "Eye Care", imageIndex: 2, prescription: false, discount: 22 },
  
  // Bone Health
  { id: 35, name: "Calcium + D3 Tablets", brand: "BoneStrong", price: 299, mrp: 399, rating: 4.7, reviews: 2134, category: "Bone Health", imageIndex: 3, prescription: false, discount: 25 },
  { id: 36, name: "Glucosamine Chondroitin", brand: "JointCare", price: 599, mrp: 799, rating: 4.6, reviews: 1567, category: "Bone Health", imageIndex: 0, prescription: false, discount: 25 },
  { id: 37, name: "Vitamin K2 MK7", brand: "BoneHealth", price: 399, mrp: 549, rating: 4.5, reviews: 876, category: "Bone Health", imageIndex: 1, prescription: false, discount: 27 },
  
  // Baby Care
  { id: 38, name: "Baby Vitamin D Drops", brand: "BabyCare", price: 299, mrp: 399, rating: 4.9, reviews: 1876, category: "Baby Care", imageIndex: 2, prescription: false, discount: 25 },
  { id: 39, name: "Infant Probiotics", brand: "TinyTummy", price: 449, mrp: 599, rating: 4.8, reviews: 1234, category: "Baby Care", imageIndex: 3, prescription: false, discount: 25 },
  { id: 40, name: "Baby Gripe Water", brand: "GentleCare", price: 149, mrp: 199, rating: 4.7, reviews: 2345, category: "Baby Care", imageIndex: 0, prescription: false, discount: 25 },
  
  // Brain Health
  { id: 41, name: "Omega-3 DHA 1000mg", brand: "BrainPower", price: 549, mrp: 699, rating: 4.7, reviews: 1567, category: "Brain Health", imageIndex: 1, prescription: false, discount: 21 },
  { id: 42, name: "Ginkgo Biloba Extract", brand: "MindBoost", price: 349, mrp: 449, rating: 4.6, reviews: 987, category: "Brain Health", imageIndex: 2, prescription: false, discount: 22 },
  { id: 43, name: "Lion's Mane Mushroom", brand: "NeuroCap", price: 599, mrp: 799, rating: 4.8, reviews: 654, category: "Brain Health", imageIndex: 3, prescription: false, discount: 25 },
  
  // Healthcare Devices
  { id: 44, name: "Digital Thermometer", brand: "MediTemp", price: 299, mrp: 399, rating: 4.8, reviews: 3456, category: "Devices", imageIndex: 0, prescription: false, discount: 25 },
  { id: 45, name: "Blood Pressure Monitor", brand: "BPTrack", price: 1499, mrp: 1999, rating: 4.7, reviews: 2134, category: "Devices", imageIndex: 1, prescription: false, discount: 25 },
  { id: 46, name: "Pulse Oximeter", brand: "OxiCheck", price: 799, mrp: 999, rating: 4.9, reviews: 4567, category: "Devices", imageIndex: 2, prescription: false, discount: 20 },
  { id: 47, name: "Glucometer Kit", brand: "SugarCheck", price: 999, mrp: 1299, rating: 4.6, reviews: 1876, category: "Devices", imageIndex: 3, prescription: false, discount: 23 },
  { id: 48, name: "Nebulizer Machine", brand: "BreathEasy", price: 1799, mrp: 2499, rating: 4.7, reviews: 987, category: "Devices", imageIndex: 0, prescription: false, discount: 28 },
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
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

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

  const removeItemCompletely = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const toggleWishlist = (id: number) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const getCartQuantity = (id: number) => {
    return cart.find(item => item.id === id)?.quantity || 0;
  };

  const cartItems = cart.map(item => {
    const med = medicines.find(m => m.id === item.id)!;
    return { ...med, quantity: item.quantity };
  });

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const mrpTotal = cartItems.reduce((total, item) => total + item.mrp * item.quantity, 0);
  const productDiscount = mrpTotal - subtotal;
  const couponDiscount = appliedCoupon ? Math.round(subtotal * appliedCoupon.discount / 100) : 0;
  const deliveryFee = subtotal > 499 ? 0 : 49;
  const finalTotal = subtotal - couponDiscount + deliveryFee;
  const totalSavings = productDiscount + couponDiscount;
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const applyCoupon = () => {
    const coupons: Record<string, number> = {
      "HEALTH10": 10,
      "WELLNESS15": 15,
      "FIRST20": 20,
      "SAVE25": 25,
    };
    
    if (coupons[couponCode.toUpperCase()]) {
      setAppliedCoupon({ code: couponCode.toUpperCase(), discount: coupons[couponCode.toUpperCase()] });
      toast({ title: "Coupon applied!", description: `You saved extra ${coupons[couponCode.toUpperCase()]}%` });
    } else {
      toast({ title: "Invalid coupon", description: "Please enter a valid coupon code", variant: "destructive" });
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
  };

  const placeOrder = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      setCart([]);
      setAppliedCoupon(null);
      setCouponCode("");
      setShowCheckout(false);
      setShowCart(false);
      setOrderPlaced(false);
    }, 3000);
  };

  // Order Success Screen
  if (orderPlaced) {
    return (
      <section className="py-8 md:py-20 lg:py-32 bg-gradient-to-b from-background to-secondary/20 min-h-screen">
        <div className="container mx-auto px-3 md:px-4 max-w-lg">
          <Card className="p-6 md:p-8 text-center">
            <div className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-green-500" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-2">Order Placed Successfully!</h2>
            <p className="text-sm md:text-base text-muted-foreground mb-4">
              Your order has been confirmed. You will receive a confirmation email shortly.
            </p>
            <p className="text-xs text-muted-foreground">Redirecting to store...</p>
          </Card>
        </div>
      </section>
    );
  }

  // Checkout Screen
  if (showCheckout) {
    return (
      <section className="py-8 md:py-20 lg:py-32 bg-gradient-to-b from-background to-secondary/20 min-h-screen">
        <div className="container mx-auto px-3 md:px-4 max-w-4xl">
          <Button variant="ghost" className="mb-4 gap-2" onClick={() => setShowCheckout(false)}>
            <ArrowLeft className="w-4 h-4" /> Back to Cart
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="lg:col-span-2 space-y-3 md:space-y-4">
              <Card className="p-3 md:p-4">
                <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4 flex items-center gap-2">
                  <Receipt className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  Order Summary
                </h3>
                <div className="space-y-3">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex gap-3 p-2 md:p-3 bg-secondary/20 rounded-lg">
                      <img src={medicineImages[item.imageIndex]} alt={item.name} className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-lg" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-xs md:text-sm line-clamp-1">{item.name}</h4>
                        <p className="text-[10px] md:text-xs text-muted-foreground">{item.brand}</p>
                        <p className="text-xs md:text-sm mt-1">Qty: {item.quantity} × ₹{item.price}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm md:text-base">₹{item.price * item.quantity}</p>
                        <p className="text-[10px] md:text-xs text-muted-foreground line-through">₹{item.mrp * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-3 md:p-4">
                <h3 className="font-semibold text-base md:text-lg mb-3 flex items-center gap-2">
                  <Tag className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  Apply Coupon
                </h3>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2 md:p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="font-medium text-xs md:text-sm">{appliedCoupon.code}</span>
                      <Badge className="text-[10px] md:text-xs">{appliedCoupon.discount}% OFF</Badge>
                    </div>
                    <Button variant="ghost" size="sm" onClick={removeCoupon}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Enter coupon code" 
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 text-sm h-9 md:h-10"
                    />
                    <Button onClick={applyCoupon} size="sm" className="h-9 md:h-10 text-xs md:text-sm">Apply</Button>
                  </div>
                )}
                <div className="mt-2 md:mt-3 flex flex-wrap gap-2">
                  {["HEALTH10", "WELLNESS15", "FIRST20"].map(code => (
                    <button 
                      key={code}
                      onClick={() => setCouponCode(code)}
                      className="text-[10px] md:text-xs px-2 py-1 bg-secondary/50 rounded-full hover:bg-secondary transition-colors"
                    >
                      {code}
                    </button>
                  ))}
                </div>
              </Card>
            </div>

            <div className="space-y-3 md:space-y-4">
              <Card className="p-3 md:p-4">
                <h3 className="font-semibold text-base md:text-lg mb-3 md:mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  Bill Details
                </h3>
                <div className="space-y-2 text-xs md:text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">MRP Total</span>
                    <span className="line-through">₹{mrpTotal}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Product Discount</span>
                    <span>-₹{productDiscount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-green-600">
                      <span>Coupon ({appliedCoupon.code})</span>
                      <span>-₹{couponDiscount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery Fee</span>
                    <span className={deliveryFee === 0 ? "text-green-600" : ""}>
                      {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                    </span>
                  </div>
                  <div className="border-t border-border pt-2 mt-2">
                    <div className="flex justify-between font-bold text-sm md:text-base">
                      <span>Total Amount</span>
                      <span>₹{finalTotal}</span>
                    </div>
                  </div>
                  {totalSavings > 0 && (
                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg text-center mt-3">
                      <span className="text-green-600 font-medium text-xs md:text-sm">
                        You save ₹{totalSavings} on this order!
                      </span>
                    </div>
                  )}
                </div>
              </Card>

              <Button 
                className="w-full h-10 md:h-12 gap-2 text-sm md:text-base" 
                onClick={placeOrder}
              >
                <CreditCard className="w-4 h-4 md:w-5 md:h-5" />
                Pay ₹{finalTotal}
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Cart Drawer
  if (showCart) {
    return (
      <section className="py-8 md:py-20 lg:py-32 bg-gradient-to-b from-background to-secondary/20 min-h-screen">
        <div className="container mx-auto px-3 md:px-4 max-w-2xl">
          <Button variant="ghost" className="mb-4 gap-2" onClick={() => setShowCart(false)}>
            <ArrowLeft className="w-4 h-4" /> Continue Shopping
          </Button>
          
          <Card className="p-3 md:p-4">
            <h2 className="font-bold text-lg md:text-xl mb-4 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-primary" />
              Your Cart ({cartCount} items)
            </h2>
            
            {cart.length === 0 ? (
              <div className="text-center py-8 md:py-12">
                <ShoppingCart className="w-12 h-12 md:w-16 md:h-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold text-base md:text-lg mb-2">Your cart is empty</h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-4">Add some medicines to get started</p>
                <Button onClick={() => setShowCart(false)} size="sm">Browse Medicines</Button>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-4 max-h-[50vh] overflow-y-auto">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex gap-3 p-2 md:p-3 bg-secondary/20 rounded-lg">
                      <img src={medicineImages[item.imageIndex]} alt={item.name} className="w-14 h-14 md:w-20 md:h-20 object-cover rounded-lg" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-xs md:text-sm line-clamp-1">{item.name}</h4>
                        <p className="text-[10px] md:text-xs text-muted-foreground">{item.brand}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="font-semibold text-sm md:text-base text-primary">₹{item.price}</span>
                          <span className="text-[10px] md:text-xs text-muted-foreground line-through">₹{item.mrp}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <button onClick={() => removeItemCompletely(item.id)} className="text-muted-foreground hover:text-destructive">
                          <X className="w-4 h-4" />
                        </button>
                        <div className="flex items-center gap-1">
                          <Button variant="outline" size="icon" className="h-7 w-7 md:h-8 md:w-8" onClick={() => removeFromCart(item.id)}>
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-6 md:w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button variant="outline" size="icon" className="h-7 w-7 md:h-8 md:w-8" onClick={() => addToCart(item.id)}>
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-3 md:pt-4 space-y-2">
                  <div className="flex justify-between text-xs md:text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-xs md:text-sm text-green-600">
                    <span>Savings</span>
                    <span>-₹{productDiscount}</span>
                  </div>
                  <div className="flex justify-between text-xs md:text-sm">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className={deliveryFee === 0 ? "text-green-600" : ""}>
                      {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold text-base md:text-lg pt-2 border-t border-border">
                    <span>Total</span>
                    <span>₹{finalTotal}</span>
                  </div>
                </div>

                <Button 
                  className="w-full mt-4 h-10 md:h-12 gap-2 text-sm md:text-base" 
                  onClick={() => setShowCheckout(true)}
                >
                  Proceed to Checkout
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </Button>
              </>
            )}
          </Card>
        </div>
      </section>
    );
  }

  // Main Store UI
  return (
    <section className="py-8 md:py-12 bg-gradient-to-b from-background to-secondary/20 min-h-screen">
      <div className="container mx-auto px-3 md:px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 flex items-center gap-2">
              <Pill className="h-6 w-6 md:h-8 md:w-8 text-primary" />
              Medicine Store
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Genuine medicines & healthcare products at best prices
            </p>
          </div>
          
          <Button 
            variant="outline" 
            className="relative gap-2 shrink-0" 
            onClick={() => setShowCart(true)}
          >
            <ShoppingCart className="w-4 h-4" />
            Cart
            {cartCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                {cartCount}
              </Badge>
            )}
          </Button>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-6">
          {[
            { icon: Shield, text: "100% Genuine", sub: "Certified Products" },
            { icon: Truck, text: "Fast Delivery", sub: "Within 24 Hours" },
            { icon: Percent, text: "Best Prices", sub: "Up to 50% Off" },
            { icon: Package, text: "Easy Returns", sub: "7 Days Policy" },
          ].map((item, i) => (
            <div key={i} className="p-3 md:p-4 rounded-xl bg-secondary/30 border border-border text-center">
              <item.icon className="w-6 h-6 md:w-8 md:h-8 text-primary mx-auto mb-2" />
              <p className="text-xs md:text-sm font-semibold">{item.text}</p>
              <p className="text-[10px] md:text-xs text-muted-foreground">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search medicines, brands, categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11 md:h-12 text-sm md:text-base"
          />
        </div>

        {/* Category Tabs */}
        <div className="mb-6 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max pb-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === cat.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/50 hover:bg-secondary"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results */}
        <p className="text-sm text-muted-foreground mb-4">
          Showing {filteredMedicines.length} products
        </p>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {filteredMedicines.map((med) => {
            const cartQty = getCartQuantity(med.id);
            const isWishlisted = wishlist.includes(med.id);
            
            return (
              <Card key={med.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative">
                  <img 
                    src={medicineImages[med.imageIndex]} 
                    alt={med.name}
                    className="w-full aspect-square object-cover"
                  />
                  <button 
                    onClick={() => toggleWishlist(med.id)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-background/80 backdrop-blur-sm"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
                  </button>
                  {med.discount > 0 && (
                    <Badge className="absolute top-2 left-2 bg-green-600 text-white">
                      {med.discount}% OFF
                    </Badge>
                  )}
                </div>
                
                <CardContent className="p-3">
                  <p className="text-[10px] md:text-xs text-muted-foreground mb-1">{med.brand}</p>
                  <h3 className="font-medium text-xs md:text-sm line-clamp-2 mb-2 min-h-[2.5rem]">{med.name}</h3>
                  
                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex items-center gap-0.5 bg-green-600 text-white px-1.5 py-0.5 rounded text-[10px]">
                      <Star className="w-3 h-3 fill-white" />
                      {med.rating}
                    </div>
                    <span className="text-[10px] text-muted-foreground">({med.reviews})</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-bold text-sm md:text-base">₹{med.price}</span>
                    <span className="text-xs text-muted-foreground line-through">₹{med.mrp}</span>
                  </div>
                  
                  {cartQty > 0 ? (
                    <div className="flex items-center justify-between bg-primary/10 rounded-lg p-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeFromCart(med.id)}>
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="font-semibold text-primary">{cartQty}</span>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => addToCart(med.id)}>
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : (
                    <Button className="w-full h-8 text-xs" onClick={() => addToCart(med.id)}>
                      <Plus className="w-3 h-3 mr-1" />
                      Add to Cart
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredMedicines.length === 0 && (
          <div className="text-center py-12">
            <Pill className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
            <h3 className="font-semibold text-lg mb-2">No products found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search or category filters</p>
          </div>
        )}

        {/* Floating Cart */}
        {cartCount > 0 && (
          <div className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-auto z-50">
            <Button 
              size="lg"
              className="w-full md:w-auto rounded-2xl shadow-2xl gap-4 h-14 px-6"
              onClick={() => setShowCart(true)}
            >
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                <Badge variant="secondary" className="bg-primary-foreground text-primary">
                  {cartCount}
                </Badge>
              </div>
              <div className="h-6 w-px bg-primary-foreground/30" />
              <span className="font-bold">₹{subtotal}</span>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
