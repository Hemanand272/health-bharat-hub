import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NutritionStore from "@/components/NutritionStore/NutritionStore";
import { useNavigate } from "react-router-dom";

const NutritionStorePage = () => {
  const navigate = useNavigate();

  const handleNavigate = (section: string) => {
    if (section === "home") {
      navigate("/");
    } else if (section === "about") {
      navigate("/about");
    } else if (section === "features") {
      navigate("/features");
    } else if (section === "blog") {
      navigate("/blog");
    } else if (section === "testimonials") {
      navigate("/testimonials");
    } else if (section === "community") {
      navigate("/community");
    } else if (section === "nutrition-store") {
      navigate("/nutrition-store");
    } else if (section === "medicine-store") {
      navigate("/medicine-store");
    } else if (section === "consultation") {
      navigate("/consultation");
    } else if (section === "join") {
      navigate("/join");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen">
      <Header onNavigate={handleNavigate} />
      <main className="pt-16 md:pt-20">
        <NutritionStore />
      </main>
      <Footer />
    </div>
  );
};

export default NutritionStorePage;
