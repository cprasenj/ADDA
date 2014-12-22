var assert = require("chai").assert;
var fs = require('fs');
var userStore = require("../library/userStore.js").create("./data/db.json");

// describe("userStore", function(){
// 	describe("load",function(){
// 		it("should load the user of given email id",function(done){
// 			assert.deepEqual(userStore.load("mahesh@mail.com"),{ email: 'mahesh@mail.com',
//   				name: 'Mahesh Kumar',
//   				password: 'mahesh' });
// 			done();
// 		});
// 		it("should load the user of given email id budda@mail.com",function(done){
// 			assert.deepEqual(userStore.load("budda@mail.com"),{ email: 'budda@mail.com',
//   				name: 'Buddarthan A N',
//   				password: 'secret' });
// 			done();
// 		});

// 	});

// });