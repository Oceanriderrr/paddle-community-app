import clientPromise from "../../../src/lib/mongodb"; // Adjusted path from pages/api/boats/add.js to root/src/lib/mongodb.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, capacity, type, lengthOverall, amenities, picture, owner } = req.body;
  if (!name || !capacity || !type || !lengthOverall || !amenities || !owner) {
    return res.status(400).json({ error: "All fields except picture are required" });
  }

  const client = await clientPromise;
  const db = client.db("paddleCommunity");

  try {
    const newBoat = {
      name,
      capacity: parseInt(capacity),
      type,
      lengthOverall,
      amenities,
      owner,
      picture: picture || null,
      createdAt: new Date(),
    };
    await db.collection("boats").insertOne(newBoat);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error adding boat:", error);
    res.status(500).json({ error: error.message });
  }
}