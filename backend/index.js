// backend/index.js (Node.js + Express + simple runtime)

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

// Save the code to file
app.post("/save", (req, res) => {
  const { code } = req.body;
  if (!code) return res.status(400).send("Code is missing.");

  fs.writeFileSync("./bot.js", code);
  return res.json({ message: "Bot code saved to bot.js" });
});

// Run the bot.js file
app.post("/run", (req, res) => {
  exec("node bot.js", (err, stdout, stderr) => {
    if (err) return res.status(500).send(stderr);
    return res.send(stdout || "Bot ran successfully.");
  });
});

app.listen(PORT, () => console.log(`✅ SpaceBot backend running on http://localhost:${PORT}`));
