import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formUpdate } from '../actions';

class Working extends Component {      
    render() {
        return (
        <form className="workingFormStyle">
            <div className="tax">
                <label className="form-label">Income Tax Number</label>
                <input 
                    className="form-control" 
                    type="number" 
                    value={this.props.tax} 
                    placeholder=""
                    onChange={event => this.props.formUpdate({ prop: 'tax', value: event.target.value })}
                    required
                />
                {/* <div className="Invalid-feedback">
                Please enter a valid name.
                </div> */}
            </div>

            <div className="epf">
                <label className="form-label">EPF Number</label>
                <input 
                    className="form-control" 
                    type="number" 
                    value={this.props.epf} 
                    onChange={event => this.props.formUpdate({ prop: 'epf', value: event.target.value })}
                    placeholder=""
                />
                {/* <div className="Invalid-feedback">
                Please enter a valid name.
                </div> */}
            </div>

            <div className="occupation">
                <label className="form-label">Occupation</label>
                <input 
                    className="form-control" 
                    type="text" 
                    value={this.props.occupation}
                    onChange={event => this.props.formUpdate({ prop: 'occupation', value: event.target.value })} 
                    placeholder=""
                />
                {/* <div className="Invalid-feedback">
                Please enter a valid name.
                </div> */}
            </div>
            <div className="gross">
                <label className="form-label">Gross Salary</label>
                <input 
                    className="form-control" 
                    type="text" 
                    value={this.props.gross}
                    onChange={event => this.props.formUpdate({ prop: 'gross', value: event.target.value })} 
                    placeholder="" 
                    required
                />
                {/* <div className="Invalid-feedback">
                    Valid first name is required.
                </div> */}
                </div>
                <div className="nett">
                <label className="form-label">Nett Salary</label>
                <input 
                    className="form-control" 
                    type="text" 
                    value={this.props.nett}
                    onChange={event => this.props.formUpdate({ prop: 'nett', value: event.target.value })}
                    placeholder="" 
                    required
                />
                {/* <div className="Invalid-feedback">
                    Valid last name is required.
                </div> */}
            </div>

            <div className="depend">
                <label className="form-label">Number of Family Dependants</label>
                <input 
                    className="form-control" 
                    type="number" 
                    value={this.props.depend}
                    onChange={event => this.props.formUpdate({ prop: 'depend', value: event.target.value })}
                    placeholder=""
                />
                {/* <div className="Invalid-feedback">
                Please enter a valid name.
                </div> */}
            </div>
        </form>
        );
    }
}

const mapStateToProps = (state) => {
    const { 
        tax, epf, occupation,
        gross, nett, depend
    } = state.form;

    return { 
        tax, epf, occupation,
        gross, nett, depend
    };
}

export default connect(mapStateToProps, { formUpdate })(Working);