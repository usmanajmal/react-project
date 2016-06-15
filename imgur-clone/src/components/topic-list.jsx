var React = require('react');
var Reflux = require('reflux');
var TopicStore = require('../stores/topic-store');
var Actions = require('../actions');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

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
			{this.renderTopics()}
		</div>
	},
	/**
	 * Render all topics
	 */
	renderTopics: function() {
		return this.state.topics.slice(0,4).map(function(topic) {
			return <Link to={"topics/" + topic.id} className="list-group-item" key={topic.id}>
				<h4>{topic.name}</h4>
				<p>{topic.description}</p>
			</Link>
		});
	},
	/**
	 * Change state with (possibly updated) topics, so re-render of the component is triggered
	 */
	onChange: function(event, topics) {
		this.setState({topics: topics}); // This will call renderTopic to render the topics
	}
});