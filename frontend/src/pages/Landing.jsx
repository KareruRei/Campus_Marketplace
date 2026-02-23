import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CardStack } from '../components/CardStack';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, MapPin, Plus } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true }
};

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-black font-sans selection:bg-black selection:text-white">
      <main className="relative">
        
        {/* --- HERO SECTION --- */}
        <section className="h-screen flex flex-col items-center justify-center px-8 text-center max-w-[1400px] mx-auto border-b-2 border-black">
          <motion.div {...fadeInUp} className="mb-12">
            <span className="px-6 py-2 border-2 border-black text-[10px] font-black uppercase tracking-[0.5em]">Peer to Peer Only</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-[13vw] md:text-[150px] leading-[0.8] font-black tracking-tighter uppercase">
            Buy less. <br />
            <span className="italic outline-text" style={{ WebkitTextStroke: '1px black', color: 'transparent' }}>Live more.</span>
          </motion.h1>

          <motion.div {...fadeInUp} transition={{ delay: 0.4 }} className="mt-12 flex flex-col items-center gap-12">
            <p className="text-xl font-bold uppercase tracking-tighter max-w-xl">A private marketplace for your university.</p>
            
            <div className="flex flex-col md:flex-row gap-4">
              <button onClick={() => navigate('/marketplace')} className="group border-4 border-black px-12 py-5 font-black uppercase tracking-widest flex items-center gap-3 hover:bg-black hover:text-white transition-all active:scale-95">
                Enter Market <ArrowRight size={20} />
              </button>
              <button onClick={() => navigate('/register')} className="px-12 py-5 border-2 border-black font-black uppercase tracking-widest hover:italic transition-all">
                Sign Up
              </button>
            </div>
          </motion.div>
        </section>

        {/* --- FEATURE SECTION --- */}
        <section className="py-40 border-b-2 border-black">
          <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-24 items-center">
            <div className="border-l-8 border-black pl-12">
              <h2 className="text-7xl font-black tracking-tighter uppercase leading-[0.9] mb-8">Verified <br /> Students.</h2>
              <p className="text-xl font-medium leading-relaxed mb-10 max-w-md text-gray-700">No shipping fees. Meet anywhere at your university, face-to-face.</p>
              
              <div className="space-y-8">
                {[ { icon: ShieldCheck, text: "@student.apc.edu.ph Email Required" }, { icon: MapPin, text: "On-Campus Pickup" } ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 group">
                    <item.icon size={32} />
                    <span className="font-black uppercase tracking-widest text-sm group-hover:underline underline-offset-8">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-4 border-black p-8 relative">
                <div className="absolute -top-4 -left-4 bg-white border-2 border-black px-4 py-1 font-black uppercase text-[10px]">Live Feed</div>
                <CardStack />
            </div>
          </div>
        </section>

        {/* --- CATEGORY GRID --- */}
        <section className="py-32 border-b-2 border-black px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 border-2 border-black">
            {['Textbooks', 'Tech', 'Furniture', 'Apparel'].map((cat) => (
              <div key={cat} className="group p-12 border-black border-r-2 last:border-r-0 flex flex-col justify-between hover:bg-black hover:text-white transition-all cursor-pointer h-72">
                <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                <span className="text-4xl font-black uppercase tracking-tighter leading-none">{cat}</span>
                <span className="font-black uppercase text-[10px] tracking-widest opacity-0 group-hover:opacity-100 transition-opacity"></span>
              </div>
            ))}
          </div>
        </section>

        {/* --- FINAL CTA --- */}
        <section className="py-60 text-center px-8">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}>
            <h2 className="text-[12vw] font-black tracking-tighter uppercase leading-none mb-12">Start <br /> Trading.</h2>
            <button onClick={() => navigate('/register')} className="border-8 border-black px-20 py-10 font-black uppercase tracking-[0.2em] text-2xl hover:bg-black hover:text-white transition-all shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] hover:shadow-none -translate-x-4 -translate-y-4 hover:translate-x-0 hover:translate-y-0">
              Get Started
            </button>
          </motion.div>
        </section>
      </main>
    </div>
  );
};