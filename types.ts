
export enum DifficultyLevel {
  Beginner = "початковий",
  Medium = "середній",
  High = "високий",
}

export interface Region {
  id: string;
  name: string;
  path: string;
}

export interface BloomingEvent {
  regionId: string;
  eventName: string;
  plantSpecies: string[];
  peakBloomDate: string;
  intensity: number; // A value from 1 to 10
  description: string;
  pollinatorInsight: string;
  monitoringAdvice?: string; // For Medium difficulty
  predictionModel?: string; // For High difficulty
}
