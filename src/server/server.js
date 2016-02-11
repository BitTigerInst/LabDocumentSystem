/**
 * Created by paul on 2/5/16.
 */

var express = require('express');
var app = express();

var port = process.env.PORT || 3000;


app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.listen(port, function() {
  console.log('the server is listening at port: ' + port);
});