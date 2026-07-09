import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiAward, FiExternalLink } from 'react-icons/fi';
import { useFirebaseData } from '../hooks/useFirebaseData';

gsap.registerPlugin(ScrollTrigger);

export const fallbackCertificatesData = [
  {
    title: "[AI/ML CERTIFICATION TITLE]",
    issuer: "[ISSUING ORGANIZATION]",
    date: "[COMPLETION DATE]",
    link: "#"
  },
  {
    title: "[CLOUD/DEVOPS CERTIFICATION]",
    issuer: "[ISSUING ORGANIZATION]",
    date: "[COMPLETION DATE]",
    link: "#"
  },
  {
    title: "[DEVELOPMENT CERTIFICATION]",
    issuer: "[ISSUING ORGANIZATION]",
    date: "[COMPLETION DATE]",
    link: "#"
  }
];

export default function Certificates() {
  const containerRef = useRef(null);
  const { data: dynamicCertificates } = useFirebaseData('certificates', fallbackCertificatesData);

  useEffect(() => {
    if (dynamicCertificates.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".cert-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
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
  }, [dynamicCertificates]);

  return (
    <section ref={containerRef} id="certificates" className="py-24 px-6 md:px-12 lg:px-24 bg-black text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <div className="inline-block px-3 py-1 border border-[#ff2a2a]/30 bg-[#ff2a2a]/5 rounded-sm mb-4">
              <p className="text-[#ff2a2a] font-mono text-[10px] uppercase tracking-[0.5em]">CREDENTIALS</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase">
              Certifications<span className="text-[#ff2a2a]">.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dynamicCertificates.map((cert, i) => (
            <div
              key={i}
              className="cert-card group flex flex-col p-8 bg-[#0a0a0a] border border-white/10 hover:border-[#ff2a2a]/40 hover:shadow-[0_0_20px_rgba(255,42,42,0.1)] transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#ff2a2a]/5 rounded-full blur-2xl group-hover:bg-[#ff2a2a]/10 transition-all"></div>

              <div className="text-[#ff2a2a] mb-6 flex justify-between items-start">
                <FiAward size={32} />
                {cert.link && (
                  <a href={cert.link} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#ff2a2a] transition-colors">
                    <FiExternalLink size={18} />
                  </a>
                )}
              </div>

              <h3 className="text-lg font-bold uppercase tracking-wide mb-2 group-hover:text-[#ff2a2a] transition-colors">
                {cert.title}
              </h3>

              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mt-auto pt-4">
                <span className="text-white/80">{cert.issuer}</span> // {cert.date}
              </div>

              <div className="absolute bottom-0 left-0 w-8 h-[2px] bg-[#ff2a2a]/50 group-hover:w-full transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
