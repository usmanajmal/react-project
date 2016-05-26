// Centralized point of contact with Imgur's API
var Fetch = require('whatwg-fetch');
var rootUrl = 'https://api.imgur.com/3/';
var apiKey = '7d0cc13ae1d4d57';

module.exports = window.api = {
 	get: function(url) {
 		// Fetch: URL and configuration option in arguments
 		return fetch(rootUrl + url, {
 			headers: {
 				'Authorization': 'Client-ID ' + apiKey
 			}
 		})
 		.then(function (response)  {
 			return response.json()
 		});
 	}
}