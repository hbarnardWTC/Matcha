var mysql = require('mysql');
var config = require('../setup/config.json');
var PCUsers = require('../setup/preConfigUsers.json');
var statusManager = require('./statusManager.js');
var passwordHash = require('password-hash');
var chatManager = require('./chatManager.js');
var nodemailer = require('nodemailer');
const colors = require('colors');
const mailManager = require('./mailManager');

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
	  user: 'EndlessHorizonZA@gmail.com',
	  pass: 'CallMeSenpai'
	}
  });

module.exports = {
	addUser: function (username, name, surname, age, gender, email, password, sexualPreference, bio, interests){
		var con = mysql.createConnection(config.userDB);
		return new Promise(ret => {
			con.connect(function(err) {
				if (err) { { console.log("Endho: ".red+"Error Connecting To DB At addUser!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
				if (config.userMessage == "true"){console.log("EndHo:".green+" Request To Add A User ".blue+"("+username+","+name+","+surname+","+age+","+gender+","+email+","+password+","+sexualPreference+","+bio+","+interests+")");}
				var sql = "INSERT INTO ";
				var Tablename = "users";
				var options = "(username,name,surname,age,gender,email,password,sexualPreference,bio,interests,verified)";
				var values = " VALUES('"+
				username+"','"+
				name+"','"+
				surname+"','"+
				age+"','"+
				gender+"','"+
				email.toLowerCase()+"','"+
				passwordHash.generate(password)+"','"+
				sexualPreference+"','"+
				bio+"','"+
				interests+"','"+
				'false'
				+"')";
				ret(new Promise(ret2 => {
					con.query(sql+Tablename+options+values,function(err,result) {
						if (err) { console.log("Endho: ".red+"Error Adding A User!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
						if (config.debug == "true") {console.log(result);}
						if (result.affectedRows == 1){
							console.log("EndHo:".green+" Added User ".cyan+"("+username+")");
							addUserToImages(username,email,name).then(value => {
								ret2(value);
								con.end();
							});
						} else if (result.affectedRows > 1){
							ret2("Error added too amny times");
							con.end();
						} else if (result.affectedRows < 1){
							ret2("Error adding user");
							con.end();
						}
					})
				}));
			});
		});
	},
	generateUsers: function () {
		PCUsers.forEach(user => {
			if(config.debug == "true"){ console.log(user) }
			this.addUser(
				user.username,
				user.name,
				user.surname,
				user.age,
				user.gender,
				user.email,
				user.password,
				user.sexualPreference,
				user.bio,
				user.interests
			).then(val => {
				if (val != "Success"){
					return ("Error");
				}
			});
		});
		return ("Success");
	},
	authUser: function (email,password){
		var authtoken = 0;
		var con = mysql.createConnection(config.userDB);
		return new Promise(ret => {
			con.connect(function(err) {
				if (err) { { console.log("Endho: ".red+"Error Connecting To DB At authUser!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
				console.log("EndHo:".green+" Request To Authenticate User ".blue+"(email:"+email.toLowerCase()+"|password:"+password+")");
				var sql = sql = 'SELECT username,userid,password FROM `users` WHERE email = ?';
				ret(new Promise(data => {
					con.query(sql, [email.toLowerCase(),password], function(err,result) {
						if (err) { console.log("Endho: ".red+"Error Authenticating User!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
						if (config.debug == "true") {console.log(result);}
						console.log("Created A New Endless Horizon");
						if (result[0]){
							var i = 0;
							var f = 0;
							while(result[i] && f == 0){
								if (passwordHash.verify(password, result[i].password)){
									console.log("EndHo:".green+" Authenticated User ".cyan+"("+result[i].username+")");
									authtoken = 1;
									f = 1;
									data(result[i].userid);
									con.end();
								} else {
									data("Wrong Pass");
									con.end();
								}
								i++;
							}
						} else {
							data("Error");
							con.end();
						}
					});
				}))
			});
		});
	},
	getAllUsers: function (){
		var con = mysql.createConnection(config.userDB);
		return new Promise(ret => {
			con.connect(function(err) {
				if (err) { { console.log("Endho: ".red+"Error Connecting To DB At getAllUsers!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
				console.log("EndHo:".green+" Request To Get All Users ".blue);
				var sql = 'SELECT userid,username,name,surname,age,gender,email,sexualPreference,bio,interests FROM `users`';
				ret(new Promise(data => {
					con.query(sql, function(err,result) {
						if (err) { console.log("Endho: ".red+"Error Getting All Users!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
						if (config.debug == "true") {console.log(result);}
						if (result[0]){
							console.log("EndHo:".green+" Got All Users ".cyan);
							data(result);
							con.end();
						} else {
							data("Error");
							con.end();
						}
					});
				}))
			});
		});
	},
	getAG: function (userid){
		var con = mysql.createConnection(config.userDB);
		return new Promise(ret => {
			con.connect(function(err) {
        	    if (err) { { console.log("Endho: ".red+"Error Connecting To DB At getLocation!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
				console.log("EndHo:".green+" Request To Get Location for ID".blue+"("+userid+")");
				var sql = "SELECT age, gender FROM ";
				var Tablename = "users";
				var options = " WHERE userid = ?";
				ret(new Promise(data => {
					con.query(sql+Tablename+options, [userid],async function(err,result) {
						if (err) { console.log("Endho: ".red+"Error Selecting area From Location!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
						if (config.debug == "true") {console.log(result);}
						console.log("EndHo:".green+" Got Location for".cyan+"("+userid+"|at|"+result[0].area+")");
						data(result[0]);
						con.end();
					})
				}))
			});
		});
	}
};

async function getUserById(userid){
	var con = mysql.createConnection(config.userDB);
	return new Promise(ret => {
		con.connect(async function(err) {
			if (err) { { console.log("Endho: ".red+"Error Connecting To DB At getUserById!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
			console.log("EndHo:".green+" Request To Get User ID: ".blue+userid);
			var sql = sql = 'SELECT userid, username, name, surname, age, gender, email, sexualPreference, bio, interests FROM `users` WHERE userid = ?';
			ret(new Promise(data => {
				con.query(sql, [userid], function(err,result) {
					if (err) { console.log("Endho: ".red+"Error Getting User!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
					if (config.debug == "true") {console.log(result);}
					if (result[0]){
						console.log("EndHo:".green+" Got User ".cyan);
						console.log("EndHo: ".green+result[0].username);
						data(result[0]);
						con.end();
					} else {
						console.log("EndHo:".red+" No User with id: ".magenta+userid);
						data("No Such User");
						con.end();
					}
				});
			}))
		});
	});
}


// email
async function verifyEmail(userid, vtoken){
	var con = mysql.createConnection(config.userDB);
	return new Promise(ret => {
		con.connect(async function(err) {
			if (err) { { console.log("Endho: ".red+"Error Connecting To DB At getUserById!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
			console.log("EndHo:".green+" Request To Get User ID: ".blue+userid);
			var sql = sql = 'SELECT userid, verified, vtoken FROM `users` WHERE userid = ?';
			ret(new Promise(data => {
				con.query(sql, [userid], function(err,result) {
					if (err) { console.log("Endho: ".red+"Error Getting User!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
					if (config.debug == "true") {console.log(result);}
					if (result[0]){
						if (passwordHash.verify(vtoken, result[0].vtoken)){
							setToken(userid).then(val => {
								data(val);
							})
						} else {
							data('Error');
						}
						console.log("EndHo:".green+" Got User ".cyan);
						con.end();
					} else {
						console.log("EndHo:".red+" No User with id: ".magenta+userid);
						data('Error');
						con.end();
					}
				});
			}))
		});
	});
}


async function setToken(userid){
	var con = mysql.createConnection(config.userDB);
	return new Promise(ret => {
		con.connect(function(err) {
			if (err) { { console.log("Endho: ".red+"Error Connecting To DB At updateStatus!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
			var sql = "UPDATE ";
			var Tablename = "users";
			var options = " SET verified = ? WHERE userid = ?"
			ret(new Promise(ret2 => {
				con.query(sql+Tablename+options, ['true',userid],function(err,result) {
					if (err) { console.log("Endho: ".red+"Error Updating Status!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
					if (config.debug == "true") {console.log(result);}
					console.log(result);
					if (result.affectedRows == 1){
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

//Get matched users
//
async function getMatchedUsers(ageMin,ageMax,gender,interests,sp){
	var con = mysql.createConnection(config.userDB);
	return new Promise(ret => {
		con.connect(function(err) {
			if (err) { { console.log("Endho: ".red+"Error Connecting To DB At getMatchedUsers!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
			console.log("EndHo:".green+" Request To Get Matched Users ".blue);
			ret(new Promise(async (ret2) => { ret2(await getMU(ageMin,ageMax,gender,interests,sp))}));
			con.end();
		});
	});
}
function getMU(ageMin,ageMax,gender,interests,sp){
	var con = mysql.createConnection(config.userDB);
	var sql = 'SELECT userid,gender,interests,sexualPreference FROM `users` WHERE (age >= ? AND age <= ?)';
	return new Promise(data => {
		con.query(sql, [ageMin,ageMax],function(err,result) {
			if (err) { console.log("Endho: ".red+"Error Getting Matched Users!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
			if (config.debug == "true") {console.log(result);}
			if (result[0]){
				var matchedUsers = new Array();
				result.forEach(res => {
					var genM = 0;
					var intM = 0;
					var spM = 0;
					var ints = res.interests.split("#");
					ints.forEach(int => {
						console.log("array"+interests);
						interests.forEach(gInt => {
							if(gInt == int){
								intM++;
							}
						});
					});
					if(sp == res.gender && gender == res.sexualPreference){
						spM = 1;
						genM = 1;
					}
					if (genM > 0 && intM > 0 && spM > 0){
						matchedUsers.push(res.userid);
					}
				});
				console.log("EndHo:".green+" Got Matched Users ".cyan);
				console.log("EndHo: ".green+matchedUsers);
				data(matchedUsers);
				con.end();
			} else {
				data("No Matched Users");
				con.end();
			}
		});
	});
}
module.exports.getUserById = getUserById;
module.exports.getMatchedUsers = getMatchedUsers;
module.exports.verifyEmail = verifyEmail;



function addUserToImages(givenUsername,givenEmail,givenName){
	var con = mysql.createConnection(config.userDB);
	return new Promise(data => {
		con.connect(function(err) {
			if (err) { { console.log("Endho: ".red+"Error Connecting To DB At addUserToImages!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
			if (config.userMessage == "true"){console.log("EndHo:".green+" Request To Add User ".blue+"("+givenUsername+") "+"To Images Table".blue);}
			var sql = sql = 'SELECT userid FROM `users` WHERE username = ? AND email = ? AND name = ?';
			data(new Promise(data2 => {
				con.query(sql, [givenUsername,givenEmail,givenName], function(err,result) {
					if (err) { console.log("Endho: ".red+"Error Getting Id From users!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
					if (config.debug == "true") {console.log(result);}
					var sql = "INSERT INTO ";
					var Tablename = "images";
					var options = "(userid)";
					var values = " VALUES('"+
					result[0].userid
					+"')";
					statusManager.createStatus(result[0].userid);
					var domain = givenEmail.toLowerCase().split("@");
					if (domain[1] == "endho.endho"){} else {
						mailManager.sendEmail(result[0].userid,givenEmail,"verify");
					}
					data2(new Promise(data3 => {
						con.query(sql+Tablename+options+values,function(err,result) {
							if (err) {
								console.log("Endho: ".red+"Error Adding User To Images!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;
							}
							if (config.debug == "true") {console.log(result);}
							if (result.affectedRows == 1) {
								if (config.userMessage == "true"){console.log("EndHo:".green+" Added User To Images Table".cyan);}
								data3("Success");
								con.end();
							} else {
								data3("Error");
								con.end();
							}
						});
					}));
				});
			}));
		});
	});
}