var express = require('express');
var router = express.Router();
var auth = require('../controller/auth')

/* GET home page. */
router.post('/register', function(req, res, next) {
  auth.register(req,res);
});

router.post('/login', function(req, res, next) {
  auth.login(req,res);
});

module.exports = router;

