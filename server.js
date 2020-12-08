const express       = require('express');
const http          = require('http');
const app           = express();
const bodyParser    = require('body-parser');
const mongodb       = require('./lib/db');
const lib           = require('./lib/lib');
const email         = require('./lib/email');

var server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))

// Routers ###################################################

var board_router = express.Router();
var account_router = express.Router();
app.use('/board', board_router);
app.use('/account', account_router);

// ###########################################################

lib.init();
mongodb.construct();

// ###########################################################

app.get('/email', function(req,res){
    email.sendmail('ilemik14@gmail.com', function(e){
        res.send(e);
    })
})

//#region board

board_router.get('/write', function (req, res) {
    res.sendFile(__dirname +  '/src/html/board-write.html')
});

board_router.post('/write-post', function(req, res){
    req.body.date = lib.getCurrentTime();
    mongodb.board.write_post(req.body, (code) => {res.send(code);});
})

board_router.post('/get-post-list', function(req, res){
    mongodb.board.get_post_list(req.body, (code) => {res.send(code);});
})

board_router.post('/get-post-data', function(req, res){
    console.log(req.body.no);
    mongodb.board.get_post_data(req.body.no,(code) => {res.send(code);});
})

board_router.post('/delete-post', function(req, res){
    mongodb.board.delete_post(req.body.no, (is) => {res.send(is);});
})

//#endregion

account_router.post('/register', async function (req, res){
    let ret = await mongodb.account.register(req.body);
    console.log(ret);
})

server.listen(1234, '0.0.0.0', function () {
    console.log('Server listen on port ' + server.address().port);
});