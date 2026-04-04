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
const TOKEN = "EAAaxULheC4UBRHE08K9zFVI6qusFEsR5ULzQUjkAXXdYf8iRStKei3WKJnMH5qekx4ZBJV3K3eef5fWZCnBSwX7SbeoO5bZCaO5e30JmN1mnMSwy4z1ZCxGsXe5qbUWBZAmmD0Nzuv1SuQZCw4HIsBCqvGXM8y60bIxbbQSyoMCHgXvtQeWLM9fZA1jiFutPJG8Am5vqqfMC1xyDZA7OA7JmZCXiiM8XbZAo8omX2UfLQadZCgS8NlV92bSsNLxaLV2z6xMiEgiRTXX1jsfIkCAutjfoN9p2LlBU3TwRbIZBxQZDZD";
const PHONE_ID = "994036453787440";

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
          to: to,
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