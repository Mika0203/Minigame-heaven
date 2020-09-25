const { json } = require('express');

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://mik-a.iptime.org:27017';
const dbName = 'minigame-heaven';

const dblist = [
    "accounts",
    "forum"
]

module.exports = {
    collections : {},
    db          : undefined,
    test(){
        
        MongoClient.connect(url, function (err, client) {
            console.log("[MongoDB] Connected successfully to server [",url,"]");
            _this.db = client.db(dbName);
            dblist.forEach(element => _this.collections[element] = _this.db.collection(element));
            client.db('test').collection('test').find();
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
        this.collections['forum'].countDocuments({}, (error, numOfDocs) => {
            data.index = numOfDocs + 1;
            this.collections['forum'].insertOne(data);
            callback('1');
        });
    },

    get_post_list(callback){
        this.collections['forum'].find({}).project({
            tag : 1,
            title : 1,
            _id : 0
        }).sort("_id", -1).skip(0).limit(25).toArray(function(err, docs){
            callback(docs);
        });
    },
}