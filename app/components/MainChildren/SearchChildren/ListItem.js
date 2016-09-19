// Include React 
var React = require('react');

var ListItem = React.createClass({

	// Here we render the function
	render: function(){

		return(
			<li className="list-group-item">
        <h3>
        	<em>{this.props.title}</em>
        	<div className="btn-group pull-right">
        		<button className="btn btn-primary" data-toggle="modal" data-target="#myModal">Save</button>
        		<a className="btn btn-default" href={this.props.url} target="_blank">
        			View Article
        		</a>
        	</div>
        </h3>
        <p>Date Published: {this.props.date}</p>
      </li>
		)
	}
});

// Export the component back for use in other files
module.exports = ListItem;