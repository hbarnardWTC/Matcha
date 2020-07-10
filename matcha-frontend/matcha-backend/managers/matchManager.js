var mysql = require('mysql');
var config = require('../setup/config.json');
var PCUsers = require('../setup/preConfigUsers.json');
const { on } = require('process');
var notificationManager = require('./notificationManager');
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
				if (err) { { console.log("Endho: ".red+"Error Connecting To DB At adwwad!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
				console.log("EndHo:".green+" Request To Get awddwa for ID".blue+"("+userid+")");
				var sql = "SELECT userid_1, userid_2 FROM ";
				var Tablename = "matches";
				var options = " WHERE userid_2 = ?";
				ret(new Promise(data => {
					con.query(sql+Tablename+options, [userid],function(err,result) {
						if (err) { console.log("Endho: ".red+"Error Selecting Online From Staawdwatus!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
						if (config.debug == "true") {console.log(result);}
						console.log("EndHo:".green+" Got awdawd for".cyan+"("+userid+")");
						if (result.length >= 0){
							var ret = {
								"likes": result.length,
								"users": result
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
	},
	getMatchedUsersTrue: function (userid){
		var con = mysql.createConnection(config.userDB);
		var usersLikedByMe = new Array();
		var usersLikedMe = new Array();
		var matches = new Array();
		return new Promise(ret => {
			con.connect(function(err) {
				if (err) { { console.log("Endho: ".red+"Error Connecting To DB At adwwad!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
				console.log("EndHo:".green+" Request To Get awddwa for ID".blue+"("+userid+")");
				var sql = "SELECT userid_2 FROM ";
				var Tablename = "matches";
				var options = " WHERE userid_1 = ?";
				ret(new Promise(data => {
					con.query(sql+Tablename+options, [userid],function(err,result) {
						if (err) { console.log("Endho: ".red+"Error Selecting Online From Staawdwatus!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
						if (config.debug == "true") {console.log(result);}
						console.log("EndHo:".green+" Got awdawd for".cyan+"("+userid+")");
						if (result.length >= 0){
							result.forEach(val => {
								usersLikedByMe.push(val.userid_2);
							})
							console.log(result);
							var sql = "SELECT userid_1 FROM ";
							var Tablename = "matches";
							var options = " WHERE userid_2 = ?";
							data(new Promise(data2 => {
								con.query(sql+Tablename+options, [userid],function(err,result) {
									if (err) { console.log("Endho: ".red+"Error Selecting Online From Staawdwatus!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
									if (config.debug == "true") {console.log(result);}
									console.log("EndHo:".green+" Got awdawd for".cyan+"("+userid+")");
									if (result.length >= 0){
										result.forEach(val => {
											usersLikedMe.push(val.userid_1);
										})
										console.log(result);
										usersLikedByMe.forEach(iLike => {
											usersLikedMe.forEach(liked => {
												if (iLike == liked){
													matches.push(liked);
												}
											})
										})
										console.log(usersLikedByMe);
										console.log(usersLikedMe);
										console.log(matches);
										data2(matches);
									} else {
										data2("error");
									}
								})
							}))
						} else {
							data("error");
						}
					})
				}))
			});
		});
	},
	addLike: function (liker,liked){
		var con = mysql.createConnection(config.userDB);
		return new Promise(ret => {
			con.connect(function(err) {
				if (err) { { console.log("Endho: ".red+"Error Connecting To DB At adwwad!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
				console.log("EndHo:".green+" Request To Get awddwa for ID".blue+"("+")");
				var sql = "SELECT userid_1, userid_2 FROM ";
				var Tablename = "matches";
				var options = " WHERE userid_1 = ? AND userid_2 = ?";
				ret(new Promise(data => {
					con.query(sql+Tablename+options, [liker,liked],function(err,result) {
						if (err) { console.log("Endho: ".red+"Error Selecting Online From Staawdwatus!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
						if (config.debug == "true") {console.log(result);}
						console.log("EndHo:".green+" Got awdawd for".cyan+"("+")");
						if (result.length == 0){
							var sql = "INSERT INTO ";
							var Tablename = "matches";
							var options = " (userid_1,userid_2) VALUES (?,?)";
							data(new Promise(data2 => {
								con.query(sql+Tablename+options, [liker,liked],function(err,result) {
									if (err) { console.log("Endho: ".red+"Error Selecting Online From Staawdwatus!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
									if (config.debug == "true") {console.log(result);}
									console.log("EndHo:".green+" Got awdawd for".cyan+"("+")");
									if (result.affectedRows >= 1){
										notificationManager.addNotification(liked,liker," Liked You!");
										data2("Success");
									} else {
										data2("0");
									}
									con.end();
								})
							}))
						} else {
							data("Exists");
							con.end();
						}
					})
				}))
			});
		});
	}
  };