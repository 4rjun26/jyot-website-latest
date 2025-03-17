

import fs from "fs/promises";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    // Load stored context from JSON file
    let contextChunks = JSON.parse(await fs.readFile("D:/jyot/jyot-portfolio/public/maynasundari_context.json", "utf-8"));

    // Keep only the latest chunks that fit within 8K tokens (~16,000 characters)
    let contextText = contextChunks.slice(-5).join("\n"); // Adjust as needed

    // Send context + question to OpenAI
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
       { role: "system", content: "You are an AI assistant that answers questions in detail based on the provided Language text. Detect the language and answer in the detected language itself. Also translate it to english and Append both with 'T2E' between them." },
{ role: "user", content: `Context:\n${contextText}\n\nQuestion: ${question}` }
      ],
    });

    res.status(200).json({ answer: response.choices[0].message.content });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch response" });
  }
}
