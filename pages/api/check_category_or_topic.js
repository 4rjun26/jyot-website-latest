import connectToDatabase from "@/utils/db";
import Category from "@/models/Category";
import Topic from "@/models/Topic";

export default async function handler(req, res) {
    let { slug = "akp-representation" } = req.query;

    if (req.method !== "GET") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try {
        // Connect to MongoDB
        await connectToDatabase();

        // Check if slug exists in Category
        const category = await Category.findOne({ slug });

        if (category) {
            return res.status(200).json({ type: "category"});
        }

        // Check if slug exists in Topic
        const topic = await Topic.findOne({ slug });

        if (topic) {
            return res.status(200).json({ type: "topic"});
        }

        return res.status(404).json({ error: "Slug not found in Category or Topic" });
    } catch (error) {
        console.error("Error fetching data:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


//   if (authorization !== `Bearer ${process.env.API_SECRET_KEY}`) {
//     return res.status(403).json({ error: "Forbidden: Invalid API Key" });
//   }