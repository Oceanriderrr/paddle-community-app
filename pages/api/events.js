import clientPromise from "../../src/lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const client = await clientPromise;
  const db = client.db("paddleCommunity");

  try {
    const events = await db.collection("events").find({}).toArray();
    res.status(200).json({ events });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}