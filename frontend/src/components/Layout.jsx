import { Sidebar } from './Sidebar';

export const Layout = ({ children, isCollapsed, setIsCollapsed }) => {
  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <Sidebar 
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        cartCount={3} // Placeholder for cart item count, replace with actual state when available
        messageCount={5} // Placeholder for message count, replace with actual state when available
        favoritesCount={12} // Placeholder for favorites count, replace with actual state when available
        transactionsCount={6} // Placeholder for transactions count, replace with actual state when available
      />

      <main className="flex-1 ml-24 p-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};