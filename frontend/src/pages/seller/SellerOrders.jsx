import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Package, Truck, CheckCircle, Clock, 
  ChevronDown, User, ShoppingBag, Calendar, AlertCircle
} from 'lucide-react';

// --- CUSTOM CHUNKY SCROLLBAR STYLE ---
const scrollStyles = `
  .orders-scrollbar::-webkit-scrollbar {
    width: 12px;
  }
  .orders-scrollbar::-webkit-scrollbar-track {
    background: transparent;
    margin-block: 10px;
  }
  .orders-scrollbar::-webkit-scrollbar-thumb {
    background: black;
    border: 2px solid #f8fafc;
    border-radius: 10px;
  }
`;

const STATUS_CONFIG = {
  'Pending': { color: 'bg-white text-slate-400 border-2 border-slate-200', icon: Clock, pulse: true },
  'Processing': { color: 'bg-slate-100 text-black border-2 border-slate-300', icon: Package, pulse: true },
  'Shipped': { color: 'bg-slate-800 text-white border-2 border-black', icon: Truck, pulse: false },
  'Delivered': { color: 'bg-black text-white border-2 border-black', icon: CheckCircle, pulse: false },
};

export const SellerOrders = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);
  
  const [orders, setOrders] = useState([
    { id: '2061', customer: 'Kareru', items: 'MacBook Pro 2020', total: 48500, status: 'Pending', date: 'Feb 23, 2026', image: "https://picsum.photos/200/200" },
    { id: '2062', customer: 'Chiba', items: 'Ergonomic Chair', total: 6500, status: 'Processing', date: 'Feb 22, 2026', image: "https://picsum.photos/201/201" },
    { id: '2063', customer: 'Rivera', items: 'Mechanical Keyboard', total: 3200, status: 'Shipped', date: 'Feb 21, 2026', image: "https://picsum.photos/202/202" },
    { id: '2064', customer: 'Santos', items: 'UltraWide Monitor', total: 15900, status: 'Pending', date: 'Feb 20, 2026', image: "https://picsum.photos/203/203" },
  ]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updateStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => order.id === orderId ? { ...order, status: newStatus } : order));
    setActiveDropdown(null);
  };

  return (
    <div className="h-screen w-full bg-slate-50 overflow-hidden font-sans relative text-black selection:bg-yellow-200">
      <style>{scrollStyles}</style>
      
      <div className="max-w-5xl mx-auto h-full flex flex-col px-6 py-12">
        
        {/* --- HEADER --- */}
        <header className="mb-10 shrink-0">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-2"
          >
             <ShoppingBag size={14} className="text-slate-400" />
             <p className="font-black text-slate-400 uppercase tracking-[0.2em] text-[10px]">Marketly / Active Orders</p>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic leading-none"
          >
            Active <span className="text-transparent" style={{ WebkitTextStroke: '1.5px black' }}>Orders</span>
          </motion.h1>
        </header>

        {/* --- SCROLLABLE LIST --- */}
        <div className="orders-scrollbar overflow-y-auto pr-4 flex-1">
          <div className="space-y-8 pb-20">
            {orders.map((order, index) => {
              const currentStatus = STATUS_CONFIG[order.status];
              const StatusIcon = currentStatus.icon;

              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
                  whileHover={{ scale: 1.01, shadow: "12px 12px 0px 0px rgba(0,0,0,1)" }}
                  className="relative bg-white border-4 border-black rounded-[2.5rem] p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all flex flex-col md:flex-row items-center gap-6"
                >
                  {/* Product Image */}
                  <div className="shrink-0 relative group">
                    <img src={order.image} className="size-24 object-cover rounded-3xl border-4 border-black transition-transform group-hover:rotate-3" alt={order.items} />
                    <div className="absolute -top-2 -left-2 bg-yellow-400 border-2 border-black text-[10px] font-black px-2 py-0.5 rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      #{order.id}
                    </div>
                  </div>

                  {/* Order Info */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                      <span className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-1">
                        <Calendar size={10} /> {order.date}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tight leading-tight mb-1 group-hover:text-indigo-600 transition-colors">{order.items}</h3>
                    <div className="flex items-center justify-center md:justify-start gap-2">
                      <div className="size-5 bg-slate-200 rounded-full border border-black flex items-center justify-center overflow-hidden">
                         <User size={12} />
                      </div>
                      <p className="text-[10px] font-bold text-black uppercase tracking-widest">
                        {order.customer}
                      </p>
                    </div>
                  </div>

                  {/* Actions & Price */}
                  <div className="flex flex-row md:flex-col items-center md:items-end gap-4 md:pl-8 md:border-l-4 md:border-black/5 w-full md:w-auto justify-between md:justify-center">
                    <div className="text-right">
                      <p className="text-xs font-black text-slate-400 uppercase">Total Amount</p>
                      <p className="text-2xl font-black tracking-tight">₱{order.total.toLocaleString()}</p>
                    </div>

                    <div className="relative" ref={activeDropdown === order.id ? dropdownRef : null}>
                      <button 
                        onClick={() => setActiveDropdown(activeDropdown === order.id ? null : order.id)}
                        className={`group flex items-center gap-2 px-5 py-3 rounded-2xl border-2 border-black font-black text-[10px] uppercase tracking-wider transition-all ${currentStatus.color} shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1`}
                      >
                        {currentStatus.pulse && (
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
                          </span>
                        )}
                        <StatusIcon size={14} /> 
                        {order.status} 
                        <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === order.id ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence>
                        {activeDropdown === order.id && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 10 }} 
                            animate={{ opacity: 1, scale: 1, y: 0 }} 
                            exit={{ opacity: 0, scale: 0.9, y: 10 }}
                            className="absolute right-0 bottom-full md:bottom-auto md:top-full mb-2 md:mb-0 md:mt-3 w-44 bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-[100] overflow-hidden"
                          >
                            {Object.entries(STATUS_CONFIG).map(([label, config]) => (
                              <button
                                key={label}
                                onClick={() => updateStatus(order.id, label)}
                                className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-black hover:text-white transition-colors text-[10px] font-black uppercase tracking-wider border-b-2 last:border-b-0 border-black group"
                              >
                                {label}
                                {order.status === label ? (
                                  <CheckCircle size={12} className="text-green-500 group-hover:text-white" />
                                ) : (
                                  <div className="size-3 rounded-full border border-black group-hover:border-white" />
                                )}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};