import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export interface DraggableEmojiProps {
  id: string; // Unique ID for the draggable item
  emoji: string;
  label: string; // e.g., "Child", "Dog", "Productive Human"
  type: 'human' | 'animal';
  data: Record<string, any>; // Data to associate with the emoji (e.g., { age: "child" } or { species: "dog" })
  detailedDescription?: string; // ADDED: For hover tooltips
}

const DraggableEmoji: React.FC<DraggableEmojiProps> = ({ id, emoji, label, type, data, detailedDescription }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: id,
    // Pass all relevant data for the drop event, including detailedDescription if needed by the drop handler, though primarily for tooltip here
    data: { type, emoji, label, ...data, detailedDescription }, 
  });

  const style: React.CSSProperties = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
    padding: '8px',
    margin: '4px',
    borderRadius: '4px',
    backgroundColor: 'transparent', // A light background for the draggable item
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    border: '1px solid #ccc',
    minWidth: '60px', // Ensure a minimum width, reduced from 80px
    minHeight: '60px', // Ensure a minimum height, reduced from 70px
    boxShadow: isDragging ? '0 4px 8px rgba(0,0,0,0.2)' : '0 1px 3px rgba(0,0,0,0.1)',
    transition: 'box-shadow 0.2s ease-in-out, opacity 0.2s ease-in-out',
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} title={detailedDescription || label}>
      <span style={{ fontSize: '2rem', marginBottom: '2px' }}>{emoji}</span>
      <span style={{ fontSize: '0.75rem' }}>{label}</span>
    </div>
  );
};

export default DraggableEmoji; 