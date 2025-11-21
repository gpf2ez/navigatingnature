import React from 'react';
import { TapeHeaderProps } from '../types';

const TapeHeader: React.FC<TapeHeaderProps> = ({ text, rotation = '-rotate-1', className = '' }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      {/* The tape background */}
      <div className={`absolute -top-2 -left-4 -right-4 h-full min-h-[3.5rem] bg-tape transform shadow-sm ${rotation}`}></div>
      {/* The text */}
      <h2 className="font-display text-3xl md:text-4xl text-gray-800 relative z-10 px-2">
        {text}
      </h2>
    </div>
  );
};

export default TapeHeader;