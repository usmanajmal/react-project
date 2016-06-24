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
	 *
 	 */
 	getImage: function (id) {
 		Api.get('gallery/image/' + id)
 			.then(function(json) {
 				// Handle the case where images has not been initialized
 				// to an array
 				if (this.images) {
 					this.images.push(json.data);
 				}
 				else {
 					this.images = [json.data];
 				}

 				this.triggerChange();
 			}.bind(this))
 	},
	/**
	 * Use lodash to search through all images already loaded
	 */
	find: function (id) {
		var image = _.find(this.images, {id: id});
		console.log(image);

		// Handle case when images are not loaded
		if (image) {
			return image;
		}
		else {
			this.getImage(id);
			return null;
		}
	},
	/**
	 * Trigger change so all who are listening get the images
	 */
	triggerChange: function() {
		this.trigger('change', this.images);
	}
})