// require express
var express = require('express');
var path = require('path');
var app = express();
var userManager = require('../matcha-backend/managers/userManager.js');
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// create router object
var router = express.Router();

// export our router
module.exports = router;
app.set('views', __dirname + './');
app.engine('pug', require('pug').__express);
app.set("view engine", "pug");
// route for our home page
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './index.html'));
})

// route for our signup page
router.get('/signup', function(req, res) {
    res.render('sign-up.pug');
})
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.post('/user/register', function(req, res, next) {
    console.log(req.body);
    var username = req.body.username;
    var name = req.body.name;
    var surname = req.body.surname;
    var dob = new Date(req.body.dob);
    var email = req.body.email;
    var pass = req.body.password;
    var bio = "hey";
    var interests = "none";
    var year = dob.getFullYear();
    var d = new Date();
    var Syear = d.getFullYear();
    var age = Syear - year;
    if (req.body.female == "on"){
        var sp = "0";
            userManager.addUser(username, name, surname, age, "1", email, pass, sp, bio, interests);
    } else if (req.body.male == "on"){
        var sp = "1";
            userManager.addUser(username, name, surname, age, "0", email, pass, sp, bio, interests);
    }
});
// route for our login page
router.get('/login', function(req, res) {
    res.send('hello world')
})
router.get('./contact');
router.post('./contact');