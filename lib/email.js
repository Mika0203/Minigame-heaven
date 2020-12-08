var nodemailer = require('nodemailer');
var smtpTransporter = require('nodemailer-smtp-transport');
const fs = require('fs')
const lib       = require('./lib');

module.exports = {
    sendmail(to, callback){
        let jsondata = JSON.parse(fs.readFileSync('./lib/emaildata.json'));
    
        var smtpTransport = nodemailer.createTransport(smtpTransporter({
            service: 'Gmail',
            host:'smtp.gmail.com',
            auth: {
                user: jsondata.email.id,
                pass: jsondata.email.pw
            }
        }));
        
        var data = {
            from        : 'mika.reply@gmail.com',
            to          : to,
            subject     : '이메일 인증을 진행해주세요.',
            html        : '<h1>이메일 인증을 위해 URL을 클릭해주세요.</h1><br>'
        };
        
        if(!jsondata.email.id){
            console.log("You need enter your email data. [./lib/emaildata.json]");
            callback({
                status  : 'failed',
                errcode : '400',
            });
            return;
        }
    
        smtpTransport.sendMail(data, function(err,res){
            if(err){
                console.log(err);
                callback({
                    status  : 'failed',
                    errcode : '401',
                });
            }
            else{
                console.log("sent");
                callback({
                    status  : 'success',
                    key     :  lib.make_key(15)
                });
            }
        })
    }
}

