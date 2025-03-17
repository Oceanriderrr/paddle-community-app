"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProfileSection from "@/components/ProfileSection";
import DirectoryButtons from "@/components/DirectoryButtons";
import LogoutButton from "@/components/LogoutButton";

export default function BoatDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [boats, setBoats] = useState([]);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newBoat, setNewBoat] = useState({
    name: "",
    capacity: "",
    type: "",
    lengthOverall: "",
    amenities: "",
    picture: null,
  });
  const [picturePreview, setPicturePreview] = useState(null);

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

    if (session?.user?.role !== "boat") {
      console.log("Role mismatch - redirecting to appropriate dashboard...");
      const redirectUrl = `/dashboard/${session?.user?.role || "boat"}`;
      console.log("Redirecting to:", redirectUrl);
      router.push(redirectUrl);
      return;
    }

    console.log("No redirect needed - user is a Boat owner.");
    console.log("=== useEffect End ===");

    const fetchBoats = async () => {
      try {
        const response = await fetch(`/api/boats?email=${session.user.email}`);
        if (!response.ok) throw new Error("Failed to fetch boats");
        const data = await response.json();
        setBoats(data.boats);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching boats:", err);
      }
    };

    if (status === "authenticated" && session.user.email) {
      fetchBoats();
    }
  }, [status, session, router]);

  const refreshProfile = async () => {
    const response = await fetch(`/api/user?email=${session.user.email}`);
    if (!response.ok) throw new Error("Failed to refresh profile");
    const data = await response.json();
    return data;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBoat((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewBoat((prev) => ({ ...prev, picture: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicturePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddBoat = async (e) => {
    e.preventDefault();
    try {
      let pictureBase64 = null;
      if (newBoat.picture) {
        const reader = new FileReader();
        pictureBase64 = await new Promise((resolve) => {
          reader.onloadend = () => resolve(reader.result.split(",")[1]); // Get base64 string without the data URL prefix
          reader.readAsDataURL(newBoat.picture);
        });
      }

      const response = await fetch("/api/boats/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newBoat,
          picture: pictureBase64,
          owner: session.user.email,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add boat");
      }

      const fetchBoats = async () => {
        const response = await fetch(`/api/boats?email=${session.user.email}`);
        const data = await response.json();
        setBoats(data.boats);
      };
      await fetchBoats();
      setShowAddForm(false);
      setNewBoat({ name: "", capacity: "", type: "", lengthOverall: "", amenities: "", picture: null });
      setPicturePreview(null);
      setError(null);
    } catch (err) {
      console.error("Error adding boat:", err);
      setError(err.message);
    }
  };

  if (status === "loading") return <div>Loading...</div>;
  if (!session) return null;

  console.log("Boat initial profile:", { name: session.user.name || "New User", bio: "", phone: "", email: session.user.email });

  return (
    <div className="min-h-screen hawaiian-bg wave-layer vignette flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-[#F5F5F5] mb-6 border-b-2 border-[#6D4C41] pb-2 tracking-tight">
        Boat Dashboard
      </h1>
      <p className="text-[#F5F5F5]">Welcome, {session.user.name || "User"}!</p>
      <ProfileSection
        profile={{ name: session.user.name || "New User", bio: "", phone: "", email: session.user.email }}
        onSave={refreshProfile}
      />
      <div className="mt-6 p-4 bg-[#6D4C41]/50 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl text-[#F5F5F5] mb-4">Your Boats</h2>
        {boats.length > 0 ? (
          boats.map((boat, index) => (
            <div key={index} className="p-2 bg-[#F5F5F5]/20 rounded mb-2">
              <p className="text-[#F5F5F5]">{boat.name} - Capacity: {boat.capacity}</p>
              <p className="text-[#F5F5F5]">Type: {boat.type}</p>
              <p className="text-[#F5F5F5]">Length Overall: {boat.lengthOverall}</p>
              <p className="text-[#F5F5F5]">Amenities: {boat.amenities}</p>
              {boat.picture && (
                <img
                  src={`data:image/jpeg;base64,${boat.picture}`}
                  alt={boat.name}
                  className="mt-2 w-full h-40 object-cover rounded"
                />
              )}
            </div>
          ))
        ) : (
          <p className="text-[#F5F5F5]">No boats yet.</p>
        )}
        <button
          onClick={() => setShowAddForm(true)}
          className="mt-2 px-4 py-2 bg-[#40C4FF] text-[#1C2526] rounded-lg hover:bg-[#6D4C41] hover:text-[#F5F5F5] transition"
        >
          Add New Boat
        </button>
        {showAddForm && (
          <div className="mt-4 p-4 bg-[#6D4C41]/70 rounded-lg">
            <h3 className="text-xl text-[#F5F5F5] mb-2">Add New Boat</h3>
            <form onSubmit={handleAddBoat} className="space-y-4">
              <input
                type="text"
                name="name"
                value={newBoat.name}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-[#F5F5F5] text-[#1C2526]"
                placeholder="Boat Name"
                required
              />
              <input
                type="number"
                name="capacity"
                value={newBoat.capacity}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-[#F5F5F5] text-[#1C2526]"
                placeholder="Capacity"
                required
              />
              <input
                type="text"
                name="type"
                value={newBoat.type}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-[#F5F5F5] text-[#1C2526]"
                placeholder="Type of Boat"
                required
              />
              <input
                type="text"
                name="lengthOverall"
                value={newBoat.lengthOverall}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-[#F5F5F5] text-[#1C2526]"
                placeholder="Length Overall (e.g., 20 ft)"
                required
              />
              <textarea
                name="amenities"
                value={newBoat.amenities}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-[#F5F5F5] text-[#1C2526]"
                placeholder="Amenities (e.g., GPS, Life Jackets)"
                required
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 rounded bg-[#F5F5F5] text-[#1C2526]"
              />
              {picturePreview && (
                <img src={picturePreview} alt="Preview" className="mt-2 w-full h-40 object-cover rounded" />
              )}
              <div className="space-x-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#40C4FF] text-[#1C2526] rounded-lg hover:bg-[#6D4C41] hover:text-[#F5F5F5] transition"
                >
                  Save Boat
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setNewBoat({ name: "", capacity: "", type: "", lengthOverall: "", amenities: "", picture: null });
                    setPicturePreview(null);
                  }}
                  className="px-4 py-2 bg-[#6D4C41] text-[#F5F5F5] rounded-lg hover:bg-[#40C4FF] hover:text-[#1C2526] transition"
                >
                  Cancel
                </button>
              </div>
              {error && <p className="text-red-500">{error}</p>}
            </form>
          </div>
        )}
        {error && !showAddForm && <p className="text-red-500 mt-2">{error}</p>}
      </div>
      <DirectoryButtons />
      <LogoutButton />
    </div>
  );
}