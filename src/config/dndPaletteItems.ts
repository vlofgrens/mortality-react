import { PaletteItem } from '@/components/dnd/EmojiPalette';

export const humanPaletteItems: PaletteItem[] = [
  // Age & Gender
  { baseId: 'human-child', emoji: '👶', label: 'Child', type: 'human', data: { age: 'child' }, category: 'Age & Gender', detailedDescription: 'A young human' },
  { baseId: 'human-adult-m', emoji: '👨', label: 'Adult Male', type: 'human', data: { age: 'adult', gender: 'male' }, category: 'Age & Gender', detailedDescription: 'An adult male human' },
  { baseId: 'human-adult-f', emoji: '👩', label: 'Adult Female', type: 'human', data: { age: 'adult', gender: 'female' }, category: 'Age & Gender', detailedDescription: 'An adult female human' },
  { baseId: 'human-elderly-m', emoji: '👴', label: 'Elderly Male', type: 'human', data: { age: 'elderly', gender: 'male' }, category: 'Age & Gender', detailedDescription: 'An elderly male human' },
  { baseId: 'human-elderly-f', emoji: '👵', label: 'Elderly Female', type: 'human', data: { age: 'elderly', gender: 'female' }, category: 'Age & Gender', detailedDescription: 'An elderly female human' },
  
  // Health & Fitness
  { baseId: 'human-healthy', emoji: '😀', label: 'Healthy', type: 'human', data: { healthStatus: 'healthy' }, category: 'Health & Fitness', detailedDescription: 'A healthy human' },
  { baseId: 'human-sick', emoji: '🤒', label: 'Sick/Infirm', type: 'human', data: { healthStatus: 'sick' }, category: 'Health & Fitness', detailedDescription: 'A human who is sick or infirm' },
  { baseId: 'human-fit', emoji: '💪', label: 'Fit', type: 'human', data: { fitness: 'fit and beautiful' }, category: 'Health & Fitness', detailedDescription: 'A physically fit and beautiful human' },
  { baseId: 'human-unfit', emoji: '🍔', label: 'Unfit', type: 'human', data: { fitness: 'obese and ugly' }, category: 'Health & Fitness', detailedDescription: 'An obese and ugly human' },

  // Societal & Legal Status
  { baseId: 'human-productive', emoji: '💼', label: 'Productive', type: 'human', data: { socialValue: 'productive' }, category: 'Societal & Legal Status', detailedDescription: 'A participating and contributing member of society' },
  { baseId: 'human-homeless', emoji: '🏚️', label: 'Homeless', type: 'human', data: { socialValue: 'homeless' }, category: 'Societal & Legal Status', detailedDescription: 'A homeless human, lacking permanent shelter' },
  { baseId: 'human-criminal', emoji: '🔫', label: 'Criminal', type: 'human', data: { legalStatus: 'criminal' }, category: 'Societal & Legal Status', detailedDescription: 'A criminal human, someone who has broken the law' },
  { baseId: 'human-law-abiding', emoji: '⚖️', label: 'Law-abiding', type: 'human', data: { legalStatus: 'law-abiding' }, category: 'Societal & Legal Status', detailedDescription: 'Someone who follows the law' },
  { baseId: 'human-prod-m', emoji: '👔', label: 'Prod. Man', type: 'human', data: { socialValue: 'productive', gender: 'male', age: 'adult' }, category: 'Societal & Legal Status', detailedDescription: 'A productive and contributing male adult' },
  { baseId: 'human-prod-f', emoji: '👩‍🔧', label: 'Prod. Woman', type: 'human', data: { socialValue: 'productive', gender: 'female', age: 'adult' }, category: 'Societal & Legal Status', detailedDescription: 'A productive and contributing female adult' },
  { baseId: 'human-fit-crim', emoji: '🥷', label: 'Fit Criminal', type: 'human', data: { fitness: 'fit and beautiful', legalStatus: 'criminal', age: 'adult' }, category: 'Societal & Legal Status', detailedDescription: 'A fit and beautiful criminal adult (fit like a ninja!)' },
  
  // Nationality
  { baseId: 'human-us', emoji: '🇺🇸', label: 'American (US)', type: 'human', data: { nationality: 'UnitedStatian' }, category: 'Nationality', detailedDescription: 'A citizen of the United States' },
  { baseId: 'human-south-american', emoji: '🇧🇷', label: 'South American', type: 'human', data: { nationality: 'south-american' }, category: 'Nationality', detailedDescription: 'A native of South America' },
  { baseId: 'human-european', emoji: '🇪🇺', label: 'European', type: 'human', data: { nationality: 'european' }, category: 'Nationality', detailedDescription: 'A native of Europe' },
  { baseId: 'human-chinese', emoji: '🇨🇳', label: 'Chinese', type: 'human', data: { nationality: 'chinese' }, category: 'Nationality', detailedDescription: 'A native of China' },
  { baseId: 'human-african', emoji: '🌍', label: 'African', type: 'human', data: { nationality: 'african' }, category: 'Nationality', detailedDescription: 'A native of Africa' },
  { baseId: 'human-east-asian', emoji: '🏯', label: 'East Asian', type: 'human', data: { nationality: 'east-asian' }, category: 'Nationality', detailedDescription: 'A native of East Asia (ex. China, Japan, Korea)' },
  { baseId: 'human-south-asian', emoji: '🛕', label: 'South Asian', type: 'human', data: { nationality: 'south-asian' }, category: 'Nationality', detailedDescription: 'A native of South Asia (ex. India, Pakistan, Bangladesh)' },
  { baseId: 'human-middle-eastern', emoji: '🕌', label: 'Middle Eastern', type: 'human', data: { nationality: 'middle-eastern' }, category: 'Nationality', detailedDescription: 'A native of the Middle East (ex. Saudi Arabia, Iran, Israel, Palestine, etc...)' },
  { baseId: 'human-north-american', emoji: '🍔', label: 'North American', type: 'human', data: { nationality: 'north-american' }, category: 'Nationality', detailedDescription: 'A native of North America (ex. USA, Canada)' },

  // Political Alignment
  { baseId: 'human-anarchist', emoji: '🏴', label: 'Anarchist', type: 'human', data: { politics: 'Anarchist' }, category: 'Political Alignment', detailedDescription: 'Someone who seeks to abolish all unfair hierarchies that perpetuate authority, coercion, or hierarchy, and to replace them with a system of voluntary cooperation and mutual aid.' },
  { baseId: 'human-communist', emoji: '⚒️', label: 'Communist', type: 'human', data: { politics: 'Communist' }, category: 'Political Alignment', detailedDescription: 'Someone who seeks to abolish all private property and replace it with a system of communal ownership and distribution, and to abolish all classes' },
  { baseId: 'human-socialist', emoji: '🌹', label: 'Socialist', type: 'human', data: { politics: 'Socialist' }, category: 'Political Alignment', detailedDescription: 'Someone who seeks to abolish collective ownership and shift the focus from a proft-driven economy to a production that is more equitable and sustainable.' },
  { baseId: 'human-social-democrat', emoji: '🤝', label: 'Social Democrat', type: 'human', data: { politics: 'Social-Democrat' }, category: 'Political Alignment', detailedDescription: 'Someone who, despite still believing in private property and in the capitslist system, seeks to implement social reforms to improve the lives of people within the current system, as well as espousing more progressive ideas and a social safety net.' },
  { baseId: 'human-centrist', emoji: '🏛️', label: 'Centrist', type: 'human', data: { politics: 'Centrist' }, category: 'Political Alignment', detailedDescription: 'Someone who seeks to implement moderate reforms to the current system, while still believing in the importance of private property and the capitalist system' },
  { baseId: 'human-liberal', emoji: '📈', label: 'Liberal/ Neoliberal', type: 'human', data: { politics: 'liberal/neoliberal' }, category: 'Political Alignment', detailedDescription: 'Someone who seeks to maintain the current system, prioritizing ideas espoused by classical liberalism and focusing on individual rights and and the benefits of a free market economy. Is usually in favor of social advances and some level of social progressivism.' },
  { baseId: 'human-conservative', emoji: '🛡️', label: 'Conservative', type: 'human', data: { politics: 'conservative' }, category: 'Political Alignment', detailedDescription: 'Someone who usually supports the current system, prioritizing ideas espoused by conservatism and focusing on the benefits of a free market economy. Is usually in favor of social conservatism and traditional values, rejecting social progressivism and societal change.' },
  { baseId: 'human-reactionary', emoji: '⏪', label: 'Reactionary', type: 'human', data: { politics: 'reactionary' }, category: 'Political Alignment', detailedDescription: 'Someone who rejescts social progressivism and societal change ouright, beliveing that the current status of society has "gone too far" and that it is in need of a return to traditional values and to a previous state of society.' },
  { baseId: 'human-alt-right', emoji: '🐸', label: 'Alt-Right', type: 'human', data: { politics: 'alt-right' }, category: 'Political Alignment', detailedDescription: 'A member of the alt-right, a group of people who are opposed to social progressivism and societal change, and who believe that the current status of society has "gone too far" and that it is in need of a return to traditional values and curtailing of aquired rights. It is an decentralized internet-based segment of the far-right' },
  { baseId: 'human-fascist', emoji: '☠️', label: 'Fascist', type: 'human', data: { politics: 'fascist' }, category: 'Political Alignment', detailedDescription: 'A member of the fascist movement, a system characterized by several key traits, including the cult of tradition, the rejection of modernity, and a focus on violence and power as a justification for the state. Tends to be autocratic and authoritarian, and to focus on the state and identity as the primary source of power and authority.' },

  // General
  { baseId: 'human-undefined', emoji: '👤', label: 'Undefined Human', type: 'human', data: { age: 'undefined', gender: 'undefined' }, category: 'General', detailedDescription: 'A human' },
];

