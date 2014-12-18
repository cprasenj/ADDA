var fs = require('fs');
var lib = {};

lib.create = function(location){
	var db = JSON.parse(fs.readFileSync(location));
	var records = {};
	
	records.getMyTopics = function(email){
		var myTopics = db["userTopics"]["email"];
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

exports.lib = lib;