var mysql = require('mysql');
var users = require('./tables/users.json');
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
		return;
	})
	return;
});