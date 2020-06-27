var mysql = require('mysql');
var config = require('./tables/config.json');
var PCUsers = require('./tables/preConfigUsers.json');

module.exports = {
	addUser: function (username, name, surname, age, gender, email, password, sexualPreference, bio, interests){
		var con = mysql.createConnection(config.userDB);
		con.connect(function(err) {
			if (err) { throw err; }
			console.log("Starting The Endless Journey");
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
				if (err) throw err;
				if (config.debug == "true") {console.log(result);}
				console.log("Created A New Endless Horizon");
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
	}
  };