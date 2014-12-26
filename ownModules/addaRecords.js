var fs = require('fs');
var sqlite3 = require('sqlite3').verbose();
var _ = require('lodash');
var JsSql = require("./JsSql").JsSql;
var location = "";

var records = {};
var openDBConnection = function(){
	var filePresent = fs.existsSync(location);
	if(!filePresent){
		throw new Error("DataBase file not found");
	}
	var db = new sqlite3.Database(location);
	return db;
};

var closeDBConnection = function(db){
	db.close();
};

records.getMyJoinedTopics = function(email,callback){
	var joinedTopicsQry = new JsSql();
	joinedTopicsQry.select(["topicId","topicName"]).as(["id","name"]);
	joinedTopicsQry.from(["joinedTopics"]);
	joinedTopicsQry.where(["email='"+email+"'"]);
	var db = openDBConnection();
	joinedTopicsQry.ready(db,"all",callback);
	joinedTopicsQry.fire();
	closeDBConnection(db);
};

records.getMyCreatedTopics = function(email,callback){
	var createdTopicsQry = new JsSql();
	createdTopicsQry.select(["id","name"]);
	createdTopicsQry.from(["topics"]);
	createdTopicsQry.where(["ownersEmailId='"+email+"'"]);
	var db = openDBConnection();
	createdTopicsQry.ready(db,"all",callback);
	createdTopicsQry.fire();
	closeDBConnection(db);
};

records.getMyTopics = function(email,callback){
	records.getMyCreatedTopics(email,function(err,createdTopics){
		records.getMyJoinedTopics(email,function(err,joinedTopics){
			var myTopics = createdTopics.concat(joinedTopics);
			callback(null,myTopics); 
		});
	});
};

records.loadUser = function(email,callback){
	var userQry = new JsSql();
	userQry.select();
	userQry.from(["users"]);
	userQry.where(["emailId='"+email+"'"]);
	var db = openDBConnection();
	userQry.ready(db,"get",callback);
	userQry.fire();	
	closeDBConnection(db);
}

records.validate = function(loginDetails,validateCallBack){
	records.loadUser(loginDetails.emailId,function(err,userDetails){
		if(err)validateCallBack("/login","");
		else if(userDetails && userDetails.secret == loginDetails.password) 
			validateCallBack("/dashboard",loginDetails.emailId);
		else validateCallBack("/login",""); 
	});
};

records.getAllTopics = function(callback){
	var topicsQry = new JsSql();
	topicsQry.select();
	topicsQry.from(["topics"]);
	var db = openDBConnection();
	topicsQry.ready(db,"all",callback);
	topicsQry.fire();
	closeDBConnection(db);
}

records.addTopic = function(email,topicName,topicDescription,callback){
	var date = String(new Date()).slice(0,21);
	var topicAddQry = new JsSql();
	topicAddQry.insertInto(["topics"]).someFields(["name","description","ownersEmailId","startTime","closeTime"]);
	topicAddQry.values([topicName,topicDescription,email,date,"Not Closed"]);
	var db = openDBConnection();
	topicAddQry.ready(db,"run",function(err){
		records.getAllTopics(function(err,topics){
			callback(topics[topics.length-1].id);
		});
	});
	topicAddQry.fire();
	closeDBConnection(db);
};

records.searchTopic = function(searchText,callback){
	var searchQry = new JsSql();
	searchQry.select(["id","name"]);
	searchQry.from(["topics"]);
	searchQry.where(["name='"+searchText+"'"]);
	var db = openDBConnection();
	searchQry.ready(db,"all",function(err,relatedTopics){
		var relatedTopics = relatedTopics.reduce(function(html,topic){
			html += "<a href='topic/"+topic.id+"'>"+topic.name+"</a>";
			html += "<br>";
			return html;
		},"");
		callback(err, relatedTopics);
	});
	searchQry.fire();
	closeDBConnection(db);
};

records.getTop5Topics = function(callback){
	var top5Qry = new JsSql();
	top5Qry.select(["name"]);
	top5Qry.from(["topics"]);
	var db = openDBConnection();
	top5Qry.ready(db,"all",function(err,top5Topics){
		var topicsLength = top5Topics.length;
		callback(top5Topics.slice(topicsLength-5,topicsLength));
	});
	top5Qry.fire();
	closeDBConnection(db);
};

records.createNewUser = function(email,name,password,callback){
	var newUserQry = new JsSql();
	newUserQry.insertInto(["users"]);
	newUserQry.values([email,name,password]);
	var db = openDBConnection();
	newUserQry.ready(db,"run",callback);
	newUserQry.fire();
	closeDBConnection(db);
};

records.getTopicById = function(topicId,callback){
	var topicQry = new JsSql();
	topicQry.select();
	topicQry.from(["topics"]);
	topicQry.where(["id='"+topicId+"'"]);
	var db = openDBConnection();
	topicQry.ready(db,"get",callback);
	topicQry.fire();
	closeDBConnection(db);
}

records.giveJoinOrLeave = function(joinedTopics,topicId,topic){
	var joined = _.find(joinedTopics,{id: +topicId});
	if(joined) topic.buttonName = "Leave Topic";
	else topic.buttonName = "Join To Topic";
}

records.loadLastFiveComments = function(topicId,callback){
	var commentsQry = new JsSql();
	commentsQry.select();
	commentsQry.from(["comments"]);
	commentsQry.where(["topicId='"+topicId+"'"]);
	commentsQry.query += "order by id desc limit 5";
	var db = openDBConnection();
	commentsQry.ready(db,"all",function(err,comments){
		comments = comments.reverse();
		callback(null,comments);
	});
	commentsQry.fire();
	closeDBConnection(db);
}

records.getTopic = function(topicId, loggedInMail, callback){
	records.getTopicById(topicId,function(err,topic){
		records.loadLastFiveComments(topicId,function(err,lastComments){
			if(topic.ownersEmailId == loggedInMail){
				topic.buttonName = "Close Topic";
				topic.comments = lastComments;
				callback(topic);
			} else{
				records.getMyJoinedTopics(loggedInMail,function(err,joinedTopics){
					records.giveJoinOrLeave(joinedTopics,topicId,topic);
					topic.comments = lastComments;
					callback(topic);
				});
			}
			
		});
	});
}

exports.create = function(path){
		location = path;
		return records;
};
	


