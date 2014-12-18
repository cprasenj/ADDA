var express = require('express');
var router = express.Router();
var records = require("../ownModules/addaRecords.js").Create("./data/topics.json");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Home' });
});

router.get("/dashboard",function(req,res){
	var email = "mahesh@mail.com"; // logged in user email we will get it.
	var myTopics = records.getMyTopics(email);
	res.render('dashboard',{myTopics:myTopics});
});


module.exports = router;
