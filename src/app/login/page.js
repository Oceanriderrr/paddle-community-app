"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const searchParams = useSearchParams();
  const [error, setError] = useState("");

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) {
      setError(decodeURIComponent(errorParam));
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", { email, password, callbackUrl: "/" });
    if (result?.error) {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen hawaiian-bg wave-layer vignette flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-bold text-[#F5F5F5] mb-6 border-b-2 border-[#6D4C41] pb-2 tracking-tight">
        Login
      </h1>
      {error && (
        <div className="mb-4 text-red-500 text-lg bg-[#F5F5F5] p-3 rounded-lg shadow-md">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-[#F5F5F5] rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <label className="block text-[#1C2526] text-lg mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-[#6D4C41] rounded-lg text-[#1C2526]"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-[#1C2526] text-lg mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-[#6D4C41] rounded-lg text-[#1C2526]"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-[#40C4FF] text-[#1C2526] rounded-lg shadow-md hover:bg-[#558B2F] hover:text-[#F5F5F5] transition border border-[#6D4C41]"
        >
          Login
        </button>
      </form>
      <a
        href="/"
        className="mt-6 text-[#40C4FF] hover:text-[#558B2F] text-lg transition"
      >
        Back to Home
      </a>
    </div>
  );
}