"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, use } from "react"; // Import use from react

export default function Dashboard({ params }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const role = use(params).role; // Unwrap params with React.use()

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      console.log("User not authenticated, redirecting to /login");
      router.push("/login");
    } else if (session?.user?.role && session.user.role !== role) {
      console.log("Role mismatch, redirecting to:", `/dashboard/${session.user.role}`);
      router.push(`/dashboard/${session.user.role}`);
    }
  }, [status, session, role, router]);

  const handleLogout = () => {
    console.log("Logging out...");
    signOut({ redirect: false }).then(() => {
      console.log("Logout successful, redirecting to /login");
      router.push("/login");
    });
  };

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return null;

  const displayRole = role || session.user.role;
  if (!displayRole) {
    console.error("No role available for display");
    return <div>Role not found. Please log in again.</div>;
  }

  return (
    <div className="min-h-screen hawaiian-bg wave-layer vignette flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-[#F5F5F5] mb-6 border-b-2 border-[#6D4C41] pb-2 tracking-tight">
        {displayRole.charAt(0).toUpperCase() + displayRole.slice(1)} Dashboard
      </h1>
      <p className="text-[#F5F5F5]">Welcome, {session.user.name}!</p>
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-[#6D4C41] text-[#F5F5F5] rounded-lg shadow-md hover:bg-[#40C4FF] hover:text-[#1C2526] transition border border-[#6D4C41]"
      >
        Logout
      </button>
    </div>
  );
}