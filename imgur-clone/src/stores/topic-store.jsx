var Api = require('../utils/api');
var Reflux = require('reflux');
var Actions = require('../actions');

// Create store using Reflux using some config options
module.exports = Reflux.createStore({
	listenables: [Actions],
	/**
	 * Get topics using Imgur's API
	 */
	getTopics: function() {
		return Api.get('topics/defaults')
			.then(function(json) {
				// Store retrieved data
				this.topics = json.data;

				this.triggerChange();
			}.bind(this));
	},
	triggerChange: function() {
		this.trigger('change', this.topics);
	}
});