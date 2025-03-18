import connectToDatabase from "@/utils/db";
import Post from "@/models/Post";
import Category from "@/models/Category";
import Topic from "@/models/Topic";

export default async function handler(req, res) {
  const { podcast_slug = "life-planning-english",episode_no="3"} = req.query; // ✅ Get page & limit from query params
  const { authorization } = req.headers;
//   const skip = (page - 1) * limit; 


  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  // if (authorization !== `Bearer ${process.env.API_SECRET_KEY}`) {
  //   return res.status(403).json({ error: "Forbidden: Invalid API Key" });
  // }
  try {
    // Connect to MongoDB
    await connectToDatabase();
// sambhavjin-stavan-anandghanji-chovisi
  const posts=await Category.find({slug:podcast_slug})
  .limit(10);
  const podcasts=await Post.find({
    category_id:posts[0].id,
    ep:episode_no
}).limit(1);


    return res.status(200).json(podcasts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
