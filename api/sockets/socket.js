// const jwt = require('jsonwebtoken');
// const { io } = require('../index')

// io.use((socket, next) => {
//   const token = socket.handshake.auth.token;
//   if (!token) {
//     return next(new Error('Unauthorized'));
//   }
//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return next(new Error('Unauthorized'));
//     socket.user = user;  
//     next();
//   });
// });

// io.on('connection', (socket) => {
//   console.log(`User connected: ${socket.user.username}`);

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });
