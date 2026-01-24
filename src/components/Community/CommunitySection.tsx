import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MessageSquare, ThumbsUp, Share2, Users, 
  Send, Star, TrendingUp, Award, Heart, 
  MessageCircle, Search, Phone, Video, MoreVertical
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
];

const onlineUsers = [
  { id: 1, name: "Dr. Priya Sharma", status: "online", badge: "Doctor", avatar: "" },
  { id: 2, name: "Ramesh Kumar", status: "online", badge: "Member", avatar: "" },
  { id: 3, name: "Anjali Verma", status: "away", badge: "Coach", avatar: "" },
  { id: 4, name: "Suresh Patel", status: "online", badge: "Member", avatar: "" },
  { id: 5, name: "Meera Reddy", status: "online", badge: "Nutritionist", avatar: "" },
];

const chatMessages = [
  { id: 1, sender: "Dr. Priya Sharma", message: "Hello everyone! Any health questions today?", time: "10:30 AM", isOwn: false },
  { id: 2, sender: "You", message: "Hi Dr. Priya! I wanted to ask about Vitamin D dosage.", time: "10:32 AM", isOwn: true },
  { id: 3, sender: "Dr. Priya Sharma", message: "Great question! For most adults, 1000-2000 IU daily is recommended. But it depends on your current levels.", time: "10:33 AM", isOwn: false },
];

export const CommunitySection = () => {
  const { toast } = useToast();
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  const [newPost, setNewPost] = useState("");
  const [activeTab, setActiveTab] = useState("feed");
  const [selectedChat, setSelectedChat] = useState<number | null>(null);
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState(chatMessages);
  const [searchUser, setSearchUser] = useState("");

  const toggleLike = (id: number) => {
    setLikedPosts(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handlePost = () => {
    if (!newPost.trim()) {
      toast({ title: "Please enter your message", variant: "destructive" });
      return;
    }
    toast({ title: "Post shared!", description: "Your message has been shared" });
    setNewPost("");
  };

  const sendChatMessage = () => {
    if (!chatMessage.trim()) return;
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      sender: "You",
      message: chatMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    }]);
    setChatMessage("");
    toast({ title: "Message sent!" });
  };

  const formatNumber = (num: number) => num >= 1000 ? (num / 1000).toFixed(1) + 'K' : num.toString();

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Supplements": "bg-blue-500/10 text-blue-500",
      "Expert Advice": "bg-purple-500/10 text-purple-500",
      "Home Remedies": "bg-green-500/10 text-green-500",
    };
    return colors[category] || "bg-primary/10 text-primary";
  };

  const filteredUsers = onlineUsers.filter(u => 
    u.name.toLowerCase().includes(searchUser.toLowerCase())
  );

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-primary/10 text-primary border-0">
            <Users className="w-3 h-3 mr-1" />
            Health Community
          </Badge>
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Community Hub</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Share experiences, chat with experts, and connect with health enthusiasts.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {[
            { icon: Users, value: "50K+", label: "Members" },
            { icon: MessageSquare, value: "12K+", label: "Discussions" },
            { icon: Award, value: "500+", label: "Experts" },
            { icon: TrendingUp, value: "95%", label: "Helpful" },
          ].map((item, i) => (
            <Card key={i} className="p-3 text-center">
              <item.icon className="w-5 h-5 mx-auto mb-1 text-primary" />
              <p className="font-bold text-sm">{item.value}</p>
              <p className="text-[10px] text-muted-foreground">{item.label}</p>
            </Card>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full mb-6">
            <TabsTrigger value="feed" className="flex-1 gap-2">
              <TrendingUp className="w-4 h-4" />Feed
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex-1 gap-2">
              <MessageCircle className="w-4 h-4" />Chat
            </TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-4">
            {/* New Post */}
            <Card className="p-4">
              <div className="flex gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary">U</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                  <Textarea
                    placeholder="Share your health experience..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    className="min-h-[80px]"
                  />
                  <Button onClick={handlePost} className="gap-2">
                    <Send className="w-4 h-4" />Share
                  </Button>
                </div>
              </div>
            </Card>

            {/* Posts */}
            {communityPosts.map((post) => (
              <Card key={post.id} className="p-4">
                <div className="flex gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {post.author.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="font-semibold text-sm">{post.author.name}</span>
                      {post.verified && <Star className="w-3 h-3 text-blue-500 fill-blue-500" />}
                      <Badge variant="secondary" className="text-[10px]">{post.author.badge}</Badge>
                      <span className="text-xs text-muted-foreground">• {post.time}</span>
                    </div>
                    <Badge className={`mb-2 text-[10px] ${getCategoryColor(post.category)}`}>{post.category}</Badge>
                    <p className="text-sm mb-3">{post.content}</p>
                    <div className="flex gap-3">
                      <Button variant="ghost" size="sm" className={likedPosts.includes(post.id) ? 'text-red-500' : ''} onClick={() => toggleLike(post.id)}>
                        <Heart className={`w-4 h-4 mr-1 ${likedPosts.includes(post.id) ? 'fill-current' : ''}`} />
                        {formatNumber(post.likes)}
                      </Button>
                      <Button variant="ghost" size="sm"><MessageSquare className="w-4 h-4 mr-1" />{post.comments}</Button>
                      <Button variant="ghost" size="sm"><Share2 className="w-4 h-4 mr-1" />{post.shares}</Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="chat">
            <div className="grid md:grid-cols-3 gap-4">
              {/* Users List */}
              <Card className="p-4 md:col-span-1">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search users..." 
                    value={searchUser}
                    onChange={(e) => setSearchUser(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {filteredUsers.map((user) => (
                    <button
                      key={user.id}
                      onClick={() => setSelectedChat(user.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                        selectedChat === user.id ? 'bg-primary/10' : 'hover:bg-secondary/50'
                      }`}
                    >
                      <div className="relative">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${
                          user.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                        }`} />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-sm">{user.name}</p>
                        <p className="text-[10px] text-muted-foreground">{user.badge}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </Card>

              {/* Chat Window */}
              <Card className="p-4 md:col-span-2">
                {selectedChat ? (
                  <>
                    <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar><AvatarFallback className="bg-primary/10 text-primary">PS</AvatarFallback></Avatar>
                        <div>
                          <p className="font-semibold text-sm">{onlineUsers.find(u => u.id === selectedChat)?.name}</p>
                          <p className="text-xs text-green-500">Online</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon"><Phone className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="icon"><Video className="w-4 h-4" /></Button>
                      </div>
                    </div>
                    <div className="h-[300px] overflow-y-auto space-y-3 mb-4">
                      {messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[80%] p-3 rounded-2xl ${
                            msg.isOwn ? 'bg-primary text-primary-foreground rounded-br-sm' : 'bg-secondary rounded-bl-sm'
                          }`}>
                            <p className="text-sm">{msg.message}</p>
                            <p className={`text-[10px] mt-1 ${msg.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>{msg.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Type a message..." 
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendChatMessage()}
                      />
                      <Button onClick={sendChatMessage}><Send className="w-4 h-4" /></Button>
                    </div>
                  </>
                ) : (
                  <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Select a user to start chatting</p>
                    </div>
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
