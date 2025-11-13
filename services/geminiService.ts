import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are a world-class Senior Prompt Engineer and Technical Communicator.
Your goal is to take a rough "Idea" from a user and rewrite it into a clear, polished, professional, and well-structured prompt suitable for advanced AI models (like Gemini, GPT-4, Claude) or for clear developer specifications.

Input Format:
The user will provide a raw string containing a rough concept, question, or task.

Your Task:
1. Analyze the user's intent.
2. Improve clarity, grammar, and flow without altering the core meaning.
3. Expand on missing but logically implied details (e.g., if it's a coding task, specify strict typing or error handling; if it's creative writing, specify tone).
4. Organize the output into a clean structure. Recommended structure:
   - **Role/Persona**: Who is acting?
   - **Context**: Background information.
   - **Task**: The specific action to take.
   - **Constraints/Requirements**: Limitations or specific rules.
   - **Output Format**: How the result should look.

Output Rules:
- Return ONLY the optimized prompt content.
- Do not include conversational filler like "Here is your prompt".
- Use Markdown formatting (bolding keys, bullet points) for readability.
`;

export const optimizePrompt = async (idea: string): Promise<string> => {
  try {
    if (!process.env.API_KEY) {
      throw new Error("API Key is missing. Please check your environment configuration.");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: idea,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7, // Balance between creativity and structure
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response generated from the model.");
    }

    return text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};