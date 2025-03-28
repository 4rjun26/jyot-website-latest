import connectToDatabase from "@/utils/db";
import Post from "@/models/Post";
import Category from "@/models/Category";
import Topic from "@/models/Topic";

export default async function handler(req, res) {
    const { albumName = "", type = "" } = req.query; // ✅ Get page & limit from query params
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
// sambhavjin-stavan-anandghanji-chovisi
let slug = [], posts = [], podcasts = [];

if (type === "song") {
  slug = await Category.find({
    related_content_type: { 
      $nin: ["music"],  // Must NOT contain "music"
    }, 
    title: { $regex: albumName, $options: "i" } 
  })
  .limit(10)
  .select("slug");

  posts = await Category.find({ slug: slug[0]?.slug }).limit(10);

  podcasts = await Post.find({
    category_id: posts[0]?.id,
    link: { $not: /youtube\.com|youtu\.be/ }
  })
  .sort({ publish_date: -1 }) // Sort by publish_date descending
  .map((podcast, index) => ({
    ...podcast.toObject(),
    ep: index + 1,
  }));
} else {
  slug = await Category.find({
    related_content_type: { 
      $in: ["audio"],  // Must contain "audio"
      $nin: ["music"]  // Must NOT contain "music"
    },
    title: { $regex: albumName, $options: "i" }
  })
  .limit(10)
  .select("slug");

  posts = await Category.find({ slug: slug[0]?.slug }).limit(10);

  podcasts = await Post.find({
    category_id: posts[0]?.id,
    link: { $not: /youtube\.com|youtu\.be/ }
  })
  .sort({ publish_date: 1 }); // Sort by publish_date descending
}


    return res.status(200).json(podcasts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
