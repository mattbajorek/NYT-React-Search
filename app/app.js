// Include the Main React Dependencies
var React = require('react');
var ReactDOM = require('react-dom');

// Grab the properties associated with react-router
var Router = require('react-router').Router;
var hashHistory = require('react-router').hashHistory;
var Route = require('react-router').Route;
var IndexRoute	= require('react-router').IndexRoute;

// Reference the high-level components
var Main = require('./components/Main');
var Search = require('./components/MainChildren/Search'); 
var Saved = require('./components/MainChildren/Child1');

// Renders the contents according to the route page. 
ReactDOM.render(
	<Router history={hashHistory}>

		{/*High level component is the Main component*/}
		<Route path='/' component={Main}>

			{/* If user selects Child1 then show the appropriate component*/}
			<Route path='search' component={Search} />

			{/* If user selects Child2 then show the appropriate component*/}
			<Route path='saved' component={Saved} />

			{/*If user selects any other path... we get the Home Route*/}
			<IndexRoute component={Search} />
			
		</Route>

	</Router>,
	document.getElementById('app')
)