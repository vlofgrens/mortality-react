import { PaletteItem } from '@/components/dnd/EmojiPalette';

export const humanPaletteItems: PaletteItem[] = [
  // Age & Gender
  { baseId: 'human-child', emoji: '👶', label: 'Child', type: 'human', data: { age: 'child' }, category: 'Age & Gender' },
  { baseId: 'human-adult-m', emoji: '👨', label: 'Adult Male', type: 'human', data: { age: 'adult', gender: 'male' }, category: 'Age & Gender' },
  { baseId: 'human-adult-f', emoji: '👩', label: 'Adult Female', type: 'human', data: { age: 'adult', gender: 'female' }, category: 'Age & Gender' },
  { baseId: 'human-elderly-m', emoji: '👴', label: 'Elderly Male', type: 'human', data: { age: 'elderly', gender: 'male' }, category: 'Age & Gender' },
  { baseId: 'human-elderly-f', emoji: '👵', label: 'Elderly Female', type: 'human', data: { age: 'elderly', gender: 'female' }, category: 'Age & Gender' },
  
  // Health & Fitness
  { baseId: 'human-healthy', emoji: '😀', label: 'Healthy', type: 'human', data: { healthStatus: 'healthy' }, category: 'Health & Fitness' },
  { baseId: 'human-sick', emoji: '🤒', label: 'Sick/Infirm', type: 'human', data: { healthStatus: 'sick' }, category: 'Health & Fitness' },
  { baseId: 'human-fit', emoji: '💪', label: 'Fit', type: 'human', data: { fitness: 'fit and beautiful' }, category: 'Health & Fitness' },
  { baseId: 'human-unfit', emoji: '🍔', label: 'Unfit', type: 'human', data: { fitness: 'obese and ugly' }, category: 'Health & Fitness' },

  // Societal & Legal Status
  { baseId: 'human-productive', emoji: '💼', label: 'Productive', type: 'human', data: { socialValue: 'productive' }, category: 'Societal & Legal Status' },
  { baseId: 'human-homeless', emoji: '🏚️', label: 'Homeless', type: 'human', data: { socialValue: 'homeless' }, category: 'Societal & Legal Status' },
  { baseId: 'human-criminal', emoji: '🔫', label: 'Criminal', type: 'human', data: { legalStatus: 'criminal' }, category: 'Societal & Legal Status' },
  { baseId: 'human-law-abiding', emoji: '⚖️', label: 'Law-abiding', type: 'human', data: { legalStatus: 'law-abiding' }, category: 'Societal & Legal Status' },
  { baseId: 'human-prod-m', emoji: '👔', label: 'Prod. Man', type: 'human', data: { socialValue: 'productive', gender: 'male', age: 'adult' }, category: 'Societal & Legal Status' },
  { baseId: 'human-prod-f', emoji: '👩‍🔧', label: 'Prod. Woman', type: 'human', data: { socialValue: 'productive', gender: 'female', age: 'adult' }, category: 'Societal & Legal Status' },
  { baseId: 'human-fit-crim', emoji: '🥷', label: 'Fit Criminal', type: 'human', data: { fitness: 'fit and beautiful', legalStatus: 'criminal', age: 'adult' }, category: 'Societal & Legal Status' },
  
  // Nationality
  { baseId: 'human-us', emoji: '🇺🇸', label: 'American (US)', type: 'human', data: { nationality: 'UnitedStatian' }, category: 'Nationality' },
  { baseId: 'human-south-american', emoji: '🇧🇷', label: 'South American', type: 'human', data: { nationality: 'south-american' }, category: 'Nationality' },
  { baseId: 'human-european', emoji: '🇪🇺', label: 'European', type: 'human', data: { nationality: 'european' }, category: 'Nationality' },
  { baseId: 'human-chinese', emoji: '🇨🇳', label: 'Chinese', type: 'human', data: { nationality: 'chinese' }, category: 'Nationality' },
  { baseId: 'human-african', emoji: '🌍', label: 'African', type: 'human', data: { nationality: 'african' }, category: 'Nationality' },
  { baseId: 'human-east-asian', emoji: '🏯', label: 'East Asian', type: 'human', data: { nationality: 'east-asian' }, category: 'Nationality' },
  { baseId: 'human-south-asian', emoji: '🛕', label: 'South Asian', type: 'human', data: { nationality: 'south-asian' }, category: 'Nationality' },
  { baseId: 'human-middle-eastern', emoji: '🕌', label: 'Middle Eastern', type: 'human', data: { nationality: 'middle-eastern' }, category: 'Nationality' },
  { baseId: 'human-north-american', emoji: '🍔', label: 'North American', type: 'human', data: { nationality: 'north-american' }, category: 'Nationality' },

  // Political Alignment
  { baseId: 'human-anarchist', emoji: '🏴', label: 'Anarchist', type: 'human', data: { politics: 'Anarchist' }, category: 'Political Alignment' },
  { baseId: 'human-communist', emoji: '⚒️', label: 'Communist', type: 'human', data: { politics: 'Communist' }, category: 'Political Alignment' },
  { baseId: 'human-socialist', emoji: '🌹', label: 'Socialist', type: 'human', data: { politics: 'Socialist' }, category: 'Political Alignment' },
  { baseId: 'human-social-democrat', emoji: '🤝', label: 'Social Democrat', type: 'human', data: { politics: 'Social-Democrat' }, category: 'Political Alignment' },
  { baseId: 'human-centrist', emoji: '🏛️', label: 'Centrist', type: 'human', data: { politics: 'Centrist' }, category: 'Political Alignment' },
  { baseId: 'human-liberal', emoji: '📈', label: 'Liberal/ Neoliberal', type: 'human', data: { politics: 'liberal/neoliberal' }, category: 'Political Alignment' },
  { baseId: 'human-conservative', emoji: '🛡️', label: 'Conservative', type: 'human', data: { politics: 'conservative' }, category: 'Political Alignment' },
  { baseId: 'human-reactionary', emoji: '⏪', label: 'Reactionary', type: 'human', data: { politics: 'reactionary' }, category: 'Political Alignment' },
  { baseId: 'human-alt-right', emoji: '🐸', label: 'Alt-Right', type: 'human', data: { politics: 'alt-right' }, category: 'Political Alignment' },
  { baseId: 'human-fascist', emoji: '☠️', label: 'Fascist', type: 'human', data: { politics: 'fascist' }, category: 'Political Alignment' },

  // General
  { baseId: 'human-undefined', emoji: '👤', label: 'Undefined Human', type: 'human', data: { age: 'undefined', gender: 'undefined' }, category: 'General' },
];

