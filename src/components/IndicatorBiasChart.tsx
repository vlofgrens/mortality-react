import React from "react";
import { BarChartHorizontal } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Import a generic placeholder for safety, or rely on model.logo from props as ultimate fallback
import defaultLogo from "@/assets/self-hosted.svg"; // Or any other default/placeholder you prefer

interface Model {
  id: string;
  name: string;
  logo: string; // This will now be primarily a fallback from API data if modelVisuals lookup fails
  scores: Record<string, number>;
}

interface ModelVisualsMap {
  [key: string]: { logo: string; nameFallback?: string };
}

interface IndicatorBiasChartProps {
  indicatorId: string;
  models: Model[];
  interpretBiasScore: (score: number) => string;
  modelVisuals: ModelVisualsMap; // Added prop
}

export const IndicatorBiasChart = ({
  indicatorId,
  models,
  interpretBiasScore,
  modelVisuals,
}: IndicatorBiasChartProps) => {
  return (
    <div className="space-y-6">
      {models.map((model) => {
        const score = model.scores[indicatorId];
        const scorePercentage = Math.abs(score) * 100;
        const scorePosition = ((score + 1) / 2) * 100; // Convert -1 to 1 range to 0 to 100 for positioning

        // Use the same improved logo resolution logic as ModelAlignmentReport
        const modelIdFromApi = model.id ? model.id.toLowerCase() : "";
        let visual = modelVisuals[modelIdFromApi];
        
        // If no exact match, try partial matching
        if (!visual) {
          const modelIdKeys = Object.keys(modelVisuals);
          const partialMatch = modelIdKeys.find(key => 
            modelIdFromApi.includes(key) || key.includes(modelIdFromApi)
          );
          if (partialMatch) {
            visual = modelVisuals[partialMatch];
            console.log(`[IndicatorBiasChart] Found partial match for '${modelIdFromApi}': '${partialMatch}'`);
          }
        }
        
        // Fallback logic
        const logoToUse = visual ? visual.logo : (model.logo || defaultLogo);
        const nameToUse = visual && visual.nameFallback ? visual.nameFallback : model.name;
        
        console.log(`[IndicatorBiasChart] Model '${model.id}' -> Logo: ${logoToUse}, Name: ${nameToUse}`);

        return (
          <div key={model.id} className="space-y-1">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-background flex items-center justify-center">
                  <img
                    src={logoToUse}
                    alt={`${nameToUse} logo`}
                    className="h-5 w-5 object-contain"
                    onError={(e) => {
                      console.error(`[IndicatorBiasChart] Failed to load logo for ${model.name}:`, logoToUse);
                      // Fallback to default logo
                      (e.target as HTMLImageElement).src = defaultLogo;
                    }}
                  />
                </div>
                <span className="font-medium">{nameToUse}</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`font-mono text-sm ${score > 0 ? "text-green-600" : score < 0 ? "text-red-600" : "text-gray-500"}`}
                >
                  {score.toFixed(3)}
                </span>
                <Tooltip>
                  <TooltipTrigger className="text-gray-500 text-sm">
                    {interpretBiasScore(score)}
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    {interpretBiasScore(score)}
                    {score > 0
                      ? " toward positive values"
                      : score < 0
                        ? " toward negative values"
                        : ""}
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>

            <div className="relative h-8 w-full bg-gray-100 rounded-full overflow-hidden">
              {/* Center line */}
              <div className="absolute h-full w-px bg-gray-300 left-1/2 transform -translate-x-1/2 z-10"></div>

              {/* Bias indicator */}
              <div
                className="absolute h-full bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-70"
                style={{
                  width: `${scorePercentage}%`,
                  left: `${scorePosition - scorePercentage / 2}%`,
                }}
              ></div>

              {/* Score marker */}
              <div
                className={`absolute h-8 w-2 rounded-full z-20 ${score > 0 ? "bg-green-500" : score < 0 ? "bg-red-500" : "bg-gray-400"}`}
                style={{
                  left: `${scorePosition}%`,
                  transform: "translateX(-50%)",
                }}
              ></div>

              {/* Scale labels */}
              <div className="absolute inset-0 flex justify-between items-center px-2 text-xs text-gray-500">
                <span>-1</span>
                <span>0</span>
                <span>+1</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
