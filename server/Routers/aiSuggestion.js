import express from 'express'
import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv'
dotenv.config();
const router = express.Router();

router.post("/symptom-check", async (req, res) => {
  try {
    const { symptoms } = req.body;
    const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);
    
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
          contents: `A patient has these symptoms: ${symptoms}.
      
      Suggest:
      1. Most probable disease
      2. Doctor/department
      3. Home remdedies and Recommendation
      
      Return strictly JSON:
      {
        "disease": "",
        "doctor": "",
        "Recommendation":""
      }`
      });
      res.json({ result: response.text });

  } catch (error) {
    console.error("Gemini Error:", error);
    res.status(500).json({ message: "AI Error" });
  }
});

export default router;