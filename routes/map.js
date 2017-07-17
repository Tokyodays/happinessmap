var fs = require('fs');
var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var router = express.Router();
var util = require('util');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'bbb' });
});

module.exports = router;
