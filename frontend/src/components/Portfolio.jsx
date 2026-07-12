import React, { useState } from "react";
import { FiGithub, FiExternalLink, FiX, FiLayout, FiBox, FiCpu } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useFirebaseData } from "../hooks/useFirebaseData";
import { projectData as fallbackProjectData } from "../data/projectsData";

const Portfolio = () => {
  const domains = ["ALL", "AI / Machine Learning", "Full Stack"];
  const [activeDomain, setActiveDomain] = useState("ALL");
  const [selectedProject, setSelectedProject] = useState(null);

  const { data: projectData } = useFirebaseData('projects', fallbackProjectData);

  const filteredProjects = activeDomain === "ALL" 
    ? projectData 
    : projectData.filter(p => p.domain === activeDomain);

  // Close modal on escape key
  React.useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="bg-black py-24 px-6 md:px-12 lg:px-24 relative z-0">
      <div className="max-w-7xl mx-auto text-center mb-16 relative z-10">
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[#ff2a2a] font-sans font-semibold tracking-[0.2em] uppercase text-[10px] mb-4"
        >
          Project Showcase
        </motion.p>
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-display font-black text-white mb-8 uppercase tracking-tighter"
        >
          Featured Projects<span className="text-[#ff2a2a]">.</span>
        </motion.h2>

        {/* Domain Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          {domains.map(domain => (
            <button
              key={domain}
              onClick={() => setActiveDomain(domain)}
              className={`px-6 py-2 text-[10px] font-mono tracking-[0.2em] uppercase border transition-all duration-300 ${
                activeDomain === domain 
                  ? 'bg-[#ff2a2a] border-[#ff2a2a] text-black font-bold'
                  : 'bg-transparent border-white/20 text-white hover:border-[#ff2a2a]/50 hover:text-[#ff2a2a]'
              }`}
            >
              {domain}
            </button>
          ))}
        </motion.div>
      </div>

      <motion.div layout className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
        <AnimatePresence>
          {filteredProjects.map((project, index) => (
            <motion.div
              layout
              key={project.title + index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="group relative overflow-hidden rounded-[1rem] bg-[#0a0a0a] border border-white/10 hover:border-[#ff2a2a]/50 hover:shadow-[0_10px_30px_rgba(255,42,42,0.1)] transition-all duration-500 flex flex-col"
            >
              <div className="absolute top-4 right-4 z-10 px-2 py-1 bg-black/60 backdrop-blur-md border border-white/10 text-[8px] font-mono text-white tracking-widest uppercase">
                {project.domain}
              </div>

              <div className="relative overflow-hidden aspect-[16/10] rounded-[0.5rem] m-2 cursor-pointer" onClick={() => setSelectedProject(project)}>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="px-4 py-2 bg-[#ff2a2a] text-black text-[10px] font-bold uppercase tracking-widest rounded-sm translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    View Details
                  </span>
                </div>
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-2 tracking-tight uppercase group-hover:text-[#ff2a2a] transition-colors">{project.title}</h3>
                <p className="text-gray-500 text-xs mb-6 font-light">{project.shortDesc}</p>
                
                <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[9px] uppercase tracking-[0.2em] font-mono px-2 py-1 bg-white/5 border border-white/10 text-white/70 rounded-none">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4 pt-4 border-t border-white/10">
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="flex-1 py-2 text-center text-[10px] font-bold uppercase tracking-widest text-[#ff2a2a] hover:bg-[#ff2a2a]/10 transition-colors"
                  >
                    Details
                  </button>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-2 text-white hover:text-[#ff2a2a] transition-colors">
                    <FiGithub size={16} />
                  </a>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 text-white hover:text-[#ff2a2a] transition-colors">
                    <FiExternalLink size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-12 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="w-full max-w-5xl max-h-[90vh] bg-[#050505] border border-white/10 overflow-y-auto custom-scrollbar flex flex-col rounded-sm relative"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-[#050505]/90 backdrop-blur-md border-b border-white/10 p-6 flex justify-between items-center z-20">
                <div>
                  <span className="text-[#ff2a2a] text-[10px] font-mono tracking-widest uppercase mb-1 block">
                    {selectedProject.domain}
                  </span>
                  <h3 className="text-2xl font-black uppercase text-white tracking-tighter">
                    {selectedProject.title}
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="p-2 bg-white/5 hover:bg-[#ff2a2a] hover:text-black text-white transition-colors rounded-sm"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 md:p-10 text-gray-300">
                <div className="w-full aspect-[21/9] bg-black border border-white/5 mb-10 overflow-hidden rounded-sm relative">
                    <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover opacity-80" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="md:col-span-2 space-y-10">
                    <section>
                      <h4 className="flex items-center gap-2 text-lg font-bold text-white uppercase tracking-wide mb-4">
                        <FiLayout className="text-[#ff2a2a]" /> Overview
                      </h4>
                      <p className="text-sm font-light leading-relaxed whitespace-pre-line">{selectedProject.details.overview}</p>
                    </section>
                    
                    <section>
                      <h4 className="flex items-center gap-2 text-lg font-bold text-white uppercase tracking-wide mb-4">
                        <FiBox className="text-[#ff2a2a]" /> Key Features
                      </h4>
                      <ul className="list-disc pl-5 text-sm font-light space-y-2">
                        {selectedProject.details.features.map(f => <li key={f}>{f}</li>)}
                      </ul>
                    </section>

                    {selectedProject.details.architecture && (
                      <section>
                        <h4 className="flex items-center gap-2 text-lg font-bold text-white uppercase tracking-wide mb-4">
                          <FiCpu className="text-[#ff2a2a]" /> Architecture & Workflow
                        </h4>
                        <p className="text-sm font-light leading-relaxed whitespace-pre-line">{selectedProject.details.architecture}</p>
                      </section>
                    )}

                    <section>
                      <h4 className="flex items-center gap-2 text-lg font-bold text-white uppercase tracking-wide mb-4">
                        <FiCpu className="text-[#ff2a2a]" /> Challenges & Learnings
                      </h4>
                      <div className="p-4 bg-white/5 border-l-2 border-[#ff2a2a] text-sm font-light mb-4 whitespace-pre-line">
                        <strong className="text-white block mb-1">Challenges Solved:</strong>
                        {selectedProject.details.challenges}
                      </div>
                      <div className="p-4 bg-white/5 border-l-2 border-gray-600 text-sm font-light whitespace-pre-line">
                        <strong className="text-white block mb-1">What I Learned / Impact:</strong>
                        {selectedProject.details.learned}
                      </div>
                    </section>
                  </div>

                  <div className="space-y-8">
                    <div className="p-6 bg-[#0a0a0a] border border-white/5 rounded-sm">
                      <h4 className="text-xs font-mono font-bold text-[#ff2a2a] uppercase tracking-widest mb-4">Tech Stack</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.details.techStack.map(t => (
                          <span key={t} className="px-3 py-1 bg-white/5 text-white/80 text-[10px] font-mono uppercase tracking-wider">{t}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                      <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold uppercase tracking-widest transition-colors">
                        <FiGithub /> Source Code
                      </a>
                      <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full py-4 bg-[#ff2a2a]/10 hover:bg-[#ff2a2a] border border-[#ff2a2a]/30 text-[#ff2a2a] hover:text-black text-xs font-bold uppercase tracking-widest transition-colors">
                        <FiExternalLink /> Live Demo
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #000;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ff2a2a;
        }
      `}</style>
    </section>
  );
};

export default Portfolio;
