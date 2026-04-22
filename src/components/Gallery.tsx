import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimateIn from './AnimateIn';
import { cn } from '../lib/utils';
import { X, ArrowRight } from 'lucide-react';

const categories = ['All', 'Industrial Archive', 'Liquid Gems', 'Culinary Alchemy'];

const items = [
  {
    id: 1,
    category: 'Liquid Gems',
    title: 'Mango Cider',
    price: '₹295',
    description: 'The legendary nectar that defined Koramangala\'s craft scene. Sweet, crisp, and unapologetically local.',
    image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&q=80&w=1200',
    gridSpan: 'md:col-span-2 md:row-span-2',
    fit: 'cover'
  },
  {
    id: 2,
    category: 'Industrial Archive',
    title: 'The Mechanical Heart',
    description: 'Raw industrial precision. Our brewing tanks are integrated into the very soul of the decor.',
    image: 'https://images.unsplash.com/photo-1555658636-6e4a36218be7?auto=format&fit=crop&q=80&w=800',
    gridSpan: 'md:col-span-1 md:row-span-1',
    fit: 'cover'
  },
  {
    id: 3,
    category: 'Culinary Alchemy',
    title: 'The Brooks Burger',
    price: '₹445',
    description: 'A towering mechanical feast. Juicy grilled patty topped with hand-crafted sharp cheddar and heritage relish.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
    gridSpan: 'md:col-span-1 md:row-span-2',
    fit: 'cover'
  },
  {
    id: 4,
    category: 'Culinary Alchemy',
    title: 'White Sauce Pasta',
    price: '₹375',
    description: 'Rich, creamy artisanal pasta prepared with local herbs and imported parmesan.',
    image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&q=80&w=800',
    gridSpan: 'md:col-span-1 md:row-span-1',
    fit: 'cover'
  },
  {
    id: 5,
    category: 'Industrial Archive',
    title: 'The Vault Seating',
    description: 'Experience the brew right where it happens. Seating pods integrated into the industrial skeleton.',
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80&w=800',
    gridSpan: 'md:col-span-1 md:row-span-1',
    fit: 'cover'
  },
  {
    id: 6,
    category: 'Culinary Alchemy',
    title: 'Signature Pizza',
    price: '₹525',
    description: 'A wood-fired ritual. Thin crust topped with artisanal buffalo mozzarella and fresh local harvest.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800',
    gridSpan: 'md:col-span-1 md:row-span-1',
    fit: 'cover'
  },
  {
    id: 7,
    category: 'Liquid Gems',
    title: 'Mixologist\'s Choice',
    description: 'A visual and sensory masterpiece. Hand-crafted cocktails inspired by the industrial soul.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&q=80&w=800',
    gridSpan: 'md:col-span-1 md:row-span-1',
    fit: 'cover'
  },
  {
    id: 8,
    category: 'Liquid Gems',
    title: 'Brooks Craft',
    price: '₹275',
    description: 'Our signature lager. Clean, crisp, and engineered for the ultimate refreshment.',
    image: 'https://images.unsplash.com/photo-1618885472179-5e474019f2a9?auto=format&fit=crop&q=80&w=800',
    gridSpan: 'md:col-span-1 md:row-span-1',
    fit: 'cover'
  }
];

const Gallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filteredItems = activeTab === 'All' 
    ? items 
    : items.filter(item => item.category === activeTab);

  const selectedItem = items.find(item => item.id === selectedId);

  return (
    <section id="gallery" className="section-frame relative overflow-hidden bg-background scroll-mt-14">
      <div data-anchor-target="gallery" className="container-premium">
        
        {/* Header content */}
        <div className="mx-auto mb-10 max-w-4xl text-center md:mb-14">
          <AnimateIn className="space-y-5">
            <span className="block font-label text-[10px] uppercase tracking-[0.35em] text-primary md:text-xs">The Living Vault</span>
            <h2 className="section-heading text-on-surface">
              Bento <span className="italic font-light text-primary">Archive</span>
            </h2>
            <p className="mx-auto max-w-2xl text-sm leading-7 text-on-surface-variant/80 md:text-base">
              The archive grid is tightened to sit comfortably inside the page width, with cleaner tab spacing and more predictable card heights.
            </p>
          </AnimateIn>

          {/* Dynamic Tabs */}
          <div className="mt-6 flex flex-wrap justify-center gap-3 md:mt-8 md:gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={cn(
                  "relative rounded-full border px-4 py-2 font-label text-[10px] uppercase tracking-[0.2em] transition-all md:px-5 md:text-xs",
                  activeTab === cat
                    ? "border-primary/40 bg-primary/10 text-primary"
                    : "border-white/8 text-on-surface-variant hover:border-primary/20 hover:text-primary"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid auto-rows-[220px] grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[250px] md:gap-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedId(item.id)}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "glass-card group relative cursor-pointer overflow-hidden rounded-2xl bg-black shadow-2xl md:rounded-[2rem]",
                  item.gridSpan
                )}
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className={cn(
                    "w-full h-full transition-transform duration-1000 group-hover:scale-105",
                    item.fit === 'contain' ? "object-contain p-8 md:p-12" : "object-cover object-center"
                  )}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent p-6 md:p-10 flex flex-col justify-end">
                  <div className="space-y-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="font-label text-[9px] text-primary uppercase tracking-[0.3em] font-bold">
                      {item.category} {item.price && `— ${item.price}`}
                    </span>
                    <h3 className="font-headline text-2xl md:text-3xl text-on-surface uppercase tracking-tight italic leading-none">
                      {item.title}
                    </h3>
                  </div>
                </div>
                
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-[1px] h-full bg-primary/20 scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-700" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Detail Modal / Lightbox */}
        <AnimatePresence>
          {selectedId && selectedItem && (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-12">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
                className="absolute inset-0 bg-black/95 backdrop-blur-xl"
              />
              
              <motion.div 
                layoutId={`item-${selectedId}`}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.95 }}
                className="relative flex h-auto max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-[2rem] border border-white/5 bg-surface-container-low shadow-2xl md:rounded-[3rem] lg:flex-row"
              >
                {/* Image Section */}
                <div className="w-full lg:w-3/5 h-[300px] sm:h-[400px] lg:h-auto relative group">
                  <img 
                    src={selectedItem.image} 
                    alt={selectedItem.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
                
                {/* Content Section */}
                <div className="w-full lg:w-2/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-[#0a0a0a] overflow-y-auto">
                  <div className="mb-8 md:mb-12">
                    <span className="font-label text-xs text-primary uppercase tracking-[0.4em] mb-4 block font-bold">{selectedItem.category}</span>
                    <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl text-on-surface leading-[1] italic uppercase mb-6 tracking-tighter">{selectedItem.title}</h2>
                    {selectedItem.price && <p className="font-headline text-2xl md:text-3xl text-primary mb-8">{selectedItem.price}</p>}
                    <p className="text-on-surface-variant font-body text-sm md:text-base lg:text-lg italic leading-relaxed opacity-80">
                      {selectedItem.description}
                    </p>
                  </div>
                  
                  <div className="pt-8 border-t border-white/10 flex flex-col gap-4">
                    <a 
                      href="#reservations" 
                      onClick={() => setSelectedId(null)}
                      className="brass-gradient w-full py-4 rounded-xl text-[#0a0a0a] text-center font-label font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs flex items-center justify-center gap-3 group transition-all"
                    >
                      Reserve Ritual
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    <button 
                      onClick={() => setSelectedId(null)}
                      className="w-full py-2 text-on-surface-variant font-label text-[9px] uppercase tracking-[0.4em] hover:text-primary transition-colors flex items-center justify-center"
                    >
                      <X size={12} className="mr-2" />
                      Close Archive
                    </button>
                  </div>
                </div>
                
                {/* Close Button Mobile/Tablet */}
                <button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-on-surface lg:hidden backdrop-blur-md"
                >
                  <X size={20} />
                </button>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;
