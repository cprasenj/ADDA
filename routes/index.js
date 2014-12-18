var express = require('express');
var router = express.Router();
var records = require("../ownModules/addaRecords.js").create("./data/addaDB.json");

module.exports = router;

router.get('/', function(req, res) {
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

router.post('/topic/addComment',function(req, res) {
	records.addComment(req.body);
    res.redirect('/topic/'+req.body.id);
});
