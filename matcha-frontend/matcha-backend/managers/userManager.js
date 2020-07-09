var mysql = require('mysql');
var config = require('../setup/config.json');
var PCUsers = require('../setup/preConfigUsers.json');
var statusManager = require('./statusManager.js');
var chatManager = require('./chatManager.js');
const colors = require('colors');

module.exports = {
	addUser: function (username, name, surname, age, gender, email, password, sexualPreference, bio, interests){
		var con = mysql.createConnection(config.userDB);
		return new Promise(ret => {
			con.connect(function(err) {
				if (err) { { console.log("Endho: ".red+"Error Connecting To DB At addUser!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
				console.log("EndHo:".green+" Request To Add A User ".blue+"("+username+","+name+","+surname+","+age+","+gender+","+email+","+password+","+sexualPreference+","+bio+","+interests+")");
				var sql = "INSERT INTO ";
				var Tablename = "users";
				var options = "(username,name,surname,age,gender,email,password,sexualPreference,bio,interests)";
				var values = " VALUES('"+
				username+"','"+
				name+"','"+
				surname+"','"+
				age+"','"+
				gender+"','"+
				email.toLowerCase()+"','"+
				password+"','"+
				sexualPreference+"','"+
				bio+"','"+
				interests
				+"')";
				ret(new Promise(ret2 => {
					con.query(sql+Tablename+options+values,function(err,result) {
						if (err) { console.log("Endho: ".red+"Error Adding A User!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
						if (config.debug == "true") {console.log(result);}
						if (result.affectedRows == 1){
							console.log("EndHo:".green+" Added User ".cyan+"("+username+")");
							addUserToImages(username,email,name).then(value => {
								ret2(value);
							});
						} else if (result.affectedRows > 1){
							ret2("Error added too amny times");
						} else if (result.affectedRows < 1){
							ret2("Error adding user");
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
				var sql = sql = 'SELECT username,userid FROM `users` WHERE email = ? AND password = ?';
				ret(new Promise(data => {
					con.query(sql, [email.toLowerCase(),password], function(err,result) {
						if (err) { console.log("Endho: ".red+"Error Authenticating User!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
						if (config.debug == "true") {console.log(result);}
						console.log("Created A New Endless Horizon");
						if (result[0]){
							console.log("EndHo:".green+" Authenticated User ".cyan+"("+result[0].username+")");
							authtoken = 1;
							data(result[0].userid);
						} else {
							data("Error");
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
						} else {
							data("Error");
						}
					});
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
					} else {
						console.log("EndHo:".red+" No User with id: ".magenta+userid);
						data("No Such User");
					}
				});
			}))
		});
	});
}

//Get matched users
//
async function getMatchedUsers(ageMin,ageMax,gends,interests,sp){
	var con = mysql.createConnection(config.userDB);
	var gender = new Array(gends);
	return new Promise(ret => {
		con.connect(function(err) {
			if (err) { { console.log("Endho: ".red+"Error Connecting To DB At getMatchedUsers!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
			console.log("EndHo:".green+" Request To Get Matched Users ".blue);
			ret(new Promise(async (ret2) => { ret2(await getMU(ageMin,ageMax,gender,interests,sp))}));
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
			} else {
				data("No Matched Users");
			}
		});
	});
}
module.exports.getUserById = getUserById;
module.exports.getMatchedUsers = getMatchedUsers;



function addUserToImages(givenUsername,givenEmail,givenName){
	var con = mysql.createConnection(config.userDB);
	return new Promise(data => {
		con.connect(function(err) {
			if (err) { { console.log("Endho: ".red+"Error Connecting To DB At addUserToImages!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
			console.log("EndHo:".green+" Request To Add User ".blue+"("+givenUsername+") "+"To Images Table".blue);
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
					data2(new Promise(data3 => {
						con.query(sql+Tablename+options+values,function(err,result) {
							if (err) {
								console.log("Endho: ".red+"Error Adding User To Images!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;
							}
							if (config.debug == "true") {console.log(result);}
							if (result.affectedRows == 1) {
								console.log("EndHo:".green+" Added User To Images Table".cyan);
								data3("Success");
							} else {
								data3("Error");
							}
						});
					}));
				});
			}));
		});
	});
}
