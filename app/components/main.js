// Include React 
var React = require('react');
var Nav = require('./Children/Nav');
var Jumbotron = require('./Children/Jumbotron');
var Query = require('./Children/Query');

var Main = React.createClass({

	// Here we render the function
	render: function(){

		return(
			<div className="main-container">
				<div className="container">

					<Nav />
					<Jumbotron />					

				  <div className="main-container">
				    <Query />
				  </div>

					<div className="row">
						
						{/*This code will dump the correct Child Component*/}
						{this.props.children}

					</div>
				</div>
			</div>
		)
	}
});

// Export the component back for use in other files
module.exports = Main;