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

app.get('/board', function (req, res) {
    res.sendFile(__dirname +  '/data/html/board.html')
});

app.get('/board/view/', function (req, res) {
    res.sendFile(__dirname +  '/data/html/board-view.html')
});

app.get('/board-write', function (req, res) {
    res.sendFile(__dirname +  '/data/html/board-write.html')
});

app.get('/game/:gametype', function (req, res) {
    res.sendFile(__dirname +  '/data/html/game.html')
});

//#region board

app.post('/write-post', function(req, res){
    mongodb.write_post(req.body, (code) => {res.send(code);});
})

app.post('/get-post-list', function(req, res){
    mongodb.get_post_list(req.body, (code) => {res.send(code);});
})

app.post('/get-post-data', function(req, res){
    mongodb.get_post_data(req.body.no,(code) => {res.send(code);});
})

app.post('/delete-post', function(req, res){
    mongodb.delete_post(req.body.no, (is) => {res.send(is);});
})

//#endregion

server.listen(1234, '0.0.0.0', function () {
    console.log('Server listen on port ' + server.address().port);
});