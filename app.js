const express = require('express');
const http = require('http');
const fs = require('fs');
const mongodb = require('./lib/db');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))

// Routers ###################################################

var board_router = express.Router();
app.use('/board', board_router);

// ###########################################################

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

board_router.post('/write-post', function(req, res){
    req.body.date = GetCurrentTime();
    mongodb.write_post(req.body, (code) => {res.send(code);});
})

board_router.post('/get-post-list', function(req, res){
    mongodb.get_post_list(req.body, (code) => {res.send(code);});
})

board_router.post('/get-post-data', function(req, res){
    mongodb.get_post_data(req.body.no,(code) => {res.send(code);});
})

board_router.post('/delete-post', function(req, res){
    mongodb.delete_post(req.body.no, (is) => {res.send(is);});
})


//#endregion

server.listen(1234, '0.0.0.0', function () {
    console.log('Server listen on port ' + server.address().port);
});


function GetCurrentTime(){
    Date.prototype.format = function(f) {
        if (!this.valueOf()) return " ";
     
        var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
        var d = this;
         
        return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
            switch ($1) {
                case "yyyy": return d.getFullYear();
                case "yy": return (d.getFullYear() % 1000).zf(2);
                case "MM": return (d.getMonth() + 1).zf(2);
                case "dd": return d.getDate().zf(2);
                case "E": return weekName[d.getDay()];
                case "HH": return d.getHours().zf(2);
                case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
                case "mm": return d.getMinutes().zf(2);
                case "ss": return d.getSeconds().zf(2);
                case "a/p": return d.getHours() < 12 ? "오전" : "오후";
                default: return $1;
            }
        });
    };
    String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
    String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
    Number.prototype.zf = function(len){return this.toString().zf(len);};
    return new Date().format("yyyy.MM.dd HH:mm:ss");
}

