import React, { useState } from 'react';
import { Star } from 'lucide-react';

export const ProductCard = ({ 
  title, 
  price, 
  category, 
  image, 
  description,
  dateAdded,
  seller
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div 
        onClick={toggleModal}
        className="group cursor-pointer bg-white transition-all duration-300 rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md"
      >
        <div className="relative aspect-[3/4] overflow-hidden bg-[#f9f9f9]">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
          
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-white/90 backdrop-blur-sm py-3 text-center">
            <span className="text-xs font-bold tracking-widest text-black uppercase">Quick View</span>
          </div>  
        </div>

        <div className="p-4 text-left">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
            {category}
          </p>
          <h3 className="text-sm font-medium text-[#222] line-clamp-1 mb-2 group-hover:underline">
            {title}
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-black">${price}</span>
            <span className="text-[10px] text-gray-400 font-semibold uppercase">
              {dateAdded || "Today"}
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
              <img src={image} alt={title} className="w-full object-cover" />
              <img src={image} alt="Gallery" className="w-full object-cover opacity-80" />
            </div>

            <div className="md:w-[45%] p-8 md:p-12 flex flex-col bg-white">
              <nav className="text-[10px] text-gray-400 uppercase tracking-widest mb-4">
                Home / {category} / {title}
              </nav>
              
              <h1 className="text-3xl font-bold text-black mb-1 uppercase tracking-tight">
                {title}
              </h1>

              {/* Meta Info */}
              <div className="flex items-center gap-4 text-[11px] text-gray-400 uppercase tracking-widest mb-6">
                <span>Posted by {seller || "Anonymous"}</span>
                <span>•</span>
                <span>{dateAdded || "Today"}</span>
              </div>

              <p className="text-2xl font-light text-black mb-8">${price}</p>
              
              <div className="border-t border-gray-100 py-6 mb-4">
                <p className="text-[11px] font-bold uppercase tracking-widest mb-3">Description</p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {description || "A modern wardrobe staple. Expertly crafted with premium materials for a tailored fit and maximum comfort. Perfect for any occasion."}
                </p>
              </div>

              <div className="space-y-3 mt-auto">
                <div className="flex-1 border border-black py-4 text-center text-xs font-bold hover:bg-black hover:text-white transition-colors cursor-pointer uppercase tracking-widest">
                  Select Size
                </div>

                <button className="w-full bg-black text-white py-5 text-sm font-bold tracking-[0.2em] hover:bg-zinc-800 transition-all uppercase">
                  Add to Bag
                </button>

                <button className="w-full border border-gray-200 py-4 text-xs font-bold tracking-widest 
                  hover:border-black hover:bg-black hover:text-white transition-all uppercase 
                  text-gray-500 flex items-center justify-center gap-2">
                  <Star size={16} />
                  Add to Favorites
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
