import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { scrollToSection } from './fx';

const navLinks = [
  { name: 'Products', id: 'products' },
  { name: 'About', id: 'about' },
  { name: 'Contact', id: 'contact' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      // highlight the last section whose top has passed under the navbar
      let current = '';
      for (const { id } of navLinks) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(current);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const go = (id: string) => {
    setIsOpen(false);
    scrollToSection(id);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled || isOpen
        ? 'bg-ink/75 backdrop-blur-xl border-b border-white/10 py-4 shadow-xl'
        : 'bg-transparent border-b border-transparent py-6'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <button onClick={() => go('top')} className="flex items-center space-x-2 group cursor-pointer">
          <div className="rounded-lg group-hover:scale-110 transition-transform">
            <img
              src="/fav.png"
              alt="BASERASTECH Logo"
              className="w-6 h-6 object-contain"
            />
          </div>
          <span className="text-xl font-bold tracking-tight text-white uppercase">BASERAS TECH</span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => go(link.id)}
              className={`relative text-sm font-semibold transition-colors cursor-pointer ${active === link.id ? 'text-skyblue' : 'text-slate-200 hover:text-skyblue'}`}
            >
              {link.name}
              <span className={`absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-gradient-to-r from-teal to-skyblue transition-all duration-300 ${active === link.id ? 'w-full' : 'w-0'}`} />
            </button>
          ))}
          <button
            onClick={() => go('contact')}
            className="bg-teal hover:bg-teal-hover text-white text-sm font-bold px-5 py-2.5 rounded-full transition-all cursor-pointer shadow-[0_0_24px_-6px_rgba(31,182,166,.8)]"
          >
            Book a Demo
          </button>
        </div>

        {/* Mobile Button */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-ink/95 backdrop-blur-xl border-t border-white/10">
          <div className="flex flex-col p-6 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => go(link.id)}
                className={`text-left text-lg font-bold ${active === link.id ? 'text-skyblue' : 'text-white'}`}
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => go('contact')}
              className="bg-teal text-white text-lg font-bold px-6 py-3 rounded-full text-center"
            >
              Book a Demo
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
