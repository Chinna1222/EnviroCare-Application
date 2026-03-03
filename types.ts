
export type AppView = 
  | 'welcome' 
  | 'signup' 
  | 'login' 
  | 'onboarding' 
  | 'dashboard' 
  | 'analytics' 
  | 'alerts' 
  | 'settings' 
  | 'help';

export interface UserProfile {
  name: string;
  ageGroup: string;
  healthConditions: string[];
  exposureDuration: string;
  locationAccess: boolean;
}

export interface EnvData {
  aqi: number;
  pm25: number;
  pm10: number;
  noiseDb: number;
  uvIndex: number;
  timestamp: string;
}

export interface RiskForecastPoint {
  time: string;
  risk: number;
}

export interface Alert {
  id: string;
  type: 'air' | 'noise' | 'general';
  priority: 'low' | 'medium' | 'high';
  message: string;
  timestamp: string;
}
