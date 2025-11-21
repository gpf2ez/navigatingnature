import React from 'react';
import { PolaridProps } from '../types';

const Polaroid: React.FC<PolaridProps> = ({ src, alt, caption, rotation = 'rotate-0', className = '', label }) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div className={`rounded-sm border-4 border-white p-2 bg-white shadow-lg transform transition-transform duration-300 hover:scale-105 hover:z-10 ${rotation}`}>
        <img src={src} alt={alt} className="w-full h-auto object-cover" />
        {/* Optional corner tape effect can be added here if needed */}
      </div>
      {(caption || label) && (
        <div className="mt-4 flex flex-col items-center space-y-2">
          {caption && <p className="font-bold text-gray-800">{caption}</p>}
          {label && (
            <p className="bg-accent-light text-white text-xs md:text-sm font-bold py-1 px-3 rounded-md uppercase tracking-wide shadow-sm">
              {label}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Polaroid;