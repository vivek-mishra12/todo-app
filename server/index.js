// Load environment variables from .env file
require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
// Import the Google GenAI SDK
const { GoogleGenAI } = require('@google/genai');

const app = express();
const PORT = 3000; 

// Middleware Setup
// Allow React frontend (on port 5173) to communicate with this server (on port 3000)
app.use(cors({
    origin: 'http://localhost:5173' 
}));
app.use(express.json());

// Initialize the Gemini AI Client
// It securely reads the API key from the environment variable GEMINI_API_KEY
// We must rename CHATBOT_API_KEY to GEMINI_API_KEY in server/.env for this to work.
const ai = new GoogleGenAI({});

// Secure Chatbot API Endpoint
app.post('/api/chat', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required.' });
    }

    try {
        // Use the official SDK to generate content
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            // The contents structure is specific to the GenAI SDK/API
            contents: [{ role: "user", parts: [{ text: prompt }] }],
        });

        // The response structure for the SDK is different from raw HTTP response
        const botReply = response.text;

        // Send the clean response back to the React frontend
        res.json({ reply: botReply });

    } catch (error) {
        console.error("Error communicating with Gemini API:", error.message);
        // You might see an "API key not found" error here if the .env setup is wrong
        res.status(500).json({ error: 'Failed to get response from AI provider. Check API key and server logs.' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server listening on http://localhost:${PORT}`);
});