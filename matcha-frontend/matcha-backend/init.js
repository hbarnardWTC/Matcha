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
					tableManager.createTables().then(val => {
						tests();
					})
					return;
				})
				return;
			})
		})
	return;
});
async function tests(){
	var chatManager = require('./managers/chatManager.js');
	var matchManager = require('./managers/matchManager.js');
	await chatManager.addMessage(1,2,"hello");
	await chatManager.getMessages(1,2);
	await chatManager.addMessage(2,1,"hey");
	await chatManager.getMessages(1,2);
	await chatManager.addMessage(1,2,"how u doin?");
	await chatManager.getMessages(1,2).then(chats => {
		console.log(chats);
	})
	matchManager.createMatch(1,2);

	var imageManager = require('./managers/imageManager.js');
	await imageManager.addImage(1, "test");
	await imageManager.addImage(1, "wfe");
	await imageManager.addImage(1, "dfb");
	await imageManager.addImage(1, "fng");
	await imageManager.addImage(1, "her");
	await imageManager.addImage(1, "sge");
	await imageManager.addImageById(1, "fht", 5);

	var locationManager = require('./managers/locationManager.js');
	await locationManager.updateLocation(1, "capetown", "192.168.0.1", "none");
	await locationManager.getLocation(1);

	var userManager = require('./managers/userManager.js');
	await userManager.getMatchedUsers(18,24,0,["coding","gaming"],1).then(async (value) => {
		await new Promise(ret => {
			ret(value.forEach(async (user) => {
				await new Promise(ret => {
					ret(userManager.getUserById(user).then(user => {
						console.log("EndHo: ".green+user.name);
					}));
				});
				await new Promise(ret => {
					ret(tableManager.getValues(`users`,["username","password"],user).then(results => {
						results.forEach(res => {
							console.log("EndHo: ".green+res.username+"|"+res.password);
						});
					}));
				});
			}));
		});
	});
	setTimeout(() => {
		console.log("EndHo: ".green+"Successfully Created Endless Horizon Database".rainbow);
		process.exit();
	}, 2000);
}
