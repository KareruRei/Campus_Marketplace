import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import api from "../api/axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ total_users: 0, total_listings: 0, total_orders: 0, total_sales: 0 });
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={48} className="animate-spin text-black" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-blue-700">
          Admin Panel
        </div>

        <nav className="flex-1 p-4 space-y-3">
          <Link to="/admin" className="block hover:bg-blue-700 p-2 rounded">
            Dashboard
          </Link>
          <Link to="/admin/users" className="block hover:bg-blue-700 p-2 rounded">
            Manage Users
          </Link>
          <Link to="/admin/listings" className="block hover:bg-blue-700 p-2 rounded">
            Manage Listings
          </Link>
          <Link to="/admin/reports" className="block hover:bg-blue-700 p-2 rounded">
            Reports
          </Link>
          <Link to="/admin/logs" className="block hover:bg-blue-700 p-2 rounded">
            Logs
          </Link>
        </nav>

        <div className="p-4 border-t border-blue-700">
          <button className="w-full bg-red-500 hover:bg-red-600 p-2 rounded">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-3xl font-bold text-blue-600 mt-2">{stats.total_users}</p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-lg font-semibold">Active Listings</h2>
            <p className="text-3xl font-bold text-green-600 mt-2">{stats.total_listings}</p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-lg font-semibold">Total Orders</h2>
            <p className="text-3xl font-bold text-orange-600 mt-2">{stats.total_orders}</p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-lg font-semibold">Total Sales</h2>
            <p className="text-3xl font-bold text-emerald-600 mt-2">₱{parseFloat(stats.total_sales || 0).toLocaleString()}</p>
          </div>

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;