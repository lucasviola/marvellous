var mongo = require('mongodb');

var Server = mongo.Server;
var Db = mongo.Db;
var BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('slicesdb', server);

db.open(function(err, db){
	if(!err){
		console.log("Connected to 'slicesdb' database");
		db.collection('slices', {strict: true}, function(err, collection){
			if(err){
				console.log("The 'slices' connection doesn't exist. Creating it with sample data...");
				populateDB();
			}	
		});	
		
	}	
});


exports.findAll = function(req, res){
	db.collection('slices', function(err, collection){
		collection.find().toArray(function(err, items){
			res.send(items);
		});		
	});	
	
};

exports.findById = function(req, res){
	var id = req.params.id;
	console.log('Retrieving slice: ' + id);
	db.collection('slices', function(err, collection){
		collection.findOne({'_id': new BSON.ObjectID(id)}, function(err, item){
			res.send(item);
			});	
		
		});

exports.addSlice = function(req, res){
	var slice = req.body;
	console.log('Adding slice: ' + JSON.stringify(slice));
	db.collection('slices', function(err, collection){
		collection.insert(slice, {safe:true}, function(err, result){
			if (err) {
				res.send({'error' : 'An error has occurred.'});
			} else {
				console.log('Success: ' + JSON.stringify(result[0]));
				res.send(result[0]);
			}
		});
	});
}

exports.updateSlice = function(req, res){
	var id = req.params.id;
	var slice = req.body;
	console.log('Updating slice: ' + id);
	console.log(JSON.stringify(slice));
	db.collection('slices', function(err, collection){
		collection.update({'_id':new BSON.ObjectID(id)}, slice, {safe:true}, function(err, result){
			if(err){
				console.log('Error updating slice: ' + err);
				res.send({'error':'An error has occurred.'});
			} else {
				console.log('' + result + 'document(s) updated');
				res.send(slice);
			}
		});
	});
}

exports.deleteSlice = function(req, res){
	var id = req.params.id;
	console.log('Deleting slice: ' + id);
	db.collection('slices', function(err, collection){
		collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result){
			if(err){
				res.send({'error':'An error has occurred: ' + err});
			} else {
				console.log('' + result + 'document(s) deleted');
				res.send(req.body);
			}
		});
	});
}
/* --------------------------------------------------------------------------------------------------- */

//MUST delete this
var populateDB = function(){

	var slices = [
	{
		name: "Github",
		desc: "Build software. Better. Together.",
		url: "http://github.com",
		thumbnail: "github.jpg"
	}];

	db.collection('slices', function(err, collection){
		collection.insert(slices, {safe:true}, function(err, result){});
	});
};




};