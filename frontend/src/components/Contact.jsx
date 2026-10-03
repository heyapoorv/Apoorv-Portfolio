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
  
  const [loaded, setLoaded] = useState(true);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        toast.success("TRANSMISSION_COMPLETE 🚀");
        formRef.current.reset();
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        toast.error(`ERROR: ${err.text || "CONNECTION_FAILURE"}`);
      });
  };

  return (
    <div
      ref={containerRef}
      id="contactme"
      className="relative w-full h-screen bg-[#020202] overflow-hidden flex items-center justify-center font-mono"
    >


      {/* 3. Aesthetic Overlays (Z-10) */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-radial-vignette opacity-40" />
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,transparent_0%,rgba(0,0,0,0.3)_100%)]" />



      {/* 5. Central Contact UI (Z-50) */}
      <AnimatePresence>
        {loaded && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            exit={{ opacity: 0, y: 30 }}
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
