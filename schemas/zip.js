var mongoose = require('mongoose');

var legacySchema = new mongoose.Schema({
	zip: String,
	county: String
})

module.exports = mongoose.model("ZipCounty", legacySchema, 'zipcounty');