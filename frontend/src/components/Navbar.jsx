import React, { useState, useEffect } from 'react';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { useFirebaseData } from '../hooks/useFirebaseData';
import { fallbackProfileData } from '../data/profileData';

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Leadership', href: '#leadership' },
  { name: 'Achievements', href: '#achievements' }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const { data: profileArr } = useFirebaseData('profile', [fallbackProfileData]);
  const profile = profileArr && profileArr.length > 0 ? profileArr[0] : fallbackProfileData;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[200] transition-all duration-500 ease-in-out border-b ${
          isScrolled 
            ? 'py-3 bg-space/70 backdrop-blur-xl border-space-light/50 shadow-[0_10px_30px_rgba(3,0,20,0.8)]' 
            : 'py-6 bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-12">
          
          {/* Logo & System Status */}
          <div className="flex items-center space-x-4 group cursor-pointer" onClick={() => (window.location.href = '#')}>
            <div className="flex flex-col">
                <span className="text-[#ff2a2a] text-xl font-display font-black tracking-[0.2em] uppercase leading-none drop-shadow-[0_0_10px_rgba(255,42,42,0.3)]">
                    {profile.name}<span className="text-white animate-pulse ml-0.5">.</span>
                </span>
                <span className="text-[8px] font-sans font-bold text-white mt-1 opacity-80 tracking-[0.3em] uppercase">PORTFOLIO</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <ul className="flex space-x-8 items-center">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setActiveLink(link.name)}
                    className={`relative text-[10px] font-sans font-semibold uppercase tracking-[0.2em] transition-all duration-300 pb-1 group ${
                      activeLink === link.name ? 'text-white' : 'text-white/40 hover:text-white'
                    }`}
                  >
                    {link.name}
                    {/* Minimal Underline */}
                    <span
                      className={`absolute left-0 bottom-0 h-[1px] bg-[#ff2a2a] transition-all duration-300 origin-left ${
                        activeLink === link.name ? 'w-full scale-x-100 opacity-100' : 'w-full scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100'
                      }`}
                    ></span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Action Group */}
            <div className="flex items-center space-x-6 border-l border-white/10 pl-10 h-6">
                {/* Contact Button */}
                <a href="#contactme" className="px-6 py-2 border border-[#ff2a2a]/50 text-[#ff2a2a] font-sans text-[10px] font-semibold uppercase tracking-widest hover:bg-[#ff2a2a] hover:text-black transition-all duration-300 rounded-full">
                    Contact
                </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white/60 hover:text-white transition-colors z-[110]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-space z-[90] flex flex-col items-center justify-center transition-all duration-500 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-full'
        }`}
      >
        {/* BG Grid for Mobile */}
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <ul className="relative z-10 flex flex-col space-y-10 text-center">
          {navLinks.map((link, index) => (
            <li 
              key={link.name} 
              className={`transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <a
                href={link.href}
                onClick={() => {
                  setActiveLink(link.name);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-sm tracking-widest uppercase font-sans font-medium transition-all duration-300 ${
                  activeLink === link.name ? 'text-white' : 'text-white/40 hover:text-[#ff2a2a]'
                }`}
              >
                {link.name}
              </a>
            </li>
          ))}
          <li className={`pt-6 transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${navLinks.length * 100}ms` }}>
            <a href="#contactme" onClick={() => setIsMobileMenuOpen(false)} className="inline-block px-12 py-3 border border-[#ff2a2a]/50 text-[#ff2a2a] font-sans text-xs font-semibold uppercase tracking-widest hover:bg-[#ff2a2a] hover:text-black transition-all rounded-full">
                Contact
            </a>
          </li>
        </ul>
        
        {/* Mobile HUD label */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 font-mono text-[8px] text-gray-700 tracking-[0.5em] uppercase">Navigation_Module_Active</div>
      </div>
    </>
  );
}
