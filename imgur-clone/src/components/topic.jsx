var React = require('react');
var Reflux = require('reflux');
var Actions = require('../actions');
var ImageStore = require('../stores/image-store');
var ImagePreview = require('./image-preview');

module.exports = React.createClass({
	mixins: [
		Reflux.listenTo(ImageStore, 'onChange')
	],
    /**
     * Set default state
	 */
    getInitialState: function() {
		return {
			images: []
		}
	},
    /**
     * Use this function to trigger Actions
     */
	componentWillMount: function() {
		console.log('Topic is about to render and fetch data');
		Actions.getImages(this.props.params.id);
	},
	/**
	 * When a new topic is visited only render() function below
     * will get called which will only render the component again
     * but new data will not be fetches as componentWillMount will
     * not get called. Therefore, we will use this React's built-in
     * function to get data (images) for the new set of props
     * coming in.
     * {object} nextProps New set of properties
	 */
	componentWillReceiveProps: function (nextProps) {
        console.log("Get Images for Topic: %d", nextProps);
		Actions.getImages(nextProps.params.id);
	},
    /**
     *  Render component
     */
	render: function () {
		console.log('Topic is rendering with ID',  this.props.params.id);
		console.log('Number of images', this.state.images.length);
		return <div className="topic">
			{this.renderImages()}
		</div>
	},
    /**
     * Render images retrieved from state
     * INFO: onChange sets the images in state when ever image
     * change in Store
     */
	renderImages: function() {
        return this.state.images.slice(0,20).map(function(image) {
            //console.log(image.id);
			return <ImagePreview key={image.id} {...image} />
		});
	},
    /**
     * Handler for images changing in Store
     * {object} event Change event triggered
     * {object} images Images object
     */
	onChange: function (event, images) {
		this.setState({images:images})
	}
})