var _ = require('lodash');

exports.addComment = function(topic,newComment) {
	topic.comments.push(newComment);
}; 

exports.loadRecentComments = function(Id,topics) {
	var topic = topics[_.findIndex(topics,{id:Id})];
	return topic.comments.slice(-5);
};