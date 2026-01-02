import { useState } from "react";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";
import MedicationsCarousel from "@/components/MedicationsCarousel";
import { NutritionTracker } from "@/components/NutritionTracker/NutritionTracker";
import { DoctorConsultation } from "@/components/DoctorConsultation/DoctorConsultation";
import BlogGrid from "@/components/BlogGrid";
import ProblemSolution from "@/components/ProblemSolution";
import Testimonials from "@/components/Testimonials";
import JoinForm from "@/components/JoinForm";
import Footer from "@/components/Footer";
import { AppSidebar } from "@/components/Sidebar/AppSidebar";
import { FruitsSection } from "@/components/NutritionContent/FruitsSection";
import { VegetablesSection } from "@/components/NutritionContent/VegetablesSection";
import { GrainsSection } from "@/components/NutritionContent/GrainsSection";
import { BodySystemsSection } from "@/components/BodyHealth/BodySystemsSection";
import { LifestyleSection } from "@/components/BodyHealth/LifestyleSection";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [showContent, setShowContent] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleNavigate = (section: string) => {
    // Content sections that should be shown on demand
    const contentSections = ["fruits", "vegetables", "grains", "body-systems", "lifestyle"];
    
    if (contentSections.includes(section)) {
      setShowContent(section);
      setActiveSection(section);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setShowContent(null);
      setActiveSection(section);
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  // Render content sections based on selection
  const renderContentSection = () => {
    switch (showContent) {
      case "fruits":
        return <FruitsSection />;
      case "vegetables":
        return <VegetablesSection />;
      case "grains":
        return <GrainsSection />;
      case "body-systems":
        return <BodySystemsSection />;
      case "lifestyle":
        return <LifestyleSection />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <AppSidebar 
        onNavigate={handleNavigate} 
        activeSection={activeSection} 
        onCollapseChange={setSidebarCollapsed}
      />
      
      <main className={cn(
        "transition-all duration-300",
        sidebarCollapsed ? "lg:ml-16" : "lg:ml-64"
      )}>
        {showContent ? (
          <div className="pt-20 md:pt-24">
            {renderContentSection()}
          </div>
        ) : (
          <>
            <Hero />
            <About />
            <Features />
            <NutritionTracker />
            <DoctorConsultation />
            <MedicationsCarousel />
            <BlogGrid />
            <ProblemSolution />
            <Testimonials />
            <JoinForm />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;