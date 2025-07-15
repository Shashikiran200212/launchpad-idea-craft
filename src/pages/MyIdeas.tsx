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
  Plus
} from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

interface SavedIdea {
  id: string;
  name: string;
  tagline: string;
  category: string;
  dateCreated: string;
  isFavorite: boolean;
  status: "draft" | "published" | "archived";
}

export default function MyIdeas() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  // Mock data - in real app this would come from Supabase
  const savedIdeas: SavedIdea[] = [
    {
      id: "1",
      name: "EcoTrack",
      tagline: "Making sustainability simple for everyone",
      category: "Environmental",
      dateCreated: "2024-01-15",
      isFavorite: true,
      status: "draft"
    },
    {
      id: "2", 
      name: "StudyBuddy",
      tagline: "AI-powered study companion for students",
      category: "Education",
      dateCreated: "2024-01-12",
      isFavorite: false,
      status: "published"
    },
    {
      id: "3",
      name: "FoodShare",
      tagline: "Reducing food waste through community sharing",
      category: "Social Impact",
      dateCreated: "2024-01-10",
      isFavorite: true,
      status: "draft"
    }
  ];

  const filteredIdeas = savedIdeas.filter(idea => {
    const matchesSearch = idea.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         idea.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "all" || idea.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published": return "bg-primary/10 text-primary";
      case "draft": return "bg-muted text-muted-foreground";
      case "archived": return "bg-destructive/10 text-destructive";
      default: return "bg-muted text-muted-foreground";
    }
  };

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
              <div className="text-2xl font-bold mb-1">{savedIdeas.length}</div>
              <div className="text-sm text-muted-foreground">Total Ideas</div>
            </div>
            <div className="glass-card text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold mb-1">
                {savedIdeas.filter(idea => idea.isFavorite).length}
              </div>
              <div className="text-sm text-muted-foreground">Favorites</div>
            </div>
            <div className="glass-card text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-accent-foreground" />
              </div>
              <div className="text-2xl font-bold mb-1">
                {savedIdeas.filter(idea => idea.status === "published").length}
              </div>
              <div className="text-sm text-muted-foreground">Published</div>
            </div>
            <div className="glass-card text-center">
              <div className="w-12 h-12 bg-secondary/50 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-secondary-foreground" />
              </div>
              <div className="text-2xl font-bold mb-1">3</div>
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
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-muted-foreground" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-input bg-background text-sm"
                >
                  <option value="all">All Ideas</option>
                  <option value="draft">Drafts</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </div>

          {/* Ideas Grid */}
          {filteredIdeas.length === 0 ? (
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
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
                        <Lightbulb className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(idea.status)}`}>
                          {idea.status.charAt(0).toUpperCase() + idea.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Star 
                        className={`w-4 h-4 ${idea.isFavorite ? 'text-yellow-500 fill-current' : 'text-muted-foreground'}`} 
                      />
                    </Button>
                  </div>

                  {/* Content */}
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">{idea.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3 italic">
                      "{idea.tagline}"
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{idea.category}</span>
                      <span>{new Date(idea.dateCreated).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
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
              <h3 className="font-semibold mb-2">💾 Data Persistence</h3>
              <p className="text-sm text-muted-foreground">
                Connect to Supabase to permanently save your ideas and access them across devices. 
                Currently showing demo data.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}