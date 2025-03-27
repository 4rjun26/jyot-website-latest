import connectToDatabase from "@/utils/db";
import TopicData from "@/models/TopicData";
import Post from "@/models/Post";
import Category from "@/models/Category";
import Topic from "@/models/Topic";

export default async function handler(req, res) {
    let { topic_name = "" } = req.query;
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

        // Fetch records matching topic_name and sort by index in ascending order
        const first_array = await TopicData.find({ topic_name: new RegExp(`^${topic_name}$`, "i") }).sort({ index: 1 });
        let op = [];

        for (const record of first_array) {
            let tempArray = []; // Initialize a new row for op
        
            if (record.html_content && record.html_content !== "null") {
                tempArray.push({ html_content: record.html_content });
            } else {
                let temp = [];
                for (const categoryName of record.category_name) { // Now using category_name
                    const posts = await Post.find({
                        category_name: categoryName,  // Match category_name instead of category_id
                        content_type: record.component_type,
                        topic_name: { $in: [topic_name] } 
                    })
                    .sort({ publish_date: -1 })
                    .limit(record.limit);
                    
                    temp.push(...posts);
                }
                
                // Sort temp by publish_date in descending order and keep only the latest "limit" posts
                temp.sort((a, b) => b.publish_date - a.publish_date);
                temp = temp.slice(0, record.limit);
                tempArray.push({ 
                    posts: temp, 
                    name: record.title || ""  // Add the name key
                });
            }
        
            op.push(tempArray); // Push the row into op
        }
        

        return res.status(200).json(op);
    } catch (error) {
        console.error("Error fetching posts:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


