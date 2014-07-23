
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.mailus = function(req,res){

var nodemailer = require("nodemailer");
	var smtpTransport = nodemailer.createTransport("SMTP", {
	service : "Gmail",
	auth:
	{
		user: "boxmusiz@gmail.com",
		pass: "boxmusizisgreat"
	}
});

var mailoptions = {
	from : "test",
	to: "coolrahul1850a@gmail.com",
	subject : "hello",
	text: "hey",
	html: "<b> hey hey </b>"
}

smtpTransport.sendMail(mailoptions,function(error,response)
{
	if(error){
		console.log(error);
	}
	else{
		console.log("message sent : " + response.message);
	}
});


	res.redirect("/");	
	
}