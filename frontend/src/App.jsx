import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';

// Pages
import { Marketplace } from './pages/Marketplace';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Landing } from './pages/Landing';
import { Cart } from './pages/Cart';
import { Messages } from './pages/Messages';
import { Favorites } from './pages/Favorites';
import { Transactions } from './pages/Transactions';

function App() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <Router>
      <Layout isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}> 
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
