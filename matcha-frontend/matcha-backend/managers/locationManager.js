var mysql = require('mysql');
var config = require('../setup/config.json');
var PCUsers = require('../setup/preConfigUsers.json');
const { on } = require('process');
const colors = require('colors');

module.exports = {
	updateLocation: function (userid, area,ip,apiKey){
		var con = mysql.createConnection(config.userDB);
		return new Promise(ret => {
			con.connect(function(err) {
				if (err) { { console.log("Endho: ".red+"Error Connecting To DB At updateLocation!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
        	    console.log("EndHo:".green+" Updating Location of".blue+"("+userid+")");
        	    var sql = "SELECT * FROM ";
			    var Tablename = "location";
				var options = " WHERE userid = ?";
				ret(new Promise(ret2 => {
			    	con.query(sql+Tablename+options, [userid],async function(err,result) {
			    		if (err) { console.log("Endho: ".red+"Error Selecting * From location!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
        	    	    if (config.debug == "true") {console.log(result);}
        	    	    if (result[0]){
        	    	        if (result[0].userid = userid){
        	    	            var sql = "UPDATE ";
					            var Tablename = "location";
								var options = " SET area = ?, ip = ?, apiKey = ? WHERE userid = ?";
								ret2(new Promise(ret3 => {
					            	con.query(sql+Tablename+options, [area,ip,apiKey,userid],function(err,result) {
					            		if (err) { console.log("Endho: ".red+"Error Updating Location!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
										if (config.debug == "true") {console.log(result);}
										if (result.affectedRows == 1){
											console.log("EndHo:".green+" Updated The Location of".cyan+"("+userid+")");
											ret3("Success");
											con.end();
										} else {
											ret3("Error");
											con.end();
										}
									})
								}));
        	    	        } else {
        	    	            await createLocation(userid,area,ip,apiKey).then(val => {
									ret2(val);
									con.end();
								});
        	    	        }
        	    	    } else {
        	    	        await createLocation(userid,area,ip,apiKey).then(val => {
								ret2(val);
								con.end();
							});
        	    	    }
			    	})
				}));
			});
		});
	},
	getLocation: function (userid){
		var con = mysql.createConnection(config.userDB);
		return new Promise(ret => {
			con.connect(function(err) {
        	    if (err) { { console.log("Endho: ".red+"Error Connecting To DB At getLocation!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
				console.log("EndHo:".green+" Request To Get Location for ID".blue+"("+userid+")");
				var sql = "SELECT area,ip FROM ";
				var Tablename = "location";
				var options = " WHERE userid = ?";
				ret(new Promise(data => {
					con.query(sql+Tablename+options, [userid],function(err,result) {
						if (err) { console.log("Endho: ".red+"Error Selecting area From Location!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
						if (config.debug == "true") {console.log(result);}
						console.log("EndHo:".green+" Got Location for".cyan+"("+userid+"|at|"+result[0].area+")");
						data(result[0]);
						con.end();
					})
				}))
			});
		});
	}
  };

  function createLocation(userid,area,ip,apiKey){
    console.log("EndHo:".green+" No Location Entry Was Found".cyan);
	var con = mysql.createConnection(config.userDB);
	return new Promise(ret => {
    	con.connect(function(err) {
    	    if (err) { { console.log("Endho: ".red+"Error Connecting To DB At createLocation!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
    	    console.log("EndHo:".green+" Creating a Location Entry for ID".blue+"("+userid+")");
    	    var sql = "INSERT INTO ";
    	    var Tablename = "location";
    	    var options = "(userid,area,ip,apiKey)";
			var values = " VALUES(?,?,?,?)"
			ret(new Promise(ret2 => {
    	    	con.query(sql+Tablename+options+values,[userid,area,ip,apiKey],function(err,result) {
    	    	    if (err) { console.log("Endho: ".red+"Error Creating A New Location!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
    	    	    if (config.debug == "true") {console.log(result);}
					if (result.affectedRows == 1){
						console.log("EndHo:".green+" Created a Location Entry for".cyan+"("+userid+")");
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
  }