// pages/api/askClaude.js
import Anthropic from '@anthropic-ai/sdk';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  try {
    // Extract PDF URL from request body
    const { pdfURL } = req.body;

    if (!pdfURL) {
      return res.status(400).json({ error: 'Missing pdfURL in request body' });
    }

    // Fetch the file
    const pdfResponse = await fetch(pdfURL);
    if (!pdfResponse.ok) {
      throw new Error(`Failed to fetch PDF: ${pdfResponse.statusText}`);
    }

    // Convert the file to base64
    const arrayBuffer = await pdfResponse.arrayBuffer();
    const pdfBase64 = Buffer.from(arrayBuffer).toString('base64');

    // Send the API request
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY, // Ensure this is set in .env.local
    });

    const response = await anthropic.messages.create({
      model: 'claude-3-7-sonnet-20250219',
      max_tokens: 1024,
      messages: [
        {
          content: [
            {
              type: 'document',
              source: {
                media_type: 'application/pdf',
                type: 'base64',
                data: pdfBase64,
              },
            },
            {
              type: 'text',
              text: 'Which model has the highest human preference win rates across each use-case?',
            },
          ],
          role: 'user',
        },
      ],
    });

    return res.status(200).json(response);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
