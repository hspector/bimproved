/**
 The shoppingView is responsible for updating all of the HTML
 It is called by the shoppingApp only and the only thing it calls is jQuery
**/

var shoppingView = (function($){
    
    function refreshView(myData){
        refreshTable(myData.topics);
        updateTitle(myData.user);
        updateTotalPrice(myData);
        
        
    }
    
    
    // updates the title with the user's name
    function updateTitle(user){
        var newTitle = "B-Improved";
        $("#title").html(newTitle);
    }
    
    function updateTotalPrice(myData){
        var numPurchases = myData.topics.filter(function(x){return x.purchased;}).length;
        var totalText = "There total cost of the "+numPurchases+" purchased topics is "+ myData.totalPrice();
        $("#totalprice").html(totalText);
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
        var showComplete = $("#showCompleteCheckbox").prop("checked");
        var cutoff = $("#cutOffText").val() || 0;
        var wasPurchased;

        for(n=0; n<topics.length; n++){
            topic = topics[n]
            wasPurchased = topic.purchased || false;
            if (!wasPurchased ||  showComplete){
                if (topic.quantity >= cutoff){
                    newtopics.push(topic);
                }
            }
        }
        return newtopics;
    }
    
    
    // redraw the table using the current model
    function refreshTable(mytopics){    
                var rows = "";
                var len = mytopics.length;
                var filteredtopics = filtertopics(mytopics);
                var sortedtopics = sorttopics(filteredtopics);
                console.log("filteredtopics = "+ JSON.stringify(filteredtopics));
                console.log("sortedtopics = "+JSON.stringify(sortedtopics));
                
                for(var n=0; n<sortedtopics.length; n++){ 
                    var topic = sortedtopics[n];
                    rows = rows + topicToRow(topic);
                }

                var topicTableBody = $("#topicTableBody").html(rows);

    }
	
    // convert an topic into an HTML tr element
    function topicToRow(topic){
        var row = 
        "<tr><td>"+topic.where+
        "</td><td>"+ 
            "<input type='text' value='"+topic.problem+"' sid='"+topic.id+"' onchange='shoppingApp.editPrice(this)'>"+
        "</td><td>"+
            "<input type='text' value='"+topic.when+"' sid='"+topic.id+"' onchange='shoppingApp.editQuantity(this)'>"+
        "</td><td>"+topic.urgency+
        "</td><td> <input type='checkbox' sid='"+topic.id+"' onclick='shoppingApp.handleDeletetopic(this)'> "+  
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