var records = require("../ownModules/addaRecords.js").Create("./tests/data/topics.json");
var assert = require("chai").assert;

describe("dashboard1", function(){
	it("should give an array of objects contains all topics related to email:mahesh@mail.com", function(done){
		var myTopics = records.getMyTopics("mahesh@mail.com");
		assert.deepEqual(myTopics,[
			{"id":1,"name": "Cricket", "email": "budda@mail.com", "joined": ["mahesh@mail.com", "prajapati@mail.com"]},
			{"id":2,"name": "Politics", "email": "mahesh@mail.com", "joined": ["budda@mail.com", "prasanjit@mail.com"]},
			{"id":4,"name": "Music", "email": "rani@mail.com", "joined": ["mahesh@mail.com", "prasanjit@mail.com"]},
			{"id":5,"name": "Televison", "email": "mahesh@mail.com", "joined": ["budda@mail.com", "suparna@mail.com"]}
		]);
		done();
	});
});
describe("dashboard2", function(){
	it("should give an array of objects contains all topics related to email:prajapati@mail.com", function(done){
		var myTopics = records.getMyTopics("prajapati@mail.com");
		assert.deepEqual(myTopics,[
			{"id":1,"name": "Cricket", "email": "budda@mail.com", "joined": ["mahesh@mail.com", "prajapati@mail.com"]},
{"id":3,"name": "Movies", "email": "prajapati@mail.com", "joined": ["budda@mail.com", "suparna@mail.com"]},
	{"id":6,"name": "Cartoon", "email": "prasanjit@mail.com", "joined": ["rani@mail.com", "prajapati@mail.com"]}
		]);
		done();
	});
});

