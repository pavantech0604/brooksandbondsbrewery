import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  Eye, 
  Tag,
  Beer,
  Circle,
  Loader2
} from 'lucide-react';
import { useBrewery } from '../../context/BreweryContext';
import { cn } from '../../lib/utils';

const MenuManager: React.FC = () => {
  const { beers, updateBeerStatus, deleteBeer, loading } = useBrewery();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMenu = (beers || []).filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 md:p-20 text-primary/40">
        <Loader2 className="w-10 h-10 md:w-12 md:h-12 animate-spin mb-4" />
        <p className="font-label text-[9px] md:text-[10px] uppercase tracking-[0.2em]">Consulting the Archive...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8 pb-12">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 md:gap-6">
        <div className="relative group flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface/40 group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search the collection..."
            className="w-full bg-[#121316] border border-primary/10 rounded-xl py-3 pl-12 pr-4 text-[13px] md:text-sm focus:outline-none focus:border-primary/40 transition-all font-label tracking-wide"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <button className="flex items-center gap-2 px-3 md:px-4 py-3 bg-[#121316] border border-primary/10 rounded-xl text-on-surface/60 hover:text-primary transition-all font-label text-[9px] md:text-[10px] uppercase tracking-widest">
            <Filter className="w-4 h-4" />
            <span className="hidden sm:inline">Refine</span>
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 md:px-6 py-3 brass-gradient text-[#0a0a0a] rounded-xl font-label text-[10px] md:text-[11px] uppercase tracking-[0.2em] font-bold shadow-lg shadow-primary/10 hover:scale-[1.02] active:scale-[0.98] transition-all">
            <Plus className="w-4 h-4" />
            <span className="whitespace-nowrap">Add Alchemy</span>
          </button>
        </div>
      </div>

      {/* Menu Grid/Table */}
      <div className="bg-[#121316] border border-primary/10 rounded-2xl overflow-hidden shadow-2xl relative">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[700px] lg:min-w-0">
            <thead>
              <tr className="bg-white/[0.03] border-b border-primary/5">
                <th className="px-6 md:px-8 py-5 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-label text-on-surface/40">Product</th>
                <th className="px-6 md:px-8 py-5 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-label text-on-surface/40">Category</th>
                <th className="px-6 md:px-8 py-5 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-label text-on-surface/40">Specs</th>
                <th className="px-6 md:px-8 py-5 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-label text-on-surface/40">Inventory</th>
                <th className="px-6 md:px-8 py-5 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-label text-on-surface/40 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              <AnimatePresence mode="popLayout">
                {filteredMenu.map((item) => (
                  <motion.tr 
                    key={item.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-6 md:px-8 py-4 md:py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 flex items-center justify-center border border-primary/10 group-hover:border-primary/40 transition-all">
                          <Beer className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-title text-sm md:text-base text-on-surface group-hover:text-primary transition-colors leading-tight">{item.name}</h4>
                          <p className="text-[9px] md:text-[10px] font-title text-primary mt-0.5">{item.price}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 md:px-8 py-4 md:py-6">
                      <div className="flex items-center gap-2">
                        <Tag className="w-3 h-3 text-secondary opacity-60" />
                        <span className="text-[10px] md:text-[11px] font-label uppercase tracking-widest text-on-surface/60">{item.category || 'Ale'}</span>
                      </div>
                    </td>
                    <td className="px-6 md:px-8 py-4 md:py-6">
                      <div className="flex flex-col gap-1">
                        <span className="text-[9px] md:text-[10px] font-mono tracking-wider text-on-surface/40">{item.abv} ABV</span>
                        <span className="text-[9px] md:text-[10px] font-mono tracking-wider text-on-surface/40">{item.ibu} IBU</span>
                      </div>
                    </td>
                    <td className="px-6 md:px-8 py-4 md:py-6">
                      <button 
                        onClick={() => {
                          const nextStatus = item.status === 'In Stock' ? 'Low Stock' : item.status === 'Low Stock' ? 'Sold Out' : 'In Stock';
                          updateBeerStatus(item.id, nextStatus as any);
                        }}
                        className="flex items-center gap-2 group/status"
                      >
                        <Circle className={cn(
                          "w-1.5 h-1.5 md:w-2 md:h-2 fill-current transition-colors",
                          item.status === 'In Stock' ? "text-success" :
                          item.status === 'Low Stock' ? "text-warning" : "text-error"
                        )} />
                        <span className={cn(
                          "text-[9px] md:text-[10px] uppercase tracking-widest font-bold transition-colors",
                          item.status === 'In Stock' ? "text-success" :
                          item.status === 'Low Stock' ? "text-warning" : "text-error"
                        )}>
                          {item.status}
                        </span>
                      </button>
                    </td>
                    <td className="px-6 md:px-8 py-4 md:py-6">
                      <div className="flex items-center justify-end gap-1 md:gap-2">
                        <button className="p-2 hover:bg-primary/10 rounded-lg text-on-surface/40 hover:text-primary transition-all">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-primary/10 rounded-lg text-on-surface/40 hover:text-primary transition-all">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => deleteBeer(item.id)}
                          className="p-2 hover:bg-error/10 rounded-lg text-on-surface/40 hover:text-error transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {filteredMenu.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <Beer className="w-10 h-10 md:w-12 md:h-12 text-primary/10 mx-auto mb-4" />
                    <h3 className="font-title text-lg text-on-surface/40 uppercase tracking-widest leading-none">No alchemy found</h3>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 md:px-8 py-4 bg-[#121316] border border-primary/10 rounded-2xl font-label text-[9px] md:text-[10px] uppercase tracking-widest text-on-surface/40 shadow-xl">
        <span>Showing {filteredMenu.length} of {beers.length} Items</span>
        <div className="flex items-center gap-6">
          <button className="hover:text-primary transition-colors disabled:opacity-20" disabled>Previous</button>
          <div className="flex items-center gap-3">
            <span className="w-6 h-6 rounded bg-primary text-[#0a0a0a] flex items-center justify-center font-bold">1</span>
          </div>
          <button className="hover:text-primary transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
};

export default MenuManager;
