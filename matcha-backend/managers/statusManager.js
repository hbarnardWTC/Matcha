var mysql = require('mysql');
var config = require('../setup/config.json');
var PCUsers = require('../setup/preConfigUsers.json');
const { on } = require('process');
const colors = require('colors');

module.exports = {
	updateStatus: function (userid, online){
		var con = mysql.createConnection(config.userDB);
		con.connect(function(err) {
			if (err) { { console.log("Endho: ".red+"Error Connecting To DB At updateStatus!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
			console.log("EndHo:".green+" Updating Status of".blue+"("+userid+"|to|"+online+")");
			var sql = "UPDATE ";
			var Tablename = "users";
			var options = " SET online = ? WHERE userid = ?";
			con.query(sql+Tablename+options, [online,userid],function(err,result) {
				if (err) { console.log("Endho: ".red+"Error Updating Status!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
				if (config.debug == "true") {console.log(result);}
				console.log("EndHo:".green+" Updated Status of".cyan+"("+userid+"|to|"+online+")");
				return;
			})
			return;
		});
	},
	createStatus: function (userid){
		var con = mysql.createConnection(config.userDB);
		con.connect(function(err) {
			if (err) { { console.log("Endho: ".red+"Error Connecting To DB At createStatus!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
			console.log("EndHo:".green+" Creating a Status for ID".blue+"("+userid+")");
			var sql = "INSERT INTO ";
			var Tablename = "status";
			var options = "(userid,online)";
			var values = " VALUES('"+
			userid+"','"+
			0
			+"')";
			con.query(sql+Tablename+options+values,function(err,result) {
				if (err) { console.log("Endho: ".red+"Error Creating A Status!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
				if (config.debug == "true") {console.log(result);}
				console.log("EndHo:".green+" Created a Status for".cyan+"("+userid+")");
				return;
			})
			return;
		});
	},
	getStatus: function (userid){
		var con = mysql.createConnection(config.userDB);
		con.connect(function(err) {
			if (err) { { console.log("Endho: ".red+"Error Connecting To DB At getStatus!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
			console.log("EndHo:".green+" Request To Get Status for ID".blue+"("+userid+")");
			var sql = "SELECT online FROM ";
			var Tablename = "status";
			var options = " WHERE userid = ?";
			con.query(sql+Tablename+options, [userid],function(err,result) {
				if (err) { console.log("Endho: ".red+"Error Selecting Online From Status!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
				if (config.debug == "true") {console.log(result);}
				console.log("EndHo:".green+" Got Status for".cyan+"("+userid+")");
				return (result[0].online);
			})
			return;
		});
	}
  };