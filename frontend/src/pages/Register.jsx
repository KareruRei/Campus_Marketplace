import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    student_id: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (form.student_id.length !== 11) {
      setError("Student ID must be exactly 11 characters.");
      setLoading(false);
      return;
    }

    if (!form.email.endsWith("@student.apc.edu.ph")) {
      setError("Email must be a valid student email.");
      setLoading(false);
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    try {
      const response = await api.post("/register", form); 

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      navigate("/marketplace");
    } catch (err) {
      const data = err.response?.data;
      if (data?.errors) {
        // Laravel validation errors - show first one
        const firstError = Object.values(data.errors)[0];
        setError(Array.isArray(firstError) ? firstError[0] : firstError);
      } else {
        setError(data?.message || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#f9fafb] px-4 overflow-hidden font-sans">
      <div className="max-w-md w-full max-h-[98vh] flex flex-col justify-center transition-all">
        <div className="bg-white p-7 sm:p-9 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100">

          <header className="mb-5 text-center">
            <h2 className="text-3xl font-black text-gray-900 tracking-tighter">
              Join Marketly Today
            </h2>
            <p className="text-sm text-gray-400 mt-2 font-medium">
              Start trading with your student account.
            </p>
          </header>

          <form className="space-y-3" onSubmit={handleRegister}>
            <div className="grid grid-cols-1 gap-3">

              {/* First Name */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.1em] font-black text-gray-400 mb-1.5 ml-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  required
                  value={form.first_name}
                  onChange={handleChange}
                  placeholder="Juan"
                  className="w-full px-5 py-3 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all text-sm font-medium placeholder:text-gray-300"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.1em] font-black text-gray-400 mb-1.5 ml-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  required
                  value={form.last_name}
                  onChange={handleChange}
                  placeholder="Dela Cruz"
                  className="w-full px-5 py-3 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all text-sm font-medium placeholder:text-gray-300"
                />
              </div>

              {/* Student ID */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.1em] font-black text-gray-400 mb-1.5 ml-1">
                  Student ID Number
                </label>
                <input
                  type="text"
                  name="student_id"
                  required
                  value={form.student_id}
                  onChange={(e) => {
                    if (e.target.value.length <= 11) handleChange(e);
                  }}
                  placeholder="2024-000000"
                  minLength={11}
                  maxLength={11}
                  className="w-full px-5 py-3 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all text-sm font-medium placeholder:text-gray-300"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.1em] font-black text-gray-400 mb-1.5 ml-1">
                  Student Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder="jdc@student.apc.edu.ph"
                  className="w-full px-5 py-3 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all text-sm font-medium placeholder:text-gray-300"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-[11px] uppercase tracking-[0.1em] font-black text-gray-400 mb-1.5 ml-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  value={form.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-5 py-3 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:ring-2 focus:ring-black outline-none transition-all text-sm font-medium placeholder:text-gray-300"
                />
              </div>

            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm font-medium text-center">{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-gray-800 active:scale-[0.98] transition-all shadow-xl shadow-gray-200 mt-4 text-sm tracking-wide disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-gray-50 text-center">
            <p className="text-sm text-gray-400 font-medium">
              Already a member?{" "}
              <Link
                to="/login"
                className="text-black font-bold hover:underline decoration-2 underline-offset-4"
              >
                Log in
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};