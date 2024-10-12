const { Server } = require('socket.io');
const { saveMessage } = require('./messages.utils');
const { getUserFriends } = require('./getFriendsList');
const { usersActive } = require('../utils/activerUsers');  
const jwt = require('jsonwebtoken');


const initSocket = (io) => {

  io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
      return next(new Error('Unauthorized'));
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, user) => {
      if (err) return next(new Error('Unauthorized'));
      const friends = await getUserFriends(user.id);

      socket.user = {
        id: user.id,
        username: user.username,
        friends,
      };
      next();
    });
  });

  io.on('connection', (socket) => {
    const user = socket.user;

    if (!user) {
      console.error("User object not found on socket");
      return;
    }

    console.log(`User connected: ${user.username}`);
    usersActive[user.id] = socket.id;

    socket.emit('online users', Object.keys(usersActive));
    socket.broadcast.emit('user online', user.id);

    socket.on('chat room', ({ chatRoom }) => {
      socket.join(chatRoom);
      console.log(`User ${user.username} joined room: ${chatRoom}`);
      socket.to(chatRoom).emit('user joined', user.username);
    });

    socket.on('chat message', async (data) => {
      const {userId, chatId, message } = data;
      console.log(`Message received in ${chatId}:`,{chatId, message});

      try {
        io.to(usersActive[userId]).emit('chat message',{chatId, message} )
        
      } catch (error) {
        console.error(`user not online: ${error.message}`);
      }
    });

    socket.on('disconnect', () => {
      delete usersActive[user.id];  // Clean up on disconnect
      socket.broadcast.emit('user offline', user.id);
      console.log('User disconnected:', user.username);
    });
  });
};

module.exports = { initSocket };
