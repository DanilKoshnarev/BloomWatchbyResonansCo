
import { GoogleGenAI, Type } from "@google/genai";
import { BloomingEvent, DifficultyLevel } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const generatePrompt = (difficulty: DifficultyLevel, date: { year: number; month: number }): string => {
  const monthName = new Date(date.year, date.month - 1).toLocaleString('uk-UA', { month: 'long' });
  const basePrompt = `
    Act as a NASA Earth observation data simulator for "BloomWatch", an application for global flowering phenology.
    Your task is to generate plausible plant blooming events for major world continents for ${monthName} ${date.year}.
    The data should be realistic, reflecting seasonal changes and typical flora for each continent.
    The continents to generate data for are: North America, South America, Africa, Europe, Asia, and Oceania.
    The response must be a JSON array where each object represents a blooming event for one of the continents.
    The regionId must be one of: 'north_america', 'south_america', 'africa', 'europe', 'asia', 'oceania'.
  `;

  switch (difficulty) {
    case DifficultyLevel.Beginner:
      return `${basePrompt}
        The complexity level is for beginners/youth. Focus on large-scale, famous, and easily recognizable blooming events (e.g., cherry blossoms, jacaranda season, major crop blooms).
        The description should be simple and engaging. The 'pollinatorInsight' should be a fun fact.
      `;
    case DifficultyLevel.Medium:
      return `${basePrompt}
        The complexity level is medium. Provide more detailed information, including specific plant species and potential impacts on local ecosystems or agriculture.
        Include practical 'monitoringAdvice' for farmers or ecologists.
      `;
    case DifficultyLevel.High:
      return `${basePrompt}
        The complexity level is high. The data should be highly specific, referencing scientific names of plants and complex ecological interactions.
        Include a 'predictionModel' insight, which is a short text describing a plausible scientific or data-driven model for forecasting this bloom (e.g., 'Based on soil moisture satellite data and GFS temperature forecasts...').
        Mention potential anomalies or climate change impacts in the description.
      `;
    default:
      return basePrompt;
  }
};


const getSchema = (difficulty: DifficultyLevel) => {
  const baseProperties = {
    regionId: { type: Type.STRING, description: "The unique identifier for the continent/region." },
    eventName: { type: Type.STRING, description: "A catchy name for the blooming event." },
    plantSpecies: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of primary plant species involved." },
    peakBloomDate: { type: Type.STRING, description: "The estimated peak bloom date within the month (e.g., 'Mid-March')." },
    intensity: { type: Type.NUMBER, description: "Bloom intensity on a scale of 1 to 10." },
    description: { type: Type.STRING, description: "A detailed description of the event." },
    pollinatorInsight: { type: Type.STRING, description: "An insight from a pollinator's perspective." }
  };

  if (difficulty === DifficultyLevel.Medium) {
    return {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          ...baseProperties,
          monitoringAdvice: { type: Type.STRING, description: "Advice for monitoring this bloom event." }
        },
        required: [...Object.keys(baseProperties), 'monitoringAdvice']
      }
    };
  }

  if (difficulty === DifficultyLevel.High) {
    return {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          ...baseProperties,
          predictionModel: { type: Type.STRING, description: "Description of a predictive model for this bloom." }
        },
        required: [...Object.keys(baseProperties), 'predictionModel']
      }
    };
  }
  
  // Beginner Schema
  return {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: baseProperties,
      required: Object.keys(baseProperties)
    }
  };
};

export const fetchBloomingData = async (
  difficulty: DifficultyLevel,
  date: { year: number; month: number }
): Promise<BloomingEvent[]> => {
  const prompt = generatePrompt(difficulty, date);
  const schema = getSchema(difficulty);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
      },
    });

    const jsonText = response.text.trim();
    const data = JSON.parse(jsonText);
    return data as BloomingEvent[];

  } catch (error) {
    console.error("Error fetching data from Gemini API:", error);
    throw new Error("Failed to parse blooming data from the API.");
  }
};
