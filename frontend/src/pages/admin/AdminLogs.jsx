import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader2, ArrowLeft, ShieldCheck, Activity } from "lucide-react";
import api from "../../api/axios";

const AdminLogs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchLogs(); }, []);

    const fetchLogs = async () => {
        try {
            const res = await api.get("/admin/logs");
            setLogs(res.data.data || []);
        } catch (err) {
            console.error("Failed to fetch logs:", err);
        } finally {
            setLoading(false);
        }
    };

    const actionColor = (a) => {
        if (a?.includes("BAN")) return "bg-red-50 text-red-500";
        if (a?.includes("UNBAN")) return "bg-emerald-50 text-emerald-600";
        if (a?.includes("DELETE")) return "bg-amber-50 text-amber-600";
        return "bg-slate-50 text-slate-500";
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
                <h1 className="text-4xl font-black text-slate-900 tracking-tight">System Activity</h1>
            </header>

            {/* Table */}
            <div className="max-w-6xl mx-auto">
                <div className="bg-white border-2 border-slate-100 rounded-[2rem] overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b-2 border-slate-50">
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Timestamp</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Admin</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Action</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Target</th>
                                    <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-slate-400">Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.length === 0 ? (
                                    <tr><td colSpan={5} className="px-8 py-12 text-center text-slate-400 font-medium">No activity logs found.</td></tr>
                                ) : (
                                    logs.map((log) => (
                                        <tr key={log.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                            <td className="px-8 py-5 text-sm font-mono text-slate-400 whitespace-nowrap">
                                                {new Date(log.created_at).toLocaleString()}
                                            </td>
                                            <td className="px-8 py-5 font-bold text-slate-900">{log.admin?.name || "—"}</td>
                                            <td className="px-8 py-5">
                                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${actionColor(log.action)}`}>
                                                    {log.action}
                                                </span>
                                            </td>
                                            <td className="px-8 py-5 text-sm text-slate-500">
                                                {log.target_type && `${log.target_type} #${log.target_id}`}
                                            </td>
                                            <td className="px-8 py-5 text-sm text-slate-600 max-w-[300px] truncate">{log.details}</td>
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

export default AdminLogs;
