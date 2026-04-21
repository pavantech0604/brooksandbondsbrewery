import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle2, 
  XCircle, 
  Timer,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Mail,
  Phone,
  Loader2
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion as m, AnimatePresence } from 'framer-motion';
import { useBreweryStore } from '../../hooks/useBreweryStore';

const ReservationManager: React.FC = () => {
  const { reservations, updateReservationStatus, loading } = useBreweryStore();
  const [activeDate, setActiveDate] = useState(new Date().toISOString().split('T')[0]);

  const filteredReservations = (reservations || []).filter(r => r.date === activeDate);

  const stats = {
    confirmed: reservations.filter(r => r.status === 'Confirmed').length,
    pending: reservations.filter(r => r.status === 'Pending').length,
    arrived: reservations.filter(r => r.status === 'Arrived').length,
    cancelled: reservations.filter(r => r.status === 'Cancelled').length,
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 md:p-20 text-primary/40">
        <Loader2 className="w-10 h-10 md:w-12 md:h-12 animate-spin mb-4" />
        <p className="font-label text-[9px] md:text-[10px] uppercase tracking-[0.2em]">Accessing the Registry...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 md:space-y-8 pb-12">
      {/* Calendar Strip */}
      <div className="bg-[#121316] border border-primary/10 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
        <div className="flex items-center gap-2 md:gap-6 w-full md:w-auto">
          <button className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors hidden sm:block">
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scroll-smooth no-scrollbar w-full md:w-auto">
            {[0, 1, 2, 3, 4, 5, 6].map((offset) => {
              const d = new Date();
              d.setDate(d.getDate() + offset);
              const dateStr = d.toISOString().split('T')[0];
              const isSelected = activeDate === dateStr;
              return (
                <button 
                  key={dateStr}
                  onClick={() => setActiveDate(dateStr)}
                  className={cn(
                    "flex flex-col items-center justify-center min-w-[3.5rem] md:w-14 h-16 md:h-20 rounded-xl border transition-all duration-300 flex-shrink-0",
                    isSelected 
                      ? "brass-gradient text-[#0a0a0a] border-transparent shadow-lg shadow-primary/20 scale-105" 
                      : "bg-white/2 border-primary/5 text-on-surface/40 hover:border-primary/20"
                  )}
                >
                  <span className="text-[8px] md:text-[10px] uppercase tracking-widest font-label opacity-60">
                    {d.toLocaleDateString('en-US', { month: 'short' })}
                  </span>
                  <span className="text-lg md:text-xl font-title font-bold mt-0.5 md:mt-1">{d.getDate()}</span>
                </button>
              );
            })}
          </div>

          <button className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors hidden sm:block">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-4 border-t md:border-t-0 md:border-l border-primary/10 pt-4 md:pt-0 md:pl-8 w-full md:w-auto justify-between md:justify-start">
          <div className="text-left md:text-right">
            <p className="text-[8px] md:text-[10px] uppercase tracking-widest text-on-surface/40 font-label">Total Rituals</p>
            <p className="text-xl md:text-2xl font-title text-primary">{reservations.length} Bookings</p>
          </div>
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Calendar className="w-5 h-5 md:w-6 md:h-6" />
          </div>
        </div>
      </div>

      {/* Tables Layout Status (Mini) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[
          { label: 'Confirmed', count: stats.confirmed, icon: CheckCircle2, color: 'text-success' },
          { label: 'Pending', count: stats.pending, icon: Timer, color: 'text-warning' },
          { label: 'Arrived', count: stats.arrived, icon: Users, color: 'text-primary' },
          { label: 'Cancelled', count: stats.cancelled, icon: XCircle, color: 'text-error' },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#121316] border border-primary/10 p-3 md:p-4 rounded-xl flex items-center gap-3 md:gap-4">
            <div className={cn("p-1.5 md:p-2 rounded-lg bg-white/2", stat.color)}>
              <stat.icon className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <div>
              <p className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-on-surface/40 font-label">{stat.label}</p>
              <h4 className="text-base md:text-lg font-title text-on-surface">{stat.count}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* Reservations List */}
      <div className="bg-[#121316] border border-primary/10 rounded-2xl overflow-hidden shadow-2xl relative">
        <div className="p-4 md:p-6 border-b border-primary/5 bg-white/[0.02] flex flex-col sm:flex-row items-center justify-between gap-4">
          <h3 className="font-title text-lg md:text-xl text-on-surface text-center sm:text-left italic">
            Registry for <span className="text-primary not-italic">{new Date(activeDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </h3>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-4 py-2 bg-white/5 border border-primary/10 rounded-lg text-[9px] uppercase font-label tracking-widest text-on-surface/60 hover:text-primary transition-all">Export</button>
            <button className="flex-1 sm:flex-none px-4 py-2 brass-gradient text-[#0a0a0a] rounded-lg text-[9px] uppercase font-label tracking-widest font-bold hover:scale-105 transition-all">New Entry</button>
          </div>
        </div>

        <div className="divide-y divide-primary/5">
          <AnimatePresence mode="popLayout">
            {filteredReservations.map((res) => (
              <m.div 
                key={res.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="p-4 md:p-6 hover:bg-white/[0.01] transition-all group flex flex-col xl:flex-row xl:items-center justify-between gap-6"
              >
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/2 border border-primary/10 flex flex-col items-center justify-center group-hover:border-primary/40 transition-all flex-shrink-0">
                    <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary mb-1" />
                    <span className="text-[10px] md:text-xs font-title text-on-surface">{res.time}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 md:gap-3">
                      <h4 className="font-title text-base md:text-lg text-on-surface group-hover:text-primary transition-colors truncate uppercase leading-none">{res.guest_name}</h4>
                      <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[8px] md:text-[9px] font-title uppercase tracking-widest font-bold border border-primary/10">{res.table_assigned || 'TBA'}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-4 mt-2">
                      <div className="flex items-center gap-1.5 text-on-surface/40">
                        <Mail className="w-3 h-3" />
                        <span className="text-[9px] md:text-[10px] font-label lowercase truncate">{res.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-on-surface/40">
                        <Phone className="w-3 h-3" />
                        <span className="text-[9px] md:text-[10px] font-label truncate">{res.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between xl:justify-end gap-6 md:gap-10 border-t xl:border-t-0 border-white/5 pt-4 xl:pt-0">
                  <div className="flex items-center gap-8 md:gap-10">
                    <div className="text-center">
                      <p className="text-[8px] md:text-[9px] uppercase tracking-widest text-on-surface/40 font-label mb-1">Guests</p>
                      <div className="flex items-center gap-1.5 justify-center">
                        <Users className="w-3 md:w-3.5 h-3 md:h-3.5 text-secondary opacity-60" />
                        <span className="text-sm md:text-base font-title text-on-surface">{res.pax}</span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="text-[8px] md:text-[9px] uppercase tracking-widest text-on-surface/40 font-label mb-1">Status</p>
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[8px] md:text-[9px] uppercase tracking-widest font-bold inline-block",
                        res.status === 'Confirmed' ? "bg-success/10 text-success" :
                        res.status === 'Arrived' ? "bg-primary/10 text-primary" :
                        res.status === 'Pending' ? "bg-warning/10 text-warning" : "bg-error/10 text-error"
                      )}>
                        {res.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-end gap-2">
                    <button 
                      onClick={() => updateReservationStatus(res.id, 'Confirmed')}
                      className="flex-1 sm:flex-none w-10 h-10 rounded-xl bg-white/3 border border-primary/5 flex items-center justify-center text-on-surface/40 hover:text-primary hover:border-primary/20 transition-all shadow-md group/btn"
                    >
                      <CheckCircle2 className="w-5 h-5 transition-transform group-hover/btn:scale-110" />
                    </button>
                    <button 
                      onClick={() => updateReservationStatus(res.id, 'Cancelled')}
                      className="flex-1 sm:flex-none w-10 h-10 rounded-xl bg-white/3 border border-primary/5 flex items-center justify-center text-on-surface/40 hover:text-error hover:border-error/20 transition-all shadow-md group/btn"
                    >
                      <XCircle className="w-5 h-5 transition-transform group-hover/btn:scale-110" />
                    </button>
                    <button className="flex-1 sm:flex-none w-10 h-10 rounded-xl bg-white/3 border border-primary/5 flex items-center justify-center text-on-surface/40 hover:text-on-surface hover:bg-white/5 transition-all">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </m.div>
            ))}
          </AnimatePresence>
          {filteredReservations.length === 0 && (
            <div className="p-20 text-center">
              <Calendar className="w-12 h-12 text-primary/10 mx-auto mb-4" />
              <h3 className="font-title text-xl text-on-surface/20 uppercase tracking-[0.2em] italic">The archive is silent for today</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationManager;
