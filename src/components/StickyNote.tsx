import React from 'react';
import { StickyNoteProps } from '../types';

const StickyNote: React.FC<StickyNoteProps> = ({ text, author, rotation = 'rotate-0', colorClass = 'bg-paper-light' }) => {
  return (
    <div className={`p-4 shadow-lg rounded-sm transform ${rotation} ${colorClass} flex flex-col justify-between min-h-[120px]`}>
      <p className="text-sm font-display text-gray-700 leading-relaxed font-sans">
        {text}
      </p>
      <p className="text-right text-xs mt-4 text-gray-600 font-bold">
        -{author}
      </p>
    </div>
  );
};

export default StickyNote;