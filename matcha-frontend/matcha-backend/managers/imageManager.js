var mysql = require('mysql');
var config = require('../setup/config.json');
var PCUsers = require('../setup/preConfigUsers.json');
const { on } = require('process');
const colors = require('colors');

module.exports = {
	addImage: function (userid, image){
		var con = mysql.createConnection(config.userDB);
		return new Promise(ret => {
			con.connect(function(err) {
				if (err) { { console.log("Endho: ".red+"Error Connecting To DB At addImage!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
				console.log("EndHo:".green+" Request To Add An Image For".blue+"("+userid+")");
				var sql = "Select * FROM ";
				var Tablename = "images";
				var options = " WHERE userid = ?";
				ret(new Promise(ret2 => {
					con.query(sql+Tablename+options, [userid],async function(err,result) {
						if (err) { console.log("Endho: ".red+"Error Selecting From Images Table!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
						if (config.debug == "true") {console.log(result);}
						if (result[0]){
        	    	    	if (result[0].image1 == null){
								await addImageAtId(userid,image,1);
								ret2("Success");
								con.end();
        	    	    	} else if (result[0].image2 == null){
        	    	    	    await addImageAtId(userid,image,2);
								ret2("Success");
								con.end();
        	    	    	} else if (result[0].image3 == null){
        	    	    	    await addImageAtId(userid,image,3);
								ret2("Success");
								con.end();
        	    	    	} else if (result[0].image4 == null){
        	    	    	    await addImageAtId(userid,image,4);
								ret2("Success");
								con.end();
        	    	    	} else if (result[0].image5 == null){
        	    	    	    await addImageAtId(userid,image,5);
								ret2("Success");
								con.end();
        	    	    	} else {
        	    	    	    console.log("EndHo: ".red+"Max Number Of Images Reached For ID".magenta+"("+userid+")");
        	    	    	    ret2("error_max");
								con.end();
							}
						} else {
							ret2("Error");
							con.end();
						}
					})
				}));
			});
		});
	},
	addImageById: function (userid,image,imageid){
		var con = mysql.createConnection(config.userDB);
		return new Promise(ret => {
			con.connect(function(err) {
				if (err) { { console.log("Endho: ".red+"Error Connecting To DB At addImageById!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
				var sql = "UPDATE ";
	    		var Tablename = "images";
				var options = " SET image"+imageid+" = ? WHERE userid = ?";
				ret(new Promise(ret2 => {
	    			con.query(sql+Tablename+options, [image,userid],function(err,result) {
	    				if (err) { console.log("Endho: ".red+"Error Adding Image By ID!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
						if (config.debug == "true") {console.log(result);}
						if (result.affectedRows == 1){
							console.log("EndHo:".green+" Added The Image".cyan);
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
  };



  function addImageAtId(userid,image,imageid){
	var con = mysql.createConnection(config.userDB);
	return new Promise(ret => {
		con.connect(function(err) {
			if (err) { { console.log("Endho: ".red+"Error Connecting To DB At addImageAtId!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
			var sql = "UPDATE ";
			var Tablename = "images";
			var options = " SET image"+imageid+" = ? WHERE userid = ?";
			ret(new Promise(ret2 => {
				con.query(sql+Tablename+options, [image,userid],function(err,result) {
					if (err) { console.log("Endho: ".red+"Error Adding Image At ID!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
					if (result.affectedRows == 1){
						console.log("EndHo:".green+" Added The Image".cyan);
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


async function updateUserImgs(userid,img1,img2,img3,img4,img5){
	console.log("update all images");
	var con = mysql.createConnection(config.userDB);
	return new Promise(ret => {
		con.connect(function(err) {
			if (err) { { console.log("Endho: ".red+"Error Connecting To DB At updateUserImgs!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;} }
			var sql = "UPDATE ";
			var Tablename = "images";
			var options = " SET image1 = ?, image2 = ?, image3 = ?, image4 = ?, image5 = ? WHERE userid = ?"
			ret(new Promise(ret2 => {
				con.query(sql+Tablename+options, [img1,img2,img3,img4,img5,userid],function(err,result) {
					if (err) { console.log("Endho: ".red+"Error updateUserImgs updateUserImgs!! Set Debug To (error) To View Details".magenta); if(config.debug == "error"){console.log("EndHo: ".red+err)}return;}
					if (config.debug == "true") {console.log(result);}
					console.log(result);
					if (result.affectedRows == 1){
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
module.exports.updateUserImgs = updateUserImgs;