import { Sidebar } from './Sidebar';

export const Layout = ({ children, isCollapsed, setIsCollapsed }) => {
  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <main className="flex-1 ml-24 p-8 min-h-screen">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};