/**
 demo.js
 This provides the model and controller for the bimproved list app!
 It is written entirely in JavaScript with no use of AngularJS
 but it does just jQuery to handle the ajax calls in a browser independent manner...
 and it uses jQuery to access and modify the HTML file index.html
 
 VERSION 1.0.1 -- here is where we start adding some functionality
 **/

var bimprovedApp = (function($) {


    // first create the model
    var myList = new bimprovedList();
    
    var showView = function(selected) {
      window.location.hash = '#' + selected;
      $('.view').hide().filter('#' + selected + '-view').show();
    };

    function resetPlaceholders() {
    var problemid = document.getElementById("problem");
    var whenid = document.getElementById("when");
    problemid.value = "Type your problem here!";
    whenid.value = "m/dd/yyyy";
    document.getElementById("where").selectedIndex = 0;
    document.getElementById("category").selectedIndex = 0;
    console.log("resetPlaceholders function fired");
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
		$( "#clickme" ).click(function() {
			$( "#book" ).hide( "slow", function() {
			alert( "Animation complete." );
			});
        });
        myList.deleteElement(element.getAttribute("sid"));

    }
	function animateDeletetopic(element) {
			$(element.getAttribute("sid")).hide( "slow", function() {
			alert( "Animation complete." );
			});
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
    function addtopic(element1, element2, element3, element4) {

		var element1 = document.getElementById("where");
		var element2 = document.getElementById("problem");
		var element3 = document.getElementById("when");
		var element4 = document.getElementById("category");
		if(element2.value.length==0||element3.value.length==0){
			alert("You need to enter all of the fields! Please fill out the boxes highlighted red");
			if(element2.value.length==0){
			element2.style.border= "solid red";
			}
			if(element3.value.length==0){
			element3.style.border= "solid red";
			}
			if(element2.value.length!=0){
			element2.style.border= "";
			}
			if(element3.value.length!=0){
			element3.style.border= "";
			}
			return;
		}
		
        console.log("new topic " + element2.value);
        myList.addElement({
            where: element1.value,
            problem: element2.value,
            when: element3.value,
			category: element4.value,
        });
		bimprovedApp.showView('confirm');
        //element1.value="";
		//element2.value="";
		//element3.value="";
		//element4.value="";
    }
    
   

    function resolvetopic(element) {
        var topicId = element.getAttribute("sid");
        var topic;
        console.log("purchasing item "+topicId);
        topic = myList.getElement(topicId);
        topic.resolved= !topic.resolved;
        refreshView();
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
        bimprovedView.refreshView(myList);
        showView("login");


    }

    // here is were we decide what is visible to the outside!
    bimprovedApp = {
        start: start,
        valiDate: valiDate,
        resetPlaceholders: resetPlaceholders,
        addtopic: addtopic,
		signIn: signIn,
        handleDeletetopic: handleDeletetopic,
        refreshView: refreshView,
        resolvetopic: resolvetopic,
        reloadModel: reloadModel,
        showView: showView
    }

    return (bimprovedApp);

}(jQuery));



