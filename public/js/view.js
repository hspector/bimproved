/**
 The shoppingView is responsible for updating all of the HTML
 It is called by the shoppingApp only and the only thing it calls is jQuery
**/

var shoppingView = (function($){
    
    function refreshView(myData){
        refreshTable(myData.topics);
        updateTitle(myData.user);
        
        
    }
    
    
    // updates the title with the user's name
    function updateTitle(user){
        var newTitle = "B-Improved";
        $("#title").html(newTitle);
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
		var categoryFilter = $.trim($("#categoryFilter").val().toLowerCase());
		var locFilter = $.trim($("#locationFilter").val().toLowerCase());
        var showComplete = $("#showCompleteCheckbox").prop("checked");
		var e = document.getElementById("category");
        var strUser = e.options[e.selectedIndex].text;
		var resolved;

        for(n=0; n<topics.length; n++){
            topic = topics[n]
			resolved = topic.purchased || false;
            if (!resolved|| showComplete){
				 if (dateFilter== "" || topic.when.match(dateFilter)){
					if (probFilter== "" || topic.problem.match(probFilter)){
						if (locFilter == "" || topic.where.match(locFilter)){
							if (categoryFilter == "" || topic.category.match(categoryFilter)){
						console.log("location is " + topic.where);
						console.log("categoryFilter is " + categoryFilter );
                        newtopics.push(topic);
							}
						}
					}
				 }
            }
        }
        return newtopics;
    }
    
    
    // redraw the table using the current model
    function refreshTable(mytopics){ 
				console.log("Called");
                var rows = "";
                var len = mytopics.length;
                var filteredtopics = filtertopics(mytopics);
                var sortedtopics = sorttopics(filteredtopics);
                console.log("filteredtopics = "+ JSON.stringify(filteredtopics));
                console.log("sortedtopics = "+JSON.stringify(sortedtopics));
                
                for(var n=0; n<sortedtopics.length; n++){ 
                    var topic = sortedtopics[n];
                    rows = rows + topicToRow(topic);
					console.log("rows = "+rows);
                }

                var topicTableBody = $("#topicTableBody").html(rows);

    }
	
    // convert an topic into an HTML tr element
    function topicToRow(topic){
        var row = 
        "<tr><td>"+topic.where+
        "</td><td>"+ 
            topic.problem+ 
        "</td><td>"+
            topic.when+  
        "</td><td>"+topic.category+
        "</td><td> <input type='checkbox' sid='"+topic.id+"' onclick='shoppingApp.purchasetopic(this)' "+purchased(topic)+ "> "+ 
		"</td><td> <span class='glyphicon glyphicon-remove' sid='"+topic.id+"' onclick='shoppingApp.handleDeletetopic(this)'> "+
        "</td></tr>";
        return row;
    }
        
    function editted(topic) {
        if(topic.edit) return "checked";
        else return "";
    }
    
    function purchased(topic) {
        if(topic.purchased) return "checked";
        else return "";
    }
	
    shoppingView={
        refreshView: refreshView
    };
    
    return(shoppingView);
    
}(jQuery));