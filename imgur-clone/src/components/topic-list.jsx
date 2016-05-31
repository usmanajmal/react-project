var React = require('react');
// var Api = require('../utils/api'); Use topic store instead to make the API call
var TopicStore = require('../stores/topic-store')

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
		/* Not a good idea to fetch data at this point. Instead
		we will use a store, we will call Topic Store
		Api.get('topics/defaults')
			.then(function(data) {
				//console.log(response.data);
				this.setState({
					topics: data.data
				});
			}.bind(this));*/

		TopicStore.getTopics()
			.then(function() {
				// We have successfully fetched topics
				// topics are now available on TopicStore.topics

				this.setState({
					topics: TopicStore.topics
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