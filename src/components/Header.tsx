import { Button } from "@/components/ui/button";
import { Menu, X, Stethoscope, ChevronDown, Apple, Carrot, Leaf } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const nutritionItems = [
  { icon: Apple, label: "Fruits Benefits", id: "seasonal-nutrition", filter: "fruits" },
  { icon: Carrot, label: "Vegetables Benefits", id: "seasonal-nutrition", filter: "vegetables" },
  { icon: Leaf, label: "Grains & Nuts", id: "seasonal-nutrition", filter: "grains" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileNutritionOpen, setIsMobileNutritionOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
      setIsMobileNutritionOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center space-x-2 group cursor-pointer">
            <div className="w-8 h-8 md:w-10 md:h-10 gradient-vibrant rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:shadow-glow">
              <Stethoscope className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <span className="text-xl md:text-2xl font-bold text-foreground transition-all duration-300 group-hover:text-primary">My Doctor</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => scrollToSection("home")}
              className="text-foreground hover:text-primary transition-smooth"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-foreground hover:text-primary transition-smooth"
            >
              About
            </button>
            
            {/* Nutrition Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-foreground hover:text-primary transition-smooth focus:outline-none">
                Nutrition <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-background border border-border z-50">
                <DropdownMenuLabel>Nutritional Benefits</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {nutritionItems.map((item) => (
                  <DropdownMenuItem
                    key={item.label}
                    onClick={() => scrollToSection(item.id)}
                    className="cursor-pointer flex items-center gap-2"
                  >
                    <item.icon className="w-4 h-4 text-primary" />
                    {item.label}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => scrollToSection("health-education")}
                  className="cursor-pointer"
                >
                  Body Health Guide
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button
              onClick={() => scrollToSection("consultation")}
              className="text-foreground hover:text-primary transition-smooth"
            >
              Consult Doctor
            </button>
            <button
              onClick={() => scrollToSection("blog")}
              className="text-foreground hover:text-primary transition-smooth"
            >
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
            <button
              className="text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-2 animate-slide-up">
            <button
              onClick={() => scrollToSection("home")}
              className="block w-full text-left px-4 py-2 text-foreground hover:bg-secondary rounded-lg transition-smooth"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left px-4 py-2 text-foreground hover:bg-secondary rounded-lg transition-smooth"
            >
              About
            </button>
            
            {/* Mobile Nutrition Dropdown */}
            <div>
              <button
                onClick={() => setIsMobileNutritionOpen(!isMobileNutritionOpen)}
                className="flex items-center justify-between w-full text-left px-4 py-2 text-foreground hover:bg-secondary rounded-lg transition-smooth"
              >
                <span>Nutrition Benefits</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isMobileNutritionOpen ? "rotate-180" : ""}`} />
              </button>
              {isMobileNutritionOpen && (
                <div className="ml-4 mt-1 space-y-1 bg-secondary/50 rounded-lg p-2">
                  {nutritionItems.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => scrollToSection(item.id)}
                      className="flex items-center gap-2 w-full text-left px-3 py-2 text-sm text-foreground hover:bg-secondary rounded-lg transition-smooth"
                    >
                      <item.icon className="w-4 h-4 text-primary" />
                      {item.label}
                    </button>
                  ))}
                  <button
                    onClick={() => scrollToSection("health-education")}
                    className="block w-full text-left px-3 py-2 text-sm text-foreground hover:bg-secondary rounded-lg transition-smooth"
                  >
                    Body Health Guide
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => scrollToSection("consultation")}
              className="block w-full text-left px-4 py-2 text-foreground hover:bg-secondary rounded-lg transition-smooth"
            >
              Consult Doctor
            </button>
            <button
              onClick={() => scrollToSection("blog")}
              className="block w-full text-left px-4 py-2 text-foreground hover:bg-secondary rounded-lg transition-smooth"
            >
              Articles
            </button>
            <div className="px-4 pt-2">
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
