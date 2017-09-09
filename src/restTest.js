const request = require('request');
const fs = require('fs');

var clientID = 'e0fddff6b540e2b131a4';
var clientSecret = '6b79f52c559c6ca614b51f7a4a06ff60';
var appToken = '9e847c0bf03c37255ba7b495f3f5e538';


request({
	url: 'https://www.thingiverse.com/login/oauth/tokeninfo',
	method: 'POST', 
	access_token: appToken,
}, function(err, res){
	console.log(JSON.stringify(res));

	/*fs.writeFile('output.txt', JSON.stringify(res), (err) =>{
		if (err) throw err;
		console.log("Succes");
	});*/
});