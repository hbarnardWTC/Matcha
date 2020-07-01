// require express
var express = require('express');
var path = require('path');

// create router object
var router = express.Router();

// export our router
module.exports = router;

// route for our home page
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../index.html'));
})

// route for our signup page
router.get('/signup', function(req, res) {
    res.send('hello world')
})

// route for our login page
router.get('/login', function(req, res) {
    res.send('hello world')
})

router.get('./contact');
router.post('./contact');