
import { useState, useEffect } from "react";
import { SessionNavBar } from "@/components/SessionNavBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import LocationPicker from "@/components/LocationPicker";
import ImageUpload from "@/components/ImageUpload";
import BargainSection from "@/components/BargainSection";
import Alert from "@/components/ui/alert-custom";
import { 
  Search, 
  Plus, 
  MessageSquare, 
  ThumbsUp, 
  Eye,
  Filter,
  DollarSign,
  ShoppingBag,
  BookOpen,
  MapPin,
  IndianRupee,
  Heart,
  MessageCircle,
  Send,
  X
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";




const Forum = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("HelpMeOut");
  const [selectedFilter, setSelectedFilter] = useState("newest");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [isNewPostOpen, setIsNewPostOpen] = useState(false);
  const [newReply, setNewReply] = useState("");
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [newPost, setNewPost] = useState({ 
    title: "", 
    content: "", 
    category: "HelpMeOut", 
    budget: "",
    price: "",
    condition: "",
    tags: "",
    location: null ,
    images: [] 
  });
  
  const [posts, setPosts] = useState([]);

  // Load posts from localStorage on component mount
  useEffect(() => {
    const savedPosts = localStorage.getItem('forum_posts');
    if (savedPosts) {
      const parsedPosts = JSON.parse(savedPosts);
      setPosts(parsedPosts);
    }
  }, []);

  const categories = ["HelpMeOut", "Study", "Mart", "General"];
  const filters = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "active", label: "Most Active" }
  ];

  const handleLike = (postId) => {
    const updatedPosts = posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked }
        : post
    );
    setPosts(updatedPosts);
    localStorage.setItem('forum_posts', JSON.stringify(updatedPosts));
    console.log('Toggle like for post:', postId);
  };

  const handleReplyLike = (postId, replyId) => {
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const updatedReplies = post.replies.map(reply =>
          reply.id === replyId
            ? { ...reply, likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1, isLiked: !reply.isLiked }
            : reply
        );
        return { ...post, replies: updatedReplies };
      }
      return post;
    });
    setPosts(updatedPosts);
    localStorage.setItem('forum_posts', JSON.stringify(updatedPosts));
  };

  const handleCreatePost = async () => {
    try {
      const post = {
        id: Date.now(),
        title: newPost.title,
        content: newPost.content,
        author: "You",
        category: newPost.category,
        likes: 0,
        replies: [],
        time: "Just now",
        isLiked: false,
        tags: newPost.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        price: newPost.budget || newPost.price || undefined,
        isPaid: newPost.category === "HelpMeOut" && !!newPost.budget,
        location: newPost.location,
        images: newPost.images
      };
      
      console.log('Creating post with data:', post);
      
      const updatedPosts = [post, ...posts];
      setPosts(updatedPosts);
      localStorage.setItem('forum_posts', JSON.stringify(updatedPosts));
      
      setNewPost({ 
        title: "", 
        content: "", 
        category: "HelpMeOut", 
        budget: "", 
        price: "", 
        condition: "", 
        tags: "",
        location: null,
        images: []
      });
      
      setIsNewPostOpen(false);
      setAlertMessage("Post created successfully!");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      
    } catch (error) {
      console.error('Error creating post:', error);
      setAlertMessage("Failed to create post. Please try again.");
      setShowAlert(true);
    }
  };

  const handleReply = (postId) => {
    if (!newReply.trim()) return;
    
    const reply = {
      id: Date.now(),
      content: newReply,
      author: "You",
      time: "Just now",
      likes: 0,
      isLiked: false
    };

    const updatedPosts = posts.map(post => 
      post.id === postId 
        ? { ...post, replies: [...post.replies, reply] }
        : post
    );
    
    setPosts(updatedPosts);
    localStorage.setItem('forum_posts', JSON.stringify(updatedPosts));
    setNewReply("");
    setReplyingTo(null);
    console.log('Adding reply to post:', postId);
  };

  const handleBargain = (postId, amount, message) => {
    console.log(`Bargain for post ${postId}: ₹${amount}, message: ${message}`);
    setAlertMessage(`Bargain sent: ₹${amount}`);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleMessage = (postId, message) => {
    console.log(`Message for post ${postId}: ${message}`);
    setAlertMessage("Message sent!");
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (selectedFilter) {
      case 'oldest':
        return new Date(a.time).getTime() - new Date(b.time).getTime();
      case 'active':
        return b.replies.length - a.replies.length;
      default:
        return new Date(b.time).getTime() - new Date(a.time).getTime();
    }
  });

  const getStatsForCategory = (category) => {
    const categoryPosts = posts.filter(p => p.category === category);
    switch (category) {
      case 'HelpMeOut':
        return {
          activeTasks: categoryPosts.filter(p => p.isPaid && !p.isLiked).length,
          completedTasks: categoryPosts.filter(p => p.isPaid && p.isLiked).length,
          moneyEarned: 0,
          tasksPosted: categoryPosts.length
        };
      case 'Mart':
        return {
          totalItems: categoryPosts.length,
          activeUsers: 0,
          sold: 0,
          bought: 0
        };
      default:
        return {
          totalPosts: categoryPosts.length,
          activeUsers: 0,
          trending: categoryPosts.filter(p => p.replies.length > 5).length
        };
    }
  };

  const stats = getStatsForCategory(selectedCategory);

  return (
    <div className="min-h-screen flex w-full bg-background">
      <SessionNavBar />
      <main className="flex-1 ml-12 lg:ml-60 transition-all duration-200">
        {/* Alert */}
        {showAlert && (
          <div className="fixed top-4 right-4 z-50">
            <Alert type="success" message={alertMessage} />
          </div>
        )}

        <div className="max-w-6xl mx-auto p-3 md:p-6 space-y-6">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-900 text-white p-4 md:p-6 rounded-lg">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Community Forum</h1>
                <p className="text-blue-100 text-sm md:text-base">Connect, discuss, and learn together</p>
              </div>
              <Dialog open={isNewPostOpen} onOpenChange={setIsNewPostOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-white text-blue-600 hover:bg-blue-50 gap-2">
                    <Plus className="w-4 h-4" />
                    New Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Create New Post</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <Input
                      placeholder="Post title..."
                      value={newPost.title}
                      onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    />
                    
                    <Select value={newPost.category} onValueChange={(value) => setNewPost({...newPost, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Textarea
                      placeholder="What's on your mind?"
                      value={newPost.content}
                      onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                      rows={4}
                    />
                    
                    <LocationPicker
                      onLocationSelect={(location) => setNewPost({...newPost, location})}
                      value={newPost.location}
                    />
                    
                    <ImageUpload
                      onImagesChange={(images) => setNewPost({...newPost, images})}
                      value={newPost.images}
                    />
                    
                    <Input
                      placeholder="Tags (comma separated)"
                      value={newPost.tags}
                      onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                    />
                    
                    {newPost.category === "HelpMeOut" && (
                      <div className="flex items-center gap-2">
                        <IndianRupee className="w-4 h-4" />
                        <Input
                          placeholder="Budget (₹)"
                          value={newPost.budget}
                          onChange={(e) => setNewPost({...newPost, budget: e.target.value})}
                        />
                      </div>
                    )}
                    
                    {newPost.category === "Mart" && (
                      <>
                        <div className="flex items-center gap-2">
                          <IndianRupee className="w-4 h-4" />
                          <Input
                            placeholder="Price (₹)"
                            value={newPost.price}
                            onChange={(e) => setNewPost({...newPost, price: e.target.value})}
                          />
                        </div>
                        <Input
                          placeholder="Item condition"
                          value={newPost.condition}
                          onChange={(e) => setNewPost({...newPost, condition: e.target.value})}
                        />
                      </>
                    )}
                    
                    <Button 
                      onClick={handleCreatePost} 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={!newPost.title || !newPost.content}
                    >
                      Create Post
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-10 pb-4 border-b">
            <div className="flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search posts, tasks, items or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex flex-col md:flex-row gap-2 justify-between">
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="flex items-center gap-2"
                    >
                      {category === 'HelpMeOut' && <DollarSign className="w-4 h-4" />}
                      {category === 'Mart' && <ShoppingBag className="w-4 h-4" />}
                      {category === 'Study' && <BookOpen className="w-4 h-4" />}
                      {category === 'General' && <MessageSquare className="w-4 h-4" />}
                      {category}
                    </Button>
                  ))}
                </div>
                
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {filters.map(filter => (
                        <SelectItem key={filter.value} value={filter.value}>
                          {filter.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {selectedCategory === 'HelpMeOut' && (
              <>
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                  <CardContent className="p-3 md:p-4">
                    <div className="text-xl md:text-2xl font-bold text-blue-800 dark:text-blue-200">{stats.activeTasks}</div>
                    <p className="text-xs md:text-sm text-blue-600 dark:text-blue-400">Active Tasks</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
                  <CardContent className="p-3 md:p-4">
                    <div className="text-xl md:text-2xl font-bold text-green-800 dark:text-green-200">{stats.completedTasks}</div>
                    <p className="text-xs md:text-sm text-green-600 dark:text-green-400">Completed</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900">
                  <CardContent className="p-3 md:p-4">
                    <div className="text-xl md:text-2xl font-bold text-yellow-800 dark:text-yellow-200">₹{stats.moneyEarned}</div>
                    <p className="text-xs md:text-sm text-yellow-600 dark:text-yellow-400">Earned</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
                  <CardContent className="p-3 md:p-4">
                    <div className="text-xl md:text-2xl font-bold text-purple-800 dark:text-purple-200">{stats.tasksPosted}</div>
                    <p className="text-xs md:text-sm text-purple-600 dark:text-purple-400">Posted</p>
                  </CardContent>
                </Card>
              </>
            )}
            
            {selectedCategory === 'Mart' && (
              <>
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
                  <CardContent className="p-3 md:p-4">
                    <div className="text-xl md:text-2xl font-bold text-blue-800 dark:text-blue-200">{stats.totalItems}</div>
                    <p className="text-xs md:text-sm text-blue-600 dark:text-blue-400">Items</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
                  <CardContent className="p-3 md:p-4">
                    <div className="text-xl md:text-2xl font-bold text-green-800 dark:text-green-200">{stats.sold}</div>
                    <p className="text-xs md:text-sm text-green-600 dark:text-green-400">Sold</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900">
                  <CardContent className="p-3 md:p-4">
                    <div className="text-xl md:text-2xl font-bold text-yellow-800 dark:text-yellow-200">{stats.bought}</div>
                    <p className="text-xs md:text-sm text-yellow-600 dark:text-yellow-400">Bought</p>
                  </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
                  <CardContent className="p-3 md:p-4">
                    <div className="text-xl md:text-2xl font-bold text-purple-800 dark:text-purple-200">{stats.activeUsers}</div>
                    <p className="text-xs md:text-sm text-purple-600 dark:text-purple-400">Users</p>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <Card key={post.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4 md:p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">by {post.author} • {post.time}</p>
                        <p className="text-sm mb-3">{post.content}</p>
                        
                        {post.location && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                            <MapPin className="w-3 h-3" />
                            {post.location.address}
                          </div>
                        )}
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge variant="outline">{post.category}</Badge>
                          {post.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              #{tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {post.price && (
                        <div className="text-right">
                          <div className="text-xl font-bold text-green-600 flex items-center gap-1">
                            <IndianRupee className="w-4 h-4" />
                            {post.price.replace('₹', '')}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-3 border-t gap-3">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(post.id)}
                          className={post.isLiked ? "text-red-600" : ""}
                        >
                          <Heart className={`w-4 h-4 mr-1 ${post.isLiked ? 'fill-current' : ''}`} />
                          {post.likes}
                        </Button>
                        
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {post.replies.length}
                        </Button>
                        
                        {post.images && post.images.length > 0 && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4 mr-1" />
                                View Images ({post.images.length})
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>Post Images</DialogTitle>
                              </DialogHeader>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {post.images.map((image, index) => (
                                  <img
                                    key={index}
                                    src={URL.createObjectURL(image)}
                                    alt={`Post image ${index + 1}`}
                                    className="w-full h-64 object-cover rounded-lg"
                                  />
                                ))}
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        {(post.category === 'HelpMeOut' || post.category === 'Mart') && post.price && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <MessageSquare className="w-4 h-4 mr-1" />
                                Message Privately
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Chat with {post.author}</DialogTitle>
                              </DialogHeader>
                              <BargainSection
                                originalPrice={parseInt(post.price.replace('₹', '').replace(',', ''))}
                                category={post.category }
                                onBargain={(amount, message) => handleBargain(post.id, amount, message)}
                                onMessage={(message) => handleMessage(post.id, message)}
                              />
                            </DialogContent>
                          </Dialog>
                        )}
                        
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => setReplyingTo(replyingTo === post.id ? null : post.id)}
                        >
                          Reply
                        </Button>
                      </div>
                    </div>

                    {/* Reply Section */}
                    {replyingTo === post.id && (
                      <div className="mt-4 p-3 border rounded-lg bg-muted/50">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Write a reply..."
                            value={newReply}
                            onChange={(e) => setNewReply(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleReply(post.id)}
                          />
                          <Button size="sm" onClick={() => handleReply(post.id)}>
                            <Send className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => setReplyingTo(null)}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Replies */}
                    {post.replies.length > 0 && (
                      <div className="mt-4 space-y-3 border-l-2 border-muted pl-4">
                        {post.replies.map(reply => (
                          <div key={reply.id} className="bg-muted/30 p-3 rounded-lg">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <p className="text-sm font-medium">{reply.author}</p>
                                <p className="text-xs text-muted-foreground">{reply.time}</p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleReplyLike(post.id, reply.id)}
                                className={reply.isLiked ? "text-red-600" : ""}
                              >
                                <Heart className={`w-3 h-3 mr-1 ${reply.isLiked ? 'fill-current' : ''}`} />
                                {reply.likes}
                              </Button>
                            </div>
                            <p className="text-sm">{reply.content}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-8">
                  <p className="text-muted-foreground">No posts found. {posts.length === 0 ? "Create your first post!" : "Try adjusting your search or category."}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Forum;
