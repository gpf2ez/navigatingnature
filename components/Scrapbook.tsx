import React from 'react';

// Tape effect
export const Tape: React.FC<{ className?: string, variant?: 'white' | 'yellow' }> = ({ className = '', variant = 'yellow' }) => {
  const color = variant === 'yellow' ? 'bg-yellow-200/80' : 'bg-gray-100/80';
  return (
    <div className={`absolute h-8 w-24 ${color} shadow-sm backdrop-blur-[1px] transform rotate-[-2deg] opacity-90 z-10 pointer-events-none ${className}`} style={{ clipPath: 'polygon(5% 0%, 100% 5%, 95% 100%, 0% 95%)' }}></div>
  );
};

// Polaroid Frame
export const Polaroid: React.FC<{ src: string, caption?: string, className?: string, rotation?: string }> = ({ src, caption, className = '', rotation = 'rotate-1' }) => {
  return (
    <div className={`bg-white p-3 pb-8 shadow-xl transition-transform hover:scale-105 duration-300 transform ${rotation} ${className}`}>
      <div className="aspect-square overflow-hidden mb-3 bg-gray-200 filter sepia-[0.2]">
        <img 
          src={src} 
          alt={caption || 'Polaroid'} 
          className="w-full h-full object-cover" 
          loading="lazy" 
          width="800" 
          height="600" 
        />
      </div>
      {caption && <div className="font-hand text-xl text-center text-gray-700">{caption}</div>}
    </div>
  );
};

// Sticky Note
export const StickyNote: React.FC<{ children: React.ReactNode, color?: string, className?: string }> = ({ children, color = 'bg-yellow-100', className = '' }) => {
  return (
    <div className={`${color} p-6 shadow-md transform -rotate-1 font-hand text-lg text-gray-800 relative ${className}`}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-3 w-32 h-6 bg-yellow-200/50 -rotate-1"></div>
      {children}
    </div>
  );
};

// Button styled like a sticker or stamp
export const NatureButton: React.FC<{ children: React.ReactNode, onClick?: () => void, variant?: 'primary' | 'secondary', className?: string, type?: "button" | "submit" | "reset" }> = ({ children, onClick, variant = 'primary', className = '', type = "button" }) => {
  const baseClass = "px-6 py-2 font-hand text-xl uppercase tracking-wider transition-all transform hover:-translate-y-1 hover:shadow-lg active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed";
  const styles = variant === 'primary' 
    ? "bg-nature-primary text-white border-2 border-nature-dark rounded-sm shadow-md" 
    : "bg-nature-cream text-nature-dark border-2 border-nature-dark rounded-sm shadow-sm";
  
  return (
    <button type={type} onClick={onClick} className={`${baseClass} ${styles} ${className}`}>
      {children}
    </button>
  );
};