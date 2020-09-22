const express = require('express');
const http = require('http');
const fs = require('fs');
const mongodb = require('./db');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))

var server = http.createServer(app);

mongodb.construct()
var collections = mongodb.collections;

app.use(express.static('data'))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/data/html/main.html');
});

app.get('/lobby', function (req, res) {
    res.sendFile(__dirname +  '/data/html/lobby.html')
});

app.get('/forum', function (req, res) {
    res.sendFile(__dirname +  '/data/html/forum.html')
});

app.get('/forum-write', function (req, res) {
    res.sendFile(__dirname +  '/data/html/forum-write.html')
});

app.get('/game/:gametype', function (req, res) {
    res.sendFile(__dirname +  '/data/html/game.html')
});

app.post('/write-post', function(req, res){
    console.log(req.body);
    res.send('ok');
})

server.listen(1234, '0.0.0.0', function () {
    console.log('Server listen on port ' + server.address().port);
});