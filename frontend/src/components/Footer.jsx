import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { FiGithub, FiTwitter, FiLinkedin, FiInstagram, FiCpu, FiShield, FiActivity, FiArrowUpRight } from 'react-icons/fi';
import { useFirebaseData } from '../hooks/useFirebaseData';
import { fallbackProfileData } from '../data/profileData';

const Footer = () => {
  const [systemTime, setSystemTime] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking for radial glow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const { data: profileArr } = useFirebaseData('profile', [fallbackProfileData]);
  const profile = profileArr && profileArr.length > 0 ? profileArr[0] : fallbackProfileData;

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      mouseX.set(clientX);
      mouseY.set(clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    const timer = setInterval(() => {
      const now = new Date();
      setSystemTime(now.toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(timer);
    };
  }, []);

  const baseSocialLinks = [
    { icon: <FiGithub />, label: 'GITHUB', url: profile.github, color: 'hover:text-white' },
    { icon: <FiLinkedin />, label: 'LINKEDIN', url: profile.linkedin, color: 'hover:text-blue-400' },
    { icon: <FiTwitter />, label: 'TWITTER', url: profile.twitter, color: 'hover:text-blue-300' },
    { icon: <FiInstagram />, label: 'INSTAGRAM', url: profile.instagram, color: 'hover:text-pink-500' }
  ];
  const socialLinks = baseSocialLinks.filter(s => s.url && s.url !== '#');

  return (
    <footer className="relative w-full bg-[#050505] overflow-hidden pt-20 pb-10 font-sans selection:bg-red-500/30">
      
      {/* --- BACKGROUND FX --- */}
      {/* Radial Glow following cursor */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 opacity-40 mix-blend-screen"
        style={{
          background: `radial-gradient(circle at ${springX}px ${springY}px, rgba(6, 182, 212, 0.15) 0%, transparent 40%)`,
        }}
      />
      
      {/* Digital Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
      </div>

      {/* Pulsing Light Blobs */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] -[#ff2a2a]/5 blur-[120px] rounded-full animate-pulse pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] -[#ff2a2a]/5 blur-[120px] rounded-full animate-pulse delay-700 pointer-events-none" />

      {/* --- TOP DIVIDER (Animated Beam) --- */}
      <div className="relative w-full h-[1px] bg-white/5 mb-20 overflow-hidden">
        <motion.div 
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 left-0 w-[200px] h-full bg-gradient-to-r from-transparent -[#ff2a2a] to-transparent shadow-[0_0_15px_rgba(6,182,212,0.5)]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          
          {/* Section 1: Brand/Core */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-10 h-10 -[#ff2a2a]/10 border -[#ff2a2a]/20 rounded-lg flex items-center justify-center group-hover:-[#ff2a2a] group-hover:-[#ff2a2a] transition-all duration-500">
                <FiCpu className="-[#ff2a2a] text-xl group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-2xl font-black text-white tracking-tighter uppercase italic">
                {profile.name}
              </h3>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed uppercase tracking-widest font-light">
              {profile.footerTagline}
            </p>
          </motion.div>

          {/* Section 3: Tech Stack Info */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <h4 className="text-[11px] font-mono font-bold -[#ff2a2a]/80 tracking-[0.4em] uppercase">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {['Vite', 'React', 'GSAP', 'Framer', 'Three.js'].map((tech) => (
                <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] text-gray-500 tracking-widest hover:-[#ff2a2a]/30 hover:-[#ff2a2a] transition-colors cursor-default">
                  {tech.toUpperCase()}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Section 4: Social Comms */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <h4 className="text-[11px] font-mono font-bold -[#ff2a2a]/80 tracking-[0.4em] uppercase">Socials</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank" rel="noopener noreferrer"
                  whileHover={{ y: -5, scale: 1.1 }}
                  className={`relative w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 rounded-xl text-xl text-gray-400 ${social.color} transition-all duration-300 group`}
                >
                  <div className="absolute inset-0 -[#ff2a2a]/0 group-hover:-[#ff2a2a]/5 blur-xl transition-all" />
                  <div className="absolute inset-0 border -[#ff2a2a]/0 group-hover:-[#ff2a2a]/40 rounded-xl opacity-0 group-hover:opacity-100 transition-all scale-110 group-hover:scale-100" />
                  {social.icon}
                  
                  {/* Tooltip */}
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 -[#ff2a2a] text-white text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none tracking-widest font-bold">
                    {social.label}
                  </span>
                </motion.a>
              ))}
            </div>
            <motion.a
              href="#contactme"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-[#ff2a2a] to-[#ff2a2a] text-black font-black text-[10px] uppercase tracking-[0.5em] rounded-xl shadow-[0_10px_30px_rgba(6,182,212,0.2)] flex items-center justify-center space-x-3 group overflow-hidden relative"
            >
              <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-[100%] transition-all duration-1000" />
              <span>Get In Touch</span>
              <FiArrowUpRight className="text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </motion.a>
          </motion.div>
        </div>

        {/* --- BOTTOM SECTION --- */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-6">
            <div className="text-[10px] text-gray-600 tracking-[0.3em] font-mono uppercase">
              V 1.0.0
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end">
             <div className="text-[10px] text-gray-500 tracking-[0.4em] font-mono uppercase mb-1">
                Local Time: {systemTime}
             </div>
             <p className="text-[9px] text-gray-700 tracking-[0.2em] font-mono uppercase">
                &copy; {profile.name} {(new Date()).getFullYear()}. ALL RIGHTS RESERVED.
             </p>
          </div>
        </div>
      </div>

      {/* Futuristic Scanline Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #fff 2px, #fff 4px)' }}>
      </div>

    </footer>
  );
};

export default Footer;
