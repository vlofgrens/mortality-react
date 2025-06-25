import { Scenario, ScenarioResult } from '../types';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api'  // In production, Flask serves the React app
  : 'http://localhost:5000/api';  // In development, separate servers

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Scenario methods
  async getScenarios(): Promise<Scenario[]> {
    return this.request<Scenario[]>('/scenarios');
  }

  async saveScenario(scenario: Scenario): Promise<void> {
    await this.request('/scenarios', {
      method: 'POST',
      body: JSON.stringify(scenario),
    });
  }

  async getScenario(id: string): Promise<Scenario> {
    return this.request<Scenario>(`/scenarios/${id}`);
  }

  // Results methods
  async getScenarioResults(): Promise<ScenarioResult[]> {
    return this.request<ScenarioResult[]>('/scenario-results');
  }

  async saveScenarioResult(result: ScenarioResult): Promise<void> {
    await this.request('/scenario-results', {
      method: 'POST',
      body: JSON.stringify(result),
    });
  }

  async getScenarioResult(scenarioId: string): Promise<ScenarioResult> {
    return this.request<ScenarioResult>(`/scenario-results/${scenarioId}`);
  }
}

export const apiService = new ApiService(); 