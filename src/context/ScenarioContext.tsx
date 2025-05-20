import React, { createContext, useContext, useState, useEffect } from "react";
import { Scenario, ScenarioResult } from "../types";

interface ScenarioContextType {
  scenarios: Scenario[];
  results: ScenarioResult[];
  addScenario: (scenario: Scenario) => void;
  addResult: (result: ScenarioResult) => void;
  getScenarioById: (id: string) => Scenario | undefined;
  getResultById: (id: string) => ScenarioResult | undefined;
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
  const [scenarios, setScenarios] = useState<Scenario[]>(() => {
    const saved = localStorage.getItem("trolley-scenarios");
    return saved ? JSON.parse(saved) : [];
  });

  const [results, setResults] = useState<ScenarioResult[]>(() => {
    const saved = localStorage.getItem("trolley-results");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("trolley-scenarios", JSON.stringify(scenarios));
  }, [scenarios]);

  useEffect(() => {
    localStorage.setItem("trolley-results", JSON.stringify(results));
  }, [results]);

  const addScenario = (scenario: Scenario) => {
    setScenarios((prev) => [...prev, scenario]);
  };

  const addResult = (result: ScenarioResult) => {
    setResults((prev) => [...prev, result]);
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
        addScenario,
        addResult,
        getScenarioById,
        getResultById,
      }}
    >
      {children}
    </ScenarioContext.Provider>
  );
};
