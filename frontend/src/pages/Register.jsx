import { Link } from 'react-router-dom';

export const Register = () => (
  <div className="h-screen w-full flex items-center justify-center bg-[#f9fafb] px-4 overflow-hidden font-sans">
    <div className="max-w-md w-full max-h-[98vh] flex flex-col justify-center transition-all">
      <div className="bg-white p-7 sm:p-9 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100">
        
        <header className="mb-5 text-center">
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter">Join Marketly Today</h2>
          <p className="text-sm text-gray-400 mt-2 font-medium">Start trading with your student account.</p>
        </header>

        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 gap-3">
            <div>
              <label className="block text-[11px] uppercase tracking-[0.1em] font-black text-gray-400 mb-1.5 ml-1">
                Full Name
              </label>
              <input 
                type="text" 
                placeholder="Juan Dela Cruz" 
                className="w-full px-5 py-3 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all text-sm font-medium placeholder:text-gray-300" 
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-[0.1em] font-black text-gray-400 mb-1.5 ml-1">
                Student ID Number
              </label>
              <input 
                type="text" 
                placeholder="2024-000000" 
                className="w-full px-5 py-3 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all text-sm font-medium placeholder:text-gray-300" 
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-[0.1em] font-black text-gray-400 mb-1.5 ml-1">
                Student Email
              </label>
              <input 
                type="email" 
                placeholder="jdc@student.apc.edu.ph" 
                className="w-full px-5 py-3 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all text-sm font-medium placeholder:text-gray-300" 
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-[0.1em] font-black text-gray-400 mb-1.5 ml-1">
                Password
              </label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full px-5 py-3 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all text-sm font-medium placeholder:text-gray-300" 
              />
            </div>
          </div>

          <button className="w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-gray-800 active:scale-[0.98] transition-all shadow-xl shadow-gray-200 mt-4 text-sm tracking-wide">
            Create Account
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-gray-50 text-center">
          <p className="text-sm text-gray-400 font-medium">
            Already a member? <Link to="/login" className="text-black font-bold hover:underline decoration-2 underline-offset-4">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  </div>
);