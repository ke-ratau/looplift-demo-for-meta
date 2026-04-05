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
const TOKEN = "EAAaxULheC4UBRN5R4teMZCN8rov09ZBOYUG6P3SCcYcWkWhAMrm22hWTs0q1jPNil9B0DBydCQZCKyDOaKwH3iM7BImjUooFnvBotu37TkBRKCW0mf21JlfS8moZC5De8HnSZCWDP4oZAtLqhuWYZAZCFlpaq5B3ncaTWkVxwjVpJjglAumStatkPMO2xH2yfV7NCZAZBOKwyRfJ0IWE42a7LwJD0VTXG9LvSrpGZCzr2xY5iB5beHT8c7yvZBAoCLDyprU1zfr6OecmLLBA2k2WnWY2swC8dfrFRGMmwrYmEgZDZD";
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