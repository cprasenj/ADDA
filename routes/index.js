var express = require('express');
var router = express.Router();

var records = require("../ownModules/addaRecords.js").create("./data/addaDB.json");

module.exports = router;

/* GET home page. */
router.get('/', function(req, res) {
	var top5Topics = records.getTop5Topics();
	res.render('index', { title:'Home',topics:topics});
});

router.get("/dashboard",function(req,res){
	var email = "mahesh@mail.com"; // logged in user email we will get it.
	var myTopics = records.getMyTopics(email);
	res.render('dashboard',{ title:'dashboard', myTopics:myTopics});
});