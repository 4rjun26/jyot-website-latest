import fs from "fs/promises";

export async function chunkText(filePath, chunkSize = 3000) {
  const text = await fs.readFile(filePath, "utf-8");
  const chunks = [];
  
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.substring(i, i + chunkSize));
  }

  await fs.writeFile("context.json", JSON.stringify(chunks, null, 2), "utf-8");
  console.log("Chunks saved locally.");
  return chunks;
}
