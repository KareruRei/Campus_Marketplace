import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Marketplace } from './pages/Marketplace';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Landing } from './pages/Landing'; 

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
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;