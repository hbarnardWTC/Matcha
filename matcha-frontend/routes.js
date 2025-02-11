// require express
var express = require('express');
var session = require('express-session');
var path = require('path');
var app = express();
var userManager = require('./matcha-backend/managers/userManager.js');
var tableManager = require('./matcha-backend/managers/tableManager.js');
var locationManager = require('./matcha-backend/managers/locationManager.js');
var chatManager = require('./matcha-backend/managers/chatManager.js');
var viewManager = require('./matcha-backend/managers/viewManager.js');
var matchManager = require('./matcha-backend/managers/matchManager.js');
var notificationManager = require('./matcha-backend/managers/notificationManager.js');
var bodyParser = require('body-parser');
const { table } = require('console');
const imageManager = require('./matcha-backend/managers/imageManager.js');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// create router object 
var router = express.Router();
var ssn;
router.use(session({secret:'XASDASDA'}));
app.use(session({secret:'XASDASDA'}));
// export our router
module.exports = router;
app.set('views', __dirname + './');
app.engine('pug', require('pug').__express);
app.set("view engine", "pug");

router.use('/images', express.static(__dirname + '/images'));
// route for our home page
router.get('/', function(req, res) {
    ssn = req.session;
    if (!ssn.userid || !ssn.verified || ssn.userid == null || ssn.verified == false){
        res.redirect('/login')
    } else {
        res.redirect("/home");
    }
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
    if (req.body.gender == "Female"){
        var sp = "0";
            userManager.addUser(username, name, surname, age, "1", email, pass, sp, bio, interests);
    } else if (req.body.gender == "Male"){
        var sp = "1";
            userManager.addUser(username, name, surname, age, "0", email, pass, sp, bio, interests);
    }
    res.redirect('/login')
});
router.get('/user/getNotifications', async function(req, res, next) {
    ssn = req.session;
    if (!ssn.userid || !ssn.verified || ssn.userid == null || ssn.verified == false){
        res.redirect('/login')
    } else {
        await notificationManager.getNotifications(ssn.userid).then(val => {
            res.send(val);
        })
    }
});
router.post('/user/getAllUsers', function(req, res, next) {
    ssn = req.session;
    if (!ssn.userid || !ssn.verified || ssn.userid == null || ssn.verified == false){
        res.redirect('/login')
    } else {
        matchManager.getMatchedUsersTrue(ssn.userid).then(users => {
            res.send(users);
        })
    }
});
router.get('/user/getRandomUser', async function(req, res, next) {
    ssn = req.session;
    if (!ssn.userid || !ssn.verified || ssn.userid == null || ssn.verified == false){
        res.redirect('/login')
    } else {
        var newId = ssn.userid;
        await tableManager.getValues("users",["userid"]).then(vals => {
            var max = 0;
            while (vals[max]){
                max++;
            }
            console.log(max);
            while (newId == ssn.userid){
                newId = getRndInteger(1, max);
            }

        });
        await userManager.getUserById(newId).then(user => {
            viewManager.addView(ssn.userid,user.userid);
            res.send(user);
        });
    }
});
router.get('/user/createMatch', async function(req, res, next) {
    ssn = req.session;
    if (!ssn.userid || !ssn.verified || ssn.userid == null || ssn.verified == false){
        res.redirect('/login')
    } else {
       matchManager.createMatch(ssn.userid,req.query.userid);
       res.send("");
    }
});
router.get('/user/addLikeYes', async function(req, res, next) {
    ssn = req.session;
    if (!ssn.userid || !ssn.verified || ssn.userid == null || ssn.verified == false){
        res.redirect('/login')
    } else {
       matchManager.addLike(ssn.userid,req.query.userid).then(val => {
           res.send(val);
       })
    }
});
router.get('/user/getUserById', async function(req, res, next) {
    ssn = req.session;
    if (!ssn.userid || !ssn.verified || ssn.userid == null || ssn.verified == false){
        res.redirect('/login')
    } else {
        userManager.getUserById(req.query.userid).then(user => {
            res.send(user);
        });
    }
});
router.get('/user/getLikes', async function(req, res, next) {
    ssn = req.session;
    if (!ssn.userid || !ssn.verified || ssn.userid == null || ssn.verified == false){
        res.redirect('/login')
    } else {
        if (req.query.userid != "logged"){
            matchManager.getLikes(req.query.userid).then(val => {
                res.send(val);
            })
        } else {
            matchManager.getLikes(ssn.userid).then(val => {
                res.send(val);
            })
        }
    }
});
router.get('/user/getUserImages', async function(req, res, next) {
    ssn = req.session;
    if (!ssn.userid || !ssn.verified || ssn.userid == null || ssn.verified == false){
        res.redirect('/login')
    } else {
        if (req.query.userid != "logged"){
            await tableManager.getValues("images",["image1","image2","image3","image4","image5"],req.query.userid).then(vals => {
                res.send(vals);
            });
        } else {
            await tableManager.getValues("images",["image1","image2","image3","image4","image5"],ssn.userid).then(vals => {
                res.send(vals);
            });
        }
    }
});
router.get('/user/getMatchedUsers', async function(req, res, next) {
    ssn = req.session;
    if (!ssn.userid || !ssn.verified || ssn.userid == null || ssn.verified == false){
        res.redirect('/login')
    } else {
        await userManager.getMatchedUsers()
    }
});
router.get('/user/getMatchingUsers', async function(req, res, next) {
    ssn = req.session;
    if (!ssn.userid || !ssn.verified || ssn.userid == null || ssn.verified == false){
        res.redirect('/login')
    } else {
        var usersL = {
            "users": new Array(),
            "dist": new Array()
        }
        await userManager.getAG(ssn.userid).then(async ret => {
            await userManager.getMatchedUsers((ret.age-req.query.maxAgeRange),(ret.age+req.query.maxAgeRange),ret.gender,req.query.interests,req.query.sp).then(async userids => {
                (async() => {
                    for (let id of userids) {
                        await matchManager.getLikes(id).then(async likes => {
                            if (likes > req.query.minLikes){
                                await locationManager.getDistance(ssn.userid,id).then(async dist => {
                                    console.log(dist);
                                    console.log(req.query.maxDist);
                                    if (dist < req.query.maxDist){
                                        await userManager.getUserById(id).then(user => {
                                            usersL.users.push(user);
                                            usersL.dist.push(dist);
                                            console.log(usersL.users.length);
                                            console.log(userids.length);
                                        })
                                    }
                                })
                            }
                        })
                    }
                    res.send(usersL);
                  })();
            })
        })
    }
});
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
router.get('/user/getMatchedUser', function(req, res, next) {
    ssn = req.session;
    if (!ssn.userid || !ssn.verified || ssn.userid == null || ssn.verified == false){
        res.redirect('/login')
    } else {
        var returnV = {
            "username": "",
            "userid": req.query.userid,
            "latestMessage": ""
        };
        chatManager.getMessages(ssn.userid,req.query.userid).then(messages =>{
            var counter = 0;
            var counter2 = 0;
            console.log(messages);
            if (messages != "Error"){
                var GM = JSON.parse(messages[1]);
                GM.forEach(message => {
                    counter++;
                });
                GM.forEach(message => {
                    if (counter2 == counter-1){
                        returnV.latestMessage = message.message;
                    }
                    counter2++;
                });
            }
            tableManager.getValues("users",["username"],req.query.userid).then(val => {
                returnV.username = val[0].username;
                res.send(returnV);
            })
        })
    }
});
router.get('/message/send', function(req, res, next) {
    ssn = req.session;
    if (!ssn.userid || !ssn.verified || ssn.userid == null || ssn.verified == false){
        res.redirect('/login')
    } else {
        chatManager.addMessage(ssn.userid,req.query.userid2,req.query.message).then(ret => {
            res.redirect('/chats')
        });
    }
});
router.get('/user/updateLocation', function(req, res, next) {
    ssn = req.session;
    if (!ssn.userid || !ssn.verified || ssn.userid == null || ssn.verified == false){
        res.redirect('/login')
    } else {
        locationManager.updateLocation(ssn.userid,req.query.area,req.query.ip,req.query.apiKey).then(val => {
            res.send("");
        })
    }
});
router.get('/user/getLocation', function(req, res, next) {
    ssn = req.session;
    if (!ssn.userid || !ssn.verified || ssn.userid == null || ssn.verified == false){
        res.redirect('/login')
    } else {
        console.log(req.query.userid);
        if (req.query.userid == "logged"){
            locationManager.getLocation(ssn.userid).then(val => {
                res.send(val);
            })
        } else if (req.query.userid) {
            locationManager.getLocation(req.query.userid).then(val => {
                res.send(val);
            })
        }
    }
});
router.get('/message/getMessages', function(req, res, next) {
    ssn = req.session;
    if (!ssn.userid || !ssn.verified || ssn.userid == null || ssn.verified == false){
        res.redirect('/login')
    } else {
        chatManager.getMessages(ssn.userid,req.query.userid_2).then(ret => {
            res.send(ret);
        });
    }
});

