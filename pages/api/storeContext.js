import fs from "fs/promises";
import { OpenAI } from "openai";
import { chunkText } from "./chunker";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).json({ error: "Only GET and POST requests allowed" });
  }

  try {
    const chunks = await chunkText("D:/jyot/jyot-portfolio/public/maynasundari.txt");
    let context = [];

    for (const chunk of chunks) {
      console.log("Processing chunk...");
      const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: "You are an AI assistant that remembers past text and can answer questions based on it." },
          ...context,
          { role: "user", content: chunk }
        ],
      });

      context.push({ role: "assistant", content: response.choices[0].message.content });
    }

    await fs.writeFile("context.json", JSON.stringify(context, null, 2), "utf-8");
    console.log("Context stored.");

    res.status(200).json({ message: "Context saved successfully!" });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to store context" });
  }
}
