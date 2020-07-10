// server.js
var express = require('express');
var app = express();
var port = 5005;

// our router
var router = require('./routes');
app.use('/', router);

// start the server
app.listen(port, function() {
  console.log('app started');
});

