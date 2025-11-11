import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, Share2, Facebook, Twitter, MessageCircle } from "lucide-react";
import { useState } from "react";
import turmericRemedies from "@/assets/blog-turmeric-remedies.jpg";
import nutritionGuide from "@/assets/blog-nutrition-guide.jpg";
import wellnessYoga from "@/assets/blog-wellness-yoga.jpg";
import herbalTeas from "@/assets/blog-herbal-teas.jpg";
import immuneBoost from "@/assets/blog-immune-boost.jpg";
import sleepRemedies from "@/assets/blog-sleep-remedies.jpg";

const articles = [
  {
    image: turmericRemedies,
    category: "Home Remedies",
    title: "Golden Healing: Turmeric and Ginger Remedies for Inflammation",
    excerpt: "Discover ancient Ayurvedic wisdom combined with modern science to fight inflammation naturally using kitchen ingredients.",
    date: "Nov 8, 2025",
    readTime: "5 min read",
    author: "Dr. Priya Sharma",
  },
  {
    image: nutritionGuide,
    category: "Nutrition Guide",
    title: "Complete Guide to Balanced Nutrition for Disease Prevention",
    excerpt: "Learn how to create perfectly balanced meals that provide all essential nutrients and help prevent chronic diseases.",
    date: "Nov 5, 2025",
    readTime: "8 min read",
    author: "Nutritionist Rajesh Kumar",
  },
  {
    image: wellnessYoga,
    category: "Wellness",
    title: "Mind-Body Connection: Yoga and Meditation for Mental Health",
    excerpt: "Explore scientifically-proven benefits of yoga and meditation for reducing stress, anxiety, and improving overall mental wellness.",
    date: "Nov 3, 2025",
    readTime: "6 min read",
    author: "Wellness Coach Anjali",
  },
  {
    image: herbalTeas,
    category: "Natural Remedies",
    title: "Healing Herbal Teas: Nature's Medicine in Your Cup",
    excerpt: "A comprehensive guide to herbal teas that can help with digestion, immunity, sleep, and various health conditions.",
    date: "Oct 30, 2025",
    readTime: "7 min read",
    author: "Herbalist Dr. Suresh",
  },
  {
    image: immuneBoost,
    category: "Preventive Care",
    title: "Supercharge Your Immunity: Foods That Fight Disease",
    excerpt: "Discover powerful immune-boosting foods and learn how to incorporate them into your daily diet for optimal health.",
    date: "Oct 28, 2025",
    readTime: "5 min read",
    author: "Dr. Meera Patel",
  },
  {
    image: sleepRemedies,
    category: "Sleep Health",
    title: "Natural Sleep Solutions: Say Goodbye to Insomnia",
    excerpt: "Effective natural remedies and lifestyle changes to improve sleep quality without relying on medication.",
    date: "Oct 25, 2025",
    readTime: "6 min read",
    author: "Sleep Specialist Dr. Amit",
  },
];

const BlogGrid = () => {
  const [shareOpenIndex, setShareOpenIndex] = useState<number | null>(null);

  const shareArticle = (platform: string, article: typeof articles[0]) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(article.title);
    const text = encodeURIComponent(article.excerpt);

    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${title}%20${url}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "width=600,height=400");
    }
    setShareOpenIndex(null);
  };

  return (
    <section id="blog" className="py-20 md:py-32 gradient-soft">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="mb-6 text-foreground">Health & Wellness Articles</h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            Expert-verified guides, tips, and insights to help you live a healthier life naturally
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {articles.map((article, index) => (
            <Card
              key={index}
              className="overflow-hidden border-0 shadow-soft hover-lift hover-glow group cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm">
                    {article.category}
                  </Badge>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-smooth"></div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-smooth line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-sm text-muted-foreground">
                    By {article.author}
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 hover:bg-secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShareOpenIndex(shareOpenIndex === index ? null : index);
                        }}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                      
                      {shareOpenIndex === index && (
                        <div className="absolute bottom-full right-0 mb-2 bg-card border border-border rounded-lg shadow-elegant p-2 flex gap-1 z-10 animate-scale-in">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-blue-500/10 hover:text-blue-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              shareArticle("facebook", article);
                            }}
                            title="Share on Facebook"
                          >
                            <Facebook className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-sky-500/10 hover:text-sky-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              shareArticle("twitter", article);
                            }}
                            title="Share on Twitter"
                          >
                            <Twitter className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-green-500/10 hover:text-green-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              shareArticle("whatsapp", article);
                            }}
                            title="Share on WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                    <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-smooth" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="text-primary font-semibold hover:underline inline-flex items-center gap-2 group">
            View All Articles
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-smooth" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogGrid;
