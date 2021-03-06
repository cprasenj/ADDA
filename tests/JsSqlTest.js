var JsSql = require("../ownModules/JsSql").JsSql;
var assert = require('chai').assert;
var sqlite = require('sqlite3');
var db = new sqlite.Database("./tests/data/instance.db");

describe('JsSql',function(){
	describe("select",function(){
		it("should give query of 'SELECT *'",function(){
			var a = new JsSql();
			a.select();
			assert.equal(a.query,"SELECT *");
		})
	})
	describe("from",function(){
		it("should give 'SELECT id FROM students'",function(){
			var a = new JsSql();
			a.select(["id"]);
			a.from("students");
			assert.equal(a.query,"SELECT id FROM students");
		})
	});
	describe("as",function(){
		it("should give 'SELECT id AS st_id FROM students'",function(){
			var a = new JsSql();
			a.select(["id"]).as(["st_id"]);
			a.from("students");
			assert.equal(a.query,"SELECT id AS st_id FROM students");
		})
	});
	describe("where",function(){
		it("should give 'SELECT id AS st_id FROM students WHERE name=mahesh'",function(){
			var a = new JsSql();
			a.select(["id"]).as(["st_id"]);
			a.from("students");
			assert.equal(a.query,"SELECT id AS st_id FROM students");
			a.where(["name='mahesh'"]);
			assert.equal(a.query,"SELECT id AS st_id FROM students WHERE name='mahesh'");
		})
	});
	describe("connectors",function(){
		it("should give 'SELECT * FROM students WHERE name=mahesh and id=1'",function(){
			var a = new JsSql();
			a.select(["*"]);
			a.from("students");
			a.where(["name='mahesh'","id=1"]).connectors(["and"]);
			assert.equal(a.query,"SELECT * FROM students WHERE name='mahesh' and id=1");
		})
	});
	describe("insertInto",function(){
		it("should give 'INSERT INTO sb'",function(){
			var a = new JsSql();
			a.insertInto("sb");
			assert.equal(a.query,"INSERT INTO sb");
		})
	});
	describe("someFields",function(){
		it("should give 'INSERT INTO sb('id')'",function(){
			var a = new JsSql();
			a.insertInto("sb").someFields(["id","name"]);
			assert.equal(a.query,"INSERT INTO sb('id','name')");
		})
	});
	describe("values",function(){
		it("should give 'INSERT INTO sb('id') VALUES('1')'",function(){
			var a = new JsSql();
			a.insertInto("sb").someFields(["id"]);
			a.values(["1"]);
			assert.equal(a.query,"INSERT INTO sb('id') VALUES('1')");
		})
	});
	describe("update",function(){
		it("should give 'UPDATE emp",function(){
			var a = new JsSql();
			a.update("emp");
			assert.equal(a.query,"UPDATE emp");
		})
	});
	describe("set",function(){
		it("should give 'UPDATE emp SET id",function(){
			var a = new JsSql();
			a.update("emp");
			a.set(["id"]);
			assert.equal(a.query,"UPDATE emp SET id#VAL#");
		})
	});
	describe("(set)values",function(){
		it("should give 'UPDATE emp SET id='1'",function(){
			var a = new JsSql();
			a.update("emp");
			a.set(["id"]).values(["1"]);
			assert.equal(a.query,"UPDATE emp SET id='1'");
		})
	});
	describe("ready",function(){
		it("should set db,method and callback",function(){
			var a = new JsSql();
			var callback = function(){};
			a.ready({},'get',callback);
			assert.deepEqual(a.db,{});
			assert.deepEqual(a.method,'get');
			assert.deepEqual(a.callback,callback);
		});
	});
	describe("fire",function(){
		it("should call the callback with null, budda@gmail.com",function(done){
			var a = new JsSql();
			a.query = "select emailId from comments where id=2";
			a.ready(db,'get', function(err,result){
				assert.ok(!err);
				assert.deepEqual(result,{'emailId':'budda@gmail.com'});
				done();
			});
			a.fire();
		});
	});
});