//SET all requirements
var express = require('express');
var mongojs = require('mongojs');
var bodyParser  = require('body-parser');

//declare "global" variables
var app = express();
var db = mongojs('liftList',['liftList']);

//miscelaneous declarations
var port = 8080;

app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));


//code used to serve data to webpage from mongoDB 
app.get('/liftList', function(req, res){
	db.liftList.find(function(err, docs){
		res.json(docs);
	});
});

//insert into list
app.post('/liftList', function(req,res){
	db.liftList.insert(req.body, function(err, doc){
		res.json(doc);
	});
});

//update on list
app.put('/liftList/:id', function(req,res){
	var id = req.params.id;
	db.liftList.findAndModify({query: {_id: mongojs.ObjectId(id)},
		update: {$set: {	date: 	req.body.date,
						exercise: 	req.body.exercise,
						strength: 	req.body.strength}},
		new: true}, function(err, docs){
			res.json(docs);
		});					
});

//server side delete
app.delete('/liftList/:id', function(req, res){
	var id = req.params.id;
	db.liftList.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

//find a specific entry by ObjectId
app.get('/liftList/:id', function(req, res){
	var id = req.params.id;
	db.liftList.findOne({_id: mongojs.ObjectId(id)}, function(err,doc){
		res.json(doc);
	});
});
//listen to port number declared
app.listen(port);
console.log("Server listening on port " + port);