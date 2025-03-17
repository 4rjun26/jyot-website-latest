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
    const podcasts = await Category.find({
        related_content_type: { $in: ["audio", "music"] }
      })
        .sort({ publish_date: -1 })
        .limit(2)
        .lean(); // Convert Mongoose documents to plain JavaScript objects
      
      // Add le_type to each podcast
      const updatedPodcasts = podcasts.map(podcast => ({ ...podcast, le_type: "podcast" }));


         const events = await Post.find({
              category_name: { $in: [new RegExp("events", "i")] } // ✅ Works for arrays
            })
            .sort({ publish_date: -1 })
            .limit(2)
            .lean();
    
        const updatedEvents = events.map(event => ({ ...event, le_type: "event" }));      
            
            let op=[];
            op.push(updatedPodcasts[0]);op.push(updatedPodcasts[1]);
            op.push(updatedEvents[0]);op.push(updatedEvents[1]);
            

    return res.status(200).json(op);

  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
