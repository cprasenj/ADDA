var fs = require('fs');
var _ = require('lodash');
var USERFILE = './data/addaDB.json';
var db = fs.existsSync(USERFILE)?
	JSON.parse(fs.readFileSync(USERFILE,'utf-8')):
	[];
var saveAll = function(){
	fs.writeFile(USERFILE,JSON.stringify(db));
};
exports.create = function(){
	return {
		save: function(user){
			if(_.some(db,{email:user.email}))
				return {error:'email already registered'};
			db[0]['users'].push(user);
			saveAll();
			return {};
		},
		load: function(email){
			return _.find(db.users,{email:email});
		}
	};
};