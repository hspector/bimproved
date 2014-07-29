function recognize(){
    navigator.speechrecognizer.recognize(successCallback, failCallback, 1, "Cordova Speech Recognizer Plugin");
    
    function successCallback(results){
        var speechTranscript = document.getElementById('problem');
        speechTranscript.value = results;
    }

    function failCallback(error){
        alert("Error: " + error);
    }
}