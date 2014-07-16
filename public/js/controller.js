/**
 demo.js
 This provides the model and controller for the shopping list app!
 It is written entirely in JavaScript with no use of AngularJS
 but it does just jQuery to handle the ajax calls in a browser independent manner...
 and it uses jQuery to access and modify the HTML file index.html
 
 VERSION 1.0.1 -- here is where we start adding some functionality
 **/

var shoppingApp = (function($) {


    // first create the model
    var myList = new ShoppingList();
    
    var showView = function(selected) {
      window.location.hash = '#' + selected;
      $('.view').hide().filter('#' + selected + '-view').show();
    };


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

    function addtopic(element1, element2, element3, element4) {

		var element1 = document.getElementById("where");
		var element2 = document.getElementById("problem");
		var element3 = document.getElementById("when");
		var element4 = document.getElementById("category");
		if(element2.value.length==0||element3.value.length==0){
			alert("YOU NEED TO ENTER ALL THE FIELDS!!! Please try again");
            return;
		}
		
        console.log("new topic " + element2.value);
        myList.addElement({
            where: element1.value,
            problem: element2.value,
            when: element3.value,
			category: element4.value,
        });
		shoppingApp.showView('confirm');
        //element1.value="";
		//element2.value="";
		//element3.value="";
		//element4.value="";
    }
    
    function editPrice(element){
        var topicId = element.getAttribute("sid");
        var topicVal = element.value;
        var topic;
        console.log("topic "+topicId+" has value "+topicVal);
        topic = myList.getElement(topicId);
        topic.price = topicVal;
        myList.updateElement(topic.id,topic);
        refreshView();
        
    }
    
    function editQuantity(element){
        var topicId = element.getAttribute("sid");
        var topicVal = element.value;
        var topic;
        console.log("topic "+topicId+" has value "+topicVal);
        topic = myList.getElement(topicId);
        topic.quantity = topicVal;
        myList.updateElement(topic.id,topic);
        refreshView();
        
    }

    function purchasetopic(element) {
        var topicId = element.getAttribute("sid");
        var topic;
        console.log("purchasing item "+topicId);
        topic = myList.getElement(topicId);
        topic.purchased= !topic.purchased;
        refreshView();
    }

    function edittopic(element) {
        console.log("editing topic "+element.getAttribute("sid"));
    }

    function refreshView(){
        shoppingView.refreshView(myList);
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
        shoppingView.refreshView(myList);
        showView("welcome");


    }
    function valiDate() {
        var d = new Date();
        var curr_date = d.getDate();
        var curr_month = d.getMonth();
        var curr_year = d.getFullYear();
        var complete_date = (curr_year + "-" + curr_month + "-" + curr_date);
        console.log(complete_date);
        document.getElementById("when").value = complete_date;
    }


    // here is were we decide what is visible to the outside!
    shoppingApp = {
        start: start,
        addtopic: addtopic,
        handleDeletetopic: handleDeletetopic,
        refreshView: refreshView,
        purchasetopic: purchasetopic,
        edittopic: edittopic,
        reloadModel: reloadModel,
        editPrice: editPrice,
        editQuantity: editQuantity,
        showView: showView,
        valiDate: valiDate
    }

    return (shoppingApp);

}(jQuery));



