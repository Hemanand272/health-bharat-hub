import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  MessageSquare, ThumbsUp, Share2, Users, 
  Send, Star, TrendingUp, Award, Heart
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const communityPosts = [
  {
    id: 1,
    author: { name: "Ramesh Kumar", avatar: "", badge: "Health Enthusiast" },
    content: "Started taking turmeric supplements 3 months ago. My joint pain has reduced significantly! Highly recommend for anyone with inflammation issues.",
    likes: 234,
    comments: 45,
    shares: 12,
    category: "Supplements",
    time: "2 hours ago",
    verified: true,
  },
  {
    id: 2,
    author: { name: "Dr. Priya Sharma", avatar: "", badge: "Verified Doctor" },
    content: "Quick tip: Always take Vitamin D3 with a fatty meal for better absorption. Many people don't know this and wonder why their levels don't improve!",
    likes: 567,
    comments: 89,
    shares: 156,
    category: "Expert Advice",
    time: "4 hours ago",
    verified: true,
  },
  {
    id: 3,
    author: { name: "Anjali Verma", avatar: "", badge: "Wellness Coach" },
    content: "My go-to immunity booster: Fresh ginger + honey + lemon juice every morning. Simple, natural, and effective. Been doing this for 5 years!",
    likes: 189,
    comments: 34,
    shares: 67,
    category: "Home Remedies",
    time: "6 hours ago",
    verified: true,
  },
  {
    id: 4,
    author: { name: "Suresh Patel", avatar: "", badge: "Member" },
    content: "Can anyone recommend a good probiotic for digestive issues? I've been having stomach problems for a while now.",
    likes: 45,
    comments: 23,
    shares: 2,
    category: "Questions",
    time: "8 hours ago",
    verified: false,
  },
  {
    id: 5,
    author: { name: "Meera Reddy", avatar: "", badge: "Nutrition Expert" },
    content: "Just completed a study on seasonal eating patterns in India. Eating locally grown seasonal fruits and vegetables can boost immunity by 40%!",
    likes: 456,
    comments: 78,
    shares: 234,
    category: "Research",
    time: "12 hours ago",
    verified: true,
  },
];

export const CommunitySection = () => {
  const { toast } = useToast();
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [newPost, setNewPost] = useState("");

  const toggleLike = (id: number) => {
    setLikedPosts(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handlePost = () => {
    if (!newPost.trim()) {
      toast({
        title: "Please enter your message",
        description: "Share your health experience or ask a question",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Post shared!",
      description: "Your message has been shared with the community",
    });
    setNewPost("");
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Supplements": "bg-blue-500/10 text-blue-500",
      "Expert Advice": "bg-purple-500/10 text-purple-500",
      "Home Remedies": "bg-green-500/10 text-green-500",
      "Questions": "bg-orange-500/10 text-orange-500",
      "Research": "bg-red-500/10 text-red-500",
    };
    return colors[category] || "bg-primary/10 text-primary";
  };

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary mb-4">
            <Users className="w-4 h-4" />
            <span className="text-sm font-medium">Health Community</span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 gradient-text">
            Community Wisdom
          </h2>
          <p className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Share experiences, ask questions, and learn from health experts and community members.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
          <div className="p-3 md:p-4 rounded-xl bg-secondary/30 border border-border text-center">
            <Users className="w-6 h-6 md:w-8 md:h-8 text-primary mx-auto mb-2" />
            <p className="text-lg md:text-2xl font-bold">50K+</p>
            <p className="text-xs md:text-sm text-muted-foreground">Members</p>
          </div>
          <div className="p-3 md:p-4 rounded-xl bg-secondary/30 border border-border text-center">
            <MessageSquare className="w-6 h-6 md:w-8 md:h-8 text-blue-500 mx-auto mb-2" />
            <p className="text-lg md:text-2xl font-bold">12K+</p>
            <p className="text-xs md:text-sm text-muted-foreground">Discussions</p>
          </div>
          <div className="p-3 md:p-4 rounded-xl bg-secondary/30 border border-border text-center">
            <Award className="w-6 h-6 md:w-8 md:h-8 text-yellow-500 mx-auto mb-2" />
            <p className="text-lg md:text-2xl font-bold">500+</p>
            <p className="text-xs md:text-sm text-muted-foreground">Experts</p>
          </div>
          <div className="p-3 md:p-4 rounded-xl bg-secondary/30 border border-border text-center">
            <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-green-500 mx-auto mb-2" />
            <p className="text-lg md:text-2xl font-bold">95%</p>
            <p className="text-xs md:text-sm text-muted-foreground">Helpful</p>
          </div>
        </div>

        {/* New Post */}
        <Card className="p-4 mb-8 shadow-lg border-2 border-border/50">
          <div className="flex gap-3">
            <Avatar className="h-10 w-10 shrink-0">
              <AvatarFallback className="bg-primary/10 text-primary">U</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <Textarea
                placeholder="Share your health experience or ask a question..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[80px] resize-none"
              />
              <div className="flex justify-end">
                <Button onClick={handlePost} className="gap-2">
                  <Send className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Posts */}
        <div className="space-y-4 md:space-y-6">
          {communityPosts.map((post) => (
            <Card key={post.id} className="p-4 md:p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex gap-3 md:gap-4">
                <Avatar className="h-10 w-10 md:h-12 md:w-12 shrink-0">
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                    {post.author.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-sm md:text-base">{post.author.name}</span>
                      {post.verified && (
                        <Star className="w-4 h-4 text-blue-500 fill-blue-500" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="secondary" className="text-xs">
                        {post.author.badge}
                      </Badge>
                      <span className="text-xs text-muted-foreground">• {post.time}</span>
                    </div>
                  </div>
                  
                  <Badge className={`mb-2 ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </Badge>
                  
                  <p className="text-sm md:text-base text-foreground mb-4 leading-relaxed">
                    {post.content}
                  </p>
                  
                  <div className="flex items-center gap-2 md:gap-4 flex-wrap">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-8 text-xs md:text-sm ${likedPosts.includes(post.id) ? 'text-red-500' : ''}`}
                      onClick={() => toggleLike(post.id)}
                    >
                      <Heart className={`w-4 h-4 mr-1 ${likedPosts.includes(post.id) ? 'fill-current' : ''}`} />
                      {formatNumber(post.likes + (likedPosts.includes(post.id) ? 1 : 0))}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 text-xs md:text-sm">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 text-xs md:text-sm">
                      <Share2 className="w-4 h-4 mr-1" />
                      {post.shares}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" size="lg" className="gap-2">
            Load More Posts
          </Button>
        </div>
      </div>
    </section>
  );
};
