
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const summarizePDF = async (fileName: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Please provide a professional, concise summary of a document named "${fileName}". 
      Since I am a UI mockup, imagine the content based on the name and provide 3 key bullet points and a concluding sentence.`,
      config: {
        systemInstruction: "You are a helpful document assistant. Keep summaries brief and professional.",
      },
    });

    return response.text || "Could not generate summary at this time.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The AI assistant is temporarily unavailable. Please try again later.";
  }
};

export const generateResumeSummary = async (title: string, experience: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Draft a professional resume summary for a "${title}" with the following experience highlights: "${experience}". 
      Keep it around 2-3 sentences. Focus on results and value proposition.`,
      config: {
        systemInstruction: "You are an expert resume writer and recruiter. Use strong action verbs.",
      },
    });
    return response.text?.trim() || "Dynamic professional summary generated based on your profile.";
  } catch (error) {
    return "Expert professional dedicated to delivering high-quality results and improving organizational efficiency through strategic planning and technical proficiency.";
  }
};

export const improveBulletPoint = async (bullet: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Rewrite this resume bullet point to be more impactful using the STAR method (Situation, Task, Action, Result) if possible: "${bullet}". Use a strong action verb to start.`,
    });
    return response.text?.trim() || bullet;
  } catch (error) {
    return bullet;
  }
};
