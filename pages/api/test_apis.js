import connectToDatabase from "@/utils/db";
import Post from "@/models/Post";
import Category from "@/models/Category";
import Topic from "@/models/Topic";
const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins (or set specific domain)
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  return await fn(req, res);
};

async function handler(req, res) {
  const { slug = ""} = req.query; // ✅ Get page & limit from query params
//   const skip = (page - 1) * limit; 


  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    // Connect to MongoDB
    await connectToDatabase();

    const slug = await Category.find({
            related_content_type: { $in: ["audio", "music"] },
            title: { $regex: "Ajitjin Stavan Anandghanji Chovisi", $options: "i" } // Case-insensitive exact match
          })
          .limit(10)
          .select("slug");  
          // console.log(slug.slug);

  const posts=await Category.find({slug:slug[0].slug})
  .limit(10);
  const podcasts = await Post.find({ category_id: posts[0].id }).sort({
    ep: 1 * 1, // Convert ep to number before sorting
  });
 const op={
    title:posts[0].title,
    desc:posts[0].desc,
    img:posts[0].img,
    publish_date:posts[0].publish_date,
    podcasts_array:podcasts
  }

    return res.status(200).json(podcasts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

export default allowCors(handler);