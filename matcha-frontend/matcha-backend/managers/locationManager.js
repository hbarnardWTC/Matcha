var mysql = require('mysql');
var config = require('../setup/config.json');
var PCUsers = require('../setup/preConfigUsers.json');
const { on } = require('process');
const colors = require('colors');
const https = require('https');

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
	},
	getDistance: function (userid1,userid2){
		var con = mysql.createConnection(config.userDB);
		return new Promise(ret => {
			con.connect(function(err) {
        	    if (err) { { console.log("Endho: ".red+"Error Connecting To DB At getLocation!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
				console.log("EndHo:".green+" Request To Get Location for ID".blue+"("+")");
				var sql = "SELECT area,ip FROM ";
				var Tablename = "location";
				var options = " WHERE userid = ? OR userid = ?";
				ret(new Promise(data => {
					con.query(sql+Tablename+options, [userid1,userid2],async function(err,result) {
						if (err) { console.log("Endho: ".red+"Error Selecting area From Location!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
						if (config.debug == "true") {console.log(result);}
						console.log("EndHo:".green+" Got Location for".cyan+"("+"|at|"+result[0].area+")");
						data(new Promise(call1 => {
							https.get("https://maps.googleapis.com/maps/api/geocode/json?address="+result[0].area+"+"+result[0].ip+"&key=AIzaSyDCdn8N23XLWZNYKKfnG0uENNsTJQiGsnA", (resp) => {
								let data = '';
							  
								// A chunk of data has been recieved.
								resp.on('data', (chunk) => {
								  data += chunk;
								});
							  
								// The whole response has been received. Print out the result.
								resp.on('end', () => {
									var return1 = JSON.parse(data);
									call1(new Promise(call2 => {
										https.get("https://maps.googleapis.com/maps/api/geocode/json?address="+result[1].area+"+"+result[1].ip+"&key=AIzaSyDCdn8N23XLWZNYKKfnG0uENNsTJQiGsnA", (resp) => {
											let data3 = '';
										
											// A chunk of data has been recieved.
											resp.on('data', (chunk) => {
											  data3 += chunk;
											});
										
											// The whole response has been received. Print out the result.
											resp.on('end', () => {
											  var return2 = JSON.parse(data3);
											  var mk1 = return1.results[0].geometry;
											  var mk2 = return2.results[0].geometry;
											  var R = 6371.0710; // Radius of the Earth in miles
												var rlat1 = mk1.location.lat * (Math.PI/180); // Convert degrees to radians
												var rlat2 = mk2.location.lat * (Math.PI/180); // Convert degrees to radians
												var difflat = rlat2-rlat1; // Radian difference (latitudes)
												var difflon = (mk2.location.lng-mk1.location.lng) * (Math.PI/180); // Radian difference (longitudes)
												var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
												call2(Math.round(d));
											});
										
										  }).on("error", (err) => {
											console.log("Error: " + err.message);
										  });
										}));
								});
							  
							  }).on("error", (err) => {
								console.log("Error: " + err.message);
							  });
						}));
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

  function distAjax(res1,res2){
	https.get("https://maps.googleapis.com/maps/api/geocode/json?address="+res1.area+"+"+res1.ip+"&key=AIzaSyDCdn8N23XLWZNYKKfnG0uENNsTJQiGsnA", (resp) => {
		let data = '';
	  
		// A chunk of data has been recieved.
		resp.on('data', (chunk) => {
		  data += chunk;
		});
	  
		// The whole response has been received. Print out the result.
		resp.on('end', () => {
			var return1 = JSON.parse(data);
			https.get("https://maps.googleapis.com/maps/api/geocode/json?address="+res2.area+"+"+res2.ip+"&key=AIzaSyDCdn8N23XLWZNYKKfnG0uENNsTJQiGsnA", (resp) => {
				let data3 = '';
			  
				// A chunk of data has been recieved.
				resp.on('data', (chunk) => {
				  data3 += chunk;
				});
			  
				// The whole response has been received. Print out the result.
				resp.on('end', () => {
				  var return2 = JSON.parse(data3);
				  return (haversine_distance(return1.results[0].geometry,return2.results[0].geometry));
				});
			  
			  }).on("error", (err) => {
				console.log("Error: " + err.message);
			  });
		});
	  
	  }).on("error", (err) => {
		console.log("Error: " + err.message);
	  });
  }
  function haversine_distance(mk1, mk2) {
	var R = 6371.0710; // Radius of the Earth in miles
	var rlat1 = mk1.location.lat * (Math.PI/180); // Convert degrees to radians
	var rlat2 = mk2.location.lat * (Math.PI/180); // Convert degrees to radians
	var difflat = rlat2-rlat1; // Radian difference (latitudes)
	var difflon = (mk2.location.lng-mk1.location.lng) * (Math.PI/180); // Radian difference (longitudes)
	var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
	return(Math.round(d));
  }