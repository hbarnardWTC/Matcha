// require express
var express = require('express');
var path = require('path');
var app = express();
var userManager = require('../matcha-backend/managers/userManager.js');

// create router object
var router = express.Router();

// export our router
module.exports = router;
app.set('views', __dirname + './');
app.engine('pug', require('pug').__express)
app.set("view engine", "pug");
// route for our home page
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../index.html'));
})

// route for our signup page
router.get('/signup', function(req, res) {
    res.render('sign-up.pug');
})

// route for our login page
router.get('/login', function(req, res) {
    res.send('hello world')
})
router.get('./contact');
router.post('./contact');