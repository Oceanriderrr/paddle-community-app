"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";

export default function Dashboard({ params }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { role } = React.use(params);

  const [profile, setProfile] = useState({
    name: session?.user?.name || "New User",
    bio: "",
    phone: "",
    editing: false,
  });
  const [error, setError] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    console.log("=== useEffect Start ===");
    console.log("Current status:", status);
    console.log("Session data:", session);
    console.log("URL role (from params):", role);

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

    if (!session?.user?.role) {
      console.log("Error: session.user.role is undefined or missing!");
      console.log("Redirecting to /login due to missing role...");
      router.push("/login");
      return;
    }

    if (session.user.role !== role) {
      console.log(
        "Role mismatch detected! URL role:",
        role,
        "does not match session role:",
        session.user.role
      );
      const redirectUrl = `/dashboard/${session.user.role}`;
      console.log("Redirecting to:", redirectUrl);
      router.push(redirectUrl);
      return;
    }

    console.log("No redirect needed - roles match and user is authenticated.");
    console.log("=== useEffect End ===");

    // Fetch profile and events
    const fetchProfile = async () => {
      try {
        const response = await fetch(`/api/user?email=${session.user.email}`);
        if (!response.ok) throw new Error("Failed to fetch profile");
        const data = await response.json();
        setProfile((prev) => ({ ...prev, ...data }));
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();
        setEvents(data.events.filter(event => event.paddlers.includes(session.user.email)));
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };

    if (status === "authenticated" && session.user.email) {
      fetchProfile();
      fetchEvents();
    }
  }, [status, session, role, router]);

  const handleLogout = () => {
    console.log("Logging out...");
    signOut({ redirect: false }).then(() => {
      console.log("Logout successful, redirecting to /login");
      router.push("/login");
    });
  };

  const handleProfileEdit = () => {
    setProfile((prev) => ({ ...prev, editing: !prev.editing }));
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSave = async () => {
    try {
      console.log("Attempting to save profile:", profile, "with email:", session.user.email);
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...profile, email: session.user.email }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to update profile: ${errorData.error || response.statusText}`);
      }
      const data = await response.json();
      console.log("Profile save response:", data);
      setProfile((prev) => ({ ...prev, editing: false }));
      setError(null);
      // Re-fetch profile and events after save
      const fetchProfile = async () => {
        const response = await fetch(`/api/user?email=${session.user.email}`);
        const data = await response.json();
        setProfile((prev) => ({ ...prev, ...data }));
      };
      fetchProfile();
    } catch (err) {
      setError(`Error updating profile: ${err.message}`);
      console.error("Profile save error:", err);
    }
  };

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return null;

  // Debug logs for rendering phase
  console.log("Rendering dashboard - Params role:", role);
  console.log("Rendering dashboard - Session role:", session?.user?.role);
  console.log("Rendering dashboard - Session name:", session?.user?.name);

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
      <p className="text-[#F5F5F5]">Welcome, {session.user.name || "User"}!</p>

      {/* Profile Section */}
      <div className="mt-6 p-4 bg-[#6D4C41]/50 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl text-[#F5F5F5] mb-4">Profile</h2>
        {profile.editing ? (
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              className="w-full p-2 rounded bg-[#F5F5F5] text-[#1C2526]"
              placeholder="Name"
            />
            <input
              type="text"
              name="bio"
              value={profile.bio}
              onChange={handleProfileChange}
              className="w-full p-2 rounded bg-[#F5F5F5] text-[#1C2526]"
              placeholder="Bio"
            />
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleProfileChange}
              className="w-full p-2 rounded bg-[#F5F5F5] text-[#1C2526]"
              placeholder="Phone"
            />
            <div className="space-x-2">
              <button
                onClick={handleProfileSave}
                className="px-4 py-2 bg-[#40C4FF] text-[#1C2526] rounded-lg hover:bg-[#6D4C41] hover:text-[#F5F5F5] transition"
              >
                Save
              </button>
              <button
                onClick={handleProfileEdit}
                className="px-4 py-2 bg-[#6D4C41] text-[#F5F5F5] rounded-lg hover:bg-[#40C4FF] hover:text-[#1C2526] transition"
              >
                Cancel
              </button>
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-[#F5F5F5]">Name: {profile.name}</p>
            <p className="text-[#F5F5F5]">Bio: {profile.bio || "Not set"}</p>
            <p className="text-[#F5F5F5]">Phone: {profile.phone || "Not set"}</p>
            <button
              onClick={handleProfileEdit}
              className="mt-2 px-4 py-2 bg-[#6D4C41] text-[#F5F5F5] rounded-lg hover:bg-[#40C4FF] hover:text-[#1C2526] transition"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>

      {/* Events Section */}
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
      </div>

      {/* Directory Buttons */}
      <div className="mt-6 space-x-4">
        <button
          className="px-4 py-2 bg-[#6D4C41] text-[#F5F5F5] rounded-lg hover:bg-[#40C4FF] hover:text-[#1C2526] transition"
        >
          Find Paddlers
        </button>
        <button
          className="px-4 py-2 bg-[#6D4C41] text-[#F5F5F5] rounded-lg hover:bg-[#40C4FF] hover:text-[#1C2526] transition"
        >
          Find Escort Boats
        </button>
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 px-4 py-2 bg-[#6D4C41] text-[#F5F5F5] rounded-lg shadow-md hover:bg-[#40C4FF] hover:text-[#1C2526] transition border border-[#6D4C41]"
      >
        Logout
      </button>
    </div>
  );
}