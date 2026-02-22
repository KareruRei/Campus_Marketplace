import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, Package, Clock, Plus, 
  X, Receipt, Calendar, User, ArrowUpRight 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SellerDashboard() {
  const [selectedTx, setSelectedTx] = useState(null);

  const stats = [
    { label: 'Total Sales', value: '₱245,250', color: 'text-emerald-500', icon: <TrendingUp size={20} />, growth: '+12.5%' },
    { label: 'Active Orders', value: '12', color: 'text-indigo-600', icon: <Package size={20} />, growth: '2 new' },
  ];

  // Expanded data for the popup
  const recentSales = [
    { 
      id: '#4821', product: 'MacBook Pro 2020', status: 'Shipped', amount: '₱48,500', 
      date: 'Feb 23, 2026', buyer: 'John Doe', payment: 'GCash', orderId: 'ORD-9921' 
    },
    { 
      id: '#4820', product: 'Ergonomic Chair', status: 'Processing', amount: '₱6,200', 
      date: 'Feb 22, 2026', buyer: 'Jane Smith', payment: 'Bank Transfer', orderId: 'ORD-8842' 
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-8 lg:p-12 pt-32 relative">
      
      {/* --- TRANSACTION DETAIL POPUP --- */}
      <AnimatePresence>
        {selectedTx && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedTx(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-xl bg-white border-4 border-black rounded-[40px] shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
            >
              <div className="bg-black p-8 text-white flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-white/20 rounded-2xl"><Receipt size={24} /></div>
                  <div>
                    <h3 className="font-black uppercase tracking-tighter text-2xl">Sale Details</h3>
                    <p className="text-[10px] text-white/50 font-bold uppercase tracking-widest">{selectedTx.orderId}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedTx(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="p-8 space-y-8">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Product</p>
                    <h4 className="text-3xl font-black uppercase tracking-tighter">{selectedTx.product}</h4>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Earnings</p>
                    <h4 className="text-4xl font-black tracking-tighter text-emerald-500">{selectedTx.amount}</h4>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="border-2 border-black p-4 rounded-2xl flex items-center gap-4">
                    <Calendar className="text-gray-400" size={20} />
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Date</p>
                      <p className="font-bold text-sm">{selectedTx.date}</p>
                    </div>
                  </div>
                  <div className="border-2 border-black p-4 rounded-2xl flex items-center gap-4">
                    <User className="text-gray-400" size={20} />
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Buyer</p>
                      <p className="font-bold text-sm">{selectedTx.buyer}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b-2 border-gray-100 pb-4">
                    <span className="text-xs font-black uppercase tracking-widest text-gray-400">Payment Via</span>
                    <span className="font-black uppercase text-sm">{selectedTx.payment}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-widest text-gray-400">Current Status</span>
                    <span className="px-4 py-1 bg-black text-white font-black text-xs rounded-full uppercase italic tracking-widest">
                      {selectedTx.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-gray-50 flex gap-4">
                <button onClick={() => setSelectedTx(null)} className="flex-1 py-4 bg-black text-white font-black uppercase tracking-widest text-xs hover:bg-indigo-600 transition-all transform active:scale-95">
                  Dismiss
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <header className="mb-12">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Management Console</p>
        <h1 className="text-6xl font-black tracking-tighter uppercase italic leading-none">Dashboard</h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stats.map((stat) => (
          <div 
            key={stat.label} 
            className="group p-8 bg-white/40 backdrop-blur-xl border-2 border-black rounded-[2.5rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-black text-white rounded-2xl">{stat.icon}</div>
              <span className="text-[10px] font-black px-3 py-1 bg-white border border-black rounded-full uppercase tracking-tight">{stat.growth}</span>
            </div>
            <p className="text-xs text-slate-500 font-black uppercase tracking-widest">{stat.label}</p>
            <p className={`text-5xl font-black tracking-tighter mt-2 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}

        <Link 
          to="/seller/add" 
          className="group p-8 bg-indigo-600 border-2 border-black rounded-[2.5rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex flex-col justify-center items-center text-center text-white"
        >
          <div className="size-14 bg-white text-indigo-600 rounded-2xl flex items-center justify-center mb-4 group-hover:rotate-90 transition-transform duration-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
            <Plus size={32} strokeWidth={3} />
          </div>
          <h3 className="text-2xl font-black uppercase tracking-tighter">Add Product</h3>
          <p className="text-indigo-200 text-[10px] font-bold uppercase tracking-widest mt-1">List a new item</p>
        </Link>

        {/* Recent Orders Section */}
        <div className="md:col-span-3 mt-4">
          <div className="p-8 border-2 border-black rounded-[2.5rem] bg-white/60 backdrop-blur-md shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-center gap-3 mb-10 text-center">
              <Clock size={24} className="text-indigo-500" />
              <h3 className="text-3xl font-black uppercase tracking-tighter">Recent Orders</h3>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-4">
              {recentSales.map((sale) => (
                <div 
                  key={sale.id} 
                  onClick={() => setSelectedTx(sale)}
                  className="flex items-center justify-between p-6 border-2 border-slate-100 rounded-[2rem] hover:border-black hover:bg-white transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-6">
                    <div className="hidden sm:flex size-14 bg-black text-white rounded-2xl items-center justify-center font-black text-xs italic">
                      BOX
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{sale.id}</p>
                      <p className="font-black uppercase tracking-tight text-lg group-hover:text-indigo-600 transition-colors">{sale.product}</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-8">
                    <div className="hidden md:block">
                       <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Status</p>
                       <span className="text-[10px] font-black uppercase px-3 py-1 bg-emerald-100 text-emerald-600 rounded-lg">
                        {sale.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Amount</p>
                      <p className="font-black text-2xl tracking-tighter leading-none">{sale.amount}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-6 flex justify-center">
                <button className="px-10 py-4 border-2 border-black rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-black hover:text-white transition-all transform active:scale-95 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none">
                  View All Transactions
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}