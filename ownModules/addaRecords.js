var fs = require('fs');
var records = {};
var topics = "";
var lib = {};

lib.getTop5Topics = function(db, onComplete){
	var allTopics = Object.keys(db.topics || {});
	var select = function(selected, topic){

	};
	var first5 = allTopics.reduce(select,[]);
	onComplete(null,first5);
};

lib.create = function(location){
	topics = JSON.parse(fs.readFileSync(location));
	return records;
}

records.getMyTopics = function(email){
	var myTopics = topics.filter(function(topic){
		if(topic['email'] == email)
			return true;
		if(topic["joined"].indexOf(email) > -1)
			return true;
	});
	return myTopics;
}

exports.lib = lib;