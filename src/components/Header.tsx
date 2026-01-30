import { Button } from "@/components/ui/button";
import { Menu, X, Stethoscope, Home, Info, Heart, BookOpen, Users, MessageSquare, Brain, Leaf, Star, Pill, Sparkles, ChevronDown } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onNavigate?: (section: string) => void;
}

const mobileMenuItems = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About Us", icon: Info },
  { id: "features", label: "Features", icon: Star },
  { id: "nutrition-analyzer", label: "AI Food Analyzer", icon: Sparkles },
  { 
    id: "health-guide", 
    label: "Body Health", 
    icon: Heart,
    subItems: [
      { id: "body-systems-chat", label: "Body Systems Guide", icon: Brain },
      { id: "lifestyle-chat", label: "Lifestyle & Wellness", icon: Leaf },
    ]
  },
  { id: "consultation", label: "Doctor Consultation", icon: Stethoscope },
  { id: "medicine-store", label: "Medicine Store", icon: Pill },
  { id: "blog", label: "Health Articles", icon: BookOpen },
  { id: "community", label: "Community", icon: Users },
  { id: "testimonials", label: "Testimonials", icon: MessageSquare },
  { id: "join", label: "Join Us", icon: MessageSquare },
];

const Header = ({ onNavigate }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const navigate = useNavigate();

  const routeMap: Record<string, string> = {
    home: "/",
    about: "/about",
    features: "/features",
    blog: "/blog",
    testimonials: "/testimonials",
    community: "/community",
    "nutrition-store": "/nutrition-store",
    "medicine-store": "/medicine-store",
    consultation: "/consultation",
    join: "/join",
  };

  const scrollToSection = (id: string) => {
    // Check if we have a dedicated route for this section
    if (routeMap[id]) {
      navigate(routeMap[id]);
      setIsMenuOpen(false);
      return;
    }
    
    if (onNavigate) {
      onNavigate(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate("/");
    if (onNavigate) {
      onNavigate("home");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSubmenu = (id: string) => {
    setExpandedMenus(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div 
            className="flex items-center space-x-2 group cursor-pointer"
            onClick={handleLogoClick}
          >
            <div className="w-8 h-8 md:w-10 md:h-10 gradient-vibrant rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-glow">
              <Stethoscope className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <span className="text-xl md:text-2xl font-bold text-foreground transition-all duration-300 group-hover:text-primary">My Doctor</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button onClick={() => scrollToSection("home")} className="text-foreground hover:text-primary transition-smooth">
              Home
            </button>
            <button onClick={() => scrollToSection("about")} className="text-foreground hover:text-primary transition-smooth">
              About
            </button>
            <button onClick={() => scrollToSection("consultation")} className="text-foreground hover:text-primary transition-smooth">
              Consult Doctor
            </button>
            <button onClick={() => scrollToSection("blog")} className="text-foreground hover:text-primary transition-smooth">
              Articles
            </button>
            <ThemeToggle />
            <Button onClick={() => scrollToSection("join")} variant="hero" size="lg">
              Get Started
            </Button>
          </nav>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button className="text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - All sidebar items */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-1 animate-slide-up max-h-[calc(100vh-5rem)] overflow-y-auto">
            {mobileMenuItems.map((item) => (
              <div key={item.id}>
                <button 
                  onClick={() => {
                    if (item.subItems) {
                      toggleSubmenu(item.id);
                    } else {
                      scrollToSection(item.id);
                    }
                  }} 
                  className="flex items-center justify-between w-full text-left px-4 py-3 text-foreground hover:bg-secondary rounded-lg transition-smooth"
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-primary" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.subItems && (
                    <ChevronDown className={`w-4 h-4 transition-transform ${expandedMenus.includes(item.id) ? 'rotate-180' : ''}`} />
                  )}
                </button>
                
                {/* Submenu items */}
                {item.subItems && expandedMenus.includes(item.id) && (
                  <div className="ml-6 mt-1 space-y-1 border-l-2 border-primary/30 pl-4">
                    {item.subItems.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => scrollToSection(subItem.id)}
                        className="flex items-center gap-3 w-full text-left px-3 py-2.5 text-muted-foreground hover:text-foreground hover:bg-secondary/50 rounded-lg transition-smooth"
                      >
                        <subItem.icon className="w-4 h-4 text-primary/70" />
                        <span className="text-sm">{subItem.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <div className="px-4 pt-4 border-t border-border mt-4">
              <Button onClick={() => scrollToSection("join")} variant="hero" size="lg" className="w-full">
                Join Now
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
