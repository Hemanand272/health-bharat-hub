import { useState } from "react";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";
import MedicationsCarousel from "@/components/MedicationsCarousel";
import { NutritionAnalyzer } from "@/components/NutritionTracker/NutritionAnalyzer";
import { DoctorConsultation } from "@/components/DoctorConsultation/DoctorConsultation";
import { HealthArticles } from "@/components/HealthArticles/HealthArticles";
import ProblemSolution from "@/components/ProblemSolution";
import Testimonials from "@/components/Testimonials";
import JoinForm from "@/components/JoinForm";
import Footer from "@/components/Footer";
import { AppSidebar } from "@/components/Sidebar/AppSidebar";
import { BodySystemsChat } from "@/components/BodyHealth/BodySystemsChat";
import { LifestyleChat } from "@/components/BodyHealth/LifestyleChat";
import { MedicinePlatform } from "@/components/MedicinePlatform/MedicinePlatform";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [showContent, setShowContent] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleNavigate = (section: string) => {
    const contentSections = ["body-systems-chat", "lifestyle-chat", "nutrition-analyzer", "medicine-store"];
    
    if (contentSections.includes(section)) {
      setShowContent(section);
      setActiveSection(section);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setShowContent(null);
      setActiveSection(section);
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  const renderContentSection = () => {
    switch (showContent) {
      case "body-systems-chat": return <BodySystemsChat />;
      case "lifestyle-chat": return <LifestyleChat />;
      case "nutrition-analyzer": return <NutritionAnalyzer />;
      case "medicine-store": return <MedicinePlatform />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <AppSidebar onNavigate={handleNavigate} activeSection={activeSection} onCollapseChange={setSidebarCollapsed} />
      
      <main className={cn("transition-all duration-300", sidebarCollapsed ? "lg:ml-16" : "lg:ml-64")}>
        {showContent ? (
          <div className="pt-20 md:pt-24">{renderContentSection()}</div>
        ) : (
          <>
            <Hero />
            <About />
            <Features />
            <DoctorConsultation />
            <MedicationsCarousel />
            <HealthArticles />
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
