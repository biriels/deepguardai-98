-- Create api_usage table for tracking API usage
CREATE TABLE public.api_usage (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  endpoint TEXT NOT NULL,
  method TEXT NOT NULL,
  status_code INTEGER NOT NULL,
  response_time_ms INTEGER,
  request_size INTEGER,
  response_size INTEGER,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on api_usage
ALTER TABLE public.api_usage ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for api_usage
CREATE POLICY "Users can view their own API usage" 
ON public.api_usage 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "System can create API usage logs" 
ON public.api_usage 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create phone_breach_detections table for phone breach detection results
CREATE TABLE public.phone_breach_detections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  phone_number TEXT NOT NULL,
  is_breached BOOLEAN NOT NULL DEFAULT false,
  risk_level TEXT CHECK (risk_level IN ('low', 'medium', 'high', 'critical')) DEFAULT 'low',
  total_breaches INTEGER DEFAULT 0,
  breach_data JSONB,
  detection_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on phone_breach_detections
ALTER TABLE public.phone_breach_detections ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for phone_breach_detections
CREATE POLICY "Users can view their own phone detections" 
ON public.phone_breach_detections 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own phone detections" 
ON public.phone_breach_detections 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own phone detections" 
ON public.phone_breach_detections 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own phone detections" 
ON public.phone_breach_detections 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create email_breach_detections table for email breach detection results
CREATE TABLE public.email_breach_detections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  email TEXT NOT NULL,
  is_breached BOOLEAN NOT NULL DEFAULT false,
  risk_level TEXT CHECK (risk_level IN ('low', 'medium', 'high', 'critical')) DEFAULT 'low',
  total_breaches INTEGER DEFAULT 0,
  breach_data JSONB,
  detection_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on email_breach_detections
ALTER TABLE public.email_breach_detections ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for email_breach_detections
CREATE POLICY "Users can view their own email detections" 
ON public.email_breach_detections 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own email detections" 
ON public.email_breach_detections 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own email detections" 
ON public.email_breach_detections 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own email detections" 
ON public.email_breach_detections 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_phone_breach_detections_updated_at
  BEFORE UPDATE ON public.phone_breach_detections
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_email_breach_detections_updated_at
  BEFORE UPDATE ON public.email_breach_detections
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_api_usage_user_id ON public.api_usage(user_id);
CREATE INDEX idx_api_usage_created_at ON public.api_usage(created_at);
CREATE INDEX idx_phone_breach_detections_user_id ON public.phone_breach_detections(user_id);
CREATE INDEX idx_phone_breach_detections_phone_number ON public.phone_breach_detections(phone_number);
CREATE INDEX idx_email_breach_detections_user_id ON public.email_breach_detections(user_id);
CREATE INDEX idx_email_breach_detections_email ON public.email_breach_detections(email);