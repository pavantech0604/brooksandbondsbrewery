import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import AnimateIn from './AnimateIn';
import bgImage from '../assets/bg.jpg';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const springY = useSpring(useTransform(scrollY, [0, 500], [0, 150]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="home" className="relative min-h-[90vh] md:min-h-screen w-full flex items-center justify-center overflow-hidden py-20 md:py-32">
      {/* Background with Parallax */}
      <motion.div 
        style={{ y: springY }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={bgImage} 
          alt="Brooks & Bonds Background"
          className="w-full h-full object-cover transition-opacity duration-1000 opacity-90 brightness-[0.7] contrast-[1.1]"
        />
        {/* Subtle Dark Overlays for Legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/60" />
        <div className="absolute inset-0 bg-black/30" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 text-center container-premium flex flex-col items-center px-4"
      >
        <AnimateIn delay={0.2}>
          <span className="font-label tracking-[0.3em] md:tracking-[0.5em] text-on-surface bg-black/60 backdrop-blur-md px-4 md:px-6 py-2 rounded-full uppercase text-[9px] md:text-[10px] mb-6 md:mb-8 inline-block border border-primary/20 shadow-[0_0_20px_rgba(242,202,80,0.2)]">
            Established 1892 — Koramangala
          </span>
        </AnimateIn>

        <AnimateIn delay={0.4}>
          <h1 className="font-headline text-4xl sm:text-6xl md:text-8xl text-on-surface font-light tracking-tight leading-[1.1] mb-8 md:mb-10 drop-shadow-[0_4px_30px_rgba(0,0,0,1)] px-2">
            THE ART OF <br />
            <span className="italic text-primary drop-shadow-[0_0_25px_rgba(242,202,80,0.4)]">THE VOID</span>
          </h1>
        </AnimateIn>

        <AnimateIn delay={0.6}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8 w-full sm:w-auto px-6 sm:px-0">
            <a 
              href="#reservations" 
              className="w-full sm:w-auto brass-gradient text-[#0a0a0a] px-10 py-4 rounded-xl font-label text-xs font-bold uppercase tracking-[0.3em] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] transition-all hover:scale-[1.02] active:scale-[0.98] text-center"
            >
              Secure Your Ritual
            </a>
            <a 
              href="#gallery" 
              className="w-full sm:w-auto border border-white/20 text-on-surface px-10 py-4 rounded-xl font-label text-xs font-bold uppercase tracking-[0.3em] bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all text-center"
            >
              Explore Archive
            </a>
          </div>
        </AnimateIn>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 hidden md:flex"
      >
        <span className="font-label text-[9px] uppercase tracking-[0.4em] opacity-50">Discovery Sequence</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary/60 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
