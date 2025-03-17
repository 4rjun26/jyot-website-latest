import connectToDatabase from "@/utils/db";
import Post from "@/models/Post";
import Category from "@/models/Category";
import Topic from "@/models/Topic";
import Tweet from "@/models/Tweet";

export default async function handler(req, res) {
  const { authorization } = req.headers;


  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  if (authorization !== `Bearer ${process.env.API_SECRET_KEY}`) {
    return res.status(403).json({ error: "Forbidden: Invalid API Key" });
  }
  try {
    // Connect to MongoDB
    await connectToDatabase();

    const uniqueTags = await Tweet.aggregate([
        { $unwind: "$tags" },  // Flatten the tags array
        { $group: { _id: null, uniqueTags: { $addToSet: "$tags" } } }, // Collect unique tags
        { $project: { _id: 0, uniqueTags: 1 } } // Remove _id from result
      ]);
      
    //   console.log(uniqueTags[0]?.uniqueTags || []);
      
      // Update original posts array
      
// console.log(posts);
    return res.status(200).json(uniqueTags[0].uniqueTags.sort());

  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
