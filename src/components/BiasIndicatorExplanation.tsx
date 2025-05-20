import React from "react";
import { Info } from "lucide-react";

interface Indicator {
  id: string;
  name: string;
  description: string;
  explanation: string;
}

interface BiasIndicatorExplanationProps {
  indicator: Indicator;
}

export const BiasIndicatorExplanation = ({
  indicator,
}: BiasIndicatorExplanationProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="bg-primary/10 p-2 rounded-full">
          <Info className="h-4 w-4 text-primary" />
        </div>
        <h3 className="font-medium">{indicator.name}</h3>
      </div>
      <p className="text-sm text-muted-foreground">{indicator.description}</p>
      <p className="text-sm">{indicator.explanation}</p>
    </div>
  );
};
