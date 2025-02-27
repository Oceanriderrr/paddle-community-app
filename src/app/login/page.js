"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn("credentials", { email, password, callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen beach-bg sunset-glow flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-white mb-6">Login</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white bg-opacity-90 rounded-lg shadow p-6">
        <div className="mb-4">
          <label className="block text-gray-800 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-800 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900"
        >
          Login
        </button>
      </form>
      <a href="/" className="mt-4 text-white hover:underline">Back to Home</a>
    </div>
  );
}