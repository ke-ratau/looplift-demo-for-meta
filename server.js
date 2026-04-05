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
const TOKEN = "EAFyeW3PMqBABRHhewwqlhqxqXanGWv3D6hy9PUoIoj94svkq1yBmHQjI7MmZCdtCZCZBzkuoHVZAZAIvb89q1xsaVAspeGncZC4YOQjSgABmeqjq6N7enlZC0RxVD0OTZBC95P9gQE3SO4MUYK3Jj6h4g8FaHBtqWnRpGAhdZBa4SujDJN744Iypue1tTfsyZAvfIjXns1rxqqSVyRc1sOOf8LLflS9KjoEuv94wtCNjmQFI30HAh1ZBrpv9EkDyrW1xlPF6He133KNlXDEgelKIL3b6v6bcZBnFZAlTSDqRQxQZDZD";
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