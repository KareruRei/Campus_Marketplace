import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-lg font-semibold">Total Users</h2>
            <p className="text-3xl font-bold text-blue-600 mt-2">120</p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-lg font-semibold">Active Listings</h2>
            <p className="text-3xl font-bold text-green-600 mt-2">58</p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-lg font-semibold">Reported Items</h2>
            <p className="text-3xl font-bold text-red-600 mt-2">5</p>
          </div>

        </div>

        {/* Recent Activity Section */}
        <div className="mt-10 bg-white shadow-md rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <ul className="space-y-2 text-gray-700">
            <li>User JohnDoe registered</li>
            <li>New listing: Calculus Book</li>
            <li>Listing reported by user Jane</li>
          </ul>
        </div>

      </main>
    </div>
  );
};

export default AdminDashboard;