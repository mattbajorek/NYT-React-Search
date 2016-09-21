// Include React 
var React = require('react');

// Include React Components
var Results = require('./SearchChildren/Results');
var DeleteItem = require('./SearchChildren/ResultsChildren/DeleteItem');

// Helper Function
var helpers = require('../utils/helpers');

var SavedArticles = React.createClass({

	getInitialState: function(){
		return {
			results: [],
			modalIsOpen: false,
			type: "",
			message: ""
		}
	},

	componentWillMount: function() {
		// Get saved articles
		helpers.getSaved()
			.then(function(data){
				console.log(data)
				if (data === false) {
					// Show message if no results found
					// this.message('Error','No results found. Please refine inputs.');
				} else {
					// Save data to state
					this.setState({
						results: data
					});
				}
			}.bind(this))	
	},

	// Here we render the function
	render: function(){

		return(
			<Results fa="fa fa-download" text="Saved Articles">
	  		{this.state.results.map(function(result) {
		  		return (
		  			<DeleteItem 
		  				key={result._id}
		  				title={result.title}
		  				url={result.url}
		  				date={result.date}
		  			/>
		  		)
		  	})}
		  </Results>
		)
	}
});

// Export the component back for use in other files
module.exports = SavedArticles;