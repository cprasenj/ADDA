var comment = {
		comments : "cpresen@gmail.com",
		time : "10:00",
		comment : "Cool Stuff"
	};
var commentS = [comment, JSON.parse(JSON.stringify(comment)), JSON.parse(JSON.stringify(comment)),
		JSON.parse(JSON.stringify(comment)),JSON.parse(JSON.stringify(comment)),
		JSON.parse(JSON.stringify(comment)),JSON.parse(JSON.stringify(comment))
	];
exports.topics = [{
		id :1, 
		name : "Cricket",
		ownerName : "Jayanth",
		startTime : "Monday 12:30",
		description : "Waste of time",
		comments : commentS
	},
	{
		id :2, 
		name : "Cricket",
		ownerName : "Jayanth",
		startTime : "Monday 12:30",
		description : "Waste of time",
		comments : commentS
	}];