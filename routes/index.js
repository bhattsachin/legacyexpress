
/*
 * GET home page.
 */
var LegacySchema = require('../schemas/legacy');
var threshold = 20;

module.exports = function(){
	var functions = {};

	functions.home = function(req, res){
  		res.render('index', { title: 'Legacy' });
	};

	functions.legacy = function(req, res){
		var zip = req.param('zip');
		console.log(zip);

		//first lets count total records

		LegacySchema.find({'zip': zip, 'insuranceType': "Health"},function(err, result){
			if(err){
				console.log(err);
				res.status(500).json({status: 'failure'});
			}else{

				console.log(result.length);
				if(result.length<threshold){
					
					console.log(result[0]['county']);
					LegacySchema.find({'insuranceType': "Health", 'county': result[0]['county']},function(err, countyresult){
						if(err){
							console.log(err);
							res.status(500).json({status: 'failure'});
						}else{
							console.log('county results:' + countyresult.length);
							if(countyresult.length<threshold){
								LegacySchema.find({'insuranceType': "Health", 'state': countyresult[0]['state']},function(err, stateresult){
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


