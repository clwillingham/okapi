/**
 * Created by Chris Willingham on 1/15/14.
 */
var express = require("express"),
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

app.listen(port);