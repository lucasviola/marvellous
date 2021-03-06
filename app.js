
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var slices = require('./routes/slices');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.get('/slices', slices.findAll);
app.get('/slices/:id', slices.findById);
app.post('/slices', slices.addSlice);
app.put('/slices/:id', slices.updateSlice);
app.delete('/slices/:id', slices.deleteSlice);

app.listen(1337, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
