import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Calendar } from 'lucide-react';
import logo from '../assets/logo.png';

const navLinks = [
  { name: 'Home', href: '/#home' },
  { name: 'Our Story', href: '/#our-story' },
  { name: 'Menu', href: '/#menu' },
  { name: 'Gallery', href: '/#gallery' },
  { name: 'Reservations', href: '/#reservations' },
];

const Navigation: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route or hash change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-500",
          scrolled || mobileMenuOpen
            ? "bg-[#121316]/95 py-2 shadow-2xl shadow-black/80 backdrop-blur-md"
            : "bg-transparent py-4 md:py-6"
        )}
      >
        <div className="container-premium flex justify-between items-center px-4 md:px-8">
          {/* Logo Area */}
          <Link to="/" className="relative z-50 group">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center cursor-pointer"
            >
              {/* Logo Glow Effect */}
              <div className={cn(
                "absolute inset-0 bg-primary/20 blur-[30px] rounded-full transition-opacity duration-500",
                scrolled ? "opacity-30" : "opacity-60"
              )} />

              <img
                src={logo}
                alt="Brooks & Bonds Brewery"
                className={cn(
                  "transition-all duration-500 object-contain relative z-10 drop-shadow-[0_0_20px_rgba(242,202,80,0.4)]",
                  scrolled ? "h-12 md:h-14" : "h-20 md:h-32"
                )}
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((item) => (
              <motion.a
                key={item.name}
                whileHover={{ y: -2 }}
                href={item.href}
                className="text-on-surface hover:text-primary transition-all font-label uppercase tracking-[0.2em] text-[11px] group relative"
              >
                {item.name}
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-2 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"
                />
              </motion.a>
            ))}
          </div>

          {/* Action Buttons & Mobile Toggle */}
          <div className="flex items-center space-x-4 md:space-x-8">
            <motion.a
              href="#reservations"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="hidden sm:block brass-gradient text-[#0a0a0a] font-label text-[10px] uppercase font-bold tracking-[0.3em] px-6 md:px-10 py-3 md:py-3.5 rounded-lg shadow-xl shadow-primary/5 transition-all text-center"
            >
              Book a Table
            </motion.a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden relative z-50 p-2 text-primary hover:bg-primary/10 rounded-full transition-colors"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col justify-center items-center lg:hidden"
          >
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
              <div className="absolute top-[20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 blur-[120px] rounded-full" />
              <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] bg-secondary/20 blur-[120px] rounded-full" />
            </div>

            <div className="flex flex-col items-center space-y-10 relative z-10 w-full px-8">
              {navLinks.map((item, index) => (
                <motion.a
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-on-surface hover:text-primary transition-all font-headline text-4xl md:text-5xl uppercase tracking-tighter italic"
                >
                  {item.name}
                </motion.a>
              ))}

              <motion.a
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                href="#reservations"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-8 brass-gradient text-[#0a0a0a] font-label text-xs uppercase font-bold tracking-[0.4em] px-12 py-5 rounded-xl shadow-2xl flex items-center gap-3"
              >
                <Calendar size={18} />
                Book a Ritual
              </motion.a>

              <div className="pt-12 text-center opacity-30">
                <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant">Est. 1892</p>
                <p className="font-label text-[9px] uppercase tracking-[0.3em] text-primary mt-2">Koramangala, Bangalore</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
