import React from "react";
import { Human, Animal } from "@/types";
import { AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import versusImage from "@/assets/versus.png"; // Import the versus image

interface ScenarioPreviewProps {
  humans: Human[];
  animals: Animal[];
  includeAnimals: boolean;
}

const ScenarioPreview = ({
  humans,
  animals,
  includeAnimals,
}: ScenarioPreviewProps) => {
  const getHumanIcon = (human: Human) => {
    let bgColorClass = "bg-card";

    // Priority 0: Health Status Emojis (as top visual priority)
    if (human.healthStatus === 'healthy') {
      // This function is expected to return JSX for the icon part only.
      // The outer structure in ScenarioPreview handles the rest.
      return <span className="text-2xl">😀</span>;
    }
    if (human.healthStatus === 'sick') {
      return <span className="text-2xl">🤒</span>;
    }
    // Note: The original `palette-healthy` and `palette-sick` via `details` field is now fully replaced by `healthStatus`.

    let emojiChar: string | null = null; // To hold the chosen emoji character for other cases

    // Priority 1: Political Emojis
    switch (human.politics) {
      case "Anarchist": emojiChar = "🏴"; break;
      case "Communist": emojiChar = "⚒️"; break;
      case "Socialist": emojiChar = "🌹"; break;
      case "Social-Democrat": emojiChar = "🤝"; break;
      case "Centrist": emojiChar = "🏛️"; break;
      case "liberal/neoliberal": emojiChar = "📈"; break;
      case "conservative": emojiChar = "🛡️"; break;
      case "reactionary": emojiChar = "⏪"; break;
      case "alt-right": emojiChar = "🐸"; break;
      case "fascist": emojiChar = "☠️"; break;
    }

    // Priority 2: Nationality/Regional Emojis
    if (!emojiChar) {
      switch (human.nationality) {
        case "UnitedStatian": emojiChar = "🇺🇸"; break;
        case "south-american": emojiChar = "🇧🇷"; break;
        case "european": emojiChar = "🇪🇺"; break;
        case "chinese": emojiChar = "🇨🇳"; break;
        case "african": emojiChar = "🌍"; break; // Updated
        case "east-asian": emojiChar = "🏯"; break;
        case "south-asian": emojiChar = "🛕"; break;
        case "middle-eastern": emojiChar = "🕌"; break;
        case "north-american": emojiChar = "🍔"; break; // Updated
      }
    }

    // Priority 3: Special Combinations & Gendered Productive
    if (!emojiChar) {
      if (human.fitness === "fit and beautiful" && human.legalStatus === "criminal") {
        emojiChar = "🥷"; // Fit Criminal
      } else if (human.socialValue === "productive") {
        if (human.gender === "male") emojiChar = "👔"; // Productive Man
        else if (human.gender === "female") emojiChar = "👩‍🔧"; // Productive Woman
        else emojiChar = "💼"; // Productive (default/undefined gender)
      }
    }

    // Priority 4: Explicit descriptive characteristics (fitness, legal, social - excluding productive/fit criminal)
    if (!emojiChar) {
      if (human.fitness === "fit and beautiful") { // Fit (but not criminal)
        if (human.gender === "male") emojiChar = "🏋️‍♂️";
        else if (human.gender === "female") emojiChar = "🏃‍♀️";
        else emojiChar = "💪";
      } else if (human.legalStatus === "criminal") { // Criminal (but not fit)
        emojiChar = "🔫";
      } else if (human.socialValue === "homeless") {
        emojiChar = "🏚️";
      // "productive" and "criminal" (as part of fit criminal) handled by Priority 3
      } else if (human.legalStatus === "law-abiding") {
        emojiChar = "⚖️";
      }
    }

    // Priority 5: Age/Gender defaults
    if (!emojiChar) {
      if (human.age === "child") {
        emojiChar = "👶";
      } else if (human.age === "adult") {
        if (human.gender === "male") emojiChar = "👨";
        else if (human.gender === "female") emojiChar = "👩";
        else emojiChar = Math.random() < 0.5 ? "👨" : "👩";
      } else if (human.age === "elderly") {
        if (human.gender === "male") emojiChar = "👴";
        else if (human.gender === "female") emojiChar = "👵";
        else emojiChar = Math.random() < 0.5 ? "👴" : "👵";
      } else if (human.age === "undefined") {
        if (human.gender === "male") emojiChar = "👨";
        else if (human.gender === "female") emojiChar = "👩";
      }
    }

    // Final Fallback
    if (!emojiChar) {
      emojiChar = "👤";
    }

    // Determine label based on hierarchy
    let displayLabel = "Human"; // Default label
    if (human.politics && human.politics !== "undefined") {
      displayLabel = human.politics;
    } else if (human.gender && human.gender !== "undefined" && human.age && human.age !== "undefined") {
      displayLabel = `${human.gender.charAt(0).toUpperCase() + human.gender.slice(1)} ${human.age}`;
    } else if (human.gender && human.gender !== "undefined" && human.healthStatus && human.healthStatus !== "undefined") {
      displayLabel = `${human.gender.charAt(0).toUpperCase() + human.gender.slice(1)} ${human.healthStatus}`;
    } else if (human.age && human.age !== "undefined") {
      displayLabel = human.age.charAt(0).toUpperCase() + human.age.slice(1);
    } else if (human.gender && human.gender !== "undefined") {
      displayLabel = human.gender.charAt(0).toUpperCase() + human.gender.slice(1);
    } else if (human.fitness && human.fitness !== "undefined") {
      displayLabel = human.fitness === "fit and beautiful" ? "Fit" : "Unfit";
    } else if (human.socialValue && human.socialValue !== "undefined") {
      displayLabel = human.socialValue.charAt(0).toUpperCase() + human.socialValue.slice(1);
    }

    return (
      <div
        className={`flex flex-col items-center justify-center p-2 rounded-lg ${bgColorClass} shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-help`}
        title={`${human.age} ${human.gender}${human.healthStatus && human.healthStatus !== "undefined" ? `, Health: ${(human.healthStatus as string).charAt(0).toUpperCase() + (human.healthStatus as string).slice(1)}` : ""}, fitness: ${human.fitness}, ${human.socialValue}, ${human.legalStatus}${human.nationality && human.nationality !== "undefined" ? `, Nat: ${human.nationality}` : ""}${human.politics && human.politics !== "undefined" ? `, Pol: ${human.politics}` : ""}${human.details ? `, ${human.details}` : ""}`}
      >
        <span className="text-2xl">
          {emojiChar}
        </span>
        <span className="text-xs mt-1 font-medium capitalize">
          {displayLabel}
        </span>
      </div>
    );
  };

  const getAnimalIcon = (animal: Animal) => {
    let emoji = "🐾"; // Default: Paw print
    switch (animal.species) {
      case "cat":
        emoji = "🐈";
        break;
      case "dog":
        emoji = "🐕";
        break;
      case "dolphin":
      case "bottlenose_dolphin":
        emoji = "🐬";
        break;
      case "panda":
        emoji = "🐼";
        break;
      case "elephant":
        emoji = "🐘";
        break;
      case "deer":
        emoji = "🦌";
        break;
      case "bird":
      case "eurasian_magpie":
      case "new_caledonian_crow":
        emoji = "🐦";
        break;
      case "mosquito":
        emoji = "🦟";
        break;
      case "rat":
      case "brown_rat":
        emoji = "🐀";
        break;
      case "cockroach":
        emoji = "🪳";
        break;
      case "wasp":
      case "honey_bee":
        /* Using general bee for honey_bee too */ emoji = "🐝";
        break;
      case "tick":
        emoji = "🐛";
        break; // Fallback for tick
      case "snake":
        emoji = "🐍";
        break;
      case "fish":
      case "cleaner_wrasse_fish":
      case "mudskipper_fish":
      case "zebrafish":
        emoji = "🐟";
        break;
      case "goldfish":
        emoji = "🐠";
        break;
      case "sheep":
        emoji = "🐑";
        break;
      case "duck":
        emoji = "🦆";
        break;
      case "frog":
        emoji = "🐸";
        break;

      // New additions from the list
      case "basalt_rock":
        emoji = "🪨";
        break;
      case "virus":
        emoji = "🦠";
        break;
      case "sea_sponge":
        emoji = "🧽";
        break;
      case "slime_mold":
        emoji = "🍄";
        break;
      case "jellyfish":
        emoji = "🪼";
        break;
      case "hydra":
        emoji = "🐙";
        break; // Tentative for Hydra
      case "sea_star":
        emoji = "⭐";
        break;
      case "planarian_flatworm":
      case "roundworm":
      case "tapeworm":
        emoji = "🪱";
        break;
      case "giant_clam":
        emoji = "🦪";
        break;
      case "fruit_fly":
        emoji = "🪰";
        break;
      case "jumping_spider":
        emoji = "🕷️";
        break;
      case "ant":
        emoji = "🐜";
        break;
      // honey_bee covered above with wasp
      // paper_wasp not added to select, covered by general wasp
      case "green_anole_lizard":
      case "monitor_lizard":
        emoji = "🦎";
        break;
      case "pigeon":
        emoji = "🕊️";
        break;
      case "african_grey_parrot":
        emoji = "🦜";
        break;
      case "capuchin_monkey":
      case "chimpanzee":
      case "bonobo":
        emoji = "🐒";
        break;
      case "raccoon":
        emoji = "🦝";
        break;
      case "pig":
        emoji = "🐖";
        break;
      case "grey_wolf":
        emoji = "🐺";
        break;
      case "common_octopus":
        emoji = "🐙";
        break;
      case "common_cuttlefish":
        emoji = "🦑";
        break;
      case "orca":
      case "sperm_whale":
      case "blue_whale":
        emoji = "🐳";
        break;
      case "gorilla":
        emoji = "🦍";
        break;
      case "orangutan":
        emoji = "🦧";
        break;
      case "neanderthal":
      case "homo_erectus":
        emoji = "👣";
        break;
    }

    // Background color - Use card background for theme consistency
    let bgColorClass = "bg-card";

    return (
      <div
        className={`flex flex-col items-center justify-center p-2 rounded-lg ${bgColorClass} shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-help`}
        title={`${animal.species}${animal.details ? `, ${animal.details}` : ""}`}
      >
        {/* Replaced Dog icon with emoji */}
        <span className="text-2xl">{emoji}</span>
        <span className="text-xs mt-1 font-medium capitalize">
          {animal.species}
        </span>
      </div>
    );
  };

  return (
    <Card className="w-full overflow-hidden border-2 border-gray-200 shadow-card hover:shadow-card-hover transition-shadow duration-300">
      <CardContent className="p-4">
        <h3 className="font-semibold mb-4 text-center text-lg">
          Scenario Preview
        </h3>

        {/* Removed absolute road background */}
        <div className="space-y-4 animate-fade-in">
          {/* Robot Section - Aligned Left */}
          <div className="flex justify-start relative z-10 pl-4">
            <span className="text-6xl">🤖</span>
          </div>

          {/* Divider Section with VS */}
          <div className="relative flex justify-center items-center py-2">
            {" "}
            {/* Container for line and VS */}
            {/* Yellow Line */}
            <div className="w-full h-1 bg-yellow-400"></div>
            {/* VS Image Wrapper for Background Masking */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card p-1">
              {" "}
              {/* Changed bg-background to bg-card */}
              <img
                src={versusImage}
                alt="Versus"
                className="h-14 w-auto block" /* Increased size from h-10 to h-14 */
              />
            </div>
          </div>

          {/* Subjects Section - Aligned Right */}
          <div className="flex flex-col items-end pr-4 space-y-4">
            {" "}
            {/* Align content to the right, add padding */}
            {/* Combined Humans display */}
            {humans.length > 0 && (
              <div className="w-full bg-card/80 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-border/50 animate-scale-in">
                <h4 className="text-sm font-medium mb-2 flex justify-end items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-gray-500 mr-1.5"></span>
                  Humans:
                </h4>
                <div className="flex flex-wrap gap-2 justify-end">
                  {" "}
                  {/* Align icons to the right */}
                  {humans.map((human, index) => (
                    <div
                      key={human.id || index}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {getHumanIcon(human)}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Animals */}
            {includeAnimals && animals.length > 0 && (
              <div
                className="w-full bg-card/80 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-border/50 animate-scale-in"
                style={{ animationDelay: "100ms" }}
              >
                <h4 className="text-sm font-medium mb-2 flex justify-end items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-yellow-500 mr-1.5"></span>
                  Other Creatures:
                </h4>
                <div className="flex flex-wrap gap-2 justify-end">
                  {" "}
                  {/* Align icons to the right */}
                  {animals.map((animal, index) => (
                    <div
                      key={animal.id || index}
                      className="animate-fade-in"
                      style={{
                        animationDelay: `${(index + humans.length) * 100}ms`,
                      }}
                    >
                      {getAnimalIcon(animal)}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ScenarioPreview;
