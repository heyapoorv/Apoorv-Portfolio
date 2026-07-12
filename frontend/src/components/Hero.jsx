import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import { useFirebaseData } from '../hooks/useFirebaseData';
import { fallbackProfileData } from '../data/profileData';

const Hero = () => {
  const containerRef = useRef(null);
  
  const { data: profileArr } = useFirebaseData('profile', [fallbackProfileData]);
  const profile = profileArr && profileArr.length > 0 ? profileArr[0] : fallbackProfileData;

  useGSAP(() => {
    const tl = gsap.timeline();
    
    tl.fromTo('.hero-divider',
        { scaleX: 0 },
        { scaleX: 1, duration: 1, ease: 'power4.out', delay: 0.2, transformOrigin: 'left' }
      )
      .fromTo('.hero-text',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.15 },
        '-=0.6'
      )
      .fromTo('.hero-image',
        { opacity: 0, scale: 0.9, x: 30 },
        { opacity: 1, scale: 1, x: 0, duration: 1.5, ease: 'power3.out' },
        '-=1'
      );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="home" className="relative min-h-screen w-full bg-[#050505] overflow-hidden flex items-center justify-center pt-32 pb-20">
      
      {/* Subtle glowing background aesthetic focused behind the image */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_75%_50%,rgba(255,42,42,0.06)_0%,transparent_40%)] pointer-events-none"></div>

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center relative z-10">
        
        {/* LEFT COLUMN: TEXT CONTENT */}
        <div className="flex flex-col items-start order-2 lg:order-1">
          <div className="hero-divider w-12 h-[2px] bg-[#ff2a2a] mb-8"></div>
          
          <h1 className="hero-text text-white text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight mb-6 leading-[1.1] drop-shadow-2xl">
            {profile.tagline}
          </h1>
          
          <p className="hero-text text-gray-300 text-sm md:text-base leading-relaxed font-light mb-10 max-w-lg">
            {profile.subtitle}
          </p>
          
          {/* Action Links */}
          <div className="hero-text flex flex-wrap gap-6">
            {profile.resumeLink && profile.resumeLink !== '#' && (
              <a href={profile.resumeLink} target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 bg-[#ff2a2a] text-white font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors duration-300">
                Resume ↗
              </a>
            )}
            <a href="#contactme" className="px-8 py-3.5 border border-white/20 text-white font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-colors duration-300">
              Contact ↗
            </a>
          </div>

        </div>

        {/* RIGHT COLUMN: FLOATING IMAGE */}
        <div className="hero-image relative order-1 lg:order-2 flex justify-center lg:justify-end items-center">
          <motion.div 
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
            className="relative w-[80vw] h-[90vw] sm:w-[60vw] sm:h-[70vw] md:w-[45vw] md:h-[55vw] lg:w-[400px] lg:h-[550px] xl:w-[450px] xl:h-[600px]"
          >
            {/* The Image Container (Rounded Rectangle) */}
            <div className="absolute inset-0 rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(255,42,42,0.08)] bg-[#111]">
              <img
                src="/images/profile.jpg"
                alt="Apoorv Profile"
                className="w-full h-full object-cover origin-center opacity-90 mix-blend-lighten"
                onError={(e) => { e.target.style.display = 'none' }}
              />
              {/* Bottom shadow gradient inside the image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
            </div>
            
            {/* Accent glowing orbs behind the image */}
            <div className="absolute -z-10 -top-12 -right-12 w-40 h-40 bg-[#ff2a2a]/10 blur-[60px] rounded-full pointer-events-none"></div>
            <div className="absolute -z-10 -bottom-10 -left-10 w-32 h-32 bg-[#ff2a2a]/5 blur-[60px] rounded-full pointer-events-none"></div>
          </motion.div>
        </div>

      </div>

      {/* Bottom Row - Socials only */}
      <div className="absolute bottom-0 left-0 right-0 z-[10] px-6 md:px-12 lg:px-20 pb-10">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-start gap-8">
          {[
            { name: 'INSTAGRAM', url: profile.instagram }, 
            { name: 'LINKEDIN', url: profile.linkedin },
            { name: 'GITHUB', url: profile.github }
          ].filter(s => s.url && s.url !== '#').map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank" rel="noopener noreferrer"
              className="text-[#ff2a2a] text-[10px] uppercase tracking-widest transition-colors duration-300 hover:text-white font-semibold"
            >
              {social.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
