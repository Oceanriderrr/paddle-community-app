"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProfileSection from "@/components/ProfileSection";
import DirectoryButtons from "@/components/DirectoryButtons";
import LogoutButton from "@/components/LogoutButton";

export default function PaddlerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("=== useEffect Start ===");
    console.log("Current status:", status);
    console.log("Session data:", session);

    if (status === "loading") {
      console.log("Status is 'loading' - waiting for session to load...");
      return;
    }

    if (status === "unauthenticated") {
      console.log("Status is 'unauthenticated' - user is not logged in.");
      console.log("Redirecting to /login...");
      router.push("/login");
      return;
    }

    console.log("Status is 'authenticated' - user is logged in.");
    console.log("Session user role:", session?.user?.role);

    if (session?.user?.role !== "paddler") {
      console.log("Role mismatch - redirecting to appropriate dashboard...");
      const redirectUrl = `/dashboard/${session?.user?.role || "paddler"}`;
      console.log("Redirecting to:", redirectUrl);
      router.push(redirectUrl);
      return;
    }

    console.log("No redirect needed - user is a Paddler.");
    console.log("=== useEffect End ===");

    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();
        setEvents(data.events.filter(event => event.paddlers.includes(session.user.email)));
      } catch (err) {
        setError(err.message);
        console.error("Error fetching events:", err);
      }
    };

    if (status === "authenticated" && session.user.email) {
      fetchEvents();
    }
  }, [status, session, router]);

  const refreshProfile = async () => {
    const response = await fetch(`/api/user?email=${session.user.email}`);
    if (!response.ok) throw new Error("Failed to refresh profile");
    const data = await response.json();
    return data;
  };

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return null;

  console.log("Paddler initial profile:", { name: session.user.name || "New User", bio: "", phone: "", email: session.user.email });

  return (
    <div className="min-h-screen hawaiian-bg wave-layer vignette flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-[#F5F5F5] mb-6 border-b-2 border-[#6D4C41] pb-2 tracking-tight">
        Paddler Dashboard
      </h1>
      <p className="text-[#F5F5F5]">Welcome, {session.user.name || "User"}!</p>
      <ProfileSection
        profile={{ name: session.user.name || "New User", bio: "", phone: "", email: session.user.email }}
        onSave={refreshProfile}
      />
      <div className="mt-6 p-4 bg-[#6D4C41]/50 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl text-[#F5F5F5] mb-4">Upcoming Events</h2>
        {events.length > 0 ? (
          events.map((event, index) => (
            <div key={index} className="p-2 bg-[#F5F5F5]/20 rounded mb-2">
              <p className="text-[#F5F5F5]">{event.title} - {new Date(event.date).toLocaleDateString()}</p>
              <p className="text-[#F5F5F5]">{event.location}</p>
            </div>
          ))
        ) : (
          <p className="text-[#F5F5F5]">No events yet.</p>
        )}
        <button
          className="mt-2 px-4 py-2 bg-[#40C4FF] text-[#1C2526] rounded-lg hover:bg-[#6D4C41] hover:text-[#F5F5F5] transition"
        >
          Join New Event
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      <DirectoryButtons />
      <LogoutButton />
    </div>
  );
}