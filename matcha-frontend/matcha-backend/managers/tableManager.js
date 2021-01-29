var mysql = require('mysql');
var config = require('../setup/config.json');
var users = require('../tables/users.json');
var images = require('../tables/images.json');
var status = require('../tables/status.json');
var location = require('../tables/location.json');
var chats = require('../tables/chats.json');
var matches = require('../tables/matches.json');
var views = require('../tables/views.json');
var notifications = require('../tables/notifications.json');
var userManager = require('./userManager.js');
const colors = require('colors');

module.exports = {
	createTables: async function (){
		await createUserTable();
		await createImageTable();
		await createStatusTable();
		await createLocationTable();
		await createChatsTable();
		await createMatchesTable();
		await createAllViewsTable();
		await createNewViewsTable();
		await createNotificationsTable();
		await userManager.generateUsers();
	},
	updateValue: function (table,value,userid,newValue){
		var con = mysql.createConnection(config.userDB);
		return new Promise(ret => {
			con.connect(function(err) {
				if (err) { { console.log("Endho: ".red+"Error Connecting To DB At updateValue!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
				console.log("EndHo:".green+" Request To Update Value ".blue+"(VAL:"+value+"|NVAL:"+")");
				var sql = "UPDATE ";
				var Tablename = table;
				var options = " SET "+value+" = ? WHERE userid = ?";
				ret(new Promise(ret2 => {
					con.query(sql+Tablename+options, [newValue,userid],function(err,result) {
						if (err) { console.log("Endho: ".red+"Error Updating Values!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
						if (config.debug == "true") {console.log(result);}
						if (result.affectedRows == 1){
							console.log("EndHo:".green+" Updated The Value of".cyan+"("+value+")");
							ret2("Success");
							con.end();
						} else {
							ret2("Error");
							con.end();
						}
					})
				}));
			});
		});
	},
	getValues: function (table,values,userid){
		if (userid)
		{
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
					console.log(sql+options);
					console.log("1");
					ret(new Promise(data => {
						con.query(sql+options, [userid],function(err,result) {
							if (err) { console.log("Endho: ".red+"Error getting Values!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
							if (config.debug == "true") {console.log(result);}
							if (result[0]){
								console.log("EndHo:".green+" Got The Values of".cyan+"("+userid+")");
								data(result);
								con.end();
							} else {
								con.end();
							}
						})
					}))
				});
			});
		} else {
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
					var options = " FROM `"+table+"`";
					console.log(sql+options);
					console.log("2");
					ret(new Promise(data => {
						con.query(sql+options, [userid],function(err,result) {
							if (err) { console.log("Endho: ".red+"Error getting Values!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
							if (config.debug == "true") {console.log(result);}
							if (result[0]){
								console.log("EndHo:".green+" Got The Values".cyan);
								data(result);
								con.end();
							} else {
								console.log("EndHo: ".red+"No Matches".magenta);
								con.end();
							}
						})
					}))
				});
			});
		}
	}
  };

  function createUserTable(){
	var conDB = mysql.createConnection(config.userDB)
	return new Promise(ret => {
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
			users.verified+","+
			users.vtoken+","+
			users.interests
			+")";
			ret(new Promise(ret2 => {
				conDB.query(sql+Tablename+values, function (err, result) {
				  	if (err) { console.log("Endho: ".red+"Error Creating User Table!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
					if (result){
						console.log("EndHo:".green+" Created The All Mighty (users) Table");
						ret2("Success");
						conDB.end();
					} else {
						ret2("Error");
						conDB.end();
					}
				});
			}));
		});
	});
}

function createImageTable(){
	var conDB = mysql.createConnection(config.userDB)
	return new Promise(ret => {
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
			ret(new Promise(ret2 => {
				conDB.query(sql+Tablename+values, function (err, result) {
				  	if (err) { console.log("Endho: ".red+"Error creating Image Table!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
					if(result){
						console.log("EndHo:".green+" Created The (images) Table");
						ret2("Success");
						conDB.end();
					}  else {
						ret2("Error");
						conDB.end();
					}
				});
			}));
		});
	});
}

function createStatusTable(){
	var conDB = mysql.createConnection(config.userDB)
	return new Promise(ret => {
		conDB.connect(function(err) {
			if (err) { { console.log("Endho: ".red+"Error Connecting To DB At createStatusTable!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
			console.log("EndHo:".green+" Creating The (status) Table");
			var sql = "CREATE TABLE ";
			var Tablename = "status ";
			var values = "("+
			status.userid+","+
			status.online
			+")";
			ret(new Promise(ret2 => {
				conDB.query(sql+Tablename+values, function (err, result) {
				  	if (err) { console.log("Endho: ".red+"Error Creating Status Table!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
					if (result){
						console.log("EndHo:".green+" Created The (status) Table");
						ret2("Success");
						conDB.end();
					} else {
						ret2("Error");
						conDB.end();
					}
				});
			}));
		});
	});
}

function createLocationTable(){
	var conDB = mysql.createConnection(config.userDB)
	return new Promise(ret => {
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
			ret(new Promise(ret2 => {
				conDB.query(sql+Tablename+values, function (err, result) {
				  	if (err) { console.log("Endho: ".red+"Error Creating Location Table!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
				  	if (result){
						console.log("EndHo:".green+" Created The (location) Table");
						ret2("Success");
						conDB.end();
				  	}  else {
						  ret2("Error");
						  conDB.end();
					}
				});
			}));
		});
	});
}

function createChatsTable(){
	var conDB = mysql.createConnection(config.userDB)
	return new Promise(ret => {
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
			ret(new Promise(ret2 => {
				conDB.query(sql+Tablename+values, function (err, result) {
				  if (err) { console.log("Endho: ".red+"Error creating Chats Table!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
				  	if (result){
						console.log("EndHo:".green+" Created The (chats) Table");
						ret2("Success");
						conDB.end();
					} else {
						ret2("Error");
						conDB.end();
					}
				});
			}));
		});
	});
}
function createMatchesTable(){
	var conDB = mysql.createConnection(config.userDB)
	return new Promise(ret => {
		conDB.connect(function(err) {
			if (err) { { console.log("Endho: ".red+"Error Connecting To DB At createMatchesTable!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
			console.log("EndHo:".green+" Creating The (matches) Table");
			var sql = "CREATE TABLE ";
			var Tablename = "matches ";
			var values = "("+
			matches.userid_1+","+
			matches.userid_2
			+")";
			ret(new Promise(ret2 => {
				conDB.query(sql+Tablename+values, function (err, result) {
				  	if (err) { console.log("Endho: ".red+"Error Creating matches Table!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
				  	if (result){
						console.log("EndHo:".green+" Created The (matches) Table");
						ret2("Success");
						conDB.end();
					} else {
						ret2("Error");
						conDB.end();
					}
				});
			}));
		});
	});
}

function createNewViewsTable(){
	var conDB = mysql.createConnection(config.userDB)
	return new Promise(ret => {
		conDB.connect(function(err) {
			if (err) { { console.log("Endho: ".red+"Error Connecting To DB At createNewViewsTable!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
			console.log("EndHo:".green+" Creating The (newviews) Table");
			var sql = "CREATE TABLE ";
			var Tablename = "newviews ";
			var values = "("+
			views.viewer+","+
			views.viewed
			+")";
			ret(new Promise(ret2 => {
				conDB.query(sql+Tablename+values, function (err, result) {
				  	if (err) { console.log("Endho: ".red+"Error Creating NewViews Table!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
					if (result){
						console.log("EndHo:".green+" Created The (newviews) Table");
						ret2("Success");
						conDB.end();
					} else {
						ret2("Error");
						conDB.end();
					}
				});
			}));
		});
	});
}
function createAllViewsTable(){
	var conDB = mysql.createConnection(config.userDB)
	return new Promise(ret => {
		conDB.connect(function(err) {
			if (err) { { console.log("Endho: ".red+"Error Connecting To DB At createAllViewsTable!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
			console.log("EndHo:".green+" Creating The (allviews) Table");
			var sql = "CREATE TABLE ";
			var Tablename = "allviews ";
			var values = "("+
			views.viewer+","+
			views.viewed
			+")";
			ret(new Promise(ret2 => {
				conDB.query(sql+Tablename+values, function (err, result) {
				  	if (err) { console.log("Endho: ".red+"Error Creating allViews Table!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
					if (result){
						console.log("EndHo:".green+" Created The (allviews) Table");
						ret2("Success");
						conDB.end();
					} else {
						ret2("Error");
						conDB.end();
					}
				});
			}));
		});
	});
}
function createNotificationsTable(){
	var conDB = mysql.createConnection(config.userDB)
	return new Promise(ret => {
		conDB.connect(function(err) {
			if (err) { { console.log("Endho: ".red+"Error Connecting To DB At createAllViewsTable!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
			console.log("EndHo:".green+" Creating The (allviews) Table");
			var sql = "CREATE TABLE ";
			var Tablename = "notifications ";
			var values = "("+
			notifications.noteid+","+
			notifications.notify+","+
			notifications.user+","+
			notifications.action
			+")";
			ret(new Promise(ret2 => {
				conDB.query(sql+Tablename+values, function (err, result) {
				  	if (err) { console.log("Endho: ".red+"Error Creating allViews Table!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
					if (result){
						console.log("EndHo:".green+" Created The (allviews) Table");
						ret2("Success");
						conDB.end();
					} else {
						ret2("Error");
						conDB.end();
					}
				});
			}));
		});
	});
}
