var mysql = require('mysql');
var config = require('../setup/config.json');
var PCUsers = require('../setup/preConfigUsers.json');
var statusManager = require('./statusManager.js');
var chatManager = require('./chatManager.js');
const colors = require('colors');

module.exports = {
	addUser: function (username, name, surname, age, gender, email, password, sexualPreference, bio, interests){
		var con = mysql.createConnection(config.userDB);
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
			email+"','"+
			password+"','"+
			sexualPreference+"','"+
			bio+"','"+
			interests
			+"')";
			con.query(sql+Tablename+options+values,function(err,result) {
				if (err) { console.log("Endho: ".red+"Error Adding A User!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
				if (config.debug == "true") {console.log(result);}
				console.log("EndHo:".green+" Added User ".cyan+"("+username+")");
				addUserToImages(username,email,name);
				return;
			})
			return;
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
			);
		});
	},
	authUser: function (email,password){
		var authtoken = 0;
		var con = mysql.createConnection(config.userDB);
		con.connect(function(err) {
			if (err) { { console.log("Endho: ".red+"Error Connecting To DB At authUser!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
			console.log("EndHo:".green+" Request To Authenticate User ".blue+"(email:"+email+"|password:"+password+")");
			var sql = sql = 'SELECT username FROM `users` WHERE email = ? AND password = ?';
			con.query(sql, [email,password], function(err,result) {
				if (err) { console.log("Endho: ".red+"Error Authenticating User!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
				if (config.debug == "true") {console.log(result);}
				console.log("Created A New Endless Horizon");
				if (result[0]){
					console.log("EndHo:".green+" Authenticated User ".cyan+"("+result[0].username+")");
					authtoken = 1;
				}
			});
		});
		return (authtoken);
	}
  };

function addUserToImages(givenUsername,givenEmail,givenName){
	var con = mysql.createConnection(config.userDB);
	con.connect(function(err) {
		if (err) { { console.log("Endho: ".red+"Error Connecting To DB At addUserToImages!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
		console.log("EndHo:".green+" Request To Add User ".blue+"("+givenUsername+") "+"To Images Table".blue);
		var sql = sql = 'SELECT userid FROM `users` WHERE username = ? AND email = ? AND name = ?';
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
			con.query(sql+Tablename+options+values,function(err,result) {
				if (err) {
					console.log("Endho: ".red+"Error Adding User To Images!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;
				}
				if (config.debug == "true") {console.log(result);}
				console.log("EndHo:".green+" Added User To Images Table".cyan);
				return;
			});
			return;
		});
		return;
	});
}
