import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Calendar, Clock, ArrowRight, Share2, Facebook, Twitter, 
  MessageCircle, Heart, Bookmark, Eye, UserPlus, Star,
  ThumbsUp, MessageSquare
} from "lucide-react";
import turmericRemedies from "@/assets/blog-turmeric-remedies.jpg";
import nutritionGuide from "@/assets/blog-nutrition-guide.jpg";
import wellnessYoga from "@/assets/blog-wellness-yoga.jpg";
import herbalTeas from "@/assets/blog-herbal-teas.jpg";
import immuneBoost from "@/assets/blog-immune-boost.jpg";
import sleepRemedies from "@/assets/blog-sleep-remedies.jpg";

const articles = [
  {
    id: 1,
    image: turmericRemedies,
    category: "Home Remedies",
    title: "Golden Healing: Turmeric and Ginger Remedies for Inflammation",
    excerpt: "Discover ancient Ayurvedic wisdom combined with modern science to fight inflammation naturally using kitchen ingredients.",
    date: "Nov 8, 2025",
    readTime: "5 min read",
    author: { name: "Dr. Priya Sharma", avatar: "", followers: 12500, verified: true },
    likes: 2345,
    comments: 189,
    views: 15600,
    saved: 567,
  },
  {
    id: 2,
    image: nutritionGuide,
    category: "Nutrition Guide",
    title: "Complete Guide to Balanced Nutrition for Disease Prevention",
    excerpt: "Learn how to create perfectly balanced meals that provide all essential nutrients and help prevent chronic diseases.",
    date: "Nov 5, 2025",
    readTime: "8 min read",
    author: { name: "Nutritionist Rajesh Kumar", avatar: "", followers: 8900, verified: true },
    likes: 1876,
    comments: 234,
    views: 12300,
    saved: 890,
  },
  {
    id: 3,
    image: wellnessYoga,
    category: "Wellness",
    title: "Mind-Body Connection: Yoga and Meditation for Mental Health",
    excerpt: "Explore scientifically-proven benefits of yoga and meditation for reducing stress, anxiety, and improving overall mental wellness.",
    date: "Nov 3, 2025",
    readTime: "6 min read",
    author: { name: "Wellness Coach Anjali", avatar: "", followers: 15200, verified: true },
    likes: 3456,
    comments: 312,
    views: 21000,
    saved: 1234,
  },
  {
    id: 4,
    image: herbalTeas,
    category: "Natural Remedies",
    title: "Healing Herbal Teas: Nature's Medicine in Your Cup",
    excerpt: "A comprehensive guide to herbal teas that can help with digestion, immunity, sleep, and various health conditions.",
    date: "Oct 30, 2025",
    readTime: "7 min read",
    author: { name: "Herbalist Dr. Suresh", avatar: "", followers: 6700, verified: true },
    likes: 987,
    comments: 145,
    views: 8900,
    saved: 456,
  },
  {
    id: 5,
    image: immuneBoost,
    category: "Preventive Care",
    title: "Supercharge Your Immunity: Foods That Fight Disease",
    excerpt: "Discover powerful immune-boosting foods and learn how to incorporate them into your daily diet for optimal health.",
    date: "Oct 28, 2025",
    readTime: "5 min read",
    author: { name: "Dr. Meera Patel", avatar: "", followers: 9800, verified: true },
    likes: 2890,
    comments: 256,
    views: 18500,
    saved: 789,
  },
  {
    id: 6,
    image: sleepRemedies,
    category: "Sleep Health",
    title: "Natural Sleep Solutions: Say Goodbye to Insomnia",
    excerpt: "Effective natural remedies and lifestyle changes to improve sleep quality without relying on medication.",
    date: "Oct 25, 2025",
    readTime: "6 min read",
    author: { name: "Sleep Specialist Dr. Amit", avatar: "", followers: 11200, verified: true },
    likes: 1654,
    comments: 198,
    views: 14200,
    saved: 678,
  },
];

