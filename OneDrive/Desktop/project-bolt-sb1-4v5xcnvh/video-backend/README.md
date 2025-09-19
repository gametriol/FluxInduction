# Video Signaling Server

Minimal TypeScript signaling server using Express + Socket.IO for WebRTC peer signaling.

Quick start:

```bash
cd video-backend
npm install
npm run dev
```

Server exposes Socket.IO events for clients to join rooms and exchange SDP/ICE messages.
