import React, { useState, useRef, useEffect } from 'react';
import { 
  Package, 
  CheckCircle, 
  MapPin, 
  PartyPopper, 
  Clock, 
  Navigation, 
  Bell, 
  X 
} from 'lucide-react';

export const Messages = () => {
  const [activeTab, setActiveTab] = useState('SOLD');
  const [activeChat, setActiveChat] = useState(1);
  const [notification, setNotification] = useState(null);
  const messagesEndRef = useRef(null);

  // Status flow with Lucide Icons
  const statusUpdates = {
    SOLD: [
      { label: "Preparing", text: "Seller is preparing your item.", icon: <Clock size={18} />, color: "text-amber-500" },
      { label: "Packed", text: "Item has been packed and is ready.", icon: <Package size={18} />, color: "text-blue-500" },
      { label: "For Pickup", text: "Item is ready at the meeting spot.", icon: <MapPin size={18} />, color: "text-indigo-500" },
      { label: "Completed", text: "Order completed. Thank you!", icon: <PartyPopper size={18} />, color: "text-emerald-500" }
    ],
    BOUGHT: [
      { label: "Status?", text: "Hi! Just checking in on the status.", icon: <Clock size={18} />, color: "text-slate-500" },
      { label: "On My Way", text: "I'm on my way to the meeting spot!", icon: <Navigation size={18} />, color: "text-blue-500" },
      { label: "I'm Here", text: "I'm here at the pickup location.", icon: <MapPin size={18} />, color: "text-indigo-500" }
    ]
  };

  const [messages, setMessages] = useState({
    1: [{ text: "Seller is preparing your item.", sender: "me", name: "You", time: "09:20" }],
    2: [],
    3: [],
  });

  const chatData = {
    SOLD: [
      { id: 1, name: "Jasmin Lowery", item: "Psychology 101" },
      { id: 2, name: "Osman Campos", item: "Desk Chair" }
    ],
    BOUGHT: [
      { id: 3, name: "Jayden Church", item: "MacBook Air" }
    ]
  };

  const sendStatusUpdate = (update) => {
    const newMessage = {
      text: update.text,
      sender: "me",
      name: "You",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => ({ ...prev, [activeChat]: [...(prev[activeChat] || []), newMessage] }));
    
    // Trigger Notification
    setNotification(`Status updated: ${update.label}`);
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeChat]);

  return (
    <div className="relative flex h-[650px] w-full gap-4 p-4 bg-slate-50 font-sans">
      
      {/* --- NOTIFICATION POPUP --- */}
      {notification && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-black text-white px-6 py-3 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
          <Bell size={16} className="text-indigo-400" />
          <span className="text-xs font-black uppercase tracking-widest">{notification}</span>
          <button onClick={() => setNotification(null)}><X size={14} /></button>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-80 bg-white rounded-[32px] flex flex-col border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 pb-2">
          <nav className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-4 border border-gray-200">
            {["SOLD", "BOUGHT"].map(tab => (
              <button 
                key={tab} 
                onClick={() => {setActiveTab(tab); setActiveChat(chatData[tab][0]?.id)}}
                className={`flex-1 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${activeTab === tab ? "bg-white shadow-sm text-black" : "text-gray-400 hover:text-black"}`}
              >
                {tab === 'SOLD' ? 'Sales' : 'Orders'}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="flex-1 overflow-y-auto px-4 space-y-2">
          {chatData[activeTab].map(chat => (
            <div 
              key={chat.id} 
              onClick={() => setActiveChat(chat.id)} 
              className={`p-4 rounded-2xl cursor-pointer transition-all border-2 ${activeChat === chat.id ? "bg-slate-50 border-black" : "border-transparent hover:bg-slate-50"}`}
            >
              <p className="font-black text-sm text-slate-900 uppercase tracking-tighter">{chat.name}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{chat.item}</p>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 bg-white rounded-[32px] flex flex-col border border-slate-100 shadow-sm overflow-hidden relative">
        <header className="p-6 border-b border-slate-50 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-black uppercase tracking-tighter leading-none">
              {chatData[activeTab].find(c => c.id === activeChat)?.name}
            </h2>
            <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mt-1">
              Item: {chatData[activeTab].find(c => c.id === activeChat)?.item}
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full">
             <CheckCircle size={12} className="text-green-500" />
             <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">Verified Deal</span>
          </div>
        </header>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#fcfcff]">
          {(messages[activeChat] || []).map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div className={`px-5 py-3 rounded-2xl text-[13px] font-bold max-w-[80%] shadow-sm border-2 ${
                msg.sender === 'me' 
                  ? 'bg-black border-black text-white rounded-tr-none' 
                  : 'bg-white border-slate-100 text-slate-800 rounded-tl-none'
              }`}>
                {msg.text}
                <div className="flex justify-between items-center mt-2 opacity-50 text-[9px]">
                  <span>{msg.time}</span>
                  {msg.sender === 'me' && <CheckCircle size={10} />}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* --- ACTION HUB (Lucide Icons) --- */}
        <div className="p-6 bg-white border-t-2 border-slate-50">
          <div className="flex items-center justify-between mb-4">
            <span className="h-[1px] bg-slate-100 flex-1"></span>
            <span className="px-4 text-[9px] font-black uppercase text-slate-400 tracking-[0.2em]">Send Status Update</span>
            <span className="h-[1px] bg-slate-100 flex-1"></span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {statusUpdates[activeTab].map((update, idx) => (
              <button
                key={idx}
                onClick={() => sendStatusUpdate(update)}
                className="flex flex-col items-center justify-center p-4 border-2 border-slate-100 rounded-2xl hover:border-black hover:bg-slate-50 transition-all group"
              >
                <div className={`${update.color} mb-2 group-hover:scale-110 transition-transform`}>
                  {update.icon}
                </div>
                <span className="text-[9px] font-black uppercase tracking-tighter text-slate-900 text-center">
                  {update.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};