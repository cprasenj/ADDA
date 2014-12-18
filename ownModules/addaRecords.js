var lib = {};
lib.getTop5Topics = function(db, onComplete){
	var allTopics = Object.keys(db.topics || {});
	var select = function(selected, topic){

	};
	var first5 = allTopics.reduce(select,[]);
	onComplete(null,first5);
};



exports.lib = lib;