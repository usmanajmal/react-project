var React = require('react');
var ReactDOM = require('react-dom');
var ReactFire = require('reactfire'); // Feeding retrieved data from firebase to components
var Firebase = require('firebase');   // Reaching out to firebase.com for syncing data
var Header = require('./header');
var List = require('./list');
var rootUrl = 'https://sweltering-heat-4125.firebaseio.com/';



var Hello = React.createClass({
  // Mixins: Any methods which React Fire has, literally copy them over to React
  mixins: [ ReactFire ],    
  getInitialState: function () {
  	return {
  		items: {},
  		loaded: false
  	}
  },
  /**
   * Taken from ReactJS documentation:
   * "Invoked once, both on the client and server, immediately before the initial rendering occurs.
   * If you call setState within this method, render() will see the updated state and will be executed
   * only once despite the state change."
   *
   * Use this function to instantiate instance for interacting with Firebase
   */
  componentWillMount: function() {
  	// Create a new instance of Firebase which will look for its data in <rootUrl>/items
  	// bindAsObject: This isn't a React object. Its is ab object given by ReactFire which
  	// is a bridge between firebase and out components. In order to add this object (as 
  	// it doesn't exist in React) we can use 'mixins', which is used above
  	this.fb = new Firebase(rootUrl + 'items/');
  	this.bindAsObject(this.fb, 'items');

  	this.fb.on('value', this.handleDataLoaded);
  },
  render: function() {

  	// Defination of itemsStore and items used below: 
  	// 'itemsStore' is a direct reference to Firebase object and it is
  	// used for creation of new items. The Firebase object let's us connect to
  	// remote database.
  	// 'items' is just a way to read already added items

    return <div className="row panel panel-default">
    	<div className="col-mod-8" col-mod-offset-2>
    		<h2 className="text-center">
    			To-Do List
    		</h2>
    		<Header itemsStore={this.firebaseRefs.items} />
    		<hr />
    		<div className={"content " + (this.state.loaded ? 'loaded': '')}>
    			<List items={this.state.items} />
    			{this.deleteButton()}
    		</div>
    	</div>
    </div>
  },
  /**
   * Add HTML for delete button
   * return {html} HTML code for the delet button
   */
  deleteButton: function() {
  	if (!this.state.loaded) {
  		return;
  	} else {
	  	return <div className="text-center clear-complete">
	  		<hr />
	  		<button
	  			onClick={this.onDeleteDoneClick} 
	  			className="btn btn-default"
	  		>
	  		Clear Complete
	  		</button>
	  	</div>
	}
  },
  /**
   * Click handler for delete button. Loop over all todos and clear out all done items
   * return {undefined}
   */
  onDeleteDoneClick: function () {
  	for (var key in this.state.items) {
  		if (this.state.items[key].done === true) {
  			this.fb.child(key).remove();   // 'child' will select a particular element
  		}
  	}
  },
  /**
   * Event handler for performing operations after data is loaded from firebase
   */ 
  handleDataLoaded: function () {
  	this.setState({loaded: true});
  }
});

// TODO: Add explanation of following
var element = React.createElement(Hello, {});
ReactDOM.render(element, document.querySelector('.container'));
