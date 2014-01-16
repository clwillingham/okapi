/**
 * Created by Chris Willingham on 1/15/14.
 */
var express = require("express"),
    fs      = require('fs'),
    path    = require('path'),
    app     = express(),
    port    = parseInt(process.env.PORT, 10) || 3000;

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
var modelFiles = fs.readdirSync('./models');

for(var i in controllerFiles){
  var controller = require('./controllers/' + controllerFiles[i]);
  var routes = controller.routes;
  for(var route in routes){
    var action = routes[route];
    var routeData = route.split(' ');
    var method = routeData[0];
    var url = path.join(controller.root || '/', routeData[1] || '');
    app[method](url, action);
    console.log(method + ': ' + url);
  }
}

app.listen(port);