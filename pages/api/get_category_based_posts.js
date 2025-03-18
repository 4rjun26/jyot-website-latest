import connectToDatabase from "@/utils/db";
import Post from "@/models/Post";
import Category from "@/models/Category";
import Topic from "@/models/Topic";

export default async function handler(req, res) {
    const { category_slug = "", page = 1, limit = 3 } = req.query;
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


    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 9;
    const skip = (pageNumber - 1) * limitNumber;
  
    const extraLimit = Number(limitNumber) + 1;
  
        const category = await Category.findOne({
          slug: category_slug, 
          content_type: { $in: ["category"] }
      });
      
    // Find posts matching the category name (case-insensitive)
    const posts = await Post.find({
        category_name: { $in: [new RegExp(category.title, "i")] } // ✅ Works for arrays
      })
      .sort({publish_date:-1})
      .skip(skip) // Pagination
      .limit(extraLimit);
      const hasMore = posts.length > limit; // More posts exist if length > limit

      // Remove the extra post from the response
      if (hasMore) posts.pop();

      const op={
        title:category.title,
        desc:category.desc,
        img:category.img,
        publish_date:category.publish_date,
        podcasts_array:posts,
        hasMore:hasMore
      }




    return res.status(200).json(op);

  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
