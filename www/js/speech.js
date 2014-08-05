var countProb = 0;
var countRoom = 0;
var countWhen = 0;
var countCateogy = 0;
var countWhere = 0;
function recognize(){
    navigator.speechrecognizer.recognize(successCallback, failCallback, 1, "Cordova Speech Recognizer Plugin"); 

    function errorCheck(counter) {
        if (counter % 3 == 0) {
            navigator.tts.speak("I'm sorry, I'm having trouble understanding you. Try typing the problem or speaking again.");
            alert("I'm sorry, I'm having trouble understanding you. Try typing the problem or speaking again.")
        }
    }
    function successCallback(results){
    	var speechTranscript = results.toString();
        speechTranscript = speechTranscript.toLowerCase();
        navigator.tts.speak(speechTranscript);
        var whereBox = document.getElementById('where');
        var catBox = document.getElementById('category');
        alert(speechTranscript);
    	if (speechTranscript.indexOf("problem") > -1) {
    		var problemBox = document.getElementById('problem');
       		problemBox.value = speechTranscript.substring(15);
            countProb++;
            errorCheck(countProb);
    	}
        if (speechTranscript.indexOf("room") > -1) {
            var roomBox = document.getElementById('room');
            roomBox.value = speechTranscript.substring(12);
            countRoom++;
            errorCheck(countRoom);
        }
        if (speechTranscript.indexOf("date") > -1) {
            var whenBox = document.getElementById('when');
            whenBox.value = speechTranscript.substring(12);
            countWhen++;
            errorCheck(countWhen);
        }
        if (speechTranscript.indexOf("category") > -1) {
            countCateogy++;
            errorCheck(countCateogy);
            if (speechTranscript.indexOf("appliance") > -1) {
                catBox.selectedIndex = 0;
            }
            if (speechTranscript.indexOf("classroom") > -1 || speechTranscript.indexOf("problem") > -1) {
                catBox.selectedIndex = 1;
            }
            if (speechTranscript.indexOf("custodial") > -1) {
                catBox.selectedIndex = 2;
            }
            if (speechTranscript.indexOf("door") > -1 || speechTranscript.indexOf("doors") > -1 || speechTranscript.indexOf("lock") > -1 || speechTranscript.indexOf("locks") > -1 || speechTranscript.indexOf("key") > -1 || speechTranscript.indexOf("keys") > -1) {
                catBox.selectedIndex = 3;
            }
            if (speechTranscript.indexOf("dorm") > -1 || speechTranscript.indexOf("furniture") > -1) {
                catBox.selectedIndex = 4;
            }
            if (speechTranscript.indexOf("electrical") > -1) {
                catBox.selectedIndex = 5;
            }
            if (speechTranscript.indexOf("fire") > -1 || speechTranscript.indexOf("safety") > -1) {
                catBox.selectedIndex = 6;
            }
            if (speechTranscript.indexOf("general") > -1) {
                catBox.selectedIndex = 7;
            } 
            if (speechTranscript.indexOf("heating") > -1 || speechTranscript.indexOf("air conditioning") > -1 || speechTranscript.indexOf("conditioning") > -1) {
                catBox.selectedIndex = 8;
            }
            if (speechTranscript.indexOf("pest") > -1 || speechTranscript.indexOf("control") > -1 || speechTranscript.indexOf("extermination") > -1 || speechTranscript.indexOf("exterminating") > -1) {
                catBox.selectedIndex = 9;
            }
            if (speechTranscript.indexOf("plumbing") > -1) {
                catBox.selectedIndex = 10;
            }
            if (speechTranscript.indexOf("window") > -1 || speechTranscript.indexOf("windows") > -1) {
                catBox.selectedIndex = 11;
            }
        }
    	if (speechTranscript.indexOf("location") > -1) {
            countWhere++;
            errorCheck(countWhere);
            if (speechTranscript.indexOf("567") > -1 || speechTranscript.indexOf("south") > -1 || speechTranscript.indexOf("street") > -1) {
                whereBox.selectedIndex = 0;
            }
            if (speechTranscript.indexOf("abraham") > -1 || speechTranscript.indexOf("academic") > -1) {
                whereBox.selectedIndex = 1;
            }
            if (speechTranscript.indexOf("bassine") > -1 || speechTranscript.indexOf("science building") > -1) {
                whereBox.selectedIndex = 2;
            }
            if (speechTranscript.indexOf("brown") > -1 || speechTranscript.indexOf("social science") > -1) {
                whereBox.selectedIndex = 3;
            }
            if (speechTranscript.indexOf("cable") > -1) {
                whereBox.selectedIndex = 4;
            }
            if (speechTranscript.indexOf("chapels") > -1 || speechTranscript.indexOf("field") > -1) {
                whereBox.selectedIndex = 5;
            }
            if (speechTranscript.indexOf("deroy") > -1) {
                whereBox.selectedIndex = 6;
            }
            if (speechTranscript.indexOf("faculty") > -1 || speechTranscript.indexOf("club") > -1) {
                whereBox.selectedIndex = 7;
            }
            if (speechTranscript.indexOf("farber") > -1) {
                whereBox.selectedIndex = 8;
            }
            if (speechTranscript.indexOf("foster") > -1 || speechTranscript.indexOf("mods") > -1) {
                whereBox.selectedIndex = 9;
            }
            if (speechTranscript.indexOf("gerstenzang") > -1) {
                whereBox.selectedIndex = 10;
            }
            if (speechTranscript.indexOf("goldfarb") > -1) {
                whereBox.selectedIndex = 11;
            }
            if (speechTranscript.indexOf("gordon") > -1) {
                whereBox.selectedIndex = 12;
            }
            if (speechTranscript.indexOf("gosman") > -1 || speechTranscript.indexOf("ford") > -1) {
                whereBox.selectedIndex = 13;
            } 
            if (speechTranscript.indexOf("hassenfeld") > -1) {
                whereBox.selectedIndex = 14;
            }
            if (speechTranscript.indexOf("health") > -1) {
                whereBox.selectedIndex = 15;
            }
            if (speechTranscript.indexOf("intercultural") > -1) {
                whereBox.selectedIndex = 16;
            }
            if (speechTranscript.indexOf("kutz") > -1) {
                whereBox.selectedIndex = 17;
            }
            if (speechTranscript.indexOf("mailman") > -1) {
                whereBox.selectedIndex = 18;
            }
            if (speechTranscript.indexOf("mandel") > -1) {
                whereBox.selectedIndex = 19;
            }
            if (speechTranscript.indexOf("olin") > -1 || speechTranscript.indexOf("sang") > -1) {
                whereBox.selectedIndex = 20;
            }
            if (speechTranscript.indexOf("pomerantz") > -1) {
                whereBox.selectedIndex = 21;
            } 
            if (speechTranscript.indexOf("reitman") > -1) {
                whereBox.selectedIndex = 22;
            }
            if (speechTranscript.indexOf("renfield") > -1) {
                whereBox.selectedIndex = 23;
            }
            if (speechTranscript.indexOf("rosenthal east") > -1 || speechTranscript.indexOf("east rosenthal") > -1 || speechTranscript.indexOf("rosie east") > -1 || speechTranscript.indexOf("east rosie") > -1) {
                whereBox.selectedIndex = 24;
            }
            if (speechTranscript.indexOf("rosenthal north") > -1 || speechTranscript.indexOf("north rosenthal") > -1 || speechTranscript.indexOf("rosie north") > -1 || speechTranscript.indexOf("north rosie") > -1) {
                whereBox.selectedIndex = 25;
            }
            if (speechTranscript.indexOf("scheffres") > -1) {
                whereBox.selectedIndex = 26;
            }
            if (speechTranscript.indexOf("schwartz") > -1) {
                whereBox.selectedIndex = 27;
            }
            if (speechTranscript.indexOf("admissions") > -1) {
                whereBox.selectedIndex = 28;
            }
            if (speechTranscript.indexOf("shapiro campus") > -1 || speechTranscript.indexOf("SCC") > -1 || speechTranscript.indexOf("campus center") > -1) {
                whereBox.selectedIndex = 29;
            } 
            if (speechTranscript.indexOf("shapiro residence hall") > -1 || speechTranscript.indexOf("shapiro in massell") > -1) {
                whereBox.selectedIndex = 30;
            }
            if (speechTranscript.indexOf("sherman") > -1) {
                whereBox.selectedIndex = 31;
            }
            if (speechTranscript.indexOf("slosberg") > -1 || speechTranscript.indexOf("music") > -1) {
                whereBox.selectedIndex = 32;
            }
            if (speechTranscript.indexOf("spingold") > -1) {
                whereBox.selectedIndex = 33;
            }
            if (speechTranscript.indexOf("stoneman") > -1) {
                whereBox.selectedIndex = 34;
            }
            if (speechTranscript.indexOf("usdan") > -1) {
                whereBox.selectedIndex = 35;
            }
            if (speechTranscript.indexOf("upper") > -1) {
                whereBox.selectedIndex = 36;
            }
            if (speechTranscript.indexOf("castle") > -1) {
                whereBox.selectedIndex = 37;
            }
            if (speechTranscript.indexOf("usen") > -1) {
                whereBox.selectedIndex = 38;
            }
            if (speechTranscript.indexOf("village") > -1) {
                whereBox.selectedIndex = 39;
            }
            if (speechTranscript.indexOf("volen") > -1) {
                whereBox.selectedIndex = 40;
            }
            if (selectedIndex.indexOf("127") > -1) {
                whereBox.selectedIndex = 41;
            }
            if (selectedIndex.indexOf("128") > -1) {
                whereBox.selectedIndex = 42;
            }
            if (selectedIndex.indexOf("129") > -1) {
                whereBox.selectedIndex = 43;
            }
        }
    }

    function failCallback(error){
        alert("Error: " + error);
    }
}