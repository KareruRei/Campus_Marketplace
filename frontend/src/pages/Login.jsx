// src/pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/login", { email, password });

      // Store token and role
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      navigate("/marketplace");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#f9fafb] px-4 overflow-hidden font-sans">
      {/* ... UI stays the same ... */}
    </div>
  );
};