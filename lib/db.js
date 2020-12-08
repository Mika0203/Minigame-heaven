const MongoClient = require('mongodb').MongoClient;
const fs = require('fs')
const jsondata = JSON.parse(fs.readFileSync('./lib/config.json'));
const url = jsondata.db.url;
const dbName = jsondata.db.name;
const crypto = require('crypto');

let db = undefined;

module.exports = {
    test() {
        MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
            console.log("[MongoDB] Connected successfully to server [", url, "]");
            _this.db = client.db(dbName);
            dblist.forEach(element => _this.collections[element] = _this.db.collection(element));
            client.db('test').collection('test').last
        });
    },

    construct() {
        MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {
            console.log("[MongoDB] Connected successfully to server [", url, "]");
            db = client.db(dbName);
        });
    },

    board: {
        write_post(data, callback) {
            db.collection('board').findOne({}, { sort: { $natural: -1 } }, (error, last) => {
                last ?
                    data.index = last.index + 1 || 1 :
                    data.index = 1;

                db.collection('board').insertOne(data);
                callback('1');
            });
        },

        get_post_list(filter, callback) {
            db.collection('board').find(filter).project({
                tag: 1,
                title: 1,
                _id: 0,
                index: 1,
                date: 1
            }).sort("_id", -1).skip(0).limit(25).toArray(function (err, docs) {
                callback(docs);
            });
        },

        get_post_data(idx, callback) {
            idx *= 1
            db.collection('board').findOne({ 'index': idx }, function (err, doc) {
                callback(doc);
            })
        },

        delete_post(idx, callback) {
            db.collection('board').deleteOne({ 'index': idx }, function () {
                callback(true);
            })
        }
    },

    account: {
        async register(data) {
            if (await db.collection('accounts').findOne({ id: data.id }))
                return { code: 400, text: 'exist id' };
            if (await db.collection('accounts').findOne({ email: data.email }))
                return { code: 401, text: 'exist email' };
            data.uid = make_key(16);
            const salt = await crypto.randomBytes(64).toString('base64');
            const key = await pbkdf2Async(String(data.pw), salt, 159236, 64, 'sha512');
            data.salt = salt;
            data.pw = key.toString('base64');
            data.certification = make_key(32);
            let sendmailret;
            db.collection('accounts').insertOne(data);
            return { code: 200, text: 'success' };
        },

        async Login(data) {
            let find = await db.collection('accounts').findOne({ id: data.id });
            if (!find) {
                return { code: 400, text: 'failed' };
            }

            let pw = await pbkdf2Async(data.pw, find.salt, 159236, 64, 'sha512');
            pw = pw.toString('base64');

            if (find.pw != pw) {
                return { code: 400, text: 'failed' };
            }

            if (find.certification)
                return { code: 402, text: 'no certification', email: find.email };

            // let logindata = session.login(session.get(req), find.uid);
            // find = await db.collection('accounts-teacher').findOne({ uid: find.uid }) ||
                // await db.collection('accounts-student').findOne({ uid: find.uid });

            logindata.data = find;
            return logindata;
        }
    },
}

function make_key(length) {
    return crypto.randomBytes(256).toString('hex').substr(100, length);
}

function pbkdf2Async(password, salt, iterations, keylen, digest) {
    return new Promise((res, rej) => {
        crypto.pbkdf2(password, salt, iterations, keylen, digest, (err, key) => {
            err ? rej(err) : res(key);
        });
    });
}
