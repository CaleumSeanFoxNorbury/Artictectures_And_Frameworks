"use strict";

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

//middleware declarations and uses
const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const MongoClient = require("mongodb").MongoClient;
const cors = require('cors');
const two_hours = 1000 * 60 * 60 * 2;
const app = express();
// app.use((req, res, next) => {
//   res.set("Access-Control-Allow-Origin", 'http://localhost:3000');
//   res.set("Access-Control-Allow-Credentials", 'true');
//   res.set("Access-Control-Allow-Methods", 'GET, POST, OPTIONS');
//   next();
// });
//socket.io
const http = require('http');
const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);
//
const ChatController = require("./controllers/chat/ChatController");

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

MongoClient.connect(process.env.dbURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  },(err) => {
  if (err) {
    console.error(err)
    throw err;
  }
  console.log('Database Connection: Connected to MongoDB!');
})

mongoose.connect(process.env.dbURL, {
  useNewUrlParser: true,
  useCreateIndex:true,
  useUnifiedTopology: true
});
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Mongoose Connection: Connected To Mongoose!'));

app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
app.use(cookieParser("passcode"));
app.use(express.json()) 
app.use(cookieParser('AAF-Secret'));
app.use(flash());
app.use(cors());
app.use(session({
  secret: 'CalEum',
  saveUninitialized: true,
  resave: true,
  cookie:{
    secure: false,
    httpOnly: false
  }
}));

const DashboardRoutes = require('./routes/DashboardRoutes') 
const UserRoutes = require('./routes/UserRoutes')
const DocumentRoutes = require('./routes/DocumentRoutes')
const PublicDocumentRoutes = require('./routes/PublicDocumentRoutes')

app.use('/', DashboardRoutes);
app.use('/user', UserRoutes);
app.use('/documents', DocumentRoutes);
app.use('/public/documents', PublicDocumentRoutes);

//spocket io connection
io.on('connection', (socket) =>{
  console.log("Socket.IO Connection:", "Connected To Socket!");

  socket.on('disconnect', () => {
    console.log("Socket.IO Connection:", "Disconnected from Socket!");
  })
});

server.listen(3001, () => console.log("Server Connection: Server Is Running!"));