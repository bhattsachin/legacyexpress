var Legacy = function () {
	this.data = {
		leadContractId: null,
		leadId: null,
		zip: null,
		insuranceType: null,
		county: null
	};

	this.fill = function (info) {
		for(var prop in this.data) {
			if(this.data[prop] !== 'undefined') {
				this.data[prop] = info[prop];
			}
		}
	};

	this.getInformation = function () {
		return this.data;
	};
};

module.exports = function (info) {
	var instance = new Legacy();
	console.log(info);
	instance.fill(info);

	return instance;
};