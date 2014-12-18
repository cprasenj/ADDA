diff --git a/data/topics.json b/data/topics.json
deleted file mode 100644
index 37982cf..0000000
--- a/data/topics.json
+++ /dev/null
@@ -1,8 +0,0 @@
-[
-	{"id":1,"name": "Cricket", "email": "budda@mail.com", "joined": ["mahesh@mail.com", "prajapati@mail.com"]},
-	{"id":2,"name": "Politics", "email": "mahesh@mail.com", "joined": ["budda@mail.com", "prasanjit@mail.com"]},
-	{"id":3,"name": "Movies", "email": "prajapati@mail.com", "joined": ["budda@mail.com", "suparna@mail.com"]},
-	{"id":4,"name": "Music", "email": "rani@mail.com", "joined": ["mahesh@mail.com", "prasanjit@mail.com"]},
-	{"id":5,"name": "Televison", "email": "mahesh@mail.com", "joined": ["budda@mail.com", "suparna@mail.com"]},
-	{"id":6,"name": "Cartoon", "email": "prasanjit@mail.com", "joined": ["rani@mail.com", "prajapati@mail.com"]}
-]
\ No newline at end of file
diff --git a/ownModules/addaRecords.js b/ownModules/addaRecords.js
index f883e44..c1a423e 100644
--- a/ownModules/addaRecords.js
+++ b/ownModules/addaRecords.js
@@ -7,12 +7,7 @@ exports.Create = function(location){
 }
 
 records.getMyTopics = function(email){
-	var myTopics = topics.filter(function(topic){
-		if(topic['email'] == email)
-			return true;
-		if(topic["joined"].indexOf(email) > -1)
-			return true;
-	});
+	var myTopics = topics["userTopics"]["email"];
 	return myTopics;
 }
 
diff --git a/tests/data/topics.json b/tests/data/topics.json
deleted file mode 100644
index 37982cf..0000000
--- a/tests/data/topics.json
+++ /dev/null
@@ -1,8 +0,0 @@
-[
-	{"id":1,"name": "Cricket", "email": "budda@mail.com", "joined": ["mahesh@mail.com", "prajapati@mail.com"]},
-	{"id":2,"name": "Politics", "email": "mahesh@mail.com", "joined": ["budda@mail.com", "prasanjit@mail.com"]},
-	{"id":3,"name": "Movies", "email": "prajapati@mail.com", "joined": ["budda@mail.com", "suparna@mail.com"]},
-	{"id":4,"name": "Music", "email": "rani@mail.com", "joined": ["mahesh@mail.com", "prasanjit@mail.com"]},
-	{"id":5,"name": "Televison", "email": "mahesh@mail.com", "joined": ["budda@mail.com", "suparna@mail.com"]},
-	{"id":6,"name": "Cartoon", "email": "prasanjit@mail.com", "joined": ["rani@mail.com", "prajapati@mail.com"]}
-]
\ No newline at end of file
diff --git a/tests/tests.js b/tests/tests.js
index b7b9bd3..bf023c6 100644
--- a/tests/tests.js
+++ b/tests/tests.js
@@ -1,4 +1,4 @@
-var records = require("../ownModules/addaRecords.js").Create("./tests/data/topics.json");
+var records = require("../ownModules/addaRecords.js").Create("./tests/data/testData.json");
 var assert = require("chai").assert;
 
 describe("dashboard1", function(){
