import { Navbar } from './Navbar';

export const Layout = ({ children }) => {
  return (
    /* Removed overflow-hidden from here so the body can scroll by default */
    <div className="min-h-screen flex flex-col bg-gray-50/30">
      <Navbar cartCount={3} messageCount={5} />

      {/* We use 'flex-1' so this area fills the screen.
         We do NOT put overflow-hidden here. 
      */}
      <main className="flex-1 mt-24">
        <div className="h-full w-full max-w-7xl mx-auto px-4">
          {children}
        </div>
      </main>
    </div>
  );
};