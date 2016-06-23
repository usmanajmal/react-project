var React = require('react');

module.exports = React.createClass({
    /**
     * Render component image-preview
     */
	render: function () {
		return <div className="image-preview">

			{this.image()}
		</div>
	},
    /**
     *  Return link to the image
     */
    image: function () {
        var link = 'http://i.imgur.com/' +  this.props.id + 'h.jpg';
        return <img src={link} />
    }
})