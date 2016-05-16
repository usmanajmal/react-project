var React = require('react');

module.exports = React.createClass({
	// Refer to form element as controlled or un-controlled format
	// Controlled: Tie to this.state
	// Uncontrolled: TODO: Add explanation of Un-controlled format here!
	getInitialState: function () {
		return {
			text: ''
		}
	},   
	render: function() {
		return <div className="input-group">
			<input 
				value={this.state.text}
				onChange={this.handleInputChange}
				type="text" 
				className="form-control" />
			<span className="input-group-btn">
				<button 
					onClick={this.handleClick}
					className="btn btn-default" type="button">
					Add
				</button>
			</span>
		</div>	
	},
	/**
	 *	Click handler for "Add" button. Add new todo to Firebase
	 *  using function "push".
	 *  TODO: What was itemsStore? How is "push" function allowed by it
	 *  return {undefined}
	 */
	handleClick: function () {
		this.props.itemsStore.push({ // Push is for creating a new object in remote DB
			text: this.state.text,
			done: false
		}); 
		this.setState({text: ""});
	}, 
	/**
	 * Handler for changing text of input box. Use setState to change the text of input
	 * box when someone writes to it
	 * return {undefined}
	 */
	handleInputChange: function (event) {
		this.setState({text: event.target.value});
	}
});
