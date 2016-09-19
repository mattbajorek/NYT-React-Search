// Include React 
var React = require('react');

// Include React Components
var Nav = require('./MainChildren/Nav');
var Jumbotron = require('./MainChildren/Jumbotron');
var Query = require('./MainChildren/Query');
var Search = require('./MainChildren/Search');
var Notification = require('./MainChildren/Notification');

// Helper Function
var helpers = require('./utils/helpers');

var Main = React.createClass({

	// Here we set a generic state associated with the text being searched for
	getInitialState: function(){
		return {
			search: "",
			start: "",
			end: "",
			same: true,
			results: [],
			modalIsOpen: false
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
				search: this.state.search,
				start: this.state.start,
				end: this.state.end
			}

			// Search for articles
			helpers.runQuery(terms)
				.then(function(data){
					console.log(data);

					if (data === false) {
						this.openModal();
					} else {
						this.setState({
							results: data
						});
					}					

				// This code is necessary to bind the keyword "this" when we say this.setState 
				// to actually mean the component itself and not the runQuery function.
				}.bind(this))		
		}
	},

	openModal: function() {
    this.setState({modalIsOpen: true});
    var notification = document.getElementById('notification');
    
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

	// Here we render the function
	render: function(){

		return(
			<div className="main-container">
				<div className="container">

					<Nav />
					<Jumbotron />					
				  <Query handleChange={this.handleChange} handleClick={this.handleClick} />
				  {this.state.results.length !== 0 ? <Search results={this.state.results} /> : null}
				  <Notification modalIsOpen={this.state.modalIsOpen} openModal={this.openModal} closeModal={this.closeModal} />

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