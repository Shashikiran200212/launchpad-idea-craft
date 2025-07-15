import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, Rocket, Lightbulb, Star } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full animate-float" />
        <div className="absolute top-40 right-20 w-16 h-16 bg-primary-glow/30 rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-20 w-12 h-12 bg-accent/40 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-primary/10 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-6 py-2 mb-8 animate-scale-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Innovation</span>
            <Star className="w-4 h-4 text-primary animate-glow" />
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold mb-6 animate-fade-in">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Spark Your Next
            </span>
            <br />
            <span className="text-foreground">Big Idea</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            AI-generated startup ideas, names, and websites in seconds. 
            Transform your passion into your next venture.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="glass-card flex items-center space-x-2 px-4 py-2">
              <Lightbulb className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Smart Ideas</span>
            </div>
            <div className="glass-card flex items-center space-x-2 px-4 py-2">
              <Rocket className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Instant Results</span>
            </div>
            <div className="glass-card flex items-center space-x-2 px-4 py-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Beautiful Design</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Button variant="hero" size="xl" asChild>
              <Link to="/dashboard" className="group">
                Start Creating
                <Sparkles className="w-5 h-5 ml-2 group-hover:animate-pulse" />
              </Link>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <Link to="/about">
                Learn More
              </Link>
            </Button>
          </div>

          {/* Social Proof */}
          <div className="mt-16 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <p className="text-sm text-muted-foreground mb-4">Trusted by innovative entrepreneurs</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-2xl font-bold">Ideas</div>
              <div className="text-2xl font-bold">500+</div>
              <div className="text-2xl font-bold">Startups</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}