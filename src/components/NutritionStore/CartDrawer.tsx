import { X, Plus, Minus, ShoppingBag, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { CartItem } from './types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (foodId: string, quantity: number) => void;
  onClearCart: () => void;
}

const CartDrawer = ({ isOpen, onClose, cartItems, onUpdateQuantity, onClearCart }: CartDrawerProps) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 500 ? 0 : 49;
  const total = subtotal + deliveryFee;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-primary" />
            Your Cart ({cartItems.length} items)
          </SheetTitle>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
            <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mb-4" />
            <h3 className="font-semibold text-lg mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground text-sm">Add some nutritious foods to get started!</p>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3 p-3 bg-muted/50 rounded-lg">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-muted-foreground">{item.vendor}</p>
                    <p className="font-semibold text-primary mt-1">₹{item.price}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="h-6 w-6"
                      onClick={() => onUpdateQuantity(item.id, 0)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-2 bg-background rounded-lg border">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-6 w-6"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-6 w-6"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="border-t pt-4 space-y-3">
              {subtotal < 500 && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-primary/10 p-3 rounded-lg">
                  <Truck className="h-4 w-4 text-primary" />
                  <span>Add ₹{500 - subtotal} more for free delivery</span>
                </div>
              )}

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span className={deliveryFee === 0 ? 'text-green-500' : ''}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span className="text-primary">₹{total}</span>
                </div>
              </div>

              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>

              <Button 
                variant="ghost" 
                className="w-full text-muted-foreground"
                onClick={onClearCart}
              >
                Clear Cart
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
