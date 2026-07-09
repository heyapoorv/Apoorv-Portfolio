import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiSend, FiUser, FiMail, FiMessageSquare, FiActivity, FiShield } from "react-icons/fi";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const formRef = useRef();
  
  const [loaded, setLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentFrameIdx, setCurrentFrameIdx] = useState(0);

  const frameCount = 160;
  const imagesRef = useRef([]);
  const seqRef = useRef({ frame: 0 });

  const currentFrame = (index) => `/image3/ezgif-frame-${(index + 1).toString().padStart(3, '0')}.jpg`;

  // 1. Preload Sequence
  useEffect(() => {
    let loadedCount = 0;
    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = currentFrame(i);
        img.onload = () => {
            loadedCount++;
            setLoadingProgress(Math.floor((loadedCount / frameCount) * 100));
            if (loadedCount === frameCount) setLoaded(true);
        };
        img.onerror = () => {
            loadedCount++;
            if (loadedCount === frameCount) setLoaded(true);
        };
        imagesRef.current.push(img);
    }
  }, []);

  // 2. GSAP Scroll and Render Logic (Hero Sync)
  useEffect(() => {
    if (!loaded) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Responsive Canvas Size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    };

    const render = () => {
      if (!canvas || !imagesRef.current.length) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      let frameIdx = Math.round(seqRef.current.frame);
      if (frameIdx >= frameCount) frameIdx = frameCount - 1;

      const img = imagesRef.current[frameIdx];
      if (img && img.complete && img.naturalWidth !== 0) {
        const scale = Math.max(
          canvas.width / img.width,
          canvas.height / img.height
        );
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;
        
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
      setCurrentFrameIdx(frameIdx);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Scroll Animation - Sync with Hero logic
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=4000",
        scrub: 1.2, // Smoother scrub
        pin: true,
        anticipatePin: 1
      }
    });

    tl.to(seqRef.current, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      onUpdate: render
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      ScrollTrigger.getAll().filter(t => t.trigger === containerRef.current).forEach(t => t.kill());
    };
  }, [loaded]);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_ezep6zg",
        "template_6fbergt",
        formRef.current,
        "0GSfZwE2fSCw9lqcZ"
      )
      .then(() => {
        toast.success("TRANSMISSION_COMPLETE 🚀");
        formRef.current.reset();
      })
      .catch((err) => {
        toast.error("CONNECTION_FAILURE ❌");
      });
  };

  return (
    <div
      ref={containerRef}
      id="contactme"
      className="relative w-full h-screen bg-[#020202] overflow-hidden flex items-center justify-center font-mono select-none"
    >
      {/* 1. Loading Module (Ultra-high Z) */}
      <AnimatePresence>
        {!loaded && (
          <motion.div 
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-[100] bg-[#020202]"
          >
            <div className="text-[#ff2a2a] font-mono text-[10px] uppercase tracking-[0.5em] mb-4 animate-pulse">
              SYNCING_COMM_STREAM {loadingProgress}%
            </div>
            <div className="w-64 h-[2px] bg-[#ff2a2a]/30 overflow-hidden">
               <motion.div 
                 className="h-full bg-[#ff2a2a]" 
                 style={{ width: `${loadingProgress}%` }}
               />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Cinematic Canvas Layer (Z-0) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* 3. Aesthetic Overlays (Z-10) */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-radial-vignette opacity-40" />
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.3)_100%)]" />

      {/* 4. Peripheral HUD Elements (Z-20) */}
      <AnimatePresence>
        {loaded && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-20 pointer-events-none p-10"
          >
            {/* Top-left animated text */}
            <div className="absolute top-12 left-12">
              <motion.div 
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-[#ff2a2a] font-mono text-[9px] uppercase tracking-[0.7em] font-bold"
              >
                Get In Touch
              </motion.div>
            </div>

            {/* Brackets */}
            <div className="absolute top-10 left-10 w-24 h-24 border-t border-l border-[#ff2a2a]/20" />
            <div className="absolute top-10 right-10 w-24 h-24 border-t border-r border-[#ff2a2a]/20" />
            <div className="absolute bottom-10 left-10 w-24 h-24 border-b border-l border-[#ff2a2a]/20" />
            <div className="absolute bottom-10 right-10 w-24 h-24 border-b border-r border-[#ff2a2a]/20" />

            {/* Static HUD Text */}
            <div className="absolute top-12 left-12 flex items-center space-x-3">
               <FiActivity className="text-[#ff2a2a] text-xs animate-pulse" />
               <span className="text-[#ff2a2a]/40 text-[9px] tracking-[0.4em] uppercase font-bold">Online</span>
            </div>
            
            <div className="absolute bottom-12 right-12 text-right hidden lg:block">
               <span className="text-white/10 text-[9px] tracking-[0.6em] uppercase block mb-1">Archive_003</span>
               <span className="text-[#ff2a2a]/30 text-[9px] tracking-[0.4em] uppercase">&gt; System_Ready</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. Central Contact UI (Z-50) */}
      <AnimatePresence>
        {loaded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-50 w-full max-w-4xl px-6 pointer-events-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-6xl md:text-9xl font-black text-white uppercase tracking-tighter leading-none">
              CONTACT<span className="text-[#ff2a2a] block sm:inline">.ME</span>
            </h2>
              <div className="flex items-center justify-center space-x-2 text-[#ff2a2a]/60 font-mono text-[9px] tracking-[0.6em] uppercase">
                <FiShield />
                <span>Let's work together</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Direct Links Panel */}
              <div className="bg-white/[0.03] backdrop-blur-md border border-white/10 p-10 flex flex-col justify-center space-y-6">
                <a href="mailto:theapoorvdeshmukh@gmail.com" className="flex items-center gap-4 text-white hover:text-[#ff2a2a] transition-colors group">
                  <FiMail className="text-xl group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-mono uppercase tracking-widest">Email</span>
                </a>
                <a href="https://www.linkedin.com/in/theapoorvdeshmukh" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white hover:text-[#ff2a2a] transition-colors group">
                  <FiUser className="text-xl group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-mono uppercase tracking-widest">LinkedIn</span>
                </a>
                <a href="https://github.com/heyapoorv" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white hover:text-[#ff2a2a] transition-colors group">
                  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-xl group-hover:scale-110 transition-transform" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                  <span className="text-xs font-mono uppercase tracking-widest">GitHub</span>
                </a>
                <a href="#" className="flex items-center gap-4 text-[#ff2a2a] hover:text-white transition-colors mt-4 pt-6 border-t border-white/10 group">
                  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-xl group-hover:scale-110 transition-transform" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest">Resume</span>
                </a>
              </div>

              {/* Contact Form */}
              <form
                ref={formRef}
                onSubmit={sendEmail}
                className="lg:col-span-2 bg-white/[0.05] backdrop-blur-md border border-white/20 p-8 md:p-10 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-8 group"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-3">
                    <label className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#ff2a2a]/80 block ml-1">Name</label>
                    <input
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      required
                      className="w-full bg-white/5 border border-white/20 rounded-lg py-4 px-6 text-white text-sm outline-none focus:border-[#ff2a2a] focus:bg-white/10 transition-all placeholder:text-white/30"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#ff2a2a]/80 block ml-1">Email</label>
                    <input
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                      className="w-full bg-white/5 border border-white/20 rounded-lg py-4 px-6 text-white text-sm outline-none focus:border-[#ff2a2a] focus:bg-white/10 transition-all placeholder:text-white/30"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#ff2a2a]/80 block ml-1">Message</label>
                  <textarea
                    name="message"
                    placeholder="How can I help you?"
                    required
                    className="w-full bg-white/5 border border-white/20 rounded-lg py-4 px-6 text-white text-sm outline-none focus:border-[#ff2a2a] focus:bg-white/10 transition-all min-h-[160px] resize-none placeholder:text-white/30"
                  />
                </div>

                <div className="flex justify-center md:justify-end">
                  <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 42, 42, 0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="group flex items-center space-x-4 bg-[#ff2a2a] text-black font-black text-sm uppercase tracking-[0.3em] px-12 py-5 rounded-lg shadow-2xl transition-all w-full md:w-auto justify-center"
                >
                  <span>SEND MESSAGE</span>
                  <FiSend className="text-lg transition-transform group-hover:translate-x-1" />
                </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ToastContainer
        position="bottom-right"
        toastClassName="bg-black border border-[#ff2a2a]/30 text-white font-mono text-[9px] rounded-none backdrop-blur-xl"
        progressClassName="bg-[#ff2a2a]"
      />
    </div>
  );
};

export default Contact;
