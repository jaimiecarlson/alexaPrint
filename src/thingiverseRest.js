const request = require('request');
const Promise = require('es6-promise').Promise;
const fs = require('fs');
var express = require('express');
const http = require('http');
const path = require('path');
const htmlparser = require('htmlparser');
const mailer = require('nodemailer');

var clientID = 'e0fddff6b540e2b131a4';
var clientSecret = '6b79f52c559c6ca614b51f7a4a06ff60';
var appToken = '9e847c0bf03c37255ba7b495f3f5e538';
var accessToken = 'c9eab74d35abff24c6608a664c17e6ae';

exports.findThing = (name) => {
	return new Promise((resolve, reject) => {
		searchThing(name).then((object) => {
			console.log("successful search");
			console.log(object);
			mailThing(object).then((success) => {
				console.log("mailing worked");
				resolve(success);
			}).catch((reason) => {
				console.log("mail did not work");
				reject(reason);
			});
		}).catch((reason) => {
			console.log("did not work");
			reject(reason);
		});
	});
};

const searchThing = (name) => {
	console.log('started');
    return new Promise((resolve, reject) => {
        const url = 'http://api.thingiverse.com/search/' + name + '?access_token=' + accessToken;
        request({
			url: url,
			method:'GET',
		}, (error, httpResponse, body) => {
            if (error) {
            	console.log('error');
            	reject(error);
            } else {
            	var b = JSON.parse(body);
				if (b[0] !== undefined && b[0].public_url !== undefined){
					request({
						url:b[0].public_url + "#files",
						method:'GET',
					}, function(err, res, body){
						if (err){
							console.log(err);
							reject(err);
						} else {
							var s = body.split(" ");
							for (var i = 0; i < s.length; i++){
								if (s[i].includes('data-file-id')){
									var data = s[i].split('\"');
									//Print the download link for the first URL
									var downloadURL = "https://www.thingiverse.com/download:" + data[1];
									console.log(downloadURL);
									resolve({'url': downloadURL});
									break;
								}
							}
						}
					});
				} else {
					reject('No URL given');
				}
			}
	    });
    });
};

const mailThing = (name) => {
	var url = name.url;
	console.log("url in mail thing is" + url);
	return new Promise((resolve, reject) => {
		request.get(url, function(error, response, body) {
			if (error) {
				console.log("there was an error");
				reject(error);
			} else {
				var transporter = mailer.createTransport({
					host: 'smtp.gmail.com',
					port: 587,
					secure: false,
					auth: {
						user: 'alexatestpennapps@gmail.com',
						pass: 'thisisapassword' 
					}
				});	
				var mailOptions = {
					sender: 'alexatestpennapps@gmail.com',
					to: 'jaimiec40@gmail.com',
					subject: '3D Printed File from Alexa',
					body: 'Attached is your file.',
					attachments: [{'filename': 'file.stl', 'content': body}]
				};
				console.log("right before sending the mail");
				console.log(mailOptions);
				console.log(transporter);
				transporter.sendMail(mailOptions, (error, info) => {
					console.log('about to send the mail');
					console.log(info);
					if (error){
						console.log("there was a mail error");
						reject(error);
						return;
					} else {
						console.log("successful mail");
						resolve("Success");
						return;
					}
				});
			}
		});
	}); 
};