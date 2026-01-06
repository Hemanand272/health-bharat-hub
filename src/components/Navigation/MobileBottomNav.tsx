import { Home, Sparkles, Pill, Users, Heart, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileBottomNavProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const navItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "nutrition-analyzer", label: "AI Food", icon: Sparkles },
  { id: "body-systems-chat", label: "Health", icon: Heart },
  { id: "medicine-store", label: "Medicine", icon: Pill },
  { id: "community", label: "Community", icon: Users },
];

export const MobileBottomNav = ({ activeSection, onNavigate, isLoggedIn, onLogout }: MobileBottomNavProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border lg:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={cn(
              "flex flex-col items-center justify-center flex-1 h-full gap-1 transition-all duration-200",
              activeSection === item.id
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 transition-transform",
              activeSection === item.id && "scale-110"
            )} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
        
        {isLoggedIn ? (
          <button
            onClick={onLogout}
            className="flex flex-col items-center justify-center flex-1 h-full gap-1 text-muted-foreground hover:text-destructive transition-all duration-200"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-[10px] font-medium">Logout</span>
          </button>
        ) : (
          <button
            onClick={() => onNavigate("auth")}
            className="flex flex-col items-center justify-center flex-1 h-full gap-1 text-muted-foreground hover:text-primary transition-all duration-200"
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] font-medium">Login</span>
          </button>
        )}
      </div>
    </nav>
  );
};
