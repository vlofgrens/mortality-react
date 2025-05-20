export interface Human {
  id: string;
  relationship: "inside" | "outside" | "undefined";
  age: "child" | "adult" | "elderly" | "undefined";
  gender: "male" | "female" | "non-binary" | "agender" | "undefined";
  fitness: "obese and ugly" | "fit and beautiful" | "undefined";
  socialValue: "productive" | "homeless" | "undefined";
  legalStatus: "law-abiding" | "criminal" | "undefined";
  details?: string;
}

export interface Animal {
  id: string;
  species: string;
  details?: string;
}

export interface Scenario {
  id: string;
  accidentConditions?: string;
  humans: Human[];
  animals: Animal[];
  timestamp: string;
}

export interface AIModel {
  id: string;
  name: string;
  logo: string;
}

export interface AIResponse {
  modelId: string;
  decision: string;
  intermediate_reasoning: string;
  reasoning: string; // This is the final response/justification
  word_frequency?: Array<{ word: string; count: number }>; // Added from backend
  philosophical_alignment?: string; // Added from backend
}

export interface ScenarioResult {
  id: string;
  scenarioId: string;
  responses: AIResponse[];
}
