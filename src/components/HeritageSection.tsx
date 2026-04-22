import React from 'react';
import { motion } from 'framer-motion';
import AnimateIn from './AnimateIn';
import realBar from '../assets/real/bar-counter.jpg';

const HeritageSection: React.FC = () => {
  return (
    <section
      id="our-story"
      data-anchor-target="our-story"
      className="relative w-full max-w-full overflow-hidden bg-background pt-12 pb-12 scroll-mt-14 md:pt-14 md:pb-14 lg:flex lg:min-h-[90vh] lg:items-center lg:pt-16 lg:pb-16"
    >
      <div
        className="container-premium grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:items-center lg:gap-10 xl:gap-16"
      >

        {/* Story Content */}
        <div className="space-y-5 md:space-y-6 lg:col-span-6">
          <AnimateIn direction="left">
            <span className="mb-3 block font-label text-[10px] md:text-xs uppercase tracking-[0.4em] text-primary">Legacy Sequence</span>
            <h2 className="font-headline text-[clamp(2.2rem,4.5vw,3.75rem)] uppercase leading-[0.9] tracking-[-0.05em] text-on-surface">
              A Living <span className="font-light italic text-primary">Archive</span> Of Craft & Time
            </h2>
          </AnimateIn>

          <AnimateIn direction="left" delay={0.2}>
            <p className="max-w-xl text-[14px] md:text-[15px] italic leading-[1.8] text-on-surface-variant/85">
              Brooks & Bonds stands as a bastion of traditional alchemy. Located in the heart of Koramangala, our space is a deliberate descent into the industrial soul—where the "bio-chemical factory" theme meets the patient pursuit of the perfect pour.
            </p>
          </AnimateIn>

          <div className="pt-1">
            <AnimateIn direction="left" delay={0.5}>
              <motion.a
                href="#gallery"
                whileHover={{ x: 8 }}
                className="group inline-flex items-center gap-4 font-label text-xs font-bold uppercase tracking-[0.3em] text-primary"
              >
                Explore Archive
                <span className="h-[1px] w-12 bg-primary/30 transition-all duration-700 group-hover:w-20 group-hover:bg-primary" />
              </motion.a>
            </AnimateIn>
          </div>

          {/* Technical Stats */}
          <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-5 md:gap-5">
            <AnimateIn direction="up" delay={0.5}>
              <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-5 py-4">
                <p className="mb-1 font-headline text-[2.25rem] text-primary md:text-[2.5rem] leading-none">1892</p>
                <p className="font-label text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/70 mt-2">Heritage Roots</p>
              </div>
            </AnimateIn>
            <AnimateIn direction="up" delay={0.6}>
              <div className="rounded-[1.25rem] border border-white/10 bg-white/[0.03] px-5 py-4">
                <p className="mb-1 font-headline text-[2.25rem] text-primary md:text-[2.5rem] leading-none">6+</p>
                <p className="font-label text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/70 mt-2">House Ferments</p>
              </div>
            </AnimateIn>
          </div>
        </div>

        {/* Visual Content */}
        <div className="relative max-w-full overflow-visible lg:col-span-6">
          <AnimateIn direction="right" delay={0.3} className="group relative z-10 aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_32px_64px_-20px_rgba(0,0,0,0.8)] md:aspect-[16/10] md:rounded-[2.5rem]">
            <img
              src={realBar}
              alt="Industrial Brewing Details"
              className="w-full h-full object-cover contrast-[1.15] brightness-[1.10] saturate-[1.10] group-hover:scale-105 transition-all duration-1000"
            />
            {/* Inner Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

            <div className="absolute inset-x-auto bottom-5 right-5 z-20 w-[14.5rem] rounded-[1.25rem] border border-white/10 bg-[#17181c]/95 px-5 py-5 backdrop-blur-xl shadow-[0_32px_64px_-20px_rgba(0,0,0,1)] sm:bottom-6 sm:right-6 sm:w-[17rem]">
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-primary font-bold">Atmosphere</p>
              <p className="mt-2.5 text-[13px] sm:text-sm leading-relaxed text-on-surface-variant/90 italic">
                Warm brass tones, industrial character, and a more compact editorial layout that keeps the story readable at a glance.
              </p>
            </div>
          </AnimateIn>

          {/* Decorative Elements */}
          <div className="absolute -bottom-8 -left-8 hidden h-48 w-48 rounded-full border border-primary/10 blur-[3px] md:block" />
          <div className="pointer-events-none absolute -right-6 top-8 select-none font-headline text-8xl font-black text-white/[0.03] blur-[1px] sm:text-9xl md:text-[10rem]">
            B&B
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeritageSection;
