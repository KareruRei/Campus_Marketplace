import React, { useState } from 'react';
import { ShoppingCart, Loader2, Check } from 'lucide-react';
import api from '../api/axios';

export const ProductCard = ({
  id,
  title,
  price,
  category,
  image,
  image_url,
  description,
  dateAdded,
  created_at,
  seller,
  condition,
  stock
}) => {
  // Handle object vs string fields from API
  const categoryName = typeof category === 'object' ? category?.name : category;
  const sellerName = typeof seller === 'object' ? seller?.name : seller;
  const productImage = image || image_url;
  const displayDate = dateAdded || (created_at ? new Date(created_at).toLocaleDateString() : 'Today');

  const [isOpen, setIsOpen] = useState(false);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [cartError, setCartError] = useState(null);

  const toggleModal = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
    setCartError(null);
    setAdded(false);
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    setAdding(true);
    setCartError(null);
    try {
      await api.post('/cart', { listing_id: id, quantity: 1 });
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to add to cart.';
      setCartError(msg);
    } finally {
      setAdding(false);
    }
  };

  return (
    <>
      <div
        onClick={toggleModal}
        className="group cursor-pointer bg-white transition-all duration-300 rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-[#f9f9f9]">
          <img
            src={productImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/90 backdrop-blur-sm py-3 text-center">
            <span className="text-xs font-bold tracking-widest text-black uppercase">Quick View</span>
          </div>
        </div>

        <div className="p-4 text-left">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
            {categoryName}
          </p>
          <h3 className="text-sm font-medium text-[#222] line-clamp-1 mb-2 group-hover:underline">
            {title}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-black">₱{parseFloat(price).toLocaleString()}</span>
            <span className="text-[10px] text-gray-400 font-semibold uppercase">
              {condition || displayDate}
            </span>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          onClick={toggleModal}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-black/60 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-5xl h-full max-h-[90vh] overflow-y-auto md:overflow-hidden flex flex-col md:flex-row relative shadow-2xl rounded-3xl"
          >
            <button
              onClick={toggleModal}
              className="absolute top-6 right-6 z-10 text-black hover:rotate-90 transition-transform duration-300 bg-white/60 backdrop-blur-md rounded-full p-1"
            >
              ✕
            </button>

            <div className="md:w-[55%] bg-[#f4f4f4] overflow-y-auto scrollbar-hide">
              <img src={productImage} alt={title} className="w-full object-cover" />
            </div>

            <div className="md:w-[45%] p-8 md:p-12 flex flex-col bg-white">
              <nav className="text-[10px] text-gray-400 uppercase tracking-widest mb-4">
                Home / {categoryName} / {title}
              </nav>

              <h1 className="text-3xl font-bold text-black mb-1 uppercase tracking-tight">
                {title}
              </h1>

              {/* Meta Info */}
              <div className="flex items-center gap-4 text-[11px] text-gray-400 uppercase tracking-widest mb-6">
                <span>Posted by {sellerName || "Anonymous"}</span>
                <span>•</span>
                <span>{displayDate}</span>
              </div>

              <p className="text-2xl font-light text-black mb-2">₱{parseFloat(price).toLocaleString()}</p>

              {condition && (
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-6">
                  Condition: {condition}
                </span>
              )}

              <div className="border-t border-gray-100 py-6 mb-4">
                <p className="text-[11px] font-bold uppercase tracking-widest mb-3">Description</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {description || "No description provided."}
                </p>
              </div>

              {stock > 0 && (
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-4">
                  {stock} in stock
                </p>
              )}

              {cartError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs font-bold">
                  {cartError}
                </div>
              )}

              <div className="mt-auto">
                <button
                  onClick={handleAddToCart}
                  disabled={adding || added}
                  className={`w-full py-5 rounded-xl text-sm font-bold tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-3
                    ${added
                      ? 'bg-green-500 text-white'
                      : 'bg-black text-white hover:bg-zinc-800 active:scale-[0.98]'}
                    disabled:cursor-not-allowed`}
                >
                  {adding ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : added ? (
                    <>
                      <Check size={20} strokeWidth={3} />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={20} />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
