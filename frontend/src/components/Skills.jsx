import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useFirebaseData } from '../hooks/useFirebaseData';

gsap.registerPlugin(ScrollTrigger);

const fallbackSkillCategories = [
  {
    category: "Programming",
    skills: ["Python", "C++", "JavaScript", "SQL"]
  },
  {
    category: "AI / ML",
    skills: ["TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "Hugging Face", "LangChain", "LlamaIndex"]
  },
  {
    category: "Backend",
    skills: ["FastAPI", "Node.js", "Express"]
  },
  {
    category: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS"]
  },
  {
    category: "Database",
    skills: ["PostgreSQL", "MongoDB", "Redis"]
  },
  {
    category: "Cloud & DevOps",
    skills: ["Docker", "Git", "GitHub", "AWS"]
  }
];

export default function Skills() {
  const containerRef = useRef(null);
  const { data: skillCategories } = useFirebaseData('skills', fallbackSkillCategories);

  useEffect(() => {
    // Only animate if data is loaded
    if (skillCategories.length > 0) {
      const ctx = gsap.context(() => {
        gsap.fromTo(".skill-group", 
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            stagger: 0.1,
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }, containerRef);
      return () => ctx.revert();
    }
  }, [skillCategories]);

  return (
    <section ref={containerRef} id="skills" className="py-24 px-6 md:px-12 lg:px-24 bg-black text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 border border-[#ff2a2a]/30 bg-[#ff2a2a]/5 rounded-sm mb-4">
            <p className="text-[#ff2a2a] font-mono text-[10px] uppercase tracking-[0.5em]">TECHNICAL ARSENAL</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">
            Skills & Stack<span className="text-[#ff2a2a]">.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((group, i) => (
            <div 
              key={i} 
              className="skill-group p-8 bg-[#0a0a0a] border border-white/10 hover:border-[#ff2a2a]/30 transition-all duration-300 relative group opacity-0"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ff2a2a]/0 to-transparent group-hover:via-[#ff2a2a]/50 transition-all duration-500"></div>
              
              <h3 className="text-[14px] font-mono font-bold uppercase tracking-[0.2em] text-[#ff2a2a] mb-6">
                {group.category}
              </h3>
              
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill, j) => (
                  <span 
                    key={j} 
                    className="px-4 py-2 text-xs font-medium text-white/80 bg-white/5 border border-white/10 hover:border-[#ff2a2a]/50 hover:text-white transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
