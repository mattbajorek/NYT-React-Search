// Include React 
var React = require('react');

// Include React Components
var ListItem = require('./SearchChildren/ListItem');

var Search = React.createClass({

	// Here we render the function
	render: function(){

		var saved = this.props.saved;

		return(
			<div className="row">
				<div className="col-lg-12">
					<div className="panel panel-primary">

						<div className="panel-heading">
							<h1 className="panel-title">
								<strong><i className="fa fa-newspaper-o" aria-hidden="true"></i><span> Results</span></strong>
							</h1>
						</div>

						<div className="panel-body">
						  <ul className="list-group">

						  	{this.props.results.map(function(result) {
						  		return (
						  			<ListItem 
						  				key={result._id}
						  				title={result.headline.main}
						  				url={result.web_url}
						  				date={result.pub_date}
						  				saved={saved}
						  			/>
						  		)
						  	})}

					    </ul>
						</div>
							
					</div>
				</div>
			</div>
		)
	}
});

// Export the component back for use in other files
module.exports = Search;