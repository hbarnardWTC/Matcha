var mysql = require('mysql');
var tableManager = require('./managers/tableManager.js');
var config = require('./setup/config.json');

var con = mysql.createConnection(config.user)
if (mysql.createConnection(config.userDB)){
	con = mysql.createConnection(config.userDB);
	con.connect(function(err) {
		if (err) { throw err; }
		console.log("Starting The Endless Journey");
		var sql = "CREATE DATABASE IF NOT EXISTS matcha_db";
		con.query(sql,function(err,result) {
			if (err) throw err;
			if (config.debug == "true") {console.log(result);}
			console.log("Created A New Endless Horizon");
			return;
		})
		console.log("Starting The Endless Journey");
		var sql = "DROP DATABASE matcha_db";
		con.query(sql,function(err,result) {
			if (err) throw err;
			if (config.debug == "true") {console.log(result);}
			console.log("Destroyed The Endless Horizon");
			return;
		})
		return;
	});
	con = mysql.createConnection(config.user);
}

con.connect(function(err) {
	if (err) { throw err; }
	sql = "CREATE DATABASE matcha_db"
	con.query(sql, function(err,result) {
		if (err) throw err;
		if (config.debug == "true") {console.log(result);}
		console.log("Found A New Endless Horizon");
		tableManager.createTables();
		return;
	})
	return;
});

