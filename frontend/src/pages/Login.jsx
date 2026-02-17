// src/pages/Login.jsx
import { Link } from 'react-router-dom';

export const Login = () => (
  <div className="h-screen w-full flex items-center justify-center bg-[#f9fafb] px-4 overflow-hidden font-sans">
    <div className="max-w-md w-full max-h-[95vh] flex flex-col justify-center">
      <div className="bg-white p-7 sm:p-9 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 transition-all">
        
        <header className="mb-8 text-center">
          {/* Using tracking-tight and font-black for a high-end editorial look */}
          <h2 className="text-3xl font-black text-gray-900 tracking-tighter">Welcome Back</h2>
          <p className="text-sm text-gray-400 mt-2 font-medium">Log in to manage your listings.</p>
        </header>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* Email Field */}
          <div>
            <label className="block text-[11px] uppercase tracking-[0.1em] font-black text-gray-400 mb-2 ml-1">
              University Email
            </label>
            <input 
              type="email" 
              placeholder="jdc@student.apc.edu.ph" 
              className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm font-medium placeholder:text-gray-300" 
            />
          </div>

          {/* Password Field */}
          <div>
            <div className="flex justify-between items-center mb-2 ml-1">
              <label className="text-[11px] uppercase tracking-[0.1em] font-black text-gray-400">
                Password
              </label>
              <Link to="/forgot-password" size="sm" className="text-[11px] uppercase tracking-wider font-bold text-gray-400 hover:text-black transition-colors">
                Forgot?
              </Link>
            </div>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full px-5 py-3.5 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all text-sm font-medium placeholder:text-gray-300" 
            />
          </div>

          {/* Submit Button - Sleek Black */}
          <button className="w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-gray-800 active:scale-[0.98] transition-all shadow-xl shadow-gray-200 mt-4 text-sm tracking-wide">
            Sign In
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-50 text-center">
          <p className="text-sm text-gray-400 font-medium">
            New here? <Link to="/register" className="text-black font-bold hover:underline decoration-2 underline-offset-4">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  </div>
);