import express from "express";

const app = express();
app.use(express.json({ limit: "1mb" }));
const port = Number(process.env.PORT || 10000);

function configured(key: string) { return Boolean(process.env[key]?.trim()); }
app.get("/", (_req, res) => res.json({ name: "APEX STUDIO", status: "online", message: "Studio API is running" }));
app.get("/health", (_req, res) => res.json({ ok: true, service: "apex-studio" }));
app.get("/api/status", (_req, res) => {
  const providers = [
    { name: "FreeLLMAPI", baseUrl: configured("FREELLMAPI_BASE_URL"), apiKey: configured("FREELLMAPI_API_KEY"), model: process.env.FREELLMAPI_MODEL || "auto" },
    { name: "9Router", baseUrl: configured("NINEROUTER_BASE_URL"), apiKey: configured("NINEROUTER_API_KEY"), model: process.env.NINEROUTER_MODEL || "auto" },
    { name: "Creatomate", apiKey: configured("CREATOMATE_API_KEY"), template: configured("CREATOMATE_TEMPLATE_ID") },
    { name: "ElevenLabs", apiKey: configured("ELEVENLABS_API_KEY") },
    { name: "Pexels", apiKey: configured("PEXELS_API_KEY") }
  ];
  res.json({ service: "APEX STUDIO", timezone: process.env.STUDIO_TIMEZONE || "Europe/Istanbul", providers });
});

app.listen(port, "0.0.0.0", () => console.log(`APEX STUDIO listening on ${port}`));
