// require express
var express = require('express');
var path = require('path');
var app = express();
const userRoutes = require('./routes/users');

// create router object
var router = express.Router();

// export our router
module.exports = router;
app.use(express.static('styles'));
app.use(express.static('images'));
app.use(express.static('scripts'));
app.engine('pug', require('pug').__express);
app.set("view engine", "pug");
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// create router object
var router = express.Router();

















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

app.get('*', function(req, res) {
	res.render('error', {
		title:'Error',
		user: (req.session.user === undefined ? "Username" : req.session.user)
	});
});