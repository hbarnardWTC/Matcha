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

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function getUserCount(){
	var con = mysql.createConnection(config.userDB);
		return new Promise(ret => {
			con.connect(function(err) {
				if (err) { { console.log("Endho: ".red+"Error Connecting To DB At getStatus!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
				var sql = "SELECT * FROM ";
				var Tablename = "users";
				ret(new Promise(data => {
					con.query(sql+Tablename,function(err,result) {
						if (err) { console.log("Endho: ".red+"Error Selecting Online From Status!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
						if (config.debug == "true") {console.log(result);}
						var rows = 0;
						while(result[rows]){
							rows++;
						}
						data(rows);
						con.end();
					})
				}))
			});
		});
}

var count = 0;
var msg = 0;
async function addNewUsers(){
	var userManager = require('./managers/userManager.js');
	var locationManager = require('./managers/locationManager.js');
	if (count > ((config.userCount-5)) && msg == 0){
		msg++;
		setTimeout(async () => {
			await userManager.getAllUsers().then(async (users) => {
				(async() => {
					for (let user of users){
						await locationManager.updateLocation(user.userid, "bellville", "capetown", "AIzaSyDCdn8N23XLWZNYKKfnG0uENNsTJQiGsnA").then(val => {})
					};
					getUserCount().then(val => {
						console.log("EndHo: ".green+"Added (".rainbow+val+") Users".rainbow);
						console.log("EndHo: ".green+"Successfully Created Endless Horizon Database".rainbow);
						process.exit(0);
					})
				})();
			})
		}, 2000);
	} else if (count < ((config.userCount-5))) {
		var userManager = require('./managers/userManager.js');
		var namesM = require('./setup/NamesM.json');
		var namesF = require('./setup/NamesM.json');
		var surnames = require('./setup/surnames.json');
		
		var i = 0;
		config.userMessage = "false";
		while (surnames[i]){
			i++;
		}
		var si = getRndInteger(0, i);
		var int = getRndInteger(0,si);
		var age = getRndInteger(18,120);
		var sp = getRndInteger(0,2);
		userManager.addUser(namesF[si]+"69",namesF[si],surnames[int],age,1,namesF[si]+surnames[int]+age+"@EndHo.EndHo","testing",sp,"I am Fake","anime#coding");
		count++;
	
		var int = getRndInteger(0,si);
		var age = getRndInteger(18,120);
		var sp = getRndInteger(0,2);
		userManager.addUser(namesM[si]+"69",namesM[si],surnames[int],age,0,namesM[si]+surnames[int]+age+"@EndHo.EndHo","testing",sp,"I am Fake","anime#coding");
		count++;
		console.log("EndHo: Added (".rainbow+count+") users".rainbow);
	}
	return (1);
}

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
	var userManager = require('./managers/userManager.js');
	var imageManager = require('./managers/imageManager.js');
	var images = require('./setup/defaultImages.json');
	var namesM = require('./setup/NamesM.json');
	var namesF = require('./setup/NamesM.json');
	var surnames = require('./setup/surnames.json');

	var si = 0;
	while (surnames[si]){
		si++;
	}
	console.log(si);
	await userManager.getAllUsers().then(async (users) => {
		await users.forEach(async (user) => {
			console.log(user);
			await tableManager.updateValue("images","image1" ,user.userid, images.img2);
			await tableManager.updateValue("images","image2" ,user.userid, images.img2);
			await tableManager.updateValue("images","image3" ,user.userid, images.img3);
			await tableManager.updateValue("images","image4" ,user.userid, images.img4);
			await tableManager.updateValue("images","image5" ,user.userid, images.img5);
		})
	})
	if (count <= 500){
		var myVar = setInterval(addNewUsers, 250);
	}
	var locationManager = require('./managers/locationManager.js');
	await locationManager.updateLocation(1, "capetown", "192.168.0.1", "none");
	await locationManager.getLocation(1);

	await userManager.getMatchedUsers(18,24,0,["coding","gaming"],1).then(async (value) => {
		(async() => {
			for (let user of value){
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
			};
		})();
	});
}