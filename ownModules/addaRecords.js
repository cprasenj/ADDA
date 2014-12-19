var fs = require('fs');
var _ = require('lodash');

exports.create = function(location, dbIndex){
	var dbFile = fs.readFileSync(location,'utf-8');
	var dbs = JSON.parse(dbFile);
	var db = dbs[dbIndex];
	var records = {db:db};

	records.getAllTopics = function(){
		 return db["topics"];
	};

	records.reWriteDataBaseFile = function(){
		var dbToWrite = JSON.parse(fs.readFileSync(location));
		dbToWrite[dbIndex] = db;
		fs.writeFileSync(location,JSON.stringify(dbToWrite));
	};

	records.getRelatedTopics = function(chunk){
		var keysOfDB = Object.keys(records.db["topics"]);
		var searchResult = keysOfDB.map(function(topic){
			var topicName = records.db["topics"][topic]["name"];
			var matchString = new RegExp(chunk,'i');
			if(topicName.match(matchString))
		 		return topicName;
		});
		return _.compact(searchResult);
	};

	records.getMyTopics = function(email){
		var myAllTopicIds = db["userTopics"][email];
		var myCretedTopics = records.getMyCreatedTopics(myAllTopicIds);
		var myJoinedTopics = records.getMyJoinedTopics(myAllTopicIds);
		myTopics = myCretedTopics.concat(myJoinedTopics);
		return myTopics;
	};

	records.getMyJoinedTopics = function(myAllTopicIds){
		return myJoinedTopics =  myAllTopicIds["joined"].map(function(joinedTopicId){
			var topicName = db["topics"][joinedTopicId]["name"];
			return({topicId: joinedTopicId, topicName: topicName});
		});	
	}

	records.getMyCreatedTopics = function(myAllTopicIds){
		return myCretedTopics = myAllTopicIds["created"].map(function(createdTopicId){
			var topicName = db["topics"][createdTopicId]["name"];
			return({topicId: createdTopicId, topicName: topicName});
		});
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

	records.addTopic = function(email,topicName,topicDescription){
		var newId = +(_.max(Object.keys(db["topics"]))) + 1;
		if(_.has(db["userTopics"],email))
			db['userTopics'][email]["created"].push(newId);
		else
			db["userTopics"][email] = {joined: [], created: [newId]};

		db["topics"][newId] = {
			name: topicName,
			ownerEmailId: email, 
			startTime: String(new Date()).slice(0,21), 
			closeTime: "Not Closed",
			description: topicDescription,
			comments: []
		};
		records.reWriteDataBaseFile();
		return newId;
	};
	
	records.validate = function(login){
		var user = db.loginDetails[login.emailId];
		return user && user.password == login.password ;
	};
	return records;
};
