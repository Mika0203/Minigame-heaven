const express = require('express');
const http = require('http');
const fs = require('fs');
const mongodb = require('./db');
const app = express();

var server = http.createServer(app);

mongodb.construct()
var collections = mongodb.collections;

app.use(express.static('data'))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/data/html/main.html');
    console.log(collections);
});

app.get('/lobby', function (req, res) {
    res.sendFile(__dirname +  '/data/html/lobby.html')
});

app.get('/game/:gametype', function (req, res) {
    res.sendFile(__dirname +  '/data/html/game.html')
});

server.listen(1234, '0.0.0.0', function () {
    console.log('Server listen on port ' + server.address().port);
});