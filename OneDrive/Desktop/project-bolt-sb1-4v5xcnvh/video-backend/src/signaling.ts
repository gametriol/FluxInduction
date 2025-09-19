const { Server } = require('socket.io');

/**
 * Minimal signaling handlers using Socket.IO.
 * Clients should emit:
 *  - 'join' with { roomId, userId, role }
 *  - 'offer' with { roomId, to, sdp }
 *  - 'answer' with { to, sdp }
 *  - 'ice-candidate' with { to, candidate }
 */
function setupSignaling(io: any) {
  io.on('connection', (socket: any) => {
    console.log('client connected', socket.id);

    socket.on('join', (payload: any) => {
      const { roomId, userId, role } = payload;
      socket.join(roomId);
      socket.data = { userId, role };
      console.log(`user ${userId} joined room ${roomId} as ${role}`);

      // Notify other peers in room
      socket.to(roomId).emit('peer-joined', { userId, role });
    });

    socket.on('offer', (data: any) => {
      const { roomId, sdp, to } = data;
      console.log('offer to', to, 'in', roomId);
      io.to(to).emit('offer', { from: socket.data.userId, sdp });
    });

    socket.on('answer', (data: any) => {
      const { to, sdp } = data;
      io.to(to).emit('answer', { from: socket.data.userId, sdp });
    });

    socket.on('ice-candidate', (data: any) => {
      const { to, candidate } = data;
      io.to(to).emit('ice-candidate', { from: socket.data.userId, candidate });
    });

    socket.on('leave', (payload: any) => {
      const { roomId } = payload;
      socket.leave(roomId);
      socket.to(roomId).emit('peer-left', { userId: socket.data.userId });
    });

    socket.on('disconnect', () => {
      console.log('client disconnected', socket.id);
    });
  });
}

module.exports = { setupSignaling };

