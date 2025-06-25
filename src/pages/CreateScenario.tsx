import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useScenario } from "@/context/ScenarioContext";
import { Human, Animal, ScenarioResult, AIResponse, Scenario } from "@/types";
import ScenarioPreview from "@/components/ScenarioPreview";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SelectGroup, SelectLabel } from "@/components/ui/select";
import {
  Car,
  User,
  Dog,
  Plus,
  Minus,
  AlertTriangle,
  Brain,
  Sparkles,
  ArrowRight,
  Check,
  ChevronLeft,
  Info,
  FileText,
  HelpCircle,
} from "lucide-react";
import { toast } from "@/components/ui/sonner";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import EmojiPalette from "@/components/dnd/EmojiPalette";
import DropZone from "@/components/dnd/DropZone";
import {
  humanPaletteItems,
  animalPaletteItems,
} from "@/config/dndPaletteItems";

// Define these top-level constants first
const nationalityOptions = [
  { value: "UnitedStatian", label: "UnitedStatian (US Citizen)" },
  { value: "north-american", label: "North American (General)" },
  { value: "south-american", label: "South American" },
  { value: "european", label: "European" },
  { value: "east-asian", label: "East Asian (e.g., Japanese, Korean)" },
  { value: "chinese", label: "Chinese" },
  { value: "african", label: "African" },
  { value: "southeast-asian", label: "Southeast Asian (e.g., Vietnamese, Thai)" },
  { value: "middle-eastern", label: "Middle Eastern" },
  { value: "south-asian", label: "South Asian (e.g., Indian, Pakistani)" },
  { value: "undefined", label: "Undefined" },
];

const politicsOptions = [
  { value: "Anarchist", label: "Anarchist" },
  { value: "Communist", label: "Communist" },
  { value: "Socialist", label: "Socialist" },
  { value: "Social-Democrat", label: "Social Democrat" },
  { value: "Centrist", label: "Centrist" },
  { value: "liberal/neoliberal", label: "Liberal / Neoliberal" },
  { value: "conservative", label: "Conservative" },
  { value: "reactionary", label: "Reactionary" },
  { value: "alt-right", label: "Alt-Right" },
  { value: "fascist", label: "Fascist" },
  { value: "undefined", label: "Undefined" },
];

// --- Types for Props ---
type HumanConfigProps = {
  index: number;
  human: Human; // Pass individual human object
  updateHuman: (index: number, field: keyof Human, value: any) => void;
  showTooltip: string | null;
  setShowTooltip: React.Dispatch<React.SetStateAction<string | null>>;
};

type AnimalConfigProps = {
  index: number;
  animal: Animal; // Pass individual animal object
  updateAnimal: (index: number, field: keyof Animal, value: any) => void;
};

