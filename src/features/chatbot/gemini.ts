import { GoogleGenerativeAI } from "@google/generative-ai";

declare const process: {
    env: {
        GEMINI_API_KEY: string;
    };
};

const API_KEY = process.env.GEMINI_API_KEY ? atob(process.env.GEMINI_API_KEY) : "";

// Initialize even without key to prevent immediate crash, but handle checks later
const genAI = new GoogleGenerativeAI(API_KEY || "dummy_key");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const SYSTEM_PROMPT = `
You are an intelligent, helpful, and friendly assistant for Ngee Ann Polytechnic (NP).
Your purpose is to assist users with questions related to Ngee Ann Polytechnic, its history, courses, campus, and student life.

STRICT RULES:
1. ONLY answer questions related to Ngee Ann Polytechnic or general polite conversation (greetings, etc.).
2. If a user asks about anything else (e.g., coding, general knowledge, dangerous topics, other schools), politely decline and remind them that you are an NP assistant.
3. Keep answers concise and helpful.
4. Use a friendly tone, consistent with the school spirit.
5. If asked about the Scavenger Hunt, you can give vague hints but DO NOT give direct answers or locations.
`;

export interface ChatMessage {
    role: "user" | "model";
    text: string;
}

export async function getGeminiResponse(
    history: ChatMessage[],
    newMessage: string
): Promise<string> {
    if (!API_KEY) {
        return "Config Error: GEMINI_API_KEY is missing. Please add it to your .env file.";
    }

    try {
        // Map internal history to Gemini format
        const performHistory = history.map((msg) => ({
            role: msg.role,
            parts: [{ text: msg.text }],
        }));

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: SYSTEM_PROMPT }],
                },
                {
                    role: "model",
                    parts: [
                        {
                            text: "Understood. I am an NP assistant. How can I help you today?",
                        },
                    ],
                },
                ...performHistory,
            ],
        });

        const result = await chat.sendMessage(newMessage);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Gemini Error:", error);
        return "Sorry, I encountered an error accessing the archive. Please try again.";
    }
}
