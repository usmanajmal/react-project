var React = require('react');
var ListItem = require('./list-item');

module.exports = React.createClass({
	render: function () {
		console.log(this.props);
		return <div>
			{this.renderList()}
		</div>
	},
	/**
	 *	Helper method for rendering the list
	 */
	renderList: function () {
		if (!this.props.items) {
			return <h4>
				Add a To-Do to get started!
			</h4>
		} else {
			var children = [];
			for (var key in this.props.items) {
				var item = this.props.items[key];
				item.key = key;

				children.push(
					<ListItem
						item={item}
						key={key}
						>
					</ListItem>
				)
			}
			return children;
		}
	}
}); 