router.post('/user/login', function(req, res, next) {
    var email = req.body.email;
    var pass = req.body.password;
    ssn = req.session;
    userManager.authUser(email, pass).then(userid =>{
        if (userid != "Error" && userid != "error" && userid != "Wrong Pass"){
            userManager.getVerEmail(userid).then(stat => {
                console.log(stat[0].verified);
                if (stat[0].verified == 'false'){
                    ssn.verified = false;
                    res.redirect('/login');
                } else if (stat[0].verified == 'true'){
                    ssn.userid = userid;
                    ssn.verified = true;
                    res.redirect('/');
                } else {
                    console.log("error");
                    res.redirect('/login');
                }
            })
        } else {
            res.redirect('/login')
        }
    })
});

router.get('/user/getCurrentUser', async function(req, res, next) {
    ssn = req.session;
    if (!ssn.userid || !ssn.verified || ssn.userid == null || ssn.verified == false){
        res.redirect('/login')
    } else {
       await userManager.getUserById(ssn.userid).then(user => {
               res.send(user);
       });
    }
});

router.get('/user/verifyEmail', async function(req, res, next) {
    ssn = req.session;
    await userManager.verifyEmail(req.query.userid, req.query.email).then(status => {
        console.log(status);
        if (status == 'Success') {
            ssn.verified == true;
            res.redirect('/validate')
        } else {
            res.redirect('/failure')
        }
    });
});
router.get('/user/update', async function(req, res, next) {
    ssn = req.session;
    if(ssn.userid && ssn.verified) {
        var vals = req.query;
        await userManager.updateUserVals(ssn.userid,vals.name,vals.surname,vals.username,vals.email,vals.password,vals.sp,vals.ints,vals.bio,vals.gender).then(status => {
            res.send(status);
        })
    } else {
        res.redirect('/login');
    }
});
router.get('/user/updateImages', async function(req, res, next) {
    console.log("Update/Images");
    ssn = req.session;
    if(ssn.userid && ssn.verified) {
        var vals = req.query;
        console.log("Update/ImagesV");
        console.log(vals);
        await imageManager.updateUserImgs(ssn.userid,vals.img1,vals.img2,vals.img3,vals.img4,vals.img5).then(status => {
            res.send(status);
        })
    } else {
        res.redirect('/login');
    }
});
router.get('/user/updateAddress', async function(req, res, next) {
    ssn = req.session;
    if(ssn.userid && ssn.verified) {
        var vals = req.query;
        var area = vals.address.split(",");
        await locationManager.updateLocation(ssn.userid,area[0],area[1],"AIzaSyDCdn8N23XLWZNYKKfnG0uENNsTJQiGsnA").then(status => {
            res.send(status);
        })
    } else {
        res.redirect('/login');
    }
});


