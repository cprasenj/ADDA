pragma foreign_keys = 'ON';
-- insert into users (emailId,name,secret) 
	-- values ('prasenjit@gmail.com','Parsenjit','prasenjit'), ('mahesh@gmail.com','Mahesh','mahesh');

-- insert into topics (name, description, ownersEmailId, startTime, closeTime)
	-- values ('Cricket', 'Horrible game', 'mahesh@gmail.com', '2014-12-17 15:12', '2014-12-17 16:14');

-- insert into topics (name, description, ownersEmailId, startTime, closeTime)
	-- values ('football', 'Horrible game', 'prasenjit@gmail.com', '2014-12-17 15:12', '2014-12-17 16:14');

-- insert into topics (name, description, ownersEmailId, startTime, closeTime)
	-- values ('foobar', 'Something is smelling', 'mahesh@gmail.com', '2014-12-17 15:12', '2014-12-17 16:14');

-- insert into topics (name, description, ownersEmailId, startTime, closeTime)
	-- values ('hockey', 'Horrible game', 'prasenjit@gmail.com', '2014-12-17 15:12', '2014-12-17 16:14');
-- insert into topics (name, description, ownersEmailId, startTime, closeTime)
	-- values ('TT', 'Horrible game', 'prasenjit@gmail.com', '2014-12-17 15:12', '2014-12-17 16:14');
-- insert into topics (name, description, ownersEmailId, startTime, closeTime)
	-- values ('FuseBall', 'Horrible game', 'prasenjit@gmail.com', '2014-12-17 15:12', '2014-12-17 16:14');
-- insert into topics (name, description, ownersEmailId, startTime, closeTime)
	-- values ('KhoKho', 'Horrible game', 'prasenjit@gmail.com', '2014-12-17 15:12', '2014-12-17 16:14');					

-- insert into comments (topicId, emailId, comment, time)
	-- values (1, 'mahesh@gmail.com', 'fool game','2014-12-20 13:13'), (1, 'prasenjit@gmail.com', 'nice game', '2014-12-25 18:18');

-- insert into joinTopic (emailId, topicId)
	-- values ('mahesh@gmail.com', 1), ('prasenjit@gmail.com', 2), ('mahesh@mail.com', 3);
insert into users(emailId,name,secret) 
	values
	('mahesh@gmail.com','Mahesh','mahesh'),
	('budda@gmail.com','Budda','budda'),
	('prasenjit@gmail.com','Parsenjit','prasenjit'),
	('suparna@gmail.com','Suparna','suparna'),
	('prajapati@gmail.com','Prajapati','prajapati'),
	('pooja@gmail.com','Pooja','pooja'),
	('step@gmail.com','STEP','step');

insert into topics (name, description, ownersEmailId, startTime, closeTime)
	values
	('Cricket', 'Swamiji is very good cricket player', 'prasenjit@gmail.com', '2014-12-17 15:12', 'Not Closed'),
	('Music', 'Jayanth knows about it well', 'mahesh@gmail.com', '2014-12-17 15:12', 'Not Closed'),
	('STEP', 'Two year internship', 'step@gmail.com', '2014-12-17 15:12', 'Not Closed'),
	('ThoughtWorks', 'The Leading Software company', 'budda@gmail.com', '2014-12-17 15:12', 'Not Closed'),
	('Adda', 'Bangali Small disscussion', 'suparna@gmail.com', '2014-12-17 15:12', 'Not Closed'),
	('Punjab', 'A State in India', 'pooja@gmail.com', '2014-12-17 15:12', 'Not Closed'),
	('Vijayawada', 'New Capital of A.P', 'mahesh@gmail.com', '2014-12-17 15:12', 'Not Closed'),
	('Football', 'Horrible game', 'prasenjit@gmail.com', '2014-12-17 15:12', '2014-12-17 16:14');
insert into comments (topicId, emailId, comment, time)
	values
	(1, 'mahesh@gmail.com', 'Very nice game','2014-12-20 13:13'),
	(1, 'budda@gmail.com', 'i like this game','2014-12-20 13:13'),
	(1, 'prajapati@gmail.com', 'i dont know how to play','2014-12-20 13:13'),
	(1, 'suparna@gmail.com', 'i want to learn cricket','2014-12-20 13:13'),
	(1, 'step@gmail.com', 'sataurday is cricket day for step','2014-12-20 13:13'),
	(1, 'mahesh@gmail.com', 'not now','2014-12-20 13:13'),
	(1, 'prasenjit@gmail.com', 'thanq all for commenting','2014-12-20 13:13'),
	(2, 'mahesh@gmail.com', 'DSP is my favourite music director','2014-12-20 13:13'),
	(2, 'suparna@gmail.com', 'ARR music is nice','2014-12-20 13:13'),
	(3, 'mahesh@gmail.com', 'nice platform for learning','2014-12-20 13:13'),
	(3, 'budda@gmail.com', 'fun, learn and earn','2014-12-20 13:13'),
	(7, 'mahesh@gmail.com', 'Beautifull City', '2014-12-25 18:18');

insert into joinedTopics (email, topicId, topicName)
	values
	("mahesh@gmail.com","1","Cricket"),
	("budda@gmail.com","1","Cricket"),
	("prajapati@gmail.com","1","Cricket"),
	("suparna@gmail.com","1","Cricket"),
	("step@gmail.com","1","Cricket"),
	("suparna@gmail.com","2","Music"),
	("mahesh@gmail.com","3","STEP"),
	("budda@gmail.com","3","STEP");
