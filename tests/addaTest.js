var records = require("../ownModules/addaRecords.js").create("./tests/data/db.db");
var assert = require("chai").assert;
var fs = require('fs');
var backUpDb = fs.readFileSync("./tests/data/db.db");

describe("Adda", function(){
	beforeEach(function(){
		fs.writeFileSync('./tests/data/db.db',backUpDb);
	});

	describe("getMyTopics", function(){
		it("should give all created and joined topics of mail mahesh@gmail.com", function(done){
			records.getMyTopics("mahesh@gmail.com",function(err,myTopics){
				assert.deepEqual(myTopics,[ 
					{ id: 2, name: 'Music' },
  					{ id: 7, name: 'Vijayawada'},
  					{ id: 1, name: 'Cricket' },
  					{ id: 5, name: 'STEP' } ]);
				done();
			});
		});
	});
	describe("getMyJoinedTopics",function(){
		it("should give all joined topics of mahesh@gmail.com", function(done){
			records.getMyJoinedTopics("mahesh@gmail.com",function(err,myJoinedTopics){
				assert.deepEqual(myJoinedTopics,[
					{ id: 1, name: 'Cricket' },
  					{ id: 5, name: 'STEP' } ]);
				done();
			});
		});
	});
	describe("getMyCreatedTopics",function(){
		it("should give all joined topics of mahesh@gmail.com", function(done){
			records.getMyCreatedTopics("mahesh@gmail.com",function(err,myJoinedTopics){
				assert.deepEqual(myJoinedTopics,[ 
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
		it("should validate the user details of mahesh@gmail.com", function(done){
			records.validate({emailId:"mahesh@gmail.com",password:"mahesh"},function(page,mail){
				assert.equal(page,"/dashboard");
				assert.equal(mail,"mahesh@gmail.com");
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
	
});