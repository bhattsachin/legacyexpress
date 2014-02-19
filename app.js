
/**
 * Module dependencies.
 */

module.exports = function(db) {
var express = require('express');
var MongoStore = require('connect-mongo')(express);
var routes = require('./routes')();
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
//console.log(routes.home);
//console.log(routes.legacy);
//console.log(routes);
app.get('/', routes.home);
app.get('/legacy/:zip', routes.legacy);

//http.createServer(app).listen(app.get('port'), function(){
//  console.log('Express server listening on port ' + app.get('port'));
//});

return app;
}
