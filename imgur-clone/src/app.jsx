var React = require('react');
var ReactDOM = require('react-dom');
var Routes = require('./routes');
var Api = require('./utils/api');

/* var Hello = React.createClass({
  render: function() {
    return <h1 className="red">
    	I am a header
    	{this.props.children}
    </h1>
  }
});

var Child1 = React.createClass({
	render: function() {
		return <h1>
			I am 1
			{this.props.children}
		</h1> 
	}
});


var Child2 = React.createClass({
	render: function() {
		return <h1>I am 2</h1>
	}
});*/


ReactDOM.render(Routes, document.querySelector('.container'));
