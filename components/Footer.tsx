import React from 'react';
import { Facebook, Twitter, Instagram, Mail, MapPin, ArrowUp } from 'lucide-react';
import { useSite } from '../services/SiteContext';

const Footer: React.FC = () => {
  const { config } = useSite();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-nature-dark text-nature-cream pt-16 pb-8 mt-12 torn-edge-top">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Column 1: Brand */}
          <div className="space-y-4">
             <div className="flex items-center gap-2">
                 <img 
                   src={config.logoUrl} 
                   className="h-10 w-auto bg-white rounded-full p-1" 
                   alt="Logo" 
                   loading="lazy" 
                   width="800" 
                   height="600"
                   onError={(e) => {
                     (e.target as HTMLImageElement).src = 'https://cdn-icons-png.flaticon.com/512/3025/3025689.png';
                   }} 
                 />
                <h3 className="text-3xl font-hand font-bold">{config.siteName}</h3>
             </div>
            <p className="text-nature-light font-sans max-w-xs">{config.siteDescription}</p>
            <div className="flex space-x-4 pt-2">
              <a href={config.socialLinks.facebook} className="hover:text-nature-light transition"><Facebook size={24} /></a>
              <a href={config.socialLinks.twitter} className="hover:text-nature-light transition"><Twitter size={24} /></a>
              <a href={config.socialLinks.instagram} className="hover:text-nature-light transition"><Instagram size={24} /></a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-xl font-hand font-bold mb-4 border-b border-nature-light/30 inline-block pb-1">Explore</h4>
            <ul className="space-y-2 font-sans">
              <li><a href="/#" className="hover:text-nature-light transition">Home</a></li>
              <li><a href="/#/about" className="hover:text-nature-light transition">Our Mission</a></li>
              <li><a href="/#/services" className="hover:text-nature-light transition">Programs</a></li>
              <li><a href="/#/blog" className="hover:text-nature-light transition">Nature Blog</a></li>
              <li><a href="/#/contact" className="hover:text-nature-light transition">Get Involved</a></li>
            </ul>
          </div>

          {/* Column 3: Contact & Newsletter */}
          <div>
            <h4 className="text-xl font-hand font-bold mb-4 border-b border-nature-light/30 inline-block pb-1">Stay Connected</h4>
            <div className="space-y-3 font-sans mb-6">
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-nature-light" />
                <span>{config.contactEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-nature-light" />
                <span>123 Forest Lane, Woodland City</span>
              </div>
            </div>
            
            <form className="relative">
              <input 
                type="email" 
                placeholder="Join our newsletter..." 
                className="w-full bg-nature-dark border border-nature-light/50 rounded-sm py-2 px-3 text-sm focus:outline-none focus:border-nature-light text-nature-cream"
                aria-label="Join our newsletter..." 
              />
              <button type="button" className="absolute right-1 top-1 bg-nature-light text-nature-dark p-1 rounded-sm text-xs font-bold uppercase hover:bg-white transition">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-nature-light/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm font-sans text-nature-light/70">&copy; {new Date().getFullYear()} {config.siteName}. All rights reserved.</p>
          <button 
            onClick={scrollToTop}
            className="mt-4 md:mt-0 flex items-center gap-2 text-nature-light hover:text-white transition font-hand text-lg"
          >
            Back to Top <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;