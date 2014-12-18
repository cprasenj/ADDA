var fs = require('fs');

exports.create = function(location){
	var db = JSON.parse(fs.readFileSync(location));
	var records = {};
	
	records.getMyTopics = function(email){
		var myAllTopicIds = db["userTopics"][email];
		var myCretedTopics = myAllTopicIds["created"].map(function(createdTopicId){
			var topicName = db["topics"][createdTopicId]["name"];
			return({topicId: createdTopicId, topicName: topicName})
		});

		var myJoinedTopics =  myAllTopicIds["joined"].map(function(joinedTopicId){
			var topicName = db["topics"][joinedTopicId]["name"];
			return({topicId: joinedTopicId, topicName: topicName});
		});
		myTopics = myCretedTopics.concat(myJoinedTopics);
		return myTopics;
	};
	
	// records.getTop5Topics = function(onComplete){
	// 	var allTopics = Object.keys(db.topics || {});
	// 	var select = function(selected, topic){

	// 	};
	// 	var first5 = allTopics.reduce(select,[]);
	// 	onComplete(null,first5);
	// };
	
	return records;
};
