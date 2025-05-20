import React from "react";
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

const History = () => {
  const navigate = useNavigate();
  const { scenarios, results } = useScenario();

  // Sort scenarios by creation date (newest first)
  const sortedScenarios = [...scenarios].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );

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
            You haven't created any AI mortality experiment scenarios yet.
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
        <h1 className="text-3xl font-bold">Experiment History</h1>
        <Button onClick={() => navigate("/create-scenario")}>
          Create New Scenario
        </Button>
      </div>

      <div className="space-y-6">
        {sortedScenarios.map((scenario) => {
          // Count humans and animals for display
          const insideCount = scenario.humans.filter(
            (h) => h.relationship === "inside",
          ).length;
          const outsideCount = scenario.humans.filter(
            (h) => h.relationship === "outside",
          ).length;
          const animalCount = scenario.animals.length;

          // Find corresponding result
          const result = results.find((r) => r.scenarioId === scenario.id);

          return (
            <Card key={scenario.id} className="scenario-card">
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle className="text-xl">
                      {`Scenario: ${insideCount} Inside, ${outsideCount} Outside${animalCount > 0 ? `, ${animalCount} Animal${animalCount > 1 ? "s" : ""}` : ""}`}
                    </CardTitle>
                    <CardDescription className="flex items-center mt-1">
                      <Clock size={14} className="mr-1" />
                      {format(new Date(scenario.timestamp), "MMM dd, yyyy")}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 p-1.5 rounded-full">
                      <Car size={14} className="text-blue-600" />
                    </div>
                    <span className="text-sm">{insideCount} inside</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-red-100 p-1.5 rounded-full">
                      <User size={14} className="text-red-600" />
                    </div>
                    <span className="text-sm">{outsideCount} outside</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="bg-green-100 p-1.5 rounded-full">
                      <Dog size={14} className="text-green-600" />
                    </div>
                    <span className="text-sm">{animalCount} animals</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div>
                  <h4 className="font-medium text-sm mb-2">AI Decisions</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {result?.responses.map((response) => {
                      const modelId = response.modelId;
                      return (
                        <div
                          key={modelId}
                          className="text-xs bg-gray-50 rounded p-2"
                        >
                          <span className="font-medium">
                            {modelId === "gpt"
                              ? "GPT-4"
                              : modelId === "claude"
                                ? "Claude"
                                : modelId === "gemini"
                                  ? "Gemini"
                                  : "DeepSeek"}
                            :
                          </span>{" "}
                          {response.decision.length > 40
                            ? response.decision.substring(0, 40) + "..."
                            : response.decision}
                        </div>
                      );
                    })}
                  </div>
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
