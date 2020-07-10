var mysql = require('mysql');
var config = require('../setup/config.json');
var PCUsers = require('../setup/preConfigUsers.json');
const { on } = require('process');
const colors = require('colors');

module.exports = {
	updateMatch: function (userid_1, userid_2){
		var con = mysql.createConnection(config.userDB);
		return new Promise(ret => {
			con.connect(function(err) {
				if (err) { { console.log("Endho: ".red+"Error Connecting To DB At updateStatus!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
				console.log("EndHo:".green+" Updating Status of".blue+"("+userid+"|to|"+online+")");
				var sql = "UPDATE ";
				var Tablename = "users";
				var options = " SET online = ? WHERE userid = ?";
				ret(new Promise(ret2 => {
					con.query(sql+Tablename+options, [online,userid],function(err,result) {
						if (err) { console.log("Endho: ".red+"Error Updating Status!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
						if (config.debug == "true") {console.log(result);}
						if (result.affectedRows == 1){
							console.log("EndHo:".green+" Updated Status of".cyan+"("+userid+"|to|"+online+")");
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
	},
	createMatch: function (userid_1, userid_2){
		var con = mysql.createConnection(config.userDB);
		return new Promise(ret => {
			con.connect(function(err) {
				if (err) { { console.log("Endho: ".red+"Error Connecting To DB At createMatch!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
				console.log("EndHo:".green+" Creating a match for ID".blue+"("+userid_1+")");
				var sql = "INSERT INTO ";
				var Tablename = "matches";
				var options = "(userid_1,userid_2)";
				var values = " VALUES(?,?)";
				ret(new Promise(ret2 => {
					con.query(sql+Tablename+options+values,[userid_1,userid_2],function(err,result) {
						if (err) { console.log("Endho: ".red+"Error Creating A Match!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
						if (config.debug == "true") {console.log(result);}
						if (result.affectedRows == 1){
							console.log("EndHo:".green+" Created a Match for".cyan+"("+userid_1+")");
							ret2(new Promise(ret3 => {
								con.query(sql+Tablename+options+values,[userid_2,userid_1],function(err,result) {
									if (err) { console.log("Endho: ".red+"Error Creating A Match!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
									if (config.debug == "true") {console.log(result);}
									if (result.affectedRows == 1){
										console.log("EndHo:".green+" Created a Match for".cyan+"("+userid_1+")");
										ret3("Success");
										con.end();
									} else {
										ret3("Error");
										con.end();
									}
								})
							}));
						} else {
							ret2("Error");
							con.end();
						}
					})
				}));
			});
		});
	},
	getLikes: function (userid){
		var con = mysql.createConnection(config.userDB);
		return new Promise(ret => {
			con.connect(function(err) {
				if (err) { { console.log("Endho: ".red+"Error Connecting To DB At getStatus!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
				console.log("EndHo:".green+" Request To Get Status for ID".blue+"("+userid+")");
				var sql = "SELECT userid_1 FROM ";
				var Tablename = "matches";
				var options = " WHERE userid_2 = ?";
				ret(new Promise(data => {
					con.query(sql+Tablename+options, [userid],function(err,result) {
						if (err) { console.log("Endho: ".red+"Error Selecting Online From Status!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
						if (config.debug == "true") {console.log(result);}
						console.log("EndHo:".green+" Got Status for".cyan+"("+userid+")");
						if (result.length >= 0){
							var ret = {
								"likes": result.length
							}
							data(ret);
						} else {
							data("0");
						}
						con.end();
					})
				}))
			});
		});
	}
  };