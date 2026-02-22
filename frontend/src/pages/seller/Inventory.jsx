import React from 'react';
import { Edit3, Trash2, Plus, AlertCircle, MoreHorizontal } from 'lucide-react';

export default function Inventory() {
  const products = [
    { id: 1, name: "Wireless Headphones", price: 99, stock: 15, category: "Electronics", image: "https://picsum.photos/200/200" },
    { id: 2, name: "Smart Watch", price: 149, stock: 3, category: "Wearables", image: "https://picsum.photos/201/201" },
    { id: 3, name: "Leather Wallet", price: 45, stock: 42, category: "Accessories", image: "https://picsum.photos/202/202" },
  ];

  return (
    <div className="max-w-7xl mx-auto p-8 lg:p-12">
      <header className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Marketly/Inventory</p>
          <h1 className="text-6xl font-black tracking-tighter uppercase italic leading-none">Inventory</h1>
        </div>
        
        <button className="flex items-center gap-2 px-8 py-4 bg-black text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-indigo-600 transition-all active:scale-95 shadow-[6px_6px_0px_0px_rgba(99,102,241,0.3)] hover:shadow-none">
          <Plus size={18} strokeWidth={3} />
          Add New Product
        </button>
      </header>

      <div className="border-2 border-black rounded-[2.5rem] bg-white overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-4 border-black bg-slate-50">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest">Product Details</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest">Category</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest">Stock Status</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest">Price</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-slate-100">
              {products.map((p) => (
                <tr key={p.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="size-14 rounded-xl border-2 border-black overflow-hidden shrink-0">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="font-black uppercase tracking-tight text-lg">{p.name}</span>
                    </div>
                  </td>

                  <td className="px-8 py-6">
                    <span className="text-[10px] font-black uppercase px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg">
                      {p.category}
                    </span>
                  </td>

                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-black ${p.stock < 5 ? 'text-red-500' : 'text-slate-900'}`}>
                        {p.stock} Units
                      </span>
                      {p.stock < 5 && (
                        <div className="flex items-center gap-1 text-[10px] font-black text-red-500 uppercase bg-red-50 px-2 py-0.5 rounded animate-pulse">
                          <AlertCircle size={10} /> Low
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="px-8 py-6">
                    <span className="text-2xl font-black tracking-tighter">${p.price}</span>
                  </td>

                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-3 border-2 border-slate-100 rounded-xl hover:border-black hover:bg-black hover:text-white transition-all">
                        <Edit3 size={16} />
                      </button>
                      <button className="p-3 border-2 border-slate-100 rounded-xl hover:border-red-500 hover:bg-red-500 hover:text-white transition-all text-slate-400">
                        <Trash2 size={16} />
                      </button>
                      <button className="p-3 text-slate-300 hover:text-black">
                        <MoreHorizontal size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 flex justify-between items-center px-4">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
          Showing {products.length} Products in Total
        </p>
        <div className="flex gap-2">
          {[1, 2, 3].map(n => (
            <button key={n} className={`size-8 rounded-lg border-2 font-black text-[10px] flex items-center justify-center transition-all ${n === 1 ? 'border-black bg-black text-white' : 'border-slate-100 text-slate-400 hover:border-black'}`}>
              {n}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}