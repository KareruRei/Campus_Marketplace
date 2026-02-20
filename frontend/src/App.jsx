import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';

// Pages
import { Marketplace } from './pages/Marketplace';
import SellerDashboard from './pages/seller/Dashboard';
import Inventory from './pages/seller/Inventory';
import AddProduct from './pages/seller/AddProduct';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Landing } from './pages/Landing';
import { Cart } from './pages/Cart';
import { Messages } from './pages/Messages';
import { Transactions } from './pages/Transactions';

// A small helper component to determine if the layout should be fixed-height
const AppContent = ({ isCollapsed, setIsCollapsed }) => {
  const location = useLocation();
  
  const isMessagesPage = location.pathname === '/messages';

  return (
    <Layout 
      isCollapsed={isCollapsed} 
      setIsCollapsed={setIsCollapsed} 
      fixedHeight={isMessagesPage}
    > 
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
        <Route path="/seller/inventory" element={<Inventory />} />
        <Route path="/seller/add" element={<AddProduct />} />
        <Route path="/marketplace/:category" element={<Marketplace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/transactions" element={<Transactions />} />
      </Routes>
    </Layout>
  );
};

function App() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <Router>
      <AppContent isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
    </Router>
  );
}

export default App;