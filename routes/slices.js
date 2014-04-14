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
	res.send([{name:'website1'}, {name:'website2'}, {name:'website3'}]);
};

exports.findById = function(req, res){
	res.send({id:req.params.id, name: "Marvellous", description: "Favorite your favorite web slices!"});
};