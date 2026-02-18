import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCard } from './ProductCard';

const products = [
  {
    title: "Used Calculus Book",
    price: "15",
    category: "Textbook",
    image: "./src/assets/imgs/white.jpg",
    description: "Good condition, no highlights."
  },
  {
    title: "Mechanical Keyboard",
    price: "40",
    category: "Tech",
    image: "./src/assets/imgs/white.jpg",
    description: "Hot-swappable switches, great for gaming."
  },
  {
    title: "Dorm Chair",
    price: "25",
    category: "Furniture",
    image: "./src/assets/imgs/white.jpg",
    description: "Pickup near library."
  },
  {
    title: "Concert Ticket",
    price: "10",
    category: "Tickets",
    image: "./src/assets/imgs/white.jpg",
    description: "Seat A12, limited availability."
  }
];

export const CardStack = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % products.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[400px] flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 100, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -100, scale: 0.95 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute w-[270px] rounded-2xl overflow-hidden p-4 flex flex-col "
        >
          <ProductCard
            title={products[index].title}
            price={products[index].price}
            category={products[index].category}
            image={products[index].image}
            description={products[index].description}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};