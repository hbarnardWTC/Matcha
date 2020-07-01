var userManager = require('../../matcha-backend/managers/userManager.js');
var $ = require( "jquery" );

function addUser(){
    var $ = require( "jquery" );
    var username = $("#username");
    var name = $("#name");
    var surname = $("#surname");
    var dob = new Date($("#dob"));
    var email = $("#email");
    var pass =$("#password");
    var bio = "hey";
    var interests = "none";
    var date = dob.getDate();
    var month = dob.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
    var year = dob.getFullYear();
    var d = new Date();
    var Sdate = d.getDate();
    var Smonth = d.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
    var Syear = d.getFullYear();
    var age = Syear - year;
    if ($("#female").checked){
        var sp = "0";
            userManager.addUser(username, name, surname, age, gender, email, pass, sp, bio, interests);
    } else if ($("#male").checked){
        var sp = "1";
            userManager.addUser(username, name, surname, age, gender, email, pass, sp, bio, interests);
    }
}