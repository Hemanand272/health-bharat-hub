import { AlertCircle, CheckCircle2 } from "lucide-react";

const ProblemSolution = () => {
  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 gradient-soft opacity-50 dark:opacity-30"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Problem */}
            <div className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center shadow-soft">
                  <AlertCircle className="w-6 h-6 text-destructive" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">The Problem</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-destructive/5 border-l-4 border-destructive rounded-r-lg p-6 hover-lift transition-smooth">
                  <h3 className="font-bold text-foreground mb-2">High Medical Expenses</h3>
                  <p className="text-muted-foreground">
                    Healthcare costs keep rising, making it difficult for families to afford quality treatment and preventive care.
                  </p>
                </div>

                <div className="bg-destructive/5 border-l-4 border-destructive rounded-r-lg p-6 hover-lift transition-smooth">
                  <h3 className="font-bold text-foreground mb-2">Lack of Nutritional Knowledge</h3>
                  <p className="text-muted-foreground">
                    Most people are unaware of the nutritional value of their meals and how it affects their long-term health.
                  </p>
                </div>

                <div className="bg-destructive/5 border-l-4 border-destructive rounded-r-lg p-6 hover-lift transition-smooth">
                  <h3 className="font-bold text-foreground mb-2">Health Misinformation</h3>
                  <p className="text-muted-foreground">
                    Unverified health advice spreads quickly, leading to confusion and potentially harmful practices.
                  </p>
                </div>
              </div>
            </div>

            {/* Solution */}
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 gradient-vibrant rounded-xl flex items-center justify-center shadow-soft">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">Our Solution</h2>
              </div>

              <div className="space-y-4">
                <div className="bg-primary/5 border-l-4 border-primary rounded-r-lg p-6 hover-lift transition-smooth">
                  <h3 className="font-bold text-foreground mb-2">Community-Driven Education</h3>
                  <p className="text-muted-foreground">
                    A platform where verified health tips, home remedies, and wellness knowledge are shared freely by the community.
                  </p>
                </div>

                <div className="bg-primary/5 border-l-4 border-primary rounded-r-lg p-6 hover-lift transition-smooth">
                  <h3 className="font-bold text-foreground mb-2">Affordable Health Guidance</h3>
                  <p className="text-muted-foreground">
                    Learn low-cost home remedies using everyday ingredients, reducing dependence on expensive medications.
                  </p>
                </div>

                <div className="bg-primary/5 border-l-4 border-primary rounded-r-lg p-6 hover-lift transition-smooth">
                  <h3 className="font-bold text-foreground mb-2">Expert-Verified Information</h3>
                  <p className="text-muted-foreground">
                    All medical advice and remedies are reviewed by qualified doctors and researchers before sharing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
