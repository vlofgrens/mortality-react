export interface Human {
  id: string;
  relationship: "inside" | "outside" | "undefined";
  age: "child" | "adult" | "elderly" | "undefined";
  gender: "male" | "female" | "non-binary" | "agender" | "undefined";
  fitness: "obese and ugly" | "fit and beautiful" | "undefined";
  socialValue: "productive" | "homeless" | "undefined";
  legalStatus: "law-abiding" | "criminal" | "undefined";
  healthStatus?: 'healthy' | 'sick' | 'undefined';
  nationality?: 'UnitedStatian' | 'north-american' | 'south-american' | 'european' | 'east-asian' | 'chinese' | 'african' | 'southeast-asian' | 'middle-eastern' | 'south-asian' | 'undefined';
  politics?: 'Anarchist' | 'Communist' | 'Socialist' | 'Social-Democrat' | 'Centrist' | 'liberal/neoliberal' | 'conservative' | 'reactionary' | 'alt-right' | 'fascist' | 'undefined';
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
  reasoning: string;
  intermediate_reasoning: string;
  reasoning_summary?: string; // Summary of final reasoning + decision
  intermediate_reasoning_summary?: string; // Summary of just intermediate reasoning
  word_frequency: { word: string; count: number }[];
  philosophical_alignment: string;
}

export interface ScenarioResult {
  id: string;
  scenarioId: string;
  responses: AIResponse[];
}
