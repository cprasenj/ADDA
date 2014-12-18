var lib = require('../ownModules/addaRecords.js').create("./data/addaDB.json");
var assert = require('chai').assert;

describe('#addComment', function(){
	it('addComment() adds a comment into the topic', function(){
		var topic = {
			comments : [],
		};
		var comment = {
			commenter : "cpresen@gmail.com",
			time : "10:00",
			comment : "Cool Stuff"
		};
		var expected = {
			comments: [comment]
		};
		lib.addComment(topic,comment);
		assert.deepEqual(expected,topic);
	});
});

describe('#loadRecentComments',function() {
	it('should load nothing when there is no comment on the topic',function() {
		var topics = [ {name: 'cricket', id: 1, comments: []},{name:'football', id: 2, comments: []}];
		var expected = [];
		var actual = lib.loadRecentComments(1,topics);
		assert.deepEqual(actual,expected);
	});
	it('should load one coment when there is one comment on the topic',function() {
		var comment = {
			commenter : "cpresen@gmail.com",
			time : "10:00",
			comment : "Cool Stuff"
		};
		var topics = [ {name: 'cricket', id: 1, comments: [comment]},{name:'football', id: 2, comments: []}];
		var expected = [comment];
		var actual = lib.loadRecentComments(1,topics);
		assert.deepEqual(actual,expected);
	});
	it('should load one coment when there is one comment on the topic',function() {
		var comment = {
			commenter : "cpresen@gmail.com",
			time : "10:00",
			comment : "Cool Stuff"
		};
		var topics = [ {name: 'cricket', id: 1, comments: []},{name:'football', id: 2, comments: [comment]}];
		var expected = [comment];
		var actual = lib.loadRecentComments(2,topics);
		assert.deepEqual(actual,expected);
	});
	it('should load recent 5 comments when there are >5 comments on the topic',function() {
		var comment = {
			commenter : "cpresen@gmail.com",
			time : "10:00",
			comment : "Cool Stuff"
		};
		var comments = [comment, JSON.parse(JSON.stringify(comment)), JSON.parse(JSON.stringify(comment)),
			JSON.parse(JSON.stringify(comment)),JSON.parse(JSON.stringify(comment)),
			JSON.parse(JSON.stringify(comment)),JSON.parse(JSON.stringify(comment))
		];

		var topics = [ {name: 'cricket', id: 1, comments: []},{name:'football', id: 2, comments: comments}];
		var expected = comments.slice(-5);
		var actual = lib.loadRecentComments(2,topics);
		assert.deepEqual(actual,expected);
	});
});



