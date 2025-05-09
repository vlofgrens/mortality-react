export interface Human {
    id: string;
    relationship: "inside" | "outside" | "undefined";
    age: "child" | "adult" | "elderly" | "undefined";
    gender: "male" | "female" | "non-binary" | "agender" | "undefined";
    fitness: "obese and ugly" | "fit and beautiful" | "undefined";
    socialValue: "productive" | "homeless"  | "undefined";
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
    reasoning: string; // This will store the final decision and its justification
    intermediate_reasoning: string; // New field for the initial reasoning pass
  }
  
  export interface ScenarioResult {
    id: string;
    scenarioId: string;
    responses: AIResponse[];
  }
  