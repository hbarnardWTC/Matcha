var mysql = require('mysql');
var config = require('../setup/config.json');
var PCUsers = require('../setup/preConfigUsers.json');
const { on } = require('process');
var nodemailer = require('nodemailer');
var userManager = require("./userManager");
const colors = require('colors');

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
	  user: 'EndlessHorizonZA@gmail.com',
	  pass: 'CallMeSenpai'
	}
});

module.exports = {
	sendEmail: function(userid,arg,type){
      var userManager = require("./userManager");
        userManager.getUserById(userid).then(user => {
            switch (type) {
                case "verify":
                    this.sendVerifyEmail(userid,user.email);
                    break;
                case "view":
                    this.sendViewEmail(arg,user.username,user.email)
                    break;
                default:
                    break;
            }
        });
    },
    sendViewEmail: function(viewer,viewed,email){
      var userManager = require("./userManager");
        userManager.getUserById(viewer).then(user => {
            var mailOptions = {
                from: 'EndlessHorizonZA@gmail.com',
                to: email,
                subject: 'Someone Viewed Your Profile!!!',
                text: "Hi "+viewed+" "+user.username+' viewed your profile'
            };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log("EndHo: ".red+"Error Mailing ".magenta+email+" Set Debug To (error) To View Details");
                  if (config.debug == "error") {console.log(error);}
                } else {
                  console.log("Endho: ".green+'Email sent to '.cyan + email);
                }
            });
        })
    },
    sendVerifyEmail: function(userid,email){
        var mailOptions = {
          from: 'EndlessHorizonZA@gmail.com',
          to: email,
          subject: 'Please Verify Your Account',
          text: 'link to verify here for user '+userid
        };
  
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log("EndHo: ".red+"Error Mailing ".magenta+email+" Set Debug To (error) To View Details");
            if (config.debug == "error") {console.log(error);}
          } else {
            console.log("Endho: ".green+'Email sent to '.cyan + email);
          }
        });
  }
};