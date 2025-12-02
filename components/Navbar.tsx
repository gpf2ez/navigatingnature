import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react';
import { useSite } from '../services/SiteContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { config, isAdmin, toggleAdmin } = useSite();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Map', path: '/map' },
    { name: 'Services', path: '/services' },
    { name: 'Community', path: '/community' },
    { name: 'Blog', path: '/blog' },
    { name: 'Calendar', path: '/calendar' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-nature-cream/95 backdrop-blur-sm border-b-4 border-nature-dark shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">

          {/* LEFT: LOGO */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-3">
              <img
                src={config.logoUrl}
                alt="Logo"
                className="h-12 w-auto"
                loading="lazy"
                width="800"
                height="600"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://cdn-icons-png.flaticon.com/512/3025/3025689.png';
                }}
              />
              <div className="hidden md:block">
                <span className="block font-hand text-3xl font-bold text-nature-dark">
                  {config.siteName}
                </span>
              </div>
            </Link>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden xl:flex items-center space-x-4">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-sans text-base font-bold px-3 py-2 rounded-md transition-colors ${
                  isActive(link.path)
                    ? 'text-nature-primary bg-nature-light/30'
                    : 'text-nature-dark hover:text-nature-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Admin Toggle */}
            <button
              onClick={toggleAdmin}
              className="ml-2 p-2 rounded-full hover:bg-gray-200 transition-colors"
              title={isAdmin ? 'Exit Admin' : 'Enter Admin'}
            >
              <Leaf
                size={20}
                className={isAdmin ? 'text-nature-accent' : 'text-gray-400'}
              />
            </button>

            {isAdmin && (
              <Link
                to="/admin"
                className="font-hand text-nature-accent font-bold border-2 border-nature-accent px-3 py-1 rounded-sm hover:bg-nature-accent hover:text-white transition text-sm"
              >
                Dashboard
              </Link>
            )}
          </div>

          {/* MOBILE NAV BUTTONS */}
          <div className="flex items-center xl:hidden">
            <button onClick={toggleAdmin} className="mr-4 p-2">
              <Leaf
                size={20}
                className={isAdmin ? 'text-nature-accent' : 'text-gray-400'}
              />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-nature-dark hover:text-nature-primary hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="xl:hidden bg-nature-cream border-t-2 border-nature-tan pb-4">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-xl font-hand font-bold ${
                  isActive(link.path)
                    ? 'text-nature-primary bg-nature-light/30'
                    : 'text-nature-dark hover:text-nature-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {isAdmin && (
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-xl font-hand font-bold text-nature-accent"
              >
                Admin Dashboard
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
