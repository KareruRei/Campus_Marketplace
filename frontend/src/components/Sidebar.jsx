import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, ShoppingBag, LogIn, UserPlus, 
  ShoppingCart, MessageCircle, Star, Receipt
} from 'lucide-react';

import logoImg from '../assets/imgs/logo.png';

export const Sidebar = ({ 
  isCollapsed, 
  setIsCollapsed, 
  cartCount = 0,
  messageCount = 0,
  favoritesCount = 0,
  transactionsCount = 0
}) => {
  const location = useLocation();

  const formatBadge = (n) => n > 99 ? '99+' : n;

  const mainItems = [
    { name: 'Home', path: '/', icon: <Home size={22} /> },
    { name: 'Marketplace', path: '/marketplace', icon: <ShoppingBag size={22} /> },
    { name: 'Messages', path: '/messages', icon: <MessageCircle size={22} />, badge: messageCount },
    { name: 'Favorites', path: '/favorites', icon: <Star size={22} />, badge: favoritesCount },
    { name: 'Cart', path: '/cart', icon: <ShoppingCart size={22} />, badge: cartCount },
    { name: 'Transactions', path: '/transactions', icon: <Receipt size={22} />, badge: transactionsCount },
  ];

  const authItems = [
    { name: 'Login', path: '/login', icon: <LogIn size={22} /> },
    { name: 'Register', path: '/register', icon: <UserPlus size={22} /> },
  ];

  return (
    <aside 
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
      className={`fixed left-0 top-0 h-[calc(100vh-32px)] m-4 z-50 flex flex-col 
        transition-all duration-500 ease-in-out shadow-2xl rounded-3xl overflow-hidden
        bg-white/80 backdrop-blur-xl border border-white/40
        ${isCollapsed ? 'w-20' : 'w-64'}`}
    >
      {/* Brand */}
      <div className="p-5 mb-6 flex items-center">
        <div className={`size-10 shrink-0 flex items-center justify-center rounded-2xl transition-all duration-500 bg-gray shadow-lg shadow-black/10 overflow-hidden ${isCollapsed ? 'rounded-xl' : 'rounded-2xl'}`}>
          <img 
            src={logoImg} 
            alt="Logo" 
            className="w-full h-full object-cover" 
          />
        </div>
        
        <h1 className={`ml-4 text-xl font-black tracking-tighter uppercase italic whitespace-nowrap transition-all duration-500 origin-left
          ${isCollapsed ? 'scale-0 opacity-0 w-0' : 'scale-100 opacity-100 w-auto'}`}>
          Marketly
        </h1>
      </div>

      {/* Main Nav */}
      <div className="flex flex-col flex-1 px-3 space-y-2">
        {mainItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex items-center h-12 rounded-2xl font-bold transition-all duration-300 px-4
                ${isActive 
                  ? 'bg-black text-white shadow-xl shadow-black/10' 
                  : 'text-gray-500 hover:bg-black/5 hover:text-black'}`}
            >
              <div className="shrink-0 relative">
                {item.icon}

                {/* Notification badge */}
                {item.badge > 0 && (
                  <span className="absolute -top-2 -right-2 text-[10px] bg-black text-white rounded-full w-5 h-5 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>

              <span className={`ml-4 whitespace-nowrap transition-all duration-500 origin-left
                ${isCollapsed ? 'scale-0 opacity-0 w-0' : 'scale-100 opacity-100 w-auto'}`}>
                {item.name}
              </span>
            </Link>
          );
        })}

        {/* Auth */}
        <nav className="mt-auto pb-4 space-y-2">
          {authItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center h-12 rounded-2xl font-bold transition-all duration-300 px-4
                  ${isActive 
                    ? 'bg-black text-white shadow-lg shadow-indigo-200' 
                    : 'text-gray-500 hover:bg-black/5 hover:text-black'}`}
              >
                <div className="shrink-0">{item.icon}</div>
                <span className={`ml-4 whitespace-nowrap transition-all duration-500 origin-left
                  ${isCollapsed ? 'scale-0 opacity-0 w-0' : 'scale-100 opacity-100 w-auto'}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Collapse indicator */}
      <div className={`h-1 bg-black/10 rounded-full mx-auto mb-6 transition-all duration-500 ${isCollapsed ? 'w-4' : 'w-10'}`} />
    </aside>
  );
};
