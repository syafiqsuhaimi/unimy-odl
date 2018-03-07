import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formUpdate, formValidate } from '../actions';

class Working extends Component {      
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.renderErrorText = this.renderErrorText.bind(this);
        this.state = {
            formErrors: {
                tax: '', epf: '', occu: '', gross: '',
                nett: '', depend: ''
            },
            taxValid: false,
            epfValid: false,
            occuValid: false,
            grossValid: false,
            nettValid: false,
            dependValid: false,
            formValid: false
        };
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.props.formUpdate({ prop: [name], value });
        this.validateField(name, value);
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let taxValid = this.state.taxValid;
        let epfValid = this.state.epfValid;
        let occuValid = this.state.occuValid;
        let grossValid = this.state.grossValid;
        let nettValid = this.state.nettValid;
        let dependValid = this.state.dependValid;

        switch (fieldName) {
            case 'tax':
                taxValid = value.length > 8;
                if (fieldValidationErrors.tax = taxValid) {
                    fieldValidationErrors.tax = '';
                    taxValid = true;
                } else {
                    fieldValidationErrors.tax = ' is-invalid';
                    taxValid = false;
                }
                break;
            case 'epf':
                epfValid = value.length >= 8;
                if (fieldValidationErrors.epf = epfValid) {
                    fieldValidationErrors.epf = '';
                    epfValid = true;
                } else {
                    fieldValidationErrors.epf = ' is-invalid';
                    epfValid = false;
                }
                break;
            case 'occupation':
                occuValid = value.length >= 2;
                if (fieldValidationErrors.occu = occuValid) {
                    fieldValidationErrors.occu = '';
                    occuValid = true;
                } else {
                    fieldValidationErrors.occu = ' is-invalid';
                    occuValid = false;
                }
                break;
            case 'gross':
                grossValid = value.length >= 3;
                if (fieldValidationErrors.gross = grossValid) {
                    fieldValidationErrors.gross = '';
                    grossValid = true;
                } else {
                    fieldValidationErrors.gross = ' is-invalid';
                    grossValid = false;
                }
                break;
            case 'nett':
                nettValid = value.length >= 3;
                if (fieldValidationErrors.nett = nettValid) {
                    fieldValidationErrors.nett = '';
                    nettValid = true;
                } else {
                    fieldValidationErrors.nett = ' is-invalid';
                    nettValid = false;
                }
                break;
            case 'depend':
                dependValid = value.length >= 1;
                if (fieldValidationErrors.depend = dependValid) {
                    fieldValidationErrors.depend = '';
                    dependValid = true;
                } else {
                    fieldValidationErrors.depend = ' is-invalid';
                    dependValid = false;
                }
                break;
            default:
                break;
        }
        
        this.setState({ formErrors: fieldValidationErrors,
                        taxValid, epfValid, occuValid, grossValid, nettValid, dependValid
                    }, this.validateForm);
    }

    validateForm() {
        this.setState({
            formValid: 
                this.state.taxValid && this.state.epfValid && this.state.occuValid &&
                this.state.grossValid && this.state.nettValid && this.state.dependValid
        });
        console.log(this.state.taxValid, this.state.epfValid, this.state.occuValid, this.state.grossValid, this.state.nettValid, this.state.dependValid);
        console.log('inside validateform: ', this.state.formValid);
    }

    errorClass(error) {
        return (error.length === 0? '' : 'has-error');
    }

    renderErrorText(name, value) {
        this.props.formValidate(this.state.formValid);
        if (this.state.formErrors[name] === ' is-invalid') {
            return (
                <div className ="alert alert-danger">
                    "{value}"{this.state.formErrors[name]}
                </div>
            );
        }
    }

    render() {
        return (
        <form className="workingFormStyle">
            <div className="tax">
                <div className={`form-group ${this.errorClass(this.state.formErrors.tax)}`}>
                <label className="form-label">Income Tax Number</label>
                <input 
                    className={`form-control ${this.state.formErrors.tax}`} 
                    type="number" 
                    name="tax"
                    value={this.props.tax} 
                    placeholder=""
                    onChange={this.handleChange}
                />
                {this.renderErrorText('tax', this.props.tax)}
                </div>
            </div>

            <div className="epf">
                <div className={`form-group ${this.errorClass(this.state.formErrors.epf)}`}>
                <label className="form-label">EPF Number</label>
                <input 
                    className={`form-control ${this.state.formErrors.epf}`} 
                    type="number" 
                    name="epf"
                    value={this.props.epf} 
                    onChange={this.handleChange}
                    placeholder=""
                />
                {this.renderErrorText('epf', this.props.epf)}
                </div>
            </div>

            <div className="occupation">
                <div className={`form-group ${this.errorClass(this.state.formErrors.occu)}`}>
                <label className="form-label">Occupation</label>
                <input 
                    className={`form-control ${this.state.formErrors.occu}`} 
                    type="text" 
                    name="occupation"
                    value={this.props.occupation}
                    onChange={this.handleChange} 
                    placeholder=""
                />
                {this.renderErrorText('occu', this.props.occupation)}
                </div>
            </div>
            <div className="gross">
                <div className={`form-group ${this.errorClass(this.state.formErrors.gross)}`}>
                <label className="form-label">Gross Salary</label>
                <input 
                    className={`form-control ${this.state.formErrors.gross}`} 
                    type="text" 
                    name="gross"
                    value={this.props.gross}
                    onChange={this.handleChange} 
                    placeholder="" 
                />
                {this.renderErrorText('gross', this.props.gross)}
                </div>
                </div>
            <div className="nett">
                <div className={`form-group ${this.errorClass(this.state.formErrors.nett)}`}>
                <label className="form-label">Nett Salary</label>
                <input 
                    className={`form-control ${this.state.formErrors.nett}`} 
                    type="text" 
                    name="nett"
                    value={this.props.nett}
                    onChange={this.handleChange}
                    placeholder="" 
                />
                {this.renderErrorText('nett', this.props.nett)}
                </div>
            </div>

            <div className="depend">
                <div className={`form-group ${this.errorClass(this.state.formErrors.depend)}`}>
                <label className="form-label">Number of Family Dependants</label>
                <input 
                    className={`form-control ${this.state.formErrors.depend}`} 
                    type="number" 
                    name="depend"
                    value={this.props.depend}
                    onChange={this.handleChange}
                    placeholder=""
                />
                {this.renderErrorText('depend', this.props.depend)}
                </div>
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

export default connect(mapStateToProps, { formUpdate, formValidate })(Working);