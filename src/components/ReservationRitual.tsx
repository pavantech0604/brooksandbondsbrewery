import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Clock, CheckCircle2, MapPin } from 'lucide-react';
import AnimateIn from './AnimateIn';
import { cn } from '../lib/utils';
import { useBrewery } from '../context/BreweryContext';
import interiorMain from '../assets/real/interior-main.jpg';

const ReservationRitual: React.FC = () => {
  const [selectedTime, setSelectedTime] = useState('19:30');
  const [pax, setPax] = useState('2 Guests');
  const [date, setDate] = useState('');
  const [requests, setRequests] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { addReservation } = useBrewery();

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
      <section id="reservations" className="section-frame flex min-h-[420px] items-center justify-center bg-background scroll-mt-14 md:min-h-[520px]">
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
    <section id="reservations" className="relative overflow-hidden bg-background scroll-mt-14 py-16 lg:pt-20 lg:pb-32">
      <div data-anchor-target="reservations" className="container-premium w-full">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/5 bg-surface-container-low shadow-[0_52px_90px_-28px_rgba(0,0,0,0.88)] md:rounded-[2.5rem]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-0">

            {/* Left Column: Visual Context (5 Cols) */}
            <div className="lg:col-span-5 relative min-h-[300px] sm:min-h-[360px] lg:min-h-0 overflow-hidden group">
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

              <div className="absolute inset-0 z-20 flex flex-col justify-end p-7 md:p-8 lg:p-10">
                <AnimateIn direction="up" delay={0.2}>
                  <div className="space-y-4">
                    <span className="mb-2 block font-label text-[9px] font-black uppercase tracking-[0.4em] text-primary drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] md:text-[10px]">
                      The Private Registry
                    </span>
                    <h2 className="font-headline text-4xl font-light uppercase leading-none tracking-tight text-on-surface drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] sm:text-[2.9rem] md:text-[3.6rem]">
                      Claim Your <br />
                      <span className="font-bold text-primary brightness-110 drop-shadow-[0_2px_15px_rgba(242,202,80,0.4)] not-italic">Enclave</span>
                    </h2>
                    <p className="mb-6 max-w-sm text-xs italic leading-6 text-on-surface opacity-95 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] md:text-sm">
                      A secluded sanctuary crafted for those who seek the profound.
                    </p>
                  </div>

                  <div className="pt-6 border-t border-white/20">
                    <div className="flex items-center gap-4 group">
                      <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg group-hover:border-primary/50 transition-all">
                        <MapPin size={16} className="text-primary" />
                      </div>
                      <p className="font-label text-[10px] font-bold uppercase tracking-[0.26em] text-on-surface drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Koramangala 5th Block</p>
                    </div>
                  </div>
                </AnimateIn>
              </div>
            </div>

            {/* Right Column: Reservation form (7 Cols) */}
            <div className="relative bg-[#0a0a0a]/98 p-6 backdrop-blur-3xl sm:p-8 md:p-8 lg:col-span-7 lg:p-10">
              <AnimateIn direction="right" delay={0.3}>
                <header className="mb-5 md:mb-6">
                  <div className="mb-3 flex items-center gap-4">
                    <div className="h-[1px] w-12 bg-primary/40" />
                    <span className="font-label text-[9px] font-black uppercase tracking-[0.4em] text-primary md:text-[10px]">Booking Ritual</span>
                  </div>
                  <h2 className="mb-3 font-headline text-4xl font-light uppercase leading-none tracking-tight text-on-surface italic md:text-[3rem] lg:text-[3.5rem]">Reservations</h2>
                  <p className="max-w-xl text-[10px] uppercase tracking-[0.24em] text-on-surface-variant/50 italic">Secure your seat in the alchemist's vault</p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                  <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                    <div className="group space-y-2">
                      <label className="flex items-center gap-3 font-label text-[9px] font-black uppercase tracking-[0.32em] text-primary/60 md:text-[10px]">
                        <Users size={14} /> Party Size
                      </label>
                      <select
                        value={pax}
                        onChange={(e) => setPax(e.target.value)}
                        className="w-full bg-transparent border-b border-white/10 py-2.5 text-on-surface focus:border-primary focus:outline-none transition-all appearance-none cursor-pointer text-sm font-body italic"
                      >
                        <option className="bg-neutral-900">2 Guests</option>
                        <option className="bg-neutral-900">4 Guests</option>
                        <option className="bg-neutral-900">6 Guests</option>
                        <option className="bg-neutral-900">Private Event (8+)</option>
                      </select>
                    </div>

                    <div className="group space-y-2">
                      <label className="flex items-center gap-3 font-label text-[9px] font-black uppercase tracking-[0.32em] text-primary/60 md:text-[10px]">
                        <Calendar size={14} /> The Date
                      </label>
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-transparent border-b border-white/10 py-2.5 text-on-surface focus:border-primary focus:outline-none text-sm font-body [color-scheme:dark]"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-3 font-label text-[9px] font-black uppercase tracking-[0.32em] text-primary/60 md:text-[10px]">
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
                            "rounded-xl border py-2.5 text-[10px] font-label tracking-[0.18em] transition-all",
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

                  <div className="group space-y-2">
                    <label className="block font-label text-[9px] font-black uppercase tracking-[0.32em] text-primary/60 md:text-[10px]">Special Requests</label>
                    <input
                      type="text"
                      value={requests}
                      onChange={(e) => setRequests(e.target.value)}
                      className="w-full bg-transparent border-b border-white/10 py-2.5 text-on-surface placeholder:text-on-surface-variant/20 focus:border-primary focus:outline-none text-sm italic font-body"
                      placeholder="Notes or special occasions..."
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-4 flex w-full items-center justify-center gap-4 rounded-xl py-4 font-label text-xs font-black uppercase tracking-[0.34em] text-[#0a0a0a] shadow-2xl transition-all group brass-gradient"
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
