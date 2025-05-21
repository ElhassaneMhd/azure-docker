const express = require('express');
const fs = require('fs');
const os = require('os');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const counterFile = path.join(__dirname, 'counter.json');

// Fonction pour lire le compteur depuis le fichier
function readCounter() {
  try {
    const data = fs.readFileSync(counterFile, 'utf8');
    return JSON.parse(data).count || 0;
  } catch (err) {
    return 0; // Par défaut, 0 si le fichier n’existe pas
  }
}


// Fonction pour sauvegarder le compteur dans le fichier
function saveCounter(count) {
  fs.writeFileSync(counterFile, JSON.stringify({ count }), 'utf8');
}

let visitCount = readCounter();
const serverName = os.hostname();


app.get('/', (req, res) => {
  visitCount++;
  saveCounter(visitCount);
  res.send(`
    <html>
      <head>
        <title>Visit Counter App</title>
        <style>
          body {
            background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
            color: #fff;
            font-family: 'Segoe UI', Arial, sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
          }
          .container {
            background: rgba(0,0,0,0.5);
            border-radius: 20px;
            padding: 40px 60px;
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
            text-align: center;
          }
          h1 {
            color: #ffb347;
            margin-bottom: 20px;
            font-size: 2.5em;
          }
          .info {
            font-size: 1.3em;
            margin-bottom: 10px;
          }
          .author {
            margin-top: 30px;
            font-size: 1.1em;
            color: #b2fefa;
            letter-spacing: 1px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Welcome to the Containerized Visit Counter App!</h1>
          <div class="info">👁️ Visitor count: <b>${visitCount}</b></div>
          <div class="info">🖥️ Server name: <b>${serverName}</b></div>
          <div class="author">Created by <b>Elhassane Mehdioui</b></div>
        </div>
      </body>
    </html>
  `);
});



app.listen(port, () => {
  console.log(`App is runninng on http://localhost:${port}`);
});
