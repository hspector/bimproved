var speech={
	
	recognize:function(){

navigator.speechrecognizer.recognize(successCallback, failCallback, 5, "Cordova Speech Recognizer Plugin");
function successCallback(results){
    alert("Results: " + results);
}

function failCallback(error){
    alert("Error: " + error);
}
alert("Hey it works!");

	}
}