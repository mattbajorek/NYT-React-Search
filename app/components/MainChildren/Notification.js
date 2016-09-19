// Include React 
var React = require('react');
var Modal = require('react-modal');

var customStyles = {
  content : {
    top         : '50%',
    left        : '50%',
    right       : 'auto',
    bottom      : 'auto',
    marginRight : '-50%',
    transform   : 'translate(-50%, -50%)',
    padding     : '0px',
    color       : '#e74c3c',
  }
};

var headerStyles = {
  background: '#2c3e50',
  color: '#fff',
  padding: '10px'
}

var Notification = React.createClass({

	// Here we render the function
	render: function(){

		return(
			<Modal
        isOpen={this.props.modalIsOpen}
        onRequestClose={this.props.closeModal}
        style={customStyles} >

        <div class="modal-header" style={headerStyles}>
          <button type="button" className="close" onClick={this.props.closeModal} aria-hidden="true">×</button>
          <h3 className="modal-title"><strong>Error</strong></h3>
        </div>
        <div className="modal-footer">
          <p>No results found. Please refine inputs.</p>
          <button type="button" className="btn btn-default" onClick={this.props.closeModal}>Close</button>
        </div>

      </Modal>
		)
	}
});

// Export the component back for use in other files
module.exports = Notification;