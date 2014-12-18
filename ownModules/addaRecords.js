var fs = require('fs');
var _ = require('lodash');

exports.create = function(location, dbIndex){
	var dbFile = fs.readFileSync(location,'utf-8');
	var dbs = JSON.parse(dbFile);
	var db = dbs[dbIndex];
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
	
	records.loadRecentComments = function(Id,topics) {
		var topic = topics[_.findIndex(topics,{id:Id})];
		return topic.comments.slice(-5);
	};

	records.addComment = function(topic,newComment) {
		topic.comments.push(newComment);
	}; 

	records.getTop5Topics = function(){
		var topicIds = Object.keys(db.topics);
		var topics = topicIds.map(function(id){
			return db.topics[id].name;
		});
		return topics.reverse().slice(0,5);
	};

	records.findNumberOfCommentors = function(){
		var topicIds = Object.keys(db.topics);
		return topicIds.map(function(id){
			return db.topics[id].comments.length;
		});
	};
	return records;
};
