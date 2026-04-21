import React from 'react';
import { motion } from 'framer-motion';
import AnimateIn from './AnimateIn';
import realBar from '../assets/real/bar-counter.jpg';

const HeritageSection: React.FC = () => {
  return (
    <section id="our-story" className="pt-20 pb-28 md:pt-32 md:pb-48 bg-background relative overflow-hidden w-full max-w-full scroll-mt-8">
      <div className="container-premium grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center px-4 md:px-8">

        {/* Story Content */}
        <div className="lg:col-span-5 space-y-10 md:space-y-12">
          <AnimateIn direction="left">
            <span className="font-label tracking-[0.4em] text-primary uppercase text-[10px] mb-4 block">Legacy Sequence</span>
            <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl text-on-surface leading-[1.1] tracking-tighter uppercase px-1">
              A Living <span className="italic text-primary font-light">Archive</span> <br />
              Of Craft & Time
            </h2>
          </AnimateIn>

          <AnimateIn direction="left" delay={0.2}>
            <p className="text-on-surface-variant font-body leading-relaxed text-sm md:text-base italic opacity-80 max-w-lg">
              Brooks & Bonds stands as a bastion of traditional alchemy. Located in the heart of Koramangala, our space is a deliberate descent into the industrial soul—where the "bio-chemical factory" theme meets the patient pursuit of the perfect pour.
            </p>
          </AnimateIn>

          <AnimateIn direction="left" delay={0.4} className="flex">
            <div className="pt-4">
              <motion.a
                href="#gallery"
                whileHover={{ x: 10 }}
                className="group inline-flex items-center gap-6 text-primary font-label text-[11px] uppercase tracking-[0.4em] font-bold"
              >
                Explore Archive
                <span className="h-[0.5px] w-12 bg-primary/20 group-hover:w-20 group-hover:bg-primary transition-all duration-700" />
              </motion.a>
            </div>
          </AnimateIn>

          {/* Technical Stats */}
          <div className="grid grid-cols-2 gap-10 md:gap-16 pt-12 border-t border-white/5">
            <AnimateIn direction="up" delay={0.5}>
              <p className="font-headline text-4xl md:text-5xl text-primary mb-2">1892</p>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/40">Heritage Roots</p>
            </AnimateIn>
            <AnimateIn direction="up" delay={0.6}>
              <p className="font-headline text-4xl md:text-5xl text-primary mb-2">6+</p>
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant/40">House Ferments</p>
            </AnimateIn>
          </div>
        </div>

        {/* Visual Content */}
        <div className="lg:col-span-7 relative max-w-full overflow-visible mt-12 lg:mt-0">
          <AnimateIn direction="right" delay={0.3} className="relative z-10 aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_48px_80px_-16px_rgba(0,0,0,0.8)] border border-white/10 group">
            <img
              src={realBar}
              alt="Industrial Brewing Details"
              className="w-full h-full object-cover contrast-[1.10] brightness-[1.05] saturate-[1.10] group-hover:scale-105 transition-all duration-1000"
            />
            {/* Inner Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          </AnimateIn>

          {/* Decorative Elements */}
          <div className="absolute -bottom-10 -left-10 w-48 h-48 border border-primary/5 rounded-full blur-[2px] -z-0 hidden md:block" />
          <div className="absolute -top-16 -right-8 text-7xl sm:text-8xl md:text-[10rem] font-headline font-black text-white/[0.02] select-none pointer-events-none blur-[1px]">
            B&B
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeritageSection;
