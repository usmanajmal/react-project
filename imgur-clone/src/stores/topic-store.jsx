var Api = require('../utils/api');
var Reflux = require('reflux');
var Actions = require('../actions');

// Create store using Reflux using some config options
module.exports = Reflux.createStore({
	listenables: [Actions], // Provided by Reflux. For any action triggered by Actions object, 
	// this store will attempt to run function with same name. In our case its "getTopics" action
	/**
	 * Get topics using Imgur's API
	 */
	getTopics: function() {
		return Api.get('topics/defaults')
			.then(function(json) {
				// Store retrieved data
				this.topics = json.data;
				// Trigger even change
				this.triggerChange();
			}.bind(this));
	},
	triggerChange: function() {
		// Trigger change and also pass updated topics list
		this.trigger('change', this.topics);
	}
});