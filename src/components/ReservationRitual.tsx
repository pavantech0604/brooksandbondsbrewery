import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, CheckCircle2, MapPin } from 'lucide-react';
import AnimateIn from './AnimateIn';
import { cn } from '../lib/utils';
import { useBreweryStore } from '../hooks/useBreweryStore';
import interiorMain from '../assets/real/interior-main.jpg';

const ReservationRitual: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState('19:30');
  const [pax, setPax] = useState('2 Guests');
  const [date, setDate] = useState('');
  const [requests, setRequests] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { addReservation } = useBreweryStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const reservationData = {
      guest_name: 'Walk-in Guest',
      email: 'guest@example.com',
      phone: '00000 00000',
      date: date || new Date().toISOString().split('T')[0],
      time: selectedTime,
      pax: parseInt(pax),
    };

    const { error } = await addReservation(reservationData);

    if (!error) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } else {
      console.error('Submission failed:', error);
    }
  };

  if (submitted) {
    return (
      <section id="reservations" className="py-24 md:py-32 px-6 md:px-12 bg-background flex items-center justify-center min-h-[500px] md:min-h-[600px] scroll-mt-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6 md:space-y-8 max-w-lg px-4"
        >
          <div className="flex justify-center">
            <CheckCircle2 className="w-16 h-16 md:w-24 md:h-24 text-primary animate-pulse" />
          </div>
          <h2 className="font-headline text-4xl md:text-6xl text-on-surface uppercase italic leading-none">The Ritual is Set</h2>
          <p className="text-on-surface-variant font-body italic text-sm md:text-base opacity-80 leading-relaxed">
            Your request has been archived. Our cellar master will reach out shortly to confirm your descent into the void.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-primary font-label text-[10px] md:text-xs uppercase tracking-[0.3em] border-b border-primary/20 pb-2 hover:border-primary transition-all font-bold"
          >
            Register Another Ritual
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="reservations" className="py-16 md:py-24 px-4 md:px-12 bg-background scroll-mt-8 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-[2rem] md:rounded-[3.5rem] overflow-hidden bg-surface-container-lowest border border-white/5 shadow-[0_64px_120px_-24px_rgba(0,0,0,0.9)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-0">
            
            {/* Left Column: Visual Context (5 Cols) */}
            <div className="lg:col-span-5 relative min-h-[350px] sm:min-h-[450px] lg:min-h-0 overflow-hidden group">
              <motion.div 
                initial={{ scale: 1.1, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <img 
                  src={interiorMain} 
                  alt="Brooks and Bonds Brewery Interior"
                  className="w-full h-full object-cover contrast-[1.10] brightness-[0.7] md:brightness-[1.05] saturate-[1.10] group-hover:scale-105 transition-transform duration-[3s]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90 lg:bg-gradient-to-b lg:from-black/10 lg:to-black/60 opacity-80" />
              </motion.div>

              <div className="absolute inset-0 z-20 p-8 md:p-12 lg:p-16 flex flex-col justify-end">
                <AnimateIn direction="up" delay={0.2}>
                  <div className="space-y-4">
                    <span className="text-primary font-label text-[9px] md:text-[10px] uppercase tracking-[0.5em] mb-2 block drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-black">
                      The Private Registry
                    </span>
                    <h2 className="font-headline text-4xl sm:text-5xl md:text-6xl text-on-surface font-light leading-none mb-4 italic tracking-tighter drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] uppercase">
                      Claim Your <br />
                      <span className="text-primary brightness-110 drop-shadow-[0_2px_15px_rgba(242,202,80,0.4)] not-italic font-bold">Enclave</span>
                    </h2>
                    <p className="text-on-surface font-body max-w-xs leading-relaxed text-xs md:text-sm italic opacity-95 mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                      A secluded sanctuary crafted for those who seek the profound.
                    </p>
                  </div>
                  
                  <div className="pt-6 border-t border-white/20">
                    <div className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg group-hover:border-primary/50 transition-all">
                        <MapPin size={16} className="text-primary" />
                      </div>
                      <p className="text-[10px] font-label uppercase tracking-[0.3em] text-on-surface drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-bold">Koramangala 5th Block</p>
                    </div>
                  </div>
                </AnimateIn>
              </div>
            </div>

            {/* Right Column: Reservation form (7 Cols) */}
            <div className="lg:col-span-7 bg-[#0a0a0a]/98 backdrop-blur-3xl p-8 sm:p-12 md:p-16 relative">
              <AnimateIn direction="right" delay={0.3}>
                <header className="mb-8 md:mb-10">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="h-[1px] w-12 bg-primary/40" />
                    <span className="font-label text-[9px] md:text-[10px] uppercase tracking-[0.5em] text-primary font-black">Booking Ritual</span>
                  </div>
                  <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl text-on-surface mb-3 tracking-tighter uppercase leading-none italic font-light">Reservations</h2>
                  <p className="text-on-surface-variant/40 font-body text-[10px] uppercase tracking-[0.3em] italic">Secure your seat in the alchemist's vault</p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
                    <div className="group space-y-3">
                      <label className="flex items-center gap-3 font-label text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-primary/60 font-black">
                        <Users size={14} /> Party Size
                      </label>
                      <select 
                        value={pax}
                        onChange={(e) => setPax(e.target.value)}
                        className="w-full bg-transparent border-b border-white/10 py-3 text-on-surface focus:border-primary focus:outline-none transition-all appearance-none cursor-pointer text-sm font-body italic"
                      >
                        <option className="bg-neutral-900">2 Guests</option>
                        <option className="bg-neutral-900">4 Guests</option>
                        <option className="bg-neutral-900">6 Guests</option>
                        <option className="bg-neutral-900">Private Event (8+)</option>
                      </select>
                    </div>

                    <div className="group space-y-3">
                      <label className="flex items-center gap-3 font-label text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-primary/60 font-black">
                        <Calendar size={14} /> The Date
                      </label>
                      <input 
                        type="date" 
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-transparent border-b border-white/10 py-3 text-on-surface focus:border-primary focus:outline-none text-sm font-body [color-scheme:dark]" 
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="flex items-center gap-3 font-label text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-primary/60 font-black">
                      <Clock size={14} /> Selection of Time
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {['18:00', '19:30', '21:00', '22:30'].map((time) => (
                        <motion.button 
                          key={time}
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedTime(time)}
                          className={cn(
                            "py-3 border rounded-xl text-[10px] font-label tracking-[0.2em] transition-all",
                            selectedTime === time 
                              ? "border-primary bg-primary/20 text-primary shadow-[0_0_25px_rgba(242,202,80,0.3)]" 
                              : "border-white/10 text-on-surface-variant hover:border-primary/50 hover:text-primary"
                          )}
                        >
                          {time}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="group space-y-3">
                    <label className="block font-label text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-primary/60 font-black">Special Requests</label>
                    <input 
                      type="text"
                      value={requests}
                      onChange={(e) => setRequests(e.target.value)}
                      className="w-full bg-transparent border-b border-white/10 py-3 text-on-surface placeholder:text-on-surface-variant/20 focus:border-primary focus:outline-none text-sm italic font-body" 
                      placeholder="Notes or special occasions..." 
                    />
                  </div>

                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full brass-gradient py-5 rounded-2xl text-[#0a0a0a] font-label font-black uppercase tracking-[0.5em] text-xs shadow-2xl flex items-center justify-center gap-4 group transition-all mt-6"
                    type="submit"
                  >
                    Request Access
                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                  </motion.button>
                </form>
              </AnimateIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Internal utility since we use it repeatedly and it's small
function ArrowRight({ size = 24, className = "" }) {
  return (
    <svg 
      width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

export default ReservationRitual;
