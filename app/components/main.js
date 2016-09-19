// Include React 
var React = require('react');
var Nav = require('./Children/Nav');

var Main = React.createClass({

	// Here we render the function
	render: function(){

		return(
				<div className="container">
					<Nav />
					<div className="jumbotron">
						<h2 className="text-center"><strong>(ReactJS) New York Times Article Scrubber</strong></h2>
						<h3 className="text-center">Search for and save articles of interest.</h3>
						<hr/>
						<p>
							<a href="#/Child1"><button className="btn btn-primary btn-lg">Show Child #1</button></a>
							<a href="#/Child2"><button className="btn btn-danger btn-lg">Show Child #2</button></a>
						</p>
					</div>

					<div className="row">
						
						{/*This code will dump the correct Child Component*/}
						{this.props.children}

					</div>
				</div>
		)
	}
});

// Export the component back for use in other files
module.exports = Main;