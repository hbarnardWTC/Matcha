var mysql = require('mysql');
var config = require('../setup/config.json');
var PCUsers = require('../setup/preConfigUsers.json');
const { on } = require('process');
var mailManager = require('./mailManager.js');
const colors = require('colors');


module.exports = {
	addView: function (viewer, viewed){
		var con = mysql.createConnection(config.userDB);
		return new Promise(ret => {
			con.connect(function(err) {
				if (err) { { console.log("Endho: ".red+"Error Connecting To DB At createStatus!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
				if (config.userMessage == "true"){console.log("EndHo:".green+" Creating a Status for ID".blue+"()");}
				var sql = "INSERT INTO ";
				var Tablename = "newviews";
				var options = "(viewer,viewed)";
				var values = " VALUES('"+
				viewer+"','"+
				viewed
				+"')";
				ret(new Promise(ret2 => {
					con.query(sql+Tablename+options+values,function(err,result) {
						if (err) { console.log("Endho: ".red+"Error Creating A Status!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
						if (config.debug == "true") {console.log(result);}
						if (result.affectedRows == 1){
                            if (config.userMessage == "true"){console.log("EndHo:".green+" Created a Status for".cyan+"("+")");}
                            addToAllViews(viewer,viewed);
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
	getNewViews: function (viewed){
		var con = mysql.createConnection(config.userDB);
		return new Promise(ret => {
			con.connect(function(err) {
				if (err) { { console.log("Endho: ".red+"Error Connecting To DB At getNewViews!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
				console.log("EndHo:".green+" Request To getNewViews for ID".blue+"("+")");
				var sql = "SELECT viewers FROM ";
				var Tablename = "newviews";
				var options = " WHERE viewed = ?";
				ret(new Promise(data => {
					con.query(sql+Tablename+options, [viewed],function(err,result) {
						if (err) { console.log("Endho: ".red+"Error Selecting getNewViews!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
                        if (config.debug == "true") {console.log(result);}
                        if (result[0]){
                            console.log("EndHo:".green+" Got getNewViews for".cyan+"("+")");
						    data(result)
                        } else {
                            data("error");
                        }
						con.end();
					})
				}))
			});
		});
	},
	getAllViews: function (viewer){
		var con = mysql.createConnection(config.userDB);
		return new Promise(ret => {
			con.connect(function(err) {
				if (err) { { console.log("Endho: ".red+"Error Connecting To DB At getAllViews!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
				console.log("EndHo:".green+" Request To getAllViews for ID".blue+"("+")");
				var sql = "SELECT viewed FROM ";
				var Tablename = "allviews";
				var options = " WHERE viewer = ?";
				ret(new Promise(data => {
					con.query(sql+Tablename+options, [viewer],function(err,result) {
						if (err) { console.log("Endho: ".red+"Error Selecting getAllViews!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
                        if (config.debug == "true") {console.log(result);}
                        if (result[0]){
                            console.log("EndHo:".green+" Got getAllViews for".cyan+"("+")");
						    data(result)
                        } else {
                            data("error");
                        }
						con.end();
					})
				}))
			});
		});
	},
	removeViews: function (viewer){
		var con = mysql.createConnection(config.userDB);
		return new Promise(ret => {
			con.connect(function(err) {
				if (err) { { console.log("Endho: ".red+"Error Connecting To DB At removeViews!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
				console.log("EndHo:".green+" Request To removeViews for ID".blue+"("+userid+")");
				var sql = "DELETE * FROM ";
				var Tablename = "newviews";
				var options = " WHERE viewer = ?";
				ret(new Promise(data => {
					con.query(sql+Tablename+options, [viewer],function(err,result) {
						if (err) { console.log("Endho: ".red+"Error Selecting removeViews!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
                        if (config.debug == "true") {console.log(result);}
                        if (result[0]){
                            console.log("EndHo:".green+" Got removeViews for".cyan+"("+userid+")");
						    data(result)
                        } else {
                            data("error");
                        }
						con.end();
					})
				}))
			});
		});
	}
  };
function addToAllViews(viewer,viewed){
      var con = mysql.createConnection(config.userDB);
      return new Promise(ret => {
          con.connect(function(err) {
              if (err) { { console.log("Endho: ".red+"Error Connecting To DB At createStatus!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
              if (config.userMessage == "true"){console.log("EndHo:".green+" Creating a Status for ID".blue+"("+")");}
              var sql = "INSERT INTO ";
              var Tablename = "allviews";
              var options = "(viewer,viewed)";
              var values = " VALUES('"+
              viewer+"','"+
              viewed
              +"')";
              ret(new Promise(ret2 => {
                  con.query(sql+Tablename+options+values,function(err,result) {
                      if (err) { console.log("Endho: ".red+"Error Creating A Status!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
                      if (config.debug == "true") {console.log(result);}
                      if (result.affectedRows == 1){
                          if (config.userMessage == "true"){console.log("EndHo:".green+" Created a Status for".cyan+"("+")");}
                          mailManager.sendEmail(viewed,viewer,"view");
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