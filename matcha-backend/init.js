var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	user: "matcha",
	password: "matcha",
	// database: "matcha_db"
});

con.connect(function(err) {
	if (err) throw err;
	console.log("connect del");
	var sql = "DROP DATABASE IF EXISTS matcha_db";
	con.query(sql,function(err,result) {
		if (err) throw err;
		console.log(result);
	})
	var sql_2 = "CREATE DATABASE IF NOT EXISTS matcha_db"
	con.query(sql_2, function(err,result) {
		if (err) throw err;
		console.log(result);
	})
});

// con.connect(function(err) {
// 	if (err) throw err;
// 	console.log("Connected");
// 	var sql = "CREATE DATABASE IF NOT EXISTS matcha_db";
// 	con.query(sql,function(err,result) {
// 		if (err) throw err;
// 		console.log(result);
// 	})
// });

con = mysql.createConnection({
	host: "localhost",
	user: "matcha",
	password: "matcha",
	database: "matcha_db"
});

