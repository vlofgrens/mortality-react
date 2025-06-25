import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Scenario, ScenarioResult } from "../types";
import { apiService } from "../services/api";

interface ScenarioContextType {
  scenarios: Scenario[];
  results: ScenarioResult[];
  loading: boolean;
  error: string | null;
  addScenario: (scenario: Scenario) => Promise<void>;
  addResult: (result: ScenarioResult) => Promise<void>;
  getScenarioById: (id: string) => Scenario | undefined;
  getResultById: (id: string) => ScenarioResult | undefined;
  refreshData: () => Promise<void>;
}

const ScenarioContext = createContext<ScenarioContextType | undefined>(
  undefined,
);

export const useScenario = () => {
  const context = useContext(ScenarioContext);
  if (!context) {
    throw new Error("useScenario must be used within a ScenarioProvider");
  }
  return context;
};

export const ScenarioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [results, setResults] = useState<ScenarioResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [scenariosData, resultsData] = await Promise.all([
        apiService.getScenarios(),
        apiService.getScenarioResults()
      ]);
      
      setScenarios(scenariosData);
      setResults(resultsData);
      
      // Update localStorage with fresh data
      localStorage.setItem("trolley-scenarios", JSON.stringify(scenariosData));
      localStorage.setItem("trolley-results", JSON.stringify(resultsData));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load data';
      setError(errorMessage);
      console.error('Failed to refresh data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load data from localStorage as fallback (for migration)
  useEffect(() => {
    const loadInitialData = () => {
      const savedScenarios = localStorage.getItem("trolley-scenarios");
      const savedResults = localStorage.getItem("trolley-results");
      
      if (savedScenarios) {
        setScenarios(JSON.parse(savedScenarios));
      }
      if (savedResults) {
        setResults(JSON.parse(savedResults));
      }
    };
    
    loadInitialData();
    refreshData(); // Also load from API
  }, [refreshData]);

  const addScenario = async (scenario: Scenario) => {
    try {
      setError(null);
      await apiService.saveScenario(scenario);
      setScenarios((prev) => [...prev, scenario]);
      // Also update localStorage
      const updatedScenarios = [...scenarios, scenario];
      localStorage.setItem("trolley-scenarios", JSON.stringify(updatedScenarios));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save scenario';
      setError(errorMessage);
      // Fall back to localStorage only
      setScenarios((prev) => [...prev, scenario]);
      localStorage.setItem("trolley-scenarios", JSON.stringify([...scenarios, scenario]));
      throw err;
    }
  };

  const addResult = async (result: ScenarioResult) => {
    console.log("🔥 DEBUG: addResult called with:", result);
    try {
      setError(null);
      console.log("🔥 DEBUG: About to call apiService.saveScenarioResult");
      await apiService.saveScenarioResult(result);
      console.log("✅ DEBUG: API call successful, updating local state");
      setResults((prev) => [...prev, result]);
      // Also update localStorage
      const updatedResults = [...results, result];
      localStorage.setItem("trolley-results", JSON.stringify(updatedResults));
      console.log("✅ DEBUG: Result saved successfully to both API and localStorage");
    } catch (err) {
      console.error("❌ DEBUG: Error in addResult:", err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to save result';
      setError(errorMessage);
      // Fall back to localStorage only
      setResults((prev) => [...prev, result]);
      localStorage.setItem("trolley-results", JSON.stringify([...results, result]));
      console.log("⚠️ DEBUG: Falling back to localStorage only");
      throw err;
    }
  };

  const getScenarioById = (id: string) => {
    return scenarios.find((scenario) => scenario.id === id);
  };

  const getResultById = (id: string) => {
    return results.find((result) => result.scenarioId === id);
  };

  return (
    <ScenarioContext.Provider
      value={{
        scenarios,
        results,
        loading,
        error,
        addScenario,
        addResult,
        getScenarioById,
        getResultById,
        refreshData,
      }}
    >
      {children}
    </ScenarioContext.Provider>
  );
};
