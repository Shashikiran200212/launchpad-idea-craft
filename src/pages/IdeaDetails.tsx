import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Lightbulb, 
  ArrowLeft, 
  Edit, 
  Share2, 
  Target, 
  DollarSign,
  Users,
  CheckCircle,
  Trash2
} from "lucide-react";
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
  user_id: string;
}

export default function IdeaDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [idea, setIdea] = useState<StartupIdea | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchIdea();
    }
  }, [id]);

  const fetchIdea = async () => {
    try {
      const { data, error } = await supabase
        .from('startup_ideas')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setIdea(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch idea details",
        variant: "destructive"
      });
      navigate('/my-ideas');
    } finally {
      setLoading(false);
    }
  };

  const deleteIdea = async () => {
    if (!idea || !user) return;
    
    try {
      const { error } = await supabase
        .from('startup_ideas')
        .delete()
        .eq('id', idea.id)
        .eq('user_id', user.id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Idea deleted successfully",
      });
      navigate('/my-ideas');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete idea",
        variant: "destructive"
      });
    }
  };

  const shareIdea = async () => {
    if (navigator.share && idea) {
      try {
        await navigator.share({
          title: idea.title,
          text: idea.tagline,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to clipboard
        navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied!",
          description: "Idea link has been copied to clipboard",
        });
      }
    } else if (idea) {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Idea link has been copied to clipboard",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-card text-center py-12">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading idea details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!idea) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-24 pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-card text-center py-12">
              <h3 className="text-xl font-semibold mb-2">Idea not found</h3>
              <p className="text-muted-foreground mb-6">
                The idea you're looking for doesn't exist or has been deleted.
              </p>
              <Button variant="hero" onClick={() => navigate('/my-ideas')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to My Ideas
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isOwner = user?.id === idea.user_id;

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/my-ideas')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Ideas</span>
            </Button>
            
            {isOwner && (
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={shareIdea}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="ghost" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-destructive hover:text-destructive"
                  onClick={deleteIdea}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="glass-card">
            {/* Title Section */}
            <div className="flex items-start space-x-4 mb-8">
              <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-display font-bold mb-3">{idea.title}</h1>
                <p className="text-xl text-muted-foreground italic mb-4">"{idea.tagline}"</p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>Created {new Date(idea.created_at).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>Updated {new Date(idea.updated_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Problem & Solution */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Target className="w-5 h-5 text-destructive" />
                  <h2 className="text-2xl font-semibold">Problem</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">{idea.problem}</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <h2 className="text-2xl font-semibold">Solution</h2>
                </div>
                <p className="text-muted-foreground leading-relaxed">{idea.solution}</p>
              </div>
            </div>

            {/* Target Audience & Business Model */}
            {(idea.target_audience || idea.business_model) && (
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                {idea.target_audience && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Users className="w-5 h-5 text-accent" />
                      <h2 className="text-2xl font-semibold">Target Audience</h2>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{idea.target_audience}</p>
                  </div>
                )}
                
                {idea.business_model && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <DollarSign className="w-5 h-5 text-accent-foreground" />
                      <h2 className="text-2xl font-semibold">Business Model</h2>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{idea.business_model}</p>
                  </div>
                )}
              </div>
            )}

            {/* Features */}
            {idea.features.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {idea.features.map((feature, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="p-3 text-sm justify-start"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}