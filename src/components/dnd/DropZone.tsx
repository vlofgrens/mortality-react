import React from 'react';
import { useDroppable } from '@dnd-kit/core';

interface DropZoneProps {
  id: string; // Unique ID for the droppable area
  children?: React.ReactNode;
  title: string;
  className?: string;
  style?: React.CSSProperties;
}

const DropZone: React.FC<DropZoneProps> = ({ id, children, title, className, style }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  const defaultStyle: React.CSSProperties = {
    padding: '20px',
    border: isOver ? '2px dashed #00FF00' : '2px dashed #555',
    borderRadius: '8px',
    minHeight: '200px',
    backgroundColor: isOver ? '#222' : '#000000',
    color: '#FFFFFF',
    transition: 'border-color 0.2s ease-in-out, background-color 0.2s ease-in-out',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div ref={setNodeRef} style={{ ...defaultStyle, ...style }} className={className}>
      <h5 style={{ marginTop: 0, marginBottom: '15px', color: '#FFFFFF' }}>{title}</h5>
      {children || <p style={{ color: '#AAAAAA' }}>Drop items here</p>}
    </div>
  );
};

export default DropZone; 