var Reflux = require('reflux');
var Api = require('../utils/api');
var Actions = require('../actions');
var _ = require('lodash');

module.exports = Reflux.createStore({
	listenables: [Actions], /* Tells Reflux Store to listen to all Actions
	and if the name of action is identical to a function in here then that
	function will be executed */

	/**
	 * Get images using API util added above
	 */
	getImages: function(topicId) {
		Api.get('topics/' + topicId)
			.then(function(json) {
				console.log("Image Store: %d", json.data.length);
				this.images = _.reject(json.data, function (image) {
					return image.is_album;
				});
				this.triggerChange();
			}.bind(this));
	},
	/**
	 * Trigger change so all who are listening get the images
	 */
	triggerChange: function() {
		this.trigger('change', this.images);
	}
})