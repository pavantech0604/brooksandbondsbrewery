import React from 'react';
import { motion } from 'framer-motion';
import AnimateIn from './AnimateIn';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useBreweryStore } from '../hooks/useBreweryStore';

const SignatureAlchemy: React.FC = () => {
  const { beers, loading } = useBreweryStore();

  if (loading) {
    return (
      <div className="py-32 flex justify-center text-primary/40">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    <section id="menu" className="pt-24 pb-32 bg-surface-container-low scroll-mt-8 relative overflow-hidden">
      <div className="container-premium px-4 md:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 md:mb-24 gap-8">
          <AnimateIn>
            <span className="font-label tracking-[0.4em] text-primary uppercase text-[10px] md:text-xs mb-3 block">The Collection</span>
            <h2 className="font-headline text-5xl sm:text-7xl lg:text-7xl text-on-surface italic font-light tracking-tight leading-none uppercase">
              Signature <span className="text-primary not-italic font-bold">Alchemy</span>
            </h2>
          </AnimateIn>
          
          <AnimateIn delay={0.2}>
            <a href="#gallery" className="font-label text-xs uppercase tracking-[0.3em] border-b border-primary/20 pb-2 hover:border-primary transition-colors text-on-surface-variant hover:text-primary flex items-center gap-2 group">
              Full Archive
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </AnimateIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {(beers || []).map((beer, index) => (
            <AnimateIn key={beer.id} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -10 }}
                className="group relative bg-surface-container p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden flex flex-col justify-between aspect-[4/5] sm:aspect-[3/4] border border-white/5 hover:border-primary/40 shadow-2xl transition-all duration-700"
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
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className="font-label text-[9px] text-primary uppercase tracking-[0.4em] block mb-2 font-bold">{beer.tag || 'Handcrafted'}</span>
                      <h3 className="font-headline text-3xl md:text-4xl text-on-surface leading-none mb-3 uppercase italic tracking-tighter">{beer.name}</h3>
                    </div>
                    <div className="text-right">
                      <span className="font-label text-[9px] text-on-surface-variant uppercase tracking-[0.3em] block mb-1 opacity-60">{beer.abv} ABV</span>
                      <span className="font-headline text-2xl md:text-3xl text-primary drop-shadow-[0_2px_10px_rgba(242,202,80,0.3)]">{beer.price}</span>
                    </div>
                  </div>
                  <div className="w-12 h-1 bg-primary/20 transition-all group-hover:w-24 group-hover:bg-primary rounded-full" />
                </div>

                <div className="relative z-10 mt-auto">
                  <div className="flex justify-between items-end gap-6">
                    <p className="text-on-surface-variant text-sm italic leading-relaxed max-w-[75%] opacity-80 group-hover:opacity-100 transition-opacity">
                      {beer.description}
                    </p>
                    <a href="#reservations" className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border border-primary/20 text-primary group-hover:bg-primary group-hover:text-[#0a0a0a] group-hover:border-primary transition-all shadow-xl">
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
