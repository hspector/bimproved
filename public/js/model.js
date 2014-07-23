/**
  The bimprovedList class has all the methods for downloading the model
  from the server, updating the model (and sending the updates to the server)
  and refreshing the model by pulling down the server info.

  
**/

function bimprovedList() {
    this.user = "Tim";
    this.topics = [];

};

bimprovedList.prototype.server = "http://leiner.cs-i.brandeis.edu:7000";

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
        url: myList.server+"/model/bimproved",
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
        url: myList.server+"/model/bimproved",
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
        url: myList.server+"/model/bimproved/"+id,
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
        url: myList.server+"/model/bimproved/"+id,
    }).done(function(topics) {
        myList.loadModel();
    });
}


    