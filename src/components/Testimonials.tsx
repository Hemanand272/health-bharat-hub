import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai, Maharashtra",
    quote: "My Doctor taught me how turmeric and black pepper can help with inflammation. I've reduced my medicine costs by 60% using these natural remedies!",
  },
  {
    name: "Rajesh Kumar",
    location: "Delhi",
    quote: "The nutrition tracking feature helped me understand what I was missing in my diet. Now my family eats healthier and we all feel better.",
  },
  {
    name: "Anita Desai",
    location: "Bangalore, Karnataka",
    quote: "As a mother of two, this platform has been a blessing. The home remedies for common colds and coughs actually work, and they're safe for my children.",
  },
  {
    name: "Vikram Patel",
    location: "Pune, Maharashtra",
    quote: "I was skeptical at first, but the doctor-verified articles gave me confidence. Now I prevent health issues before they become expensive problems.",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="mb-6 text-foreground">Community Voices</h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Real stories from real people who transformed their health and reduced expenses
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="gradient-card rounded-2xl p-8 shadow-medium hover:shadow-large transition-smooth relative"
            >
              <div className="absolute -top-4 left-8 w-12 h-12 gradient-hero rounded-full flex items-center justify-center">
                <Quote className="w-6 h-6 text-white" />
              </div>
              <div className="mt-4">
                <p className="text-muted-foreground leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>
                <div className="border-t border-border pt-4">
                  <p className="font-bold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
