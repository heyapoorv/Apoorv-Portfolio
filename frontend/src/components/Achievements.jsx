import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiStar } from 'react-icons/fi';
import { useFirebaseData } from '../hooks/useFirebaseData';

gsap.registerPlugin(ScrollTrigger);

export const fallbackAchievementsData = [
  {
    category: "Hackathons",
    title: "[Hackathon Name / Placement]",
    description: "Brief description of what you built and achieved during this hackathon."
  },
  {
    category: "Coding Competitions",
    title: "[Competition Name / Rank]",
    description: "Brief description of your ranking or performance."
  },
  {
    category: "Open Source",
    title: "Contributions to [Project Name]",
    description: "Brief description of the PRs merged or issues resolved."
  },
  {
    category: "Freelance",
    title: "Successfully delivered [X] Projects",
    description: "Milestone or metric showcasing your freelance success."
  }
];

export default function Achievements() {
  const containerRef = useRef(null);
  const { data: dynamicAchievements } = useFirebaseData('achievements', fallbackAchievementsData);

  useEffect(() => {
    // wait for data
    if (dynamicAchievements.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".achieve-card",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [dynamicAchievements]);

  return (
    <section ref={containerRef} id="achievements" className="py-24 px-6 md:px-12 lg:px-24 bg-black text-white border-t border-white/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-[#ff2a2a]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-[#ff2a2a]/30 bg-[#ff2a2a]/5 rounded-sm mb-4">
            <FiStar className="text-[#ff2a2a]" size={12} />
            <p className="text-[#ff2a2a] font-mono text-[10px] uppercase tracking-[0.5em]">MILESTONES</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">
            Achievements<span className="text-[#ff2a2a]">.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dynamicAchievements.map((item, i) => (
            <div
              key={i}
              className="achieve-card group p-8 bg-[#0a0a0a] border border-white/10 hover:border-[#ff2a2a]/30 transition-all duration-300"
            >
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#ff2a2a] mb-2">
                {item.category}
              </div>
              <h3 className="text-xl font-bold text-white uppercase tracking-wide mb-3 group-hover:text-[#ff2a2a] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm font-light text-gray-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
