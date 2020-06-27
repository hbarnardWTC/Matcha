var mysql = require('mysql');
var config = require('../setup/config.json');
var PCUsers = require('../setup/preConfigUsers.json');

module.exports = {
	updateStatus: function (userid, online){
		var con = mysql.createConnection(config.userDB);
		con.connect(function(err) {
			if (err) { throw err; }
			console.log("Starting The Endless Journey");
			var sql = "UPDATE ";
			var Tablename = "users";
			var options = " SET online = ? WHERE userid = ?";
			con.query(sql+Tablename+options, [online,userid],function(err,result) {
				if (err) throw err;
				if (config.debug == "true") {console.log(result);}
				console.log("Created A New Endless Horizon");
				return;
			})
			return;
		});
	},
	createStatus: function (userid){
		var con = mysql.createConnection(config.userDB);
		con.connect(function(err) {
			if (err) { throw err; }
			console.log("Starting The Endless Journey");
			var sql = "INSERT INTO ";
			var Tablename = "status";
			var options = "(userid,online)";
			var values = " VALUES('"+
			userid+"','"+
			0
			+"')";
			con.query(sql+Tablename+options+values,function(err,result) {
				if (err) throw err;
				if (config.debug == "true") {console.log(result);}
				console.log("Created A New Endless Horizon");
				return;
			})
			return;
		});
	}
  };