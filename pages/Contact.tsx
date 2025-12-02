import React from 'react';
import { NatureButton, Tape } from '../components/Scrapbook';

const Contact: React.FC = () => {
  return (
    <div className="py-16 bg-nature-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 md:p-12 shadow-2xl relative">
           <Tape className="-top-4 left-1/2 -translate-x-1/2 w-48" />
           <Tape variant="white" className="-bottom-4 right-12 w-32 rotate-[-5deg]" />
           
           <h1 className="text-4xl md:text-5xl font-hand font-bold text-center text-nature-dark mb-8">Get in Touch</h1>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                 <p className="text-lg font-sans text-gray-700 mb-6">
                    Have questions about our programs? Want to volunteer? Or just saw a cool bug and want to tell someone? We are all ears!
                 </p>
                 <div className="space-y-4 font-sans text-nature-brown">
                    <div>
                       <strong className="block text-nature-dark">Email</strong>
                       hello@navigatingnature.com
                    </div>
                    <div>
                       <strong className="block text-nature-dark">Phone</strong>
                       (555) 123-4567
                    </div>
                    <div>
                       <strong className="block text-nature-dark">Base Camp</strong>
                       123 Forest Lane<br/>Woodland City, Earth
                    </div>
                 </div>
              </div>
              
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                 <div>
                    <label className="block text-sm font-bold text-nature-dark mb-1">Name</label>
                    <input type="text" className="w-full border-b-2 border-nature-tan bg-gray-50 p-2 focus:outline-none focus:border-nature-primary" placeholder="Jane Doe"  aria-label="Jane Doe" />
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-nature-dark mb-1">Email</label>
                    <input type="email" className="w-full border-b-2 border-nature-tan bg-gray-50 p-2 focus:outline-none focus:border-nature-primary" placeholder="jane@example.com"  aria-label="jane@example.com" />
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-nature-dark mb-1">Message</label>
                    <textarea rows={4} className="w-full border-2 border-nature-tan bg-gray-50 p-2 focus:outline-none focus:border-nature-primary rounded-sm" placeholder="Tell us something wild..."></textarea>
                 </div>
                 <NatureButton type="submit" variant="primary" className="w-full">Send Message</NatureButton>
              </form>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
