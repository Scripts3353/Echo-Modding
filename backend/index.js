// backend/index.js (Node.js + Express + dashboard)

const express = require("express");
const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// In-memory bot state
let isRunning = false;
let botProcess = null;

// Save code to file
app.post("/save", (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).send("Code is missing.");
  fs.writeFileSync("./bot.js", code);
  return res.json({ message: "Bot code saved." });
});

// Run bot
app.post("/run", (req, res) => {
  if (isRunning) return res.status(400).send("Bot is already running.");
  botProcess = exec("node bot.js", (err, stdout, stderr) => {
    isRunning = false;
    if (err) console.error(stderr);
    else console.log(stdout);
  });
  isRunning = true;
  return res.send("Bot started.");
});

// Stop bot
app.post("/stop", (req, res) => {
  if (!isRunning || !botProcess) return res.status(400).send("Bot not running.");
  botProcess.kill();
  isRunning = false;
  return res.send("Bot stopped.");
});

// Bot status
app.get("/status", (req, res) => {
  return res.json({ running: isRunning });
});

// Dashboard HTML
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "dashboard.html"));
});

app.listen(PORT, () =>
  console.log(`✅ Dashboard ready at http://localhost:${PORT}/dashboard`)
);
