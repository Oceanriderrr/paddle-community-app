"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("paddler");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", { email, password, role, callbackUrl: "/" });
    if (result?.error) {
      // Error handled by /login (no action needed here)
    } else if (result?.ok) {
      // Use redirectUrl from session if available
      const redirectUrl = result.url || "/"; // Fallback to "/" if no redirectUrl
      router.push(redirectUrl);
    }
  };

  return (
    <div className="min-h-screen hawaiian-bg wave-layer vignette flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-bold text-[#F5F5F5] mb-6 border-b-2 border-[#6D4C41] pb-2 tracking-tight">
        Sign Up
      </h1>
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
        <div className="mb-4">
          <label className="block text-[#1C2526] text-lg mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-[#6D4C41] rounded-lg text-[#1C2526]"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-[#1C2526] text-lg mb-2">Account Type</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border border-[#6D4C41] rounded-lg text-[#1C2526]"
          >
            <option value="paddler">Paddler</option>
            <option value="boat">Boat</option>
            <option value="event_organizer">Event Organizer</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-[#558B2F] text-[#F5F5F5] rounded-lg shadow-md hover:bg-[#40C4FF] hover:text-[#1C2526] transition border border-[#6D4C41]"
        >
          Sign Up
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