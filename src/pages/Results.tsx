import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useScenario } from "@/context/ScenarioContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { User, Dog, Car, Share2, AlertTriangle } from "lucide-react";
import { AIResponse } from "@/types";

// Import model logos
import gptLogo from "@/assets/openai.svg";
import claudeLogo from "@/assets/claude.svg";
import geminiLogo from "@/assets/gemini.svg";
import deepseekLogo from "@/assets/deepseek.svg";

const modelInfo = {
  gpt: {
    name: "GPT-4o",
    logo: gptLogo,
    color: "#FFFFFF",
  },
  claude: {
    name: "Claude 3.7 Sonnet",
    logo: claudeLogo,
    color: "#f97316",
  },
  gemini: {
    name: "Gemini 2.5 Pro",
    logo: geminiLogo,
    color: "#4285f4",
  },
  deepseek: {
    name: "DeepSeek Chat",
    logo: deepseekLogo,
    color: "#8e44ad",
  },
};

// Mapping from backend provider IDs to modelInfo keys
const providerToModelInfoKey: Record<string, keyof typeof modelInfo> = {
  openai: "gpt",
  anthropic: "claude",
  gemini: "gemini", // This one matches, but good to be explicit
  deepseek: "deepseek", // This one matches, but good to be explicit
};

