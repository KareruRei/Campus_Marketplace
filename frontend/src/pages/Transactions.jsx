import { useState } from 'react';

export const Transactions = () => {
  const [activeTab, setActiveTab] = useState("SOLD");

  const [transactions, setTransactions] = useState([
    { id: 1, item: "Psychology 101", date: "Feb 18", status: "PREPARING", amount: 45, type: "SOLD", person: "John Doe" },
    { id: 2, item: "MacBook Air", date: "Feb 15", status: "SHIPPED", amount: 650, type: "BOUGHT", person: "Apple Store" },
    { id: 3, item: "Desk Chair", date: "Feb 12", status: "PACKED", amount: 80, type: "SOLD", person: "Jane Smith" },
  ]);

  const statusOptions = ["PREPARING", "PACKED", "FOR PICKUP", "COMPLETED"];

  const handleStatusChange = (id, newStatus) => {
    setTransactions(prev => 
      prev.map(t => t.id === id ? { ...t, status: newStatus } : t)
    );
    console.log(`Updated order ${id} to ${newStatus}`);
    // Here you would typically trigger an API call to notify the buyer
  };

  const filtered = transactions.filter(t => t.type === activeTab);

  return (
    <div className="p-8 lg:p-12 min-h-screen">
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-5xl font-black tracking-tighter uppercase leading-none mb-4">
            {activeTab === "SOLD" ? "Sales Console" : "Purchase History"}
          </h2>
          <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">
            {activeTab === "SOLD" ? "Update your buyers" : "Track your orders"}
          </p>
        </div>

        <nav className="flex gap-2 bg-gray-100 p-1 rounded-lg">
          {["SOLD", "BOUGHT"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 text-sm font-bold uppercase transition-all rounded-md ${
                activeTab === tab ? "bg-white shadow-sm text-black" : "text-gray-500 hover:text-black"
              }`}
            >
              {tab === "SOLD" ? "Selling" : "Buying"}
            </button>
          ))}
        </nav>
      </header>

      {/* The Table */}
      <div className="border-t-4 border-black">
        <div className="grid grid-cols-4 bg-gray-50 p-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
          <span>Product</span>
          <span>{activeTab === "SOLD" ? "Buyer" : "Seller"}</span>
          <span>Status</span>
          <span className="text-right">Price</span>
        </div>

        {filtered.map((tx) => (
          <div key={tx.id} className="grid grid-cols-4 p-6 border-b border-gray-100 items-center hover:bg-gray-50 transition-colors">
            <span className="font-bold text-lg tracking-tight uppercase">{tx.item}</span>
            <span className="text-gray-500 font-medium">{tx.person}</span>
            
            <div>
              {activeTab === "SOLD" ? (
                /* DROPDOWN FOR SELLER */
                <select 
                  value={tx.status}
                  onChange={(e) => handleStatusChange(tx.id, e.target.value)}
                  className="bg-white border-2 border-black px-2 py-1 text-[10px] font-black uppercase outline-none cursor-pointer focus:bg-black focus:text-white transition-colors"
                >
                  {statusOptions.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                /* STATIC BADGE FOR BUYER */
                <span className="px-2 py-1 text-[10px] font-black uppercase border-2 border-black bg-black text-white">
                  {tx.status}
                </span>
              )}
            </div>

            <span className="text-right font-black text-xl">
              {activeTab === "SOLD" ? `+$${tx.amount}` : `$${tx.amount}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};