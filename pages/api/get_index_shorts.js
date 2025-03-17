import connectToDatabase from "@/utils/db";
import Post from "@/models/Post";
import Category from "@/models/Category";
import Topic from "@/models/Topic";

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

    // Get count of posts
    const posts = await Post.find({
        category_name: { $in: ["Mahasattvashali"] }
      })
   .sort({ publish_date: -1 })
      .limit(4);
    return res.status(200).json(posts);

  // const posts=await Post.find({category_id:"672def721f63a0c51a915393"})
  // .limit(10);

    // return res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
