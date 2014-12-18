var express = require('express');
var router = express.Router();
var lib = require('../ownModules/addaRecords.js');
var topics = require('../ownModules/tempdata.js').topics;

var records = require("../ownModules/addaRecords.js").create("./data/addaDB.json",0);

module.exports = router;

/* GET home page. */

router.get('/', function(req, res) {
	var topics = records.getTop5Topics();
	res.render('index', { title:'Home',topics:topics});
});


router.get('/topic/:id',function(req,res) {
	// load topics
	// lib.loadRecentComments(id, topics) => recent topics
	// update topic 
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

router.get("/topics",function(req,res){
	res.render('topics',{title:'Topics'})
});

router.post("/addTopic",function(req,res){
	var email = "mahesh@mail.com"; // logged in user email we will get it.
	var topicName = req.body.topicName;
	var topicDescription = req.body.topicDescription;
	var topicId = records.addTopic(email,topicName,topicDescription);
	res.redirect("/topic/"+topicId);
});

router.get('/login', function(req, res) {
	res.render('login',{title:'Login'});
});
router.post('/validate',function(req,res,next){
	var validity = records.validate(req.body);
	(validity)? res.redirect('/dashboard') : res.redirect('/login');
});

