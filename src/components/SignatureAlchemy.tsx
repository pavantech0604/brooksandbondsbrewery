import React from 'react';
import { motion } from 'framer-motion';
import AnimateIn from './AnimateIn';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useBrewery } from '../context/BreweryContext';

const SignatureAlchemy: React.FC = () => {
  const { beers, loading } = useBrewery();

  if (loading) {
    return (
      <div className="flex justify-center py-24 text-primary/40 md:py-32">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    <section id="menu" className="section-frame relative overflow-hidden bg-surface-container-low scroll-mt-14">
      <div data-anchor-target="menu" className="container-premium">
        <div className="mb-10 flex flex-col gap-5 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <AnimateIn className="max-w-3xl">
            <span className="mb-3 block font-label text-[10px] uppercase tracking-[0.35em] text-primary md:text-xs">The Collection</span>
            <h2 className="section-heading text-on-surface">
              Signature <span className="text-primary not-italic font-bold">Alchemy</span>
            </h2>
            <p className="section-copy mt-4 max-w-2xl">
              The menu cards now sit on a tighter grid with more even internal spacing so each brew reads clearly without pushing content toward the edges.
            </p>
          </AnimateIn>
          
          <AnimateIn delay={0.2}>
            <a href="#gallery" className="group flex items-center gap-2 border-b border-primary/20 pb-2 font-label text-xs uppercase tracking-[0.26em] text-on-surface-variant transition-colors hover:border-primary hover:text-primary">
              Full Archive
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </AnimateIn>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
          {(beers || []).map((beer, index) => (
            <AnimateIn key={beer.id} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -10 }}
                className="group relative flex min-h-[400px] flex-col justify-between overflow-hidden rounded-[1.5rem] border border-white/5 bg-surface-container p-5 shadow-2xl transition-all duration-700 hover:border-primary/40 md:min-h-[440px] md:rounded-[2rem] md:p-7"
              >
                {/* Visual Background */}
                <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-70 transition-opacity duration-700">
                  <img 
                    src={beer.image || "https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&q=80&w=800"} 
                    alt={beer.name}
                    className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-surface-container/60 to-transparent" />
                </div>

                <div className="relative z-10">
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <div className="max-w-[70%]">
                      <span className="mb-2 block font-label text-[9px] font-bold uppercase tracking-[0.34em] text-primary">{beer.tag || 'Handcrafted'}</span>
                      <h3 className="font-headline text-3xl uppercase italic leading-none tracking-tight text-on-surface md:text-4xl">{beer.name}</h3>
                    </div>
                    <div className="shrink-0 text-right">
                      <span className="mb-1 block font-label text-[9px] uppercase tracking-[0.24em] text-on-surface-variant opacity-60">{beer.abv} ABV</span>
                      <span className="font-headline text-2xl text-primary drop-shadow-[0_2px_10px_rgba(242,202,80,0.3)] md:text-3xl">{beer.price}</span>
                    </div>
                  </div>
                  <div className="w-12 h-1 bg-primary/20 transition-all group-hover:w-24 group-hover:bg-primary rounded-full" />
                </div>

                <div className="relative z-10 mt-8 md:mt-10">
                  <div className="flex items-end justify-between gap-4">
                    <p className="max-w-[75%] text-sm leading-7 text-on-surface-variant/85 transition-opacity group-hover:opacity-100">
                      {beer.description}
                    </p>
                    <a href="#reservations" className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 text-primary shadow-xl transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-[#0a0a0a] md:h-14 md:w-14">
                      <ArrowRight size={20} />
                    </a>
                  </div>
                </div>

                {/* Technical Overlay */}
                <div className="absolute top-1/2 -right-4 translate-y-[-50%] rotate-90 text-7xl md:text-[8rem] font-headline font-black text-white/[0.02] select-none pointer-events-none group-hover:text-primary/[0.04] transition-colors uppercase">
                  {beer.ibu} IBU
                </div>

                {/* Status Overlay */}
                {beer.status === 'Sold Out' && (
                  <div className="absolute inset-0 bg-[#0a0a0a]/80 backdrop-blur-[4px] flex items-center justify-center z-20">
                    <span className="font-label text-xl md:text-2xl uppercase tracking-[0.5em] text-primary rotate-[-12deg] border-4 border-primary px-8 py-3 font-black shadow-[0_0_50px_rgba(242,202,80,0.2)]">Sold Out</span>
                  </div>
                )}
              </motion.div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SignatureAlchemy;
