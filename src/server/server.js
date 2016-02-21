/**
 * Created by paul on 2/5/16.
 */
/* jshint node:true */
'use strict';
var express = require('express');
var bodyParser = require('body-parser');
var timeout = require('connect-timeout');
var expressSession = require('express-session');
var passport = require('passport');
var path = require('path');
var _ = require('lodash');
var Logger = require('./utils/log-manager').Logger;
var app = express();

var port = process.env.PORT || 3000;
global.projectPath = path.resolve(__dirname, '../../');
app.use('/release', express.static(global.projectPath + '/release'));
app.use('/bower_components', express.static(global.projectPath + '/bower_components'));

app.use(timeout(300000));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(function (req, res, next) {
  console.log('request\'s body');
  console.log(req.body);
  next();
});

app.use(expressSession({
  secret: 'labDoc_session_salt',
  cookie: { maxAge: 86400000 }, // 1 day
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  req.logger = new Logger({
    session: req.session
  });
  next();
});

//app.get('/api/', function (req, res) {
//  res.cookie('localhost', 'test: true', { maxAge:  365 * 86400000 }).send('This is a test API!');
//});

require('./routes/userRouter')(app);

app.get('/index.html', function (req, res) {
  res.sendFile(global.projectPath + '/release/index.html');
});

app.listen(port, function () {
  console.log('the server is listening at port: ' + port);
});