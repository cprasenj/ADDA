var fs = require('fs');
var records = {};
var topics = "";
exports.Create = function(location){
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




