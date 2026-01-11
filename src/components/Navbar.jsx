import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, FileText, Menu, X, ArrowRight } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'GitHub', href: 'https://github.com/SoumyaRanjanBhanja1', icon: Github, external: true },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/soumya-ranjan-bhanja-270644247', icon: Linkedin, external: true },
    { name: 'Resume', href: '/resume.pdf', icon: FileText, external: true },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-indigo-950/80 backdrop-blur-md border-b border-white/10 shadow-lg py-3' 
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-white">
          
          {/* Logo / Brand */}
          <Link to="/about" className="group relative z-50">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
                <h1 className="relative text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200 group-hover:from-yellow-200 group-hover:to-pink-200 transition-all">
                  Soumya<span className="font-light text-indigo-300">Ranjan</span>
                </h1>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <NavLink key={index} {...link} />
            ))}
            
            {/* CTA Button Example */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 font-medium text-sm shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all border border-white/10"
            >
              Contact Me
            </motion.button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden z-50">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-yellow-300 transition-colors"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-indigo-950 flex flex-col justify-center items-center md:hidden"
          >
            {/* Background Gradient Orbs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/30 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-600/30 rounded-full blur-3xl" />

            <div className="relative z-10 flex flex-col gap-8 text-center">
              {navLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target={link.external ? "_blank" : "_self"}
                  rel={link.external ? "noopener noreferrer" : ""}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="text-2xl font-bold text-white/90 hover:text-yellow-300 flex items-center justify-center gap-3 group"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <link.icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Reusable Desktop Link Component
const NavLink = ({ name, href, icon: Icon, external }) => {
  return (
    <a
      href={href}
      target={external ? "_blank" : "_self"}
      rel={external ? "noopener noreferrer" : ""}
      className="relative group flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-300"
    >
      <Icon size={16} className="text-indigo-400 group-hover:text-yellow-300 transition-colors" />
      <span className="text-sm font-medium tracking-wide">{name}</span>
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-300 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
    </a>
  );
};

export default Navbar;
