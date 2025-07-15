-- Create startup_ideas table for saving generated ideas
CREATE TABLE public.startup_ideas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  problem TEXT NOT NULL,
  solution TEXT NOT NULL,
  tagline TEXT NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  target_audience TEXT,
  business_model TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.startup_ideas ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own ideas" 
ON public.startup_ideas 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own ideas" 
ON public.startup_ideas 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own ideas" 
ON public.startup_ideas 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own ideas" 
ON public.startup_ideas 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_startup_ideas_updated_at
BEFORE UPDATE ON public.startup_ideas
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();