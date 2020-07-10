var userManager = require('../../matcha-backend/managers/userManager.js');
var $ = require( "jquery" );

function addUser(){
    var username = $("#username");
    var name = $("#name");
    var surname = $("#surname");
    var dob = new Date($("#dob"));
    var email = $("#email");
    var pass =$("#password");
    var bio = "hey";
    var interests = "none";
    var date = dob.getDate();
    var d = new Date();
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