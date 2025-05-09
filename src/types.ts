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