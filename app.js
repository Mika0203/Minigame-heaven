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
    mongodb.write_post(req.body, (code) => {res.send(code);});
})

app.get('/get-post-list', function(req, res){
    mongodb.get_post_list((code) => {res.send(code);});
})

server.listen(1234, '0.0.0.0', function () {
    console.log('Server listen on port ' + server.address().port);
});