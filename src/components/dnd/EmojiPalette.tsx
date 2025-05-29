import React from 'react';
import DraggableEmoji, { DraggableEmojiProps } from './DraggableEmoji';

// Define a type for the items in the palette
export type PaletteItem = Omit<DraggableEmojiProps, 'id'> & { baseId: string; category?: string; detailedDescription?: string };

interface EmojiPaletteProps {
  items: PaletteItem[];
  title: string;
}

const EmojiPalette: React.FC<EmojiPaletteProps> = ({ items, title }) => {
  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    const category = item.category || 'General'; // Default to 'General' if no category
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, PaletteItem[]>);

  // Define the desired order of categories
  const categoryOrder = [
    'General',
    'Age & Gender',
    'Health & Fitness',
    'Societal & Legal Status',
    'Nationality',
    'Political Alignment'
  ];

  // Create a sorted array of category names based on the desired order
  const sortedCategories = Object.keys(groupedItems).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    if (indexA === -1) return 1; // Put unknown categories at the end
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  return (
    <div className="p-3 border border-input rounded-md my-4 bg-background shadow-sm">
      <h3 className="mt-0 mb-3 pb-1.5 border-b border-border text-lg font-semibold text-foreground">
        {title}
      </h3>
      {sortedCategories.map(category => (
        <div key={category} className="mb-4">
          <h4 className="mt-2 mb-2 text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {category}
          </h4>
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-2 p-1.5">
            {groupedItems[category].map((item, index) => (
              <DraggableEmoji
                key={`${item.baseId}-${category}-${index}`}
                id={`${item.baseId}-${category}-${index}-${Date.now()}`} 
                emoji={item.emoji}
                label={item.label}
                type={item.type}
                data={item.data}
                detailedDescription={item.detailedDescription}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmojiPalette; 