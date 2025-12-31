import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";
import MedicationsCarousel from "@/components/MedicationsCarousel";
import { HealthEducation } from "@/components/HealthEducation/HealthEducation";
import { SeasonalNutrition } from "@/components/SeasonalNutrition/SeasonalNutrition";
import { NutritionTracker } from "@/components/NutritionTracker/NutritionTracker";
import { DoctorConsultation } from "@/components/DoctorConsultation/DoctorConsultation";
import BlogGrid from "@/components/BlogGrid";
import ProblemSolution from "@/components/ProblemSolution";
import Testimonials from "@/components/Testimonials";
import JoinForm from "@/components/JoinForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
        <Features />
        <HealthEducation />
        <NutritionTracker />
        <SeasonalNutrition />
        <DoctorConsultation />
        <MedicationsCarousel />
        <BlogGrid />
        <ProblemSolution />
        <Testimonials />
        <JoinForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
