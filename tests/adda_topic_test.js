var lib = require('../ownModules/addaRecords.js').create("./tests/data/db.json");
var assert = require('chai').assert;

describe('#addComment', function(){
	it('addComment() adds a comment into the topic 1', function(){
		var db = require('../ownModules/addaRecords.js').create("./tests/data/db.json");
		var comment = {
			id : 2,
			currentComment : "Cool Stuff"
		};
		db.addComment(comment);
		var lastFiveComments = db.loadRecentComments(2);
		assert.deepEqual(lastFiveComments[lastFiveComments.length-1].text,comment.currentComment);
	});
	it('addComment() adds a comment into the topic 2', function(){
		var db = require('../ownModules/addaRecords.js').create("./tests/data/db.json");
		var comment = {
			id : 2,
			currentComment : "bad game"
		};
		var expected = [
				{ "text": "Cricket is Nice", "time": "12-12-2014 11:05", "commentor": "mahesh@mail.com"},
				{ "text": "Cricket keeps our brain relax", "time": "12-12-2014 11:06", "commentor": "prajapati@mail.com"},
				{ "text": "I like Cricket", "time": "13-12-2014 11:07", "commentor": "mahesh@mail.com"},
				{ "text": "i like IPL Cricket", "time": "13-12-2014 11:08", "commentor": "prajapati@mail.com"},
				{ "text": "bad game", "time": "12:00", "commentor": "prasenjit"}
			];
		db.addComment(comment);
		var lastFiveComments = db.loadRecentComments(2);
		assert.deepEqual(lastFiveComments,expected);
	});
});

describe('#loadRecentComments',function() {
	it('should load recent 4 comments when there are 4 comments on the topic',function() {
		var expected = [
				{ "text": "Cricket is Nice", "time": "12-12-2014 11:05", "commentor": "mahesh@mail.com"},
				{ "text": "Cricket keeps our brain relax", "time": "12-12-2014 11:06", "commentor": "prajapati@mail.com"},
				{ "text": "I like Cricket", "time": "13-12-2014 11:07", "commentor": "mahesh@mail.com"},
				{ "text": "i like IPL Cricket", "time": "13-12-2014 11:08", "commentor": "prajapati@mail.com"}
			];
		var actual = lib.loadRecentComments(2);
		assert.deepEqual(actual,expected);
	});
});



