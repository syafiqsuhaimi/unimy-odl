import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formUpdate } from '../actions';

class Working extends Component {      
    render() {
        return (
        <form className="workingFormStyle">
            <div className="tax">
                <label className="Form-label">Income Tax Number</label>
                <input 
                    className="Form-input" 
                    type="number" 
                    value={this.props.tax} 
                    placeholder=""
                    onChange={event => this.props.formUpdate({ prop: 'tax', value: event.target.value })}
                />
                {/* <div className="Invalid-feedback">
                Please enter a valid name.
                </div> */}
            </div>

            <div className="epf">
                <label className="Form-label">EPF Number</label>
                <input 
                    className="Form-input" 
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
                <label className="Form-label">Occupation</label>
                <input 
                    className="Form-input" 
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
                <label className="Form-label">Gross Salary</label>
                <input 
                    className="Form-input" 
                    type="text" 
                    style={{width: 105}} 
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
                <label className="Form-label">Nett Salary</label>
                <input 
                    className="Form-input" 
                    type="text" 
                    style={{width: 105}} 
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
                <label className="Form-label">Number of Family Dependants</label>
                <input 
                    className="Form-input" 
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
    }
}

export default connect(mapStateToProps, { formUpdate })(Working);