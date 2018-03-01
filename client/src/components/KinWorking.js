import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formUpdate } from '../actions';

class KinWorking extends Component {      
    render() {
        return (
        <form className="workingFormStyle">
            <div className="tax">
                <label className="Form-label">Income Tax Number</label>
                <input 
                    className="Form-input" 
                    type="number" 
                    value={this.props.kintax} 
                    placeholder=""
                    onChange={event => this.props.formUpdate({ prop: 'kintax', value: event.target.value })}
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
                    value={this.props.kinepf} 
                    onChange={event => this.props.formUpdate({ prop: 'kinepf', value: event.target.value })}
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
                    value={this.props.kinoccu}
                    onChange={event => this.props.formUpdate({ prop: 'kinoccu', value: event.target.value })} 
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
                    style={{ width: 220 }} 
                    value={this.props.kingross}
                    onChange={event => this.props.formUpdate({ prop: 'kingross', value: event.target.value })} 
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
                    style={{ width: 245 }} 
                    value={this.props.kinnett}
                    onChange={event => this.props.formUpdate({ prop: 'kinnett', value: event.target.value })}
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
                    value={this.props.kindepend}
                    onChange={event => this.props.formUpdate({ prop: 'kindepend', value: event.target.value })}
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
        kintax, kinepf, kinoccu,
        kingross, kinnett, kindepend
    } = state.form;
    
    return { 
        kintax, kinepf, kinoccu,
        kingross, kinnett, kindepend
    };
}

export default connect(mapStateToProps, { formUpdate })(KinWorking);