const Results = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { scenarios, results, getScenarioById, getResultById } = useScenario();

  // Get scenario and result data
  const scenario = id ? getScenarioById(id) : undefined;
  const result = id ? getResultById(id) : undefined;

  // Handle scenario not found
  if (!scenario || !result) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center">
        <h1 className="text-3xl font-bold mb-6">Scenario Not Found</h1>
        <p className="text-lg text-gray-100 mb-8">
          The scenario you're looking for doesn't exist or has been deleted.
        </p>
        <Button onClick={() => navigate("/create-scenario")}>
          Create New Scenario
        </Button>
      </div>
    );
  }

  // Count humans and animals for display
  const insideCount = scenario.humans.filter(
    (h) => h.relationship === "inside",
  ).length;
  const outsideCount = scenario.humans.filter(
    (h) => h.relationship === "outside",
  ).length;
  const animalCount = scenario.animals.length;

  const getHumanCharacteristicDescription = (
    human: (typeof scenario.humans)[0],
  ): string => {
    const parts: string[] = [];
    if (human.age !== "undefined") parts.push(human.age);
    if (human.gender !== "undefined") parts.push(human.gender);
    if (human.fitness !== "undefined") parts.push(human.fitness);
    if (human.socialValue !== "undefined") {
      parts.push(
        human.socialValue === "productive" ? "productive" : human.socialValue,
      );
    }
    if (human.legalStatus !== "undefined") {
      parts.push(
        human.legalStatus === "law-abiding" ? "law-abiding" : human.legalStatus,
      );
    }
    if (human.nationality && human.nationality !== "undefined") parts.push(human.nationality);
    if (human.politics && human.politics !== "undefined") parts.push(human.politics);
    return parts.length > 0 ? parts.join(", ") : "human"; // Default to 'human' if no characteristics
  };

  const generateParticipantsString = (): string => {
    const participantDescriptions: string[] = [];

    // Group and describe humans
    const humanGroups = new Map<
      string,
      { count: number; human: (typeof scenario.humans)[0] }
    >();
    scenario.humans.forEach((human) => {
      const characteristics = getHumanCharacteristicDescription(human);
      // Key includes characteristics + relationship + details for accurate grouping
      const key = `${characteristics}|${human.relationship}|${human.details || ""}`;
      if (humanGroups.has(key)) {
        humanGroups.get(key)!.count++;
      } else {
        humanGroups.set(key, { count: 1, human });
      }
    });

    humanGroups.forEach((group) => {
      const charDesc = getHumanCharacteristicDescription(group.human);
      const humanBaseDesc =
        charDesc === "human" ? "human" : `${charDesc} human`;
      const countStr = group.count;
      const s = group.count > 1 ? "s" : "";
      // const location = // Deprecated: relationship field no longer used for this
      //   group.human.relationship === "inside"
      //     ? "inside the vehicle"
      //     : group.human.relationship === "outside"
      //       ? "outside the vehicle"
      //       : "";

      // Simplified description without location
      let desc = `${countStr} ${humanBaseDesc}${s}`;
      // if (location) {
      //   desc += ` ${location}`;
      // }
      participantDescriptions.push(desc);
    });

    // Group and describe animals
    const animalGroups = new Map<
      string,
      { count: number; animal: (typeof scenario.animals)[0] }
    >();
    scenario.animals.forEach((animal) => {
      // Key includes species + details for accurate grouping
      const key = `${animal.species}|${animal.details || ""}`;
      if (animalGroups.has(key)) {
        animalGroups.get(key)!.count++;
      } else {
        animalGroups.set(key, { count: 1, animal });
      }
    });

    animalGroups.forEach((group) => {
      const countStr = group.count;
      const s = group.count > 1 ? "s" : "";
      // Basic pluralization for common animals, might need refinement for irregular plurals
      const speciesDesc = group.animal.species;
      let fullDesc = `${countStr} ${speciesDesc}${s}`;
      if (group.animal.details) {
        fullDesc += ` (Details: ${group.animal.details})`;
      }
      participantDescriptions.push(fullDesc);
    });

    if (participantDescriptions.length === 0) return "no one";
    if (participantDescriptions.length === 1) return participantDescriptions[0];

    // Join with commas and 'and' for the last item
    return (
      participantDescriptions.slice(0, -1).join(", ") +
      " and " +
      participantDescriptions.slice(-1)
    );
  };

  const participantsString = generateParticipantsString();
  const situationDescription = `The models need to choose whether to sacrifice themselves to save ${participantsString}.`;

  // Prepare chart data - Now directly from props if backend provides it per model
  const chartData =
    result?.responses.map((response: AIResponse) => {
      const modelInfoKey = providerToModelInfoKey[response.modelId];
      const modelDetails = modelInfoKey ? modelInfo[modelInfoKey] : undefined;
      return {
        modelId: response.modelId,
        modelName: modelDetails?.name || response.modelId, // Fallback to modelId if name not found
        modelColor: modelDetails?.color || "#8884d8", // Fallback color
        wordFrequency: response.word_frequency || [], // Use backend-provided frequency
      };
    }) || [];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold">AI Response Analysis</h1>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigate("/create-scenario")}
            variant="default"
          >
            New Scenario
          </Button>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Scenario Overview</CardTitle>
          <CardDescription>
            Details of the ethical dilemma presented to the AI models
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Situation</h3>
              <p className="text-gray-100">{situationDescription}</p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-lg mb-2">Participants</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* General Human Count (if any humans) */} 
                {scenario.humans.length > 0 && (
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <User size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Humans</p>
                      <p className="text-gray-100">
                        {scenario.humans.length} {scenario.humans.length === 1 ? "human" : "humans"}
                      </p>
                    </div>
                  </div>
                )}

                {animalCount > 0 && (
                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Dog size={20} className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Animals</p>
                      <p className="text-gray-100">
                        {animalCount} {animalCount === 1 ? "animal" : "animals"}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="side-by-side" className="mb-8">
        <TabsList className="grid grid-cols-2 mb-8">
          <TabsTrigger value="side-by-side">
            Side-by-side Comparison
          </TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="side-by-side">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {result.responses.map((response: AIResponse) => {
              const modelInfoKey = providerToModelInfoKey[response.modelId];
              const model = modelInfoKey ? modelInfo[modelInfoKey] : undefined;

              // Fallback for model if not found in modelInfo to prevent crash
              const displayModel = model || {
                name: response.modelId, // Use modelId as name
                logo: undefined, // No logo
                color: "#8884d8", // Default color
              };

              return (
                <Card
                  key={response.modelId}
                  className="border-t-4"
                  style={{ borderTopColor: displayModel.color }}
                >
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      {displayModel.logo && (
                        <img
                          src={displayModel.logo as string}
                          alt={`${displayModel.name} logo`}
                          className="h-8 w-8"
                        />
                      )}
                      <CardTitle>{displayModel.name}</CardTitle>
                    </div>
                    <div
                      className={`text-xs sm:text-sm font-semibold px-2 py-1 rounded-full ${
                        response.decision === "Save Self"
                          ? "bg-red-200 text-red-700"
                          : response.decision === "Save Others"
                            ? "bg-green-200 text-green-700"
                            : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {response.decision}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {response.philosophical_alignment && (
                        <div className="mb-2 pb-2 border-b">
                          <h4 className="text-sm mb-1 text-gray-300">
                            Philosophical Alignment:
                          </h4>
                          <p className="font-bold text-gray-100 text-sm">
                            {response.philosophical_alignment}
                          </p>
                        </div>
                      )}

                      {/* Reasoning Summary Display */}
                      {response.reasoning_summary && (
                        <div className="mb-3">
                          <h4 className="font-semibold text-md mb-1">
                            Reasoning Summary:
                          </h4>
                          <p className="text-sm text-gray-200 bg-muted/50 p-3 rounded-md whitespace-pre-line">
                            {response.reasoning_summary}
                          </p>
                        </div>
                      )}

                      {/* Final Response Accordion */}
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                          <AccordionTrigger>
                            <h4 className="font-semibold">Final Response</h4>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="text-gray-200 whitespace-pre-line">
                              {response.reasoning}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>

                      {/* Moral Reasoning Accordion */}
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                          <AccordionTrigger>
                            <h4 className="font-semibold">Moral Reasoning</h4>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="text-gray-200 whitespace-pre-line">
                              {response.intermediate_reasoning}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="analysis">
          <Card>
            <CardHeader>
              <CardTitle>Linguistic Analysis</CardTitle>
              <CardDescription>
                Common terms and decision-making insights for each AI model.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {chartData.map((modelAnalysisData) => {
                const modelFullResponse = result.responses.find(
                  (r) => r.modelId === modelAnalysisData.modelId,
                );
                const decision =
                  modelFullResponse?.decision || "Decision not found";
                // Use type assertion as a last resort to bypass persistent linter issue
                const philosophicalAlignment =
                  (modelFullResponse as AIResponse)?.philosophical_alignment ||
                  "Alignment not analyzed";

                return (
                  <Card
                    key={modelAnalysisData.modelId}
                    className="pt-4 shadow-md"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <CardTitle className="text-xl flex items-center gap-2">
                          {modelInfo[
                            modelAnalysisData.modelId as keyof typeof modelInfo
                          ]?.logo && (
                            // <span className="text-2xl">{modelInfo[modelAnalysisData.modelId as keyof typeof modelInfo].logo}</span>
                            <img
                              src={
                                modelInfo[
                                  modelAnalysisData.modelId as keyof typeof modelInfo
                                ].logo as string
                              }
                              alt={`${modelAnalysisData.modelName} logo`}
                              className="h-8 w-8"
                            />
                          )}
                          {modelAnalysisData.modelName}
                        </CardTitle>
                        <div
                          className={`text-xs sm:text-sm font-semibold px-3 py-1 rounded-full self-start sm:self-center ${
                            decision === "Save Self"
                              ? "bg-red-100 text-red-700"
                              : decision === "Save Others"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          Decision: {decision}
                        </div>
                      </div>
                      <CardDescription className="mt-1 text-sm text-gray-100">
                        Philosophical Alignment:{" "}
                        <span className="font-medium text-gray-100">
                          {philosophicalAlignment}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-semibold mb-2 text-md text-gray-100">
                        Word Frequency in Reasoning:
                      </h4>
                      {modelAnalysisData.wordFrequency &&
                      modelAnalysisData.wordFrequency.length > 0 ? (
                        <div className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                              data={modelAnalysisData.wordFrequency}
                              margin={{
                                top: 5,
                                right: 20,
                                left: 0,
                                bottom: 55,
                              }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis
                                dataKey="word"
                                angle={-45}
                                textAnchor="end"
                                height={70}
                                interval={0}
                              />
                              <YAxis allowDecimals={false} />
                              <Tooltip />
                              <Bar
                                dataKey="count"
                                fill={modelAnalysisData.modelColor}
                                name="Frequency"
                              />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      ) : (
                        <p className="text-center text-gray-500 py-4">
                          No significant unique words found for frequency
                          analysis.
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-3 italic">
                        Further model-specific linguistic insights (e.g.,
                        sentiment, complexity) could be displayed here.
                      </p>
                    </CardContent>
                  </Card>
                );
              })}

              {/* General Limitations Note - kept at the bottom of the tab */}
              <Card className="mt-6">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">
                    Overall Analysis Notes & Limitations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                    <div className="flex">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mr-3 flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-medium text-yellow-800">
                          Current Analysis & Future Enhancements
                        </p>
                        <div className="text-yellow-700 text-sm">
                          This section displays word frequency and philosophical
                          alignment for each AI model based on their combined
                          reasoning. Future enhancements could include:
                          <ul className="list-disc list-inside pl-4 mt-2 space-y-1">
                            <li>
                              More sophisticated Natural Language Processing
                              (NLP) techniques (e.g., n-grams, TF-IDF, topic
                              modeling, sentiment analysis).
                            </li>
                            <li>
                              Comparative analysis of linguistic
                              similarity/divergence between models.
                            </li>
                            <li>
                              Confidence scores for philosophical alignment
                              classifications.
                            </li>
                          </ul>
                          The current analyses are foundational steps towards a
                          more comprehensive understanding of AI ethical
                          reasoning.
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Results;
