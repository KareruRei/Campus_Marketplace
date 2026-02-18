import React, { useState } from 'react';
import { Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';

export const Cart = () => {
  // Sample state for cart items
  const [cartItems, setCartItems] = useState([
    { id: 1, title: "MacBook Pro 2020", category: "Electronics", price: 850, quantity: 1, image: "https://picsum.photos/300/400" },
    { id: 2, title: "Ergonomic Chair", category: "Furniture", price: 120, quantity: 1, image: "https://picsum.photos/301/400" },
  ]);

  const updateQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screenp-8 lg:p-12">
      <header className="mb-16">
        <div className="flex items-center gap-4 mb-2 text-black">
          <ShoppingBag size={24} />
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Your Selection</p>
        </div>
        <h1 className="text-6xl font-black tracking-tighter uppercase leading-none">Your Cart</h1>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-16">
        {/* --- ITEMS LIST --- */}
        <div className="xl:col-span-2 space-y-10">
          {cartItems.length > 0 ? (
            cartItems.map(item => (
              <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-8 border-b-2 border-slate-50 pb-10 group">
                {/* Product Image */}
                <div className="relative overflow-hidden rounded-2xl bg-slate-100 shrink-0">
                  <img src={item.image} className="w-32 h-40 object-cover transition-transform duration-500 group-hover:scale-110" alt={item.title} />
                </div>

                {/* Info */}
                <div className="flex-1">
                  <p className="text-[10px] font-black uppercase text-indigo-500 tracking-widest mb-1">{item.category}</p>
                  <h3 className="text-2xl font-black uppercase tracking-tighter leading-tight mb-4">{item.title}</h3>
                  
                  {/* Quantity Selector */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border-2 border-black rounded-xl p-1">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <Minus size={14} strokeWidth={3} />
                      </button>
                      <span className="w-10 text-center font-black text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                      >
                        <Plus size={14} strokeWidth={3} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-slate-300 hover:text-red-500 transition-colors p-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-1">Price</p>
                  <span className="text-3xl font-black tracking-tighter">${item.price * item.quantity}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center border-4 border-dashed border-slate-100 rounded-[40px]">
              <p className="text-2xl font-black uppercase text-slate-200 tracking-widest">Cart is Empty</p>
            </div>
          )}
        </div>

        {/* --- SUMMARY SIDEBAR --- */}
        <div className="relative">
          <div className="sticky top-12 border-4 border-black p-8 rounded-[40px] bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-2xl font-black uppercase tracking-tighter mb-8 italic">Order Summary</h3>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm font-bold uppercase text-slate-400 tracking-widest">
                <span>Total Items</span>
                <span className="text-black">{cartItems.reduce((acc, i) => acc + i.quantity, 0)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold uppercase text-slate-400 tracking-widest">
                <span>Shipping</span>
                <span className="text-emerald-500 underline decoration-2 underline-offset-4 font-black text-[10px]">Campus Pickup (Free)</span>
              </div>
            </div>

            <div className="border-t-4 border-black pt-6 mb-8">
              <div className="flex justify-between items-end">
                <span className="text-xs font-black uppercase tracking-widest text-slate-400 leading-none">Total Amount</span>
                <span className="text-5xl font-black tracking-tighter leading-none">${subtotal}</span>
              </div>
            </div>

            <button className="group relative w-full bg-black text-white py-6 rounded-2xl font-black uppercase tracking-widest text-sm overflow-hidden transition-all hover:bg-indigo-600 active:scale-95">
              <span className="relative z-10">Buy Items</span>
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};