const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'minigame-heaven';

const dblist = [
    "accounts"
]

module.exports = {
    collections : {},
    db          : undefined,
    construct(){
        let _this = this;
        MongoClient.connect(url, function (err, client) {
            console.log("[MongoDB] Connected successfully to server [",url,"]");
            _this.db = client.db(dbName);
            dblist.forEach(element => _this.collections[element] = _this.db.collection(element));
            client.close();
        });
    },
}