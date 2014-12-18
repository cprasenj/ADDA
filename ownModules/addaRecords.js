var _ = require('lodash');

exports.addComment = function(topic,newComment) {
	topic.comments.push(newComment);
}; 

exports.loadRecentComments = function(Id,topics) {
	var topic = topics[_.findIndex(topics,{id:Id})];
	return topic.comments.slice(-5);
var fs = require('fs');
var lib = {};

exports.create = function(location){
	var db = JSON.parse(fs.readFileSync(location));
	var records = {};
	
	records.getMyTopics = function(email){
		var myTopics = db["userTopics"]["email"];
		return myTopics;
	};
	
	records.getTop5Topics = function(){
		var topicIds = Object.keys(db.topics);
		return topicIds.map(function(id){
			return db.topics[id].name;
		});
	};
	return records;
};