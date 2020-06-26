var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	user: "matcha",
	password: "matcha",
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Connect");
	var sql = "DROP DATABASE IF EXISTS matcha_db";
	con.query(sql,function(err,result) {
		if (err) throw err;
		// console.log(result);
	})
	sql = "CREATE DATABASE IF NOT EXISTS matcha_db"
	con.query(sql, function(err,result) {
		if (err) throw err;
		// console.log(result);
	})
});

con = mysql.createConnection({
	host: "localhost",
	user: "matcha",
	password: "matcha",
	database: "matcha_db"
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Table creation");
	var sql = "CREATE TABLE ? (?)";
	var name = "users";
	var values = "userid INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(255)";
	con.query(sql,[name, values], function(err,res){
		if (err) throw err;
		console.log("TABLE CREATED MWAHAHAHA");
	});
})