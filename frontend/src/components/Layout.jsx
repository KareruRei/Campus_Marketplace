import { Navbar } from './Navbar';
import { useLocation } from 'react-router-dom';

export const Layout = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/30">
      {!isAdmin && <Navbar cartCount={3} messageCount={5} />}

      <main className={`flex-1 ${!isAdmin ? 'mt-24' : ''}`}>
        <div className={`h-full w-full ${!isAdmin ? 'max-w-7xl mx-auto px-4' : ''}`}>
          {children}
        </div>
      </main>
    </div>
  );
};