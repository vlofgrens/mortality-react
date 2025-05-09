import React from 'react';
import { Human, Animal } from '@/types';
import { Car, User, Dog, AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface ScenarioPreviewProps {
  humans: Human[];
  animals: Animal[];
  includeAnimals: boolean;
}

const ScenarioPreview = ({ humans, animals, includeAnimals }: ScenarioPreviewProps) => {
  const getHumanIcon = (human: Human) => {
    // Determine icon color based on relationship
    const iconColorClass = human.relationship === 'inside' ? 'text-blue-600' : 'text-green-600';
    
    // Determine background color based on age
    let bgColorClass = 'bg-blue-100';
    if (human.relationship === 'outside') {
      bgColorClass = 'bg-green-100';
    }
    
    // Determine size based on age (children smaller, adults normal, elderly slightly larger)
    const sizeClass = human.age === 'child' ? 'scale-75' : human.age === 'elderly' ? 'scale-110' : '';
    
    return (
      <div 
        className={`flex flex-col items-center justify-center p-2 rounded-lg ${bgColorClass} shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-help`}
        title={`${human.age} ${human.gender}, fitness: ${human.fitness}, ${human.socialValue}, ${human.legalStatus}${human.details ? `, ${human.details}` : ''}`}
      >
        <User 
          size={26} 
          className={`${iconColorClass} ${sizeClass}`}
        />
        <span className="text-xs mt-1 font-medium">
          {human.age === 'child' ? 'Child' :
           human.age === 'adult' ? 'Adult' :
           human.age === 'elderly' ? 'Elderly' :
           'Undefined'}
        </span>
      </div>
    );
  };

  const getAnimalIcon = (animal: Animal) => {
    // Choose colors based on animal type
    let bgColorClass = 'bg-yellow-100';
    let textColorClass = 'text-yellow-700';
    
    // Determine icon size based on animal type
    // Small animals like insects or birds would be smaller
    const smallAnimals = ['mosquito', 'tick', 'bird', 'rat', 'cockroach', 'fish', 'frog'];
    const largeAnimals = ['elephant', 'panda', 'dolphin'];
    
    let sizeClass = '';
    if (smallAnimals.includes(animal.species)) {
      sizeClass = 'scale-75';
    } else if (largeAnimals.includes(animal.species)) {
      sizeClass = 'scale-125';
    }
    
    return (
      <div 
        className={`flex flex-col items-center justify-center p-2 rounded-lg ${bgColorClass} shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-help`}
        title={`${animal.species}${animal.details ? `, ${animal.details}` : ''}`}
      >
        <Dog size={26} className={`${textColorClass} ${sizeClass}`} />
        <span className="text-xs mt-1 font-medium capitalize">
          {animal.species}
        </span>
      </div>
    );
  };

  // Group humans by relationship to the vehicle
  const insideHumans = humans.filter(human => human.relationship === 'inside');
  const outsideHumans = humans.filter(human => human.relationship === 'outside');

  return (
    <Card className="w-full overflow-hidden border-2 border-gray-200 shadow-card hover:shadow-card-hover transition-shadow duration-300">
      <CardContent className="p-4">
        <h3 className="font-semibold mb-4 text-center text-lg">Scenario Preview</h3>
        
        <div className="mb-6 relative animate-fade-in">
          {/* Road */}
          <div className="absolute inset-0 flex flex-col justify-center z-0 pointer-events-none">
            <div className="h-16 bg-gray-200"></div>
            <div className="h-1 bg-yellow-400 my-0.5"></div>
            <div className="h-1 bg-yellow-400"></div>
          </div>
          
          <div className="flex justify-center relative z-10 mb-8">
            <div className="w-28 h-14 bg-blue-600 rounded-lg flex items-center justify-center transform transition-transform hover:scale-105 shadow-md">
              <Car size={36} className="text-white" />
            </div>
          </div>
          
          {/* Inside the car */}
          {insideHumans.length > 0 && (
            <div className="mt-6 bg-white/90 p-3 rounded-lg shadow-sm border border-gray-100 animate-scale-in">
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-1.5"></span>
                Inside the vehicle:
              </h4>
              <div className="flex flex-wrap gap-2">
                {insideHumans.map((human, index) => (
                  <div key={human.id || index} className="animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
                    {getHumanIcon(human)}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Outside entities container */}
          <div className="flex flex-col mt-8">
            {/* Outside humans */}
            {outsideHumans.length > 0 && (
              <div className="mb-4 bg-white/90 p-3 rounded-lg shadow-sm border border-gray-100 animate-scale-in" style={{animationDelay: '200ms'}}>
                <h4 className="text-sm font-medium mb-2 flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>
                  Outside the vehicle:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {outsideHumans.map((human, index) => (
                    <div key={human.id || index} className="animate-fade-in" style={{animationDelay: `${(index + insideHumans.length) * 100}ms`}}>
                      {getHumanIcon(human)}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Animals */}
            {includeAnimals && animals.length > 0 && (
              <div className="bg-white/90 p-3 rounded-lg shadow-sm border border-gray-100 animate-scale-in" style={{animationDelay: '300ms'}}>
                <h4 className="text-sm font-medium mb-2 flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-yellow-500 mr-1.5"></span>
                  Animals in the scenario:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {animals.map((animal, index) => (
                    <div key={animal.id || index} className="animate-fade-in" style={{animationDelay: `${(index + humans.length) * 100}ms`}}>
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