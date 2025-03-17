"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const handleLogout = () => {
    console.log("Logging out...");
    signOut({ redirect: false }).then(() => {
      console.log("Logout successful, redirecting to /login");
      window.location.href = "/login"; // Manual redirect since redirect: false
    });
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-6 px-4 py-2 bg-[#6D4C41] text-[#F5F5F5] rounded-lg shadow-md hover:bg-[#40C4FF] hover:text-[#1C2526] transition border border-[#6D4C41]"
    >
      Logout
    </button>
  );
}