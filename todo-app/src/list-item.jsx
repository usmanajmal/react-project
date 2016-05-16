var React = require('react');
var Firebase = require('firebase');   // Reaching out to firebase.com for syncing data
var rootUrl = 'https://sweltering-heat-4125.firebaseio.com/';


module.exports = React.createClass({
	getInitialState: function () {
		return {
			text: this.props.item.text,
			done: this.props.item.done,
			textChange: false
		};
	},
	/**
	 *	
	 */
	/**
	 * Taken from ReactJS documentation:
	 * "Invoked once, both on the client and server, immediately before the initial rendering occurs.
	 * If you call setState within this method, render() will see the updated state and will be executed
	 * only once despite the state change."
	 *
	 * List item should be able to update itself form done: false to done: true
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
				disabled={this.state.done} /* Disable the input box when 
				the todo is done */
				className="form-control"
				value={this.state.text} /* Controlled form 
				control which means we need an initial state */
				onChange={this.handleTextChange}
			/>
			<span className="input-group-btn">
				{this.changesButtons()}
				<button
					onClick={this.handleDeleteClick} 
					className="btn btn-default"
				>
				Delete
				</button>
			</span>
		</div>
	},
	/**
	 * Show buttons for "Save" and "Undo" when someone changes text of input box
	 * return {html} HTML for buttons
	 */
	changesButtons: function () {
		if (!this.state.textChanged) {
			return null;
		}
		return [
			<button 
				onClick={this.handleSaveClick}
				className="btn btn-default"
			>
			Save
			</button>,
			
			<button 
				onClick={this.handleUndoClick}
				className="btn btn-default"
			>
			Undo
			</button>
		]
	},
	/**
	 * Click handler for Save button
	 * return {undefined}
	 */
	handleSaveClick: function () {
		this.fb.update({
			text: this.state.text, // The new text. this.props.text refers to currently set text of FireBase
		});
		this.setState({
			textChanged: false
		});
	},
	/**
	 * Click handler for Undo button to remove any change user add to a todo
	 * return {undefined}
	 */
	handleUndoClick: function() {
		this.setState({
			text: this.props.item.text,
			textChanged: false
		});
	},
	/**
	 * Handler for making input boxes of alerts able to change text
	 * return {undefined}
	 */
	handleTextChange: function(event) {
		this.setState({
			text: event.target.value,
			textChanged: true
		})
	},
	/**
	 * Handler for changing state of a todo
	 * return {undefined}
	 */
	handleDoneChange: function(event) {
		var update = {done: event.target.checked};
		this.setState(update);
		this.fb.update(update); 
	},
	/**
	 * Handler for deletion of a todo
	 * return {undefined}
	 */
	handleDeleteClick: function() {
		this.fb.remove();
	}
});