import { Target, Eye, Lightbulb } from "lucide-react";
import naturalIngredients from "@/assets/natural-ingredients.jpg";

const About = () => {
  return (
    <section id="about" className="py-20 md:py-32 gradient-soft relative overflow-hidden">
      {/* Decorative background image */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 dark:opacity-10">
        <img
          src={naturalIngredients}
          alt="Natural ingredients background"
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="mb-6 text-foreground">About My Doctor</h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Founded by Hemanand with a mission to make healthcare transparent, affordable, and accessible for every Indian family.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Vision Card */}
          <div className="gradient-card rounded-2xl p-8 shadow-medium hover-lift hover-glow text-center group animate-fade-in">
            <div className="w-16 h-16 gradient-vibrant rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-bounce shadow-soft">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h3 className="mb-4 text-foreground">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              To make every Indian aware of their health and nutrition, bridging the gap between ancient wisdom and modern science.
            </p>
          </div>

          {/* Mission Card */}
          <div className="gradient-card rounded-2xl p-8 shadow-medium hover-lift hover-glow text-center group animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="w-16 h-16 gradient-vibrant rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-bounce shadow-soft">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="mb-4 text-foreground">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              To combine traditional home remedies with verified medical research for better preventive care and wellness.
            </p>
          </div>

          {/* Impact Card */}
          <div className="gradient-card rounded-2xl p-8 shadow-medium hover-lift hover-glow text-center group animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="w-16 h-16 gradient-vibrant rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-bounce shadow-soft">
              <Lightbulb className="w-8 h-8 text-white" />
            </div>
            <h3 className="mb-4 text-foreground">Our Impact</h3>
            <p className="text-muted-foreground leading-relaxed">
              Empowering communities through shared knowledge, reducing healthcare costs, and promoting preventive wellness.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
