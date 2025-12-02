import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Map, Users } from 'lucide-react';
import { useSite } from '../services/SiteContext';
import { Polaroid, NatureButton, Tape } from '../components/Scrapbook';

const Home: React.FC = () => {
  const { posts } = useSite();
  const featuredPosts = posts.filter(p => p.status === 'published').slice(0, 3);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-nature-dark text-nature-cream">
         <div className="absolute inset-0 opacity-40">
            <img 
              src="https://picsum.photos/seed/forest-path/1920/1080" 
              className="w-full h-full object-cover" 
              alt="Background" 
              loading="lazy" 
              width="800" 
              height="600" 
            />
         </div>
         <div className="absolute inset-0 bg-gradient-to-b from-transparent to-nature-dark/90"></div>
         
         <div className="relative z-10 text-center max-w-4xl px-4">
            <h1 className="text-6xl md:text-8xl font-hand font-bold mb-6 drop-shadow-lg text-nature-cream">
              Navigating Nature
            </h1>
            <p className="text-xl md:text-2xl font-sans mb-8 max-w-2xl mx-auto drop-shadow-md">
              A journey into the wild. Discover, learn, and protect the ecosystems around us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/about">
                <NatureButton variant="primary">Start Exploring</NatureButton>
              </Link>
              <Link to="/calendar">
                <NatureButton variant="secondary">Join an Event</NatureButton>
              </Link>
            </div>
         </div>
         <div className="absolute bottom-0 w-full h-16 bg-nature-cream torn-edge-top"></div>
      </section>

      {/* Intro Section - Scrapbook Style */}
      <section className="py-20 bg-nature-cream relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2 relative">
                 <Tape className="-top-4 -left-4 rotate-[-5deg]" />
                 <Polaroid 
                   src="https://picsum.photos/seed/hiker/600/600" 
                   caption="Our community in action" 
                   rotation="rotate-[-2deg]"
                   className="w-full max-w-md mx-auto"
                 />
                 <Tape variant="white" className="-bottom-4 -right-4 rotate-[10deg]" />
              </div>
              <div className="md:w-1/2 space-y-6">
                 <h2 className="text-5xl font-hand font-bold text-nature-dark">What is a Food Chain?</h2>
                 <p className="font-sans text-lg text-nature-brown leading-relaxed">
                   It is a single pathway showing who eats who. It displays how matter and energy flow in an ecosystem. From the smallest producers to the largest predators, every link matters.
                 </p>
                 <div className="bg-nature-light/20 p-6 border-l-4 border-nature-primary rounded-r-md">
                    <h3 className="font-bold text-xl mb-2 text-nature-dark">Did you know?</h3>
                    <p className="italic text-nature-dark/80">Fungi act as the recyclers of the forest, breaking down dead matter and returning nutrients to the soil!</p>
                 </div>
                 <Link to="/about" className="inline-flex items-center text-nature-primary font-bold hover:underline font-hand text-xl">
                    Read more about our project <ArrowRight className="ml-2" size={20} />
                 </Link>
              </div>
           </div>
        </div>
      </section>

      {/* Features/Services Preview */}
      <section className="py-20 bg-white relative">
         <div className="absolute top-0 w-full h-8 bg-nature-cream torn-edge-bottom"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-hand font-bold text-nature-dark">Ways to Connect</h2>
              <div className="h-1 w-24 bg-nature-primary mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <div className="bg-nature-cream p-8 rounded-sm shadow-md border-t-4 border-nature-primary text-center group hover:-translate-y-2 transition duration-300">
                  <div className="bg-white p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-inner group-hover:scale-110 transition">
                     <Map size={40} className="text-nature-primary" />
                  </div>
                  <h3 className="text-2xl font-hand font-bold mb-3">Guided Tours</h3>
                  <p className="text-gray-600 mb-6">Expert led walks through diverse habitats tailored for all skill levels.</p>
                  <Link to="/services" className="text-nature-primary font-bold hover:text-nature-dark">Learn More &rarr;</Link>
               </div>
               
               <div className="bg-nature-cream p-8 rounded-sm shadow-md border-t-4 border-nature-accent text-center group hover:-translate-y-2 transition duration-300">
                  <div className="bg-white p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-inner group-hover:scale-110 transition">
                     <Users size={40} className="text-nature-accent" />
                  </div>
                  <h3 className="text-2xl font-hand font-bold mb-3">Workshops</h3>
                  <p className="text-gray-600 mb-6">Hands-on learning about flora identification, tracking, and survival skills.</p>
                  <Link to="/services" className="text-nature-accent font-bold hover:text-nature-dark">Learn More &rarr;</Link>
               </div>

               <div className="bg-nature-cream p-8 rounded-sm shadow-md border-t-4 border-nature-dark text-center group hover:-translate-y-2 transition duration-300">
                  <div className="bg-white p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-inner group-hover:scale-110 transition">
                     <Leaf size={40} className="text-nature-dark" />
                  </div>
                  <h3 className="text-2xl font-hand font-bold mb-3">Conservation</h3>
                  <p className="text-gray-600 mb-6">Volunteer opportunities to help restore and protect local ecosystems.</p>
                  <Link to="/contact" className="text-nature-dark font-bold hover:text-nature-primary">Get Involved &rarr;</Link>
               </div>
            </div>
         </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-20 bg-nature-tan/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <h2 className="text-4xl font-hand font-bold text-nature-dark mb-12 text-center">From the Field Journal</h2>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                 <div key={post.id} className="bg-white p-4 shadow-lg rotate-0 hover:rotate-1 transition duration-300 relative">
                    <Tape variant="yellow" className="-top-3 left-1/2 -translate-x-1/2 w-32" />
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
                       <span className="text-xs font-bold text-nature-primary uppercase tracking-wider">{post.category}</span>
                       <h3 className="text-2xl font-hand font-bold text-nature-dark mt-1 mb-2 leading-tight">{post.title}</h3>
                       <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                       <Link to="/blog" className="text-nature-accent font-bold text-sm uppercase tracking-wide hover:underline">Read Entry</Link>
                    </div>
                 </div>
              ))}
           </div>
           
           <div className="text-center mt-12">
              <Link to="/blog">
                <NatureButton variant="secondary">View All Entries</NatureButton>
              </Link>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;