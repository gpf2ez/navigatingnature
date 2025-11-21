import React from 'react';

interface SectionWrapperProps {
  children: React.ReactNode;
  bgColor?: string; // e.g., 'bg-primary', 'bg-card-light'
  hasTornEdge?: boolean;
  leafLeft?: string;
  leafRight?: string;
  className?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ 
  children, 
  bgColor = 'bg-white', 
  hasTornEdge = false, 
  leafLeft, 
  leafRight,
  className = ''
}) => {
  return (
    <section className={`${bgColor} py-12 px-4 relative ${hasTornEdge ? 'torn-edge-top' : ''} ${className}`}>
      {leafLeft && (
        <img 
          src={leafLeft} 
          alt="" 
          className="absolute top-8 left-4 w-24 opacity-30 pointer-events-none" 
        />
      )}
      {leafRight && (
        <img 
          src={leafRight} 
          alt="" 
          className="absolute bottom-8 right-4 w-24 opacity-30 transform -scale-x-100 pointer-events-none" 
        />
      )}
      <div className="container mx-auto max-w-5xl relative z-10">
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;