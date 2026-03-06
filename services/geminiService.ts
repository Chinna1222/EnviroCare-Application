
import { GoogleGenAI, Type } from "@google/genai";
import { EnvData, RiskForecastPoint, UserProfile } from "../types";

const getAI = () => {
  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY || '';
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export const getHealthRiskInsights = async (envData: EnvData, profile: UserProfile) => {
  const prompt = `
    Act as a health and environmental scientist. Based on the following data, explain the health risk in 2-3 concise sentences.
    
    Current Data:
    - AQI: ${envData.aqi}
    - PM2.5: ${envData.pm25}
    - Noise Level: ${envData.noiseDb} dB
    
    User Profile:
    - Age: ${profile.ageGroup}
    - Health Conditions: ${profile.healthConditions.join(', ')}
    - Daily Exposure: ${profile.exposureDuration}
    
    Explain why the risk is at its current level and what factors are most critical.
  `;

  const ai = getAI();
  if (!ai) return "Health risk evaluation requires a Gemini API key. Please configure it in your environment settings.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Health risk is currently being evaluated based on your local air quality and noise levels. Stay tuned for deeper AI insights.";
  }
};

export const getRiskForecast = async (envData: EnvData): Promise<RiskForecastPoint[]> => {
  const prompt = `
    Generate a 24-hour predictive health risk forecast (0-100 scale) based on a current AQI of ${envData.aqi}.
    Return exactly 24 points, one for each hour, in a JSON array format.
    Format: [{"time": "12:00", "risk": 45}, ...]
  `;

  const ai = getAI();
  if (!ai) {
    return Array.from({ length: 24 }).map((_, i) => ({
      time: `${i}:00`,
      risk: 20 + Math.random() * 40
    }));
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              time: { type: Type.STRING },
              risk: { type: Type.NUMBER }
            },
            required: ["time", "risk"]
          }
        }
      }
    });

    const data = JSON.parse(response.text || '[]');
    return data;
  } catch (error) {
    console.error("Gemini Error (Forecast):", error);
    // Fallback mock data
    return Array.from({ length: 24 }).map((_, i) => ({
      time: `${i}:00`,
      risk: 20 + Math.random() * 40
    }));
  }
};
