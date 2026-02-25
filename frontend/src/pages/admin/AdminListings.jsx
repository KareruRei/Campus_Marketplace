import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader2, ArrowLeft, ShieldCheck, Trash2, Package } from "lucide-react";
import api from "../../api/axios";

const AdminListings = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchListings(); }, []);

    const fetchListings = async () => {
        try {
            const res = await api.get("/admin/listings");
            setListings(res.data.data || []);
        } catch (err) {
            console.error("Failed to fetch listings:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Delete this listing?")) return;
        try {
            await api.delete(`/admin/listings/${id}`);
            fetchListings();
        } catch (err) {
            alert("Failed to delete listing.");
        }
    };

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-white">
                <Loader2 size={40} className="animate-spin text-black" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fafafa] p-6 md:p-12">
            {/* Header */}
            <header className="max-w-6xl mx-auto mb-12">
                <Link to="/admin" className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-black transition-colors mb-6">
                    <ArrowLeft size={16} /> Back to Overview
                </Link>
                <div className="flex items-center gap-2 mb-2">
                    <ShieldCheck size={20} className="text-indigo-600" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Admin Control</span>
                </div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Inventory Control</h1>
            </header>

            {/* Table */}
            <div className="max-w-6xl mx-auto">
                <div className="bg-white border-2 border-slate-100 rounded-[2rem] overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b-2 border-slate-50">
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Title</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Seller</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Category</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Price</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Stock</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listings.length === 0 ? (
                                    <tr><td colSpan={7} className="px-8 py-12 text-center text-slate-400 font-medium">No listings found.</td></tr>
                                ) : (
                                    listings.map((l) => (
                                        <tr key={l.id} className={`border-b border-slate-50 hover:bg-slate-50/50 transition-colors ${l.is_deleted ? 'opacity-40' : ''}`}>
                                            <td className="px-8 py-5 font-bold text-slate-900">{l.title}</td>
                                            <td className="px-8 py-5 text-sm text-slate-500">{l.seller?.name || "—"}</td>
                                            <td className="px-8 py-5 text-sm text-slate-500">{l.category?.name || "—"}</td>
                                            <td className="px-8 py-5 text-sm font-bold text-slate-700">₱{parseFloat(l.price).toLocaleString()}</td>
                                            <td className="px-8 py-5 text-sm text-slate-500">{l.stock}</td>
                                            <td className="px-8 py-5">
                                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${l.is_deleted ? 'bg-red-50 text-red-500' : l.status === 'available' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                                    {l.is_deleted ? "Deleted" : l.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5">
                                                {!l.is_deleted && (
                                                    <button onClick={() => handleDelete(l.id)} className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-50 text-red-500 hover:bg-red-100 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors">
                                                        <Trash2 size={14} /> Remove
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminListings;
