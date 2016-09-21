// Include React 
var React = require('react');

// Helper Function
var helpers = require('../../../utils/helpers');

var ListItem = React.createClass({

  getInitialState: function(){
    return {
      show: true
    }
  },

  // This function will respond to the user click
  handleClick: function(event){
    // Send article data to server to save to db
    helpers.deleteSaved(this.props.id)
      .then(function(res){
        // console.log(res);
        if (res.status === 'deleted') {
          // Set render to false
          this.setState({show: false});
        } else {
          // Show message
          this.props.deleted('error');
        }        
      }.bind(this));
  },

	// Here we render the function
	render: function(){

		return(
      <div>
        {this.state.show === true ?
          <li className="list-group-item">
            <h3>
            	<em>{this.props.title}</em>
            	<div className="btn-group pull-right">
            		<button className="btn btn-primary" data-toggle="modal" onClick={this.handleClick}>Delete</button>
            		<a className="btn btn-default" href={this.props.url} target="_blank">
            			View Article
            		</a>
            	</div>
            </h3>
            <p>Date Published: {this.props.date}</p>
          </li>
         : null}
      </div>
      
		)
	}
});

// Export the component back for use in other files
module.exports = ListItem;