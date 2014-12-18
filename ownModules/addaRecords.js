var fs = require('fs');
var _ = require('lodash');

exports.addComment = function(topic,newComment) {
	topic.comments.push(newComment);
}; 

exports.loadRecentComments = function(Id,topics) {
	var topic = topics[_.findIndex(topics,{id:Id})];
	return topic.comments.slice(-5);
};

exports.create = function(location, dbIndex){
	var db = JSON.parse(fs.readFileSync(location))[dbIndex];
	var records = {};
	records.getMyTopics = function(email){
		var myAllTopicIds = db["userTopics"][email];
		var myCretedTopics = myAllTopicIds["created"].map(function(createdTopicId){
			var topicName = db["topics"][createdTopicId]["name"];
			return({topicId: createdTopicId, topicName: topicName});
		});

		var myJoinedTopics =  myAllTopicIds["joined"].map(function(joinedTopicId){
			var topicName = db["topics"][joinedTopicId]["name"];
			return({topicId: joinedTopicId, topicName: topicName});
		});
		myTopics = myCretedTopics.concat(myJoinedTopics);
		return myTopics;
	};
	
	records.getTop5Topics = function(){
		var topicIds = Object.keys(db.topics);
		return topicIds.map(function(id){
			return db.topics[id].name;
		});
	};

	records.findNumberOfCommentors = function(){
		var topicIds = Object.keys(db.topics);
		return topicIds.map(function(id){
			return db.topics[id].comments.length;
		});
	};
	return records;
}
