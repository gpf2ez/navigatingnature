import React from 'react';
import { useSite } from '../services/SiteContext';
import { NatureButton, Tape } from '../components/Scrapbook';
import { Map, BookOpen, Clipboard, Activity } from 'lucide-react';

const Services: React.FC = () => {
  const { services } = useSite();

  const getIcon = (name: string) => {
    switch (name) {
      case 'Map': return <Map size={32} />;
      case 'BookOpen': return <BookOpen size={32} />;
      case 'Clipboard': return <Clipboard size={32} />;
      default: return <Activity size={32} />;
    }
  };

  return (
    <div className="py-16 bg-nature-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-hand font-bold text-nature-dark mb-4">Our Programs</h1>
          <p className="text-xl text-gray-600 font-sans max-w-2xl mx-auto">
            From educational workshops to professional ecological surveys, we offer a range of services to help you connect with nature.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div key={service.id} className="relative bg-white p-8 shadow-lg border border-gray-200 transition transform hover:-translate-y-1">
              <Tape variant={index % 2 === 0 ? 'yellow' : 'white'} className="top-0 left-1/2 -translate-x-1/2 -mt-4 w-32" />
              
              <div className="w-16 h-16 bg-nature-light/30 rounded-full flex items-center justify-center text-nature-dark mb-6 mx-auto">
                {getIcon(service.icon)}
              </div>
              
              <h3 className="text-2xl font-hand font-bold text-center text-nature-dark mb-4">{service.title}</h3>
              <p className="text-gray-600 text-center font-sans mb-6">{service.description}</p>
              
              <div className="text-center">
                 <NatureButton variant="secondary" className="text-sm py-1 px-4">Inquire Now</NatureButton>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 bg-nature-dark text-nature-cream p-12 rounded-sm relative overflow-hidden">
           <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-nature-primary rounded-full opacity-20"></div>
           <div className="relative z-10 text-center">
              <h2 className="text-3xl font-hand font-bold mb-4">Have a Custom Request?</h2>
              <p className="font-sans mb-8 max-w-2xl mx-auto text-nature-light">
                We work with schools, private groups, and local governments to tailor nature experiences.
              </p>
              <NatureButton variant="primary" className="bg-nature-accent border-nature-accent hover:bg-white hover:text-nature-accent">Contact Us</NatureButton>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
