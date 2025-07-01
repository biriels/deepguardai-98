
-- Create table for phone number breaches
CREATE TABLE public.phone_breaches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  phone_number TEXT NOT NULL,
  breach_name TEXT NOT NULL,
  breach_date DATE NOT NULL,
  description TEXT,
  data_exposed TEXT[],
  severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')) DEFAULT 'medium',
  source TEXT,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for phone number breach detection results
CREATE TABLE public.phone_breach_detections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  phone_number TEXT NOT NULL,
  is_breached BOOLEAN NOT NULL DEFAULT false,
  total_breaches INTEGER DEFAULT 0,
  risk_level TEXT CHECK (risk_level IN ('low', 'medium', 'high', 'critical')) DEFAULT 'low',
  detection_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  breach_details JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on phone breach detection results
ALTER TABLE public.phone_breach_detections ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for phone breach detections
CREATE POLICY "Users can view their own phone breach detections" 
  ON public.phone_breach_detections 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own phone breach detections" 
  ON public.phone_breach_detections 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_phone_breaches_phone_number ON public.phone_breaches(phone_number);
CREATE INDEX idx_phone_breach_detections_user_id ON public.phone_breach_detections(user_id);
CREATE INDEX idx_phone_breach_detections_phone_number ON public.phone_breach_detections(phone_number);

-- Insert some sample phone breach data for testing
INSERT INTO public.phone_breaches (phone_number, breach_name, breach_date, description, data_exposed, severity, source, is_verified) VALUES
('+1234567890', 'TelecomBreach2023', '2023-08-15', 'Major telecom provider data breach exposing customer phone numbers and personal information', ARRAY['Phone numbers', 'Names', 'Addresses', 'Account details'], 'high', 'TelecomCorp', true),
('+1987654321', 'SocialMediaLeak', '2023-11-22', 'Social media platform leaked user phone numbers used for 2FA verification', ARRAY['Phone numbers', 'User IDs', '2FA codes'], 'critical', 'SocialApp', true),
('+1555123456', 'RetailerBreach', '2023-05-10', 'E-commerce retailer exposed customer phone numbers in database misconfiguration', ARRAY['Phone numbers', 'Purchase history', 'Email addresses'], 'medium', 'OnlineStore', true);
