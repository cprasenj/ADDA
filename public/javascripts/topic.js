var postComment = function(topicId,userEmail){
	var commentElement = document.getElementById("currentComment");
	var comment = encodeURIComponent(commentElement.value);
	var elementToChange = document.getElementById("showComments");
	sendAjaxGetRequest(comment,elementToChange,userEmail,topicId);
	commentElement.value = "";
}

var sendAjaxGetRequest = function(comment,elementToChange,email,topicId){
	var request = "/postComment?comment="+comment+"&topicId="+topicId;
	var ajaxHttp = new XMLHttpRequest();
	ajaxHttp.onreadystatechange=function(){
		if (ajaxHttp.readyState==4 && ajaxHttp.status==200){
			var response = ajaxHttp.responseText;
			if(response == "show"){
				elementToChange.innerHTML = elementToChange.innerHTML + toHtml(email,comment);
				comment = "";
			}
			else
				alert("Dont give single quotes")
		}
	}
	ajaxHttp.open("GET",request,true);
	ajaxHttp.send();
};

var toHtml = function(email,comment){
	comment = decodeURIComponent(comment);
	var date = String(new Date()).slice(0,21);
	var html = "Mail: <b>" + email + "</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Time:<b>" + 
	    date + "</b><br><b>"+comment+"</b><br><br>";
	return html;
}
