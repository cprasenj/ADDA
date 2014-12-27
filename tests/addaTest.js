var records = require("../ownModules/addaRecords.js").setLocation("./tests/data/instance.db");
var assert = require("chai").assert;
var fs = require('fs');
var backUpDb = fs.readFileSync("./tests/data/instance.db.backup");

describe("Adda", function(){
	beforeEach(function(){
		fs.writeFileSync('./tests/data/instance.db',backUpDb);
	});

	describe("getMyTopics", function(){
		it("should give all created and joined topics of mail mahesh@gmail.com", function(done){
			records.getMyTopics("mahesh@gmail.com",function(err,myTopics){
				assert.deepEqual(myTopics,[ 
					{ id: 2, name: 'Music' },
  					{ id: 7, name: 'Vijayawada'},
  					{ id: 1, name: 'Cricket' },
  					{ id: 3, name: 'STEP' } ]);
				done();
			});
		});
	});
	describe("getMyJoinedTopics",function(){
		it("should give all joined topics of mahesh@gmail.com", function(done){
			records.getMyJoinedTopics("mahesh@gmail.com",function(err,myJoinedTopics){
				assert.deepEqual(myJoinedTopics,[
					{ id: 1, name: 'Cricket' },
  					{ id: 3, name: 'STEP' } ]);
				done();
			});
		});
	});
	describe("getMyCreatedTopics",function(){
		it("should give all created topics of mahesh@gmail.com", function(done){
			records.getMyCreatedTopics("mahesh@gmail.com",function(err,myCreatedTopics){
				assert.deepEqual(myCreatedTopics,[ 
					{ id: 2, name: 'Music' },
  					{ id: 7, name: 'Vijayawada'} ]);
				done();
			});
		});
	});
	describe("loadUser",function(){
		it("should give the details of particular user mahesh@gmail.com",function(done){
			records.loadUser("mahesh@gmail.com",function(err,user){
				assert.deepEqual(user,{ emailId: 'mahesh@gmail.com', name: 'Mahesh', secret: 'mahesh' });
				done();
			});
		});
	});
	describe("validate", function(){
		it("should give /dashboard as next page for valid login", function(done){
			records.validate({emailId:"mahesh@gmail.com",password:"mahesh"},function(page,emailId,error){
				assert.equal(page,"/dashboard");
				assert.equal(emailId,"mahesh@gmail.com");
				assert.notOk(error);
				done();
			});
		});
		it("should give /login as next page for invalid password", function(done){
			records.validate({emailId:"mahesh@gmail.com",password:"kolla"},function(page,user,error){
				assert.equal(page,"/login");
				assert.equal(error,"invalid password");
				assert.notOk(user);
				done();
			});
		});
		it("should give /login as next page for invalid emailId", function(done){
			records.validate({emailId:"riya@gmail.com",password:"kolla"},function(page,user,error){
				assert.equal(page,"/login");
				assert.equal(error,"invalid user");
				assert.notOk(user);
				done();
			});
		});
	});
	describe("addTopic", function(){
		it("should add a NewTopic to the database",function(done){
			records.addTopic("mahesh@gmail.com","New Topic","Description",function(topicId){
				assert.equal(topicId,9);
				done();
			});
		});
	});
	describe("getAllTopics",function(){
		it("should give all topics in the database", function(done){
			records.getAllTopics(function(err,topics){
				assert.deepEqual(topics,[ 
				  { id: 1,
				    name: 'Cricket',
				    description: 'Swamiji is very good cricket player',
				    ownersEmailId: 'prasenjit@gmail.com',
				    startTime: '2014-12-17 15:12',
				    closeTime: 'Not Closed' },
				  { id: 2,
				    name: 'Music',
				    description: 'Jayanth knows about it well',
				    ownersEmailId: 'mahesh@gmail.com',
				    startTime: '2014-12-17 15:12',
				    closeTime: 'Not Closed' },
				  { id: 3,
				    name: 'STEP',
				    description: 'Two year internship',
				    ownersEmailId: 'step@gmail.com',
				    startTime: '2014-12-17 15:12',
				    closeTime: 'Not Closed' },
				  { id: 4,
				    name: 'ThoughtWorks',
				    description: 'The Leading Software company',
				    ownersEmailId: 'budda@gmail.com',
				    startTime: '2014-12-17 15:12',
				    closeTime: 'Not Closed' },
				  { id: 5,
				    name: 'Adda',
				    description: 'Bangali Small disscussion',
				    ownersEmailId: 'suparna@gmail.com',
				    startTime: '2014-12-17 15:12',
				    closeTime: 'Not Closed' },
				  { id: 6,
				    name: 'Punjab',
				    description: 'A State in India',
				    ownersEmailId: 'pooja@gmail.com',
				    startTime: '2014-12-17 15:12',
				    closeTime: 'Not Closed' },
				  { id: 7,
				    name: 'Vijayawada',
				    description: 'New Capital of A.P',
				    ownersEmailId: 'mahesh@gmail.com',
				    startTime: '2014-12-17 15:12',
				    closeTime: 'Not Closed' },
				  { id: 8,
				    name: 'Football',
				    description: 'Horrible game',
				    ownersEmailId: 'prasenjit@gmail.com',
				    startTime: '2014-12-17 15:12',
				    closeTime: '2014-12-17 16:14' } ])
				done();
			});
		});
	});
	describe("createNewUser",function(){
		it("should create a new user into the database with name new,mail new@new.com",function(done){
			records.createNewUser("new@new.com","new","new",function(err){
				assert.notOk(err);
				records.loadUser("new@new.com",function(err,user){
					assert.deepEqual(user,{ emailId: 'new@new.com', name: 'new', secret: 'new' });
					done();
				});
			});
		});
	});
	describe("searchTopic",function(){
		it("should give the topic that is searched in this case cricket",function(done){
			records.searchTopic("Cricket",function(err,topic){
				assert.equal(topic,"<a href='topic/1'>Cricket</a><br>")
				done();
			});
		});
		it("should give the topic that is searched in this case cricket",function(done){
			records.searchTopic("boxing",function(err,topic){
				assert.equal(topic,"<p>No Topics Found related to search</p><br/>");
				done();
			});
		});
	});
	describe("getTop5Topics",function(){
		it("should give the top five topics in the database",function(done){
			records.getTop5Topics(function(topics){
				assert.deepEqual(topics,[ { name: 'ThoughtWorks' },
					{ name: 'Adda' },
					{ name: 'Punjab' },
					{ name: 'Vijayawada' },
					{ name: 'Football' } ]);
				done();
			});
		});
	});
	describe("getTopic",function(){
		it("shpould give the details and comments of topic id 1", function(done){
			records.getTopic(1,"mahesh@gmail.com",function(topicDetails){
				assert.deepEqual(topicDetails,{ id: 1,
				  name: 'Cricket',
				  description: 'Swamiji is very good cricket player',
				  ownersEmailId: 'prasenjit@gmail.com',
				  startTime: '2014-12-17 15:12',
				  closeTime: 'Not Closed',
				  buttonName: 'Leave',
				  comments:
				   [ { id: 3,
				       topicId: 1,
				       emailId: 'prajapati@gmail.com',
				       comment: 'i dont know how to play',
				       time: '2014-12-20 13:13' },
				     { id: 4,
				       topicId: 1,
				       emailId: 'suparna@gmail.com',
				       comment: 'i want to learn cricket',
				       time: '2014-12-20 13:13' },
				     { id: 5,
				       topicId: 1,
				       emailId: 'step@gmail.com',
				       comment: 'sataurday is cricket day for step',
				       time: '2014-12-20 13:13' },
				     { id: 6,
				       topicId: 1,
				       emailId: 'mahesh@gmail.com',
				       comment: 'not now',
				       time: '2014-12-20 13:13' },
				     { id: 7,
				       topicId: 1,
				       emailId: 'prasenjit@gmail.com',
				       comment: 'thanq all for commenting',
				       time: '2014-12-20 13:13' } ] })
				done();
			});
		});
	});
	describe("getTopicById",function(){
		it("should give the details of topic id 1", function(done){
			records.getTopicById(1,function(err, topicDetails){
				assert.deepEqual(topicDetails,{ id: 1,
					name: 'Cricket',
					description: 'Swamiji is very good cricket player',
					ownersEmailId: 'prasenjit@gmail.com',
					startTime: '2014-12-17 15:12',
					closeTime: 'Not Closed' });
				done();
			});
		});
	});
	describe("addComment", function(){
		it("should add new comment to topic 1 with user mahesh@mail.com",function(done){
			records.addComment("New Comment",1,"mahesh@mail.com",function(err){
				assert.notOk(err);
				records.loadLastFiveComments(1,function(err,comments){
					assert.deepEqual(comments,[ { id: 4,
					    topicId: 1,
					    emailId: 'suparna@gmail.com',
					    comment: 'i want to learn cricket',
					    time: '2014-12-20 13:13' },
					  { id: 5,
					    topicId: 1,
					    emailId: 'step@gmail.com',
					    comment: 'sataurday is cricket day for step',
					    time: '2014-12-20 13:13' },
					  { id: 6,
					    topicId: 1,
					    emailId: 'mahesh@gmail.com',
					    comment: 'not now',
					    time: '2014-12-20 13:13' },
					  { id: 7,
					    topicId: 1,
					    emailId: 'prasenjit@gmail.com',
					    comment: 'thanq all for commenting',
					    time: '2014-12-20 13:13' },
					  { id: 13,
					    topicId: 1,
					    emailId: 'mahesh@mail.com',
					    comment: 'New Comment',
					    time: String(new Date()).slice(0,21) } ]);
					done();
				});
			});
		});
	});

	describe("joinUserToTopic",function(){
		it("should join mahesh@gmail.com to the topic adda which id is 5",function(done){
			records.joinUserToTopic(5,"Adda","mahesh@gmail.com",function(err){
				assert.notOk(err);
				records.getMyJoinedTopics("mahesh@gmail.com",function(er,topics){
					assert.deepEqual(topics[2],{ id: 5, name: 'Adda' });
					done();
				});
			});
		});
	});

	describe("leaveUserFromTopic",function(){
		it("should leave make leave mahesh@gmail.com from the topic STEP which id is 3",function(done){
			records.leaveUserfromTopic(3,"mahesh@gmail.com",function(err){
				assert.notOk(err);
				records.getMyJoinedTopics("mahesh@gmail.com", function(er,topics){
					assert.deepEqual(topics,[ { id: 1, name: 'Cricket' } ]);
					done();
				});
			});
		});
	});

	describe("closeTopic",function(){
		it("should close the topic 1 parmanently",function(done){
			records.closeTopic(2,"mahesh@gmail.com",function(err){
				assert.notOk(err);
				records.getTopicById(2,function(err,topic){
					assert.equal(topic.closeTime,String(new Date()).slice(0,21));
					done();
				});
			});		
		});
	});

	describe("loadAllComments",function(){
		it("should load all the comments of topic 2",function(done){
			records.loadAllComments(2,function(err,comments){
				assert.deepEqual(comments,[ { id: 8,
				    topicId: 2,
				    emailId: 'mahesh@gmail.com',
				    comment: 'DSP is my favourite music director',
				    time: '2014-12-20 13:13' },
				  { id: 9,
				    topicId: 2,
				    emailId: 'suparna@gmail.com',
				    comment: 'ARR music is nice',
				    time: '2014-12-20 13:13' } ]);
				done();
			});
		});
	});

	describe("loadLastFiveComments",function(){
		it("should give last five comments of topic id 1", function(done){
			records.loadLastFiveComments(1,function(err, comments){
				assert.deepEqual(comments,[ { id: 3,
				    topicId: 1,
				    emailId: 'prajapati@gmail.com',
				    comment: 'i dont know how to play',
				    time: '2014-12-20 13:13' },
				  { id: 4,
				    topicId: 1,
				    emailId: 'suparna@gmail.com',
				    comment: 'i want to learn cricket',
				    time: '2014-12-20 13:13' },
				  { id: 5,
				    topicId: 1,
				    emailId: 'step@gmail.com',
				    comment: 'sataurday is cricket day for step',
				    time: '2014-12-20 13:13' },
				  { id: 6,
				    topicId: 1,
				    emailId: 'mahesh@gmail.com',
				    comment: 'not now',
				    time: '2014-12-20 13:13' },
				  { id: 7,
				    topicId: 1,
				    emailId: 'prasenjit@gmail.com',
				    comment: 'thanq all for commenting',
				    time: '2014-12-20 13:13' } ]);
				done();
			});
		});
	});
	describe('Detect Global namespace Leaks', function(){
		it('global_namespace_is_not_polluted_in_windows_or_mac', function(){
			var global_fields = Object.keys(global).length;
			var isWindows = process.env.OS && process.env.OS.indexOf('Windows')==0;
			assert.equal(global_fields,(isWindows && 50)||31);
		});
	});
});

describe("openDBConnection", function(){
	it("it should throw an error 'DataBase file not found' on providing db Location which is not existing", function(done){
		var records = require("../ownModules/addaRecords.js").setLocation("bad.db");
		try{
			assert.notOk(records.openDBConnection());
		}
		catch(err){
			assert.deepEqual(err.message, "DataBase file not found")
		}
		done();
	});
})	
