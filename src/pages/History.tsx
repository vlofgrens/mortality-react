import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useScenario } from "@/context/ScenarioContext";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Car, User, Dog, Clock, ArrowRight } from "lucide-react";
import { Human } from "@/types"; // Import Human type

const History = () => {
  const navigate = useNavigate();
  const { scenarios, results } = useScenario();

  useEffect(() => {
    console.log("History Page Data - Scenarios:", scenarios);
    console.log("History Page Data - Results:", results);
  }, [scenarios, results]);

  // Helper function to get a descriptive string for human characteristics
  const getHumanCharacteristicsTooltip = (humans: Human[]): string => {
    if (!humans || humans.length === 0) {
      return "No human details available.";
    }
    return humans
      .map((human, index) => {
        const parts: string[] = [];
        if (human.age && human.age !== "undefined") parts.push(human.age);
        if (human.gender && human.gender !== "undefined") parts.push(human.gender);
        if (human.fitness && human.fitness !== "undefined") parts.push(human.fitness);
        if (human.socialValue && human.socialValue !== "undefined") {
          parts.push(
            human.socialValue === "productive"
              ? "productive"
              : human.socialValue,
          );
        }
        if (human.legalStatus && human.legalStatus !== "undefined") {
          parts.push(
            human.legalStatus === "law-abiding"
              ? "law-abiding"
              : human.legalStatus,
          );
        }
        if (human.details) parts.push(`details: ${human.details}`);
        
        const characteristics = parts.length > 0 ? parts.join(", ") : "no specific characteristics";
        return `Human ${index + 1}: ${characteristics}`;
      })
      .join("; ");
  };

  // Sort scenarios by creation date (newest first)
  const sortedScenarios = [...scenarios].sort((a, b) => {
    const dateA = new Date(a.timestamp);
    const dateB = new Date(b.timestamp);
    
    // Handle invalid dates by putting them at the end
    if (isNaN(dateA.getTime()) && isNaN(dateB.getTime())) return 0;
    if (isNaN(dateA.getTime())) return 1;
    if (isNaN(dateB.getTime())) return -1;
    
    // Sort newest first (descending order)
    return dateB.getTime() - dateA.getTime();
  });

  // Display message if no scenarios
  if (sortedScenarios.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center">
        <h1 className="text-3xl font-bold mb-6">Experiment History</h1>
        <div className="bg-gray-50 rounded-lg p-12 border border-gray-200">
          <h2 className="text-xl font-medium text-gray-700 mb-4">
            No scenarios yet
          </h2>
          <p className="text-gray-600 mb-8">
            You haven\'t created any AI mortality experiment scenarios yet.
          </p>
          <Button onClick={() => navigate("/create-scenario")}>
            Create Your First Scenario
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Experiment History</h1>
          <p className="text-sm text-gray-600 mt-1">
            {sortedScenarios.length} scenario{sortedScenarios.length !== 1 ? 's' : ''} • Newest first
          </p>
        </div>
        <Button onClick={() => navigate("/create-scenario")}>
          Create New Scenario
        </Button>
      </div>

      <div className="space-y-6">
        {sortedScenarios.map((scenario, index) => {
          const humanCount = scenario.humans.length;
          const animalCount = scenario.animals.length;
          const humanTooltip = getHumanCharacteristicsTooltip(scenario.humans);
          
          // Check if this is a recent scenario (created within last 24 hours)
          const scenarioDate = new Date(scenario.timestamp);
          const now = new Date();
          const hoursDiff = (now.getTime() - scenarioDate.getTime()) / (1000 * 60 * 60);
          const isRecent = hoursDiff < 24;

          // Get unique animal species
          const animalSpecies = Array.from(
            new Set(scenario.animals.map((a) => a.species)),
          )
            .map((s) => s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, " ")) // Capitalize and replace underscores
            .join(", ");
          
          const animalDisplayString =
            animalCount > 0
              ? `, ${animalCount} Animal${animalCount > 1 ? "s" : ""}${animalSpecies ? ` (${animalSpecies})` : ""}`
              : "";

          // Find corresponding result
          const result = results.find((r) => r.scenarioId === scenario.id);

          return (
            <Card key={scenario.id} className="scenario-card">
              <CardHeader>
                <div className="flex justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-xl">
                        {`Scenario: ${humanCount} Human${humanCount !== 1 ? "s" : ""}${animalDisplayString}`}
                      </CardTitle>
                      {isRecent && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                          Recent
                        </span>
                      )}
                    </div>
                    <CardDescription className="flex items-center mt-1">
                      <Clock size={14} className="mr-1" />
                      {format(new Date(scenario.timestamp), "MMM dd, yyyy 'at' h:mm a")}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2" title={humanTooltip}>
                    <div className="bg-blue-100 p-1.5 rounded-full">
                      <User size={14} className="text-blue-600" />
                    </div>
                    <span className="text-sm">
                      {humanCount} Human{humanCount !== 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-green-100 p-1.5 rounded-full">
                      <Dog size={14} className="text-green-600" />
                    </div>
                    <span className="text-sm">
                      {animalCount > 0
                        ? `${animalCount} Animal${animalCount > 1 ? "s" : ""}${animalSpecies ? ` (${animalSpecies})` : ""}`
                        : "0 Animals"}
                    </span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div>
                  <h4 className="font-medium text-sm mb-2">AI Decisions</h4>
                  {!result ? (
                    <p className="text-xs text-gray-500 italic">
                      Results pending or not available for this scenario.
                    </p>
                  ) : result.responses && result.responses.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                      {result.responses.map((response) => {
                        const modelId = response.modelId;
                        
                        const rawDecision = response.decision || "Unknown";
                        const decisionText =
                          rawDecision.length > 40
                            ? rawDecision.substring(0, 40) + "..."
                            : rawDecision;

                        let bgClass = "bg-slate-200";
                        let textClass = "text-slate-800";

                        if (rawDecision === "Save Self") {
                          bgClass = "bg-red-200";
                          textClass = "text-red-800";
                        } else if (rawDecision === "Save Others") {
                          bgClass = "bg-green-200";
                          textClass = "text-green-800";
                        }

                        const modelDisplayName =
                          modelId === "gpt"
                            ? "GPT-4"
                            : modelId === "claude"
                            ? "Claude"
                            : modelId === "gemini"
                            ? "Gemini"
                            : modelId === "deepseek"
                            ? "DeepSeek"
                            : modelId;

                        return (
                          <div
                            key={modelId}
                            className={`text-xs rounded p-2 ${bgClass}`}
                          >
                            <span className={`font-medium ${textClass}`}>
                              {modelDisplayName}:
                            </span>{" "}
                            <span className={textClass}>{decisionText}</span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500 italic">
                      No AI decisions were recorded for this scenario.
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => navigate(`/results/${scenario.id}`)}
                  className="w-full"
                  variant="outline"
                >
                  View Details
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default History;
