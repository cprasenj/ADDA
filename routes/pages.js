var express = require('express');
var router = express.Router();
var userStore = require("../library/userStore.js")
var records = require("../ownModules/addaRecords.js").create("./data/productionData.json",0);
var lib = require('../library/userStore.js').create();
module.exports = router;

var loadUserFromSession = function(req,res,nent){
	var user = req.session.userEmail && userStore.load(req.session.userEmail);
	if(user){
		req.user = user;
		res.locals.user = user;
	}else{
		delete req.session.userEmail;
	}
	next();
}

var requireLogin = function(req,res,next){
	req.user ? next(): res.redirect("/login");
}

router.use(loadUserFromSession);

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

router.get('/topic/:id',requireLogin,function(req,res) {
	var id = req.params.id;
	var topic = records.db['topics'][id];
	topic['id'] = id;
	topic['comments'] = records.loadRecentComments(id);
    res.render('topic',topic);
});

router.get("/dashboard",requireLogin,function(req,res){
	var email = "mahesh@mail.com"; 
	var myTopics = records.getMyTopics(email);
	res.render('dashboard',{ title:'dashboard', myTopics:myTopics});
});

router.post('/topic/:id/addComment',requireLogin,function(req, res) {
	var body = req.body;
	body.id = req.params.id;
	records.addComment(body);
    res.redirect('/topic/'+body.id);
});

router.get("/topics",requireLogin,function(req,res){
	res.render('topics',{title:'Topics'})
});

router.post("/topicAdd",requireLogin,function(req,res){
	var email = "mahesh@mail.com"; 
	var topicName = req.body.topicName;
	var topicDescription = req.body.topicDescription;
	var topicId = records.addTopic(email,topicName,topicDescription);
	res.redirect("/topic/"+topicId);
});


router.get('/login', function(req, res) {
	res.render('login',{title:'Login'});
});

router.post('/validate',requireLogin,function(req,res){
	var validity = records.validate(req.body);
	(validity)? res.redirect('/dashboard') : res.redirect('/login');
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
