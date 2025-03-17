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
    const boats = await db.collection("boats").find({ owner: email }).toArray();
    res.status(200).json({ boats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}