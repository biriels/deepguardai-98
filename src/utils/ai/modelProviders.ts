
/**
 * AI Model Providers Configuration
 * Supports multiple providers and specialized detection models
 */

export interface ModelProvider {
  id: string;
  name: string;
  description: string;
  apiEndpoint: string;
  supportedTypes: string[];
  models: DetectionModel[];
}

export interface DetectionModel {
  id: string;
  name: string;
  type: 'deepfake' | 'voice' | 'text' | 'image' | 'video' | 'multimodal';
  specialty: string;
  accuracy: number;
  speed: 'fast' | 'medium' | 'slow';
  description: string;
}

export const MODEL_PROVIDERS: ModelProvider[] = [
  {
    id: 'together-ai',
    name: 'Together AI',
    description: 'Advanced LLama models for content analysis',
    apiEndpoint: 'https://api.together.xyz/v1',
    supportedTypes: ['text', 'image', 'video', 'audio'],
    models: [
      {
        id: 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo',
        name: 'Llama 3.1 8B Turbo',
        type: 'text',
        specialty: 'Fast text analysis and content moderation',
        accuracy: 85,
        speed: 'fast',
        description: 'High-speed text analysis for AI-generated content detection'
      },
      {
        id: 'meta-llama/Llama-Vision-Free',
        name: 'Llama Vision',
        type: 'image',
        specialty: 'Visual deepfake detection and image analysis',
        accuracy: 90,
        speed: 'medium',
        description: 'Advanced vision model for detecting image manipulations'
      },
      {
        id: 'meta-llama/Meta-Llama-3.1-70B-Instruct-Turbo',
        name: 'Llama 3.1 70B Turbo',
        type: 'multimodal',
        specialty: 'Comprehensive content analysis',
        accuracy: 95,
        speed: 'slow',
        description: 'Most accurate model for complex deepfake detection'
      }
    ]
  },
  {
    id: 'huggingface',
    name: 'Hugging Face',
    description: 'Specialized deepfake detection models',
    apiEndpoint: 'https://api-inference.huggingface.co',
    supportedTypes: ['image', 'video', 'audio', 'text'],
    models: [
      {
        id: 'sensity/deepfake-detection',
        name: 'Sensity Deepfake Detector',
        type: 'deepfake',
        specialty: 'Facial deepfake detection',
        accuracy: 92,
        speed: 'medium',
        description: 'Specialized model trained on facial manipulation datasets'
      },
      {
        id: 'microsoft/wavlm-base-plus-sv',
        name: 'WavLM Voice Detection',
        type: 'voice',
        specialty: 'Audio deepfake and voice cloning detection',
        accuracy: 88,
        speed: 'fast',
        description: 'Detects synthetic speech and voice cloning'
      },
      {
        id: 'roberta-base-openai-detector',
        name: 'RoBERTa GPT Detector',
        type: 'text',
        specialty: 'AI-generated text detection',
        accuracy: 87,
        speed: 'fast',
        description: 'Detects GPT and other AI-generated text content'
      }
    ]
  },
  {
    id: 'replicate',
    name: 'Replicate',
    description: 'Community-driven AI models',
    apiEndpoint: 'https://api.replicate.com/v1',
    supportedTypes: ['image', 'video', 'audio'],
    models: [
      {
        id: 'andreasjansson/deepfake-detection',
        name: 'Advanced Deepfake Detector',
        type: 'video',
        specialty: 'Video temporal consistency analysis',
        accuracy: 91,
        speed: 'slow',
        description: 'Frame-by-frame analysis for video deepfakes'
      },
      {
        id: 'tencentarc/gfpgan',
        name: 'Face Restoration Detector',
        type: 'image',
        specialty: 'Face enhancement and manipulation detection',
        accuracy: 89,
        speed: 'medium',
        description: 'Detects face restoration and enhancement artifacts'
      }
    ]
  }
];

export const getModelsByType = (type: string): DetectionModel[] => {
  return MODEL_PROVIDERS.flatMap(provider => 
    provider.models.filter(model => model.type === type || model.type === 'multimodal')
  );
};

export const getProviderModels = (providerId: string): DetectionModel[] => {
  const provider = MODEL_PROVIDERS.find(p => p.id === providerId);
  return provider ? provider.models : [];
};

export const getBestModelForContent = (contentType: string): DetectionModel => {
  const models = getModelsByType(contentType);
  return models.sort((a, b) => b.accuracy - a.accuracy)[0] || models[0];
};
