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
		var allTopics = Object.keys(db.topics || {});
		var select = function(selected, topic){

		};
		return allTopics;
	};
	return records;
};