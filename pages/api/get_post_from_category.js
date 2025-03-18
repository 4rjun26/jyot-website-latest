import connectToDatabase from "@/utils/db";
import Post from "@/models/Post";
import Category from "@/models/Category";
import Topic from "@/models/Topic";

export default async function handler(req, res) {
    let { category_slug = "aakhir-kyon-",post_slug="trustees-are-not-shayyatars" } = req.query;
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

    // Find posts matching the category name (case-insensitive)

// const sanitizedTitle = title.replace(/[^a-zA-Z0-9]/g, "\\W*"); 
  const category = await Category.findOne({
          slug: category_slug, 
          content_type: { $in: ["category"] }
      });
      // const sanitizedCategory = category.title.replace(/[^a-zA-Z0-9]/g, "\\W*"); 
const posts = await Post.find({
  // category_name: { $elemMatch: { $regex: new RegExp(sanitizedCategory, "i") } }, 
  category_name: { $in: [new RegExp(category.title, "i")] } ,
  // slug: { $regex: new RegExp(post_slug, "i") } 
  slug: post_slug
});
const related = await Post.find({
  // category_name: { $elemMatch: { $regex: new RegExp(sanitizedCategory, "i") } },
  category_name: { $in: [new RegExp(category.title, "i")] } , 
  // slug: { $not: new RegExp(post_slug, "i") } 
  slug: { $ne: post_slug }
}).limit(5); // Limit to 5 posts
      
      
     const op={
        info:posts[0],
        desc:posts[0].desc,
        related_posts:related
     } 
      // .select("title img slug publish_date category_name"); // Select only required fields

    return res.status(200).json(op);

  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
