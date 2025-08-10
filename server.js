import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Direct Judge0 endpoint (public, no RapidAPI)
const JUDGE0_URL = "https://ce.judge0.com/submissions?base64_encoded=false&wait=true";

app.post("/run", async (req, res) => {
  try {
    const { source_code, language_id, stdin } = req.body;

    const response = await fetch(JUDGE0_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source_code, language_id, stdin }),
    });

    const data = await response.json();
    res.json(data);

  } catch (error) {
    console.error("Backend error:", error);
    res.status(500).json({ error: "Server error" });
  }
});
app.use(cors({
  origin: "ronak-jain-afk.github.io/nexus"
}));


app.listen(3000, () => console.log("🚀 Backend running on http://localhost:3000"));

