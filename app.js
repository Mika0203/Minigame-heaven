var express = require('express');
var http = require('http');
var fs = require('fs')

var app = express();

app.use(express.static('data'))
var server = http.createServer(app);

app.get('/', function (req, res) {
    res.sendFile(__dirname +  '/data/html/main.html')
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