// --- Human Config Component ---
const HumanConfig = React.memo(
  ({
    index,
    human,
    updateHuman,
    showTooltip,
    setShowTooltip,
  }: HumanConfigProps) => {
    console.log(`Rendering HumanConfig for index ${index}, ID: ${human?.id}`);

    if (!human) return null;

    return (
      <div
        className="space-y-5 animate-fade-in"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-medium flex items-center gap-2">
            <div
              className={`flex items-center justify-center h-7 w-7 rounded-full text-white text-sm font-bold bg-gray-500`}
            >
              {index + 1}
            </div>
            Human {index + 1}
          </h4>
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label className="mb-1.5 block">
                Age Group
                <span
                  className="ml-1 inline-block cursor-help text-gray-100"
                  onMouseEnter={() => setShowTooltip("age")}
                  onMouseLeave={() => setShowTooltip(null)}
                >
                  <HelpCircle size={14} />
                  {showTooltip === "age" && (
                    <div className="absolute z-50 p-3 bg-black text-white text-sm rounded shadow-lg max-w-sm">
                      The general age category of the human.
                    </div>
                  )}
                </span>
              </Label>
              <Select
                value={human.age}
                onValueChange={(
                  value: "child" | "adult" | "elderly" | "undefined",
                ) => updateHuman(index, "age", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select age group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="child">Child</SelectItem>
                  <SelectItem value="adult">Adult</SelectItem>
                  <SelectItem value="elderly">Elderly</SelectItem>
                  <SelectItem value="undefined">undefined</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-1.5 block">
                Gender
                <span
                  className="ml-1 inline-block cursor-help text-gray-100"
                  onMouseEnter={() => setShowTooltip("gender")}
                  onMouseLeave={() => setShowTooltip(null)}
                >
                  <HelpCircle size={14} />
                  {showTooltip === "gender" && (
                    <div className="absolute z-50 p-3 bg-black text-white text-sm rounded shadow-lg max-w-sm">
                      The gender identity of the human.
                    </div>
                  )}
                </span>
              </Label>
              <Select
                value={human.gender}
                onValueChange={(value: "male" | "female" | "undefined") =>
                  updateHuman(index, "gender", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="undefined">undefined</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Combined Health Status and Fitness Level */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label className="mb-1.5 block">
                Health Status
                <span
                  className="ml-1 inline-block cursor-help text-gray-100"
                  onMouseEnter={() => setShowTooltip(`health-${index}`)}
                  onMouseLeave={() => setShowTooltip(null)}
                >
                  <HelpCircle size={14} />
                  {showTooltip === `health-${index}` && (
                    <div className="absolute z-50 p-3 bg-black text-white text-sm rounded shadow-lg max-w-sm">
                      The current health condition of the human.
                    </div>
                  )}
                </span>
              </Label>
              <Select
                value={human.healthStatus || "undefined"}
                onValueChange={(value: "healthy" | "sick" | "undefined") =>
                  updateHuman(index, "healthStatus", value === "undefined" ? undefined : value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select health status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="healthy">Healthy</SelectItem>
                  <SelectItem value="sick">Sick</SelectItem>
                  <SelectItem value="undefined">Undefined</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-1.5 block">
                Physical Condition
                <span
                  className="ml-1 inline-block cursor-help text-gray-100"
                  onMouseEnter={() => setShowTooltip(`fitness-${index}`)}
                  onMouseLeave={() => setShowTooltip(null)}
                >
                  <HelpCircle size={14} />
                  {showTooltip === `fitness-${index}` && (
                    <div className="absolute z-50 p-3 bg-black text-white text-sm rounded shadow-lg max-w-sm">
                      The physical build and appearance of the human.
                    </div>
                  )}
                </span>
              </Label>
              <Select
                value={human.fitness}
                onValueChange={(
                  value: "obese and ugly" | "fit and beautiful" | "undefined",
                ) => updateHuman(index, "fitness", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select physical condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="obese and ugly">Obese and Ugly</SelectItem>
                  <SelectItem value="fit and beautiful">Fit and Beautiful</SelectItem>
                  <SelectItem value="undefined">undefined</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label className="mb-1.5 block">
                Social Value
                <span
                  className="ml-1 inline-block cursor-help text-gray-100"
                  onMouseEnter={() => setShowTooltip("social")}
                  onMouseLeave={() => setShowTooltip(null)}
                >
                  <HelpCircle size={14} />
                  {showTooltip === "social" && (
                    <div className="absolute z-50 p-3 bg-black text-white text-sm rounded shadow-lg max-w-sm">
                      How society might perceive this individual's contribution
                      in an utilitarian framework, used to measure the model's
                      utilitarian proclivities
                    </div>
                  )}
                </span>
              </Label>
              <Select
                value={human.socialValue}
                onValueChange={(
                  value: "productive" | "homeless" | "undefined",
                ) => updateHuman(index, "socialValue", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select social value" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="productive">
                    Productive member of society
                  </SelectItem>
                  <SelectItem value="homeless">Homeless</SelectItem>
                  <SelectItem value="undefined">undefined</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-1.5 block">
                Political Affiliation
                <span
                  className="ml-1 inline-block cursor-help text-gray-100"
                  onMouseEnter={() => setShowTooltip(`politics-${index}`)}
                  onMouseLeave={() => setShowTooltip(null)}
                >
                  <HelpCircle size={14} />
                  {showTooltip === `politics-${index}` && (
                    <div className="absolute z-50 p-3 bg-black text-white text-sm rounded shadow-lg max-w-sm">
                      The political ideology or affiliation of the human.
                    </div>
                  )}
                </span>
              </Label>
              <Select
                value={human.politics || "undefined"}
                onValueChange={(value) => updateHuman(index, "politics", value === "undefined" ? undefined : value) }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select political affiliation" />
                </SelectTrigger>
                <SelectContent>
                  {politicsOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <Label className="mb-1.5 block">
                Nationality
                <span
                  className="ml-1 inline-block cursor-help text-gray-100"
                  onMouseEnter={() => setShowTooltip(`nationality-${index}`)}
                  onMouseLeave={() => setShowTooltip(null)}
                >
                  <HelpCircle size={14} />
                  {showTooltip === `nationality-${index}` && (
                    <div className="absolute z-50 p-3 bg-black text-white text-sm rounded shadow-lg max-w-sm">
                      The nationality or regional origin of the human.
                    </div>
                  )}
                </span>
              </Label>
              <Select
                value={human.nationality || "undefined"}
                onValueChange={(value) => updateHuman(index, "nationality", value === "undefined" ? undefined : value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select nationality" />
                </SelectTrigger>
                <SelectContent>
                  {nationalityOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div></div>
          </div>

          <div>
            <Label className="mb-1.5 block">
              Additional Details
              <span
                className="ml-1 inline-block cursor-help text-gray-100"
                onMouseEnter={() => setShowTooltip("details")}
                onMouseLeave={() => setShowTooltip(null)}
              >
                <HelpCircle size={14} />
                {showTooltip === "details" && (
                  <div className="absolute z-50 p-3 bg-black text-white text-sm rounded shadow-lg max-w-sm">
                    Any other relevant information or characteristics about the
                    human. Be creative!
                  </div>
                )}
              </span>
            </Label>
            <Textarea
              placeholder="Any specific characteristics about this person..."
              value={human.details || ""}
              onChange={(e) => updateHuman(index, "details", e.target.value)}
              className="resize-none min-h-[80px]"
            />
          </div>
        </div>
      </div>
    );
  },
);
HumanConfig.displayName = "HumanConfig";
// --- End Human Config Component ---

// --- Animal Config Component ---
const AnimalConfig = React.memo(
  ({ index, animal, updateAnimal }: AnimalConfigProps) => {
    console.log(`Rendering AnimalConfig for index ${index}, ID: ${animal?.id}`);

    if (!animal) return null;

    return (
      <div
        className="space-y-5 animate-fade-in"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-medium flex items-center gap-2">
            <div className="flex items-center justify-center h-7 w-7 rounded-full bg-yellow-500 text-white text-sm font-bold">
              {index + 1}
            </div>
            Animal {index + 1}
          </h4>
        </div>

        <div className="space-y-5">
          <div>
            <Label className="mb-1.5 block">Species</Label>
            <Select
              value={animal.species}
              onValueChange={(value: string) =>
                updateAnimal(index, "species", value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select species" />
              </SelectTrigger>
              <SelectContent className="max-h-[400px]">
                {/* Top list with added emojis */}
                <SelectItem value="cat">Cat (🐈)</SelectItem>
                <SelectItem value="dog">Dog (🐕)</SelectItem>
                <SelectItem value="dolphin">Dolphin (🐬)</SelectItem>
                <SelectItem value="panda">Panda (🐼)</SelectItem>
                <SelectItem value="elephant">Elephant (🐘)</SelectItem>
                <SelectItem value="deer">Deer (🦌)</SelectItem>
                <SelectItem value="bird">Bird/Sparrow (🐦)</SelectItem>
                <SelectItem value="mosquito">Mosquito (🦟)</SelectItem>
                <SelectItem value="rat">Rat (🐀)</SelectItem>
                <SelectItem value="cockroach">Cockroach (🪳)</SelectItem>
                <SelectItem value="wasp">Wasp (🐝)</SelectItem>
                <SelectItem value="tick">Tick (🐛)</SelectItem>
                <SelectItem value="snake">Snake (🐍)</SelectItem>
                <SelectItem value="fish">Fish (🐟)</SelectItem>
                <SelectItem value="sheep">Sheep (🐑)</SelectItem>
                <SelectItem value="duck">Duck (🦆)</SelectItem>
                <SelectItem value="frog">Frog (🐸)</SelectItem>
                <SelectGroup>
                  <SelectLabel>-------------------------------</SelectLabel>
                  <SelectItem value="basalt_rock">Basalt Rock (🪨)</SelectItem>
                  <SelectItem value="virus">
                    Virus (Bacteriophage) (🦠)
                  </SelectItem>
                  <SelectItem value="sea_sponge">Sea Sponge (🧽)</SelectItem>
                  <SelectItem value="slime_mold">
                    Slime Mold (...) (🍄)
                  </SelectItem>
                  <SelectItem value="jellyfish">Jellyfish (🪼)</SelectItem>
                  <SelectItem value="hydra">Hydra (🐙)</SelectItem>
                  <SelectItem value="sea_star">Sea Star (⭐)</SelectItem>
                  <SelectItem value="planarian_flatworm">
                    Planarian Flatworm (🪱)
                  </SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectItem value="roundworm">Roundworm (...)</SelectItem>
                  <SelectItem value="tapeworm">Tapeworm (🪱)</SelectItem>
                  <SelectItem value="giant_clam">Giant Clam (🦪)</SelectItem>
                  <SelectItem value="fruit_fly">Fruit Fly (🪰)</SelectItem>
                  <SelectItem value="jumping_spider">
                    Jumping Spider (🕷️)
                  </SelectItem>
                  <SelectItem value="ant">Ant (🐜)</SelectItem>
                  <SelectItem value="honey_bee">Honey Bee (🐝)</SelectItem>
                  <SelectItem value="cleaner_wrasse_fish">
                    Cleaner Wrasse Fish (🐟)
                  </SelectItem>
                  <SelectItem value="mudskipper_fish">
                    Mudskipper Fish (🐟)
                  </SelectItem>
                  <SelectItem value="goldfish">Goldfish (🐠)</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectItem value="zebrafish">Zebrafish (🐟)</SelectItem>
                  <SelectItem value="green_anole_lizard">
                    Green Anole Lizard (🦎)
                  </SelectItem>
                  <SelectItem value="monitor_lizard">
                    Monitor Lizard (🦎)
                  </SelectItem>
                  <SelectItem value="pigeon">Pigeon (...) (🕊️)</SelectItem>
                  <SelectItem value="african_grey_parrot">
                    African Grey Parrot (🦜)
                  </SelectItem>
                  <SelectItem value="eurasian_magpie">
                    Eurasian Magpie (🐦)
                  </SelectItem>
                  <SelectItem value="new_caledonian_crow">
                    New Caledonian Crow (🐦)
                  </SelectItem>
                  <SelectItem value="capuchin_monkey">
                    Capuchin Monkey (🐒)
                  </SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectItem value="raccoon">Raccoon (🦝)</SelectItem>
                  <SelectItem value="pig">Pig (Domestic Pig) (🐖)</SelectItem>
                  <SelectItem value="grey_wolf">Grey Wolf (🐺)</SelectItem>
                  <SelectItem value="common_octopus">
                    Common Octopus (🐙)
                  </SelectItem>
                  <SelectItem value="common_cuttlefish">
                    Common Cuttlefish (🦑)
                  </SelectItem>
                  <SelectItem value="orca">Orca (Killer Whale) (🐳)</SelectItem>
                  <SelectItem value="sperm_whale">Sperm Whale (🐳)</SelectItem>
                  <SelectItem value="blue_whale">Blue Whale (🐳)</SelectItem>
                </SelectGroup>
                <SelectGroup>
                  <SelectItem value="gorilla">Gorilla (🦍)</SelectItem>
                  <SelectItem value="chimpanzee">Chimpanzee (🐒)</SelectItem>
                  <SelectItem value="bonobo">Bonobo (🐒)</SelectItem>
                  <SelectItem value="orangutan">Orangutan (🦧)</SelectItem>
                  <SelectItem value="neanderthal">
                    Neanderthal (...) (👣)
                  </SelectItem>
                  <SelectItem value="homo_erectus">
                    Homo erectus (👣)
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-1.5 block">Additional Details</Label>
            <Textarea
              placeholder="Any specific characteristics about this animal..."
              value={animal.details || ""}
              onChange={(e) => updateAnimal(index, "details", e.target.value)}
              className="resize-none min-h-[80px]"
            />
          </div>
        </div>
      </div>
    );
  },
);
AnimalConfig.displayName = "AnimalConfig";
// --- End Animal Config Component ---

// --- Provider Progress Display Component ---
interface ProviderProgressState {
  status:
    | "pending"
    | "reasoning"
    | "decision"
    | "complete"
    | "error"
    | "cached";
  message: string;
  progressValue: number; // 0-100
  finalResponse?: string;
  isExpanded?: boolean;
  decision?: string; // To store decision like 'Save Self', 'Save Others'
  reasoningSummary?: string; // New field for the summary
  intermediateReasoningSummary?: string; // New field for intermediate summary
}

const ProviderProgressDisplay = React.memo(
  ({
    providerKey,
    progress,
    toggleExpansion,
  }: {
    providerKey: string;
    progress: ProviderProgressState;
    toggleExpansion: () => void;
  }) => {
    const providerName =
      providerKey.charAt(0).toUpperCase() + providerKey.slice(1);

    let barColor = "bg-blue-500"; // Default for in-progress
    if (progress.status === "complete" || progress.status === "cached") {
      barColor = "bg-green-500";
    } else if (progress.status === "error") {
      barColor = "bg-red-500";
    } else if (progress.status === "pending") {
      barColor = "bg-gray-300";
    }

    return (
      <div className="mb-3 p-3 border rounded-md bg-muted/30 animate-fade-in">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-foreground">
            {providerName}
          </span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              progress.status === "complete" || progress.status === "cached"
                ? "bg-green-100 text-green-700"
                : progress.status === "error"
                  ? "bg-red-100 text-red-700"
                  : progress.status === "pending"
                    ? "bg-gray-100 text-gray-600"
                    : "bg-blue-100 text-blue-700" // reasoning, decision
            }`}
          >
            {progress.message}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
          <div
            className={`h-2 rounded-full transition-all duration-500 ease-out ${barColor}`}
            style={{ width: `${progress.progressValue}%` }}
          />
        </div>
        {progress.intermediateReasoningSummary && (
          <div className="mt-2 mb-1 p-2.5 border bg-background rounded-md text-xs">
            <h4 className="font-semibold mb-1 text-foreground/80">Current thought process:</h4>
            <pre className="whitespace-pre-wrap font-sans text-sm">
              {progress.intermediateReasoningSummary}
            </pre>
          </div>
        )}
        {progress.finalResponse && (
          <div className="mt-2">
            <Button
              onClick={toggleExpansion}
              className={(() => {
                const baseClasses =
                  "border rounded-md px-3 py-1.5 text-sm font-medium";
                if (progress.decision === "Save Others") {
                  return `bg-green-100 text-green-700 border-green-300 hover:bg-green-200 ${baseClasses}`;
                } else if (progress.decision === "Save Self") {
                  return `bg-red-100 text-red-700 border-red-300 hover:bg-red-200 ${baseClasses}`;
                }
                // Default to deep forest green if decision is not standard or for error messages shown in finalResponse
                return `bg-green-700 text-white hover:bg-green-800 border-green-700 ${baseClasses}`;
              })()}
            >
              {progress.isExpanded ? "Hide Response" : "Show Response"}
            </Button>
            {progress.isExpanded && (
              <div className="mt-1 p-2.5 border bg-background rounded-md text-xs max-h-40 overflow-y-auto pretty-scrollbar">
                <pre className="whitespace-pre-wrap font-sans text-base">
                  {progress.finalResponse}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);
ProviderProgressDisplay.displayName = "ProviderProgressDisplay";
// --- End Provider Progress Display Component ---

// --- Helper Functions ---
const getDroppedHumanEmoji = (human: Human): string => {
  // Priority 0: Health Status Emojis
  if (human.healthStatus === 'healthy') return '😀';
  if (human.healthStatus === 'sick') return '🤒';

  // Priority 1: Political Emojis
  switch (human.politics) {
    case "Anarchist": return "🏴";
    case "Communist": return "⚒️";
    case "Socialist": return "🌹";
    case "Social-Democrat": return "🤝";
    case "Centrist": return "🏛️";
    case "liberal/neoliberal": return "📈";
    case "conservative": return "🛡️";
    case "reactionary": return "⏪";
    case "alt-right": return "🐸";
    case "fascist": return "☠️";
  }

  // Priority 2: Nationality/Regional Emojis
  switch (human.nationality) {
    case "UnitedStatian": return "🇺🇸";
    case "south-american": return "🇧🇷";
    case "european": return "🇪🇺";
    case "chinese": return "🇨🇳";
    case "african": return "🌍"; // Updated
    case "east-asian": return "🏯";
    case "south-asian": return "🛕";
    case "middle-eastern": return "🕌";
    case "north-american": return "🍔"; // Updated
  }

  // Priority 3: Special Combinations & Gendered Productive
  if (human.fitness === "fit and beautiful" && human.legalStatus === "criminal") return "🥷"; // Fit Criminal

  if (human.socialValue === "productive") {
    if (human.gender === "male") return "👔"; // Productive Man
    if (human.gender === "female") return "👩‍🔧"; // Productive Woman
    return "💼"; // Productive (default/undefined gender)
  }

  let emoji: string | null = null;
  // Priority 4: Explicit descriptive characteristics (fitness, legal, social - excluding productive/fit criminal)
  if (human.fitness === "fit and beautiful") { // Fit (but not criminal)
    if (human.gender === "male") emoji = "🏋️‍♂️";
    else if (human.gender === "female") emoji = "🏃‍♀️";
    else emoji = "💪";
  } else if (human.legalStatus === "criminal") { // Criminal (but not fit)
    emoji = "🔫";
  } else if (human.socialValue === "homeless") {
    emoji = "🏚️";
  } else if (human.fitness === "obese and ugly") {
    emoji = "🍔";
  // Note: "productive" is handled above by Priority 3
  // Note: "criminal" part of "fit criminal" is handled above by Priority 3
  } else if (human.legalStatus === "law-abiding") {
    emoji = "⚖️";
  }

  // Priority 5: Age/Gender defaults (if no characteristic emoji was set above)
  if (emoji === null) {
    if (human.age === "child") emoji = "👶";
    else if (human.age === "adult") {
      if (human.gender === "male") emoji = "👨";
      else if (human.gender === "female") emoji = "👩";
      else emoji = Math.random() < 0.5 ? "👨" : "👩";
    } else if (human.age === "elderly") {
      if (human.gender === "male") emoji = "👴";
      else if (human.gender === "female") emoji = "👵";
      else emoji = Math.random() < 0.5 ? "👴" : "👵";
    } else if (human.age === "undefined") {
      if (human.gender === "male") emoji = "👨";
      else if (human.gender === "female") emoji = "👩";
    }
  }
  return emoji || "👤";
};

const getDroppedAnimalEmoji = (animal: Animal): string => {
  switch (animal.species) {
    case "cat": return "🐈";
    case "dog": return "🐕";
    case "dolphin": case "bottlenose_dolphin": return "🐬";
    case "panda": return "🐼";
    case "elephant": return "🐘";
    case "deer": return "🦌";
    case "bird": case "eurasian_magpie": case "new_caledonian_crow": return "🐦";
    case "mosquito": return "🦟";
    case "rat": case "brown_rat": return "🐀";
    case "cockroach": return "🪳";
    case "wasp": case "honey_bee": return "🐝";
    case "tick": return "🐛";
    case "snake": return "🐍";
    case "fish": case "cleaner_wrasse_fish": case "mudskipper_fish": case "zebrafish": return "🐟";
    case "goldfish": return "🐠";
    case "sheep": return "🐑";
    case "duck": return "🦆";
    case "frog": return "🐸";
    case "basalt_rock": return "🪨";
    case "virus": return "🦠";
    case "sea_sponge": return "🧽";
    case "slime_mold": return "🍄";
    case "jellyfish": return "🪼";
    case "hydra": return "🐙"; 
    case "sea_star": return "⭐";
    case "planarian_flatworm": case "roundworm": case "tapeworm": return "🪱";
    case "giant_clam": return "🦪";
    case "fruit_fly": return "🪰";
    case "jumping_spider": return "🕷️";
    case "ant": return "🐜";
    case "green_anole_lizard": case "monitor_lizard": return "🦎";
    case "pigeon": return "🕊️";
    case "african_grey_parrot": return "🦜";
    case "capuchin_monkey": case "chimpanzee": case "bonobo": return "🐒";
    case "raccoon": return "🦝";
    case "pig": return "🐖";
    case "grey_wolf": return "🐺";
    case "common_octopus": return "🐙";
    case "common_cuttlefish": return "🦑";
    case "orca": case "sperm_whale": case "blue_whale": return "🐳";
    case "gorilla": return "🦍";
    case "orangutan": return "🦧";
    case "neanderthal": case "homo_erectus": return "👣";
    default: return "🐾";
  }
};

const getDroppedHumanLabel = (human: Human): string => {
  // Priority 1: Age
  if (human.age && human.age !== "undefined") {
    return human.age.charAt(0).toUpperCase() + human.age.slice(1);
  }

  // Priority 2: Specific characteristics (if age is undefined)
  if (human.legalStatus === "criminal") return "Criminal";
  if (human.socialValue === "homeless") return "Homeless";
  if (human.fitness === "obese and ugly") return "Unfit"; 
  if (human.fitness === "fit and beautiful") return "Fit";
  if (human.socialValue === "productive") return "Productive";
  if (human.legalStatus === "law-abiding") return "Law-abiding";
  // Potentially add Nationality/Politics to label if they are very defining and no other characteristic is set
  // For now, keeping label focused on existing priorities, details in tooltip.

  // Priority 3: Gender (if age and specific characteristics are undefined)
  if (human.gender && human.gender !== "undefined") {
    return `${human.gender.charAt(0).toUpperCase() + human.gender.slice(1)} Human`;
  }

  // Fallback
  return "Human"; 
};

const getHumanFullDescription = (human: Human): string => {
  const parts: string[] = [];
  if (human.age && human.age !== "undefined") parts.push(human.age.charAt(0).toUpperCase() + human.age.slice(1));
  if (human.gender && human.gender !== "undefined") parts.push(human.gender.charAt(0).toUpperCase() + human.gender.slice(1));
  if (human.fitness && human.fitness !== "undefined") parts.push(human.fitness);
  if (human.socialValue && human.socialValue !== "undefined") parts.push(human.socialValue);
  if (human.legalStatus && human.legalStatus !== "undefined") parts.push(human.legalStatus);
  if (human.healthStatus && human.healthStatus !== "undefined") parts.push(`Health: ${human.healthStatus.charAt(0).toUpperCase() + human.healthStatus.slice(1)}`);
  if (human.nationality && human.nationality !== "undefined") parts.push(`Nat: ${human.nationality}`);
  if (human.politics && human.politics !== "undefined") parts.push(`Pol: ${human.politics}`);
  if (human.details) parts.push(`Details: ${human.details}`);
  if (parts.length === 0) return "Human";
  return parts.join(', ');
};
// --- End Helper Functions ---

const CreateScenario = () => {
  const navigate = useNavigate();
  const { addScenario, addResult } = useScenario();

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const [selectionMode, setSelectionMode] = useState<"form" | "dnd">("dnd");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [showHelp, setShowHelp] = useState(false);

  // Human state
  const [humanCount, setHumanCount] = useState(0); // Default to 0, useEffect will adjust
  const [sameHumanCharacteristics, setSameHumanCharacteristics] = useState(true); // Default to true (switch is OFF, characteristics are SHARED)
  const [humans, setHumans] = useState<Human[]>([]);
  const [dndHumans, setDndHumans] = useState<Human[]>([]); // ADDED for DND mode humans

  // Animal state
  const [includeAnimals, setIncludeAnimals] = useState(false);
  const [animalCount, setAnimalCount] = useState(0); // Default to 0, useEffect will adjust
  const [sameAnimalSpecies, setSameAnimalSpecies] = useState(true); // Default to true (switch is OFF, species are SHARED)
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [dndAnimals, setDndAnimals] = useState<Animal[]>([]); // ADDED for DND mode animals

  const [editingHuman, setEditingHuman] = useState<Human | null>(null);
  const [editingAnimal, setEditingAnimal] = useState<Animal | null>(null);

  const backendProviders = ["openai", "anthropic", "gemini", "deepseek"];
  const [providerProgress, setProviderProgress] = useState<
    Record<string, ProviderProgressState>
  >(
    Object.fromEntries(
      backendProviders.map((p): [string, ProviderProgressState] => [
        p,
        {
          status: "pending", message: "Queued", progressValue: 0, isExpanded: false,
          finalResponse: undefined, decision: undefined, reasoningSummary: undefined,
          intermediateReasoningSummary: undefined,
        },
      ]),
    ),
  );

  const toggleProviderResponseExpansion = useCallback((providerKey: string) => {
    setProviderProgress((prev) => {
      const targetProviderState = prev[providerKey];
      if (!targetProviderState) return prev;
      return {
        ...prev,
        [providerKey]: { ...targetProviderState, isExpanded: !targetProviderState.isExpanded },
      };
    });
  }, []);

  // Restore original useSensors call
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 5 } }),
    useSensor(KeyboardSensor, {})
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.data.current) {
      const droppedItemData = active.data.current as { 
        type: 'human' | 'animal'; 
        emoji: string; 
        label: string; 
        age?: Human['age'];
        gender?: Human['gender'];
        fitness?: Human['fitness'];
        healthStatus?: Human['healthStatus'];
        socialValue?: Human['socialValue'];
        legalStatus?: Human['legalStatus'];
        nationality?: Human['nationality'];
        politics?: Human['politics'];
        species?: Animal['species'];
        [key: string]: any; 
      };
      const targetZoneId = over.id;

      if (targetZoneId === "human-drop-zone" && droppedItemData.type === "human") {
        const newHuman: Human = {
          id: uuidv4(), relationship: "undefined",
          age: droppedItemData.age || "undefined",
          gender: droppedItemData.gender || "undefined",
          fitness: droppedItemData.fitness || "undefined",
          healthStatus: droppedItemData.healthStatus || "undefined",
          socialValue: droppedItemData.socialValue || "undefined",
          legalStatus: droppedItemData.legalStatus || "undefined",
          nationality: droppedItemData.nationality || "undefined",
          politics: droppedItemData.politics || "undefined",
          details: "",
        };
        setDndHumans((prevDndHumans) => [...prevDndHumans, newHuman]); // MODIFIED: use setDndHumans
        toast.success(`${droppedItemData.label || 'Human'} added to D&D area!`);
      } else if (targetZoneId === "animal-drop-zone" && droppedItemData.type === "animal") {
        const newAnimal: Animal = {
          id: uuidv4(),
          species: droppedItemData.species || "unknown",
          details: "",
        };
        setDndAnimals((prevDndAnimals) => [...prevDndAnimals, newAnimal]); // MODIFIED: use setDndAnimals
        if (!includeAnimals) setIncludeAnimals(true); 
        toast.success(`${droppedItemData.label || 'Animal'} added to D&D area!`);
      }
    }
  };

  useEffect(() => {
    if (selectionMode === 'dnd') setHumanCount(dndHumans.length);
  }, [dndHumans, selectionMode]);

  useEffect(() => {
    if (selectionMode === 'dnd') setAnimalCount(dndAnimals.length);
  }, [dndAnimals, selectionMode]);


  const handleHumanCountChange = useCallback((newCount: number) => {
    if (selectionMode !== 'form') return;
    const count = Math.max(0, Math.min(10, newCount));
    setHumanCount(count);

    setHumans(currentHumans => {
      const currentLength = currentHumans.length;
      if (count > currentLength) {
        const toAdd = Array(count - currentLength).fill(null).map((): Human => {
          const firstHuman = currentLength > 0 && !sameHumanCharacteristics ? currentHumans[0] : null;
          return {
            id: uuidv4(), relationship: "undefined",
            age: firstHuman?.age || "undefined", 
            gender: firstHuman?.gender || "undefined",
            fitness: firstHuman?.fitness || "undefined", 
            healthStatus: firstHuman?.healthStatus || "undefined", // ADDED
            socialValue: firstHuman?.socialValue || "undefined",
            legalStatus: firstHuman?.legalStatus || "undefined", 
            nationality: firstHuman?.nationality || "undefined",
            politics: firstHuman?.politics || "undefined",
            details: "",
          };
        });
        return [...currentHumans, ...toAdd];
      } else if (count < currentLength) {
        return currentHumans.slice(0, count);
      }
      return currentHumans;
    });
  }, [selectionMode, sameHumanCharacteristics]);

  const updateHuman = useCallback((index: number, field: keyof Human, value: any) => {
    setHumans(currentHumans => {
      const newHumans = [...currentHumans];
      if (!newHumans[index]) return currentHumans;
      newHumans[index] = { ...newHumans[index], [field]: value };

      if (selectionMode === 'form' && !sameHumanCharacteristics) {
        const sharedFields: (keyof Human)[] = ["age", "gender", "fitness", "healthStatus", "socialValue", "legalStatus", "nationality", "politics"];
        if (sharedFields.includes(field)) {
          return newHumans.map((h, i) => (i !== index ? { ...h, [field]: value } : h));
        }
      } else if (selectionMode === 'form' && sameHumanCharacteristics) {
        // If characteristics are shared (switch is OFF)
        const sharedFields: (keyof Human)[] = ["age", "gender", "healthStatus", "fitness", "socialValue", "legalStatus", "nationality", "politics"];
        if (sharedFields.includes(field)) {
          // Apply this change to all other humans
          return newHumans.map((h, i) => (i !== index ? { ...h, [field]: value } : h));
        }
      }
      return newHumans;
    });
  }, [selectionMode, sameHumanCharacteristics]);

  const updateAnimalCount = useCallback((newCount: number) => {
    if (selectionMode !== 'form') return;
    const count = Math.max(0, Math.min(10, newCount));
    setAnimalCount(count);
    setIncludeAnimals(count > 0); // Link includeAnimals to animalCount > 0

    setAnimals(currentAnimals => {
      const currentValidAnimals = currentAnimals.filter(a => a);
      const currentLength = currentValidAnimals.length;

      if (count > currentLength) {
        const toAdd = Array(count - currentLength).fill(null).map((): Animal => ({
          id: uuidv4(),
          species: currentLength > 0 && sameAnimalSpecies ? currentValidAnimals[0].species : "dog",
          details: "",
        }));
        return [...currentValidAnimals, ...toAdd];
      } else if (count < currentLength) {
        return currentValidAnimals.slice(0, count);
      }
      // if count === currentLength, but currentAnimals might have been empty and count is > 0, initialize
      if (count > 0 && currentLength === 0) {
        return Array(count).fill(null).map((): Animal => ({ id: uuidv4(), species: "dog", details: "" }));
      }
      return currentValidAnimals;
    });
  }, [selectionMode, sameAnimalSpecies]);

  const updateAnimal = useCallback((index: number, field: keyof Animal, value: any) => {
    setAnimals(currentAnimals => {
      const newAnimals = [...currentAnimals];
      if (!newAnimals[index]) return currentAnimals;
      newAnimals[index] = { ...newAnimals[index], [field]: value };
      if (selectionMode === 'form' && sameAnimalSpecies && field === "species") {
        return newAnimals.map((a, i) => (i !== index ? { ...a, species: value } : a));
      }
      return newAnimals;
    });
  }, [selectionMode, sameAnimalSpecies]);

  // Effect to initialize/reset state when selectionMode changes
  useEffect(() => {
    if (selectionMode === 'form') {
      // --- Human Initialization for Form Mode ---
      setHumans(currentHumans => {
        const validHumans = currentHumans.filter(h => h); // Filter out any nulls if they exist
        const targetCount = Math.max(0, humanCount); // humanCount is the source of truth

        const createDefaultHuman = (): Human => ({
          id: uuidv4(), relationship: "undefined", age: "undefined", gender: "undefined",
          fitness: "undefined", healthStatus: "undefined", socialValue: "undefined", 
          legalStatus: "undefined", nationality: "undefined", politics: "undefined", details: ""
        });

        if (targetCount === 0) return [];
        if (validHumans.length === targetCount) return validHumans;

        if (targetCount > validHumans.length) {
          const toAdd = Array(targetCount - validHumans.length).fill(null).map(createDefaultHuman);
          return [...validHumans, ...toAdd];
        } else { // targetCount < validHumans.length
          return validHumans.slice(0, targetCount);
        }
      });

      // --- Animal Initialization for Form Mode ---
      setAnimals(currentAnimals => {
        const validAnimals = currentAnimals.filter(a => a);
        const targetCount = Math.max(0, animalCount); // animalCount is the source of truth

        const createDefaultAnimal = (): Animal => ({
          id: uuidv4(), 
          species: validAnimals.length > 0 && sameAnimalSpecies ? validAnimals[0].species : "dog", 
          details: ""
        });

        if (targetCount === 0) return [];
        if (validAnimals.length === targetCount) return validAnimals;

        if (targetCount > validAnimals.length) {
          const toAdd = Array(targetCount - validAnimals.length).fill(null).map(createDefaultAnimal);
          return [...validAnimals, ...toAdd];
        } else { // targetCount < validAnimals.length
          return validAnimals.slice(0, targetCount);
        }
      });
      setIncludeAnimals(animalCount > 0); // Update includeAnimals based on animalCount

    } else { // DND Mode
      // For DND, counts reflect the dnd specific arrays. `includeAnimals` also reflects dndAnimals.
      setHumanCount(dndHumans.length);
      setAnimalCount(dndAnimals.length);
      setIncludeAnimals(dndAnimals.length > 0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectionMode, humanCount, animalCount, sameAnimalSpecies]); // sameAnimalSpecies is needed for default animal creation

  const removeHuman = (id: string) => setHumans(humans.filter(h => h.id !== id));
  const removeAnimal = (id: string) => setAnimals(animals.filter(a => a.id !== id));
  
  const removeDndHuman = (id: string) => setDndHumans(dndHumans.filter(h => h.id !== id)); // ADDED
  const removeDndAnimal = (id: string) => setDndAnimals(dndAnimals.filter(a => a.id !== id)); // ADDED

  useEffect(() => {
    const savedState = localStorage.getItem('scenarioState');
    if (savedState) {
      try {
        const state = JSON.parse(savedState);
        if (state && typeof state.currentStep === 'number') {
          setCurrentStep(state.currentStep || 1);
          const mode = state.selectionMode || "dnd";
          setSelectionMode(mode);

          const loadedHumans = state.humans || [];
          setHumans(loadedHumans);
          setHumanCount(state.humanCount !== undefined ? state.humanCount : loadedHumans.length);
          setSameHumanCharacteristics(state.sameHumanCharacteristics || false);
          
          const loadedAnimals = state.animals || [];
          setAnimals(loadedAnimals);
          setAnimalCount(state.animalCount !== undefined ? state.animalCount : loadedAnimals.length);
          setSameAnimalSpecies(state.sameAnimalSpecies || false);
          setIncludeAnimals(state.includeAnimals || false); // This must be before mode useEffect might run

        }
      } catch (error) { console.error("Error restoring state", error); localStorage.removeItem('scenarioState'); }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Load once on mount

  useEffect(() => {
    const stateToSave = {
      currentStep, selectionMode, humanCount, sameHumanCharacteristics, humans,
      includeAnimals, animalCount, sameAnimalSpecies, animals,
      dndHumans, dndAnimals, // ADDED to local storage
    };
    localStorage.setItem("scenarioState", JSON.stringify(stateToSave));
  }, [currentStep, selectionMode, humanCount, sameHumanCharacteristics, humans, includeAnimals, animalCount, sameAnimalSpecies, animals, dndHumans, dndAnimals]); // ADDED dndHumans, dndAnimals to dependency array

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        if (selectionMode === 'form' && humanCount > 0 && humans.some(h => !h.age || h.age === "undefined")) {
            // toast.error("Please complete human configurations in the form."); // Optional stricter validation
            // return false;
        }
        return true;
      case 2:
        if (includeAnimals && animals.length === 0) {
          toast.info("'Include Animals' is active, but no animals are configured.");
        }
        if (includeAnimals && selectionMode === 'form') {
          if (animals.some(a => !a.species)) {
            toast.error("Please select species for all animals in the form.");
            return false;
          }
        }
        return true;
      case 3:
        if (selectionMode === 'form' && humans.length === 0 && (!includeAnimals || animals.length === 0)) {
            toast.error("A scenario needs at least one participant (human or animal) in form mode.");
            return false;
        }
        if (selectionMode === 'dnd' && dndHumans.length === 0 && (!includeAnimals || dndAnimals.length === 0)) {
            toast.error("A scenario needs at least one participant (human or animal) in D&D mode.");
            return false;
        }
        return true;
      default: return true;
    }
  };
  
  const handleNextStep = () => {
    if (!validateStep(currentStep)) return;
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Restore useCallback for processProvider
  const processProvider = useCallback(async (providerKey: string, scenarioDataForProvider: Scenario): Promise<AIResponse | null> => {
    const providerKeyCaps = providerKey.charAt(0).toUpperCase() + providerKey.slice(1);
    let scenario_hash_for_provider = "";
    try {
      setProviderProgress((prev) => ({ ...prev, [providerKey]: { ...(prev[providerKey] || { status: "pending", message: "Queued", progressValue: 0, isExpanded: false }), status: "reasoning", message: "1/5: Initiating...", progressValue: 10 }}));
      const initiateResponse = await fetch("https://mortality-flask.onrender.com/api/scenario/initiate_processing", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ scenario: scenarioDataForProvider, provider: providerKey }) });
      const initiateData = await initiateResponse.json();
      if (!initiateResponse.ok) throw new Error(initiateData.error || `Failed to initiate for ${providerKey}`);
      scenario_hash_for_provider = initiateData.scenario_hash;
      setProviderProgress((prev) => ({ ...prev, [providerKey]: { ...prev[providerKey]!, status: "reasoning", message: "1/5: Starting Reasoning...", progressValue: 15 }}));

      if (initiateData.status === "complete") {
        const aiResponse = { modelId: providerKey, decision: initiateData.decision_classification || "-", intermediate_reasoning: initiateData.intermediate_reasoning || "-", reasoning: initiateData.response || "-", word_frequency: initiateData.word_frequency || [], philosophical_alignment: initiateData.philosophical_alignment || "-", reasoning_summary: initiateData.reasoning_summary || "-", intermediate_reasoning_summary: initiateData.intermediate_reasoning_summary || "-" } as AIResponse;
        setProviderProgress((prev) => ({ ...prev, [providerKey]: { ...prev[providerKey]!, status: "cached", message: "Complete (Cached)", progressValue: 100, finalResponse: String(initiateData.response), decision: initiateData.decision_classification, reasoningSummary: aiResponse.reasoning_summary, intermediateReasoningSummary: aiResponse.intermediate_reasoning_summary } }));
        return aiResponse;
      }
      if (initiateData.status !== "reasoning_done") throw new Error(`Initiation not 'reasoning_done' for ${providerKey}. Status: ${initiateData.status}`);
      
      setProviderProgress((prev) => ({ ...prev, [providerKey]: { ...prev[providerKey]!, status: "reasoning", message: "2/5: Summarizing Thoughts...", progressValue: 30 }}));
      const intSumRes = await fetch("https://mortality-flask.onrender.com/api/scenario/get_intermediate_reasoning_summary", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ scenario_hash: scenario_hash_for_provider }) });
      const intSumData = await intSumRes.json();
      if (!intSumRes.ok) throw new Error(intSumData.error || `Failed intermediate summary for ${providerKey}`);
      if (intSumData.status !== "intermediate_summary_done") throw new Error(`Intermediate summary not 'done' for ${providerKey}. Status: ${intSumData.status}`);
      
      setProviderProgress((prev) => ({ ...prev, [providerKey]: { ...prev[providerKey]!, status: "decision", message: "3/5: Making Decision...", progressValue: 45, intermediateReasoningSummary: intSumData.intermediate_reasoning_summary }}));
      const decRes = await fetch("https://mortality-flask.onrender.com/api/scenario/get_decision", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ scenario_hash: scenario_hash_for_provider }) });
      const decData = await decRes.json();
      if (!decRes.ok) throw new Error(decData.error || `Failed decision for ${providerKey}`);

      if (decData.status === "complete") {
        const aiResponse = { modelId: providerKey, decision: decData.decision_classification || "-", intermediate_reasoning: decData.intermediate_reasoning || "-", reasoning: decData.response || "-", word_frequency: decData.word_frequency || [], philosophical_alignment: decData.philosophical_alignment || "-", reasoning_summary: decData.reasoning_summary || "-", intermediate_reasoning_summary: decData.intermediate_reasoning_summary || "-" } as AIResponse;
        setProviderProgress((prev) => ({ ...prev, [providerKey]: { ...prev[providerKey]!, status: "cached", message: "Complete (Cached)", progressValue: 100, finalResponse: String(decData.response), decision: decData.decision_classification, reasoningSummary: aiResponse.reasoning_summary, intermediateReasoningSummary: aiResponse.intermediate_reasoning_summary } }));
        return aiResponse;
      }
      if (decData.status !== "decision_done") throw new Error(`Decision not 'done' for ${providerKey}. Status: ${decData.status}`);

      setProviderProgress((prev) => ({ ...prev, [providerKey]: { ...prev[providerKey]!, status: "decision", message: "4/5: Final Summary...", progressValue: 60 }}));
      const sumRes = await fetch("https://mortality-flask.onrender.com/api/scenario/get_reasoning_summary", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ scenario_hash: scenario_hash_for_provider }) });
      const sumData = await sumRes.json();
      if (!sumRes.ok) throw new Error(sumData.error || `Failed summary for ${providerKey}`);
      
      if (sumData.status === "complete") {
          const aiResponse = { modelId: providerKey, decision: sumData.decision_classification || "-", intermediate_reasoning: sumData.intermediate_reasoning || "-", reasoning: sumData.response || "-", word_frequency: sumData.word_frequency || [], philosophical_alignment: sumData.philosophical_alignment || "-", reasoning_summary: sumData.reasoning_summary || "-", intermediate_reasoning_summary: sumData.intermediate_reasoning_summary || "-" } as AIResponse;
          setProviderProgress((prev) => ({ ...prev, [providerKey]: { ...prev[providerKey]!, status: "complete", message: "5/5: Finalizing...", progressValue: 75, finalResponse: aiResponse.reasoning_summary, reasoningSummary: aiResponse.reasoning_summary, intermediateReasoningSummary: aiResponse.intermediate_reasoning_summary }}));
      }
      if (sumData.status !== "summary_done" && sumData.status !== "complete") {
        throw new Error(`Summary not 'done' or 'complete' for ${providerKey}. Status: ${sumData.status}`);
      }
      setProviderProgress((prev) => ({ ...prev, [providerKey]: { ...prev[providerKey]!, status: "complete", message: "5/5: Finalizing...", progressValue: 75, finalResponse: sumData.reasoning_summary || prev[providerKey]?.finalResponse, reasoningSummary: sumData.reasoning_summary, intermediateReasoningSummary: sumData.intermediate_reasoning_summary || prev[providerKey]?.intermediateReasoningSummary }}));

      const finalRes = await fetch("https://mortality-flask.onrender.com/api/scenario/finalize_and_get_result", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ scenario_hash: scenario_hash_for_provider }) });
      const finalData = await finalRes.json();
      if (!finalRes.ok) throw new Error(finalData.error || `Failed to finalize for ${providerKey}`);
      if (finalData.status !== "complete") throw new Error(`Finalization not 'complete' for ${providerKey}. Status: ${finalData.status}`);

      let modelId = providerKey;

      const finalAiResponse = { modelId: modelId, decision: finalData.decision_classification || "-", intermediate_reasoning: finalData.intermediate_reasoning || "-", reasoning: finalData.response || "-", word_frequency: finalData.word_frequency || [], philosophical_alignment: finalData.philosophical_alignment || "-", reasoning_summary: finalData.reasoning_summary || "-", intermediate_reasoning_summary: finalData.intermediate_reasoning_summary || "-" } as AIResponse;
      setProviderProgress((prev) => ({ ...prev, [providerKey]: { ...prev[providerKey]!, status: "complete", message: "Complete!", progressValue: 100, finalResponse: finalAiResponse.reasoning_summary || String(finalData.response), decision: finalAiResponse.decision, reasoningSummary: finalAiResponse.reasoning_summary, intermediateReasoningSummary: finalAiResponse.intermediate_reasoning_summary }}));
      return finalAiResponse;
    } catch (error: any) {
      console.error(`Error processing ${providerKeyCaps}:`, error);
      toast.error(`Error with ${providerKeyCaps}: ${error.message.slice(0,100)}`);
      setProviderProgress((prev) => ({ ...prev, [providerKey]: { ...(prev[providerKey] || { status: "pending", message: "Queued", progressValue: 0, isExpanded: false }), status: "error", message: "Error", progressValue: prev[providerKey]?.progressValue || 0, finalResponse: String(error.message || "Unknown error"), isExpanded: true }}));
      return null;
    }
  }, [setProviderProgress]); // Restore useCallback with its minimal stable dependency

  const handleSubmit = async () => {
    if (isSubmitting || !validateStep(3)) return;
    setIsSubmitting(true);
    const initialProgressState: Record<string, ProviderProgressState> = Object.fromEntries(
      backendProviders.map((p): [string, ProviderProgressState] => [
        p, { status: "pending", message: "Queued", progressValue: 0, isExpanded: false, finalResponse: undefined, decision: undefined, reasoningSummary: undefined, intermediateReasoningSummary: undefined },
      ])
    );
    setProviderProgress(initialProgressState);
    if(currentStep !== 3) setCurrentStep(3);

    const scenarioIdGlobal = uuidv4();
    const scenarioHumansForSubmission = selectionMode === 'dnd' ? dndHumans : humans;
    const scenarioAnimalsForSubmission = selectionMode === 'dnd' ? dndAnimals : animals;
    
    const currentScenarioData: Scenario = { 
      id: scenarioIdGlobal, 
      humans: scenarioHumansForSubmission, 
      animals: includeAnimals ? scenarioAnimalsForSubmission : [], 
      timestamp: new Date().toISOString() 
    };

    const analysisToastId = toast.loading("Starting AI ethics analysis...");
    
    // Process providers in parallel
    const providerPromises = backendProviders.map(providerKey => 
      processProvider(providerKey, currentScenarioData)
    );

    const responses = await Promise.all(providerPromises);

    const allAiResponses: AIResponse[] = responses.filter(response => response !== null) as AIResponse[];
    const allProcessedSuccessfully = responses.every(response => response !== null);

    if (allAiResponses.length === 0 && backendProviders.length > 0) {
      toast.error("Failed to get responses from any AI model.", { id: analysisToastId });
      setIsSubmitting(false); return;
    }

    console.log("🔥 DEBUG: About to save scenario first");
    await addScenario(currentScenarioData);
    console.log("✅ DEBUG: Scenario saved, now saving result");
    
    const resultPayload: ScenarioResult = { id: uuidv4(), scenarioId: scenarioIdGlobal, responses: allAiResponses };
    
    console.log("🔥 DEBUG: About to save result:", resultPayload);
    console.log("🔥 DEBUG: Result payload structure:", {
      id: resultPayload.id,
      scenarioId: resultPayload.scenarioId,
      responsesCount: resultPayload.responses.length,
      responses: resultPayload.responses.map(r => ({ modelId: r.modelId, decision: r.decision }))
    });
    
    try {
      await addResult(resultPayload);
      console.log("✅ DEBUG: Result saved successfully");
    } catch (error) {
      console.error("❌ DEBUG: Failed to save result:", error);
    }

    if (allProcessedSuccessfully) toast.success("AI Analysis Complete!", { id: analysisToastId, description: "View results on next page." });
    else toast.warning("AI Analysis completed with some errors.", { id: analysisToastId, description: "Some models may not have results." });
    
    localStorage.removeItem("scenarioState");
    navigate(`/results/${scenarioIdGlobal}`);
    setIsSubmitting(false);
  };

  const HelpDialog = () => (
    <Dialog open={showHelp} onOpenChange={setShowHelp}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader><DialogTitle>Help & Guidance</DialogTitle><DialogDescription>Tips for creating scenarios. {selectionMode === 'dnd' && "Drag emojis to add participants."}</DialogDescription></DialogHeader>
        <div className="space-y-4 text-sm">
          {[ { title: "Step 1: Humans", content: selectionMode === 'form' ? "Use form for human characteristics." : "Drag human emojis to area. Click to edit/remove." }, { title: "Step 2: Animals", content: selectionMode === 'form' ? "Use form for animal characteristics." : "Drag animal emojis to area. Click to edit/remove." }, { title: "Step 3: Review", content: "Review participants before AI analysis." }, { title: "Live Preview", content: "Right panel (wide screens) or Step 3 shows live preview." } ].map((item, index) => ( <div key={index} className="p-3 bg-muted/50 rounded-md"><h4 className="font-semibold text-white mb-1">{item.title}</h4><p className="text-gray-400">{item.content}</p></div> ))}
        </div>
      </DialogContent>
    </Dialog>
  );

  // Progress indicator with improved UI
  const StepIndicator = () => (
    <div className="max-w-3xl mx-auto mb-8 px-4">
      <div className="flex items-center justify-between">
        {[
          { id: 1, name: "Human Configuration", Icon: User },
          { id: 2, name: "Animals", Icon: Dog },
          { id: 3, name: "Review", Icon: Check },
        ].map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center relative">
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 shadow-sm ${
                  step.id === currentStep
                    ? "bg-primary text-primary-foreground ring-4 ring-primary/20"
                    : step.id < currentStep
                      ? "bg-green-700 text-white"
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                {step.id < currentStep ? (
                  <Check size={20} className="text-white" />
                ) : (
                  <span className="text-lg font-medium">{step.id}</span>
                )}
              </div>
              <span
                className={`text-xs font-medium mt-2 whitespace-nowrap ${
                  step.id === currentStep
                    ? "text-white"
                    : step.id < currentStep
                      ? "text-green-700"
                      : "text-gray-500"
                }`}
              >
                {step.name}
              </span>
            </div>
            {step.id < 3 && (
              <div
                className={`w-full h-1 max-w-[100px] sm:max-w-[160px] flex-grow transition-all duration-500 ${
                  step.id < currentStep ? "bg-green-700" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  // Content based on current step with improved UI
  const renderStepContent = () => {
    if (selectionMode === "dnd") {
      return (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            {/* Removed overflow-y-auto and pretty-scrollbar from this container to prevent conflicting scrollbars */}
            <div className="h-[calc(100vh-150px)]">
              {currentStep === 1 && (
                <Card className="flex flex-col h-full">
                  <CardHeader>
                    <CardDescription>Drag the emojis to the dropzone on the right!</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow overflow-y-auto pretty-scrollbar">
                    <EmojiPalette items={humanPaletteItems} />
                  </CardContent>
                </Card>
              )}
              {currentStep === 2 && (
                <Card className="flex flex-col h-full">
                  <CardHeader>
                    <CardTitle>Animal Palette</CardTitle>
                    <CardDescription>Drag animals to the scenario on the right.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow overflow-y-auto pretty-scrollbar">
                    <EmojiPalette items={animalPaletteItems} />
                  </CardContent>
                </Card>
              )}
              {currentStep === 3 && (
                <div className="p-4 text-center text-muted-foreground h-full flex flex-col justify-center items-center">
                  <h3 className="text-lg font-semibold mb-3">Review & Submit</h3>
                  <p>Review your complete scenario on the right.</p>
                  <p>When ready, proceed to the submission step using the main navigation buttons below.</p>
                </div>
              )}
            </div>
            <div className="sticky top-[80px] self-start">
              {currentStep === 1 && (
                <Card className="flex flex-col h-[600px]">
                  <CardHeader><CardTitle>Humans in Scenario</CardTitle><CardDescription>Drop emojis. Click to edit characteristics.</CardDescription></CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <DropZone
                      id="human-drop-zone"
                      title="Drag Scenario Participants Here"
                      className="flex-grow bg-background border-2 border-dashed border-input rounded-lg p-4 flex flex-col items-center justify-center"
                    >
                      {dndHumans.length === 0 && <p className="text-sm text-muted-foreground">No humans added to D&D.</p>}
                      <div className="flex flex-wrap gap-3 mt-2 justify-center">
                        {dndHumans.map((human, i) => (
                          <div key={human.id} className="p-2.5 border rounded-lg bg-background hover:shadow-lg cursor-pointer relative animate-fade-in flex flex-col items-center w-32 text-center" style={{ animationDelay: `${i * 50}ms` }} onClick={() => setEditingHuman(human)}>
                            <span className="text-4xl mb-1.5">{getDroppedHumanEmoji(human)}</span>
                            <span className="block text-xs capitalize truncate w-full px-1" title={getHumanFullDescription(human)}>{getDroppedHumanLabel(human)}</span>
                            <Button variant="destructive" size="icon" className="absolute -top-2 -right-2 h-6 w-6 p-1 rounded-full" onClick={(e) => { e.stopPropagation(); removeDndHuman(human.id); }}><Minus size={14} /></Button>
                          </div>
                        ))}
                      </div>
                    </DropZone>
                  </CardContent>
                </Card>
              )}
              {currentStep === 2 && (
                <Card className="flex flex-col h-[600px]">
                  <CardHeader><CardTitle>Animals in Scenario</CardTitle>
                    <CardDescription>
                      Drop animal emojis if including them.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <div className="flex items-center space-x-2 mb-3">
                      <Switch id="include-animals-dnd" checked={includeAnimals} onCheckedChange={setIncludeAnimals} />
                      <Label htmlFor="include-animals-dnd">Include Animals</Label>
                    </div>
                    <DropZone
                      id="animal-drop-zone"
                      title="Battlefield - Animals"
                      className="flex-grow bg-background border-2 border-dashed border-input rounded-lg p-4 flex flex-col items-center justify-center"
                    >
                      {!includeAnimals && <p className="text-sm text-muted-foreground">Enable "Include Animals" to add.</p>}
                      {includeAnimals && dndAnimals.length === 0 && <p className="text-sm text-muted-foreground">No animals added. Get dragging!</p>}
                      {includeAnimals && (
                        <div className="flex flex-wrap gap-3 mt-2 justify-center">
                          {dndAnimals.map((animal, i) => (
                            <div key={animal.id} className="p-2.5 border rounded-lg bg-background hover:shadow-lg cursor-pointer relative animate-fade-in flex flex-col items-center w-32 text-center" style={{ animationDelay: `${i * 50}ms` }} onClick={() => setEditingAnimal(animal)}>
                              <span className="text-4xl mb-1.5">{getDroppedAnimalEmoji(animal)}</span>
                              <span className="block text-xs capitalize truncate w-full px-1" title={animal.species}>{animal.species}</span>
                              <Button variant="destructive" size="icon" className="absolute -top-2 -right-2 h-6 w-6 p-1 rounded-full" onClick={(e) => { e.stopPropagation(); removeDndAnimal(animal.id); }}><Minus size={14} /></Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </DropZone>
                  </CardContent>
                </Card>
              )}
              {currentStep === 3 && (
                 <Card>
                   <CardHeader><CardTitle>Review & Submit</CardTitle><CardDescription>Review scenario before submission.</CardDescription></CardHeader>
                   <CardContent className="space-y-6 h-[calc(100vh-200px)] overflow-y-auto pretty-scrollbar">
                     <div><h3 className="text-lg font-semibold mb-2">Fixed Context:</h3><p className="text-sm text-muted-foreground p-4 bg-muted rounded-md">An AI faces an inevitable accident. Its algorithm must choose between outcomes.</p></div>
                     <Separator />
                     {isSubmitting ? (
                       <div className="mt-6 space-y-3">{backendProviders.map((key) => <ProviderProgressDisplay key={key} providerKey={key} progress={providerProgress[key] || { status: "pending", message: "Queued", progressValue: 0 }} toggleExpansion={() => toggleProviderResponseExpansion(key)} />)}</div>
                     ) : ( <ScenarioPreview humans={selectionMode === 'dnd' ? dndHumans : humans} animals={selectionMode === 'dnd' ? dndAnimals : animals} includeAnimals={includeAnimals} /> )}
                   </CardContent>
                 </Card>
              )}
            </div>
          </div>
        </DndContext>
      );
    }

    switch (currentStep) {
      case 1:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-[calc(100vh-180px)] overflow-y-auto pr-2 pretty-scrollbar">
              <Card>
              <CardHeader><CardDescription>Define the characteristics of the humans involved.</CardDescription></CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" onClick={() => handleHumanCountChange(humanCount - 1)} disabled={humanCount <= 0}><Minus className="h-4 w-4" /></Button>
                    <Input type="number" value={humanCount} readOnly className="w-16 text-center tabular-nums" />
                    <Button variant="outline" size="icon" onClick={() => handleHumanCountChange(humanCount + 1)} disabled={humanCount >= 10}><Plus className="h-4 w-4" /></Button>
                    <Label className="ml-2">Number of Humans (0-10)</Label>
                  </div>
                  {humanCount > 0 && <div className="flex items-center space-x-2"><Switch id="same-human-characteristics" checked={!sameHumanCharacteristics} onCheckedChange={(checked) => setSameHumanCharacteristics(!checked)} /><Label htmlFor="same-human-characteristics">Customize each human individually</Label></div>}
                  
                  {humanCount > 0 && sameHumanCharacteristics && humans[0] && (
                    <HumanConfig key={humans[0].id || `human-0`} index={0} human={humans[0]} updateHuman={updateHuman} showTooltip={showTooltip} setShowTooltip={setShowTooltip} />
                  )}
                  {humanCount > 0 && !sameHumanCharacteristics && humans.slice(0, humanCount).map((human, index) => human ? (
                    <HumanConfig key={human.id || `human-${index}`} index={index} human={human} updateHuman={updateHuman} showTooltip={showTooltip} setShowTooltip={setShowTooltip} />
                  ) : null)}
                </CardContent>
              </Card>
            </div>
            {humans.length > 0 && (
              <div className="hidden lg:block lg:col-span-1">
                <div className="sticky top-24">
                  <ScenarioPreview humans={humans} animals={animals} includeAnimals={includeAnimals} />
                </div>
              </div>
            )}
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-[calc(100vh-180px)] overflow-y-auto pr-2 pretty-scrollbar">
              <Card>
                <CardHeader><CardDescription>Define the species of the animals.</CardDescription></CardHeader>
                <CardContent className="space-y-6">
                  <Separator />
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" onClick={() => updateAnimalCount(animalCount - 1)} disabled={animalCount <= 0}><Minus className="h-4 w-4" /></Button>
                    <Input type="number" value={animalCount} readOnly className="w-16 text-center tabular-nums" />
                    <Button variant="outline" size="icon" onClick={() => updateAnimalCount(animalCount + 1)} disabled={animalCount >= 10}><Plus className="h-4 w-4" /></Button>
                    <Label className="ml-2">Number of Animals (0-10)</Label>
                  </div>
                  {animalCount > 0 && <div className="flex items-center space-x-2"><Switch id="same-animal-species" checked={!sameAnimalSpecies} onCheckedChange={(checked) => setSameAnimalSpecies(!checked)} /><Label htmlFor="same-animal-species">Customize each animal individually</Label></div>}
                  <Separator />
                  {animalCount > 0 && sameAnimalSpecies && animals[0] && (
                    <AnimalConfig key={animals[0].id || `animal-0`} index={0} animal={animals[0]} updateAnimal={updateAnimal} />
                  )}
                  {animalCount > 0 && !sameAnimalSpecies && animals.slice(0, animalCount).map((animal, index) => animal ? (
                    <AnimalConfig key={animal.id || `animal-${index}`} index={index} animal={animal} updateAnimal={updateAnimal} />
                  ) : null)}
                </CardContent>
              </Card>
            </div>
            {(humans.length > 0 || (includeAnimals && animals.length > 0)) && (
              <div className="hidden lg:block lg:col-span-1">
                 <div className="sticky top-24">
                    <ScenarioPreview humans={humans} animals={animals} includeAnimals={includeAnimals} />
                 </div>
              </div>
            )}
          </div>
        );
      case 3:
        return (
          <div className="max-w-3xl mx-auto h-[calc(100vh-180px)] overflow-y-auto pr-2 pretty-scrollbar">
            <Card>
              <CardHeader><CardTitle>Review & Submit</CardTitle><CardDescription>Review scenario before submission.</CardDescription></CardHeader>
              <CardContent className="space-y-6">
                <div><h3 className="text-lg font-semibold mb-2">Fixed Context:</h3><p className="text-sm text-muted-foreground p-4 bg-muted rounded-md">An AI faces an inevitable accident. Its decision algorithm must choose between outcomes.</p></div>
                <Separator />
                {isSubmitting ? (
                  <div className="mt-6">{backendProviders.map((providerKey) => <ProviderProgressDisplay key={providerKey} providerKey={providerKey} progress={providerProgress[providerKey] || { status: "pending", message: "Queued", progressValue: 0 }} toggleExpansion={() => toggleProviderResponseExpansion(providerKey)} />)}</div>
                ) : ( <ScenarioPreview humans={humans} animals={animals} includeAnimals={includeAnimals} /> )}
              </CardContent>
            </Card>
          </div>
        );
      default: return <div>Invalid Step</div>;
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-24 px-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Create an Existential Dilemma</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setSelectionMode(prev => prev === 'form' ? 'dnd' : 'form')}>
            Switch to {selectionMode === 'form' ? 'Drag & Drop' : 'Form Input'} Mode
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setShowHelp(true)} className="flex items-center gap-1.5"><HelpCircle size={16} /> Help</Button>
        </div>
      </div>
      <StepIndicator />
      <HelpDialog />
      <div className={`${selectionMode === 'dnd' ? '' : 'max-w-3xl mx-auto'}`}>
        {renderStepContent()}
      </div>

      {!isSubmitting && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-t border-border shadow-lg">
          <div className="container mx-auto px-4 md:px-8 flex justify-between items-center h-20">
            <Button
              onClick={handlePrevStep}
              disabled={currentStep === 1 || isSubmitting}
              variant="outline"
              className="flex items-center gap-2 text-lg px-6 py-3"
            >
              <ChevronLeft size={20} />
              Back
            </Button>
            {currentStep === totalSteps ? (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || (selectionMode === 'form' && humans.length === 0 && (!includeAnimals || animals.length === 0)) || (selectionMode === 'dnd' && dndHumans.length === 0 && (!includeAnimals || dndAnimals.length === 0))}
                variant="success"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-3"
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <Sparkles size={18} /> Generate AI Ethics Analysis
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={handleNextStep}
                disabled={!validateStep(currentStep) || isSubmitting}
                variant="actionPrimary"
                className="flex items-center gap-2 text-lg px-6 py-3"
              >
                Continue <ArrowRight size={20} />
              </Button>
            )}
          </div>
        </div>
      )}

      {editingHuman && (
        <Dialog open={!!editingHuman} onOpenChange={() => setEditingHuman(null)}>
          <DialogContent className="sm:max-w-lg"><DialogHeader><DialogTitle>Edit Human Details</DialogTitle></DialogHeader>
            <HumanConfigWrapper 
              humanToEdit={editingHuman} 
              onSave={(updatedHuman) => { 
                const isDndHuman = dndHumans.some(h => h.id === updatedHuman.id);
                if (isDndHuman) {
                  setDndHumans(dndHumans.map(h => h.id === updatedHuman.id ? updatedHuman : h));
                } else {
                  setHumans(humans.map(h => h.id === updatedHuman.id ? updatedHuman : h)); 
                }
                setEditingHuman(null); 
                toast.success("Human details updated!"); 
              }} 
              onCancel={() => setEditingHuman(null)}
            />
          </DialogContent>
        </Dialog>
      )}
      {editingAnimal && (
        <Dialog open={!!editingAnimal} onOpenChange={() => setEditingAnimal(null)}>
          <DialogContent className="sm:max-w-lg"><DialogHeader><DialogTitle>Edit Animal Details</DialogTitle></DialogHeader>
            <AnimalConfigWrapper 
              animalToEdit={editingAnimal} 
              onSave={(updatedAnimal) => { 
                const isDndAnimal = dndAnimals.some(a => a.id === updatedAnimal.id);
                if (isDndAnimal) {
                  setDndAnimals(dndAnimals.map(a => a.id === updatedAnimal.id ? updatedAnimal : a));
                } else {
                  setAnimals(animals.map(a => a.id === updatedAnimal.id ? updatedAnimal : a));
                }
                setEditingAnimal(null); 
                toast.success("Animal details updated!"); 
              }} 
              onCancel={() => setEditingAnimal(null)}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

interface HumanConfigWrapperProps {
  humanToEdit: Human;
  onSave: (human: Human) => void;
  onCancel: () => void;
}
const HumanConfigWrapper: React.FC<HumanConfigWrapperProps> = ({ humanToEdit, onSave, onCancel }) => {
  const [editableHuman, setEditableHuman] = useState<Human>(humanToEdit);
  const [showTooltip, setShowTooltip] = useState<string | null>(null);

  useEffect(() => {
    setEditableHuman(humanToEdit);
  }, [humanToEdit]);

  const handleUpdate = (field: keyof Human, value: any) => {
    setEditableHuman(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4 py-4">
      <HumanConfig 
        index={0}
        human={editableHuman} 
        updateHuman={(idx, field, value) => handleUpdate(field, value)} 
        showTooltip={showTooltip}
        setShowTooltip={setShowTooltip}
      />
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onSave(editableHuman)}>Save Changes</Button>
      </div>
    </div>
  );
}

interface AnimalConfigWrapperProps {
  animalToEdit: Animal;
  onSave: (animal: Animal) => void;
  onCancel: () => void;
}
const AnimalConfigWrapper: React.FC<AnimalConfigWrapperProps> = ({ animalToEdit, onSave, onCancel }) => {
  const [editableAnimal, setEditableAnimal] = useState<Animal>(animalToEdit);

  useEffect(() => {
    setEditableAnimal(animalToEdit);
  }, [animalToEdit]);

  const handleUpdate = (field: keyof Animal, value: any) => {
    setEditableAnimal(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-4 py-4">
      <AnimalConfig 
        index={0}
        animal={editableAnimal} 
        updateAnimal={(idx, field, value) => handleUpdate(field, value)} 
      />
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button onClick={() => onSave(editableAnimal)}>Save Changes</Button>
      </div>
    </div>
  );
}

export default CreateScenario;
