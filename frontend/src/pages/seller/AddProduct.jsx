import React from 'react';
import { Upload, DollarSign, Package, Tag, ArrowLeft, AlignLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AddProduct() {
  return (
    <div className="max-w-6xl mx-auto p-8 lg:p-12 pt-32">
      <div className="flex justify-between items-end mb-10">
        <div>
          <Link to="/seller/dashboard" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-4 hover:text-indigo-600 transition-colors group">
            <ArrowLeft size={14} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Dashboard
          </Link>
          <h1 className="text-6xl font-black tracking-tighter uppercase italic leading-none">List Product</h1>
        </div>
        <p className="hidden md:block text-right text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">
          Marketly / New Listing
        </p>
      </div>

      <div className="bg-white/40 backdrop-blur-xl rounded-[3rem] border-2 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        <form className="flex flex-col lg:flex-row">
          
          <div className="lg:w-5/12 p-10 border-b-2 lg:border-b-0 lg:border-r-2 border-black bg-white/20">
            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest mb-6">
              Product Media
            </label>
            <div className="group relative aspect-square border-4 border-dashed border-black/10 rounded-[2.5rem] flex flex-col items-center justify-center text-center hover:border-indigo-500 hover:bg-white transition-all cursor-pointer overflow-hidden">
              <div className="size-20 bg-black text-white rounded-3xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                <Upload size={32} />
              </div>
              <p className="text-sm font-black uppercase tracking-tight">Upload Main Image</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Drag and drop or click</p>
              
              <div className="absolute bottom-4 right-4 opacity-10 group-hover:opacity-100 transition-opacity">
                 <Package size={40} />
              </div>
            </div>
          </div>

          <div className="lg:w-7/12 p-10 flex flex-col justify-between">
            <div className="space-y-8">
              <div>
                <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest mb-3 ml-2">
                  <Tag size={14} /> Product Name
                </label>
                <input 
                  type="text" 
                  className="w-full p-5 bg-white border-2 border-black rounded-2xl font-black text-lg placeholder:text-slate-300 focus:shadow-[4px_4px_0px_0px_rgba(99,102,241,1)] focus:border-indigo-600 outline-none transition-all" 
                  placeholder="e.g. Vintage 35mm Camera" 
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest mb-3 ml-2">
                    <DollarSign size={14} /> Price
                  </label>
                  <input 
                    type="number" 
                    className="w-full p-5 bg-white border-2 border-black rounded-2xl font-black text-3xl tracking-tighter focus:shadow-[4px_4px_0px_0px_rgba(99,102,241,1)] outline-none transition-all" 
                    placeholder="0.00" 
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest mb-3 ml-2">
                    <Package size={14} /> Stock
                  </label>
                  <input 
                    type="number" 
                    className="w-full p-5 bg-white border-2 border-black rounded-2xl font-black text-3xl tracking-tighter focus:shadow-[4px_4px_0px_0px_rgba(99,102,241,1)] outline-none transition-all" 
                    placeholder="1" 
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest mb-3 ml-2">
                  <AlignLeft size={14} /> Description
                </label>
                <textarea 
                  rows="3"
                  className="w-full p-5 bg-white border-2 border-black rounded-2xl font-bold placeholder:text-slate-300 focus:shadow-[4px_4px_0px_0px_rgba(99,102,241,1)] outline-none transition-all resize-none"
                  placeholder="Tell buyers about your item..."
                ></textarea>
              </div>
            </div>

            <div className="pt-10 flex items-center gap-6">
              <button className="flex-1 py-6 bg-black text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-sm hover:bg-indigo-600 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all">
                Create Listing
              </button>
              <button type="button" className="px-8 py-6 border-2 border-black rounded-[2rem] font-black uppercase tracking-widest text-xs hover:bg-red-50 hover:text-red-500 transition-all">
                Cancel
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}