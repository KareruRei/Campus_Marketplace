import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader2, ArrowLeft, ShieldCheck, Users, Ban, CheckCircle } from "lucide-react";
import api from "../../api/axios";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchUsers(); }, []);

    const fetchUsers = async () => {
        try {
            const res = await api.get("/admin/users");
            setUsers(res.data.data || []);
        } catch (err) {
            console.error("Failed to fetch users:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleBan = async (id) => {
        if (!confirm("Ban this user?")) return;
        try {
            await api.post(`/admin/ban/${id}`);
            fetchUsers();
        } catch (err) {
            alert(err.response?.data?.message || "Failed to ban user.");
        }
    };

    const handleUnban = async (id) => {
        try {
            await api.post(`/admin/unban/${id}`);
            fetchUsers();
        } catch (err) {
            alert("Failed to unban user.");
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
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">User Management</h1>
            </header>

            {/* Table */}
            <div className="max-w-6xl mx-auto">
                <div className="bg-white border-2 border-slate-100 rounded-[2rem] overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b-2 border-slate-50">
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Name</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Email</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Student ID</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Role</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Sales</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length === 0 ? (
                                    <tr><td colSpan={7} className="px-8 py-12 text-center text-slate-400 font-medium">No users found.</td></tr>
                                ) : (
                                    users.map((u) => (
                                        <tr key={u.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                            <td className="px-8 py-5 font-bold text-slate-900">{u.name}</td>
                                            <td className="px-8 py-5 text-sm text-slate-500">{u.email}</td>
                                            <td className="px-8 py-5 text-sm text-slate-500 font-mono">{u.student_id}</td>
                                            <td className="px-8 py-5">
                                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${u.role === 'admin' ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-500'}`}>
                                                    {u.role}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5">
                                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${u.is_banned ? 'bg-red-50 text-red-500' : 'bg-emerald-50 text-emerald-600'}`}>
                                                    {u.is_banned ? "Banned" : "Active"}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-sm font-bold text-slate-700">{u.sales_count}</td>
                                            <td className="px-8 py-5">
                                                {u.role !== "admin" && (
                                                    u.is_banned ? (
                                                        <button onClick={() => handleUnban(u.id)} className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors">
                                                            <CheckCircle size={14} /> Unban
                                                        </button>
                                                    ) : (
                                                        <button onClick={() => handleBan(u.id)} className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-50 text-red-500 hover:bg-red-100 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors">
                                                            <Ban size={14} /> Ban
                                                        </button>
                                                    )
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

export default AdminUsers;
