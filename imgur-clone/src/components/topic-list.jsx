var React = require('react');
var Api = require('../utils/api');

module.exports = React.createClass({
	/**
	 * Default initial state
	 */
	getInitialState: function() {
		return {
			topics: []
		};
	},
	/**
	 * Runs right before a component is rendered
	 */
	componentWillMount: function () {
		Api.get('topics/defaults')
			.then(function(data) {
				//console.log(response.data);
				this.setState({
					topics: data.data
				});
			}.bind(this));
 	},
 	/**
	 * Render topic list
	 */
	render: function() {
		return <div className="list-group">
			Topic list
			{this.renderTopics()}
		</div>
	},
	/**
	 * Render all topics
	 */
	renderTopics: function() {
		return this.state.topics.map(function(topic) {
			return <li>
				{topic.id} {topic.name} {topic.description}
			</li>
		});
	}
});