var mysql = require('mysql');
var config = require('../setup/config.json');
var users = require('../tables/users.json');
var images = require('../tables/images.json');
var status = require('../tables/status.json');
var location = require('../tables/location.json');
var chats = require('../tables/chats.json');
var userManager = require('./userManager.js');

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
		if (err) { throw err; }
		console.log("Started A New Endless Loop");
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
		  if (err) throw err;
		  console.log("Completed The New Endless Loop");
		  return;
		});
		return;
	});
}

function createImageTable(){
	var conDB = mysql.createConnection(config.userDB)
	conDB.connect(function(err) {
		if (err) { throw err; }
		console.log("Started A New Endless Loop");
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
		  if (err) throw err;
		  console.log("Completed The New Endless Loop");
		  return;
		});
		return;
	});
}

function createStatusTable(){
	var conDB = mysql.createConnection(config.userDB)
	conDB.connect(function(err) {
		if (err) { throw err; }
		console.log("Started A New Endless Loop");
		var sql = "CREATE TABLE ";
		var Tablename = "status ";
		var values = "("+
		status.userid+","+
		status.online
		+")";
		conDB.query(sql+Tablename+values, function (err, result) {
		  if (err) throw err;
		  console.log("Completed The New Endless Loop");
		  return;
		});
		return;
	});
}

function createLocationTable(){
	var conDB = mysql.createConnection(config.userDB)
	conDB.connect(function(err) {
		if (err) { throw err; }
		console.log("Started A New Endless Loop");
		var sql = "CREATE TABLE ";
		var Tablename = "location ";
		var values = "("+
		location.userid+","+
		location.area+","+
		location.ip+","+
		location.apiKey
		+")";
		conDB.query(sql+Tablename+values, function (err, result) {
		  if (err) throw err;
		  console.log("Completed The New Endless Loop");
		  return;
		});
		return;
	});
}

function createChatsTable(){
	var conDB = mysql.createConnection(config.userDB)
	conDB.connect(function(err) {
		if (err) { throw err; }
		console.log("Started A New Endless Loop");
		var sql = "CREATE TABLE ";
		var Tablename = "chats ";
		var values = "("+
		chats.userid_1+","+
		chats.userid_2+","+
		chats.messages_1+","+
		chats.messages_2
		+")";
		conDB.query(sql+Tablename+values, function (err, result) {
		  if (err) throw err;
		  console.log("Completed The New Endless Loop");
		  return;
		});
		return;
	});
}
