var create = require("../ownModules/addaRecords.js").create;
var assert = require("chai").assert;
var fs = require('fs');
var backUpDb = fs.readFileSync("./tests/data/db.json");

describe("#adda",function(){
	beforeEach(function(){
		fs.writeFileSync('./tests/data/db.json',backUpDb);
	});
	describe("#searchTopics",function(){
		describe("#getTopicNames",function(){
			it("should returns the name of topics",function(done){
				var lib = create("./tests/data/db.json", 0);
  				var actual = lib.getRelatedTopics();
  				var expected = ["Music", "Cricket","STEP"];
  				assert.deepEqual(actual,expected);		
  				done();
			});
			it("should return Cricket when Cri is typed",function(done){
				var lib = create("./tests/data/db.json", 0);
				var actual = lib.getRelatedTopics("Cri");
  				var expected = ["Cricket"];
  				assert.deepEqual(actual,expected);		
  				done();
			});
			it("should return Music when Mu is typed",function(done){
				var lib = create("./tests/data/db.json", 0);
				var actual = lib.getRelatedTopics("Mu");
  				var expected = ["Music"];
  				assert.deepEqual(actual,expected);		
  				done();
			});
			it("should return STEP when Ep is typed",function(done){
				var lib = create("./tests/data/db.json", 0);
				var actual = lib.getRelatedTopics("Ep");
  				var expected = ["STEP"];
  				assert.deepEqual(actual,expected);		
  				done();
			});
		});
	});
	describe("getMyTopics",function(){
		it("should give all topics created and joined by mahesh@mail.com",function(done){
			var lib = create("./tests/data/db.json", 0);
			var myTopics = lib.getMyTopics("mahesh@mail.com");
			assert.deepEqual(myTopics,[ { topicId: 1, topicName: 'Music' },
 				{ topicId: 2, topicName: 'Cricket' },
  				{ topicId: 3, topicName: 'STEP' } ]);
			done();
		});
		it("should give all topics created and joined by prajapati@mail.com",function(done){
			var lib = create("./tests/data/db.json", 0);
			var myTopics = lib.getMyTopics("mahesh@mail.com");
			assert.deepEqual(myTopics,[ { topicId: 1, topicName: 'Music' },
 				{ topicId: 2, topicName: 'Cricket' },
  				{ topicId: 3, topicName: 'STEP' } ]);
			done();
		});
		it("should give all topics created and joined by budda@mail.com from database index 1",function(done){
			var lib = create("./tests/data/db.json", 1);
			var myTopics = lib.getMyTopics("budda@mail.com");
			assert.deepEqual(myTopics,[ { topicId: 2, topicName: 'Cricket' },
 				{ topicId: 1, topicName: 'Music' } ]);
			done();
		});
	});
	describe("getTop5Topics",function(){
		it("returns three topics Music Cricket STEP", function(done){
			var lib = create("./tests/data/db.json", 0);
			var topics = ["STEP","Cricket","Music"];
			assert.deepEqual(lib.getTop5Topics(),topics);
			done();
		});
		it("returns all the five topics when there are only five topics", function(done){
			var lib = create("./tests/data/db.json", 2);
			var topics = ["Films","Comedy","Cricket","Dance","Music"];
			assert.deepEqual(lib.getTop5Topics(),topics);
			done();
		});
		it("returns the latest five topics when there are more than five topics", function(done){
			var lib = create("./tests/data/db.json", 3);
			var topics = [ 'Cricket','Action','Films','Comedy','Romance' ];
			assert.deepEqual(lib.getTop5Topics(),topics);
			done();
		});
		it("returns empty array when there is no topics", function(done){
			var lib = create("./tests/data/db.json", 4);
			var topics = [];
			assert.deepEqual(lib.getTop5Topics(),topics);
			done();
		});
	});
	describe("addTopic",function(){
		it("should add new topic to the user budda@mail.com",function(done){
			var lib = create("./tests/data/db.json", 5);
			var id = lib.addTopic("budda@mail.com","TeamWork","What is TeamWork");
			assert.equal(id,3);
			assert.equal(lib.getTop5Topics()[0],"TeamWork");
			assert.deepEqual(lib.getAllTopics()[id],{ name: 'TeamWork',
 				ownerEmailId: 'budda@mail.com',
  				startTime: String(new Date()).slice(0,21),
  				closeTime: 'Not Closed',
  				description: 'What is TeamWork',
  				comments: [] });
			done();
		});
		it("should add new topic to the user mahesh@mail.com",function(done){
			var lib = create("./tests/data/db.json", 5);
			var id = lib.addTopic("mahesh@mail.com","Diwali","Festival of light");
			assert.equal(id,3);
			assert.deepEqual(lib.getAllTopics()[id],{ name: 'Diwali',
 				ownerEmailId: 'mahesh@mail.com',
  				startTime: String(new Date()).slice(0,21),
  				closeTime: 'Not Closed',
  				description: 'Festival of light',
  				comments: [] });
			done();
		});
	});

	describe("getAllTopics", function(){
		it("should get all the topics in the database", function(done){
			var lib = create("./tests/data/db.json", 5);
			assert.deepEqual(lib.getAllTopics()[1],{ name: 'Music',
  				ownerEmailId: 'mahesh@mail.com',
				startTime: '11-12-2014 11:05',
				closeTime: 'Not Closed',
				description: 'Jayanth Knows about it well',
				comments: [] });
			done();
		});
		it("should get all the topics in the database cheking 2nd topic", function(done){
			var lib = create("./tests/data/db.json", 5);
			assert.deepEqual(lib.getAllTopics()[2],{
				name: "Cricket",
				ownerEmailId: "budda@mail.com", 
				startTime: "12-12-2014 10:05", 
				closeTime: "Not Closed",
				description: "Swamiji Knows about it well",
				comments: [] });
			done();
		});
	});
	describe("validate",function(){
		it("returns false when emailId doesn't match",function(){
			var lib = create("./tests/data/db.json",0);
			var loginDetails = {"emailId" : "mah@mail.com", "password": "secret"};
			assert.notOk(lib.validate(loginDetails));
		});
		it("returns false when password doesn't match",function(){
			var lib = create("./tests/data/db.json",0);
			var loginDetails = {"emailId" : "mahesh@mail.com", "password": "goodboy"};
			assert.notOk(lib.validate(loginDetails));
		});
		it("returns true when emailId and password matches",function(){
			var lib = create("./tests/data/db.json",0);
			var loginDetails = {"emailId" : "mahesh@mail.com", "password": "mahesh"};
			assert.ok(lib.validate(loginDetails));
		});
	});
	
	describe("createNewUser",function(){
		it("should create a new user in the database", function(done){
			var lib = create("./tests/data/db.json",5);
			var created = lib.createNewUser("sample@mail.com","Sample","secret");
			assert.ok(created);
			assert.deepEqual(lib.loadUser("sample@mail.com"),{
				name: "Sample",
				password: "secret"
			});
			done();
		});
	});

	describe("loadUser",function(){
		it("should loadUser the user of given email id",function(done){
			var lib = create("./tests/data/db.json",0);
			assert.deepEqual(lib.loadUser("mahesh@mail.com"),{
  				name: 'Mahesh Kumar',
  				password: 'mahesh' });
			done();
		});
		it("should loadUser the user of given email id budda@mail.com",function(done){
			var lib = create("./tests/data/db.json",0);
			assert.deepEqual(lib.loadUser("budda@mail.com"),{
  				name: 'Buddarthan A N',
  				password: 'secret' });
			assert.notOk(false);
			done();
		});
	});
	
});
//====================================================================================================
var lib = require("../ownModules/addaRecords.js").init('./tests/data/db.db');
var fs = require('fs');
var dbFileData = fs.readFileSync('tests/data/db.db.backup');
describe("addaRecords",function(){
	beforeEach(function(){
		fs.writeFileSync('./tests/data/db.db',dbFileData);
	});
	describe("getAllTopics", function(){
		it("should get all the topics in the database", function(done){
			lib.getAllTopics(function(err,topics) {
				assert.deepEqual(topics, [ { id: 1,
					name: 'Cricket',
					description: 'Horrible game',
					ownersEmailId: 'mahesh@gmail.com',
					startTime: '2014-12-17 15:12',
					closeTime: '2014-12-17 16:14' },
					{ id: 2,
					name: 'football',
					description: 'Horrible game',
					ownersEmailId: 'prasenjit@gmail.com',
					startTime: '2014-12-17 15:12',
					closeTime: '2014-12-17 16:14' },
					{ id: 3,
					name: 'foobar',
					description: 'Something is smelling',
					ownersEmailId: 'mahesh@gmail.com',
					startTime: '2014-12-17 15:12',
					closeTime: '2014-12-17 16:14' }  
					]);
				done();
			})
		});
	});
	describe('#getRelatedTopics', function(){
		it("should get the topic asked by the user", function(done){
			lib.getRelatedTopics("Cricket",function(err,relatedTopics) {
				var expected = [{id : 1, name : 'Cricket'}];
				var actual = relatedTopics;
				assert.deepEqual(expected,actual);
				done();
			})
		});
		it("should give 'football' when search keyword is 'foot' ", function(done){
			lib.getRelatedTopics("foot",function(err,relatedTopics) {
				var expected = [{id : 2, name : 'football'}];
				var actual = relatedTopics;
				assert.deepEqual(expected,actual);
				done();
			})
		});
		it("should give [] when searched topic is not present in db", function(done){
			lib.getRelatedTopics("badSearch",function(err,relatedTopics) {
				var expected = [];
				var actual = relatedTopics;
				assert.deepEqual(expected,actual);
				done();
			})
		});
		it("should get all the topic related to keyword searched by the user ", function(done){
			lib.getRelatedTopics("foo",function(err,relatedTopics) {
				var expected = [{id : 2, name : 'football'}, {id : 3, name : 'foobar'}];
				var actual = relatedTopics;
				assert.deepEqual(expected,actual);
				done();
			})
		});
	});
	// describe("getMyTopics",function(){
	// 	it("should give all topics created and joined by mahesh@mail.com",function(done){
	// 		lib.getMyTopics("mahesh@mail.com", function(err, myTopics){
	// 			var expected = [ { topicId: 1, topicName: 'Music' },
 // 								{ topicId: 2, topicName: 'Cricket' },
 //  								{ topicId: 3, topicName: 'STEP' } ];
 //  				var actual = myTopics;
	// 			assert.deepEqual(actual, expected);	
	// 			done();
	// 		});
	// 	});
		// it("should give all topics created and joined by prajapati@mail.com",function(done){
		// 	var lib = create("./tests/data/db.json", 0);
		// 	var myTopics = lib.getMyTopics("mahesh@mail.com");
		// 	assert.deepEqual(myTopics,[ { topicId: 1, topicName: 'Music' },
 	// 			{ topicId: 2, topicName: 'Cricket' },
  // 				{ topicId: 3, topicName: 'STEP' } ]);
		// 	done();
		// });
		// it("should give all topics created and joined by budda@mail.com from database index 1",function(done){
		// 	var lib = create("./tests/data/db.json", 1);
		// 	var myTopics = lib.getMyTopics("budda@mail.com");
		// 	assert.deepEqual(myTopics,[ { topicId: 2, topicName: 'Cricket' },
 	// 			{ topicId: 1, topicName: 'Music' } ]);
		// 	done();
		// });
	// });
});
