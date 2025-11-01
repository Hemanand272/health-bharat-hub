import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

const interests = [
  "Health Awareness",
  "Home Remedies",
  "Nutrition Tracking",
  "Community Stories",
  "Doctor Insights",
  "Wellness Learning",
];

const JoinForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interest: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.interest) {
      toast.error("Please fill in all fields");
      return;
    }

    // Simulate form submission
    toast.success("Thank you for joining! We'll be in touch soon.");
    setFormData({ name: "", email: "", interest: "" });
  };

  return (
    <section id="join" className="py-20 md:py-32 gradient-soft">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="mb-6 text-foreground">Join the Movement</h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              Be part of India's health awareness revolution. Sign up for early access and start your wellness journey today.
            </p>
          </div>

          <div className="gradient-card rounded-2xl p-8 md:p-12 shadow-large">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="interest" className="text-foreground">Area of Interest</Label>
                <select
                  id="interest"
                  value={formData.interest}
                  onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                  className="w-full h-12 px-3 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select your interest</option>
                  {interests.map((interest) => (
                    <option key={interest} value={interest}>
                      {interest}
                    </option>
                  ))}
                </select>
              </div>

              <Button type="submit" variant="hero" size="xl" className="w-full">
                Join the Community
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                By joining, you agree to our Terms of Service and Privacy Policy
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinForm;
