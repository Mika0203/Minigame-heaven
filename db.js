const { json } = require('express');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://mik-a.iptime.org:27017';
const dbName = 'minigame-heaven';

const dblist = [
    "accounts",
    "board"
]

module.exports = {
    collections : {},
    db          : undefined,
    test(){
        
        MongoClient.connect(url, function (err, client) {
            console.log("[MongoDB] Connected successfully to server [",url,"]");
            _this.db = client.db(dbName);
            dblist.forEach(element => _this.collections[element] = _this.db.collection(element));
            client.db('test').collection('test').last
        });
    },

    construct(){
        let _this = this;
        MongoClient.connect(url, function (err, client) {
            console.log("[MongoDB] Connected successfully to server [",url,"]");
            _this.db = client.db(dbName);
            dblist.forEach(element => _this.collections[element] = _this.db.collection(element));
        });
    },

    write_post(data, callback){
        this.collections['board'].findOne({}, {sort:{$natural:-1}}, (error, last) => {
            data.index = last.index + 1;
            this.collections['board'].insertOne(data);
            callback('1');
        });
    },

    get_post_list(callback){
        this.collections['board'].find({}).project({
            tag : 1,
            title : 1,
            _id : 0,
            index : 1
        }).sort("_id", -1).skip(0).limit(25).toArray(function(err, docs){
            callback(docs);
        });
    },

    get_post_data(idx, callback){
        idx *= 1
        this.collections['board'].findOne({'index' : idx}, function(err, doc){
            callback(doc);
        })
    },

    delete_post(idx, callback){
        this.collections['board'].deleteOne({'index':idx}, function(){
            callback(true);
        })
    }
}