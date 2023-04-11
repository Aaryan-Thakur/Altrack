var express = require('express');
var router = express.Router();
var auth = require('../controller/auth')
var data = require('../controller/dataset')
var food = require('../controller/fooddata')

/* GET home page. */
router.post('/register', function(req, res, next) {
  auth.register(req,res);
});

router.post('/login', function(req, res, next) {
  auth.login(req,res);
});

router.get('/data', function(req, res, next) {
  data.getdata(req,res);
});

router.post('/food', function(req, res, next) {
  food.fooddata(req,res);
});

router.get('/getfood', function(req, res, next) {
  food.getFoodData(req,res);
});


router.post('/addfood', function(req, res, next) {
  food.addUserFoodData(req,res);
});

router.post('/delentry', function(req, res, next) {
  food.delentry(req,res);
});

router.post('/entry', function(req, res, next) {
  food.entryInfo(req,res);
});

router.post('/uentry', function(req, res, next) {
  food.updateEntry(req,res);
});


module.exports = router;

