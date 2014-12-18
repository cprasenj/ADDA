var records = require("../ownModules/addaRecords.js").create("./tests/data/db.json");
var assert = require("chai").assert;

describe("getTop5Topics",function(){
	it("returns three topics Music Cricket STEP", function(done){
		var topics = ["Music","Cricket","STEP"];
		assert.deepEqual(records.getTop5Topics(),topics);
		done();
	});
});