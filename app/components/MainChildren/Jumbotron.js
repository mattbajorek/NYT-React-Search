// Include React 
var React = require('react');

var Jumbotron = React.createClass({

	// Here we render the function
	render: function(){

		return(
			<div className="jumbotron">
				<h2 className="text-center"><strong>(ReactJS) New York Times Article Scrubber</strong></h2>
				<h3 className="text-center">Search for and save articles of interest.</h3>
			</div>
		)
	}
});

// Export the component back for use in other files
module.exports = Jumbotron;