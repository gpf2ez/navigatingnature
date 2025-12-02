// components/Footer.tsx
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
          {/* Column 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src={config.logoUrl || 'https://cdn-icons-png.flaticon.com/512/3025/3025689.png'} alt={`${config.siteName} logo`} className="h-10 w-auto" / loading="lazy" width="800" height="600">
              <h3 className="text-3xl font-hand font-bold">{config.siteName}</h3>
            </div>
            <p className="max-w-sm text-sm font-sans text-nature-light/80">{config.siteDescription}</p>
          </div>

          {/* Column 2: Links (example) */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-hand font-bold text-lg">Explore</h4>
              <ul className="mt-4 space-y-2">
                <li><a href="#/map" className="hover:underline">Map</a></li>
                <li><a href="#/community" className="hover:underline">Community</a></li>
                <li><a href="#/blog" className="hover:underline">Field Journal</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-hand font-bold text-lg">Connect</h4>
              <ul className="mt-4 space-y-2">
                <li><a href={`mailto:${config.contactEmail}`} className="hover:underline">Email</a></li>
                <li><a href={config.socialLinks.facebook || '#'} className="hover:underline" target="_blank" rel="noopener noreferrer">Facebook</a></li>
                <li><a href={config.socialLinks.instagram || '#'} className="hover:underline" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              </ul>
            </div>
          </div>

          {/* Column 3: Newsletter */}
          <div>
            <h4 className="font-hand font-bold text-lg">Newsletter</h4>
            <p className="text-sm mt-2 mb-4 font-sans">Join our newsletter for the latest updates.</p>
            <form className="relative">
              <label htmlFor="footer-news-email" className="sr-only">Email for newsletter</label>
              <input
                id="footer-news-email"
                type="email"
                placeholder="Join our newsletter..."
                className="w-full bg-nature-dark border border-nature-light/20 rounded p-2 text-sm"
                aria-label="Email for newsletter"
              />
              <button type="button" className="absolute right-2 top-2 bg-nature-accent text-white px-3 py-1 rounded-sm text-xs font-bold uppercase hover:opacity-90">
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
            aria-label="Back to top"
          >
            Back to Top <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
