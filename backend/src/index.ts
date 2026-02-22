import express from "express";
import cors from "cors";
import { rateLimit } from 'express-rate-limit';
import { GoogleGenAI, type GenerateContentResponse } from "@google/genai";
import { type LLMRequestBody } from "@interfaces/types";




// SERVER NECESSITITES 
const PORT = process.env.PORT;
const API_KEY = process.env.GEMINI_API_KEY;
const AI = new GoogleGenAI({ apiKey: API_KEY });
const server = express();
// SERVER NECESSITITES


// MIDDLEWARE
server.use(cors({
    origin: ["http://localhost:5173", "http://192.168.2.88:5173/"],
}));
server.use(express.json());
const limiter = rateLimit({
    windowMs: 30 * 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    ipv6Subnet: 56,
})
server.use(limiter)
// MIDDLEWARE




// LLM HELPER FUNCTION
const SendInputToLLM = async (prompt: string) => { 
    try {
        const response: GenerateContentResponse = await AI.models.generateContent({ 
            model: "gemini-3-flash-preview", 
            config: {
                systemInstruction: "Your name is Wallee, you're fun/playful (but do not overdo the fun/playful) and professional. Be safe, and do not engage with innapropiate (18+) content."
            },
            
            contents: prompt }); 

        return response.text;
    } catch (error: any) {
        const errorMessage: string = error.message;
        return errorMessage;
    };
};
// LLM HELPER FUNCTION

// ROUTE
server.post("/api/v1/chat", async (req, res): Promise<object> => {
    const prompt: LLMRequestBody = req.body;

    if (!prompt?.promptContent) {
        return res.status(404).json({error: "No prompt content provided"})
    }
    
    try {
        const result = await SendInputToLLM(prompt.promptContent.trim());
        return res.send({llmResponse: result});
    } catch (error) {
        return res.status(500).json({error: "Something went wrong"});
    };
});
// ROUTE




server.listen(PORT, () => console.log(`Backend Server: http://localhost:${PORT}/`));