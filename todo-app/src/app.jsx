var React = require('react');
var ReactDOM = require('react-dom');
var ReactFire = require('reactfire'); // Feeding retrieved data from firebase to components
var Firebase = require('firebase');   // Reaching out to firebase.com for syncing data
var Header = require('./header');
var rootUrl = 'https://sweltering-heat-4125.firebaseio.com/';



var Hello = React.createClass({
  // Any methods which React Fire has, literally copy them over to React
  mixins: [ ReactFire ],    
  componentWillMount: function() {
  	// Create a new instance of Firebase which will look for its data in <rootUrl>/items
  	// bindAsObject: This isn't a React object. Its is ab object given by ReactFire which
  	// is a bridge between firebase and out components. In order to add this object (as 
  	// it doesn't exist in React) we can use 'mixins', which is used above
  	this.bindAsObject(new Firebase(rootUrl + 'items/'), 'items');
  },
  render: function() {

    return <div className="row panel panel-default">
    	<div className="col-mod-8" col-mod-offset-2>
    		<h2 className="text-center">
    			To-Do List
    		</h2>
    		<Header itemsStore={this.firebaseRefs.items} />
    	</div>
    </div>
  }
});

var element = React.createElement(Hello, {});
ReactDOM.render(element, document.querySelector('.container'));
