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
		if(err || !userDetails)
			validateCallBack("/login",null,"invalid user");
		else if(userDetails && userDetails.secret == loginDetails.password) 
			validateCallBack("/dashboard",loginDetails.emailId);
		else validateCallBack("/login",null,"invalid password"); 
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
	searchQry.where(["name like'"+searchText+"%'"]);
	var db = openDBConnection();
	searchQry.ready(db,"all",function(err,relatedTopics){
		if(relatedTopics.length != 0){
			var relatedTopics = relatedTopics.reduce(function(html,topic){
				html += "<a href='topic/"+topic.id+"'>"+topic.name+"</a>";
				html += "<br>";
				return html;
			},"");
		}
		else{
			relatedTopics = "<p>No Topics Found related to search</p><br/>"
		}
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
	if(joined) topic.buttonName = "Leave";
	else topic.buttonName = "Join";
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
				if(topic.closeTime == "Not Closed") topic.buttonName = "Close";
				else topic.buttonName = "Closed";
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

records.addComment = function(comment,topicId,userEmail,callback){
	var commentQry = new JsSql();
	var date = String(new Date()).slice(0,21);
	commentQry.insertInto(["comments"]).someFields(["topicId","emailId","comment","time"]);	
	commentQry.values([topicId,userEmail,comment,date]);
	var db = openDBConnection();	
	commentQry.ready(db,"run",callback);
	commentQry.fire();
	closeDBConnection(db);
};

records.joinUserToTopic = function(topicId,topicName,email,callback){
	var joinQry = new JsSql();
	joinQry.insertInto(["joinedTopics"]).someFields(["email","topicId","topicName"]);
	joinQry.values([email,topicId,topicName]);
	var db = openDBConnection();
	joinQry.ready(db,"run",callback);
	joinQry.fire();
	closeDBConnection(db);
}

records.leaveUserfromTopic = function(topicId,mail,callback){
	var leaveQry = "delete from joinedTopics where email='"+mail+"' and topicId='"+topicId+"'";
	var db = openDBConnection();
	db.run(leaveQry,callback);
	closeDBConnection(db);
}

records.closeTopic = function(topicId,email,callback){
		console.log("got here")

	var date = String(new Date()).slice(0,21);
	var closeQry = new JsSql();
	closeQry.update(["topics"]);
	closeQry.set(["closeTime"]);
	closeQry.values([date]);
	closeQry.where(["id='"+topicId+"'","ownersEmailId='"+email+"'"]).connectors(["AND"]);
	var db = openDBConnection();
	closeQry.ready(db,"run",callback);
	closeQry.fire();
	closeDBConnection(db);
}

exports.create = function(path){
	location = path;
	return records;
};





	

