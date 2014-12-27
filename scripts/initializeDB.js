var location = process.argv[2];
var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(location);
var runAllQueries = function(){	
	var runQuery = function(q){
		console.log(q);
		db.run(q,function(err){
			if(err){
				console.log(err);
				process.exit(1);
			}
		});
	};

	[	"create table users(emailId text primary key, name text not null, secret text not null);",

		"create table topics(id integer primary key autoincrement, name text not null,"+
			" description text, ownersEmailId text not null, startTime text not null, closeTime text,"+
			" foreign key(ownersEmailId) references users(emailId));",

		"create table comments(id integer primary key autoincrement, topicId integer not null,"+
			"emailId text not null, comment text not null, time text not null,"+
			" foreign key(topicId) references topics(id), foreign key(emailId) references users(emailId));",

		// "create table joinTopic(emailId text not null, topicId integer not null,"+
		// " foreign key(emailId) references users(emailId), foreign key(topicId) references topics(id));",

		"create table joinedTopics(id integer primary key autoincrement, email text, topicId integer, topicName text);"
	].forEach(runQuery);
};
db.serialize(runAllQueries);