import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Globe, ArrowUpRight } from 'lucide-react';


const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Footer: React.FC = () => {
  const archiveLinks = [
    { label: 'The Brewery', href: '#home' },
    { label: 'Our Story', href: '#our-story' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Press', href: '#our-story' },
  ];

  const ritualLinks = [
    { label: 'Private Dining', href: '#reservations' },
    { label: 'Live Events', href: '#experience' },
    { label: 'Brewery Tours', href: '#our-story' },
    { label: 'Membership', href: '#reservations' },
  ];

  return (
    <footer className="bg-surface-container-low w-full py-24 border-t border-primary/5">
      <div className="container-premium grid grid-cols-1 md:grid-cols-4 gap-16">
        
        {/* Brand Column */}
        <div className="md:col-span-1 space-y-8">
          <div>
            <a href="#home" className="text-2xl font-medium font-brand text-primary tracking-tight mb-4 block hover:opacity-80 transition-opacity">Brooks & Bonds</a>
            <p className="text-on-surface-variant/60 font-body text-sm leading-relaxed italic">
              Brewing excellence since 1892. An archive of liquid craftsmanship in the heart of Bangalore.
            </p>
          </div>
          
          <div className="flex gap-6">
            <a href="https://www.instagram.com/brooksandbondsbrewery/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-background transition-all duration-300 hover:scale-110">
              <InstagramIcon />
            </a>
            <a href="https://www.zomato.com/bangalore/brooks-and-bonds-brewery-koramangala-5th-block-koramangala" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-background transition-all duration-300 hover:scale-110">
              <Globe size={18} />
            </a>
            <a href="https://maps.google.com/?q=Brooks+and+Bonds+Brewery+Koramangala+Bangalore" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-background transition-all duration-300 hover:scale-110">
              <MapPin size={18} />
            </a>
          </div>
        </div>

        {/* Archive Links */}
        <div className="space-y-6">
          <h4 className="font-label text-xs uppercase tracking-widest text-primary">Archive</h4>
          <ul className="space-y-4">
            {archiveLinks.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="font-label text-sm uppercase tracking-widest text-on-surface-variant/60 hover:text-primary flex items-center gap-2 transition-colors group">
                  {item.label}
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Rituals Links */}
        <div className="space-y-6">
          <h4 className="font-label text-xs uppercase tracking-widest text-primary">Rituals</h4>
          <ul className="space-y-4">
            {ritualLinks.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="font-label text-sm uppercase tracking-widest text-on-surface-variant/60 hover:text-primary flex items-center gap-2 transition-colors group">
                  {item.label}
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Location Column */}
        <div className="space-y-8">
          <div className="space-y-6">
            <h4 className="font-label text-xs uppercase tracking-widest text-primary">Flagship Location</h4>
            <div className="space-y-4">
              <a href="https://maps.google.com/?q=Brooks+and+Bonds+Brewery+Koramangala+Bangalore" target="_blank" rel="noopener noreferrer" className="flex gap-4 group hover:opacity-80 transition-opacity">
                <MapPin className="text-primary shrink-0 group-hover:scale-110 transition-transform" size={18} />
                <p className="text-on-surface-variant/60 font-body text-sm leading-relaxed italic">
                  4, 12th Main Rd, HAL 2nd Stage,<br />
                  Koramangala 5th Block, Bangalore,<br />
                  Karnataka 560034
                </p>
              </a>
              <a href="tel:+919900000000" className="flex gap-4 group hover:opacity-80 transition-opacity">
                <Phone className="text-primary shrink-0 group-hover:scale-110 transition-transform" size={18} />
                <p className="text-on-surface-variant/60 font-body text-sm group-hover:text-primary transition-colors">+91 99000 00000</p>
              </a>
            </div>
          </div>
          
          <a 
            href="https://maps.google.com/?q=Brooks+and+Bonds+Brewery+Koramangala+Bangalore" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block h-32 w-full bg-background rounded-2xl overflow-hidden grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-700 relative group cursor-pointer border border-white/5"
          >
            <img 
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800" 
              alt="Bangalore Map"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all">
              <span className="font-label text-[10px] uppercase tracking-widest text-primary group-hover:scale-110 transition-transform">Open in Maps</span>
            </div>
          </a>
        </div>
      </div>

      <div className="container-premium mt-32 pt-12 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant/30">© 2024 Brooks & Bonds Brewery. Est. 1892.</span>
        <div className="flex gap-12">
          <Link to="/admin" className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/30 hover:text-primary transition-colors">Staff Portal</Link>
          <a href="#home" className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/30 hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#home" className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant/30 hover:text-primary transition-colors">Terms of Service</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
