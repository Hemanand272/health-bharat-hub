import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { CommunitySection } from "@/components/Community/CommunitySection";
import { MobileBottomNav } from "@/components/Navigation/MobileBottomNav";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [showContent, setShowContent] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleNavigate = (section: string) => {
    if (section === "auth") {
      navigate("/auth");
      return;
    }
    
    const contentSections = ["body-systems-chat", "lifestyle-chat", "nutrition-analyzer", "medicine-store", "community"];
    
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

  const handleLogout = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
    }
  };

  const renderContentSection = () => {
    switch (showContent) {
      case "body-systems-chat": return <BodySystemsChat />;
      case "lifestyle-chat": return <LifestyleChat />;
      case "nutrition-analyzer": return <NutritionAnalyzer />;
      case "medicine-store": return <MedicinePlatform />;
      case "community": return <CommunitySection />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen pb-16 lg:pb-0">
      <Header onNavigate={handleNavigate} />
      <AppSidebar onNavigate={handleNavigate} activeSection={activeSection} onCollapseChange={setSidebarCollapsed} />
      
      <main className={cn("transition-all duration-300", sidebarCollapsed ? "lg:ml-16" : "lg:ml-64")}>
        {showContent ? (
          <div className="pt-16 md:pt-20">{renderContentSection()}</div>
        ) : (
          <>
            <Hero />
            <About />
            <Features />
            {/* Mobile Access Cards for AI sections */}
            <section className="py-6 px-4 lg:hidden bg-gradient-to-b from-background to-secondary/20">
              <div className="container mx-auto">
                <h2 className="text-lg font-bold mb-4 text-center gradient-text">AI Health Tools</h2>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => handleNavigate("nutrition-analyzer")}
                    className="p-4 rounded-xl bg-gradient-to-r from-pink-500/20 to-blue-500/20 border border-pink-500/30 text-left hover:from-pink-500/30 hover:to-blue-500/30 transition-all"
                  >
                    <h3 className="font-semibold text-sm mb-1">🍎 AI Food Analyzer</h3>
                    <p className="text-xs text-muted-foreground">Analyze nutrition from food photos</p>
                  </button>
                  <button
                    onClick={() => handleNavigate("body-systems-chat")}
                    className="p-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-left hover:from-purple-500/30 hover:to-pink-500/30 transition-all"
                  >
                    <h3 className="font-semibold text-sm mb-1">🧠 Body Systems Guide</h3>
                    <p className="text-xs text-muted-foreground">Learn about body functions</p>
                  </button>
                  <button
                    onClick={() => handleNavigate("lifestyle-chat")}
                    className="p-4 rounded-xl bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 text-left hover:from-green-500/30 hover:to-blue-500/30 transition-all"
                  >
                    <h3 className="font-semibold text-sm mb-1">🌿 Lifestyle & Wellness</h3>
                    <p className="text-xs text-muted-foreground">Get wellness coaching</p>
                  </button>
                </div>
              </div>
            </section>
            <DoctorConsultation />
            <MedicationsCarousel />
            <HealthArticles />
            <CommunitySection />
            <ProblemSolution />
            <Testimonials />
            <JoinForm />
          </>
        )}
      </main>
      <Footer />
      
      {/* Mobile Bottom Navigation */}
      <MobileBottomNav 
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isLoggedIn={!!user}
        onLogout={handleLogout}
      />
    </div>
  );
};

export default Index;