import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini client
const getClient = () => {
    // Basic offline check before initializing
    if (typeof navigator !== 'undefined' && !navigator.onLine) return null;

    const apiKey = process.env.API_KEY;
    if (!apiKey) return null;
    return new GoogleGenAI({ apiKey });
};

export const getDailyThaiTip = async (location: string, activity: string): Promise<string> => {
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return "You are currently offline. Enjoy your trip!";
  }

  const ai = getClient();
  if (!ai) return "Bangkok is known as the City of Angels.";

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Give me a very short (max 20 words), fun cultural fact or tip about ${location} related to ${activity}. Keep it light and friendly.`,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Remember to dress modestly when visiting temples!";
  }
};