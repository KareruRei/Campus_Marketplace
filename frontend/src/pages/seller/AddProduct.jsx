import React, { useState } from 'react';
import { Upload, Package, Tag, ArrowLeft, AlignLeft, Smartphone, Watch, Box, Shirt, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios';

export default function AddProduct() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('electronics');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('1');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const categories = [
    { id: 'electronics', label: 'Tech', icon: <Smartphone size={20} /> },
    { id: 'wearables', label: 'Watch', icon: <Watch size={20} /> },
    { id: 'accessories', label: 'Gear', icon: <Box size={20} /> },
    { id: 'fashion', label: 'Style', icon: <Shirt size={20} /> },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('stock_quantity', stock);
      formData.append('description', description);
      formData.append('category', selectedCategory);
      if (image) {
        formData.append('image', image);
      }

      await api.post('/listings', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      navigate('/seller/inventory');
    } catch (err) {
      console.error("Failed to create listing:", err);
      const msg = err.response?.data?.message || 'Failed to create listing. Please try again.';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 lg:p-12 pt-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <Link to="/seller/dashboard" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-4 hover:text-indigo-600 transition-colors group">
            <ArrowLeft size={14} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter uppercase italic leading-none">List Product</h1>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border-2 border-red-400 rounded-2xl text-red-600 font-bold text-sm">
          {error}
        </div>
      )}

      <div className="bg-white rounded-[3rem] border-4 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row">

          {/* --- MEDIA COLUMN --- */}
          <div className="lg:w-1/2 p-8 lg:p-12 border-b-4 lg:border-b-0 lg:border-r-4 border-black bg-slate-50">
            <label className="text-xs font-black uppercase tracking-widest mb-6 block">Product Media</label>
            <label className="group relative aspect-square bg-white border-4 border-dashed border-black rounded-[2.5rem] flex flex-col items-center justify-center text-center hover:bg-indigo-50 hover:border-indigo-600 transition-all cursor-pointer overflow-hidden">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <>
                  <Upload size={48} strokeWidth={3} className="mb-4" />
                  <p className="text-lg font-black uppercase tracking-tight">Add Photo</p>
                </>
              )}
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
          </div>

          {/* --- DETAILS COLUMN --- */}
          <div className="lg:w-1/2 p-8 lg:p-12 bg-white space-y-8">

            {/* Name */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest mb-4 block text-slate-400">Product Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-5 border-2 border-black rounded-2xl font-black text-lg focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none transition-all"
                placeholder="Item Name..."
                required
              />
            </div>

            {/* --- CIRCULAR CATEGORY BUTTONS --- */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest mb-4 block text-slate-400">Category</label>
              <div className="flex flex-wrap gap-4">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`group flex flex-col items-center gap-2 transition-all`}
                  >
                    <div className={`
                      size-16 rounded-full border-4 border-black flex items-center justify-center transition-all
                      ${selectedCategory === cat.id
                        ? 'bg-black text-white shadow-none scale-95 translate-y-1'
                        : 'bg-white text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'}
                    `}>
                      {cat.icon}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-tighter">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price & Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest mb-3 block text-slate-400">₱ Price</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full p-5 border-2 border-black rounded-2xl font-black text-2xl focus:shadow-[4px_4px_0px_0px_rgba(34,197,94,1)] outline-none transition-all"
                  placeholder="0"
                  required
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase tracking-widest mb-3 block text-slate-400">Qty</label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full p-5 border-2 border-black rounded-2xl font-black text-2xl focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none transition-all"
                  placeholder="1"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest mb-3 block text-slate-400">Description</label>
              <textarea
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-5 border-2 border-black rounded-2xl font-bold focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none transition-all resize-none"
                placeholder="Details..."
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-6 bg-black text-white rounded-2xl font-black uppercase tracking-[0.2em] hover:shadow-[8px_8px_0px_0px_rgba(99,102,241,1)] hover:-translate-y-1 transition-all active:translate-y-0 active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? <Loader2 size={20} className="animate-spin mx-auto" /> : 'Publish Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}