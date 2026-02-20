import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Package, ArrowUpRight, Clock, Plus } from 'lucide-react';

export default function SellerDashboard() {
  const stats = [
    { label: 'Total Sales', value: '$4,250', color: 'text-emerald-500', icon: <TrendingUp size={20} />, growth: '+12.5%' },
    { label: 'Active Orders', value: '12', color: 'text-indigo-600', icon: <Package size={20} />, growth: '2 new' },
  ];

  const recentSales = [
    { id: '#4821', product: 'MacBook Pro 2020', status: 'Shipped', amount: '$850' },
    { id: '#4820', product: 'Ergonomic Chair', status: 'Processing', amount: '$120' },
  ];

  return (
    <div className="max-w-7xl mx-auto p-8 lg:p-12 pt-32">
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
              <div className="p-3 bg-black text-white rounded-2xl">
                {stat.icon}
              </div>
              <span className="text-[10px] font-black px-3 py-1 bg-white border border-black rounded-full uppercase tracking-tight">
                {stat.growth}
              </span>
            </div>
            
            <p className="text-xs text-slate-500 font-black uppercase tracking-widest">{stat.label}</p>
            <div className="flex items-end justify-between">
              <p className={`text-5xl font-black tracking-tighter mt-2 ${stat.color}`}>{stat.value}</p>
            </div>
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

        <div className="md:col-span-3 mt-4">
          <div className="p-8 border-2 border-black rounded-[2.5rem] bg-white/60 backdrop-blur-md shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]">
            <div className="flex items-center justify-center gap-3 mb-10 text-center">
              <Clock size={24} className="text-indigo-500" />
              <h3 className="text-3xl font-black uppercase tracking-tighter">Recent Orders</h3>
            </div>
            
            <div className="max-w-4xl mx-auto space-y-4">
              {recentSales.map((sale) => (
                <div key={sale.id} className="flex items-center justify-between p-6 border-2 border-slate-100 rounded-[2rem] hover:border-black transition-all group bg-white/50">
                  <div className="flex items-center gap-6">
                    <div className="hidden sm:flex size-14 bg-black text-white rounded-2xl items-center justify-center font-black text-xs italic">
                      BOX
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{sale.id}</p>
                      <p className="font-black uppercase tracking-tight text-lg">{sale.product}</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-8">
                    <div className="hidden md:block">
                       <p className="text-[10px] font-black text-slate-400 uppercase">Status</p>
                       <span className="text-xs font-black uppercase px-3 py-1 bg-emerald-100 text-emerald-600 rounded-lg">
                        {sale.status}
                      </span>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase">Amount</p>
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