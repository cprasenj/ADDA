var express = require('express');
var lib = require('../library/userStore.js').create();
var router = express.Router();
var records = require("../ownModules/addaRecords.js").create("./data/addaDB.json",0);
module.exports = router;

router.get('/', function(req, res) {
    console.log(records.db.topics);
  res.render('index',{titlt:'adda',topics:records.db[5]});
});

router.get('/registration',function(req,res) {
    res.render('registration');
});

router.post('/registration',function(req,res) {
    var result = lib.save({
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    email:req.body.email,
    password:req.body.password
  });
  result.error ? res.render('registration',result) : res.redirect('/dashboard');  

});

router.get('/topic/:id',function(req,res) {
	var id = req.params.id;
    console.log(records.db);
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

router.post("/addTopic",function(req,res){
	var email = "mahesh@mail.com"; 
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

router.get('/logout',function(req,res){
    req.session.destroy();
    res.redirect('/');
});




