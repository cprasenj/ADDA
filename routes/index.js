var express = require('express');
var router = express.Router();
var addaRoutes = require('../ownModules/addaRecords');

/* GET home page. */
router.get('/', function(req, res) {
	addaRecords.getTop5Topics(function(topics){
		res.render('index', { title:'Home',topics:topics});
	});
});

module.exports = router;