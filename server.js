/**
 * Created by Chris Willingham on 1/15/14.
 */
var express = require("express"),
    fs      = require('fs'),
    path    = require('path'),
    app     = express(),
    port    = parseInt(process.env.PORT, 10) || 3000;

var models = {};

var modelFiles = fs.readdirSync('./models');

for(var i in modelFiles) {
  var model = require('./models/'+modelFiles[i]);
  var name = model.modelName || modelFiles[i].replace('.js', '');
  models[name] = model;
}

function addModels(req, res, next) {
  for(var i in models){
    this[i] = models[i];
  }
  next();
}

function setRenderRoot(viewRoot){
  return function(req, res, next){
    var _render = res.render;
    res.render = function(view, options, callback) {
      _render.call(res, viewRoot + view, options, callback);
    };
    next();
  }
}

app.configure(function(){
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));
  app.use(express.errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
  app.use(app.router);
});

var controllerFiles = fs.readdirSync('./controllers');


for(var i in controllerFiles){
  var controller = require('./controllers/' + controllerFiles[i]);
  var routes = controller.routes;
  var controllerName = controller.name || controllerFiles[i].replace('.js', '');
  for(var route in routes){
    var action = routes[route];
    var routeData = route.split(' ');
    var method = routeData[0];
    var url = path.join(controller.root || '/', routeData[1] || '');
    //app[method](url, action);

    var localMiddleware = [];
    if(typeof(action) == 'function'){
      localMiddleware[0] = action;
    }else if(typeof(action) == 'object'){
      localMiddleware = action;
    }

    app[method].apply(app, [url].concat(setRenderRoot(controllerName + '/'), addModels, localMiddleware));
    console.log(method + ': ' + url);
  }
}

app.listen(port);