export const animalPaletteItems: PaletteItem[] = [
  { baseId: 'animal-dog', emoji: '🐕', label: 'Dog', type: 'animal', data: { species: 'dog' } },
  { baseId: 'animal-cat', emoji: '🐈', label: 'Cat', type: 'animal', data: { species: 'cat' } },
  { baseId: 'animal-dolphin', emoji: '🐬', label: 'Dolphin', type: 'animal', data: { species: 'dolphin' } },
  { baseId: 'animal-panda', emoji: '🐼', label: 'Panda', type: 'animal', data: { species: 'panda' } },
  { baseId: 'animal-elephant', emoji: '🐘', label: 'Elephant', type: 'animal', data: { species: 'elephant' } },
  { baseId: 'animal-deer', emoji: '🦌', label: 'Deer', type: 'animal', data: { species: 'deer' } },
  { baseId: 'animal-bird', emoji: '🐦', label: 'Bird/Sparrow', type: 'animal', data: { species: 'bird' } },
  { baseId: 'animal-mosquito', emoji: '🦟', label: 'Mosquito', type: 'animal', data: { species: 'mosquito' } },
  { baseId: 'animal-rat', emoji: '🐀', label: 'Rat', type: 'animal', data: { species: 'rat' } },
  { baseId: 'animal-cockroach', emoji: '🪳', label: 'Cockroach', type: 'animal', data: { species: 'cockroach' } },
  { baseId: 'animal-wasp', emoji: '🐝', label: 'Wasp', type: 'animal', data: { species: 'wasp' } }, // Generic Wasp/Bee
  { baseId: 'animal-tick', emoji: '🐛', label: 'Tick', type: 'animal', data: { species: 'tick' } },
  { baseId: 'animal-snake', emoji: '🐍', label: 'Snake', type: 'animal', data: { species: 'snake' } },
  { baseId: 'animal-fish', emoji: '🐟', label: 'Fish', type: 'animal', data: { species: 'fish' } },
  { baseId: 'animal-goldfish', emoji: '🐠', label: 'Goldfish', type: 'animal', data: { species: 'goldfish' } },
  { baseId: 'animal-sheep', emoji: '🐑', label: 'Sheep', type: 'animal', data: { species: 'sheep' } },
  { baseId: 'animal-duck', emoji: '🦆', label: 'Duck', type: 'animal', data: { species: 'duck' } },
  { baseId: 'animal-frog', emoji: '🐸', label: 'Frog', type: 'animal', data: { species: 'frog' } },
  { baseId: 'animal-basalt_rock', emoji: '🪨', label: 'Basalt Rock', type: 'animal', data: { species: 'basalt_rock' } }, // Technically animal in context
  { baseId: 'animal-virus', emoji: '🦠', label: 'Virus', type: 'animal', data: { species: 'virus' } },
  { baseId: 'animal-sea_sponge', emoji: '🧽', label: 'Sea Sponge', type: 'animal', data: { species: 'sea_sponge' } },
  { baseId: 'animal-slime_mold', emoji: '🍄', label: 'Slime Mold', type: 'animal', data: { species: 'slime_mold' } },
  { baseId: 'animal-jellyfish', emoji: '🪼', label: 'Jellyfish', type: 'animal', data: { species: 'jellyfish' } },
  { baseId: 'animal-hydra', emoji: '🐙', label: 'Hydra', type: 'animal', data: { species: 'hydra' } }, // Using octopus as proxy for visual
  { baseId: 'animal-sea_star', emoji: '⭐', label: 'Sea Star', type: 'animal', data: { species: 'sea_star' } },
  { baseId: 'animal-planarian_flatworm', emoji: '🪱', label: 'Flatworm', type: 'animal', data: { species: 'planarian_flatworm' } }, // Generic worm
  { baseId: 'animal-giant_clam', emoji: '🦪', label: 'Giant Clam', type: 'animal', data: { species: 'giant_clam' } },
  { baseId: 'animal-fruit_fly', emoji: '🪰', label: 'Fruit Fly', type: 'animal', data: { species: 'fruit_fly' } },
  { baseId: 'animal-jumping_spider', emoji: '🕷️', label: 'Jumping Spider', type: 'animal', data: { species: 'jumping_spider' } },
  { baseId: 'animal-ant', emoji: '🐜', label: 'Ant', type: 'animal', data: { species: 'ant' } },
  { baseId: 'animal-green_anole_lizard', emoji: '🦎', label: 'Lizard', type: 'animal', data: { species: 'green_anole_lizard' } }, // Generic lizard
  { baseId: 'animal-pigeon', emoji: '🕊️', label: 'Pigeon', type: 'animal', data: { species: 'pigeon' } },
  { baseId: 'animal-african_grey_parrot', emoji: '🦜', label: 'Parrot', type: 'animal', data: { species: 'african_grey_parrot' } },
  { baseId: 'animal-capuchin_monkey', emoji: '🐒', label: 'Monkey', type: 'animal', data: { species: 'capuchin_monkey' } }, // Generic monkey
  { baseId: 'animal-raccoon', emoji: '🦝', label: 'Raccoon', type: 'animal', data: { species: 'raccoon' } },
  { baseId: 'animal-pig', emoji: '🐖', label: 'Pig', type: 'animal', data: { species: 'pig' } },
  { baseId: 'animal-grey_wolf', emoji: '🐺', label: 'Wolf', type: 'animal', data: { species: 'grey_wolf' } },
  { baseId: 'animal-common_octopus', emoji: '🐙', label: 'Octopus', type: 'animal', data: { species: 'common_octopus' } },
  { baseId: 'animal-common_cuttlefish', emoji: '🦑', label: 'Cuttlefish', type: 'animal', data: { species: 'common_cuttlefish' } },
  { baseId: 'animal-orca', emoji: '🐳', label: 'Orca', type: 'animal', data: { species: 'orca' } }, // Generic whale
  { baseId: 'animal-gorilla', emoji: '🦍', label: 'Gorilla', type: 'animal', data: { species: 'gorilla' } },
  { baseId: 'animal-orangutan', emoji: '🦧', label: 'Orangutan', type: 'animal', data: { species: 'orangutan' } },
  { baseId: 'animal-neanderthal', emoji: '👣', label: 'Neanderthal', type: 'animal', data: { species: 'neanderthal' } }, // Technically animal in context
]; 