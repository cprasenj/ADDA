// var postComment = function(topicId,userEmail,value){
// 	var commentElement = document.getElementById("currentComment");
// 	var comment = encodeURIComponent(commentElement.value);
// 	var request = "/postComment?comment="+comment+"&topicId="+topicId;
// 	sendAjaxGetRequest(toHtml,[comment,userEmail,topicId],request);
// 	commentElement.value = "";
// }

// var onCloseOrJoinOrLeave = function(id,buttonName){
// 	var request = "/"+buttonName.toLowerCase()+"/"+id;
// 	sendAjaxGetRequest(onResponseOfCJL,[id,buttonName],request)
// }

// var sendAjaxGetRequest = function(onComplete,values,request){
// 	var ajaxHttp = new XMLHttpRequest();
// 	ajaxHttp.onreadystatechange=function(){
// 		if (ajaxHttp.readyState==4 && ajaxHttp.status==200){
// 			var response = ajaxHttp.responseText;
// 			onComplete(values,response);
			
// 		}
// 	}
// 	ajaxHttp.open("GET",request,true);
// 	ajaxHttp.send();
// };

// var toHtml = function(values){
// 	if(response == "show"){
// 		comment = decodeURIComponent(values[0]);
// 		var date = String(new Date()).slice(0,21);
// 		var html = "Mail: <b>" + values[1] + "</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Time:<b>" + 
// 		    date + "</b><br><b>"+comment+"</b><br><br>";
// 		var elementToChange = document.getElementById("showComments");
// 		elementToChange.innerHTML = elementToChange.innerHTML + html;
// 	}
// 	else
// 		alert("Dont give single quotes")
// }

// var onClosed = function(){
// 	var closeButton = document.getElementById("CJL");
// 	closeButton.innerHTML = "Topic Closed";
// 	closeButton.disabled = true;
// 	var commentElement = document.getElementById("currentComment");
// 	commentElement.value = "You Cannot post any comments on Closed Topics";
// 	commentElement.readOnly = true;
// 	var postCommentButtonElement = document.getElementById("postComment");
// 	postCommentButtonElement.disabled = true;
// }

// var onJoin = function(){
// 	var leaveButton = document.getElementById("CJL");
// 	leaveButton.innerHTML = "Join";
// 	var commentElement = document.getElementById("currentComment");
// 	commentElement.value = "You need to Join to the topic to post comments";
// 	commentElement.readOnly = true;
// 	var postCommentButtonElement = document.getElementById("postComment");
// 	postCommentButtonElement.disabled = true;
// }

// var onLeave = function(){
// 	var joinButton = document.getElementById("CJL");
// 	joinButton.innerHTML = "Leave";
// 	var commentElement = document.getElementById("currentComment");
// 	commentElement.value = "";
// 	commentElement.readOnly = false;
// 	var postCommentButtonElement = document.getElementById("postComment");
// 	postCommentButtonElement.disabled = false;
// }

// var onErr = function(){

// }

// var onResponseOfCJL = function(values,response){
// 	var functionality = {
// 		"Closed":onClosed,
// 		"Join":onJoin,
// 		"Leave":onLeave,
// 		"Error":onErr
// 	};
// 	functionality[response]();
// }

// document.onreadystatechange = function(){
// 	var CJLElement = document.getElementById("CJL")
// 	onResponseOfCJL([],CJLElement.innerHTML);
// }
