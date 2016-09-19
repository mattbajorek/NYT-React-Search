// Include React 
var React = require('react');
var Nav = require('./Children/Nav');
var Jumbotron = require('./Children/Jumbotron');
var Query = require('./Children/Query');

var Main = React.createClass({

	// Here we set a generic state associated with the text being searched for
	getInitialState: function(){
		return {
			search: "",
			start: "",
			end: ""
		}
	},

	// This function will respond to the user input 
	handleChange: function(event){

    	// Here we create syntax to capture any change in text to the query terms (pre-search).
    	// See this Stack Overflow answer for more details: 
    	// http://stackoverflow.com/questions/21029999/react-js-identifying-different-inputs-with-one-onchange-handler
    	var newState = {};
    	newState[event.target.id] = event.target.value;
    	this.setState(newState);

	},

	// Here we render the function
	render: function(){

		return(
			<div className="main-container">
				<div className="container">

					<Nav />
					<Jumbotron />					

				  <div className="main-container">
				    <Query value={this.state.value} handleChange={this.handleChange} />
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