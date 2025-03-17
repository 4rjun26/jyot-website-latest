import connectToDatabase from "@/utils/db";
import Post from "@/models/Post";
import Category from "@/models/Category";
import Topic from "@/models/Topic";
import Tweet from "@/models/Tweet";

export default async function handler(req, res) {
  const { page = 1, limit = 12,tags="" } = req.query; // ✅ Get page & limit from query params
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

    let posts=[];
    // Get count of posts
    let tagsArray = tags ? tags.split(",") : [];  

        if(tagsArray.length === 0){

    posts = await Tweet.find(
        { tweet_type: "jyot" }
      )
        .sort({ publish_date: 1 })
        .skip(skip)
        .limit(Number(limit))
        .lean(); // Convert main posts to plain objects
    }
    else{
        posts = await Tweet.find(
            { tweet_type: "jyot",
                tags:{$in: tagsArray}
             }
          )
            .sort({ publish_date: 1 })
            .skip(skip)
            .limit(Number(limit))
            .lean(); 
    }
        

      // Get all reply IDs from posts that have replies
      const replyIds = posts
        .filter(post => post.reply_to != null)
        .map(post => post.reply_to);
      
      // Fetch all replies in **one query** instead of N queries
      const replies = await Tweet.find({ _id: { $in: replyIds } })
        .sort({ publish_date: -1 })
        .lean(); // Convert replies to plain objects
      
      // Map reply IDs to actual reply objects
      const replyMap = replies.reduce((acc, reply) => {
        acc[reply._id] = reply;
        return acc;
      }, {});
      
      // Attach replies to the corresponding posts
      posts = posts.map(post => ({
        ...post,
        reply_post: post.reply_to ? replyMap[post.reply_to] || null : null
      }));
      
      // Update original posts array
      
// console.log(posts);
    return res.status(200).json(posts);

  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
