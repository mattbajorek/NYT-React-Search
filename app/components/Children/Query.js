// Include React 
var React = require('react');

var Query = React.createClass({

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
			<div className="row">
				<div className="col-lg-12">
					<div className="panel panel-primary">

						<div className="panel-heading">
							<h1 className="panel-title">
								<strong><i className="fa fa-newspaper-o" aria-hidden="true"></i><span> Query</span></strong>
							</h1>
						</div>

						<div className="panel-body">
						  <form>
						    <div className="form-group">
						      <h4><strong>Topic</strong></h4>
						      <input type="text" value={this.state.value} className="form-control" id="search" onChange= {this.handleChange} required=""/>
						      <h4 className=""><strong>Start Year</strong></h4>
						      <input type="number" value={this.state.value} className="form-control" id="start" onChange= {this.handleChange} required=""/>
						      <h4 className=""><strong>End Year</strong></h4>
						      <input type="number" value={this.state.value} className="form-control" id="end" onChange= {this.handleChange} required=""/>
						    </div>
						    <div className="pull-right">
						      <button type="button" className="btn btn-danger">
						        <h4>Submit</h4>
						      </button>
						    </div>
						  </form>
						</div>
							
					</div>
				</div>
			</div>
		)
	}
});

// Export the component back for use in other files
module.exports = Query;