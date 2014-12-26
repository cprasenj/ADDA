var postComment = function(){
	var comment = document.getElementById("currentComment").value;
}

var sendAjaxGetRequest = function(request,elementToChange){
	var ajaxHttp = new XMLHttpRequest();
	ajaxHttp.onreadystatechange=function(){
		if (ajaxHttp.readyState==4 && ajaxHttp.status==200){
			var response = ajaxHttp.responseText;
			elementToChange.innerHTML=response;
		}
	}
	ajaxHttp.open("GET",request,true);
	ajaxHttp.send();
};