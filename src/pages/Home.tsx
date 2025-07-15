import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Lightbulb, 
  Rocket, 
  Sparkles, 
  Palette, 
  Users, 
  TrendingUp,
  Check,
  ArrowRight
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const { user } = useAuth();
  const features = [
    {
      icon: Lightbulb,
      title: "AI-Powered Ideas",
      description: "Get unique startup ideas tailored to your interests and market trends."
    },
    {
      icon: Palette,
      title: "Instant Design",
      description: "Beautiful landing pages generated automatically with modern design."
    },
    {
      icon: Rocket,
      title: "Quick Launch",
      description: "From idea to website in minutes, not months."
    },
    {
      icon: Users,
      title: "Market Ready",
      description: "Ideas validated against current market opportunities."
    },
    {
      icon: TrendingUp,
      title: "Growth Focused",
      description: "Built-in growth strategies and monetization suggestions."
    },
    {
      icon: Sparkles,
      title: "Creative Names",
      description: "Catchy, brandable names that capture your vision."
    }
  ];

  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for getting started",
      features: ["5 idea generations", "Basic templates", "Email support"],
      buttonText: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: "$19",
      description: "Best for serious entrepreneurs",
      features: ["Unlimited generations", "Premium templates", "Priority support", "Custom branding"],
      buttonText: "Start Free Trial",
      popular: true
    },
    {
      name: "Team",
      price: "$49",
      description: "Perfect for teams and agencies",
      features: ["Everything in Pro", "Team collaboration", "White-label options", "API access"],
      buttonText: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="py-24 bg-gradient-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-display font-bold mb-6">
              Everything you need to{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                launch faster
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform provides all the tools you need to transform 
              your ideas into reality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="glass-card hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4 shadow-glow">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-display font-bold mb-6">
              From idea to{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                launch in 3 steps
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our streamlined process makes it easy to go from concept to creation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Describe Your Vision",
                description: "Tell us about your interests, problems you want to solve, or markets you're passionate about."
              },
              {
                step: "2", 
                title: "Get AI Suggestions",
                description: "Our AI generates unique startup ideas, names, and complete business concepts tailored to you."
              },
              {
                step: "3",
                title: "Launch Your Site",
                description: "Preview and customize your generated landing page, then launch it to the world."
              }
            ].map((item, index) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6 shadow-glow">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
                {index < 2 && (
                  <ArrowRight className="w-6 h-6 text-primary mx-auto mt-6 hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-gradient-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-display font-bold mb-6">
              Simple,{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                transparent pricing
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that fits your needs. Upgrade or downgrade at any time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div 
                key={plan.name}
                className={`glass-card hover-lift relative ${
                  plan.popular ? 'ring-2 ring-primary shadow-glow' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  variant={plan.popular ? "hero" : "outline"} 
                  className="w-full"
                  asChild
                >
                  <Link to="/login">{plan.buttonText}</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card text-center max-w-3xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-display font-bold mb-6">
              Ready to build your{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                next big thing?
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of entrepreneurs who have already sparked their success 
              with our AI-powered platform.
            </p>
            <Button variant="hero" size="xl" asChild>
              <Link to={user ? "/dashboard" : "/login"}>
                {user ? "Go to Dashboard" : "Start Creating Today"}
                <Sparkles className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-glass-border/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Lightbulb className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-display font-bold bg-gradient-primary bg-clip-text text-transparent">
                Startup Spark
              </span>
            </div>
            <p className="text-muted-foreground mb-4">
              Spark your next big idea with AI-powered innovation.
            </p>
            <div className="flex justify-center space-x-6 text-sm text-muted-foreground">
              <Link to="/about" className="hover:text-foreground transition-colors">About</Link>
              <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link>
              <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}