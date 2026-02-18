import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CardStack } from '../components/CardStack';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Zap, MapPin, Plus } from 'lucide-react';

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-black font-sans selection:bg-black selection:text-white">
      <main className="relative">

        {/* --- HERO SECTION --- */}
        <section className="h-screen flex flex-col items-center justify-center px-8 text-center max-w-[1400px] mx-auto border-b-2 border-black">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <span className="px-6 py-2 border-2 border-black text-[10px] font-black uppercase tracking-[0.5em]">
              Peer to Peer Only
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[13vw] md:text-[150px] leading-[0.8] font-black tracking-tighter uppercase"
          >
            Buy less. <br />
            <span className="italic" style={{ WebkitTextStroke: '1px black', color: 'transparent' }}>Live more.</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12 flex flex-col items-center gap-4"
          >
            <p className="text-black text-xl font-bold uppercase tracking-tighter max-w-xl">
              A private marketplace for your university.
            </p>
            <div className="h-20 w-[2px] bg-black animate-bounce mt-4"></div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex flex-col md:flex-row items-center gap-4"
          >
            <button
              onClick={() => navigate('/marketplace')}
              className="group border-4 border-black px-12 py-5 font-black uppercase tracking-widest flex items-center gap-3 hover:bg-black hover:text-white transition-all active:scale-95"
            >
              Enter Market <ArrowRight size={20} />
            </button>

            <button
              onClick={() => navigate('/register')}
              className="px-12 py-5 border-2 border-black font-black uppercase tracking-widest hover:italic transition-all"
            >
              Sign Up
            </button>
          </motion.div>
        </section>

        {/* --- BOLD FEATURE SECTION --- */}
        <section className="py-40 border-b-2 border-black">
          <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-24 items-center">
            <div className="border-l-8 border-black pl-12">
              <h2 className="text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-8">
                Verified <br /> Students.
              </h2>
              <p className="text-black text-xl font-medium leading-relaxed mb-10 max-w-md">
                No scammers. No shipping fees. Meet at the library and trade face-to-face.
              </p>
              
              <div className="grid grid-cols-1 gap-8">
                 <div className="flex items-center gap-6 group">
                    <ShieldCheck size={32} />
                    <span className="font-black uppercase tracking-widest text-sm group-hover:underline underline-offset-8">.EDU Email Required</span>
                 </div>
                 <div className="flex items-center gap-6 group">
                    <MapPin size={32} />
                    <span className="font-black uppercase tracking-widest text-sm group-hover:underline underline-offset-8">On-Campus Pickup</span>
                 </div>
              </div>
            </div>

            <div className="border-4 border-black p-8 relative">
                <div className="absolute -top-4 -left-4 bg-white border-2 border-black px-4 py-1 font-black uppercase text-[10px]">
                    Live Feed
                </div>
                <CardStack />
            </div>
          </div>
        </section>

        {/* --- CATEGORY TICKER --- */}
        <section className="py-32 border-b-2 border-black">
          <div className="max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border-2 border-black">
              {['Textbooks', 'Tech', 'Furniture', 'Apparel'].map((cat) => (
                <div
                  key={cat}
                  className="group p-12 border-black border-r-2 last:border-r-0 flex flex-col justify-between hover:bg-black hover:text-white transition-all cursor-pointer h-72"
                >
                  <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                  <span className="text-4xl font-black uppercase tracking-tighter leading-none">{cat}</span>
                  <span className="font-black uppercase text-[10px] tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    Browse Category
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- FINAL CTA --- */}
        <section className="py-60 text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="px-8"
          >
            <h2 className="text-[12vw] font-black tracking-tighter uppercase leading-none mb-12">
              Start <br /> Trading.
            </h2>
            <button
              onClick={() => navigate('/register')}
              className="border-8 border-black px-20 py-10 font-black uppercase tracking-[0.2em] text-2xl hover:bg-black hover:text-white transition-all shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-x-[-15px] translate-y-[-15px] hover:translate-x-0 hover:translate-y-0"
            >
              Get Started
            </button>
          </motion.div>
        </section>

      </main>

      {/* --- MINIMAL FOOTER --- */}
      <footer className="p-12 border-t-2 border-black flex justify-between items-center">
        <span className="font-black uppercase text-xs tracking-widest">© 2026 Marketly</span>
        <div className="flex gap-8 font-black uppercase text-[10px] tracking-widest">
            <a href="#" className="hover:underline italic">Privacy</a>
            <a href="#" className="hover:underline italic">Terms</a>
            <a href="#" className="hover:underline italic">Contact</a>
        </div>
      </footer>
    </div>
  );
};