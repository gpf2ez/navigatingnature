import React, { useState } from 'react';
import { useSite } from '../services/SiteContext';
import { Tape, StickyNote } from '../components/Scrapbook';
import { MapPin, Info, Mountain, Trees, Waves } from 'lucide-react';
import { PointOfInterest } from '../types';

const MapExplorer: React.FC = () => {
  const { regions } = useSite();
  const [activeRegionId, setActiveRegionId] = useState(regions[0].id);
  const [selectedPoi, setSelectedPoi] = useState<PointOfInterest | null>(null);

  const activeRegion = regions.find(r => r.id === activeRegionId) || regions[0];

  const getRegionIcon = (name: string) => {
    if (name.includes('Forest')) return <Trees />;
    if (name.includes('Peak') || name.includes('Mountain')) return <Mountain />;
    return <Waves />;
  };

  return (
    <div className="py-12 bg-nature-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
           <h1 className="text-5xl font-hand font-bold text-nature-dark mb-4">Interactive Map Explorer</h1>
           <p className="text-xl font-sans text-gray-600">Select a region to explore trails, landmarks, and viewpoints.</p>
        </div>

        {/* Region Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
           {regions.map(region => (
              <button
                key={region.id}
                onClick={() => { setActiveRegionId(region.id); setSelectedPoi(null); }}
                className={`flex items-center gap-2 px-6 py-3 rounded-t-lg font-hand text-xl font-bold border-b-0 transition-all ${
                   activeRegionId === region.id 
                   ? 'bg-nature-dark text-white shadow-lg transform -translate-y-1' 
                   : 'bg-white text-nature-dark hover:bg-nature-light/30'
                }`}
              >
                 {getRegionIcon(region.name)}
                 {region.name}
              </button>
           ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
           {/* Map Container */}
           <div className="lg:w-3/4 relative bg-white p-4 shadow-xl rotate-[-1deg] border-4 border-nature-tan rounded-sm">
              <Tape className="-top-4 left-1/2 -translate-x-1/2 w-48" />
              
              <div className="relative overflow-hidden w-full h-[500px] bg-gray-200 rounded-sm group">
                 <img 
                   src={activeRegion.imageUrl} 
                   alt={activeRegion.name} 
                   className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition duration-500" 
                   loading="lazy" 
                   width="800" 
                   height="600" 
                 />
                 <div className="absolute inset-0 bg-nature-primary/10 pointer-events-none mix-blend-multiply"></div>
                 
                 {/* Map Points */}
                 {activeRegion.pointsOfInterest.map(poi => (
                    <button
                      key={poi.id}
                      onClick={() => setSelectedPoi(poi)}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-125 z-10 ${
                         selectedPoi?.id === poi.id ? 'bg-nature-accent text-white scale-125' : 'bg-white text-nature-dark'
                      }`}
                      style={{ left: `${poi.x}%`, top: `${poi.y}%` }}
                      title={poi.name}
                    >
                       <MapPin size={24} fill={selectedPoi?.id === poi.id ? "currentColor" : "none"} />
                    </button>
                 ))}
              </div>

              <div className="absolute bottom-6 left-6 bg-white/90 p-3 rounded-sm shadow-md backdrop-blur-sm max-w-xs">
                 <h3 className="font-bold text-nature-dark">{activeRegion.name}</h3>
                 <p className="text-sm text-gray-600">{activeRegion.description}</p>
              </div>
           </div>

           {/* Sidebar Info */}
           <div className="lg:w-1/4">
              {selectedPoi ? (
                 <StickyNote color="bg-yellow-100" className="rotate-2 animate-fade-in">
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="font-bold text-2xl text-nature-dark leading-tight">{selectedPoi.name}</h3>
                       <span className="bg-nature-dark text-white text-[10px] uppercase px-2 py-1 rounded-full">{selectedPoi.type}</span>
                    </div>
                    <div className="h-1 w-full bg-nature-brown/20 mb-4"></div>
                    <p className="font-sans text-gray-800 mb-4">{selectedPoi.description}</p>
                    <button onClick={() => setSelectedPoi(null)} className="text-sm text-nature-primary hover:underline flex items-center gap-1 font-bold">
                       <Info size={14} /> Close Details
                    </button>
                 </StickyNote>
              ) : (
                 <div className="bg-nature-cream border-2 border-nature-dark/20 p-6 rounded-sm text-center border-dashed h-full flex flex-col justify-center items-center opacity-70">
                    <MapPin size={48} className="text-nature-dark mb-4" />
                    <p className="font-hand text-xl">Select a pin on the map to view details.</p>
                 </div>
              )}
           </div>
        </div>

      </div>
    </div>
  );
};

export default MapExplorer;