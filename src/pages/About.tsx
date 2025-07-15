import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Lightbulb, 
  Users, 
  Target, 
  Heart,
  Rocket,
  Star,
  Zap,
  Globe,
  Mail,
  MessageCircle
} from "lucide-react";

export default function About() {
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-founder",
      bio: "Former product lead at tech unicorn, passionate about democratizing entrepreneurship.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face"
    },
    {
      name: "Marcus Rodriguez", 
      role: "CTO & Co-founder",
      bio: "AI researcher and full-stack developer with 10+ years in machine learning.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
    },
    {
      name: "Emily Johnson",
      role: "Head of Design",
      bio: "Award-winning designer focused on creating beautiful, accessible user experiences.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face"
    }
  ];

  const values = [
    {
      icon: Lightbulb,
      title: "Innovation First",
      description: "We believe every great company starts with a brilliant idea. Our mission is to help you find yours."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Success is better when shared. We're building a community of entrepreneurs supporting each other."
    },
    {
      icon: Heart,
      title: "Passion Powered",
      description: "We're passionate about turning dreams into reality and helping entrepreneurs succeed."
    },
    {
      icon: Globe,
      title: "Globally Accessible",
      description: "Great ideas can come from anywhere. We're making entrepreneurship accessible worldwide."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Ideas Generated" },
    { number: "500+", label: "Startups Launched" },
    { number: "50+", label: "Countries" },
    { number: "95%", label: "User Satisfaction" }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-12">
        {/* Hero Section */}
        <section className="py-16 text-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl sm:text-6xl font-display font-bold mb-6">
              About{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Startup Spark
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're on a mission to democratize entrepreneurship by making it easier than ever 
              to discover, develop, and launch your next big idea.
            </p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-secondary/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label} 
                  className="text-center animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-display font-bold mb-6">Our Story</h2>
                <p className="text-xl text-muted-foreground">
                  Born from the belief that everyone has the potential to create something amazing
                </p>
              </div>

              <div className="glass-card prose prose-lg max-w-none">
                <p className="text-lg leading-relaxed mb-6">
                  Startup Spark began when our founders realized that while great ideas exist everywhere, 
                  the tools and resources to develop them were scattered, complex, and often inaccessible 
                  to everyday entrepreneurs.
                </p>
                
                <p className="text-lg leading-relaxed mb-6">
                  After witnessing countless brilliant minds struggle to transform their vision into reality, 
                  we set out to create a platform that could bridge this gap. We wanted to build something 
                  that could take the spark of an idea and fan it into a flame.
                </p>

                <p className="text-lg leading-relaxed">
                  Today, Startup Spark combines cutting-edge AI technology with human creativity to help 
                  entrepreneurs at every stage of their journey. From the initial "what if" moment to 
                  launching a fully-realized business, we're here to support your entrepreneurial dreams.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-gradient-secondary/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-display font-bold mb-6">Our Values</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div 
                  key={value.title}
                  className="glass-card hover-lift animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-display font-bold mb-6">Meet Our Team</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The passionate individuals working to make entrepreneurship accessible to everyone
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div 
                  key={member.name}
                  className="glass-card text-center hover-lift animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-primary/20">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-gradient-hero">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-card text-center max-w-4xl mx-auto">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-4xl font-display font-bold mb-6">Our Mission</h2>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                To empower every person with an entrepreneurial spirit to turn their ideas into 
                reality, regardless of their background, resources, or technical expertise.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button variant="hero" size="lg" asChild>
                  <Link to="/dashboard">
                    Start Your Journey
                    <Zap className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button variant="glass" size="lg" asChild>
                  <Link to="/contact">
                    Get in Touch
                    <MessageCircle className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-display font-bold mb-6">Get in Touch</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Have questions, feedback, or just want to say hello? We'd love to hear from you.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <div className="glass-card text-center hover-lift">
                  <Mail className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Email Us</h3>
                  <p className="text-sm text-muted-foreground">hello@startuppark.com</p>
                </div>
                
                <div className="glass-card text-center hover-lift">
                  <MessageCircle className="w-8 h-8 text-primary mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">Live Chat</h3>
                  <p className="text-sm text-muted-foreground">Available 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}