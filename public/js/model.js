/**
  The bimprovedList class has all the methods for downloading the model
  from the server, updating the model (and sending the updates to the server)
  and refreshing the model by pulling down the server info.

  
**/

function bimprovedList() {
    var bimprovedList = this;
    this.user = "none";
    this.topics = [];


  $.ajax({
      type: "GET",
      url: "/api/user",
  }).done(function(userData) {
      bimprovedList.user = userData;
      //console.log("user = "+JSON.stringify(bimprovedList.user));
  });

};


bimprovedList.prototype.server = "http://leiner.cs-i.brandeis.edu:7000"; // this is for production
//bimprovedList.prototype.server = ""; // this is for testing locally


// we use the locally cached model to lookup elements...
bimprovedList.prototype.getElement = function(id){
    var topic;
    var i;
    for(i=0; i<this.topics.length; i++){
        topic = this.topics[i];
        if(topic.id == id){
            return(topic);
        }
    }
};


bimprovedList.prototype.loadModel = function() {
    var myList = this;
    console.log("calling ajax");
    // send request to the server for the topics in the list
    $.ajax({
        type: "GET",
        url: "/model/bimproved",
    }).done(function(topics) {
        myList.topics = topics;
        topics.map(function(x){x.id=x["_id"];});
		console.log("topics="+topics);
        bimprovedView.refreshView(myList);
    });
};


bimprovedList.prototype.addElement = function(newtopic){
    console.log("sending "+JSON.stringify(newtopic));
    var myList = this;
    $.ajax({
        type: "POST",
        url: "/model/bimproved",
        data: JSON.stringify(newtopic),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    }).done(function(topics) {
        myList.loadModel();
    });
}

bimprovedList.prototype.updateElement = function(id,newtopic){
    var myList = this;
    $.ajax({
        type: "PUT",
        url: "/model/bimproved/"+id,
        data: JSON.stringify(newtopic),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    }).done(function(topics) {
        myList.loadModel();
    });
}

bimprovedList.prototype.deleteElement = function(id){
    var myList = this;
    $.ajax({
        type: "DELETE",
        url: "/model/bimproved/"+id,
    }).done(function(topics) {
        myList.loadModel();
    });
}


    
