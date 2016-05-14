var React = require('react');
var Firebase = require('firebase');   // Reaching out to firebase.com for syncing data
var rootUrl = 'https://sweltering-heat-4125.firebaseio.com/';


module.exports = React.createClass({
	getInitialState: function () {
		return {
			text: this.props.item.text,
			done: this.props.item.done
		};
	},
	/**
	 *	List item should be able to update itself form done: false to done: true
	 */
	componentWillMount: function () {
		this.fb = new Firebase(rootUrl + 'items/' + this.props.item.key);
	},
	render: function () {
		return <div className="input-group">
			<span className="input-group-addon">
				<input
					checked={this.state.done} 
					onChange={this.handleDoneChange} /* This made
					checkbox a controlled form object which means
					it value will be available via this.state */
					type="checkbox" 
				/>
			</span>
			<input type="text"
				className="form-control"
				value={this.state.text} /* Controlled form 
				control which means we need an initial state */
			/>
			<span className="input-group-btn">
				<button className="btn btn-default">
				Delete
				</button>
			</span>
		</div>
	},
	/**
	 * Handler for changing state of a todo
	 */
	handleDoneChange: function(event) {
		var update = {done: event.target.checked};
		this.setState(update);
		this.fb.update(update); 
	}
});