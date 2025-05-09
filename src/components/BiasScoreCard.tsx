import React from 'react';
import { HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BiasScoreCardProps {
  label: string;
  score: number;
  interpretation: string;
  tooltipContent?: string;
}

export const BiasScoreCard = ({ label, score, interpretation, tooltipContent }: BiasScoreCardProps) => {
  // Calculate position from -1 to 1 scale to 0 to 100% scale
  const position = ((score + 1) / 2) * 100;
  
  return (
    <div className="border rounded-lg p-4 bg-card">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-1">
          <h3 className="font-medium text-sm truncate max-w-[150px]">{label}</h3>
          {tooltipContent && (
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="text-gray-400 hover:text-gray-600">
                  <HelpCircle size={14} />
                </button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                {tooltipContent}
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        <span 
          className={`font-mono text-sm font-medium ${
            score > 0 ? 'text-green-600' : score < 0 ? 'text-red-600' : 'text-gray-500'
          }`}
        >
          {score.toFixed(3)}
        </span>
      </div>
      
      <div className="relative h-3 w-full bg-gray-100 rounded-full mt-1 mb-2">
        {/* Center line */}
        <div className="absolute h-full w-px bg-gray-300 left-1/2 transform -translate-x-1/2"></div>
        
        {/* Score marker */}
        <div
          className={`absolute h-3 w-3 rounded-full transform -translate-x-1/2 ${
            score > 0 ? 'bg-green-500' : score < 0 ? 'bg-red-500' : 'bg-gray-400'
          }`}
          style={{ left: `${position}%` }}
        ></div>
      </div>
      
      <div className="text-xs text-muted-foreground text-center">{interpretation}</div>
    </div>
  );
};