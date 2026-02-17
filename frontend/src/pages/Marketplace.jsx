import { useState } from 'react';
import { ProductCard } from '../components/ProductCard';

export const Marketplace = () => {
  const products = [
    { id: 1, title: "Psychology 101 Textbook", price: 45, category: "Books", image: "./src/assets/imgs/black.jpg" },
    { id: 2, title: "M1 MacBook Air 2020", price: 650, category: "Tech", image: "./src/assets/imgs/black.jpg" },
    { id: 3, title: "Ergonomic Desk Chair", price: 80, category: "Furniture", image: "./src/assets/imgs/white.jpg" },
    { id: 4, title: "Scientific Calculator", price: 25, category: "Tech", image: "./src/assets/imgs/white.jpg" },
    { id: 5, title: "Dorm Floor Lamp", price: 15, category: "Furniture", image: "./src/assets/imgs/white.jpg" },
    { id: 6, title: "Organic Chemistry Kit", price: 30, category: "Books", image: "./src/assets/imgs/black.jpg" },
  ];

  const categories = ["All", ...new Set(products.map(p => p.category))];
  
  const [activeTab, setActiveTab] = useState("All");

  const filteredProducts = activeTab === "All" 
    ? products 
    : products.filter(product => product.category === activeTab);

  return (
    <div className="p-8 lg:p-12">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <h2 className="text-5xl font-black tracking-tighter uppercase leading-none">
          {activeTab === "All" ? "Latest Drops" : activeTab}
        </h2>

        <nav className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-4 py-2 text-sm font-bold uppercase transition-all rounded-md ${
                activeTab === category 
                ? "bg-white shadow-sm text-black" 
                : "text-gray-500 hover:text-black"
              }`}
            >
              {category}
            </button>
          ))}
        </nav>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center py-20 text-gray-500">No items found in this category.</p>
      )}
    </div>
  );
};