// src/pages/Favorites.jsx
import { useState } from 'react';
import { Star, Trash2, Filter } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';

export const Favorites = () => {
  const [favorites, setFavorites] = useState([
    { id: 1, title: "AirPods Pro", price: 120, category: "Tech", image: "https://picsum.photos/300/400" },
    { id: 2, title: "Hydro Flask", price: 25, category: "Lifestyle", image: "https://picsum.photos/301/400" },
    { id: 3, title: "Levi's 501 Jeans", price: 45, category: "Fashion", image: "https://picsum.photos/302/400" },
    { id: 4, title: "Calculus Textbook", price: 30, category: "Books", image: "https://picsum.photos/303/400" },
    { id: 5, title: "Mechanical Keyboard", price: 85, category: "Tech", image: "https://picsum.photos/304/400" },
  ]);

  const [activeFilter, setActiveFilter] = useState("ALL");

  // Get unique categories from the favorites list
  const categories = ["ALL", ...new Set(favorites.map(item => item.category.toUpperCase()))];

  const filteredItems = activeFilter === "ALL" 
    ? favorites 
    : favorites.filter(item => item.category.toUpperCase() === activeFilter);

  const clearAll = () => {
    if (window.confirm("Are you sure you want to clear all favorites?")) {
      setFavorites([]);
    }
  };

  return (
    <div className="min-h-screen p-8 lg:p-12">
      {/* --- HEADER SECTION --- */}
      <header className="mb-12 flex flex-col xl:flex-row xl:items-end justify-between gap-8">
        <div>
          <div className="flex items-center gap-4 mb-2 text-indigo-500">
             <Star size={24} className="fill-current" />
             <p className="text-[10px] font-black uppercase tracking-[0.2em]">Saved for later</p>
          </div>
          <h1 className="text-6xl font-black tracking-tighter uppercase leading-none">
            Favorites
          </h1>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Category Filter Nav */}
          <nav className="flex gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${
                  activeFilter === cat 
                  ? "bg-white shadow-sm text-black" 
                  : "text-gray-400 hover:text-black"
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>

          {/* Clear All Action */}
          <button 
            onClick={clearAll}
            className="flex items-center gap-2 px-6 py-3 border-2 border-black text-black hover:bg-black hover:text-white transition-all rounded-xl font-black uppercase text-[10px] tracking-widest"
          >
            <Trash2 size={14} />
            Clear All
          </button>
        </div>
      </header>

      {/* --- GRID SECTION --- */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
          {filteredItems.map(item => (
            <div key={item.id} className="relative group">
              {/* Individual Remove Trigger */}
              <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                <button 
                  className="bg-black text-white p-3 rounded-xl shadow-2xl hover:bg-red-500 transition-colors"
                  onClick={() => setFavorites(favorites.filter(f => f.id !== item.id))}
                >
                  <Trash2 size={16} />
                </button>
              </div>
              
              <ProductCard {...item} />
            </div>
          ))}
        </div>
      ) : (
        /* --- EMPTY STATE --- */
        <div className="flex flex-col items-center justify-center py-40 border-4 border-dashed border-gray-50 rounded-[60px]">
          <div className="bg-gray-50 p-8 rounded-full mb-6">
            <Filter size={40} className="text-gray-200" />
          </div>
          <p className="text-2xl font-black uppercase text-gray-300 tracking-tighter">
            No items found in {activeFilter}
          </p>
          <button 
            onClick={() => setActiveFilter("ALL")}
            className="mt-4 text-sm font-bold text-indigo-500 underline uppercase tracking-widest"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};