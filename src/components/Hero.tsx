import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Users, BookOpen } from "lucide-react";
import heroImage from "@/assets/hero-health.jpg";

const Hero = () => {
  const scrollToJoin = () => {
    const element = document.getElementById("join");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Community health awareness"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero opacity-90"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="animate-slide-up">
            <h1 className="mb-6 leading-tight">
              Knowledge is the Best Medicine
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
              Empowering India Through Health Awareness
            </p>
            <p className="text-lg md:text-xl mb-10 text-white/80 max-w-3xl mx-auto">
              Join thousands of Indians discovering affordable home remedies, nutrition insights, and verified medical knowledge — all in one trusted community.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button onClick={scrollToJoin} variant="cta" size="xl" className="group">
                Join the Community
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-smooth" />
              </Button>
              <Button
                variant="outline"
                size="xl"
                className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-primary"
                onClick={() => {
                  const element = document.getElementById("features");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Learn More
              </Button>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Heart className="w-5 h-5" />
                <span>Home Remedies</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <BookOpen className="w-5 h-5" />
                <span>Doctor Insights</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <Users className="w-5 h-5" />
                <span>Community Sharing</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
            fill="hsl(180 60% 97%)"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
