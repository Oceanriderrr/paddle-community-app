import clientPromise from "../../src/lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, bio, phone, email } = req.body;
  console.log("Received profile update:", { name, bio, phone, email });

  const client = await clientPromise;
  const db = client.db("paddleCommunity");

  try {
    const result = await db.collection("users").updateOne(
      { email },
      { $set: { name, bio, phone } }
    );
    if (result.matchedCount === 0) throw new Error("User not found");
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}