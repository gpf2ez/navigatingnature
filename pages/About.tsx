import React from 'react';
import { Polaroid, StickyNote, Tape } from '../components/Scrapbook';

const About: React.FC = () => {
  return (
    <div className="py-12 bg-nature-cream">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-5xl font-hand font-bold text-nature-dark mb-4">About the Project</h1>
          <p className="text-xl text-gray-600 font-sans">Connecting people to the pulse of the planet.</p>
        </div>

        {/* Mission Section */}
        <div className="relative bg-white p-8 md:p-12 shadow-md mb-16 border-2 border-gray-100 rotate-[0.5deg]">
          <Tape className="-top-4 right-12 rotate-[3deg]" />
          <Tape variant="white" className="-bottom-4 left-12 rotate-[-2deg]" />
          
          <h2 className="text-3xl font-hand font-bold text-nature-primary mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed font-sans mb-4">
            Navigating Nature was founded on a simple belief: that understanding our environment is the first step to protecting it. 
            We aim to create an online gallery of plants and animals while describing their role in the food chain.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed font-sans">
            Through interactive guides, community events, and educational resources, we empower individuals to explore their local habitats 
            safely and responsibly.
          </p>
        </div>

        {/* Learning Objectives */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
           <div>
              <Polaroid 
                src="https://picsum.photos/seed/owl/600/600" 
                caption="The Wise Observer" 
                rotation="rotate-[-3deg]"
              />
           </div>
           <div className="space-y-6">
              <StickyNote color="bg-green-100" className="rotate-2">
                 <h3 className="font-bold text-xl mb-2">Key Questions</h3>
                 <ul className="list-disc pl-5 space-y-2 font-sans">
                    <li>Can you give examples of producers, consumers, and decomposers?</li>
                    <li>What happens when one link in the chain is removed?</li>
                    <li>How does energy flow through the ecosystem?</li>
                 </ul>
              </StickyNote>
              <p className="font-sans text-gray-700">
                 For this project, our group creates profiles for organisms found in desert, forest, savanna, or ocean habitats.
              </p>
           </div>
        </div>

        {/* Team */}
        <div className="mb-12">
           <h2 className="text-4xl font-hand font-bold text-nature-dark text-center mb-12">The Explorers</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: 'Alex Green', role: 'Ecologist', img: 'https://picsum.photos/seed/face1/300/300' },
                { name: 'Sam River', role: 'Guide', img: 'https://picsum.photos/seed/face2/300/300' },
                { name: 'Jordan Woods', role: 'Educator', img: 'https://picsum.photos/seed/face3/300/300' },
              ].map((member, i) => (
                <div key={i} className="text-center">
                   <div className="inline-block relative">
                      <div className="h-48 overflow-hidden mb-4 border border-gray-100">
                        <img
                          src="https://picsum.photos/seed/forest-path/1920/1080"
                          className="w-full h-full object-cover"
                          alt="Background"
                          loading="lazy"
                          width="800"
                          height="600"
                        />
                      </div>
                      <div className="px-2">
                        <div className="absolute -bottom-2 -right-2 bg-nature-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                           {member.role}
                        </div>
                      </div>
                   </div>
                   <h3 className="text-2xl font-hand font-bold text-nature-dark">{member.name}</h3>
                </div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
};

export default About;