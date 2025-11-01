import { Heart, Mail, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-foreground text-background py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 gradient-hero rounded-lg"></div>
              <span className="text-2xl font-bold">My Doctor</span>
            </div>
            <p className="text-background/80 text-sm leading-relaxed">
              Empowering India through health awareness and affordable wellness solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection("home")}
                  className="hover:text-accent transition-smooth"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("about")}
                  className="hover:text-accent transition-smooth"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("features")}
                  className="hover:text-accent transition-smooth"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("testimonials")}
                  className="hover:text-accent transition-smooth"
                >
                  Community
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-accent transition-smooth">
                  Health Articles
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-smooth">
                  Home Remedies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-smooth">
                  Nutrition Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-smooth">
                  Expert Q&A
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Get in Touch</h3>
            <div className="space-y-3">
              <a
                href="mailto:info@mydoctor.in"
                className="flex items-center gap-2 text-sm hover:text-accent transition-smooth"
              >
                <Mail className="w-4 h-4" />
                info@mydoctor.in
              </a>
              <div className="flex gap-4 pt-2">
                <a
                  href="#"
                  className="w-9 h-9 bg-background/10 rounded-full flex items-center justify-center hover:bg-accent transition-smooth"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 bg-background/10 rounded-full flex items-center justify-center hover:bg-accent transition-smooth"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 bg-background/10 rounded-full flex items-center justify-center hover:bg-accent transition-smooth"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-9 h-9 bg-background/10 rounded-full flex items-center justify-center hover:bg-accent transition-smooth"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/70">
          <p>© 2024 My Doctor. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-accent fill-accent" />
            <span>for a Healthier India</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-accent transition-smooth">
              Terms
            </a>
            <a href="#" className="hover:text-accent transition-smooth">
              Privacy
            </a>
            <a href="#" className="hover:text-accent transition-smooth">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
