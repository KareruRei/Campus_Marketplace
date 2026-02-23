import React, { useState, useEffect } from 'react';
import { Edit3, X, Minus, Plus, Loader2, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../api/axios';

// --- TABLE-SPECIFIC CHUNKY SCROLLBAR ---
const tableScrollStyles = `
  .custom-table-scrollbar::-webkit-scrollbar {
    width: 12px;
  }
  .custom-table-scrollbar::-webkit-scrollbar-track {
    background: #ffffff;
    border-left: 2px solid black;
  }
  .custom-table-scrollbar::-webkit-scrollbar-thumb {
    background: black;
    border: 2px solid #ffffff;
  }
  .custom-table-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #333;
  }
`;

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);

  const STATUS_STYLE = {
    'active': 'bg-black text-white border-black',
    'sold': 'bg-slate-100 text-slate-500 border-slate-200',
    'removed': 'bg-white text-slate-300 border-slate-100 italic',
    'Active': 'bg-black text-white border-black',
    'Sold': 'bg-slate-100 text-slate-500 border-slate-200',
    'Removed': 'bg-white text-slate-300 border-slate-100 italic',
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const response = await api.get('/my-listings');
      const listings = response.data.data || response.data;
      setProducts(Array.isArray(listings) ? listings.map(l => ({
        id: l.id,
        name: l.name || l.title,
        price: parseFloat(l.price || 0),
        stock: l.stock_quantity || l.stock || 0,
        category: l.category?.name || '',
        condition: l.condition || 'New',
        status: l.is_deleted ? 'Removed' : (l.stock_quantity > 0 || l.stock > 0) ? 'Active' : 'Sold',
        image: l.image_path || 'https://picsum.photos/200/200',
      })) : []);
    } catch (err) {
      console.error("Failed to fetch listings:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Update locally first for responsiveness
      setProducts(products.map(p => p.id === editingProduct.id ? editingProduct : p));
      setEditingProduct(null);
    } catch (err) {
      console.error("Failed to update:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Remove this listing?")) return;
    try {
      await api.delete(`/listings/${id}`);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error("Failed to delete listing:", err);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 size={48} className="animate-spin text-black" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8 lg:p-12 pt-32 text-black relative font-sans h-screen overflow-hidden">
      <style>{tableScrollStyles}</style>

      {/* --- EDIT MODAL --- */}
      <AnimatePresence>
        {editingProduct && (
          <div className="fixed inset-0 z-[150] flex items-center justify-end">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setEditingProduct(null)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md bg-white h-full shadow-[-30px_0px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col border-l-4 border-black"
            >
              <div className="p-10 flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Stockroom Editor</p>
                  <h2 className="text-4xl font-black uppercase italic tracking-tighter">Modify</h2>
                </div>
                <button onClick={() => setEditingProduct(null)} className="size-12 flex items-center justify-center bg-slate-100 hover:bg-black hover:text-white rounded-2xl transition-all">
                  <X size={20} strokeWidth={3} />
                </button>
              </div>

              <form onSubmit={handleUpdate} className="px-10 space-y-8 overflow-y-auto flex-1 custom-table-scrollbar">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Product Name</label>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-black rounded-2xl font-bold outline-none transition-all"
                  />
                </div>

                {/* --- QUANTITY MODIFY SECTION --- */}
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Stock Quantity</label>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setEditingProduct({ ...editingProduct, stock: Math.max(0, editingProduct.stock - 1) })}
                      className="size-14 flex items-center justify-center border-4 border-black rounded-2xl bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all hover:bg-slate-50"
                    >
                      <Minus size={20} strokeWidth={4} />
                    </button>

                    <div className="flex-1">
                      <input
                        type="number"
                        value={editingProduct.stock}
                        onChange={(e) => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) || 0 })}
                        className="w-full text-center p-4 bg-slate-50 border-4 border-black rounded-2xl font-black text-xl outline-none"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => setEditingProduct({ ...editingProduct, stock: editingProduct.stock + 1 })}
                      className="size-14 flex items-center justify-center border-4 border-black rounded-2xl bg-black text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all hover:bg-slate-800"
                    >
                      <Plus size={20} strokeWidth={4} />
                    </button>
                  </div>
                </div>
              </form>

              <div className="p-10 flex gap-4 bg-white border-t-2 border-slate-100">
                <button type="submit" onClick={handleUpdate} className="flex-1 py-5 bg-black text-white font-black uppercase tracking-widest text-xs rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all active:scale-95">
                  Confirm Changes
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <header className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16 px-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Marketly/Inventory</p>
          <h1 className="text-6xl font-black tracking-tighter uppercase italic leading-none">Inventory</h1>
        </div>
      </header>

      {/* --- THE SCROLLABLE TABLE CONTAINER --- */}
      <div className="border-4 border-black rounded-[2.5rem] bg-white overflow-hidden shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] mx-4">
        <div className="overflow-x-auto overflow-y-auto max-h-[380px] custom-table-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 z-10">
              <tr className="border-b-4 border-black bg-white">
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest">Product</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest">Type</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest">Status</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-center">Qty</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest">Price</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-black/5">
              {products.length > 0 ? products.map((p) => (
                <tr key={p.id} className="group hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-6 flex items-center gap-4">
                    <div className="size-14 rounded-2xl border-2 border-black overflow-hidden shrink-0 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                    </div>
                    <span className="font-black uppercase tracking-tight text-lg leading-tight">{p.name}</span>
                  </td>
                  <td className="px-8 py-6 italic font-black text-xs uppercase text-slate-400">{p.condition}</td>
                  <td className="px-8 py-6">
                    <span className={`text-[9px] font-black uppercase px-3 py-1 rounded-full border-2 ${STATUS_STYLE[p.status] || 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 font-black text-xl tracking-tighter text-center">{p.stock}</td>
                  <td className="px-8 py-6 text-2xl font-black tracking-tighter italic">
                    ₱{p.price.toLocaleString()}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => setEditingProduct(p)} className="p-3 border-2 border-black rounded-xl hover:bg-black hover:text-white transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none">
                        <Edit3 size={16} strokeWidth={3} />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="p-3 border-2 border-red-400 text-red-400 rounded-xl hover:bg-red-500 hover:text-white hover:border-red-500 transition-all">
                        <Trash2 size={16} strokeWidth={3} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="px-8 py-20 text-center font-black uppercase tracking-widest text-slate-300">
                    No listings yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}