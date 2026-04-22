import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import AnimateIn from './AnimateIn';
import bgImage from '../assets/bg.jpg';

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const springY = useSpring(useTransform(scrollY, [0, 500], [0, 120]), {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="home" className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-0 pb-14 pt-28 md:pb-18 md:pt-34">
      {/* Background with Parallax */}
      <motion.div
        style={{ y: springY }}
        className="absolute inset-0 z-0"
      >
        <img
          src={bgImage}
          alt="Brooks & Bonds Background"
          className="h-full w-full object-cover object-center transition-opacity duration-1000 opacity-100 brightness-[0.85] contrast-[1.1] saturate-[1.05]"
        />
        {/* Subtle Dark Overlays for Legibility */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,6,8,0.5)_0%,rgba(10,10,12,0.1)_28%,rgba(10,10,12,0.2)_72%,rgba(8,8,10,0.9)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,rgba(242,202,80,0.15),transparent_45%)]" />
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-40 bg-gradient-to-b from-black/40 to-transparent" />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        data-anchor-target="home"
        className="container-premium relative z-10"
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
          <AnimateIn delay={0.15}>
            <span className="mb-6 inline-flex rounded-full border border-primary/20 bg-black/45 px-4 py-2 text-[9px] uppercase tracking-[0.32em] text-on-surface shadow-[0_0_24px_rgba(242,202,80,0.12)] backdrop-blur-md md:mb-7 md:px-5 md:text-[10px] md:tracking-[0.42em]">
              Established 1892 — Koramangala
            </span>
          </AnimateIn>

          <AnimateIn delay={0.3}>
            <div className="mx-auto max-w-5xl">
              <h1 className="font-headline text-[clamp(3rem,8vw,6.6rem)] font-light uppercase leading-[0.88] tracking-[-0.05em] text-on-surface drop-shadow-[0_8px_34px_rgba(0,0,0,0.85)]">
                The Art of
                <br />
                <span className="italic text-primary drop-shadow-[0_0_30px_rgba(242,202,80,0.2)]">the Void</span>
              </h1>
            </div>
          </AnimateIn>

          <AnimateIn delay={0.45}>
            <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-on-surface-variant/90 md:mt-6 md:text-lg md:leading-8">
              Craft pours, warm brass light, and an industrial rooftop atmosphere brought into a cleaner digital experience that feels polished from the first screen.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.55}>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-4 text-[11px] font-bold uppercase tracking-[0.28em] text-white md:mt-8 md:gap-7 md:text-xs md:font-black">
              <span>Craft Beer</span>
              <span className="hidden h-1.5 w-1.5 rounded-full bg-primary sm:block" />
              <span>Rooftop Evenings</span>
              <span className="hidden h-1.5 w-1.5 rounded-full bg-primary sm:block" />
              <span>Koramangala</span>
            </div>
          </AnimateIn>

          <AnimateIn delay={0.65}>
            <div className="mt-8 flex w-full max-w-2xl flex-col items-center justify-center gap-4 sm:flex-row md:mt-10">
              <a
                href="#reservations"
                className="w-full rounded-xl px-8 py-4 text-center font-label text-xs font-bold uppercase tracking-[0.28em] text-[#0a0a0a] shadow-[0_22px_44px_-16px_rgba(0,0,0,0.6)] transition-all hover:scale-[1.02] active:scale-[0.98] sm:w-auto brass-gradient"
              >
                Secure Your Ritual
              </a>
              <a
                href="#gallery"
                className="w-full rounded-xl border border-white/15 bg-white/5 px-8 py-4 text-center font-label text-xs font-bold uppercase tracking-[0.28em] text-on-surface backdrop-blur-sm transition-all hover:bg-white/10 sm:w-auto"
              >
                Explore Archive
              </a>
            </div>
          </AnimateIn>

        </div>
      </motion.div>

    </section>
  );
};

export default Hero;
