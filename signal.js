//signaling server

const express = require("express");

app=express();
const http = require("http").Server(app);

app.use(express.static('Front-End/Landing Page'));

let io = require('socket.io')(http);
const webSocket = require('ws');

const port = process.env.PORT || 3000;

http.listen(port , ()=>{
    console.log("connected on port " , port);
});