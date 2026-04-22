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
    <section id="experience" className="section-frame relative flex min-h-[500px] items-center overflow-hidden bg-background scroll-mt-14 md:min-h-[620px]">
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

      <div data-anchor-target="experience" className="container-premium relative z-10 grid w-full grid-cols-1 lg:grid-cols-2">
        <div className="max-w-2xl space-y-6 py-8 md:space-y-8 md:py-14">
          <AnimateIn direction="left">
            <span className="mb-4 block font-label text-[10px] font-bold uppercase tracking-[0.35em] text-primary md:text-sm">Elevated Perspectives</span>
            <h2 className="section-heading text-on-surface">
              The Rooftop <br />
              <span className="italic font-light text-primary">Experience</span>
            </h2>
          </AnimateIn>

          <AnimateIn direction="left" delay={0.2}>
            <p className="section-copy max-w-xl text-base italic opacity-90 md:text-lg">
              Surrender to the Bangalore skyline. Perched above the Koramangala pulse, our rooftop sanctuary is where the city’s energy meets our craft.
            </p>
          </AnimateIn>

          <div className="grid grid-cols-2 gap-5 border-t border-primary/10 pt-6 md:gap-8">
            <AnimateIn direction="up" delay={0.4}>
              <p className="mb-2 font-headline text-4xl text-primary md:text-5xl">360°</p>
              <p className="font-label text-[10px] uppercase tracking-[0.24em] text-on-surface-variant/70">Skyline Sanctuary</p>
            </AnimateIn>
            <AnimateIn direction="up" delay={0.5}>
              <p className="mb-2 font-headline text-4xl text-primary md:text-5xl">Level 4</p>
              <p className="font-label text-[10px] uppercase tracking-[0.24em] text-on-surface-variant/70">Vault District</p>
            </AnimateIn>
          </div>

          <AnimateIn direction="up" delay={0.6}>
            <a href="#reservations" className="inline-flex w-full items-center justify-center gap-3 rounded-xl px-8 py-4 font-label text-xs font-bold uppercase tracking-[0.28em] text-[#0a0a0a] shadow-2xl transition-all hover:brightness-110 active:scale-95 sm:w-auto md:px-10 brass-gradient">
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