export const animalPaletteItems: PaletteItem[] = [
  { baseId: 'animal-dog', emoji: '🐕', label: 'Dog', type: 'animal', data: { species: 'dog' }, detailedDescription: 'Man\'s best friend' },
  { baseId: 'animal-cat', emoji: '🐈', label: 'Cat', type: 'animal', data: { species: 'cat' }, detailedDescription: 'A small domesticated carnivorous mammal with soft fur' },
  { baseId: 'animal-dolphin', emoji: '🐬', label: 'Dolphin', type: 'animal', data: { species: 'dolphin' }, detailedDescription: 'An aquatic mammal with a streamlined body and a dorsal fin' },
  { baseId: 'animal-panda', emoji: '🐼', label: 'Panda', type: 'animal', data: { species: 'panda' }, detailedDescription: 'The symbol of the World Wildlife Fund, eats a lot of bamboo' },
  { baseId: 'animal-elephant', emoji: '🐘', label: 'Elephant', type: 'animal', data: { species: 'elephant' }, detailedDescription: 'The largest land mammal in the world, with a trunk and tusks' },
  { baseId: 'animal-deer', emoji: '🦌', label: 'Deer', type: 'animal', data: { species: 'deer' }, detailedDescription: 'Bambi' },
  { baseId: 'animal-bird', emoji: '🐦', label: 'Bird/Sparrow', type: 'animal', data: { species: 'bird' }, detailedDescription: 'A modern day dinosaur' },
  { baseId: 'animal-mosquito', emoji: '🦟', label: 'Mosquito', type: 'animal', data: { species: 'mosquito' }, detailedDescription: 'A small, biting insect that can transmit diseases. Considered the deadliest animal in the world' },
  { baseId: 'animal-rat', emoji: '🐀', label: 'Rat', type: 'animal', data: { species: 'rat' }, detailedDescription: 'A common rodent. May look cute but is probably responsible for events such as the black plague' },
  { baseId: 'animal-cockroach', emoji: '🪳', label: 'Cockroach', type: 'animal', data: { species: 'cockroach' }, detailedDescription: 'A common insect. People usually don\'t like them and say that they woulkd survive a nuclear apocalypse' },
  { baseId: 'animal-wasp', emoji: '🐝', label: 'Wasp', type: 'animal', data: { species: 'wasp' }, detailedDescription: 'A common insect. The evil cousin of the bee' }, // Generic Wasp/Bee
  { baseId: 'animal-tick', emoji: '🐛', label: 'Tick', type: 'animal', data: { species: 'tick' }, detailedDescription: 'A small, parasitic arachnid that feeds on the blood of mammals and birds' },
  { baseId: 'animal-snake', emoji: '🐍', label: 'Snake', type: 'animal', data: { species: 'snake' }, detailedDescription: 'The object of one of the most common phobias amongst humans. Theories say that we evolved the ability to recognize snakes faster than other animals because they were so dangerous and deadly.' },
  { baseId: 'animal-fish', emoji: '🐟', label: 'Fish', type: 'animal', data: { species: 'fish' }, detailedDescription: 'A common aquatic animal. Can be found in most aquariums. Present in many Tinder pictures in the US' },
  { baseId: 'animal-goldfish', emoji: '🐠', label: 'Goldfish', type: 'animal', data: { species: 'goldfish' }, detailedDescription: 'A common aquatic animal, famously known for having a short memory, even if these descriptions are exaggerated' },
  { baseId: 'animal-sheep', emoji: '🐑', label: 'Sheep', type: 'animal', data: { species: 'sheep' }, detailedDescription: 'Baaaaaaaaah. Covered in soft wool' },
  { baseId: 'animal-duck', emoji: '🦆', label: 'Duck', type: 'animal', data: { species: 'duck' }, detailedDescription: 'Quack quack' },
  { baseId: 'animal-frog', emoji: '🐸', label: 'Frog', type: 'animal', data: { species: 'frog' }, detailedDescription: 'Croak croak' },
  { baseId: 'animal-basalt_rock', emoji: '🪨', label: 'Basalt Rock', type: 'animal', data: { species: 'basalt_rock' }, detailedDescription: 'I mean, it\'s a rock. It\'s not an animal.' }, // Technically animal in context
  { baseId: 'animal-virus', emoji: '🦠', label: 'Virus', type: 'animal', data: { species: 'virus' }, detailedDescription: 'A microscopic life-form(contested) that can cause disease in living beings' },
  { baseId: 'animal-sea_sponge', emoji: '🧽', label: 'Sea Sponge', type: 'animal', data: { species: 'sea_sponge' }, detailedDescription: 'A simple animal that can be found in the ocean' },
  { baseId: 'animal-slime_mold', emoji: '🍄', label: 'Slime Mold', type: 'animal', data: { species: 'slime_mold' }, detailedDescription: 'A simple animal that can be found in forest floors' },
  { baseId: 'animal-jellyfish', emoji: '🪼', label: 'Jellyfish', type: 'animal', data: { species: 'jellyfish' }, detailedDescription: 'Spongebob likes to catch them' },
  { baseId: 'animal-hydra', emoji: '🐙', label: 'Hydra', type: 'animal', data: { species: 'hydra' }, detailedDescription: 'A simple animal that can be found in the ocean, they are known for their regenerative abilities' }, // Using octopus as proxy for visual
  { baseId: 'animal-sea_star', emoji: '⭐', label: 'Sea Star', type: 'animal', data: { species: 'sea_star' }, detailedDescription: 'Is mayonnaise an instrument?' },
  { baseId: 'animal-planarian_flatworm', emoji: '🪱', label: 'Flatworm', type: 'animal', data: { species: 'planarian_flatworm' }, detailedDescription: 'A worm that can be found in the ocean, they are known for their regenerative abilities, even able to survive being cut in half' }, // Generic worm
  { baseId: 'animal-giant_clam', emoji: '🦪', label: 'Giant Clam', type: 'animal', data: { species: 'giant_clam' }, detailedDescription: 'A tasty sea creature' },
  { baseId: 'animal-fruit_fly', emoji: '🪰', label: 'Fruit Fly', type: 'animal', data: { species: 'fruit_fly' }, detailedDescription: 'Bzzzzzzt. David Cronenberg\'s favorite insect' },
  { baseId: 'animal-jumping_spider', emoji: '🕷️', label: 'Jumping Spider', type: 'animal', data: { species: 'jumping_spider' }, detailedDescription: 'A spider that can jump very high. Jesus Christ why' },
  { baseId: 'animal-ant', emoji: '🐜', label: 'Ant', type: 'animal', data: { species: 'ant' }, detailedDescription: 'A small insect that can be found in the forest. Is known for fighting and dying for the colony and has taken over large swathes of territory, for which they fight with other colonies for' },
  { baseId: 'animal-green_anole_lizard', emoji: '🦎', label: 'Lizard', type: 'animal', data: { species: 'green_anole_lizard' }, detailedDescription: 'A lizard that can be found in the forest' }, // Generic lizard
  { baseId: 'animal-pigeon', emoji: '🕊️', label: 'Pigeon', type: 'animal', data: { species: 'pigeon' }, detailedDescription: 'Called (unfairly) a "flying rat"' },
  { baseId: 'animal-african_grey_parrot', emoji: '🦜', label: 'Parrot', type: 'animal', data: { species: 'african_grey_parrot' }, detailedDescription: 'A parrot that can be found in the forest' },
  { baseId: 'animal-capuchin_monkey', emoji: '🐒', label: 'Monkey', type: 'animal', data: { species: 'capuchin_monkey' }, detailedDescription: 'A monkey, our evolutionary cousins' }, // Generic monkey
  { baseId: 'animal-raccoon', emoji: '🦝', label: 'Raccoon', type: 'animal', data: { species: 'raccoon' }, detailedDescription: 'A trash bandit with cute little hands' },
  { baseId: 'animal-pig', emoji: '🐖', label: 'Pig', type: 'animal', data: { species: 'pig' }, detailedDescription: 'Responsible for bacon and honstly a sweet animal' },
  { baseId: 'animal-grey_wolf', emoji: '🐺', label: 'Wolf', type: 'animal', data: { species: 'grey_wolf' }, detailedDescription: 'A pack animal, known for their loyalty and pack mentality. Some say they are particularly hungry' },
  { baseId: 'animal-common_octopus', emoji: '🐙', label: 'Octopus', type: 'animal', data: { species: 'common_octopus' }, detailedDescription: 'A sea creature that can be found in the ocean, with intelligence comparable to a 2-3 year old child. Pity they don\'t live long enough to be able to enjoy their intelligence' },
  { baseId: 'animal-common_cuttlefish', emoji: '🦑', label: 'Cuttlefish', type: 'animal', data: { species: 'common_cuttlefish' }, detailedDescription: 'A sea creature that can be found in the ocean, with intelligence comparable to a 2-3 year old child. Pity they don\'t live long enough to be able to enjoy their intelligence' },
  { baseId: 'animal-orca', emoji: '🐳', label: 'Orca', type: 'animal', data: { species: 'orca' }, detailedDescription: 'A cetacean, master of the world\'s ocean. Apex predator. They are known for their intelligence and ability to work together as a team, hunting everything they can (not known for hunting humanas though). In 2024-2025, they took to atttacking pleasure yachts' }, // Generic whale
  { baseId: 'animal-gorilla', emoji: '🦍', label: 'Gorilla', type: 'animal', data: { species: 'gorilla' }, detailedDescription: 'A great ape, our evolutionary cousins, the largest of the great apes' },
  { baseId: 'animal-orangutan', emoji: '🦧', label: 'Orangutan', type: 'animal', data: { species: 'orangutan' }, detailedDescription: 'A great ape, our evolutionary cousins, famously orange and known for their intelligence. They helped Mogli in the Jungle Book' },
  { baseId: 'animal-neanderthal', emoji: '👣', label: 'Neanderthal', type: 'animal', data: { species: 'neanderthal' }, detailedDescription: 'An extinct hominid, our evolutionary cousins, still present in european genomes (1-4%). We outcompeted them, but we ended up "integrating" them into our genepool👀' }, // Technically animal in context
]; 