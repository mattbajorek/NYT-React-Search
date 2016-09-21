// Include React 
var React = require('react');

// Include React Components
var Query = require('./SearchChildren/Query');
var Results = require('./SearchChildren/Results');
var SaveItem = require('./SearchChildren/ResultsChildren/SaveItem');
var Notification = require('./SearchChildren/Notification');

// Helper Function
var helpers = require('../utils/helpers');

var Search = React.createClass({

	// Here we set a generic state associated with the text being searched for
	getInitialState: function(){
		return {
			search: "",
			start: "",
			end: "",
			same: false,
			results: [],
			modalIsOpen: false,
			type: "",
			message: ""
		}
	},

	// This function will respond to the user input 
	handleChange: function(event){

  	// Here we create syntax to capture any change in text to the query terms (pre-search).
  	// See this Stack Overflow answer for more details: 
  	// http://stackoverflow.com/questions/21029999/react-js-identifying-different-inputs-with-one-onchange-handler
  	var newState = {};
  	newState[event.target.id] = event.target.value;
  	// Allows the submit button to send a request again because state has changed
  	newState['same'] = false;
  	this.setState(newState);

	},

	// This function will respond to the user click
	handleClick: function(event){

		if (this.state.same === false) {
			// Stop submit button from sending a request again until state has changed
			this.setState({same: true});

			// Make object of search parameters
			var terms = {
				search: this.state.search.trim(),
				start: this.state.start,
				end: this.state.end
			}

			// Check terms to catch user errors
			if (terms.search === "" || terms.start === "" || terms.end === "") {
				// Show message if search terms are empty
				this.message('Error','Please fill in all inputs.');
				return
			} else if (terms.start < 1851 || terms.start > 2016 || terms.end < 1951 || terms.end > 2016) {
				// Show message if out of range
				this.message('Error','Please specify start and end date between 1851 and 2016.');
				return
			}

			// Search for articles
			helpers.getArticles(terms)
				.then(function(data){
					if (data === false) {
						// Show message if no results found
						this.message('Error','No results found. Please refine inputs.');
					} else {
						// Save data to state
						this.setState({
							results: data
						});
					}
				}.bind(this))		
		}
	},

	openModal: function() {
    this.setState({modalIsOpen: true});
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  message: function(type,text) {
  	// Set text
  	this.setState({
  		type: type,
			message: text
		});
		// Show modal
		this.openModal();
  },

  saved: function(status) {
  	if (status === 'saved') {
  		// Show successfully saved message
			this.message('Successfully Saved','Click "Saved Articles" in navigation to review.');
  	} else {
  		// Show successfully saved message
			this.message('Error','Article was already saved.');
  	}
		return
  },

	// Here we render the function
	render: function(){

		var saved = this.saved;

		return(
			<div>			

			  <Query handleChange={this.handleChange} handleClick={this.handleClick} />
			  {this.state.results.length !== 0 ? 
			  	<Results fa="fa fa-newspaper-o" text="Results">
			  		{this.state.results.map(function(result) {
				  		return (
				  			<SaveItem 
				  				key={result._id}
				  				title={result.headline.main}
				  				url={result.web_url}
				  				date={result.pub_date}
				  				saved={saved}
				  			/>
				  		)
				  	})}
				  </Results> : null}
			  <Notification
			  	modalIsOpen={this.state.modalIsOpen}
			  	openModal={this.openModal}
			  	closeModal={this.closeModal}
			  	type={this.state.type}
			  	message={this.state.message} />

			</div>
		)
	}
});

// Export the component back for use in other files
module.exports = Search;