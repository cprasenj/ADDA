var create = require("../ownModules/addaRecords.js").create;

var assert = require("chai").assert;

describe("adda",function(){
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
			var topics = ["Music","Cricket","STEP"];
			assert.deepEqual(lib.getTop5Topics(),topics);
			done();
		});
	});
});
