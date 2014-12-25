var records = require("../ownModules/addaRecords.js").create("./data/adda.db");
var assert = require("chai").assert;
var fs = require('fs');
var backUpDb = fs.readFileSync("./tests/data/db.db");

describe("Adda", function(){
	beforeEach(function(){
		fs.writeFileSync('./tests/data/db.db',backUpDb);
	});

	describe("")
});