// route for our login page
router.get('/login', function(req, res) {
    res.render('login.pug')
})
router.get('/logout', function(req, res) {
    ssn = req.session;
    if(ssn.userid && ssn.verified) {
        delete ssn.userid;
        res.redirect('/login');
    } else {
        res.redirect('/login');
    } 
})

// route for our home page
router.get('/home', function(req, res) {
    ssn = req.session;
    if (!ssn.userid || !ssn.verified || ssn.userid == null || ssn.verified == false){
        res.redirect('/login')
    } else {
        res.render('home.pug')
    }
})

// route for our chats
router.get('/chats', function(req, res) {
    ssn = req.session;
    if (!ssn.userid || !ssn.verified || ssn.userid == null || ssn.verified == false){
        res.redirect('/login')
    } else {
        res.render('chat.pug')
    }
})

// route for our profile editing
router.get('/editing', function(req, res) {
    ssn = req.session;
    if (!ssn.userid || !ssn.verified || ssn.userid == null || ssn.verified == false){
        res.redirect('/login')
    } else {
        res.render('edit.pug')
    }
})

// route for validated
router.get('/validate', function(req, res) {
    ssn = req.session;
    if (!ssn.userid || !ssn.verified || ssn.userid == null || ssn.verified == false){
        res.redirect('/login')
    } else {
        res.render('validated.pug')
    }
})

// route for fail to validate
router.get('/failure', function(req, res) {
    ssn = req.session;
    if (!ssn.userid || !ssn.verified || ssn.userid == null || ssn.verified == false){
        res.redirect('/login')
    } else {
        res.render('failure.pug')
    }
})

// route for sent email
router.get('/sent', function(req, res) {
    ssn = req.session;
    if (!ssn.userid || !ssn.verified || ssn.userid == null || ssn.verified == false){
        res.redirect('/login')
    } else {
        res.render('sent.pug')
    }
})

// route for our profile editing
router.get('/search', function(req, res) {
    ssn = req.session;
    if (!ssn.userid || !ssn.verified || ssn.userid == null || ssn.verified == false){
        res.redirect('/login')
    } else {
        res.render('search.pug')
    }
})

// route for testing
router.get('/test', function(req, res) {
    ssn = req.session;
    if (!ssn.userid || !ssn.verified || ssn.userid == null || ssn.verified == false){
        res.redirect('/login')
    } else {
        res.render('tests.pug')
    }
})

router.get('./contact');
router.post('./contact');