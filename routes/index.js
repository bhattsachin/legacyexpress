
/*
 * GET home page.
 */
var LegacySchema = require('../schemas/legacy');
var ZipSchema = require('../schemas/zip');
var threshold = 20;

module.exports = function(){
	var functions = {};

	functions.home = function(req, res){
  		res.render('index', { title: 'Legacy' });
	};

	functions.legacy = function(req, res){
		var zip = req.param('zip');
		console.log(zip);
		var county;
		var countysubstr;

		ZipSchema.find({'zip': zip}, function(err, countyRes){
						if(err){
							console.log('haha');
							console.log('error');
						}else{
							console.log('good:');
							console.log('result:' + countyRes);
							console.log(countyRes[0]);
							if(countyRes[0]){
								console.log('everything good');
								console.log(countyRes[0]['county']);
								county = countyRes[0]['county'];
								countysubstr = '^' + county.substring(0,2);
								console.log('substr:' + county.substring(0,2));
							}else{
								console.log('things went bad');
								res.status(500).json({status: 'failure', reason: 'invalid zip code'});
							}
							
						}
					});

		//first lets count total records

		LegacySchema.find({'zip': zip, 'insuranceType': "Health"},function(err, result){
			if(err){
				console.log(err);
				res.status(500).json({status: 'failure'});
			}else{

				console.log(result.length);
				if(result.length<threshold){


					LegacySchema.find({'insuranceType': "Health", 'county': county},function(err, countyresult){
						if(err){
							console.log(err);
							res.status(500).json({status: 'failure'});
						}else{
							console.log('county results:' + countyresult.length);
							if(countyresult.length<threshold){
								console.log(countysubstr);
								console.log(countysubstr.length);
								LegacySchema.find({'insuranceType': "Health", 'county': new RegExp(countysubstr, 'i')},function(err, stateresult){
									if(err){
										console.log(err);
										res.status(500).json({status: 'failure'});
									}else{
										console.log('state results:' + stateresult.length);
										res.json('result', stateresult);

									}
								});


							}else{
								res.json('result', countyresult);
							}
							

						}

					});


				}else{
					res.json('result', result);
				}

				
			}
		});


		//res.json('legacy',{name: 'legacy'});
	};

	return functions;
};


