var express = require('express');
var router = express.Router();
var records = require("../ownModules/addaRecords.js").create("./data/addaDB.json",0);
module.exports = router;

router.get('/', function(req, res) {
	var topics = records.getTop5Topics();
	res.render('index', { title:'Home',topics:topics});
});

router.get('/index', function(req, res) {
	var topics = records.getTop5Topics();
	res.render('index', { title:'Home',topics:topics});
});
router.get('/index.html', function(req, res) {
	var topics = records.getTop5Topics();
	res.render('index', { title:'Home',topics:topics});
});

router.get('/topic/:id',function(req,res) {
	var id = req.params.id;
	var topic = records.db['topics'][id];
	topic['id'] = id;
	topic['comments'] = records.loadRecentComments(id);
    res.render('topic',topic);
});

router.get("/dashboard",function(req,res){
	var email = "mahesh@mail.com"; 
	var myTopics = records.getMyTopics(email);
	res.render('dashboard',{ title:'dashboard', myTopics:myTopics});
});

router.post('/topic/:id/addComment',function(req, res) {
	var body = req.body;
	body.id = req.params.id;
	records.addComment(body);
    res.redirect('/topic/'+body.id);
});

router.get("/topics",function(req,res){
	res.render('topics',{title:'Topics'})
});

router.post("/topicAdd",function(req,res){
	var email = "mahesh@mail.com"; 
	var topicName = req.body.topicName;
	var topicDescription = req.body.topicDescription;
	var topicId = records.addTopic(email,topicName,topicDescription);
	res.redirect("/topic/"+topicId);
});



router.get('/login', function(req, res) {
	res.render('login',{title:'Login'});
});

router.post('/validate',function(req,res){
	var validity = records.validate(req.body);
	(validity)? res.redirect('/dashboard') : res.redirect('/login');
});