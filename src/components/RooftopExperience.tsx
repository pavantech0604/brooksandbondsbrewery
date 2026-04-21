import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import AnimateIn from './AnimateIn';
import backgroundAvif from '../assets/background.avif';

const RooftopExperience: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useSpring(useTransform(scrollYProgress, [0.3, 0.7], [0, -80]), {
    stiffness: 100,
    damping: 30
  });

  return (
    <section id="experience" className="relative pt-20 pb-32 md:pt-32 md:pb-48 bg-background flex items-center overflow-hidden scroll-mt-8 min-h-[600px] md:min-h-screen">
      {/* Background with Parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <img
          src={backgroundAvif}
          alt="Bangalore Skyline Rooftop"
          className="w-full h-full object-cover opacity-70 md:opacity-80 contrast-125 saturate-100 blur-none brightness-50 md:brightness-75 transition-all duration-1000"
        />
        {/* Dynamic Gradient for Legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/60 to-transparent lg:bg-gradient-to-r lg:from-background lg:via-background/40 lg:to-transparent" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 w-full">
        <div className="space-y-10 md:space-y-12 py-12 md:py-32">
          <AnimateIn direction="left">
            <span className="font-label tracking-[0.4em] text-primary uppercase text-[10px] md:text-sm mb-4 block font-bold">Elevated Perspectives</span>
            <h2 className="font-headline text-5xl sm:text-7xl md:text-8xl text-on-surface leading-[1.1] tracking-tighter uppercase">
              The Rooftop <br />
              <span className="italic font-light text-primary">Experience</span>
            </h2>
          </AnimateIn>

          <AnimateIn direction="left" delay={0.2}>
            <p className="text-on-surface-variant font-body text-lg md:text-xl leading-relaxed max-w-lg italic opacity-90">
              Surrender to the Bangalore skyline. Perched above the Koramangala pulse, our rooftop sanctuary is where the city’s energy meets our craft.
            </p>
          </AnimateIn>

          <div className="grid grid-cols-2 gap-10 md:gap-12 pt-10 border-t border-primary/10">
            <AnimateIn direction="up" delay={0.4}>
              <p className="font-headline text-4xl md:text-5xl text-primary mb-2">360°</p>
              <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/70">Skyline Sanctuary</p>
            </AnimateIn>
            <AnimateIn direction="up" delay={0.5}>
              <p className="font-headline text-4xl md:text-5xl text-primary mb-2">Level 4</p>
              <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant/70">Vault District</p>
            </AnimateIn>
          </div>

          <AnimateIn direction="up" delay={0.6}>
            <a href="#reservations" className="w-full sm:w-auto brass-gradient text-[#0a0a0a] px-10 md:px-12 py-4 md:py-5 rounded-xl font-label text-xs font-bold uppercase tracking-[0.3em] shadow-2xl transition-all hover:brightness-110 active:scale-95 inline-flex items-center justify-center gap-3">
              Experience View
            </a>
          </AnimateIn>
        </div>
      </div>

      {/* Decorative vertical line */}
      <div className="absolute right-12 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-primary/20 to-transparent hidden xl:block" />
    </section>
  );
};

export default RooftopExperience;
