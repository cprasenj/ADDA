var fs = require('fs');
var assert = require('chai').assert;
var lib = require('../ownModules/addaRecords.js').lib;

var readDB = function(location){
	if(fs.existsSync(location))
		return JSON.parse(fs.readFileSync(location,'utf-8'));
};
var db = readDB('data/home_db.json');

describe("readDB", function(){
	it("reads db.json",function(done){
		var db = readDB('data/home_db.json');
		assert.deepEqual({
			"topics": {
				"cricket" : {},
				"football" : {},
				"boxing" : {},
				"running" : {},
				"swimming" : {}
			}
		},db);
		done();
	});
});


describe("home page", function(){
	it("retrives no topics when db contains no topics", function(done){
		lib.getTop5Topics({},function(err,topics){
			assert.notOk(err);
			assert.deepEqual(topics,[]);
			done();
		});
	});
});