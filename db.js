var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/legacy');

mongoose.connection.on('error', function (err){
	console.log('error connecting to db');
})

module.exports = mongoose.connection;

