var mysql = require('mysql');
var config = require('../setup/config.json');
var PCUsers = require('../setup/preConfigUsers.json');
const { on } = require('process');
const colors = require('colors');

module.exports = {
	addNotification: function (notified,user,action){
		var con = mysql.createConnection(config.userDB);
		return new Promise(ret => {
			con.connect(function(err) {
				if (err) { { console.log("Endho: ".red+"Error Connecting To DB At createStatus!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
				if (config.userMessage == "true"){console.log("EndHo:".green+" Creating a Status for ID".blue+"("+")");}
				var sql = "INSERT INTO ";
				var Tablename = "notifications";
				var options = "(notify,user,action)";
				var values = " VALUES(?,?,?)";
				ret(new Promise(ret2 => {
					con.query(sql+Tablename+options+values,[notified,user,action],function(err,result) {
						if (err) { console.log("Endho: ".red+"Error Creating A Status!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
						if (config.debug == "true") {console.log(result);}
						if (result.affectedRows == 1){
							if (config.userMessage == "true"){console.log("EndHo:".green+" Created a Status for".cyan+"("+")");}
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
	getNotifications: function (userid){
		var con = mysql.createConnection(config.userDB);
		return new Promise(ret => {
			con.connect(function(err) {
				if (err) { { console.log("Endho: ".red+"Error Connecting To DB At getStatus!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
				console.log("EndHo:".green+" Request To Get Status for ID".blue+"("+userid+")");
				var sql = "SELECT noteid,user,action FROM ";
				var Tablename = "notifications";
				var options = " WHERE notify = ?";
				ret(new Promise(data => {
					con.query(sql+Tablename+options, [userid],function(err,result) {
						if (err) { console.log("Endho: ".red+"Error Selecting Online From Status!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
						if (config.debug == "true") {console.log(result);}
						console.log("EndHo:".green+" Got Status for".cyan+"("+userid+")");
						data(result)
						con.end();
					})
				}))
			});
		});
	},
	removeNotification: function (noteid){
		var con = mysql.createConnection(config.userDB);
		return new Promise(ret => {
			con.connect(function(err) {
				if (err) { { console.log("Endho: ".red+"Error Connecting To DB At getStatus!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
				console.log("EndHo:".green+" Request To Get Status for ID".blue+"("+")");
				var sql = "DELETE * FROM ";
				var Tablename = "notifications";
				var options = " WHERE noteid = ?";
				ret(new Promise(data => {
					con.query(sql+Tablename+options, [noteid],function(err,result) {
						if (err) { console.log("Endho: ".red+"Error Selecting Online From Status!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
						if (config.debug == "true") {console.log(result);}
						console.log("EndHo:".green+" Got Status for".cyan+"("+")");
						if (result.affectedRows >= 1){
                            data("Success");
                        } else {
                            data("error");
                        }
						con.end();
					})
				}))
			});
		});
	}
  };