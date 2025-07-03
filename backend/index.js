<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>🛸 Bot Dashboard</title>
  <style>
    body {
      background: radial-gradient(circle at center, #0a0f2e, #0d0d25);
      font-family: 'Orbitron', sans-serif;
      color: #00ffff;
      text-align: center;
      padding: 40px;
    }
    h1 {
      font-size: 2.5rem;
      text-shadow: 0 0 10px #00ffff;
    }
    button {
      background-color: #00ffff;
      border: none;
      color: black;
      padding: 12px 24px;
      margin: 10px;
      border-radius: 10px;
      font-size: 1.1rem;
      cursor: pointer;
      box-shadow: 0 0 10px #00ffff88;
    }
    button:hover {
      background-color: #00cccc;
    }
    input, textarea {
      margin-top: 20px;
      width: 90%;
      max-width: 600px;
      padding: 10px;
      border-radius: 8px;
      font-size: 1rem;
      border: 2px solid #00ffff88;
      background: #111;
      color: #0ff;
    }
    #status {
      margin-top: 20px;
      font-size: 1.3rem;
      text-shadow: 0 0 8px #0ff;
    }
  </style>
</head>
<body>
  <h1>🛸 Space Bot Dashboard</h1>

  <input id="bot-id" placeholder="Enter your Bot ID..." />
  <textarea id="code" placeholder="// Paste your bot code here or generate from the builder..."></textarea>

  <div>
    <button onclick="saveCode()">💾 Save Bot</button>
    <button onclick="startBot()">▶️ Start Bot</button>
    <button onclick="stopBot()">⏹ Stop Bot</button>
  </div>

  <div id="status">🔄 Checking bot status...</div>

  <script>
    function updateStatus() {
      fetch('/status')
        .then(res => res.json())
        .then(data => {
          document.getElementById('status').innerText = data.running
            ? `🟢 Bot ${data.botId} is running`
            : '🔴 Bot is stopped';
        })
        .catch(() => {
          document.getElementById('status').innerText = '⚠️ Error getting status';
        });
    }

    function saveCode() {
      const code = document.getElementById('code').value;
      fetch('/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code })
      })
      .then(res => res.json())
      .then(data => alert(data.message));
    }

    function startBot() {
      const id = document.getElementById('bot-id').value;
      if (!id) return alert('Please enter your bot ID first.');
      fetch('/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      })
        .then(res => res.text())
        .then(msg => {
          alert(msg);
          updateStatus();
        });
    }

    function stopBot() {
      fetch('/stop', { method: 'POST' })
        .then(res => res.text())
        .then(msg => {
          alert(msg);
          updateStatus();
        });
    }

    updateStatus();
    setInterval(updateStatus, 5000);
  </script>
</body>
</html>
