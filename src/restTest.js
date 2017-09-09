const request = require('request');
const fs = require('fs');
var express = require('express');
const http = require('http');
const path = require('path');
const htmlparser = require('htmlparser');

var clientID = 'e0fddff6b540e2b131a4';
var clientSecret = '6b79f52c559c6ca614b51f7a4a06ff60';
var appToken = '9e847c0bf03c37255ba7b495f3f5e538';
var qs = require('querystring');
var url = 'http://www.thingiverse.com/login/oauth/access_token';
/*
var post = {
	client_id: clientID,
	client_secret: clientSecret,
};


var authenticate = function(req, res) {
	console.log("got here");
	if (req.param('code')){
		post['code'] = req.param('code');
	
		request.post(url, {form:post}, function (error, res, body){
			if (error) console.log(error);
			var parsed = qs.parse(body);
			if (parsed){
				console.log(parsed);
			}
			if (parsed && parsed.access_token){
				console.log(parsed.access_token);
			} else {
				console.log("nope");
			}
		});
	} else {
		console.log("false");
	}
}

var app = express();
app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res){
	console.log("got here");
	if (req.param('code')){
		post['code'] = req.param('code');
	
		request.post(url, {form:post}, function (error, res, body){
			if (error) console.log(error);
			var parsed = qs.parse(body);
			if (parsed){
				console.log(parsed);
			}
			if (parsed && parsed.access_token){
				console.log(parsed.access_token);
			} else {
				console.log("nope");
			}
		});
	} else {
		console.log("false");
	}
});
http.createServer(app).listen(app.get('port'), 'localhost', function(){
	console.log("Server is listening on port");
});*/

//post['code'] = request.param('code');
/*request({
	url: 'http://www.thingiverse.com/login/oauth/authorize',
	method: 'GET', 
	client_id: clientID,
	response_type:'token',
}, function(err, res, body){
	console.log(JSON.stringify(res));
	console.log(JSON.stringify(body));
	var q = qs.parse(body);
	console.log(q);
	console.log(q.access_token);
});*/

//1. User accesses resources using the client app
//2. Client app gets client Id and password, registers redirect URI
//3. User logs in with authenticating app. 
//4. Authenticating server redirects user to the URI
//5. User goes to URI redirect
//6. Client gets the authentication code and sends it to authorization server
//7. Authenticating app returns an access token to client
//8. Client can do things


//http://www.thingiverse.com/login/oauth/authorize?client_id=e0fddff6b540e2b131a4&redirect_uri=&response_type=token

var htmlHandler = new htmlparser.DefaultHandler(function(error, dom){
	if (error){
		console.log("error");
	} else {
		console.log(dom[2].children);
	}
});

var parser = new htmlparser.Parser(htmlHandler);

var accessToken = 'c9eab74d35abff24c6608a664c17e6ae';

request({
	url: 'http://api.thingiverse.com/search/wrench' + '?access_token=' + accessToken,
	method: 'GET', 
}, function(err, res, body){
	console.log(body);
	var b = JSON.parse(body);
	console.log(b[0].public_url);
	if (b[0] !== undefined){
		request({
			url:b[0].public_url + "#files",
			method:'GET',
		}, function(err, res, body){
			var s = body.split(" ");
			for (var i = 0; i < s.length; i++){
				if (s[i].includes('data-file-id')){
					var data = s[i].split('\"');
					console.log(data[1]);
					//Print the first one
					var downloadURL = "https://www.thingiverse.com/download:" + data[1];
					console.log(downloadURL);

					break;
				}
			}
			fs.writeFile('output.txt', body, (err) => {  
			    // throws an error, you could also catch it here
			    if (err) throw err;
			    // success case, the file was saved
			    console.log('wrote out!');
			});
			//parser.parseComplete(body);
		});
	} else {
		console.log("Sorry, I didn't find anything like that");
	}
});

var reqt = request.get("https://www.thingiverse.com/download:279669", function(error, response, body) {
	if (error) console.log(error);
	if (body) console.log(body);
	fs.writeFile('file.stl', body, (err) =>{
		if (err) console.log(err);
		else console.log("successfully wrote stl file");
	})
});