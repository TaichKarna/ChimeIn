const express = require('express')
const { createServer } = require("node:http")
const { Server } = require('socket.io')
const cors = require("cors")

const cookieParser = require('cookie-parser')
const path = require('path')

//routers
const  authRouter = require('./routers/auth.router')
const userRouter = require('./routers/user.router')
const inviteRouter = require('./routers/invite.router')
const chatRouter = require('./routers/chat.route')
const messageRouter = require('./routers/message.router')

const app = express();
const server = createServer(app);
app.use(cors());

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:8081", "http://192.168.29.209:8081"]
    }
});


const __location = path.resolve();
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded())

//sockets login

io.on('connection', (socket) => {

    console.log("a user Connected", socket.id);

    socket.on('chat room', (message) => {
        socket.join(message.chatRoom);
    })

    socket.on("chat message", (message) => {
        console.log(message.content)
        socket.to(message.chatRoom).emit("chat message",message.content)
    })

    socket.on('disconnect', () => {
        console.log("user disconnected");
    })
})


app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/invite', inviteRouter)
app.use('/api/chat', chatRouter)
app.use('/api/message', messageRouter)

app.get('*', (req, res) => {
    res.sendFile(path.join(__location,'client','dist','index.html'));
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})

server.listen(3000,'192.168.29.209',() => {
    console.log("listening to this server")
})
