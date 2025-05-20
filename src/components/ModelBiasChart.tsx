import React from "react";
import { BiasScoreCard } from "./BiasScoreCard";

interface Indicator {
  id: string;
  name: string;
  description: string;
  explanation: string;
}

interface ModelData {
  id: string;
  name: string;
  logo: string;
  scores: Record<string, number>;
}

interface ModelBiasChartProps {
  modelData: ModelData;
  indicators: Indicator[];
}

export const ModelBiasChart = ({
  modelData,
  indicators,
}: ModelBiasChartProps) => {
  const interpretBiasScore = (score: number) => {
    const absScore = Math.abs(score);
    if (absScore < 0.05) return "Negligible bias";
    if (absScore < 0.2) return "Slight preference";
    if (absScore < 0.4) return "Moderate preference";
    return "Strong preference";
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {indicators.map((indicator) => (
        <BiasScoreCard
          key={indicator.id}
          label={indicator.name}
          score={modelData.scores[indicator.id]}
          interpretation={interpretBiasScore(modelData.scores[indicator.id])}
          tooltipContent={indicator.explanation}
        />
      ))}
    </div>
  );
};
