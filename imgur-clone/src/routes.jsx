var React = require('react');
var ReactRouter = require('react-router');
// Router object which help deciding what contents to show on page
var Router = ReactRouter.Router;
// Route takes care of how to configure router
var Route = ReactRouter.Route;

var Main = require('./components/main')

module.exports = (
	<Router>
		<Route path="/" component={Main}>

		</Route>
	</Router>
);