import connectToDatabase from "@/utils/db";
import Post from "@/models/Post";
import Category from "@/models/Category";
import Topic from "@/models/Topic";

export default async function handler(req, res) {
  const { searchValue = ""} = req.query; // ✅ Get page & limit from query params
  const { authorization } = req.headers;
//   const skip = (page - 1) * limit; 


  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
  if (authorization !== `Bearer ${process.env.API_SECRET_KEY}`) {
    return res.status(403).json({ error: "Forbidden: Invalid API Key" });
  }
  try {
    await connectToDatabase();
    
    const categories = await Category.find(
      { 
        title: { $regex: searchValue, $options: "i" } 
      }
    );
    const topics = await Topic.find(
        { 
          title: { $regex: searchValue, $options: "i" } 
        }
      );
    const podcasts = await Post.find({
        $and: [
          { content_type: "audio" }, // Must contain "audio"
          { content_type: { $ne: "music" } } // Must NOT contain "music"
        ],
        title: { $regex: searchValue, $options: "i" }
    });
    const songs = await Post.find({
        $and: [
            { content_type: "music" },  // Must contain "music"
            { title: { $regex: searchValue, $options: "i" } }, // Match title
            { link: { $not: /youtube\.com|youtu\.be/i } } // Exclude YouTube links
        ]
    });
    const articles = await Post.find(
        { 
            $and: [
                { content_type: "article" },  // Must contain "music"
                { title: { $regex: searchValue, $options: "i" } }, // Match title
            ] 
          }
    );
     const shorts = await Post.find({
        $and: [
            { content_type: "shorts" },  // Must contain "music"
            { title: { $regex: searchValue, $options: "i" } }, // Match title
        ] 
          });
          const videos = await Post.find({
            $and: [
                { content_type: "video" },  // Must contain "music"
                { title: { $regex: searchValue, $options: "i" } }, // Match title
            ] 
              });

      const op = {
        categories,
        topics,
        podcasts,
        songs,
        articles,
        shorts,
        videos
      };

    return res.status(200).json(op);
} catch (error) {
  console.error("Error fetching posts:", error);
  return res.status(500).json({ error: "Internal Server Error" });
}
}