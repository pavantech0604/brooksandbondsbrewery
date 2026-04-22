import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Globe, ArrowUpRight } from 'lucide-react';
import logo from '../assets/logo.png';


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
    <footer className="w-full border-t border-primary/5 bg-[#0a0a0c] py-[4.5rem] md:py-24">
      <div className="container-premium grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        
        {/* Brand Column */}
        <div className="md:col-span-1 space-y-8">
          <div className="space-y-6">
            <a href="#home" className="block hover:opacity-80 transition-opacity">
              <img src={logo} alt="Brooks & Bonds" className="h-20 md:h-28 w-auto object-contain" />
            </a>
            <p className="text-on-surface-variant/50 font-body text-sm leading-relaxed italic max-w-[280px]">
              Brewing excellence since 1892. An archive of liquid craftsmanship in the heart of Bangalore.
            </p>
          </div>
          
          <div className="flex gap-4">
            <a href="https://www.instagram.com/brooksandbondsbrewery/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-primary/10 flex items-center justify-center text-primary/60 hover:bg-primary hover:text-background hover:border-primary transition-all duration-500 hover:scale-110">
              <InstagramIcon />
            </a>
            <a href="https://www.zomato.com/bangalore/brooks-and-bonds-brewery-koramangala-5th-block-koramangala" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-primary/10 flex items-center justify-center text-primary/60 hover:bg-primary hover:text-background hover:border-primary transition-all duration-500 hover:scale-110">
              <Globe size={18} />
            </a>
            <a href="https://maps.google.com/?q=Brooks+and+Bonds+Brewery+Koramangala+Bangalore" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-full border border-primary/10 flex items-center justify-center text-primary/60 hover:bg-primary hover:text-background hover:border-primary transition-all duration-500 hover:scale-110">
              <MapPin size={18} />
            </a>
          </div>
        </div>

        {/* Archive Links */}
        <div className="space-y-8">
          <h4 className="font-label text-xs uppercase tracking-[0.35em] text-primary/80">Archive</h4>
          <ul className="space-y-5">
            {archiveLinks.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="group flex items-center gap-2 font-label text-xs uppercase tracking-[0.24em] text-on-surface-variant/40 transition-all hover:text-primary hover:translate-x-1">
                  {item.label}
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Rituals Links */}
        <div className="space-y-8">
          <h4 className="font-label text-xs uppercase tracking-[0.35em] text-primary/80">Rituals</h4>
          <ul className="space-y-5">
            {ritualLinks.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="group flex items-center gap-2 font-label text-xs uppercase tracking-[0.24em] text-on-surface-variant/40 transition-all hover:text-primary hover:translate-x-1">
                  {item.label}
                  <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all duration-300" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Location Column */}
        <div className="space-y-8">
          <div className="space-y-8">
            <h4 className="font-label text-xs uppercase tracking-[0.35em] text-primary/80">Flagship Location</h4>
            <div className="space-y-6">
              <a href="https://maps.google.com/?q=Brooks+and+Bonds+Brewery+Koramangala+Bangalore" target="_blank" rel="noopener noreferrer" className="flex gap-4 group">
                <MapPin className="text-primary/40 shrink-0 group-hover:text-primary transition-colors" size={18} />
                <p className="text-on-surface-variant/50 font-body text-sm leading-relaxed italic group-hover:text-on-surface-variant transition-colors">
                  4, 12th Main Rd, HAL 2nd Stage,<br />
                  Koramangala 5th Block, Bangalore,<br />
                  Karnataka 560034
                </p>
              </a>
              <a href="tel:+919900000000" className="flex gap-4 group">
                <Phone className="text-primary/40 shrink-0 group-hover:text-primary transition-colors" size={18} />
                <p className="text-on-surface-variant/50 font-body text-sm group-hover:text-primary transition-colors font-medium tracking-wide">+91 99000 00000</p>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container-premium mt-16 flex flex-col items-start justify-between gap-6 border-t border-primary/5 pt-8 md:mt-20 md:flex-row md:items-center">
        <span className="font-label text-xs uppercase tracking-[0.2em] text-on-surface-variant/30">© 2024 Brooks & Bonds Brewery. Est. 1892.</span>
        <div className="flex flex-wrap gap-6 md:gap-10">
          <Link to="/admin" className="font-label text-[10px] uppercase tracking-[0.18em] text-on-surface-variant/30 transition-colors hover:text-primary">Staff Portal</Link>
          <a href="#home" className="font-label text-[10px] uppercase tracking-[0.18em] text-on-surface-variant/30 transition-colors hover:text-primary">Privacy Policy</a>
          <a href="#home" className="font-label text-[10px] uppercase tracking-[0.18em] text-on-surface-variant/30 transition-colors hover:text-primary">Terms of Service</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
