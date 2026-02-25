import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Loader2, Users, Package, ShoppingCart,
  DollarSign, LogOut, FileText, Activity,
  Settings, ShieldCheck, ArrowRight
} from "lucide-react";
import api from "../api/axios";
import { PhilippinePeso } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ total_users: 0, total_listings: 0, total_orders: 0, total_sales: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/admin/stats');
      setStats(response.data.data || response.data);
    } catch (err) {
      console.error("Failed to fetch admin stats:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
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
      {/* Header Area */}
      <header className="max-w-6xl mx-auto flex justify-between items-end mb-12">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck size={20} className="text-indigo-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Admin Control</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Overview</h1>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-slate-200 hover:border-red-500 hover:text-red-500 rounded-2xl transition-all font-bold text-xs uppercase tracking-widest shadow-sm"
        >
          <LogOut size={16} /> Logout
        </button>
      </header>

      <div className="max-w-6xl mx-auto space-y-12">

        {/* Statistics Grid */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatTile label="Users" value={stats.total_users} icon={<Users size={20} />} />
            <StatTile label="Listings" value={stats.total_listings} icon={<Package size={20} />} />
            <StatTile label="Orders" value={stats.total_orders} icon={<ShoppingCart size={20} />} />
            <StatTile label="Revenue" value={`₱${parseFloat(stats.total_sales || 0).toLocaleString()}`} icon={<PhilippinePeso size={20} />} highlight />
          </div>
        </section>

        {/* Management Hub (Navigation) */}
        <section>
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6 px-2">Management Hub</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <NavTile
              to="/admin/users"
              title="User Management"
              desc="Verify identities, manage roles, and handle bans."
              icon={<Users size={24} />}
            />
            <NavTile
              to="/admin/listings"
              title="Inventory Control"
              desc="Review, approve, or remove marketplace listings."
              icon={<Package size={24} />}
            />
            <NavTile
              to="/admin/reports"
              title="Dispute Reports"
              desc="Resolve issues reported by buyers and sellers."
              icon={<FileText size={24} />}
            />
            <NavTile
              to="/admin/logs"
              title="System Activity"
              desc="Audit logs and server performance monitoring."
              icon={<Activity size={24} />}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

// --- Sub-components ---

const StatTile = ({ label, value, icon, highlight = false }) => (
  <div className={`p-6 rounded-[2rem] border-2 transition-all hover:scale-[1.02] ${highlight ? 'bg-black text-white border-black shadow-xl shadow-black/10' : 'bg-white border-slate-100 text-slate-900 shadow-sm'}`}>
    <div className={`flex items-center justify-between mb-4 ${highlight ? 'text-indigo-400' : 'text-slate-400'}`}>
      {icon}
      <span className="text-[10px] font-black uppercase tracking-widest opacity-70">{label}</span>
    </div>
    <div className="text-3xl font-black">{value}</div>
  </div>
);

const NavTile = ({ to, title, desc, icon }) => (
  <Link to={to} className="group flex items-center gap-6 p-8 bg-white border-2 border-slate-100 rounded-[2.5rem] hover:border-black transition-all hover:shadow-2xl hover:shadow-slate-200/50">
    <div className="size-14 shrink-0 bg-slate-50 group-hover:bg-black group-hover:text-white rounded-2xl flex items-center justify-center transition-colors">
      {icon}
    </div>
    <div className="flex-1">
      <h4 className="font-black text-lg text-slate-900 uppercase tracking-tight">{title}</h4>
      <p className="text-sm text-slate-500 font-medium leading-relaxed">{desc}</p>
    </div>
    <ArrowRight size={20} className="text-slate-300 group-hover:text-black group-hover:translate-x-1 transition-all" />
  </Link>
);

export default AdminDashboard;