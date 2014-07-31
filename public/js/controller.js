/**
 demo.js
 This provides the model and controller for the bimproved list app!
 It is written entirely in JavaScript with no use of AngularJS
 but it does just jQuery to handle the ajax calls in a browser independent manner...
 and it uses jQuery to access and modify the HTML file index.html
 
 VERSION 1.0.1 -- here is where we start adding some functionality
 **/

var bimprovedApp = (function($) {

	var blank = "%A0%A0";
	var newblank = unescape(blank);
    // first create the model
    var myList = new bimprovedList();
    
    var showView = function(selected) {
	  if (myList.user=="none"){
	  console.log("user is " + myList.user);
      selected = "login";
      console.log(myList.user)
      //alert("you must login to use this site!");
      }
      window.location.hash = '#' + selected;
      $('.view').hide().filter('#' + selected + '-view').show();
    };
	
	var setView = function(){
      var view = window.location.hash;
        if ((view=="")) { //} || (myList.user=="none")) {
            alert("view="+view+"  myList.user="+myList.user);
            showView("login")
        } else {
            alert("showing the right view! "+view.substring(1));
            showView(view.substring(1));
        }
     }

	function resetPlaceholders() {
		console.log("reset method called");
		var element1 = document.getElementById("problem");
		var element2 = document.getElementById("when");
		var element3 = document.getElementById("room");
		element1.value="";
		element2.value = "";
		element3.value = "";
		element1.placeholder = "Type the problem here!";
		element2.placeholder = "m/dd/yyyy";
		element3.placeholder = "N/A";
		document.getElementById("where").selectedIndex = 0;
		document.getElementById("category").selectedIndex = 0;
    }
	 function advancedSearch() {
    	if (document.getElementById('advSearchCB').checked) {
    		document.getElementById('advSearch').style.display = 'table';
    		document.getElementById('searchFilter').style.display = 'none';
    	} else {
    		document.getElementById('advSearch').style.display = 'none';
    		document.getElementById('searchFilter').style.display = 'table';
    	}
    }
	 function valiDate() {
        var d = new Date();
        var curr_date = d.getDate();
        var curr_month = d.getMonth();
        var curr_year = d.getFullYear();
        var complete_date = (curr_month + "-" + curr_date + "-" + curr_year);
        console.log(complete_date);
        document.getElementById("when").value = complete_date;
    }
	
    function handleDeletetopic(element) {
        console.log("deleting topic");
        console.log(" with id " + element.getAttribute("sid"));
        myList.deleteElement(element.getAttribute("sid"));

    }
	function signIn(){
			var element1 = $.trim($("#email").val().toLowerCase());
			var element2 = $.trim($("#password").val().toLowerCase());
			console.log("email is " + element1);
			console.log("password is " + element2);
			if(element1.match("jekolosk@brandeis.edu")&& element2.match("yellow")){
				bimprovedApp.showView('improvementPage');
				return;
			}
			if(element1.match("tjhickey@brandeis.edu")&& element2.match("cosi")){
				bimprovedApp.showView('improvementList');
				return;
			}
			if(element1.length==0 && element2.length==0){
				bimprovedApp.showView('improvementList');
				return;
			}
				alert("Either your password or email is wrong. Please try again with your Brandeis Unet ID");
			
	}
	
    function addtopic(element1, element2, element3, element4, element5) {
		var element1 = document.getElementById("where");
		var element2 = document.getElementById("room");
		var element3 = document.getElementById("problem");
		var element4 = document.getElementById("when");
		var element5 = document.getElementById("category");
		
		if(element2.value.length==0){
			element2.value= element2.placeholder;
			}
		if(element3.value.length==0||element4.value.length==0){
			alert("You need to enter all of the fields! Please fill out the boxes highlighted red");
			if(element3.value.length==0){
			element3.style.border= "solid red";
			}
			if(element4.value.length==0){
			element4.value = "solid red";
			}
			if(element3.value.length!=0){
			element3.style.border= "";
			}
			if(element4.value.length!=0){
			element4.style.border= "";
			}
			return;
		}
		
        console.log("new topic " + element2.value);
        myList.addElement({
            where: element1.value,
			room: element2.value,
            problem: element3.value,
            when: element4.value,
			category: element5.value,
        });
		bimprovedApp.showView('confirm');
		element2.style.border= "";
		element3.style.border= "";
		element3.style.border= "";
    }
    
   
	function getPoint(location){
		if(location.match("567 South Street")){
			return new GLatLng(42.361278,-71.26146);
		}
		if(location.match("Abraham Shapiro Academic Complex")){
			return new GLatLng(42.369673,-71.259487);
		}
		if(location.match("Bassine Science Building")){
			return new GLatLng(42.366927,-71.257941);
		}
		if(location.match("Brown Social Science Center")){
			return new GLatLng(42.367285,-71.256976);
		}
		if(location.match("Cable Residence Hall - North")){
			return new GLatLng(42.369242,-71.255266);
		}
		if(location.match("Chapels Field")){
			return new GLatLng(42.36776,-71.260137);
		}
		if(location.match("Deroy Residence Hall - Massell")){
			return new GLatLng(42.36776,-71.260137);
		}
		if(location.match("Faculty Club")){
			return new GLatLng(42.365945,-71.261134);
		}
		if(location.match("Farber Library")){
			return new GLatLng(42.36786,-71.2586);
		}
		if(location.match("Foster Mods")){
			return new GLatLng(42.366118,-71.25415);
		}
		if(location.match("Gerstenzang Science Library")){
			return new GLatLng(42.366543,-71.258034);
		}
		if(location.match("Goldfarb Library")){
			return new GLatLng(42.368361,-71.258061);
		}
		if(location.match("Gordon Residence Hall - North")){
			return new GLatLng(42.369719,-71.255951);
		}
		if(location.match("Gosman Center / Ford Complex")){
			return new GLatLng(42.364913,-71.254685);
		}
		if(location.match("Hassenfeld Residence Hall - East")){
			return new GLatLng(42.368044,-71.255018);
		}
		if(location.match("Health Center")){
			return new GLatLng(42.366106,-71.255206);
		}
		if(location.match("Intercultural Center")){
			return new GLatLng(42.367686,-71.25503);
		}
		if(location.match("Kutz Hall")){
			return new GLatLng(42.368924,-71.255977);
		}
		if(location.match("Mailman House")){
			return new GLatLng(42.365848,-71.255818);
		}
		if(location.match("Mandel Center")){
			return new GLatLng(42.369827,-71.258269);
		}
		if(location.match("Olin-Sang")){
			return new GLatLng(42.369655,-71.257668);
		}
		if(location.match("Pomerantz Residence Hall - East")){
			return new GLatLng(42.367443,-71.254799);
		}
		if(location.match("Reitman Residence Hall - North")){
			return new GLatLng(42.369693,-71.255311);
		}
		if(location.match("Renfield Residence Hall - Massell")){
			return new GLatLng(42.367486,-71.261041);
		}
		if(location.match("Rosenthal East Residence Hall")){
			return new GLatLng(42.367063,-71.2599);
		}
		if(location.match("Rosenthal North Residence Hall")){
			return new GLatLng(42.367307,-71.260133);
		}
		if(location.match("Scheffres Residence Hall - North")){
			return new GLatLng(42.369292,-71.256331);
		}
		if(location.match("Schwartz Hall")){
			return new GLatLng(42.367505,-71.257286);
		}
		if(location.match("Shapiro Admissions Center")){
			return new GLatLng(42.364343,-71.26089);
		}
		if(location.match("Shapiro Campus Center")){
			return new GLatLng(42.365789,-71.260106);
		}
		if(location.match("Shapiro Residence Hall - Massell")){
			return new GLatLng(42.366764,-71.261347);
		}
		if(location.match("Sherman Dining Hall")){
			return new GLatLng(42.36646,-71.260639);
		}
		if(location.match("Slosberg Music Center")){
			return new GLatLng(42.364191,-71.259672);
		}
		if(location.match("Spingold Theater")){
			return new GLatLng(42.36427,-71.2619);
		}
		if(location.match("Stoneman")){
			return new GLatLng(42.366108,-71.255444);
		}
		if(location.match("Usdan Student Center")){
			return new GLatLng(42.368042,-71.256617);
		}
		if(location.match("Upper Sherman")){
			return new GLatLng(42.36646,-71.260639);
		}
		if(location.match("Usen Castle")){
			return new GLatLng(42.367356,-71.255646);
		}
		if(location.match("Usen Residence Hall - Massell")){
			return new GLatLng(42.367067,-71.260647);
		}
		if(location.match("Village Residence Hall (A, B, C)")){
			return new GLatLng(42.363284,-71.260208);
		}
		if(location.match("Volen National Center")){
			return new GLatLng(42.366975,-71.258804);
		}
		if(location.match("Ziv 127")){
			return new GLatLng(42.363385,-71.261662);
		}
		if(location.match("Ziv 128")){
			return new GLatLng(42.363017,-71.261553);
		}
		if(location.match("Ziv 129")){
			return new GLatLng(42.362902,-71.261064);
		}
		if(location.match("Ziv 130")){
			return new GLatLng(42.363313,-71.260872);
		}
	}
    function resolvetopic(element) {
        var topicId = element.getAttribute("sid");
        var topic;
 
        console.log("resolving item "+topicId);
        if (isAdmin()){
            topic = myList.getElement(topicId);
            topic.resolved= !topic.resolved;
        }
        refreshView();
    }
    
    function isAdmin(){
        return(myList.user.profile.emails[0].value == "tjhickey@brandeis.edu");
    }
	function getEmail(){
        var email = myList.user.profile.emails[0].value;
		return email;
    }
	function loggedIn(){
        if(myList.user!="none"){
        document.getElementById('cssmenu').style.display = 'block';
		return true;
		}
		document.getElementById('cssmenu').style.display = 'none';
		return false;
    }
    
   function advancedSearch() {
   	if (document.getElementById('advSearchCB').checked) {
   		document.getElementById('advSearch').style.display = 'table';
   		document.getElementById('searchFilter').style.display = 'none';
   	} else {
   		document.getElementById('advSearch').style.display = 'none';
   		document.getElementById('searchFilter').style.display = 'table';
   	}
   }


    function refreshView(){
        bimprovedView.refreshView(myList);
    }
	

    function reloadModel(){
        myList.loadModel();
        refreshView();
    }
    
    function initEventListeners(){
        $(window).on('hashchange', function(event){
          var view = (window.location.hash || '').replace(/^#/, '');
          if ($('#' + view + '-view').length) {
            showView(view);
          }
        });
    }

    function start() {
        myList.loadModel();
        console.log("myList = " + JSON.stringify(myList));
        //setView();
        bimprovedView.refreshView(myList);

		showView("login");
    }
	var timer = null;
	
	var map = null;
	var points = [];
	var messages = [];
	
	
	 function initialize() {
		map = new GMap2(document.getElementById("map_canvas"));
        map.setCenter(new GLatLng(42.365435,-71.258595), 15);
		map.setMapType(G_SATELLITE_MAP);
    }
	
	function addMarker(point, message) {
		var newPoint = isLocationFree(point,points);
		var marker = new GMarker(newPoint);
		points.push(newPoint);
		messages.push(message);
		map.addOverlay(marker);
		GEvent.addListener(marker, "mouseover", function() {
		marker.openInfoWindowHtml(message);
		});
		//zooms map in on marker when clicked
		GEvent.addListener(marker, "click", function() {
			var lat = point.lat();
			var lng = point.lng();
			map.setCenter(new GLatLng(lat,lng), 20);
		});
		GEvent.addListener(marker, "dblclick", function() {
			var lat = point.lat();
			var lng = point.lng();
			map.setCenter(new GLatLng(lat,lng), 16);
		});
	}
	var newMessages = [];
	function isLocationFree(point,points) {
		var count = 1;
		for (var i = 0, l = points.length; i < l; i++) {
			var min = .999999;
			var max = 1.000001;
			if ($.trim(points[i])==$.trim((point))) {
				  var lat = point.lat() * (Math.random() * (max - min) + min);
                  var lng = point.lng() * (Math.random() * (max - min) + min);
				  point = new GLatLng(lat,lng);
				
			}
		}
		return point;
	}

    // here is were we decide what is visible to the outside!
    bimprovedApp = {
        myList:myList,
        start: start,
		getEmail: getEmail,
		getPoint:getPoint,
		loggedIn: loggedIn,
		resetPlaceholders:resetPlaceholders,
        valiDate: valiDate,
        resetPlaceholders: resetPlaceholders,
		initialize: initialize,
		addMarker: addMarker,
        addtopic: addtopic,
		signIn: signIn,
        handleDeletetopic: handleDeletetopic,
        refreshView: refreshView,
        resolvetopic: resolvetopic,
        advancedSearch: advancedSearch,
        reloadModel: reloadModel,
        showView: showView
    }

    return (bimprovedApp);

}(jQuery));



