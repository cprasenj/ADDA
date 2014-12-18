var fs = require('fs');
var records = {};
var topics = "";
exports.Create = function(location){
	topics = JSON.parse(fs.readFileSync(location));
	return records;
}

records.getMyTopics = function(email){
	var myTopics = topics["userTopics"]["email"];
	return myTopics;
}




