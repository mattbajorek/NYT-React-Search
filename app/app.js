// Include the Main React Dependencies
var React = require('react');
var ReactDOM = require('react-dom');

// Grab the proeprty associated with the Router and hashHistroy
var Router = require('react-router').Router;
var hashHistory = require('react-router').hashHistory;

// Grabs the Routes
var routes = require('./config/routes');

// Renders the contents according to the route page. 
ReactDOM.render(
	<Router history={hashHistory}>
		{routes}
	</Router>,
	document.getElementById('app')
)