var mongoose = require('mongoose');

var legacySchema = new mongoose.Schema({
	leadContractId: Number,
	leadId: Number,
	zip: String,
	insuranceType: String,
	county: String
})

module.exports = mongoose.model("Legacy", legacySchema, 'legacycompact');