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
	updateValue: function (table,value,userid,newValue){
		var con = mysql.createConnection(config.userDB);
		con.connect(function(err) {
			if (err) { { console.log("Endho: ".red+"Error Connecting To DB At updateValue!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
			console.log("EndHo:".green+" Request To Update Value ".blue+"(VAL:"+value+"|NVAL:"+newValue+")");
			var sql = "UPDATE ";
			var Tablename = table;
			var options = " SET "+value+" = ? WHERE userid = ?";
			con.query(sql+Tablename+options, [newValue,userid],function(err,result) {
				if (err) { console.log("Endho: ".red+"Error Updating Values!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
				if (config.debug == "true") {console.log(result);}
				console.log("EndHo:".green+" Updated The Value of".cyan+"("+value+")");
				return;
			})
		});
	},
	getValues: function (table,values,userid){
		var con = mysql.createConnection(config.userDB);
		return new Promise(ret => {
			con.connect(function(err) {
				if (err) { { console.log("Endho: ".red+"Error Connecting To DB At updateValue!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
				console.log("EndHo:".green+" Request To get Values: ".blue+values);
				var sql = "SELECT ";
				values.forEach(val => {
					sql = sql+val+", ";
				});
				sql = sql.slice(0, -2);
				var options = " FROM `"+table+"` WHERE userid = ?";
				ret(new Promise(data => {
					con.query(sql+options, [userid],function(err,result) {
						if (err) { console.log("Endho: ".red+"Error getting Values!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
						if (config.debug == "true") {console.log(result);}
						if (result[0]){
							console.log("EndHo:".green+" Got The Values of".cyan+"("+userid+")");
							data(result);
						}
					})
				}))
			});
		});
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
