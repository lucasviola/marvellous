var mongo = require('mongodb');

var Server = mongo.Server;
var Db = mongo.Db;
var BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
var db = new Db('slicesdb', server);

exports.findAll = function(req, res){
	res.send([{name:'website1'}, {name:'website2'}, {name:'website3'}]);
};

exports.findById = function(req, res){
	res.send({id:req.params.id, name: "Marvellous", description: "Favorite your favorite web slices!"});
};