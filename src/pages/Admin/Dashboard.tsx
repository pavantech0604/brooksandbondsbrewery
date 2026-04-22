import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  Beer, 
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Loader2
} from 'lucide-react';
import { useBrewery } from '../../context/BreweryContext';
import { cn } from '../../lib/utils';

const Dashboard: React.FC = () => {
  const { beers, reservations, loading } = useBrewery();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 md:p-20 text-primary/40">
        <Loader2 className="w-10 h-10 md:w-12 md:h-12 animate-spin mb-4" />
        <p className="font-label text-[9px] md:text-[10px] uppercase tracking-[0.2em]">Synthesizing Archive Data...</p>
      </div>
    );
  }

  const stats = [
    { 
      label: 'Revenue (Est)', 
      value: '₹' + (reservations.length * 1500).toLocaleString(), 
      trend: '+12.5%', 
      up: true, 
      icon: TrendingUp,
      color: 'text-primary'
    },
    { 
      label: 'Total Guests', 
      value: reservations.reduce((acc, r) => acc + r.pax, 0).toString(), 
      trend: '+8.2%', 
      up: true, 
      icon: Users,
      color: 'text-secondary'
    },
    { 
      label: 'Active Brews', 
      value: beers.filter(b => b.status === 'In Stock').length.toString(), 
      trend: beers.length.toString(), 
      up: true, 
      icon: Beer,
      color: 'text-accent'
    },
    { 
      label: 'Avg Pax', 
      value: reservations.length ? (reservations.reduce((acc, r) => acc + r.pax, 0) / reservations.length).toFixed(1) : '0', 
      trend: '+5.1%', 
      up: true, 
      icon: Clock,
      color: 'text-primary'
    },
  ];

  return (
    <div className="space-y-8 md:space-y-10 pb-12">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#121316] border border-primary/10 p-4 md:p-6 rounded-xl md:rounded-2xl relative overflow-hidden group hover:border-primary/30 transition-all duration-500"
          >
            <div className="absolute top-0 right-0 w-16 md:w-24 h-16 md:h-24 bg-primary/5 blur-3xl -mr-8 -mt-8 md:-mr-12 md:-mt-12 group-hover:bg-primary/10 transition-colors" />
            
            <div className="flex justify-between items-start relative z-10">
              <div className={stat.color}>
                <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div className={cn(
                "flex items-center text-[9px] md:text-[10px] font-bold",
                stat.up ? "text-success" : "text-error"
              )}>
                {stat.trend}
                {stat.up ? <ArrowUpRight className="w-2.5 h-2.5 md:w-3 md:h-3 ml-0.5" /> : <ArrowDownRight className="w-2.5 h-2.5 md:w-3 md:h-3 ml-0.5" />}
              </div>
            </div>

            <div className="mt-4 relative z-10">
              <p className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-on-surface/40 font-label">{stat.label}</p>
              <h3 className="text-xl md:text-3xl font-title text-on-surface mt-1">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Reservations */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-title text-xl md:text-2xl text-on-surface flex items-center gap-3">
              <Calendar className="text-primary w-5 h-5 md:w-6 md:h-6" />
              Immediate Rituals
            </h2>
            <button className="text-[9px] md:text-[10px] uppercase tracking-widest text-primary hover:underline font-label">Registry</button>
          </div>

          <div className="bg-[#121316] border border-primary/10 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[500px] md:min-w-0">
                <thead>
                  <tr className="border-b border-primary/5 bg-white/2">
                    <th className="px-6 py-4 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-label text-on-surface/40">Guest</th>
                    <th className="px-6 py-4 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-label text-on-surface/40">Time</th>
                    <th className="px-6 py-4 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-label text-on-surface/40">Pax</th>
                    <th className="px-6 py-4 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-label text-on-surface/40">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/5">
                  {reservations.slice(0, 5).map((row, i) => (
                    <tr key={i} className="hover:bg-white/2 transition-colors group">
                      <td className="px-6 py-4">
                        <p className="font-title text-sm text-on-surface">{row.guest_name}</p>
                      </td>
                      <td className="px-6 py-4 text-[11px] md:text-xs text-on-surface/60 font-mono tracking-wider">{row.time}</td>
                      <td className="px-6 py-4 text-[11px] md:text-xs font-title text-primary">{row.pax} Guests</td>
                      <td className="px-6 py-4">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[8px] md:text-[9px] uppercase tracking-widest font-bold",
                          row.status === 'Confirmed' ? "bg-success/10 text-success" :
                          row.status === 'Arrived' ? "bg-primary/10 text-primary" :
                          "bg-warning/10 text-warning"
                        )}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {reservations.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-on-surface/20 font-label uppercase text-[10px] tracking-widest italic">
                        The registry is currently silent
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Popular Alchemy */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-title text-xl md:text-2xl text-on-surface">Trending Alchemy</h2>
          </div>

          <div className="bg-[#121316] border border-primary/10 rounded-2xl p-6 space-y-6 shadow-xl">
            {beers.slice(0, 4).map((item, i) => (
              <div key={i} className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-white/5 border border-primary/10 flex items-center justify-center font-title text-primary text-xs transition-colors group-hover:border-primary/40">
                    #{i + 1}
                  </div>
                  <div>
                    <h4 className="font-title text-xs md:text-sm text-on-surface group-hover:text-primary transition-colors">{item.name}</h4>
                    <p className="text-[8px] md:text-[10px] uppercase tracking-widest text-on-surface/40">{item.status}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-title text-primary">{item.price}</p>
                </div>
              </div>
            ))}
            {beers.length === 0 && (
              <p className="text-center text-on-surface/20 font-label uppercase text-[10px] tracking-widest italic py-8">
                No alchemy discovered yet
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
