var express = require('express');
var router = express.Router();
var lib = require('../ownModules/addaRecords.js');
var topics = require('../ownModules/tempdata.js').topics;

var records = require("../ownModules/addaRecords.js").create("./data/addaDB.json");

module.exports = router;

/* GET home page. */

router.get('/', function(req, res) {
	var topics = records.getTop5Topics();
	res.render('index', { title:'Home',topics:topics});
});


router.get('/topic/:id',function(req,res) {
	//load topics
	// lib.loadRecentComments(id, topics) => recent topics
	//update topic 
	var id = +req.params.id;
	var topic = topics[id-1];
	topic['comments'] = lib.loadRecentComments(id, topics);
	res.render('topic',topic);
});

module.exports = router;


router.get("/dashboard",function(req,res){
	var email = "mahesh@mail.com"; // logged in user email we will get it.
	var myTopics = records.getMyTopics(email);
	res.render('dashboard',{ title:'dashboard', myTopics:myTopics});
});


