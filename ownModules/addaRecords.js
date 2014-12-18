var fs = require('fs');

exports.addComment = function(topic,newComment) {
	topic.comments.push(newComment);
}; 

exports.loadRecentComments = function(Id,topics) {
	return topics.comments.slice(-5);
};

exports.create = function(location){
	var db = JSON.parse(fs.readFileSync(location));
	var records = {};
	records.db = db;
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
	
	records.loadRecentComments = function(Id) {
		return db['topics'][Id].comments.slice(-5);
	};

	records.addComment = function(newComment) {
		var comment = {text:newComment.currentComment,time:'12:00',commentor:'prasenjit'};
		db['topics'][newComment.id].comments.push(comment);
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
