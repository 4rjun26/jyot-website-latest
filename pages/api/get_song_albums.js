import connectToDatabase from "@/utils/db";
import Post from "@/models/Post";
import Category from "@/models/Category";
import Topic from "@/models/Topic";

export default async function handler(req, res) {
  const { page = 1, limit = 12 } = req.query; // ✅ Get page & limit from query params
  const skip = (page - 1) * limit; 
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

    const extraLimit = Number(limit) + 1;
    // Get count of posts
    const posts = await Category.find(
      { 
        related_content_type: { 
          $in: ["music"], 
        } 
      }
    )  // .populate("category_id") // Populate category details
  // .populate("topic_id") // Populate topic details
   .sort({ publish_date: -1 })
      .skip(skip)
      .limit(extraLimit);


      const hasMore = posts.length > limit; // More posts exist if length > limit

      // Remove the extra post from the response
      if (hasMore) posts.pop();

    return res.status(200).json({posts,hasMore});

  // const posts=await Post.find({category_id:"672def721f63a0c51a915393"})
  // .limit(10);

    // return res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
