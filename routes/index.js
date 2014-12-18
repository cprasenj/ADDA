var express = require('express');
var router = express.Router();
var lib = require('../ownModules/addaRecords.js');
var topics = require('../ownModules/tempdata.js').topics;

/* GET home page. */

router.get('/', function(req, res) {
  res.render('index', { title: 'Home' });
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


