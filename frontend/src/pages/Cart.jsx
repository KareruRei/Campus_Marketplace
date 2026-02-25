import React, { useState, useEffect } from 'react';
import { Plus, Minus, Trash2, ShoppingBag, Check, X, ReceiptText, Printer, ArrowLeft, CreditCard, History, ChevronRight, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/axios';

export const Cart = () => {
  const [activeTab, setActiveTab] = useState('CART');
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pastTransactions, setPastTransactions] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isReceiptView, setIsReceiptView] = useState(false);
  const [viewingReceiptData, setViewingReceiptData] = useState(null);
  const [checkingOut, setCheckingOut] = useState(false);

  useEffect(() => {
    fetchCart();
    fetchTransactions();
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await api.get('/cart');
      const items = response.data.data || response.data;
      setCartItems(Array.isArray(items) ? items.map(item => ({
        id: item.id,
        listing_id: item.listing_id,
        title: item.listing?.title || item.listing?.name || 'Product',
        category: item.listing?.category?.name || '',
        price: parseFloat(item.listing?.price || item.price || 0),
        quantity: item.quantity || 1,
        image: item.listing?.image_path
          ? `http://127.0.0.1:8000/storage/${item.listing.image_path}`
          : 'https://picsum.photos/300/400',
      })) : []);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await api.get('/buyer/orders');
      const orders = response.data.data || response.data;
      setPastTransactions(Array.isArray(orders) ? orders.map(order => ({
        id: order.id,
        title: order.items?.[0]?.listing?.name || `Order #${order.id}`,
        date: new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        price: parseFloat(order.total_amount || 0),
        status: order.status || 'Pending',
        items: (order.items || []).map(i => ({
          title: i.listing?.name || i.name || 'Item',
          quantity: i.quantity || 1,
          price: parseFloat(i.price || 0),
        })),
      })) : []);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    }
  };

  const updateQuantity = async (id, delta) => {
    const item = cartItems.find(i => i.id === id);
    if (!item) return;
    const newQty = Math.max(1, item.quantity + delta);
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity: newQty } : i));
    try {
      await api.put(`/cart/${id}`, { quantity: newQty });
    } catch (err) {
      console.error("Failed to update quantity:", err);
      fetchCart();
    }
  };

  const removeItem = async (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    setSelectedIds(prev => prev.filter(itemId => itemId !== id));
    try {
      await api.delete(`/cart/${id}`);
    } catch (err) {
      console.error("Failed to remove item:", err);
      fetchCart();
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const selectedItems = cartItems.filter(item => selectedIds.includes(item.id));
  const total = selectedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = async () => {
    setCheckingOut(true);
    try {
      await api.post('/checkout');
      openReceipt();
      fetchCart();
      fetchTransactions();
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("Checkout failed. Please try again.");
    } finally {
      setCheckingOut(false);
    }
  };

  const openReceipt = (data = null) => {
    if (data) {
      setViewingReceiptData(data);
    } else {
      setViewingReceiptData({
        id: `#MKT-2026-${Math.floor(Math.random() * 900 + 100)}`,
        items: selectedItems,
        total: total
      });
    }
    setIsReceiptView(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={48} className="animate-spin text-black" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 lg:p-12 bg-white flex flex-col items-center">

      {/* --- TAB NAVIGATION --- */}
      {!isReceiptView && (
        <div className="flex gap-2 p-2 bg-slate-100 rounded-3xl mb-12 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <button
            onClick={() => setActiveTab('CART')}
            className={`px-8 py-3 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${activeTab === 'CART' ? 'bg-black text-white' : 'text-slate-500 hover:text-black'}`}
          >
            My Cart
          </button>
          <button
            onClick={() => setActiveTab('HISTORY')}
            className={`px-8 py-3 rounded-2xl font-black uppercase text-xs tracking-widest transition-all ${activeTab === 'HISTORY' ? 'bg-black text-white' : 'text-slate-500 hover:text-black'}`}
          >
            Transactions
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {!isReceiptView ? (
          activeTab === 'CART' ? (
            /* --- CART VIEW --- */
            <motion.div
              key="cart"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="w-full max-w-7xl"
            >
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-16 items-start">
                {/* Scrollable Column */}
                <div className="xl:col-span-2 overflow-y-auto pr-4 max-h-[70vh] custom-scrollbar space-y-10">
                  {cartItems.length > 0 ? cartItems.map(item => (
                    <div key={item.id} className="flex flex-col sm:flex-row items-center gap-8 border-b-2 border-slate-50 pb-10 mr-2">
                      <button
                        onClick={() => toggleSelect(item.id)}
                        className={`shrink-0 w-8 h-8 border-4 border-black rounded-xl flex items-center justify-center transition-all ${selectedIds.includes(item.id) ? 'bg-black text-white' : 'bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'}`}
                      >
                        {selectedIds.includes(item.id) && <Check size={16} strokeWidth={4} />}
                      </button>
                      <img src={item.image} className="w-32 h-40 shrink-0 object-cover rounded-2xl border-2 border-black" alt={item.title} />
                      <div className="flex-1">
                        <h3 className="text-2xl font-black uppercase tracking-tighter">{item.title}</h3>
                        <div className="flex items-center gap-4 mt-4">
                          <div className="flex items-center border-2 border-black rounded-xl p-1 bg-white">
                            <button onClick={() => updateQuantity(item.id, -1)} className="p-2 hover:bg-slate-100 rounded-lg"><Minus size={14} /></button>
                            <span className="w-10 text-center font-black">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:bg-slate-100 rounded-lg"><Plus size={14} /></button>
                          </div>
                          <button onClick={() => removeItem(item.id)} className="text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-black tracking-tighter">₱{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-20 border-4 border-dashed border-slate-100 rounded-[3rem]">
                      <p className="text-slate-300 font-black uppercase tracking-widest">Cart is empty</p>
                    </div>
                  )}
                </div>

                {/* Fixed Summary Column */}
                <div className="relative">
                  <div className="sticky top-0 border-4 border-black p-8 rounded-[40px] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white">
                    <h3 className="text-2xl font-black uppercase mb-8 italic tracking-tighter">Order Summary</h3>
                    <div className="flex flex-col mb-8">
                      <span className="text-xs font-black uppercase text-slate-400 mb-2 tracking-widest">Grand Total</span>
                      <span className="text-5xl font-black tracking-tighter leading-none">₱{total.toLocaleString()}</span>
                    </div>
                    <button
                      disabled={selectedIds.length === 0 || checkingOut}
                      onClick={handleCheckout}
                      className="w-full py-6 bg-black text-white rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-600 transition-all disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
                    >
                      {checkingOut ? 'Processing...' : `Checkout Now (${selectedIds.length})`}
                    </button>
                  </div>
                </div>
              </div>

              <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 8px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #000; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #4f46e5; }
              `}} />
            </motion.div>
          ) : (
            /* --- HISTORY VIEW --- */
            <motion.div
              key="history"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-4xl space-y-6"
            >
              {pastTransactions.length > 0 ? pastTransactions.map(tx => (
                <div
                  key={tx.id}
                  onClick={() => openReceipt({ id: tx.id, items: tx.items, total: tx.price })}
                  className="group flex items-center justify-between p-8 border-4 border-black rounded-[2.5rem] bg-white hover:bg-indigo-50 cursor-pointer shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all"
                >
                  <div className="flex items-center gap-6">
                    <div className="p-4 bg-slate-100 rounded-2xl group-hover:bg-white transition-colors border-2 border-transparent group-hover:border-black">
                      <History size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{tx.id}</p>
                      <p className="font-black text-2xl uppercase tracking-tighter">{tx.title}</p>
                      <span className="text-[10px] font-black px-2 py-1 bg-black text-white rounded uppercase italic">{tx.status}</span>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-6">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase">Date</p>
                      <p className="font-black text-sm">{tx.date}</p>
                    </div>
                    <ChevronRight size={32} strokeWidth={3} className="text-slate-300 group-hover:text-black transition-colors" />
                  </div>
                </div>
              )) : (
                <div className="text-center py-20 border-4 border-dashed border-slate-100 rounded-[3rem]">
                  <p className="text-slate-300 font-black uppercase tracking-widest">No transactions yet</p>
                </div>
              )}
            </motion.div>
          )
        ) : (
          /* --- RECEIPT VIEW --- */
          <motion.div
            key="receipt"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="w-full max-w-lg pt-10"
          >
            <button
              onClick={() => { setIsReceiptView(false); setViewingReceiptData(null); }}
              className="flex items-center gap-2 mb-8 font-black uppercase text-[10px] tracking-widest hover:text-indigo-600 transition-colors"
            >
              <ArrowLeft size={16} /> Back to {activeTab === 'CART' ? 'Cart' : 'Transactions'}
            </button>

            <div className="bg-white border-4 border-black rounded-t-[3rem] shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
              <div className="p-10">
                <div className="flex justify-between items-center mb-10">
                  <div className="p-4 bg-black text-white rounded-3xl -rotate-6">
                    <ReceiptText size={32} />
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black uppercase text-slate-400">Order ID</p>
                    <p className="font-black">{viewingReceiptData?.id || "26-100"}</p>
                  </div>
                </div>

                <h2 className="text-4xl font-black uppercase tracking-tighter leading-none mb-8 text-center">
                  {activeTab === 'CART' ? 'Payment Successful' : 'Order Details'}
                </h2>

                <div className="border-y-4 border-dashed border-slate-100 py-8 space-y-4 mb-8">
                  {viewingReceiptData?.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between font-bold uppercase text-sm">
                      <span className="text-slate-500">
                        <span className="text-black font-black mr-2">x{item.quantity}</span>
                        {item.title}
                      </span>
                      <span className="font-black tracking-tighter">₱{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-end mb-10">
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Total Amount</p>
                  </div>
                  <span className="text-5xl font-black tracking-tighter">₱{viewingReceiptData?.total.toLocaleString()}</span>
                </div>

                <div className="grid">
                  <button
                    onClick={() => { setIsReceiptView(false); setViewingReceiptData(null); }}
                    className="py-4 bg-black text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-gray-600 transition-all"
                  >
                    Done
                  </button>
                </div>
              </div>

              <div
                className="h-6 w-full bg-white"
                style={{
                  backgroundImage: `radial-gradient(circle at 10px -5px, transparent 12px, white 13px)`,
                  backgroundSize: '20px 20px',
                  backgroundPosition: '0 bottom',
                  filter: 'drop-shadow(0px -1px 0px black)'
                }}
              />
            </div>

            <p className="text-center mt-8 text-[10px] font-black uppercase text-slate-300 tracking-[0.5em]">
              {activeTab === 'CART' ? 'Thank you for shopping' : 'Transaction Record'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};