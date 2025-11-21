import React from 'react';
import { IMAGES } from './constants';
import Polaroid from './components/Polaroid';
import TapeHeader from './components/TapeHeader';
import SectionWrapper from './components/SectionWrapper';
import StickyNote from './components/StickyNote';

const App: React.FC = () => {
  return (
    <div className="w-full min-h-screen flex flex-col overflow-hidden">
      
      {/* Header */}
      <header className="py-16 bg-white">
        <div className="container mx-auto flex justify-center items-center gap-6">
          <img src={IMAGES.LOGO_SNAIL} alt="Snail logo" className="h-20 w-20 object-contain" />
          <div className="text-center">
            <h1 className="font-display text-4xl md:text-5xl text-primary tracking-widest">NAVIGATING</h1>
            <h2 className="font-display text-5xl md:text-6xl text-primary tracking-widest">NATURE</h2>
          </div>
        </div>
      </header>

      {/* Section 1: Definition */}
      <SectionWrapper 
        bgColor="bg-primary" 
        leafLeft={IMAGES.LEAF_LEFT_1}
        leafRight={IMAGES.LEAF_RIGHT_1}
      >
        <div className="bg-paper-light p-8 md:p-12 rounded-lg shadow-xl mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="w-full md:w-2/3 space-y-8">
              <TapeHeader text="What is a Food Chain?" rotation="-rotate-1" />
              <ul className="list-disc list-inside space-y-4 text-gray-800 text-lg md:text-xl font-medium pl-4">
                <li>It is a single pathway showing <span className="underline decoration-primary decoration-2">who eats who</span>.</li>
                <li>It displays how <span className="underline decoration-primary decoration-2">matter and energy flow</span> in an ecosystem.</li>
              </ul>
            </div>
            <div className="w-full md:w-1/3 relative mt-4 md:mt-0">
              <Polaroid src={IMAGES.FOX} alt="Fox" rotation="rotate-3" />
              {/* Fake tape element on top of image */}
              <div className="absolute -top-4 -right-2 h-10 w-10 bg-gray-400 opacity-50" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.5) 4px, rgba(255,255,255,0.5) 8px)' }}></div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Section 2: Examples */}
      <SectionWrapper bgColor="bg-card-light" hasTornEdge>
        <div className="flex flex-col items-center mb-12">
             <TapeHeader text="What is a Food Chain?" rotation="rotate-1" className="mb-8" />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 items-start justify-items-center">
          <Polaroid src={IMAGES.CORN} alt="Corn" caption="Corn" label="PRODUCER" rotation="-rotate-1" />
          <Polaroid src={IMAGES.RAT} alt="Rat" caption="Rat" label="PRIMARY CONSUMER (HERBIVORE)" rotation="rotate-2" />
          <Polaroid src={IMAGES.OWL} alt="Owl" caption="Owl" label="SECONDARY CONSUMER (CARNIVORE)" rotation="-rotate-2" />
          <Polaroid src={IMAGES.FUNGI} alt="Fungi" caption="Fungi" label="DECOMPOSER" rotation="rotate-1" />
        </div>
      </SectionWrapper>

      {/* Section 3: About Project */}
      <SectionWrapper bgColor="bg-card-light" hasTornEdge className="pt-0 md:pt-8">
         <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl mx-auto max-w-4xl relative border-t-2 border-dashed border-gray-300 mt-12">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-8 py-2 rounded-full font-display text-xl md:text-2xl shadow-md">
                About the Project
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-center pt-8">
                <div className="w-full md:w-2/3 space-y-6 text-gray-800 text-lg">
                    <ul className="list-disc list-inside space-y-4 pl-4">
                        <li>Can you give examples of producers, consumers, and decomposers?</li>
                        <li>For this project, your group will create an online gallery of plants and animals while describing their role in the food chain.</li>
                    </ul>
                </div>
                <div className="w-full md:w-1/3 relative">
                    <Polaroid src={IMAGES.MUSHROOM_TOADSTOOL} alt="Toadstool" rotation="-rotate-2" />
                    <div className="absolute -top-2 -left-2 h-10 w-10 bg-gray-400 opacity-50" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.5) 4px, rgba(255,255,255,0.5) 8px)' }}></div>
                </div>
            </div>
        </div>
      </SectionWrapper>

      {/* Section 4: Instructions (Habitat) */}
      <SectionWrapper 
        bgColor="bg-primary" 
        leafLeft={IMAGES.LEAF_LEFT_2}
        leafRight={IMAGES.LEAF_RIGHT_2}
      >
        <div className="bg-paper-light p-8 md:p-12 rounded-lg shadow-xl mx-auto max-w-4xl">
            <div className="mb-8">
                <TapeHeader text="Instructions" rotation="rotate-1" />
            </div>
            
            <div className="flex flex-col md:flex-row gap-12 items-start">
                <ul className="w-full md:w-2/3 list-disc list-inside space-y-4 text-gray-800 text-lg font-medium">
                    <li>Choose one habitat your group wants to focus on (desert, forest, savanna, or ocean).</li>
                    <li>Give at least three organisms for each role (producer, consumer, and decomposer) found in your chosen habitat.</li>
                    <li>Create a Plant/Animal Profile for each organism.</li>
                </ul>
                <div className="w-full md:w-1/3 relative">
                    <Polaroid src={IMAGES.BEETLE} alt="Blue Beetle" rotation="rotate-3" />
                    <div className="absolute -bottom-2 -right-2 h-12 w-12 bg-gray-400 opacity-50" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.5) 4px, rgba(255,255,255,0.5) 8px)' }}></div>
                </div>
            </div>
        </div>
      </SectionWrapper>

      {/* Section 5: Plant or Animal Profile */}
      <SectionWrapper bgColor="bg-accent-light">
        <div className="bg-paper-light p-8 md:p-12 rounded-lg shadow-xl mx-auto max-w-4xl">
            <div className="mb-8">
                <TapeHeader text="Plant or Animal Profile" rotation="-rotate-1" />
            </div>
            <div className="flex flex-col md:flex-row gap-12 items-start">
                <div className="w-full md:w-2/3 space-y-6 text-gray-800">
                    <p className="text-xl"><span className="font-bold">Name:</span> ___________________</p>
                    <ul className="list-disc list-inside space-y-4 text-lg pl-2">
                        <li>What made it a producer, consumer, or decomposer?</li>
                        <li>What does it eat and what eats it, if applicable?</li>
                        <li>Any fun fact about it?</li>
                    </ul>
                </div>
                <div className="w-full md:w-1/3 relative">
                    <div className="bg-white p-2 border-4 border-white shadow-lg transform rotate-2">
                        <div className="relative w-full aspect-square bg-blue-200 overflow-hidden flex flex-col justify-end" style={{ backgroundImage: 'linear-gradient(to bottom, #a0d2eb, #e5e5e5 50%, #4caf50 50%)' }}>
                           <div className="absolute top-4 left-1/2 -translate-x-1/2 opacity-50">
                                <span className="material-icons text-6xl text-white">cloud</span>
                           </div>
                           <div className="w-full p-2 text-center pb-8">
                               {/* Empty space */}
                           </div>
                           
                           <div className="absolute -bottom-4 -right-4 bg-gray-800 text-white rounded-full h-20 w-20 md:h-24 md:w-24 flex items-center justify-center text-center text-xs p-2 shadow-lg transform -rotate-12 z-10">
                                Add an image here.
                            </div>
                        </div>
                    </div>
                    <div className="absolute -top-2 -right-2 h-10 w-10 bg-gray-800 opacity-75" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.2) 4px, rgba(255,255,255,0.2) 8px)' }}></div>
                </div>
            </div>
        </div>
      </SectionWrapper>

      {/* Section 6: Directory Table */}
      <SectionWrapper 
        bgColor="bg-primary"
        leafLeft={IMAGES.LEAF_LEFT_3}
        leafRight={IMAGES.LEAF_RIGHT_3}
      >
         <div className="bg-paper-light p-8 md:p-12 rounded-lg shadow-xl mx-auto max-w-4xl">
            <div className="mb-8">
                <TapeHeader text="Instructions" rotation="rotate-1" />
            </div>
            <ul className="list-disc list-inside space-y-4 text-gray-800 text-lg mb-8 pl-4">
                <li>Link each profile to a main directory. See a sample directory below.</li>
                <li>Remember to have fun and share your final website with other groups!</li>
            </ul>

            <div className="overflow-x-auto rounded-sm border-2 border-gray-500">
                <table className="w-full border-collapse border-hidden text-center bg-white">
                    <thead>
                        <tr>
                            <th className="p-4 bg-gray-300 font-display text-2xl text-gray-800 border-b-2 border-gray-500" colSpan={4}>
                                Forest Food Chain
                            </th>
                        </tr>
                        <tr className="bg-gray-200 font-bold text-gray-800">
                            <th className="p-3 border border-gray-400 w-1/4">Producers</th>
                            <th className="p-3 border border-gray-400 w-1/4">Consumers</th>
                            <th className="p-3 border border-gray-400 w-1/4">Consumers</th>
                            <th className="p-3 border border-gray-400 w-1/4">Decomposers</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700 font-sans">
                        {[1, 2, 3].map((num) => (
                            <tr key={num}>
                                <td className="p-3 border border-gray-400">Organism {num}</td>
                                <td className="p-3 border border-gray-400">Organism {num}</td>
                                <td className="p-3 border border-gray-400">Organism {num}</td>
                                <td className="p-3 border border-gray-400">Organism {num}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
         </div>
      </SectionWrapper>

      {/* Section 7: Resources */}
      <SectionWrapper bgColor="bg-card-light" className="pb-0">
        <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl mx-auto max-w-4xl relative border-t-2 border-dashed border-gray-300 mt-8">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-8 py-2 rounded-full font-display text-xl md:text-2xl shadow-md">
                Resources
            </div>
            <div className="pt-6">
                <p className="text-lg mb-4 text-gray-800 font-medium">Include all references you used during your research.</p>
                <ul className="list-disc list-inside space-y-3 text-lg text-gray-700 pl-4">
                    {[1, 2, 3, 4].map(n => (
                        <li key={n}>Reference {n} - <span className="text-blue-600 underline cursor-pointer">Link</span></li>
                    ))}
                </ul>
            </div>
        </div>
      </SectionWrapper>

      {/* Section 8: Learnings */}
      <SectionWrapper bgColor="bg-accent-light">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row gap-8 items-start">
             {/* Left Column: Prompt */}
            <div className="w-full md:w-1/2 bg-white p-8 md:p-12 shadow-xl rounded relative border-t-2 border-dashed border-gray-300 mt-8">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-8 py-2 rounded-full font-display text-xl md:text-2xl shadow-md">
                    Learnings
                </div>
                <div className="pt-6 text-gray-700 text-lg">
                    <ul className="list-disc list-inside space-y-4 pl-4">
                        <li>What have you learned while completing the project?</li>
                        <li>Share your thoughts using sticky notes!</li>
                    </ul>
                </div>
            </div>

            {/* Right Column: Sticky Notes Grid */}
            <div className="w-full md:w-1/2 grid grid-cols-2 gap-4 pt-8 md:pt-0">
                <StickyNote 
                    text="Share what you learned here." 
                    author="Name" 
                    rotation="-rotate-3" 
                />
                <div className="mt-4">
                     <StickyNote 
                        text="Share what you learned here." 
                        author="Name" 
                        rotation="rotate-2" 
                    />
                </div>
                <div className="col-span-2 w-2/3 mx-auto transform rotate-1">
                     <StickyNote 
                        text="Share what you learned here." 
                        author="Name" 
                        rotation="rotate-1" 
                    />
                </div>
            </div>
        </div>
      </SectionWrapper>

      {/* Footer */}
      <footer className="bg-primary py-16 px-4">
        <div className="container mx-auto max-w-sm text-center">
            <div className="relative inline-block mb-4 group cursor-pointer">
                 <div className="transform group-hover:scale-105 transition-transform duration-300">
                    <Polaroid src={IMAGES.MUSHROOM_FOOTER} alt="Sample Website" rotation="rotate-0" />
                 </div>
                 <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[120%] z-20">
                     <div className="relative">
                         <div className="absolute top-0 left-0 w-full h-full bg-tape transform rotate-1 shadow-sm"></div>
                         <h3 className="font-display text-xl md:text-2xl text-gray-800 relative z-10 py-1 px-2 whitespace-nowrap">
                            Sample Website
                         </h3>
                     </div>
                 </div>
            </div>
        </div>
      </footer>

    </div>
  );
};

export default App;