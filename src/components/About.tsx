import { Target, Eye, Lightbulb } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="mb-6 text-foreground">About My Doctor</h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Founded by Hemanand with a mission to make healthcare transparent, affordable, and accessible for every Indian family.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Vision Card */}
          <div className="gradient-card rounded-2xl p-8 shadow-medium hover:shadow-large transition-smooth text-center group">
            <div className="w-16 h-16 gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-bounce">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h3 className="mb-4 text-foreground">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              To make every Indian aware of their health and nutrition, bridging the gap between ancient wisdom and modern science.
            </p>
          </div>

          {/* Mission Card */}
          <div className="gradient-card rounded-2xl p-8 shadow-medium hover:shadow-large transition-smooth text-center group">
            <div className="w-16 h-16 gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-bounce">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="mb-4 text-foreground">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              To combine traditional home remedies with verified medical research for better preventive care and wellness.
            </p>
          </div>

          {/* Impact Card */}
          <div className="gradient-card rounded-2xl p-8 shadow-medium hover:shadow-large transition-smooth text-center group">
            <div className="w-16 h-16 gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-bounce">
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
