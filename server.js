const fs = require('fs');
const path = require('path');
const express = require('express');
const ws = require('ws');
var cors = require('cors');

const app = express();
const clientPath = path.join(__dirname, 'client/dist');
const port = 8080;

// enable cors
app.use(cors());
// parse request bodies as json
app.use(express.json());

// if not running in dev mode, the client path must exist
if (process.env.NODE_ENV !== 'development' && !fs.existsSync(clientPath)) {
  console.log(
    'Failed to start server; client build does not exist. Build the client first by running "npm run build" from within the client directory.'
  );
  process.exit(0);
} else {
  app.use(express.static(clientPath));
}

// create headless WebSocket server
const wsServer = new ws.Server({ noServer: true });
wsServer.on('connection', (socket) => {
  // do something with the connection
});

// routes
app.post('/api/run', (req, res) => {
  // do something with the request
});

// listen
const server = app.listen(port);

// setup the WebSocket upgrade
server.on('upgrade', (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, (socket) => {
    wsServer.emit('connection', socket, request);
  });
});
