var mysql = require('mysql');
var config = require('../setup/config.json');
var users = require('../tables/users.json');
var images = require('../tables/images.json');
var status = require('../tables/status.json');
var location = require('../tables/location.json');
var chats = require('../tables/chats.json');
var userManager = require('./userManager.js');
const colors = require('colors');

module.exports = {
	createTables: async function (){
		await createUserTable();
		await createImageTable();
		await createStatusTable();
		await createLocationTable();
		await createChatsTable();
		await userManager.generateUsers();
	},
	func2: function () {
	
	}
  };

  function createUserTable(){
	var conDB = mysql.createConnection(config.userDB)
	conDB.connect(function(err) {
		if (err) { { console.log("Endho: ".red+"Error Connecting To DB At createUserTable!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
		console.log("EndHo:".green+" Creating The All Mighty (users) Table");
		var sql = "CREATE TABLE ";
		var Tablename = "users ";
		var values = "("+
		users.userid+","+
		users.username+","+
		users.name+","+
		users.surname+","+
		users.age+","+
		users.gender+","+
		users.email+","+
		users.password+","+
		users.sp+","+
		users.bio+","+
		users.interests
		+")";
		conDB.query(sql+Tablename+values, function (err, result) {
		  if (err) { console.log("Endho: ".red+"Error Creating User Table!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
		  console.log("EndHo:".green+" Created The All Mighty (users) Table");
		  return;
		});
		return;
	});
}

function createImageTable(){
	var conDB = mysql.createConnection(config.userDB)
	conDB.connect(function(err) {
		if (err) { { console.log("Endho: ".red+"Error Connecting To DB At createImageTable!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
		console.log("EndHo:".green+" Creating The (images) Table");
		var sql = "CREATE TABLE ";
		var Tablename = "images ";
		var values = "("+
		images.userid+","+
		images.image1+","+
		images.image2+","+
		images.image3+","+
		images.image4+","+
		images.image5
		+")";
		conDB.query(sql+Tablename+values, function (err, result) {
		  if (err) { console.log("Endho: ".red+"Error creating Image Table!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
		  console.log("EndHo:".green+" Created The (images) Table");
		  return;
		});
		return;
	});
}

function createStatusTable(){
	var conDB = mysql.createConnection(config.userDB)
	conDB.connect(function(err) {
		if (err) { { console.log("Endho: ".red+"Error Connecting To DB At createStatusTable!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
		console.log("EndHo:".green+" Creating The (status) Table");
		var sql = "CREATE TABLE ";
		var Tablename = "status ";
		var values = "("+
		status.userid+","+
		status.online
		+")";
		conDB.query(sql+Tablename+values, function (err, result) {
		  if (err) { console.log("Endho: ".red+"Error Creating Status Table!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
		  console.log("EndHo:".green+" Created The (status) Table");
		  return;
		});
		return;
	});
}

function createLocationTable(){
	var conDB = mysql.createConnection(config.userDB)
	conDB.connect(function(err) {
		if (err) { { console.log("Endho: ".red+"Error Connecting To DB At createLocationTable!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
		console.log("EndHo:".green+" Creating The (location) Table");
		var sql = "CREATE TABLE ";
		var Tablename = "location ";
		var values = "("+
		location.userid+","+
		location.area+","+
		location.ip+","+
		location.apiKey
		+")";
		conDB.query(sql+Tablename+values, function (err, result) {
		  if (err) { console.log("Endho: ".red+"Error Creating Location Table!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
		  console.log("EndHo:".green+" Created The (location) Table");
		  return;
		});
		return;
	});
}

function createChatsTable(){
	var conDB = mysql.createConnection(config.userDB)
	conDB.connect(function(err) {
		if (err) { { console.log("Endho: ".red+"Error Connecting To DB At createChatsTable!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
		console.log("EndHo:".green+" Creating The (chats) Table");
		var sql = "CREATE TABLE ";
		var Tablename = "chats ";
		var values = "("+
		chats.userid_1+","+
		chats.userid_2+","+
		chats.messages_1+","+
		chats.messages_2
		+")";
		conDB.query(sql+Tablename+values, function (err, result) {
		  if (err) { console.log("Endho: ".red+"Error creating Chats Table!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
		  console.log("EndHo:".green+" Created The (chats) Table");
		  return;
		});
		return;
	});
}
