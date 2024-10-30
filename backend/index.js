const express = require('express')
const dotenv = require('dotenv')
const session = require('express-session')
const connection = require('./modal/connection')
const routes = require('./routes/router')
const cors = require('cors');
// const http = require('http');
// const { Server } = require('socket.io');
// const io = require('socket.io')(3001); // Initialize Socket.IO
const { Server } = require('socket.io');
const http = require('http');
// const { WebSocketServer } = require('ws');
dotenv.config({ path: "config.env" })


const app = express()


const connectDB = connection()


app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const server = http.createServer(app);
const io = new Server(server , {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});


var bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true, parameterLimit: 100000 }));


app.use(session({
    secret: 'secret-value',
    resave: false,
    saveUninitialized: false
}))

app.use('/', routes)


const users = {}

io.on('connection', (socket) => {
    console.log('A user connected : ' + socket.id);

    socket.on('register', (userId) => {
        users[userId] = socket.id;  // Map userId to socket.id
        console.log(`User ${userId} registered with socket ID: ${socket.id}`);
    });


    // socket.emit('chat', 'Hello World!');
    socket.on('sendMessage', (data) => {
        // socket.broadcast.emit("receiveMessage", data)
        const targetSocketId = users[data.receiverID]
        console.log(targetSocketId);
        console.log(data);
        
        
        
        io.to(targetSocketId).emit('receiveMessage', {
            receiverID  : data.receiverID,
            message: data.text,
            senderID: data.senderID,
            timestamp: new Date(),
            
        });
        io.to(users[data.senderID]).emit('receiveMessage',{
            receiverID  : data.receiverID,
            message: data.text,
            senderID: data.senderID,
            timestamp: new Date(),



        })
        console.log(`Message from ${data.senderID} to ${data.receiverID}:`);
        

    })

    socket.on('disconnect', () => {
        // Optionally, remove user from the tracking map
        for (const userId in users) {
            if (users[userId] === socket.id) {
                delete users[userId];
                console.log(`User ${userId} disconnected`);
                break;
            }
        }
    });
})



app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

server.listen(process.env.PORT, () => {
    console.log("Listening At: http://localhost:" + process.env.PORT)
})