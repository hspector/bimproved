/**
  The ShoppingList class has all the methods for downloading the model
  from the server, updating the model (and sending the updates to the server)
  and refreshing the model by pulling down the server info.

  
**/

function ShoppingList() {
    this.user = "B.Improved";
    this.cutoff = 0;
    this.topics = [];

};



// we use the locally cached model to lookup elements...
ShoppingList.prototype.getElement = function(id){
    var topic;
    var i;
    for(i=0; i<this.topics.length; i++){
        topic = this.topics[i];
        if(topic.id == id){
            return(topic);
        }
    }
};


ShoppingList.prototype.loadModel = function() {
    var myList = this;
    
    // send request to the server for the topics in the list
    $.ajax({
        type: "GET",
        url: "/model/shopping",
    }).done(function(topics) {
        myList.topics = topics;
        topics.map(function(x){x.id=x["_id"];});
        shoppingView.refreshView(myList);
    });
};

ShoppingList.prototype.addElement = function(newtopic){
    console.log("sending "+JSON.stringify(newtopic));
    var myList = this;
    $.ajax({
        type: "POST",
        url: "/model/shopping",
        data: JSON.stringify(newtopic),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    }).done(function(topics) {
        myList.loadModel();
    });
}

ShoppingList.prototype.updateElement = function(id,newtopic){
    var myList = this;
    $.ajax({
        type: "PUT",
        url: "/model/shopping/"+id,
        data: JSON.stringify(newtopic),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    }).done(function(topics) {
        myList.loadModel();
    });
}

ShoppingList.prototype.deleteElement = function(id){
    var myList = this;
    $.ajax({
        type: "DELETE",
        url: "/model/shopping/"+id,
    }).done(function(topics) {
        myList.loadModel();
    });
}

ShoppingList.prototype.totalPrice = function(){
    var total=0;
    var topic;
    var i;
    for(i=0; i<this.topics.length; i++){
        topic = this.topics[i];
        if (topic.purchased){
            total += topic.price*topic.quantity;
        }
    }
    return total;
}
    