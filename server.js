import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

import process from "process";
dotenv.config();

const PORT = 8000;
const app = express();
app.use(express.json());
app.use(cors());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/", async (req, res) => {
  const text  = req.body.text; // Assuming weather data is sent along with text
  const messages = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: `Today's weather forecast, clothes recommendation and food in Gen Z language: ${text}` },
  ];
  try {
    const completion = await openai.chat.completions.create({
      messages,
      model: "gpt-3.5-turbo",
    });
    console.log(completion.choices[0]);
    res.send(completion.choices[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
