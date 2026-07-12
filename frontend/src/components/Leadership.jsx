import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiUsers, FiExternalLink } from 'react-icons/fi';
import { useFirebaseData } from '../hooks/useFirebaseData';

gsap.registerPlugin(ScrollTrigger);

export const fallbackLeadershipData = [
  {
    position: "Event Management Head",
    organization: "Entrepreneurship Development Cell (EDC), PICT",
    duration: "[START DATE] - [END DATE]",
    responsibilities: "Led a team of [number] members to organize and execute large-scale entrepreneurial events, hackathons, and workshops.",
    impact: "Successfully increased event participation by [X]% and managed sponsorships worth [Amount]."
  }
];

export default function Leadership() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const { data: dynamicLeadership } = useFirebaseData('leadership', fallbackLeadershipData);

  useEffect(() => {
    if (dynamicLeadership.length === 0) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      });

      tl.fromTo(headerRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "none", stagger: 0.1 }
      );

      tl.fromTo(".leadership-item",
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.5, ease: "none", stagger: 0.15 },
        "-=0.2"
      );
    }, containerRef);

    return () => ctx.revert();
  }, [dynamicLeadership]);

  return (
    <section
      id="leadership"
      ref={containerRef}
      className="relative py-24 px-6 md:px-12 lg:px-24 bg-[#000] text-white overflow-hidden scroll-mt-24 border-t border-white/5"
    >
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>

      {/* Header */}
      <div ref={headerRef} className="max-w-4xl mx-auto text-center mb-24 relative z-10">
        <div className="inline-block px-3 py-1 border border-[#ff2a2a]/30 bg-[#ff2a2a]/5 rounded-sm mb-4">
          <p className="text-[#ff2a2a] font-mono text-[10px] uppercase tracking-[0.5em]">IMPACT & INITIATIVE</p>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase mb-6">
          Leadership & Positions<span className="text-[#ff2a2a]">.</span>
        </h2>
        <div className="w-24 h-[1px] bg-[#ff2a2a]/40 mx-auto mb-8"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Timeline Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2"></div>

        <div className="flex flex-col gap-12 md:gap-24">
          {dynamicLeadership.map((item, index) => (
            <div key={index} className={`leadership-item relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>

              {/* Center Dot */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-black border-2 border-[#ff2a2a] rounded-full -translate-x-1/2 mt-1 md:mt-0 z-10 hidden md:block"></div>

              {/* Content Box */}
              <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} pl-12 md:pl-0`}>
                <div className="bg-[#0a0a0a] border border-white/10 p-8 hover:border-[#ff2a2a]/30 transition-all duration-300 group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white uppercase tracking-wide group-hover:text-[#ff2a2a] transition-colors flex items-center gap-3">
                      {item.position || item.role}
                      {item.link && (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-[#ff2a2a] transition-colors" title="View Reference">
                          <FiExternalLink size={16} />
                        </a>
                      )}
                    </h3>
                    <span className="text-[10px] font-mono text-[#ff2a2a] tracking-widest mt-2 md:mt-0">
                      {item.duration || item.period}
                    </span>
                  </div>
                  <h4 className="text-sm text-gray-500 font-mono uppercase tracking-[0.2em] mb-4">
                    {item.organization}
                  </h4>

                <div className="space-y-4">
                  <div>
                    <strong className="text-[10px] font-mono uppercase tracking-widest text-white/50 block mb-1">Responsibilities:</strong>
                    <p className="text-sm font-light text-gray-400 leading-relaxed">
                      {item.responsibilities}
                    </p>
                  </div>
                  <div>
                    <strong className="text-[10px] font-mono uppercase tracking-widest text-[#ff2a2a]/70 block mb-1">Impact:</strong>
                    <p className="text-sm font-light text-gray-400 leading-relaxed border-l-2 border-[#ff2a2a]/50 pl-3">
                      {item.impact}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
