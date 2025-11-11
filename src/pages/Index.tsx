import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";
import MedicationsCarousel from "@/components/MedicationsCarousel";
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
