import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Lightbulb, 
  Sparkles, 
  Rocket, 
  Save, 
  Eye,
  RefreshCw,
  Target,
  TrendingUp,
  Users,
  DollarSign
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GeneratedIdea {
  name: string;
  tagline: string;
  problem: string;
  solution: string;
  targetAudience: string;
  revenue: string;
  features: string[];
  valueProposition: string;
  cta: string;
}

export default function Dashboard() {
  const [interests, setInterests] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedIdea, setGeneratedIdea] = useState<GeneratedIdea | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!interests.trim()) {
      toast({
        title: "Please describe your interests",
        description: "Tell us what problems you want to solve or industries you're passionate about.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation with a timeout
    setTimeout(() => {
      const mockIdea: GeneratedIdea = {
        name: "EcoTrack",
        tagline: "Making sustainability simple for everyone",
        problem: "People want to be environmentally conscious but don't know how to track their impact effectively.",
        solution: "A gamified app that tracks carbon footprint and suggests actionable eco-friendly changes.",
        targetAudience: "Environmentally conscious millennials and Gen Z consumers",
        revenue: "Freemium model with premium features, partnerships with eco-brands",
        features: [
          "Carbon footprint calculator",
          "Daily eco-challenges",
          "Progress tracking dashboard",
          "Community leaderboards",
          "Reward system integration"
        ],
        valueProposition: "Turn environmental consciousness into engaging daily habits with measurable impact.",
        cta: "Start Your Eco Journey Today"
      };
      
      setGeneratedIdea(mockIdea);
      setIsGenerating(false);
      
      toast({
        title: "Idea generated successfully!",
        description: "Your personalized startup idea is ready to review.",
      });
    }, 3000);
  };

  const handleSave = () => {
    if (!generatedIdea) return;
    
    toast({
      title: "Idea saved!",
      description: "Your startup idea has been saved to your account. Connect Supabase to persist data.",
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-display font-bold mb-4">
              Generate Your{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Next Big Idea
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Describe your interests, problems you want to solve, or industries you're passionate about.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <div className="glass-card space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <Target className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-semibold">Describe Your Vision</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="interests" className="text-base font-medium">
                    What problems do you want to solve?
                  </Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Examples: "Remote team collaboration", "Sustainable living", "Education for kids"
                  </p>
                  <Textarea
                    id="interests"
                    placeholder="I'm passionate about helping people with..."
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    className="min-h-32 glass resize-none"
                  />
                </div>

                <Button 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  variant="hero"
                  size="lg"
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                      Generating Ideas...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate Startup Idea
                    </>
                  )}
                </Button>
              </div>

              {/* Quick Suggestions */}
              <div className="pt-4 border-t border-glass-border/30">
                <p className="text-sm font-medium mb-3">Quick suggestions:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Remote work tools",
                    "Health & wellness",
                    "Education technology",
                    "Sustainable living",
                    "Financial planning"
                  ].map((suggestion) => (
                    <Button
                      key={suggestion}
                      variant="outline"
                      size="sm"
                      onClick={() => setInterests(suggestion)}
                      className="text-xs"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="glass-card">
              {!generatedIdea && !isGenerating && (
                <div className="text-center py-12">
                  <Lightbulb className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-xl font-semibold mb-2">Ready to spark innovation?</h3>
                  <p className="text-muted-foreground">
                    Describe your interests and let our AI generate personalized startup ideas for you.
                  </p>
                </div>
              )}

              {isGenerating && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Generating your idea...</h3>
                  <p className="text-muted-foreground">
                    Our AI is analyzing market trends and creating a personalized startup concept.
                  </p>
                  <div className="flex justify-center mt-6">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}

              {generatedIdea && (
                <div className="space-y-6 animate-fade-in">
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-3xl font-display font-bold text-primary mb-2">
                        {generatedIdea.name}
                      </h2>
                      <p className="text-lg text-muted-foreground italic">
                        "{generatedIdea.tagline}"
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Preview
                      </Button>
                      <Button variant="hero" size="sm" onClick={handleSave}>
                        <Save className="w-4 h-4 mr-1" />
                        Save
                      </Button>
                    </div>
                  </div>

                  {/* Problem & Solution */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4">
                      <h4 className="font-semibold mb-2 text-destructive">Problem</h4>
                      <p className="text-sm">{generatedIdea.problem}</p>
                    </div>
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
                      <h4 className="font-semibold mb-2 text-primary">Solution</h4>
                      <p className="text-sm">{generatedIdea.solution}</p>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-accent/10 rounded-xl">
                      <Users className="w-6 h-6 text-accent mx-auto mb-2" />
                      <p className="text-sm font-medium">Target Audience</p>
                      <p className="text-xs text-muted-foreground mt-1">{generatedIdea.targetAudience}</p>
                    </div>
                    <div className="text-center p-4 bg-primary/10 rounded-xl">
                      <DollarSign className="w-6 h-6 text-primary mx-auto mb-2" />
                      <p className="text-sm font-medium">Revenue Model</p>
                      <p className="text-xs text-muted-foreground mt-1">{generatedIdea.revenue}</p>
                    </div>
                    <div className="text-center p-4 bg-secondary/50 rounded-xl">
                      <TrendingUp className="w-6 h-6 text-secondary-foreground mx-auto mb-2" />
                      <p className="text-sm font-medium">Value Prop</p>
                      <p className="text-xs text-muted-foreground mt-1">{generatedIdea.valueProposition}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="font-semibold mb-3">Key Features</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {generatedIdea.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Rocket className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="text-center pt-4 border-t border-glass-border/30">
                    <p className="text-sm text-muted-foreground mb-2">Suggested Call-to-Action:</p>
                    <Button variant="hero" className="font-semibold">
                      {generatedIdea.cta}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Notice */}
          <div className="mt-12 text-center">
            <div className="glass-card max-w-2xl mx-auto">
              <h3 className="font-semibold mb-2">💡 Demo Mode</h3>
              <p className="text-sm text-muted-foreground">
                This is a demonstration. For real AI-powered idea generation and data persistence, 
                connect your project to Supabase and integrate with AI services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}