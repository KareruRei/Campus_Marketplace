import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { PublicRoute } from './components/PublicRoute';
import { AdminRoute } from './components/AdminRoute';

// Pages
import { Marketplace } from './pages/Marketplace';
import SellerDashboard from './pages/seller/Dashboard';
import Inventory from './pages/seller/Inventory';
import AddProduct from './pages/seller/AddProduct';
import { SellerOrders } from './pages/seller/SellerOrders';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Landing } from './pages/Landing';
import { Cart } from './pages/Cart';
import { Messages } from './pages/Messages';
import { Transactions } from './pages/Transactions';
import AdminDashboard from "./pages/AdminDashboard";

function App() {

  return (
    <Router>
      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<Landing />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* ================= PROTECTED ROUTES ================= */}

        {/* Marketplace / Buyer / Seller routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Layout>
                <Routes>
                  {/* Marketplace */}
                  <Route path="marketplace" element={<Marketplace />} />
                  <Route path="marketplace/:category" element={<Marketplace />} />

                  {/* Seller */}
                  <Route path="seller/dashboard" element={<SellerDashboard />} />
                  <Route path="seller/orders" element={<SellerOrders />} />
                  <Route path="seller/inventory" element={<Inventory />} />
                  <Route path="seller/add" element={<AddProduct />} />

                  {/* Buyer */}
                  <Route path="cart" element={<Cart />} />
                  <Route path="messages" element={<Messages />} />
                  <Route path="transactions" element={<Transactions />} />

                  {/* Admin */}
                  <Route
                    path="admin"
                    element={
                      <AdminRoute>
                        <AdminDashboard />
                      </AdminRoute>
                    }
                  />
                </Routes>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;