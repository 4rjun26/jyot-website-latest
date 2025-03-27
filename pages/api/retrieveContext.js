import fs from "fs/promises";
import path from "path";
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

const contextFilePath = "D:/jyot/jyot-portfolio/public/context.json"; // Context file path

// Load the context JSON file
async function loadContext() {
  try {
    const data = await fs.readFile(contextFilePath, "utf-8");
    return JSON.parse(data); // Convert JSON to array
  } catch (error) {
    throw new Error("Failed to read context.json: " + error.message);
  }
}

// Store context in vector database
async function storeContextInVectorDB(chunks) {
  const embeddings = new OpenAIEmbeddings();
  const vectorStore = await MemoryVectorStore.fromTexts(chunks, chunks.map((_, i) => ({ id: i })), embeddings);
  return vectorStore;
}

// Retrieve relevant context based on a question
async function retrieveContext(vectorStore, query) {
  const retriever = vectorStore.asRetriever();
  const relevantDocs = await retriever.getRelevantDocuments(query);
  return relevantDocs.map(doc => doc.pageContent).join("\n");
}

// API Handler
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const contextChunks = await loadContext();
    const vectorStore = await storeContextInVectorDB(contextChunks);
    const relevantContext = await retrieveContext(vectorStore, question);

    return res.status(200).json({ context: relevantContext });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
