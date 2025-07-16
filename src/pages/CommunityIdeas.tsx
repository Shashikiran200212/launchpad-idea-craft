import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Lightbulb, 
  Search, 
  TrendingUp,
  Users,
  Eye,
  Share2,
  Calendar
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CommunityIdea {
  id: string;
  title: string;
  tagline: string;
  problem: string;
  solution: string;
  target_audience: string | null;
  business_model: string | null;
  features: string[];
  created_at: string;
  user_id: string;
}

export default function CommunityIdeas() {
  const [searchQuery, setSearchQuery] = useState("");
  const [ideas, setIdeas] = useState<CommunityIdea[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchIdeas();
  }, []);

  const fetchIdeas = async () => {
    try {
      const { data, error } = await supabase
        .from('startup_ideas')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setIdeas(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch community ideas",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredIdeas = ideas.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         idea.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         idea.problem.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const shareIdea = async (idea: CommunityIdea) => {
    const url = `${window.location.origin}/idea/${idea.id}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: idea.title,
          text: idea.tagline,
          url: url,
        });
      } catch (error) {
        navigator.clipboard.writeText(url);
        toast({
          title: "Link copied!",
          description: "Idea link has been copied to clipboard",
        });
      }
    } else {
      navigator.clipboard.writeText(url);
      toast({
        title: "Link copied!",
        description: "Idea link has been copied to clipboard",
      });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-display font-bold mb-4">
              Community{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Ideas
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover innovative startup ideas from entrepreneurs around the world. 
              Get inspired and find your next big opportunity.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass-card text-center">
              <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold mb-1">{ideas.length}</div>
              <div className="text-sm text-muted-foreground">Ideas Shared</div>
            </div>
            <div className="glass-card text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold mb-1">{new Set(ideas.map(i => i.user_id)).size}</div>
              <div className="text-sm text-muted-foreground">Contributors</div>
            </div>
            <div className="glass-card text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-accent-foreground" />
              </div>
              <div className="text-2xl font-bold mb-1">
                {ideas.filter(idea => 
                  new Date(idea.created_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                ).length}
              </div>
              <div className="text-sm text-muted-foreground">This Week</div>
            </div>
          </div>

          {/* Search */}
          <div className="glass-card mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search ideas by title, tagline, or problem..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 glass"
              />
            </div>
          </div>

          {/* Ideas Grid */}
          {loading ? (
            <div className="glass-card text-center py-12">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading community ideas...</p>
            </div>
          ) : filteredIdeas.length === 0 ? (
            <div className="glass-card text-center py-12">
              <Lightbulb className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No ideas found</h3>
              <p className="text-muted-foreground mb-6">
                {searchQuery ? "Try adjusting your search terms" : "Be the first to share an idea with the community!"}
              </p>
              <Button variant="hero" asChild>
                <Link to="/dashboard">
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Generate an Idea
                </Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredIdeas.length} of {ideas.length} ideas
                </p>
              </div>
              
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
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(idea.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold mb-2 line-clamp-2">{idea.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3 italic line-clamp-2">
                        "{idea.tagline}"
                      </p>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
                        <strong>Problem:</strong> {idea.problem}
                      </p>
                      {idea.features.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {idea.features.slice(0, 3).map((feature, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                          {idea.features.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{idea.features.length - 3} more
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <Link to={`/idea/${idea.id}`}>
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Link>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => shareIdea(idea)}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <div className="glass-card max-w-2xl mx-auto">
              <h3 className="font-semibold mb-2">💡 Share Your Ideas</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Have a brilliant startup idea? Generate and share it with the community to get feedback and inspire others.
              </p>
              <Button variant="hero" asChild>
                <Link to="/dashboard">
                  <Lightbulb className="w-4 h-4 mr-2" />
                  Generate New Idea
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}