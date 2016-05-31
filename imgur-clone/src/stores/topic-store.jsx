var Api = require('../utils/api');
var Reflux = require('reflux');

// Create store using Reflux using some config options
module.exports = Reflux.createStore({
	/**
	 * Get topics using Imgur's API
	 */
	getTopics: function() {
		return Api.get('topics/defaults')
			.then(function(json) {
				// Store retrieved data
				this.topics = json.data;
			}.bind(this));
	}
});