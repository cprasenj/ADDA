var fs = require('fs');
var _ = require('lodash');
var USERFILE = './tests/data/db.json';
var db = fs.existsSync(USERFILE)?
	JSON.parse(fs.readFileSync(USERFILE,'utf-8')):
	[];
	console.log(db);
var saveAll = function(USERFILE){
	fs.writeFile(USERFILE,JSON.stringify(db));
};
exports.create = function(location){
	if(location) USERFILE = location;
	return {
		save: function(user){
			if(_.some(db,{email:user.email}))
				return {error:'email already registered'};
			db[0]['users'].push(user);
			saveAll(USERFILE);
			return {};
		},
		load: function(email){
			return _.find(db[0]["loginDetails"],{email:email});
		}
	};
};