import React from 'react';
import { FiDownload } from "react-icons/fi";
import { useFirebaseData } from '../hooks/useFirebaseData';
import { fallbackProfileData } from '../data/profileData';

export default function About() {
  const { data: profileArr } = useFirebaseData('profile', [fallbackProfileData]);
  const profile = profileArr && profileArr.length > 0 ? profileArr[0] : fallbackProfileData;
  return (
    <div id="about" className="relative w-full min-h-[70vh] bg-black overflow-hidden flex items-center justify-center font-sans tracking-wide py-20 px-6 md:px-12">
        
        {/* --- BG EFFECTS --- */}
        <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        <div className="absolute inset-0 z-[15] pointer-events-none" style={{ background: "radial-gradient(circle at 30% 50%, transparent 20%, rgba(0,0,0,0.9) 100%)" }}></div>

        {/* --- STATIC FRAME IMAGE (LEFT 45%) --- */}
        <div className="absolute inset-y-0 left-0 w-[45%] z-10 pointer-events-none overflow-hidden hidden lg:block" style={{ WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)', maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)' }}>
            <img 
               src="/images/profile.jpg" 
               alt="About Profile" 
               className="w-full h-full object-cover opacity-50 grayscale" 
            />
        </div>

        {/* --- CONTENT (RIGHT 55%) --- */}
        <div className="relative z-[50] w-full lg:w-[80%] flex flex-col md:flex-row items-center justify-end">
            
            {/* Visual Gap for the face mask area */}
            <div className="hidden lg:block w-[35%] h-full"></div>

            {/* Main Content Pane */}
            <div className="w-full lg:w-[65%] flex flex-col space-y-10 pointer-events-auto bg-black/40 backdrop-blur-sm p-8 md:p-12 border border-white/5 rounded-2xl">
                {/* Header */}
                <div className="space-y-2">
                    <p className="text-[#ff2a2a] font-mono text-[10px] uppercase tracking-[0.5em]">PROFILE</p>
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter uppercase">
                        About Me<span className="text-[#ff2a2a]">.</span>
                    </h2>
                </div>

                {/* Bio Paragraph */}
                <div className="robotic-section space-y-6">
                    <p className="text-gray-400 text-sm md:text-md lg:text-lg font-light leading-relaxed max-w-2xl" dangerouslySetInnerHTML={{ __html: profile.aboutP1 }}>
                    </p>
                    <p className="text-gray-400 text-sm md:text-md lg:text-lg font-light leading-relaxed max-w-2xl" dangerouslySetInnerHTML={{ __html: profile.aboutP2 }}>
                    </p>
                </div>

                {/* CTA */}
                {profile.resumeLink && profile.resumeLink !== '#' && (
                  <div className="pt-6">
                      <a 
                          href={profile.resumeLink} 
                          target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center space-x-6 px-12 py-4 border border-[#ff2a2a]/50 text-[#ff2a2a] font-bold text-xs uppercase tracking-widest hover:bg-[#ff2a2a] hover:text-black transition-all duration-300 rounded-full"
                      >
                          <span>Download Resume</span>
                          <FiDownload size={16} />
                      </a>
                  </div>
                )}
            </div>
        </div>
    </div>
  );
}
