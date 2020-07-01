const express = require('express');
const router = express.Router();
const app = express();

app.set('view engine', 'pug');
app.use(express.static('../styles'));
app.use(express.static('../images'));
app.use(express.static('../scripts'));

router.post('/register', (req, res, next) => {
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
    if (req.body.female.checked){
        var sp = "0";
            userManager.addUser(username, name, surname, age, gender, email, pass, sp, bio, interests);
    } else if (req.body.male.checked){
        var sp = "1";
            userManager.addUser(username, name, surname, age, gender, email, pass, sp, bio, interests);
    }
});