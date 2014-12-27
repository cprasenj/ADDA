var express = require('express');
var router = express.Router();
var records = require("../ownModules/addaRecords.js").create("./data/adda.db");

module.exports = router;

var loadUserFromSession = function(req,res,next){
	records.loadUser(req.session.userEmail,function(err,user){
		if(user){
			req.user = user;
			res.locals.user = user;
		}else{
			delete req.session.userEmail;
		}
		next();	
	});	
};
 var requireLogin = function(req,res,next){
	req.user ? next(): res.redirect("/login");
};

router.use(loadUserFromSession);

router.get('/', function(req, res) {
	records.getTop5Topics(function(topics){
		res.render('index', { title:'Home',topics:topics});
	});
});

router.get('/index', function(req, res) {
	records.getTop5Topics(function(topics){
		res.render('index', { title:'Home',topics:topics});
	});
});

router.get('/topic/:id',requireLogin,function(req,res) {
	var topicId = req.params.id;
	var loggedInMail = req.session.userEmail;
	records.getTopic(topicId, loggedInMail, function(topicDetails){
		topicDetails.userEmail = loggedInMail;
		res.render('topic',{topic:topicDetails});		
	});
});

router.get("/dashboard",requireLogin,function(req,res){
	var email = req.session.userEmail; 
	records.getMyTopics(email,function(err,myTopics){
		res.render('dashboard',{ title:'dashboard', myTopics:myTopics});
	});
});

// router.post('/topic/:id/addComment',requireLogin,function(req, res) {
// 	var body = req.body;
// 	body.id = req.params.id;
// 	records.addComment(body);
//     res.redirect('/topic/'+body.id);
// });

router.get("/topics",requireLogin,function(req,res){
	res.render('topics',{title:'Topics'})
});

router.post("/topicAdd",requireLogin,function(req,res){
	var email = req.session.userEmail; 
	var topicName = req.body.topicName;
	var topicDescription = req.body.topicDescription;
	records.addTopic(email,topicName,topicDescription,function(topicId){
		console.log("^%@#@^%%$@#@#$%#@^%@#$%^");
		res.redirect("topic/"+topicId);
	});
});

router.get('/login', function(req, res) {
	res.render('login',{title:'Login'});
});

router.post('/validate',function(req,res){
	records.validate(req.body,function(pageToRender,user,error){
		if(error){
			res.location('/login');
			res.render('login',{title:'login',error:error});
		}
		else {
			req.session.userEmail = user;
			res.redirect(pageToRender);
		}
	});
});

router.get('/registration',function(req,res) {
    res.render('registration');
});

router.post('/registration',function(req,res){ 
	var email = req.body.email;
  	var name = req.body.name;
  	var password = req.body.password;
  	records.createNewUser(email,name,password,function(err){
  		console.log("err",err)
  		if(err){
  			res.end("Email already Exists");
	  	} else{
	  		req.session.userEmail = req.body.email;
			res.redirect('/dashboard');
	  	} 
  	});
});

router.get("/logout",function(req,res){
	req.session.destroy();
	res.redirect("/");
});

router.get('/searchTopic',function(req,res){
	var searchText = req.query.text;
	records.searchTopic(searchText, function(err,relatedTopics){
		res.end(relatedTopics);
	});
});

router.get("/postComment",function(req,res){
	var comment = req.query.comment;
	var topicId = req.query.topicId;
	var userEmail = req.session.userEmail;
	records.addComment(comment,topicId,userEmail,function(err){
		if(err){ res.end(""); console.log(err)}
		else res.end("show");
	});
});
