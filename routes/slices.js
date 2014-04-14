exports.findAll = function(req, res){
	res.send([{name:'website1'}, {name:'website2'}, {name:'website3'}]);
};

exports.findById = function(req, res){
	res.send({id:req.params.id, name: "Marvellous", description: "Favorite your favorite web slices!"});
};