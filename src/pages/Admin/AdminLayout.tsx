import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  CalendarCheck, 
  LogOut,
  ChevronRight,
  Bell,
  Menu,
  X
} from 'lucide-react';
import { cn } from '../../lib/utils';
import logo from '../../assets/logo.png';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: UtensilsCrossed, label: 'Menu Manager', path: '/admin/menu' },
  { icon: CalendarCheck, label: 'Reservations', path: '/admin/reservations' },
];

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const SidebarContent = () => (
    <>
      <div className="p-8">
        <Link to="/" className="block">
          <img src={logo} alt="Brooks & Bonds" className="h-12 md:h-16 object-contain" />
        </Link>
        <div className="mt-8 px-4 py-2 bg-primary/5 border border-primary/10 rounded-lg">
          <p className="text-[10px] uppercase tracking-[0.2em] text-primary/60 font-label">Sanctuary Console</p>
          <p className="text-xs font-title text-primary mt-0.5">Admin Portal v1.0</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={cn(
                "flex items-center space-x-4 px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden",
                isActive 
                  ? "bg-primary/10 text-primary shadow-lg shadow-primary/5" 
                  : "text-on-surface/60 hover:text-on-surface hover:bg-white/5"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute inset-0 bg-primary/5 border-l-2 border-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <item.icon className={cn("w-5 h-5 relative z-10 transition-transform duration-300 group-hover:scale-110", isActive && "text-primary")} />
              <span className="font-label text-[11px] uppercase tracking-[0.15em] relative z-10 font-bold">
                {item.label}
              </span>
              {isActive && <ChevronRight className="w-4 h-4 ml-auto text-primary relative z-10" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-primary/10">
        <button className="flex items-center space-x-4 px-4 py-3 text-on-surface/40 hover:text-error transition-colors w-full group">
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-label text-[11px] uppercase tracking-[0.15em]">Sign Out</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-on-surface flex overflow-hidden relative">
      
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 bg-[#121316] border-r border-primary/10 flex-col relative z-20">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-[#121316] z-50 flex flex-col border-r border-primary/10 lg:hidden"
            >
              <div className="absolute top-4 right-4 lg:hidden">
                <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Background Glows */}
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 blur-[150px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-secondary/5 blur-[150px] -z-10" />

        {/* Header */}
        <header className="h-16 md:h-20 border-b border-primary/10 bg-[#121316]/80 backdrop-blur-xl px-4 md:px-8 flex items-center justify-between z-10 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex flex-col">
              <h1 className="font-title text-base md:text-xl text-primary leading-none mb-1">
                {menuItems.find(i => i.path === location.pathname)?.label || 'Dashboard'}
              </h1>
              <p className="hidden sm:block text-[9px] uppercase tracking-[0.2em] text-on-surface/40 font-label">
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 md:space-x-6">
            <button className="relative p-2 text-on-surface/60 hover:text-primary transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full border-2 border-[#121316]" />
            </button>
            
            <div className="flex items-center space-x-3 md:space-x-4 pl-4 md:pl-6 border-l border-primary/10">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-title text-on-surface">Brewmaster</p>
                <p className="text-[9px] uppercase tracking-widest text-primary font-label">Super User</p>
              </div>
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl brass-gradient p-[1px] shadow-lg shadow-primary/10">
                <div className="w-full h-full rounded-[11px] bg-[#0a0a0a] flex items-center justify-center font-title text-primary text-xs md:text-sm">
                  BA
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <Outlet />
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
