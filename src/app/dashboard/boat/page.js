"use client";

import { useSession } from "next-auth/react";

export default function BoatDashboard() {
  const { data: session } = useSession();

  if (!session) return <div>Loading...</div>;

  return (
    <div className="min-h-screen hawaiian-bg wave-layer vignette flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-[#F5F5F5] mb-6 border-b-2 border-[#6D4C41] pb-2 tracking-tight">
        Boat Dashboard
      </h1>
      <p className="text-xl text-[#F5F5F5] mb-4">Welcome, {session.user.name}!</p>
      <div className="w-full max-w-2xl bg-[#F5F5F5] rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-[#6D4C41] mb-4">Your Boat</h2>
        <p className="text-[#1C2526]">Add manage requests, profile, and availability here.</p>
      </div>
    </div>
  );
}