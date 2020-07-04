var mysql = require('mysql');
var tableManager = require('./managers/tableManager.js');
var config = require('./setup/config.json');
const colors = require('colors');

var con = mysql.createConnection(config.user)
con.connect(function(err) {
	if (err) { throw err; }
	console.log("EndHo:".green+" Starting Search For A New Endless Horizon".blue);
	var sql = "CREATE DATABASE IF NOT EXISTS matcha_db";
		con.query(sql,function(err,result) {
			if (err) throw err;
			if (config.debug == "true") {console.log(result);}
			console.log("EndHo:".green+" Found The New Endless Horizon".cyan);
			console.log("EndHo:".green+" Check If Endless Horizon Exists".blue);
			var sql = "DROP DATABASE matcha_db";
			con.query(sql,function(err,result) {
				if (err) throw err;
				if (config.debug == "true") {console.log(result);}
				console.log("EndHo:".green+" It Existed But We Didn't Like It So We Destroyed The Previous Endless Horizon".yellow);
				var sql = "CREATE DATABASE matcha_db"
				con.query(sql, function(err,result) {
					if (err) throw err;
					if (config.debug == "true") {console.log(result);}
					console.log("EndHo:".green+" Found The New Endless Horizon".cyan);
					console.log("EndHo:".green+" Time For The Tables To Turn".rainbow);
					tableManager.createTables();
					return;
				})
				return;
			})
		})
	return;
});

var chatManager = require('./managers/chatManager.js');
setTimeout(function(){
	chatManager.addMessage(1,2,"hello");
	setTimeout(function(){
		chatManager.getMessages(1,2);
		setTimeout(function(){
			chatManager.addMessage(2,1,"hey");
			setTimeout(function(){
				chatManager.getMessages(1,2);
				setTimeout(function(){
					chatManager.addMessage(1,2,"how u doin?");
					setTimeout(function(){
						chatManager.getMessages(1,2);
					 }, 1000);
				 }, 1000);
			 }, 2000);
		 }, 2000);
	 }, 5000);
 }, 5000);
