import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, ShoppingBag, ShoppingCart, MessageCircle, 
  Package, BarChart3, PlusCircle, Repeat, User, LogOut, Settings
} from 'lucide-react';

import logoImg from '../assets/imgs/logo.png';

export const Navbar = ({ cartCount = 0, messageCount = 0 }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('buyer');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  useEffect(() => {
    setViewMode(location.pathname.startsWith('/seller') ? 'seller' : 'buyer');
  }, [location.pathname]);

  const buyerItems = [
    { id: 'home', name: 'Home', path: '/', icon: <Home size={20} /> },
    { id: 'market', name: 'Market', path: '/marketplace', icon: <ShoppingBag size={20} /> },
    { id: 'cart', name: 'Cart', path: '/cart', icon: <ShoppingCart size={20} />, badge: cartCount },
  ];

  const sellerItems = [
    { id: 'dash', name: 'Dashboard', path: '/seller/dashboard', icon: <BarChart3 size={20} /> },
    { id: 'inv', name: 'Inventory', path: '/seller/inventory', icon: <Package size={20} /> },
    { id: 'add', name: 'Add Product', path: '/seller/add', icon: <PlusCircle size={20} /> },
  ];

  const currentItems = viewMode === 'buyer' ? buyerItems : sellerItems;

  const handleModeSwitch = () => {
    const nextMode = viewMode === 'buyer' ? 'seller' : 'buyer';
    const nextPath = nextMode === 'seller' ? '/seller/dashboard' : '/';
    navigate(nextPath);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <motion.div 
        layout
        transition={{ layout: { duration: 0.4, type: "spring", bounce: 0.2 } }}
        // Frosted effect: backdrop-blur-3xl and lower opacity (bg-white/40)
        // Black border: border-2 border-black
        className={`flex items-center justify-between w-full max-w-7xl h-18 px-6 
                    backdrop-blur-3xl border-2 border-black shadow-2xl rounded-[2.5rem] 
                    transition-colors duration-500 overflow-visible
                    ${viewMode === 'seller' ? 'bg-indigo-50/40' : 'bg-white/40'}`}
      >
        
        {/* Brand */}
        <div className="flex items-center gap-4">
          <motion.div layout whileHover={{ scale: 1.05 }} className="size-10 shrink-0 rounded-2xl bg-white overflow-hidden border border-black shadow-sm">
            <img src={logoImg} alt="Logo" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div layout className="hidden md:block">
            <h1 className="text-xl font-black tracking-tighter uppercase italic leading-none text-black">Marketly</h1>
            <p className={`text-[10px] font-black uppercase tracking-widest ${viewMode === 'seller' ? 'text-indigo-600' : 'text-black/40'}`}>
              {viewMode} Portal
            </p>
          </motion.div>
        </div>

        {/* Navigation Section */}
        <motion.div layout className="flex items-center bg-black/10 p-1.5 rounded-[2rem] gap-1 relative border border-black/5">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={viewMode}
              initial={{ y: 10, opacity: 0, filter: 'blur(4px)' }}
              animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
              exit={{ y: -10, opacity: 0, filter: 'blur(4px)' }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-1"
            >
              {currentItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`relative flex items-center gap-3 px-5 py-2.5 rounded-full font-black text-xs uppercase tracking-tight transition-all duration-300 ${isActive ? 'text-white' : 'text-black/60 hover:text-black'}`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill-bg"
                        className="absolute inset-0 bg-black rounded-full"
                        style={{ zIndex: 0 }}
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-3">
                      {item.icon}
                      <span className="hidden sm:inline">{item.name}</span>
                    </span>
                  </Link>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Action Zone */}
        <div className="flex items-center gap-3">
          <motion.button 
            layout
            whileHover={{ scale: 1.02, backgroundColor: '#000' }}
            whileTap={{ scale: 0.98 }}
            onClick={handleModeSwitch}
            className="hidden lg:flex items-center gap-2 px-6 py-3 rounded-2xl bg-black text-white font-black text-[11px] uppercase tracking-widest transition-all"
          >
            <motion.div
              animate={{ rotate: viewMode === 'seller' ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Repeat size={14} />
            </motion.div>
            {viewMode === 'buyer' ? 'Seller Hub' : 'Buyer Hub'}
          </motion.button>

          <Link to="/messages" className="p-3 bg-black/5 hover:bg-black/10 text-black border border-black/10 rounded-2xl relative transition-all">
            <MessageCircle size={22} />
          </Link>

          {/* Profile Section */}
          <div className="relative">
            <motion.button
              layout
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className={`size-12 rounded-2xl border-2 flex items-center justify-center transition-all shadow-sm ${
                isProfileOpen ? 'border-black bg-black text-white' : 'border-black bg-white/50 text-black'
              }`}
            >
              <User size={22} />
            </motion.button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 15 }}
                  className="absolute right-0 mt-4 w-52 bg-white border-2 border-black rounded-[2rem] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-hidden py-2 z-[60]"
                >
                  <button className="w-full flex items-center gap-3 px-5 py-3 hover:bg-slate-100 text-xs font-black uppercase transition-colors">
                    <Settings size={16} strokeWidth={3} /> Settings
                  </button>
                  <button className="w-full flex items-center gap-3 px-5 py-3 hover:bg-red-500 hover:text-white text-red-500 text-xs font-black uppercase transition-colors">
                    <LogOut size={16} strokeWidth={3} /> Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};