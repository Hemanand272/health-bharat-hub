import { useState } from "react";
import { 
  Home, Info, Heart, Stethoscope, BookOpen, 
  Users, MessageSquare, ChevronLeft, ChevronRight, Brain,
  Leaf, Star, Pill, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SidebarProps {
  onNavigate: (section: string) => void;
  activeSection: string;
  onCollapseChange?: (collapsed: boolean) => void;
}

const menuItems = [
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
  { id: "testimonials", label: "Testimonials", icon: Users },
  { id: "join", label: "Join Community", icon: MessageSquare },
];

export const AppSidebar = ({ onNavigate, activeSection, onCollapseChange }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const handleCollapse = () => {
    const newCollapsed = !isCollapsed;
    setIsCollapsed(newCollapsed);
    onCollapseChange?.(newCollapsed);
  };

  const toggleMenu = (id: string) => {
    setExpandedMenus(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  const handleItemClick = (id: string, hasSubItems: boolean) => {
    if (hasSubItems) {
      toggleMenu(id);
    } else {
      onNavigate(id);
    }
  };

  return (
    <aside 
      className={cn(
        "fixed left-0 top-16 md:top-20 h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] bg-background border-r border-border z-40 transition-all duration-300 hidden lg:flex flex-col",
        isCollapsed ? "w-16" : "w-64"
      )}
      data-collapsed={isCollapsed}
    >
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {menuItems.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => handleItemClick(item.id, !!item.subItems)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                  activeSection === item.id 
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-secondary text-foreground"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 flex-shrink-0",
                  activeSection === item.id ? "text-primary-foreground" : "text-primary"
                )} />
                {!isCollapsed && (
                  <>
                    <span className="flex-1 text-left text-sm font-medium">
                      {item.label}
                    </span>
                    {item.subItems && (
                      <ChevronRight className={cn(
                        "w-4 h-4 transition-transform",
                        expandedMenus.includes(item.id) && "rotate-90"
                      )} />
                    )}
                  </>
                )}
              </button>
              
              {!isCollapsed && item.subItems && expandedMenus.includes(item.id) && (
                <div className="ml-4 mt-1 space-y-1 border-l-2 border-border pl-2">
                  {item.subItems.map((subItem) => (
                    <button
                      key={subItem.id}
                      onClick={() => onNavigate(subItem.id)}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-sm",
                        activeSection === subItem.id 
                          ? "bg-primary/10 text-primary font-medium" 
                          : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <subItem.icon className="w-4 h-4" />
                      <span>{subItem.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
      
      <div className="p-2 border-t border-border">
        <Button variant="ghost" size="sm" className="w-full justify-center" onClick={handleCollapse}>
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <><ChevronLeft className="w-4 h-4 mr-2" /><span>Collapse</span></>}
        </Button>
      </div>
    </aside>
  );
};
