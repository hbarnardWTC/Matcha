var mysql = require('mysql');
var users = require('./tables/users.json');
var images = require('./tables/images.json');
var status = require('./tables/status.json');
var location = require('./tables/location.json');
var chats = require('./tables/chats.json');
var debug = false;

var user = {
	host: "localhost",
	port: "3306",
	user: "matcha",
	password: "matcha"
};
var userDB = {
	host: "localhost",
	port: "3306",
	user: "matcha",
	password: "matcha",
	database: "matcha_db"
};

var con = mysql.createConnection(user)
if (mysql.createConnection(userDB)){
	con = mysql.createConnection(userDB);
	con.connect(function(err) {
		if (err) { throw err; }
		console.log("Starting The Endless Journey");
		var sql = "CREATE DATABASE IF NOT EXISTS matcha_db";
		con.query(sql,function(err,result) {
			if (err) throw err;
			if (debug) {console.log(result);}
			console.log("Created A New Endless Horizon");
			return;
		})
		console.log("Starting The Endless Journey");
		var sql = "DROP DATABASE matcha_db";
		con.query(sql,function(err,result) {
			if (err) throw err;
			if (debug) {console.log(result);}
			console.log("Destroyed The Endless Horizon");
			return;
		})
		return;
	});
	con = mysql.createConnection(user);
}

con.connect(function(err) {
	if (err) { throw err; }
	sql = "CREATE DATABASE matcha_db"
	con.query(sql, function(err,result) {
		if (err) throw err;
		if (debug) {console.log(result);}
		console.log("Found A New Endless Horizon");
		createTables();
		return;
	})
	return;
});


function createTables(){
	createUserTable();
	createImageTable();
	createStatusTable();
	createLocationTable();
	createChatsTable();
}

function createUserTable(){
	var conDB = mysql.createConnection(userDB)
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
	var conDB = mysql.createConnection(userDB)
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
	var conDB = mysql.createConnection(userDB)
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
	var conDB = mysql.createConnection(userDB)
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
	var conDB = mysql.createConnection(userDB)
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