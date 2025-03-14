import clientPromise from "../../src/lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const client = await clientPromise;
  const db = client.db("paddleCommunity");

  try {
    const user = await db.collection("users").findOne({ email });
    if (!user) throw new Error("User not found");
    res.status(200).json({ name: user.name, bio: user.bio || "", phone: user.phone || "" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}