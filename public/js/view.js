/**
 The bimprovedView is responsible for updating all of the HTML
 It is called by the bimprovedApp only and the only thing it calls is jQuery
**/

var bimprovedView = (function($){
    
    function refreshView(myData){
        refreshTable(myData.topics);
		refreshTable1(myData.topics);
        updateTitle(myData.user);
		refreshMap(myData.topics); 
		refreshUsername();
        
    }
    
    // updates the title with the user's name
    function updateTitle(user){
        var newTitle = "B-Improved";
        $("#title").html(newTitle);
    }
    
    function refreshUsername(){
			//console.log(bimprovedApp.loggedIn());
			//somehow check if they're logged in
			if(bimprovedApp.loggedIn()==true){
			var user = bimprovedApp.getEmail(); 
			$("#userName").html(user);
			}else{
			var user = "Username";
			var userName = $("#userName").html(user);
			}
	}
    function sorttopics(topics){
        var sortedtopics = topics.slice();  // make a copy of topics
        sortedtopics.sort(function(a,b){ return(a.action > b.action)});
        return sortedtopics;
    }
	
    
    function filtertopics(topics){
        var n;
        var topic;
        var newtopics=[];
		var probFilter = $.trim($("#problemFilter").val().toLowerCase());
		var dateFilter = $.trim($("#dateFilter").val().toLowerCase());
		var searchFilter = $.trim($("#searchFilter").val().toLowerCase());
		var categoryFilter = $.trim($("#categoryFilter").val().toLowerCase());
		var locFilter = $.trim($("#locationFilter").val().toLowerCase());
        var showComplete = $("#showCompleteCheckbox").prop("checked");
		var e = document.getElementById("category");
        var strUser = e.options[e.selectedIndex].text;
		var resolved;
        for(n=0; n<topics.length; n++){
            topic = topics[n]
			resolved = topic.resolved || false;
            if (!resolved|| showComplete){
			  if(searchFilter == "" || (topic.when.match(searchFilter) || topic.problem.match(searchFilter))){
				 if (dateFilter== "" || topic.when.match(dateFilter)){
					if (probFilter== "" || topic.problem.match(probFilter)){
						if (locFilter == "" || topic.where.match(locFilter)){
							if (categoryFilter == "" || topic.category.match(categoryFilter)){
						//console.log("location is " + topic.where);
						//console.log("categoryFilter is " + categoryFilter );
                        newtopics.push(topic);
							
							}
						}
					}
				 }
			  } 
            }
        }
        return newtopics;
    }
	
	function refreshMap(topics){
		var n;
		var topic;
		var resolved;
		var showComplete = $("#showCompleteCheckbox").prop("checked");
		bimprovedApp.initialize();
        for(n=0; n<topics.length; n++){
            topic = topics[n];
			var point = bimprovedApp.getPoint(topic.where);
			//console.log("topic.where is " + topic.where);
			resolved = topic.resolved || false;
            if (!resolved|| showComplete){
			bimprovedApp.addMarker(point,topic.problem);
			}
		}	
	}
    
    
    // redraw the table using the current model
    function refreshTable(mytopics){ 
				console.log("Called");
                var rows = "";
                var len = mytopics.length;
                var filteredtopics = filtertopics(mytopics);
                var sortedtopics = sorttopics(filteredtopics);
                //console.log("filteredtopics = "+ JSON.stringify(filteredtopics));
                //console.log("sortedtopics = "+JSON.stringify(sortedtopics));
                
                for(var n=0; n<sortedtopics.length; n++){ 
                    var topic = sortedtopics[n];
                    rows = rows + topicToRow(topic);
					//console.log("rows = "+rows);
                }

                var topicTableBody = $("#topicTableBody").html(rows);

    }
	function refreshTable1(mytopics/*the list of improvements with users*/){ 
				console.log("Called");
                var rows = "";
                var len = mytopics.length;
				//var filteredtopics = filtertopics(mytopics);
                //var sortedtopics = sorttopics(filteredtopics);
				var topics = mytopics;
                //console.log("filteredtopics = "+ JSON.stringify(filteredtopics));
                //console.log("sortedtopics = "+JSON.stringify(sortedtopics));
                
                for(var n=0; n<topics.length; n++){
					//console.log(n + " is " + bimprovedApp.getEmail());
					//console.log(n + " is " + topics[n].improver);
					if(bimprovedApp.getEmail() == topics[n].improver){ 
                    var topic = topics[n];
					rows = rows + topicToRow1(topic);
					}
                    
					//console.log("rows = "+rows);
                }

                var topicTableBody1 = $("#topicTableBody1").html(rows);

    }
	
    // convert an topic into an HTML tr element
    function topicToRow(topic){
        var row = 
        "<tr><td>"+topic.where+
		"</td><td>"+ 
            topic.room+ 
        "</td><td>"+ 
            topic.problem+ 
        "</td><td>"+
            topic.when+  
        "</td><td>"+topic.category+
        "</td><td>"+
            topic.improver+
        "</td><td> <input type='checkbox' sid='"+topic.id+"' onclick='bimprovedApp.resolvetopic(this)' "+resolved(topic)+ "> "+ 
		"</td><td> <span class='glyphicon glyphicon-remove red'  sid='"+topic.id+"' onclick='bimprovedApp.handleDeletetopic(this)'> "+
        "</td></tr>";
        return row;
    }
        
    // convert an topic into an HTML tr element
    function topicToRow1(topic){
        var row = 
        "<tr><td>"+topic.where+
		"</td><td>"+ 
            topic.room+ 
        "</td><td>"+ 
            topic.problem+ 
        "</td><td>"+
            topic.when+  
        "</td><td>"+topic.category+
		"</td><td> <span class='glyphicon glyphicon-remove red'  sid='"+topic.id+"' onclick='bimprovedApp.handleDeletetopic(this)'> "+
        "</td></tr>";
        return row;
    }
    function resolved(topic) {
        if(topic.resolved) return "checked";
        else return "";
    }
	
    bimprovedView={
        refreshView: refreshView,
    };
    
    return(bimprovedView);
    
}(jQuery));