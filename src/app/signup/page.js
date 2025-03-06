"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("paddler");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted with:", { email, password, role });
    try {
      const result = await signIn("credentials", {
        email,
        password,
        role,
        redirect: false,
      });
      console.log("SignIn result:", result);
      if (result?.error) {
        console.error("Signup error:", result.error);
        setError(result.error);
      } else if (result?.ok) {
        console.log("Signup successful, redirecting to:", role);
        const redirectPath =
          role === "paddler"
            ? "/dashboard/paddler"
            : role === "boat"
            ? "/dashboard/boat"
            : "/login";
        router.push(redirectPath);
      } else {
        console.error("Unexpected signIn result:", result);
        setError("Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup exception:", err);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen hawaiian-bg wave-layer vignette flex flex-col items-center justify-center p-6">
      <h1 className="text-5xl font-bold text-[#F5F5F5] mb-6 border-b-2 border-[#6D4C41] pb-2 tracking-tight">
        Sign Up
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