import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';
import { Search } from 'lucide-react';

export const Marketplace = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    setSearchQuery("");
  }, [category]);

  const categories = [
    { name: "All", slug: "all" },
    { name: "Academic Essentials", slug: "academic" },
    { name: "Apparel", slug: "apparel" },
    { name: "Gadgets & Electronics", slug: "gadgets" },
    { name: "Course-Specific Items", slug: "course-items" },
    { name: "Hobbies & Entertainment", slug: "hobbies" },
    { name: "Miscellaneous", slug: "misc" }
  ];

  const products = [
    { id: 1, title: "Psychology 101", price: 45, category: "academic", image: "/src/assets/imgs/black.jpg" },
    { id: 2, title: "M1 MacBook Air", price: 650, category: "gadgets", image: "/src/assets/imgs/black.jpg" },
    { id: 3, title: "Vintage Varsity Jacket", price: 55, category: "apparel", image: "/src/assets/imgs/white.jpg" },
    { id: 4, title: "Organic Chemistry Kit", price: 30, category: "academic", image: "/src/assets/imgs/black.jpg" },
    { id: 5, title: "Lab Goggles", price: 15, category: "course-items", image: "/src/assets/imgs/white.jpg" },
    { id: 6, title: "Yoga Mat", price: 20, category: "hobbies", image: "/src/assets/imgs/black.jpg" },
  ];

  const currentSlug = category || "all";

  const filteredProducts = products.filter(p => {
    const matchesCategory = currentSlug === "all" || p.category === currentSlug;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeCategoryName = categories.find(c => c.slug === currentSlug)?.name || "Marketplace";

  return (
    <div className="flex flex-col lg:flex-row gap-12 px-6 lg:px-12 py-8 max-w-[1600px] mx-auto min-h-screen bg-gray-50/30">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-full lg:w-64 shrink-0">
        <div className="sticky top-32 space-y-8">
          
          {/* SEARCH NOW IN SIDEBAR */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 ml-1">
              Search
            </h3>
            <div className="relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search size={14} className="text-black" />
              </div>
              <input
                type="text"
                placeholder="Find items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border-2 border-black py-3 pl-10 pr-4 text-[11px] font-bold uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-x-1 focus:translate-y-1 outline-none transition-all"
              />
            </div>
          </div>

          {/* CATEGORIES */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 ml-1">
              Categories
            </h3>
            <nav className="flex flex-col gap-2.5">
              {categories.map(cat => {
                const isActive = currentSlug === cat.slug;
                return (
                  <button
                    key={cat.slug}
                    onClick={() => navigate(`/marketplace/${cat.slug === 'all' ? '' : cat.slug}`)}
                    className={`text-left px-4 py-3.5 text-[11px] font-black uppercase tracking-widest transition-all border-2 border-black 
                      ${isActive 
                        ? "bg-black text-white shadow-none translate-x-1 translate-y-1" 
                        : "bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                      }`}
                  >
                    {cat.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 min-w-0">
        <header className="mb-12">
          <h2 className="text-5xl lg:text-7xl font-black tracking-tighter uppercase italic leading-[0.85]">
            {activeCategoryName}
          </h2>
          <div className="h-1.5 w-24 bg-black mt-6"></div>
        </header>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10 pb-20">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 border-4 border-black border-dashed rounded-[40px] bg-white">
            <p className="text-2xl font-black uppercase italic">Nothing found :p</p>
          </div>
        )}
      </main>
    </div>
  );
};