export const HealthArticles = () => {
  const [likedArticles, setLikedArticles] = useState<number[]>([]);
  const [savedArticles, setSavedArticles] = useState<number[]>([]);
  const [followedAuthors, setFollowedAuthors] = useState<string[]>([]);
  const [shareOpenIndex, setShareOpenIndex] = useState<number | null>(null);

  const toggleLike = (id: number) => {
    setLikedArticles(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleSave = (id: number) => {
    setSavedArticles(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleFollow = (authorName: string) => {
    setFollowedAuthors(prev => 
      prev.includes(authorName) ? prev.filter(a => a !== authorName) : [...prev, authorName]
    );
  };

  const shareArticle = (platform: string, article: typeof articles[0]) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(article.title);

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

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <section id="blog" className="py-12 md:py-20 lg:py-32 gradient-soft">
      <div className="container mx-auto px-3 md:px-4">
        <div className="max-w-4xl mx-auto text-center mb-8 md:mb-16">
          <Badge className="mb-3 md:mb-4 bg-primary/10 text-primary border-0">
            <Star className="w-3 h-3 mr-1 fill-primary" /> Expert Verified
          </Badge>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-foreground">
            Health & Wellness Articles
          </h2>
          <p className="text-sm md:text-lg lg:text-xl text-muted-foreground px-2">
            Expert-verified guides, tips, and insights from certified health professionals. 
            Follow your favorite authors and join the health community.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 max-w-7xl mx-auto">
          {articles.map((article, index) => (
            <Card
              key={article.id}
              className="overflow-hidden border-0 shadow-soft hover-lift group cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                />
                <div className="absolute top-2 md:top-4 left-2 md:left-4">
                  <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm text-xs">
                    {article.category}
                  </Badge>
                </div>
                <div className="absolute top-2 md:top-4 right-2 md:right-4 flex gap-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleSave(article.id); }}
                    className={`p-1.5 md:p-2 rounded-full bg-background/80 backdrop-blur-sm transition-colors ${
                      savedArticles.includes(article.id) ? 'text-primary' : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    <Bookmark className={`w-3 h-3 md:w-4 md:h-4 ${savedArticles.includes(article.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-smooth"></div>
              </div>

              <div className="p-3 md:p-4 lg:p-6">
                {/* Author Section */}
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <div className="flex items-center gap-2 md:gap-3 min-w-0">
                    <Avatar className="h-8 w-8 md:h-10 md:w-10 shrink-0">
                      <AvatarImage src={article.author.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {article.author.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="font-medium text-xs md:text-sm truncate">{article.author.name}</span>
                        {article.author.verified && (
                          <Badge variant="secondary" className="h-3 w-3 md:h-4 md:w-4 p-0 rounded-full bg-blue-500 shrink-0">
                            <Star className="h-2 w-2 md:h-3 md:w-3 text-white fill-white" />
                          </Badge>
                        )}
                      </div>
                      <span className="text-[10px] md:text-xs text-muted-foreground">
                        {formatNumber(article.author.followers)} followers
                      </span>
                    </div>
                  </div>
                  <Button
                    variant={followedAuthors.includes(article.author.name) ? "secondary" : "outline"}
                    size="sm"
                    className="h-7 md:h-8 text-xs shrink-0"
                    onClick={(e) => { e.stopPropagation(); toggleFollow(article.author.name); }}
                  >
                    {followedAuthors.includes(article.author.name) ? (
                      "Following"
                    ) : (
                      <>
                        <UserPlus className="w-3 h-3 mr-1" />
                        Follow
                      </>
                    )}
                  </Button>
                </div>

                <div className="flex items-center gap-2 md:gap-4 text-[10px] md:text-sm text-muted-foreground mb-2 md:mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 md:w-4 md:h-4" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h3 className="text-sm md:text-lg lg:text-xl font-bold text-foreground mb-2 md:mb-3 group-hover:text-primary transition-smooth line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4 line-clamp-2">
                  {article.excerpt}
                </p>

                {/* Engagement Stats */}
                <div className="flex items-center gap-2 md:gap-4 text-[10px] md:text-sm text-muted-foreground mb-3 md:mb-4">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3 h-3 md:w-4 md:h-4" />
                    <span>{formatNumber(article.views)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3 md:w-4 md:h-4" />
                    <span>{formatNumber(article.likes + (likedArticles.includes(article.id) ? 1 : 0))}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3 md:w-4 md:h-4" />
                    <span>{article.comments}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-border">
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-7 md:h-9 px-2 text-xs ${likedArticles.includes(article.id) ? 'text-red-500' : ''}`}
                      onClick={(e) => { e.stopPropagation(); toggleLike(article.id); }}
                    >
                      <Heart className={`w-3 h-3 md:w-4 md:h-4 mr-1 ${likedArticles.includes(article.id) ? 'fill-current' : ''}`} />
                      <span className="hidden sm:inline">Like</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 md:h-9 px-2 text-xs">
                      <MessageCircle className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                      <span className="hidden sm:inline">Comment</span>
                    </Button>
                    <div className="relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 md:h-9 px-2 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShareOpenIndex(shareOpenIndex === index ? null : index);
                        }}
                      >
                        <Share2 className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                        <span className="hidden sm:inline">Share</span>
                      </Button>
                      
                      {shareOpenIndex === index && (
                        <div className="absolute bottom-full left-0 mb-2 bg-card border border-border rounded-lg shadow-elegant p-2 flex gap-1 z-10 animate-scale-in">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 md:h-8 md:w-8 hover:bg-blue-500/10 hover:text-blue-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              shareArticle("facebook", article);
                            }}
                          >
                            <Facebook className="w-3 h-3 md:w-4 md:h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 md:h-8 md:w-8 hover:bg-sky-500/10 hover:text-sky-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              shareArticle("twitter", article);
                            }}
                          >
                            <Twitter className="w-3 h-3 md:w-4 md:h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 md:h-8 md:w-8 hover:bg-green-500/10 hover:text-green-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              shareArticle("whatsapp", article);
                            }}
                          >
                            <MessageCircle className="w-3 h-3 md:w-4 md:h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-primary group-hover:translate-x-1 transition-smooth" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-12">
          <Button variant="outline" size="lg" className="gap-2">
            View All Articles
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};
