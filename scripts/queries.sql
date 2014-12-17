pragma foreign_keys = 'ON';
insert into users (emailId,name,secret) 
	values ('prasenjit@gmail.com','Parsenjit','prasenjit'), ('mahesh@gmail.com','Mahesh','mahesh');
insert into topics (name, description, ownersEmailId, startTime, closeTime)
	values ('Cricket', 'Horrible game', 'mahesh@gmail.com', '2014-12-17 15:12', '2014-12-17 16:14');
insert into comments (topicId, emailId, comment, time)
	values (1, 'mahesh@gmail.com', 'fool game','2014-12-20 13:13'), (1, 'prasenjit@gmail.com', 'nice game', '2014-12-25 18:18');