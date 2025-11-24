const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/run', (req, res) => {
  const cmd = req.body.command.trim();
  exec(cmd, { timeout: 10000 }, (err, stdout, stderr) => {
    if (err) return res.json({ error: stderr || err.message });
    res.json({ output: stdout });
  });
});

app.listen(8080, () => console.log('Server running on port 8080'));
