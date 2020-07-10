var mysql = require('mysql');
var config = require('../setup/config.json');
var passwordHash = require('password-hash');
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
                    this.getToken(user, user.email)
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
    // sendVerifyEmail: function(user,arg,email){
    //     var mailOptions = {
    //       from: 'EndlessHorizonZA@gmail.com',
    //       to: email,
    //       subject: 'Please Verify Your Account '+user.name,
    //       text: 'localhost:5005/user/verifyEmail?userid='+user.userid+'&vtoken='+arg+'&email='+email
    //     };
  
    //     transporter.sendMail(mailOptions, function(error, info){
    //       if (error) {
    //         console.log("EndHo: ".red+"Error Mailing ".magenta+email+" Set Debug To (error) To View Details");
    //         if (config.debug == "error") {console.log(error);}
    //       } else {
    //         console.log("Endho: ".green+'Email sent to '.cyan + email);
    //       }
    //     });
    // },
    getToken: function(user, email){
      var con = mysql.createConnection(config.userDB);
      return new Promise(ret => {
        con.connect(function(err) {
          if (err) { { console.log("Endho: ".red+"Error Connecting To DB At updateStatus!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
          var sql = "UPDATE ";
          var Tablename = "users";
          var options = " SET vtoken = ? WHERE userid = ?"
          ret(new Promise(ret2 => {
            con.query(sql+Tablename+options, [passwordHash.generate(email),user.userid],function(err,result) {
              if (err) { console.log("Endho: ".red+"Error Updating Status!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
              if (config.debug == "true") {console.log(result);}
              if (result.affectedRows == 1){
                sendVerifyEmail(user,passwordHash.generate(email),email); //senpai doesnt recognize me
                ret2("Success");
                con.end();
              } else {
                ret2("Error");
                con.end();
              }
            })
          }));
        });
      });
    }
};

function sendVerifyEmail(user,arg,email){
  var mailOptions = {
    from: 'EndlessHorizonZA@gmail.com',
    to: email,
    subject: 'Please Verify Your Account '+user.name,
    text: 'localhost:5005/user/verifyEmail?userid='+user.userid+'&vtoken='+arg+'&email='+email
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