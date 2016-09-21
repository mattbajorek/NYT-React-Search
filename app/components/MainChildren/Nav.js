// Include React 
var React = require('react');

var Nav = React.createClass({

	// Here we render the function
	render: function(){

		return(
			<nav className="navbar navbar-default">
			  <div className="container-fluid">

			    <div className="navbar-header">
			      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
			        <span className="sr-only">Toggle navigation</span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			      </button>
			      <a className="navbar-brand" href="#">NYT-React</a>
			    </div>

			    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			      <ul className="nav navbar-nav navbar-right">
			        <li><a href="#/search">Search</a></li>
			        <li><a href="#/saved">Saved Articles</a></li>
			      </ul>
			    </div>
			    
			  </div>
			</nav>
		)
	}
});

// Export the component back for use in other files
module.exports = Nav;