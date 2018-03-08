import React, { Component } from 'react';
import { connect } from 'react-redux';

class Success extends Component {
    render() {
            if (this.props.submitSuccess) {
                return (
                    <div className="App-body">
                        <div className="successContainer">
                            <h3>Your loan application is successful and will be processed.</h3>
                            <h5>Please wait for the confirmation email. In the meantime, take a look at what we have to offer.</h5>
                            <i className="fa fa-check-circle" style={{ fontSize: 60 }}></i>
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="App-body">
                        <div className="successContainer">
                            <h3>Somethings went wrong with the database.</h3>
                            <h5>Well nothing can do. Just carry on with your life.</h5>
                            <i className="fa fa-exclamation-circle" style={{ fontSize: 60 }}></i>
                        </div>
                    </div>
                );
            }
    }
}

const mapStateToProps = (state) => {
    const { submitSuccess } = state.form;

    return { submitSuccess };
}

export default connect(mapStateToProps)(Success);
