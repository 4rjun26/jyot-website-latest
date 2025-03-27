import fs from "fs/promises";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

const inputFilePath = "D:/jyot/jyot-portfolio/public/maynasundari.txt"; // Input text file
const outputFilePath = "D:/jyot/jyot-portfolio/public/context.json"; // Output JSON file

// **Function to Extract and Chunk Episode-wise Context**
async function extractAndChunkEpisodes() {
  try {
    // ✅ Load the text file
    const text = await fs.readFile(inputFilePath, "utf-8");

    // ✅ Flexible Episode Regex
    const episodeRegex = /MAYNA SUNDARI\s*-\s*THE REAL WINNER\s*-\s*(EP\s*\d+)/gi;
    let matches, lastIndex = 0;
    const episodes = [];

    while ((matches = episodeRegex.exec(text)) !== null) {
      if (lastIndex !== 0) {
        // ✅ Capture previous episode's content
        let episodeContent = text.substring(lastIndex, matches.index).trim();
        if (episodes.length > 0) {
          episodes[episodes.length - 1].chunks = await splitIntoChunks(episodeContent);
        }
      }

      // ✅ Store new episode
      episodes.push({ episode: `MAYNA SUNDARI - THE REAL WINNER - ${matches[1]}`, chunks: [] });
      lastIndex = matches.index + matches[0].length;
    }

    // ✅ Capture & Chunk Last Episode's Content
    if (episodes.length > 0) {
      episodes[episodes.length - 1].chunks = await splitIntoChunks(text.substring(lastIndex).trim());
    }

    // ✅ Remove Empty Entries
    const filteredEpisodes = episodes.filter(ep => ep.chunks.length > 0);

    // ✅ Save JSON File
    await fs.writeFile(outputFilePath, JSON.stringify(filteredEpisodes, null, 2), "utf-8");

    return filteredEpisodes;
  } catch (error) {
    console.error("❌ Error processing episodes:", error);
    throw new Error("Failed to process episodes");
  }
}

// **📌 Function to Split Content into Smaller Chunks**
async function splitIntoChunks(text) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000, // Maximum size of a chunk
    chunkOverlap: 200, // Overlap between chunks for better continuity
    separators: ["\n\n", "\n", ".", " "], // Priority-based splitting (paragraphs → sentences → words)
  });

  const chunks = await splitter.createDocuments([text]);
  return chunks.map(chunk => chunk.pageContent.trim()); // Return trimmed chunks
}

// **📌 API Handler**
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Only GET requests allowed" });
  }

  try {
    const episodes = await extractAndChunkEpisodes();
    return res.status(200).json({ message: "Context extracted successfully", episodes });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
