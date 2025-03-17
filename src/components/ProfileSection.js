"use client";

import { useState, useEffect } from "react";

export default function ProfileSection({ profile: initialProfile, onSave }) {
  const [profile, setProfile] = useState(initialProfile || { name: "", bio: "", phone: "", email: "" });
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("ProfileSection useEffect - initialProfile:", initialProfile);
    if (!initialProfile || !initialProfile.email) {
      console.warn("Invalid initialProfile or missing email:", initialProfile);
      return;
    }
    setProfile(initialProfile); // Sync with parent state changes

    const fetchProfile = async () => {
      try {
        console.log("Fetching profile for email:", initialProfile.email);
        const response = await fetch(`/api/user?email=${initialProfile.email}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched profile data:", data);
        setProfile((prev) => ({ ...prev, ...data }));
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.message);
      }
    };

    fetchProfile();
  }, [initialProfile.email]);

  const handleEdit = () => setEditing(true);
  const handleChange = (e) => setProfile({ ...profile, [e.target.name]: e.target.value });
  const handleSave = async () => {
    try {
      console.log("Saving profile:", profile);
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...profile, email: initialProfile.email }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to save profile: ${errorData.error || response.statusText}`);
      }
      await onSave();
      setEditing(false);
      setError(null);
    } catch (err) {
      console.error("Error saving profile:", err);
      setError(err.message);
    }
  };
  const handleCancel = () => setEditing(false);

  return (
    <div className="mt-6 p-4 bg-[#6D4C41]/50 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl text-[#F5F5F5] mb-4">Profile</h2>
      {editing ? (
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={profile.name || ""}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#F5F5F5] text-[#1C2526]"
            placeholder="Name"
          />
          <input
            type="text"
            name="bio"
            value={profile.bio || ""}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#F5F5F5] text-[#1C2526]"
            placeholder="Bio"
          />
          <input
            type="text"
            name="phone"
            value={profile.phone || ""}
            onChange={handleChange}
            className="w-full p-2 rounded bg-[#F5F5F5] text-[#1C2526]"
            placeholder="Phone"
          />
          <div className="space-x-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#40C4FF] text-[#1C2526] rounded-lg hover:bg-[#6D4C41] hover:text-[#F5F5F5] transition"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-[#6D4C41] text-[#F5F5F5] rounded-lg hover:bg-[#40C4FF] hover:text-[#1C2526] transition"
            >
              Cancel
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-[#F5F5F5]">Name: {profile.name || "Not set"}</p>
          <p className="text-[#F5F5F5]">Bio: {profile.bio || "Not set"}</p>
          <p className="text-[#F5F5F5]">Phone: {profile.phone || "Not set"}</p>
          <button
            onClick={handleEdit}
            className="mt-2 px-4 py-2 bg-[#6D4C41] text-[#F5F5F5] rounded-lg hover:bg-[#40C4FF] hover:text-[#1C2526] transition"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}