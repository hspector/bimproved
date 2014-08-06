#!/usr/bin/env node --harmony

/***
 firstServer.js
 This is a simple server illustrating middleware and basic REST functionality
 This demo also adds the mongo database connection, but everything is in one file
 on the server side. We will break this out so that it has model/view/controller on
 the server and client in the next demo...
 ***/

'use strict';
var express = require('express');
var bodyParser = require('body-parser'); // this allows us to pass JSON values to the server (see app.put below)
var app = express();
var monk = require('monk');
var db = monk('localhost:27017/bimproved');
//var cookieParser = require('cookie-parser');
//var session = require('express-sessions');
//var redisClient = require('redis').createClient();
//var RedisStore = require('connect-redis')(session);


//**********************************************************
// The following is needed for the passport authentication 
//**********************************************************

var User = db.get("user");

var cookieParser = require('cookie-parser');
var session = require('express-session');

var redisClient = require('redis').createClient();
var RedisStore = require('connect-redis')(session);

var passport = require('passport');

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


// serve static content from the public folder 
app.use("/", express.static(__dirname + '/public'));
//app.use(session({secret: 'hey'}));

// parse the bodies of all other queries as json
app.use(bodyParser.json());


// log the requests
app.use(function(req, res, next) {
    console.log('%s %s %s', req.method, req.url, JSON.stringify(req.body));
    //console.log("myData = "+JSON.stringify(myData));
    next();
});



//**********************************************************
// This is needed for the passport authentication
// start using sessions...
//**********************************************************
//app.use(session({ secret: 'jfjfjfjf89fd89sd90s4j32kl' }));
app.use(cookieParser());
app.use(session({
    secret: 'unguessable',
    store: new RedisStore({
        client: redisClient
    })
}));

app.use(passport.initialize());
app.use(passport.session());




// get a particular topic from the model
app.get('/model/:collection/:id', function(req, res) {
    var collection = db.get(req.params.collection);
    console.log("collection = "+collection);
    collection.find({_id: req.params.id}, {}, function(e, docs) {
        console.log(JSON.stringify(docs));
        if (docs.length>0)
            res.json(200, docs[0]);
        else
            res.json(404,{});
    })
});


// get all topics from the model
app.get('/model/:collection', function(req, res) {
    var collection = db.get(req.params.collection);
    console.log("collection = "+collection);
    collection.find({}, {}, function(e, docs) {
        console.log(JSON.stringify(docs));
        res.json(200, docs);
    })
});

// change an topic in the model
app.put('/model/:collection/:id', function(req, res) {
    var collection = db.get(req.params.collection);
    collection.update({
        "_id": req.params.id
    }, req.body);
    res.json(200, {});
});

// add new topic to the model
// in this example we show how to use javascript promises
// to simply asynchronous calls
app.post('/model/bimproved', function(req, res) {
    console.log("post to bimproved ... " + JSON.stringify(req.body));
    var collection = db.get('bimproved');
    var improvement = req.body;
    improvement.improver = req.user.profile.emails[0].value;
    var promise = collection.insert(req.body);
    promise.success(function(doc){
        res.json(200,doc)});
    promise.error(function(error){res.json(404,error)});
});

app.post('/model/:collection', function(req, res) {
    console.log("post ... " + JSON.stringify(req.body));
    var collection = db.get(req.params.collection);
    var promise = collection.insert(req.body);
    promise.success(function(doc){
        res.json(200,doc)});
    promise.error(function(error){res.json(404,error)});
});

// delete a particular topic from the model
app.delete('/model/:collection/:id', function(req, res) {
    var id = req.params.id;
    console.log("deleting " + id);
    var collection = db.get(req.params.collection);
    collection.remove({
        _id: id
    });
    res.json(200, {});
});


// listen on port 3000
var port = 7000;
app.listen(port, function() {
    console.log("server is listening on port " + port);
});