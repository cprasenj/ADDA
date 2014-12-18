var create = require("../ownModules/addaRecords.js").create;
var assert = require("chai").assert;
var fs = require('fs');
var backUpDb = fs.readFileSync("./tests/data/backUp.json");

describe("adda",function(){
	beforeEach(function(){
		fs.writeFileSync('./tests/data/db.json',backUpDb);
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
			done();
		});
	});
});