import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader2, ArrowLeft, ShieldCheck, CheckCircle, XCircle } from "lucide-react";
import api from "../../api/axios";

const AdminReports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchReports(); }, []);

    const fetchReports = async () => {
        try {
            const res = await api.get("/admin/reports");
            setReports(res.data.data || []);
        } catch (err) {
            console.error("Failed to fetch reports:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatus = async (id, status) => {
        try {
            await api.put(`/admin/reports/${id}`, { status });
            fetchReports();
        } catch (err) {
            alert("Failed to update report.");
        }
    };

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-white">
                <Loader2 size={40} className="animate-spin text-black" />
            </div>
        );
    }

    const statusColor = (s) => {
        if (s === "Resolved") return "bg-emerald-50 text-emerald-600";
        if (s === "Dismissed") return "bg-slate-100 text-slate-400";
        return "bg-amber-50 text-amber-600";
    };

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
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">Dispute Reports</h1>
            </header>

            {/* Table */}
            <div className="max-w-6xl mx-auto">
                <div className="bg-white border-2 border-slate-100 rounded-[2rem] overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b-2 border-slate-50">
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">ID</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Reporter</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Reported User</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Listing</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Reason</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {reports.length === 0 ? (
                                    <tr><td colSpan={7} className="px-8 py-12 text-center text-slate-400 font-medium">No reports found.</td></tr>
                                ) : (
                                    reports.map((r) => (
                                        <tr key={r.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                            <td className="px-8 py-5 font-mono text-sm text-slate-500">#{r.id}</td>
                                            <td className="px-8 py-5 font-bold text-slate-900">{r.reporter?.name || "—"}</td>
                                            <td className="px-8 py-5 text-sm text-slate-500">{r.reported_user?.name || "—"}</td>
                                            <td className="px-8 py-5 text-sm text-slate-500">{r.listing?.title || "—"}</td>
                                            <td className="px-8 py-5 text-sm text-slate-600 max-w-[200px] truncate">{r.reason}</td>
                                            <td className="px-8 py-5">
                                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${statusColor(r.status)}`}>
                                                    {r.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5">
                                                {r.status === "Pending" && (
                                                    <div className="flex gap-2">
                                                        <button onClick={() => handleStatus(r.id, "Resolved")} className="inline-flex items-center gap-1.5 px-3 py-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors">
                                                            <CheckCircle size={14} /> Resolve
                                                        </button>
                                                        <button onClick={() => handleStatus(r.id, "Dismissed")} className="inline-flex items-center gap-1.5 px-3 py-2 bg-slate-50 text-slate-400 hover:bg-slate-100 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors">
                                                            <XCircle size={14} /> Dismiss
                                                        </button>
                                                    </div>
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

export default AdminReports;
