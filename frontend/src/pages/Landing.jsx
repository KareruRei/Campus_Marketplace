import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CardStack } from '../components/CardStack';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 }
};

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screentext-[#111]">
      <main className="relative">

        <section className="h-screen flex flex-col items-center justify-center px-8 text-center max-w-[1400px] mx-auto">
          <span className="text-[10px] tracking-[0.4em] uppercase text-gray-500">
            Campus Marketplace
          </span>

          <h1 className="mt-10 text-[14vw] md:text-[120px] leading-[0.9] font-extralight">
            Buy less.
            <br />
            <span className="italic font-serif">Live more.</span>
          </h1>

          <p className="mt-10 text-gray-500 text-lg max-w-xl">
            A private marketplace for students.  
            No ads. No strangers. No noise.
          </p>

          <div className="mt-16 flex items-center gap-6">
            <button
              onClick={() => navigate('/marketplace')}
              className="border border-gray-300 px-10 py-4 rounded-full hover:bg-gray-100 transition"
            >
              Enter marketplace
            </button>

            <button
              onClick={() => navigate('/register')}
              className="text-gray-500 hover:text-black transition"
            >
              Create account
            </button>
          </div>
        </section>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-40 border-t border-gray-200"
        >
          <div className="max-w-6xl mx-auto px-8 grid md:grid-cols-2 gap-24 items-center">

            <div>
              <h2 className="text-5xl font-light mb-6">
                Everything you need,
                <br /> already on campus.
              </h2>
              <p className="text-gray-500 leading-relaxed">
                Browse listings, chat instantly, and meet in real life.
                No shipping. No scams. No algorithms.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="border border-gray-200 rounded-[40px] p-12 bg-white"
            >
              <CardStack />
            </motion.div>

          </div>
        </motion.section>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-40 border-t border-gray-200"
        >
          <div className="max-w-4xl mx-auto px-8 space-y-24 text-center">

            {[
              ["Verified students only", "Every account requires a real university email."],
              ["Zero platform fees", "You keep what you earn. Always."],
              ["Meet where you already are", "Libraries. Dorms. Student centers."]
            ].map(([title, text]) => (
              <div key={title}>
                <h3 className="text-3xl font-light mb-4">
                  {title}
                </h3>
                <p className="text-gray-500">
                  {text}
                </p>
              </div>
            ))}

          </div>
        </motion.section>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-40 border-t border-gray-200"
        >
          <div className="max-w-6xl mx-auto px-8">

            <h2 className="text-5xl font-extralight mb-20">
              Popular categories
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
              {['Textbooks', 'Tech', 'Furniture', 'Tickets'].map(cat => (
                <div
                  key={cat}
                  className="group border border-gray-200 rounded-3xl p-10 h-64 flex flex-col justify-between hover:border-gray-400 transition"
                >
                  <span className="text-2xl font-light">{cat}</span>
                  <span className="text-gray-400 group-hover:text-black transition">
                    Browse →
                  </span>
                </div>
              ))}
            </div>

          </div>
        </motion.section>

        <motion.section
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-48 border-t border-gray-200 text-center"
        >
          <h2 className="text-6xl md:text-7xl font-extralight mb-12">
            Start with what you already own.
          </h2>

          <button
            onClick={() => navigate('/register')}
            className="border border-gray-300 px-16 py-5 rounded-full hover:bg-gray-100 transition text-lg"
          >
            Get started
          </button>
        </motion.section>

      </main>
    </div>
  );
};