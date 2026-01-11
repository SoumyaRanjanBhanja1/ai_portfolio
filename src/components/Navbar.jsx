import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, FileText, Menu, X, ChevronRight } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Detect scroll to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', path: '/about', isInternal: true },
    { name: 'GitHub', path: 'https://github.com/SoumyaRanjanBhanja1', icon: Github, isInternal: false },
    { name: 'LinkedIn', path: 'https://www.linkedin.com/in/soumya-ranjan-bhanja-270644247', icon: Linkedin, isInternal: false },
    { name: 'Resume', path: '/resume.pdf', icon: FileText, isInternal: false },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-indigo-950/80 backdrop-blur-md shadow-lg py-3 border-b border-white/10' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-white">
          
          {/* --- BRAND LOGO --- */}
          <Link to="/" className="relative z-50 group">
            <div className="flex items-center gap-2">
              <div className="relative flex items-center justify-center w-10 h-10 bg-gradient-to-tr from-yellow-400 to-purple-600 rounded-xl shadow-lg group-hover:rotate-12 transition-transform duration-300">
                <span className="text-xl font-bold">S</span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-lg font-bold tracking-tight leading-none">
                  Soumya <span className="text-indigo-400">Ranjan</span>
                </h1>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                  Developer
                </span>
              </div>
            </div>
          </Link>

          {/* --- DESKTOP MENU --- */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <div key={index} className="relative group">
                {link.isInternal ? (
                  <Link to={link.path} className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                ) : (
                  <a 
                    href={link.path} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                  >
                    {link.icon && <link.icon size={16} className="text-indigo-400 group-hover:text-yellow-300 transition-colors" />}
                    {link.name}
                  </a>
                )}
                {/* Animated Underline */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </div>
            ))}

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 bg-white text-indigo-900 rounded-full text-sm font-bold hover:bg-yellow-300 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            >
              Let's Talk
            </motion.button>
          </div>

          {/* --- MOBILE HAMBURGER --- */}
          <div className="md:hidden z-50">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* --- MOBILE FULLSCREEN OVERLAY --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-[#0f0c29] md:hidden flex flex-col justify-center items-center"
          >
            {/* Background Aesthetics */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/20 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-600/20 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="flex flex-col gap-6 w-full px-10">
              {navLinks.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                   {link.isInternal ? (
                      <Link 
                        to={link.path} 
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between text-2xl font-semibold text-white/80 hover:text-white border-b border-white/10 pb-4 group"
                      >
                        {link.name}
                        <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity text-yellow-400" />
                      </Link>
                   ) : (
                      <a 
                        href={link.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between text-2xl font-semibold text-white/80 hover:text-white border-b border-white/10 pb-4 group"
                      >
                        <span className="flex items-center gap-3">
                          {link.icon && <link.icon size={24} className="text-indigo-400" />}
                          {link.name}
                        </span>
                        <ChevronRight className="opacity-0 group-hover:opacity-100 transition-opacity text-yellow-400" />
                      </a>
                   )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
