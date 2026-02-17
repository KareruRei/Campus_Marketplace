import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-md w-full bg-white p-8 rounded-3xl shadow-lg border border-gray-100"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-500 mb-8">Log in to manage your listings.</p>

        <form className="space-y-4">
          <input
            type="email"
            placeholder="University Email"
            className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          />
          <button className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-gray-500">
          New here?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};