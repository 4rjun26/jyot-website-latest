// import fs from "fs/promises";
// import dotenv from "dotenv";
// import { OpenAI } from "openai";
// import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
// import { MemoryVectorStore } from "langchain/vectorstores/memory";
// import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// import { web } from "openai"; // 🌐 Add web search capability

// dotenv.config(); // Load environment variables

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// let retriever;

// // **📌 Initialize Retriever**
// async function initializeRetriever() {
//   try {
//     if (retriever) return; // Prevent multiple initializations
//     console.log("Initializing retriever with text file...");

//     const text = await fs.readFile("D:/jyot/jyot-portfolio/public/maynasundari.txt", "utf-8");

//     const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200 });
//     const docs = await splitter.createDocuments([text]);

//     const embeddings = new OpenAIEmbeddings();
//     const vectorStore = await MemoryVectorStore.fromDocuments(docs, embeddings);

//     retriever = vectorStore.asRetriever({ k: 8 });

//     console.log("Retriever initialized successfully!");
//   } catch (error) {
//     console.error("❌ Error loading document:", error);
//   }
// }

// // **📌 Summarize Context Before Sending to GPT**
// async function summarizeContext(context) {
//   try {
//     const summaryResponse = await openai.chat.completions.create({
//       model: "gpt-4-turbo", // ✅ Faster & Cheaper
//       messages: [
//         { role: "system", content: "Summarize this while keeping key details intact." },
//         { role: "user", content: context },
//       ],
//     });

//     return summaryResponse.choices[0].message.content;
//   } catch (error) {
//     console.error("❌ Summarization failed:", error);
//     return context; // Return original if summarization fails
//   }
// }

// // **📌 Handle API Requests**
// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Only POST requests allowed" });
//   }

//   try {
//     if (!retriever) await initializeRetriever();

//     const { question } = req.body;
//     if (!question) {
//       return res.status(400).json({ error: "Question is required" });
//     }

//     console.log(`🔍 Searching context for: ${question}`);
//     let relevantDocs = await retriever.getRelevantDocuments(question);
//     let retrievedContext = relevantDocs.map(doc => doc.pageContent).join("\n");

//     // **📌 If Context is Insufficient, Do Web Search**
//     if (retrievedContext.length < 500) {
//       console.log("🌐 Insufficient context, performing web search...");
//       const webResult = await web.search(question);
//       retrievedContext += `\nWeb Search Result:\n${webResult}`;
//     }

//     // **📌 Summarize if Context is Too Long**
//     if (retrievedContext.length > 4000) {
//       console.log("🔴 Context too long, summarizing...");
//       retrievedContext = await summarizeContext(retrievedContext);
//     }

//     // **📌 Ask GPT-4 with Retrieved Context**
//     const response = await openai.chat.completions.create({
//       model: "gpt-4",
//       messages: [
//         { role: "system", content: "Detect the language and answer in the same language. Also provide an English translation with 'T2E' between them." },
//         { role: "user", content: `Context:\n${retrievedContext}\n\nQuestion: ${question}` }
//       ],
//     });

//     res.status(200).json({ answer: response.choices[0].message.content });

//   } catch (error) {
//     console.error("❌ Error:", error);
//     res.status(500).json({ error: "Failed to fetch response" });
//   }
// }



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
    let contextChunks = JSON.parse(await fs.readFile("D:/jyot/jyot-portfolio/public/context.json", "utf-8"));

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
