const request = require('request');
const Promise = request('es6-promise').Promise;

var clientID = 'e0fddff6b540e2b131a4';
var clientSecret = '6b79f52c559c6ca614b51f7a4a06ff60';
var appToken = '9e847c0bf03c37255ba7b495f3f5e538';

exports.findThing = (name) => {
	return new Promise((resolve, reject) => {
		searchThing(name).then((object) => {
			resolve(object);
		}).catch((reason) => {
			reject(reason);
		});
	};
};

const searchThing = (name) => {
	return new Promise((resolve, reject) => {
		request({
			url: 'https://www.thingiverse.com/login/oauth/authorize',
			method: 'GET', 
			client_id: clientID, 
			response_type: 'token',
		}, function(err, res){
			resolve(res);
		});
	});
};