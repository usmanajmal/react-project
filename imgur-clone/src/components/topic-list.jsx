var React = require('react');
var Reflux = require('reflux');
var TopicStore = require('../stores/topic-store');
var Actions = require('../actions');

module.exports = React.createClass({
	// This component need to listen to any event triggered by TopicStore
	// When it happens, run onChange function defined here in this component
	mixins: [
		Reflux.listenTo(TopicStore, 'onChange')
	],
	/**
	 * Default initial state
	 */
	getInitialState: function() {
		return {
			topics: []
		};
	},
	/**
	 * Runs right before a component is rendered and it runs only once
	 */
	componentWillMount: function () {
		Actions.getTopics();
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
	},
	/**
	 * Change state with (possibly updated) topics, so re-render of the component is triggered
	 */
	onChange: function(event, topics) {
		this.setState({topics: topics}); // This will call renderTopic to render the topics
	}
});