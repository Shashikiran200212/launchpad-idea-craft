import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Lightbulb, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  Star,
  Calendar,
  TrendingUp,
  Plus,
  Share2
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface StartupIdea {
  id: string;
  title: string;
  tagline: string;
  problem: string;
  solution: string;
  target_audience: string | null;
  business_model: string | null;
  features: string[];
  created_at: string;
  updated_at: string;
}

export default function MyIdeas() {
  const [searchQuery, setSearchQuery] = useState("");
  const [ideas, setIdeas] = useState<StartupIdea[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchIdeas();
    }
  }, [user]);

  const fetchIdeas = async () => {
    try {
      const { data, error } = await supabase
        .from('startup_ideas')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setIdeas(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch ideas",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const deleteIdea = async (ideaId: string) => {
    try {
      const { error } = await supabase
        .from('startup_ideas')
        .delete()
        .eq('id', ideaId)
        .eq('user_id', user?.id);

      if (error) throw error;
      
      setIdeas(prev => prev.filter(idea => idea.id !== ideaId));
      toast({
        title: "Success",
        description: "Idea deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete idea",
        variant: "destructive"
      });
    }
  };

  const filteredIdeas = ideas.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         idea.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="text-4xl font-display font-bold mb-2">
                My{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Ideas
                </span>
              </h1>
              <p className="text-muted-foreground">
                Manage and track your generated startup ideas
              </p>
            </div>
            <Button variant="hero" asChild>
              <Link to="/dashboard">
                <Plus className="w-4 h-4 mr-2" />
                Generate New Idea
              </Link>
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="glass-card text-center">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold mb-1">{ideas.length}</div>
              <div className="text-sm text-muted-foreground">Total Ideas</div>
            </div>
            <div className="glass-card text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold mb-1">0</div>
              <div className="text-sm text-muted-foreground">Favorites</div>
            </div>
            <div className="glass-card text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-accent-foreground" />
              </div>
              <div className="text-2xl font-bold mb-1">{ideas.length}</div>
              <div className="text-sm text-muted-foreground">Published</div>
            </div>
            <div className="glass-card text-center">
              <div className="w-12 h-12 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div className="text-2xl font-bold mb-1">{ideas.filter(idea => 
                new Date(idea.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
              ).length}</div>
              <div className="text-sm text-muted-foreground">This Week</div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="glass-card mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search your ideas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 glass"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                {filteredIdeas.length} of {ideas.length} ideas
              </div>
            </div>
          </div>

          {/* Ideas Grid */}
          {loading ? (
            <div className="glass-card text-center py-12">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading your ideas...</p>
            </div>
          ) : filteredIdeas.length === 0 ? (
            <div className="glass-card text-center py-12">
              <Lightbulb className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No ideas found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery ? "Try adjusting your search terms" : "Start by generating your first startup idea"}
              </p>
              <Button variant="hero" asChild>
                <Link to="/dashboard">
                  <Plus className="w-4 h-4 mr-2" />
                  Generate Your First Idea
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredIdeas.map((idea, index) => (
                <div 
                  key={idea.id} 
                  className="glass-card hover-lift group animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <Lightbulb className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(idea.created_at).toLocaleDateString()}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">{idea.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3 italic">
                      "{idea.tagline}"
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      <strong>Problem:</strong> {idea.problem}
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      <strong>Solution:</strong> {idea.solution}
                    </p>
                    {idea.features.length > 0 && (
                      <div className="text-xs text-muted-foreground">
                        <strong>Key Features:</strong> {idea.features.slice(0, 2).join(", ")}
                        {idea.features.length > 2 && ` +${idea.features.length - 2} more`}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-destructive hover:text-destructive"
                      onClick={() => deleteIdea(idea.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Notice */}
          <div className="mt-12 text-center">
            <div className="glass-card max-w-2xl mx-auto">
              <h3 className="font-semibold mb-2">🚀 Your Ideas</h3>
              <p className="text-sm text-muted-foreground">
                All your startup ideas are automatically saved and synced with Supabase. 
                Share them with the community or keep them private.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}