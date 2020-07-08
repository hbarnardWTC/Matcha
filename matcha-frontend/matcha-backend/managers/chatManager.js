var mysql = require('mysql');
var config = require('../setup/config.json');
var PCUsers = require('../setup/preConfigUsers.json');
var statusManager = require('./statusManager.js');
const colors = require('colors');

module.exports = {
    //from user_1 to user_2
	addMessage: function (user_1, user_2, message){
		var con = mysql.createConnection(config.userDB);
		return new Promise(ret => {
			con.connect(function(err) {
        	    if (err) { { console.log("Endho: ".red+"Error Connecting To DB At addMessage!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
        	    console.log("EndHo:".green+" Checking if messages between users exists".blue);
				var sql = 'SELECT userid_1, userid_2, messages_1, messages_2 FROM `chats` WHERE userid_1 = ? AND userid_2 = ?';
				ret(new Promise(ret2 => {
					con.query(sql, [user_1,user_2], function(err,result) {
						if (err) { console.log("Endho: ".red+"Error Selecting * From Chats!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
						if (config.debug == "true") {console.log(result);}
						if (result[0]){
							if (config.debug == "basic") {console.log("EndHo:".green+" messages exist ("+result[0].messages_1+"|"+result[0].messages_2+")")}
							ret2("done");
							updateChat1(user_1,user_2,message);
						} else {
							var sql = 'SELECT userid_1, userid_2, messages_1, messages_2 FROM `chats` WHERE userid_1 = ? AND userid_2 = ?';
							ret2(new Promise(ret3 => {
					        	con.query(sql, [user_2,user_1], function(err,result) {
					        		if (err) { console.log("Endho: ".red+"Error Selecting * From Chats!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
					        		if (config.debug == "true") {console.log(result);}
					        		if (result[0]){
										if (config.debug == "basic") {console.log("EndHo:".green+" messages exist ("+result[0].messages_1+"|"+result[0].messages_2+")")}
										ret3("done");
										updateChat2(user_1,user_2,message);
					        		} else {
										console.log("EndHo:".red+" no messages".magenta);
										ret3("done");
										createChat(user_1,user_2,message);
        	    	        	    }
								});
							}))
        	    	    }
					});
				}))
			});
		});
	},
	getMessages: function (user_1, user_2){
		var con = mysql.createConnection(config.userDB);
		return new Promise(ret => {
			con.connect(function(err) {
        	    if (err) { { console.log("Endho: ".red+"Error Connecting To DB At getMessages!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
        	    console.log("EndHo:".green+" Checking if messages between users exists".blue);
				var sql = 'SELECT messages_1, messages_2 FROM `chats` WHERE userid_1 = ? AND userid_2 = ?';
				ret(new Promise(ret2 => {
					con.query(sql, [user_1,user_2], function(err,result) {
						if (err) { console.log("Endho: ".red+"Error Selecting Messages From Chats!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
						if (config.debug == "true") {console.log(result);}
						if (result[0]){
							console.log("EndHo:".green+" messages exist".cyan);
							var messages = [result[0].messages_1,result[0].messages_2];
							if (config.debug == "basic") {
								console.log("EndHo: ".green+"messages from userid_1".bgBlue);
								console.log("EndHo: ".green+"L ".bold.bgBlue+result[0].messages_1);
								console.log("EndHo: ".green+"messages from userid_2".bgRed);
								console.log("EndHo: ".green+"L ".bold.bgRed+result[0].messages_2);
							}
							ret2(messages);
						} else {
							var sql = 'SELECT messages_1, messages_2 FROM `chats` WHERE userid_1 = ? AND userid_2 = ?';
							ret2(new Promise(ret3 => {
					        	con.query(sql, [user_2,user_1], function(err,result) {
					        		if (err) { console.log("Endho: ".red+"Error Selecting Messages From Chats!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
					        		if (config.debug == "true") {console.log(result);}
					        		if (result[0]){
										console.log("EndHo:".green+" messages exist".cyan);
										var messages = [result[0].messages_2,result[0].messages_1];
										if (config.debug == "basic") {
											console.log("EndHo: ".green+"messages from userid_1".bgBlue);
											console.log("EndHo: ".green+"L ".bold.bgBlue+result[0].messages_2);
											console.log("EndHo: ".green+"messages from userid_2".bgRed);
											console.log("EndHo: ".green+"L ".bold.bgRed+result[0].messages_1);
										}
										ret3(messages);
					        		} else {
										console.log("EndHo:".red+" no messages".magenta);
										ret3("error");
        	    	        	    }
								});
							}))
        	    	    }
					});
				}))
			});
		});
	}
  };

  function createChat(user_1,user_2,messages_1){
	var con = mysql.createConnection(config.userDB);
	var date = new Date();
	var chat1 = [{
		"message": messages_1,
		"time": date.toString("YYYY-MM-DD H:mm:ss")
	}];
	var chat2 = new Array();
	con.connect(function(err) {
		if (err) { { console.log("Endho: ".red+"Error Connecting To DB At createChat!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
		console.log("EndHo:".green+" Creating a new chat".blue);
		var sql = "INSERT INTO ";
		var Tablename = "chats";
		var options = "(userid_1,userid_2,messages_1,messages_2)";
		var values = " VALUES('"+
		user_1+"','"+
		user_2+"','"+
		JSON.stringify(chat1)+"','"+
		JSON.stringify(chat2)
		+"')";
		con.query(sql+Tablename+options+values,function(err,result) {
			if (err) { console.log("Endho: ".red+"Error Creating A Chat!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
			if (config.debug == "true") {console.log(result);}
			console.log("EndHo:".green+" Created A New chat".cyan);
			return;
		})
		return;
	});
  }

  function updateChat1(user_1,user_2,message){
	var con = mysql.createConnection(config.userDB);
	con.connect(function(err) {
		if (err) { { console.log("Endho: ".red+"Error Connecting To DB At updateChat1!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
		console.log("EndHo:".green+" Requesting ".blue+"("+user_1+"|"+user_2+") "+"chat".blue);
		var sql = "SELECT messages_1 FROM ";
		var Tablename = "chats";
		var options = " WHERE ";
		var values = "userid_1 = ? AND userid_2 = ?";
		con.query(sql+Tablename+options+values, [user_1,user_2], function(err,result) {
			if (err) { console.log("Endho: ".red+"Error Selecting Messages_1!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
			if (config.debug == "true") {console.log(result);}
			console.log("EndHo:".green+" Found The Chat".cyan);
			var con = mysql.createConnection(config.userDB);
			con.connect(function(err) {
				if (err) { { console.log("Endho: ".red+"Error Connecting To DB At UpdateChat1 con2!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
				console.log("EndHo:".green+" Updating ".blue+"("+user_1+"|"+user_2+") "+"chat".blue);
				var sql = "Update ";
				var Tablename = "chats";
				var options = " SET ";
				var values = "messages_1 = ? WHERE userid_1 = ? AND userid_2 = ?";
				var text = JSON.parse(result[0].messages_1);
				var date = new Date();
				var newMessage = {
					"message": message,
					"time": date.toString("YYYY-MM-DD H:mm:ss")
				}
				text.push(newMessage);
				con.query(sql+Tablename+options+values, [JSON.stringify(text),user_1,user_2], function(err,result) {
					if (err) { console.log("Endho: ".red+"Error Updating Messages_1!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
					if (config.debug == "true") {console.log(result);}
					console.log("EndHo:".green+" Updated The Chat".cyan);
					return;
				})
				return;
			});
			return;
		})
		return;
	});
  }
  function updateChat2(user_1,user_2,message){
	var con = mysql.createConnection(config.userDB);
	con.connect(function(err) {
		if (err) { { console.log("Endho: ".red+"Error Connecting To DB At updateChat2!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
		console.log("EndHo:".green+" Requesting ".blue+"("+user_2+"|"+user_1+") "+"chat".blue);
		var sql = "SELECT messages_2 FROM ";
		var Tablename = "chats";
		var options = " WHERE ";
		var values = "userid_1 = ? AND userid_2 = ?";
		con.query(sql+Tablename+options+values, [user_2,user_1], function(err,result) {
			if (err) { console.log("Endho: ".red+"Error Selecting Messages_2!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
			if (config.debug == "true") {console.log(result);}
			console.log("EndHo:".green+" Found The Chat".cyan);
			var con = mysql.createConnection(config.userDB);
			con.connect(function(err) {
				if (err) { { console.log("Endho: ".red+"Error Connecting To DB At UpdateChat2 con2!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
				console.log("EndHo:".green+" Updating ".blue+"("+user_2+"|"+user_1+") "+"chat".blue);
				var sql = "Update ";
				var Tablename = "chats";
				var options = " SET ";
				var values = "messages_2 = ? WHERE userid_1 = ? AND userid_2 = ?";
				var text = JSON.parse(result[0].messages_2);
				var date = new Date();
				var newMessage = {
					"message": message,
					"time": date.toString("YYYY-MM-DD H:mm:ss")
				}
				text.push(newMessage);
				con.query(sql+Tablename+options+values, [JSON.stringify(text),user_2,user_1], function(err,result) {
					if (err) { console.log("Endho: ".red+"Error Updating Messages_2!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
					if (config.debug == "true") {console.log(result);}
					console.log("EndHo:".green+" Updated The Chat".cyan);
					return;
				})
				return;
			});
			return;
		})
		return;
	});
  }