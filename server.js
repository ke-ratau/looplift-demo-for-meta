import express from "express";console.log("Server file is starting...");
import fetch from "node-fetch";
import cors from "cors";

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ THIS LINE SERVES YOUR HTML
app.use(express.static("."));

// 🔐 Replace these with your real values
const TOKEN = "EAFyeW3PMqBABRKDjQ8UECZCXHUvGnjtFD4VJMu79pDt8W1XZA4GqfanrpZBKMa8ufTSKSKdgmkBpZCzKwVUrWNjMrkOzzvd8njrA4U8rP5ByJTqBn2vpCk9UZBssNlh7oMAjMp8ivASTYKqZBtIfZCFJJsGKtk7Jhkeivq3koDOqFJ4HPCrlT6pkAZAi9EUi1N8qUUAZC7SlGOEsrLREephbrMm66evP4CToZAE8SUiHni0Cejy9YPOKjd23A8AibcuZASJSqZA3IYIpk7MNCZAVk0pOUiUCRpea0ZCaOftJKWlwZDZD";
const PHONE_ID = "980708968468658";

// ✅ Health check (optional)
app.get("/", (req, res) => {
  res.send("LoopLift WhatsApp API is running");
});

// ✅ Send WhatsApp message
app.post("/send", async (req, res) => {
  const { to } = req.body;

  if (!to) {
    return res.status(400).json({ error: "Missing 'to' number" });
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v22.0/${PHONE_ID}/messages`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to,
          type: "text",
          text: {
            body: "Hi, welcome to LoopLift. We'll send you contractor opportunities here."
          }
        })
      }
    );

    const data = await response.json();

    console.log("WhatsApp API response:", data);

    if (data.error) {
      return res.status(500).json(data);
    }

    res.json({ success: true, data });

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// 🚀 Start server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});