import connectToDatabase from "@/utils/db";
import Post from "@/models/Post";
import Category from "@/models/Category";
import Topic from "@/models/Topic";

export default async function handler(req, res) {
    const { category_slug = "jyot-music"} = req.query;
    const { authorization } = req.headers;
    //   const skip = (page - 1) * limit; 


  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  if (authorization !== `Bearer ${process.env.API_SECRET_KEY}`) {
    return res.status(403).json({ error: "Forbidden: Invalid API Key" });
  }
  try {
    // Connect to MongoDB
    await connectToDatabase();
  
        const category = await Category.findOne({
          slug: category_slug, 
          content_type: { $in: ["category"] }
      });
      
    // Find posts matching the category name (case-insensitive)
    const posts = await Post.find({
        category_name: { $in: [new RegExp(category.title, "i")] } // ✅ Works for arrays
      });
     
      const contentTypes = [...new Set(posts.map(post => post.content_type))];

    return res.status(200).json(contentTypes);

  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
