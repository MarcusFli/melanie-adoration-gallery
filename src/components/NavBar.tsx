
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/80 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-4xl font-allura text-white hover:text-melanie-purple transition-colors">
          Melanie
        </Link>
        
        <div className="flex space-x-6">
          <Link to="/" className="text-white hover:text-melanie-purple transition-colors relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-melanie-purple after:left-0 after:bottom-0 after:transition-all hover:after:w-full">
            Inicio
          </Link>
          <Link to="/gallery" className="text-white hover:text-melanie-purple transition-colors relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-melanie-purple after:left-0 after:bottom-0 after:transition-all hover:after:w-full">
            Galería
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
