var mysql = require('mysql');
var tableManager = require('./managers/tableManager.js');
var config = require('./setup/config.json');
const colors = require('colors');

var con = mysql.createConnection(config.user)
con.connect(function(err) {
	if (err) { { console.log("Endho: ".red+"Error Found!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
	console.log("EndHo:".green+" Starting Search For A New Endless Horizon".blue);
	var sql = "CREATE DATABASE IF NOT EXISTS matcha_db";
		con.query(sql,function(err,result) {
			if (err) { console.log("Endho: ".red+"Error Found!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
			if (config.debug == "true") {console.log(result);}
			console.log("EndHo:".green+" Found The New Endless Horizon".cyan);
			console.log("EndHo:".green+" Check If Endless Horizon Exists".blue);
			var sql = "DROP DATABASE matcha_db";
			con.query(sql,function(err,result) {
				if (err) { console.log("Endho: ".red+"Error Found!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
				if (config.debug == "true") {console.log(result);}
				console.log("EndHo:".green+" It Existed But We Didn't Like It So We Destroyed The Previous Endless Horizon".yellow);
				var sql = "CREATE DATABASE matcha_db"
				con.query(sql, function(err,result) {
					if (err) { console.log("Endho: ".red+"Error Found!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
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

 var imageManager = require('./managers/imageManager.js');
 setTimeout(function(){
	imageManager.addImage(1,"test");
	setTimeout(function(){
		imageManager.addImage(1,"wfe");
		setTimeout(function(){
			imageManager.addImage(1,"dfb");
			setTimeout(function(){
				imageManager.addImage(1,"fng");
				setTimeout(function(){
					imageManager.addImage(1,"her");
					setTimeout(function(){
						imageManager.addImage(1,"sge");
						setTimeout(function(){
							imageManager.addImageById(1,"fht",5);
						 }, 1000);
					 }, 1000);
				 }, 1000);
			 }, 1000);
		 }, 1000);
	 }, 1000);
 }, 5000);

 var locationManager = require('./managers/locationManager.js');
 setTimeout(function(){
	locationManager.updateLocation(1,"capetown","192.168.0.1","none");
	setTimeout(function(){
		locationManager.getLocation(1);
	 }, 1000);
 }, 5000);