var nodemailer = require('nodemailer');
var smtpTransporter = require('nodemailer-smtp-transport');
var key = "testtest"

var smtpTransport = nodemailer.createTransport(smtpTransporter({
    service: 'Gmail',
    host:'smtp.gmail.com',
    auth: {
        user: 'mika.reply@gmail.com',
        pass: '!mika0203'
    }
}));

var mailOpt = {
    from: 'mika.reply@gmail.com',
    to: 'ilemik14@gmail.com',
    subject: '이메일 인증을 진행해주세요.',
    html : '<h1>이메일 인증을 위해 URL을 클릭해주세요.</h1><br>'
};

smtpTransport.sendMail(mailOpt, function(err,res){
    if(err){
        console.log(err);
    }
    else{
        console.log("sent")
    }
})