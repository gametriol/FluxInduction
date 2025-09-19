const express = require('express');
const http = require('http');
const { Server: IOServer } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const { setupSignaling } = require('./signaling');

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }));

app.get('/', (_req: any, res: any) => {
  res.json({ status: 'ok', message: 'Video signaling server' });
});

const httpServer = http.createServer(app);

const io = new IOServer(httpServer, {
  cors: { origin: process.env.CLIENT_ORIGIN || '*', methods: ['GET', 'POST'] }
});

setupSignaling(io);

const port = Number(process.env.PORT || 4000);
httpServer.listen(port, () => {
  console.log('Signaling server listening on port', port);
});
