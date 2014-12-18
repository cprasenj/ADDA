var lib = require("../ownModules/addaRecords.js").create("./tests/data/db.json");
var assert = require("chai").assert;

describe("adda",function(){
	describe("getMyTopics-1",function(){
		it("should give all topics created and joined by mahesh@mail.com",function(done){
			var myTopics = lib.getMyTopics("mahesh@mail.com");
			assert.deepEqual(myTopics,[ { topicId: 1, topicName: 'Music' },
 				{ topicId: 2, topicName: 'Cricket' },
  				{ topicId: 3, topicName: 'STEP' } ]);
			done();
		});
	});
	describe("getMyTopics-2",function(){
		it("should give all topics created and joined by prajapati@mail.com",function(done){
			var myTopics = lib.getMyTopics("mahesh@mail.com");
			assert.deepEqual(myTopics,[ { topicId: 1, topicName: 'Music' },
 				{ topicId: 2, topicName: 'Cricket' },
  				{ topicId: 3, topicName: 'STEP' } ]);
			done();
		});
	});
	describe("getTop5Topics",function(){
		it("returns three topics Music Cricket STEP", function(done){
			var topics = ["Music","Cricket","STEP"];
			assert.deepEqual(lib.getTop5Topics(),topics);
			done();
		});
	});
});