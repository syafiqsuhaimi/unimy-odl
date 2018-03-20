import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formUpdate, formValidate } from '../actions';

class KinWorking extends Component {      
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.renderErrorText = this.renderErrorText.bind(this);
        this.state = {
            formErrors: {
                kintax: '', kinepf: '', kinoccu: '', kingross: '',
                kinnett: '', kindepend: ''
            },
            kintaxValid: false,
            kinepfValid: false,
            kinoccuValid: false,
            kingrossValid: false,
            kinnettValid: false,
            kindependValid: false,
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
        let kintaxValid = this.state.kintaxValid;
        let kinepfValid = this.state.kinepfValid;
        let kinoccuValid = this.state.kinoccuValid;
        let kingrossValid = this.state.kingrossValid;
        let kinnettValid = this.state.kinnettValid;
        let kindependValid = this.state.kindependValid;

        switch (fieldName) {
            case 'kintax':
                kintaxValid = value.length === 8;
                if (fieldValidationErrors.kintax = kintaxValid) {
                    fieldValidationErrors.kintax = '';
                    kintaxValid = true;
                } else {
                    fieldValidationErrors.kintax = ' is-invalid';
                    kintaxValid = false;
                }
                break;
            case 'kinepf':
                kinepfValid = value.length === 8;
                if (fieldValidationErrors.kinepf = kinepfValid) {
                    fieldValidationErrors.kinepf = '';
                    kinepfValid = true;
                } else {
                    fieldValidationErrors.kinepf = ' is-invalid';
                    kinepfValid = false;
                }
                break;
            case 'kinoccu':
                kinoccuValid = value.length >= 2;
                if (fieldValidationErrors.kinoccu = kinoccuValid) {
                    fieldValidationErrors.kinoccu = '';
                    kinoccuValid = true;
                } else {
                    fieldValidationErrors.kinoccu = ' is-invalid';
                    kinoccuValid = false;
                }
                break;
            case 'kingross':
                kingrossValid = value.length >= 3;
                if (fieldValidationErrors.kingross = kingrossValid) {
                    fieldValidationErrors.kingross = '';
                    kingrossValid = true;
                } else {
                    fieldValidationErrors.kingross = ' is-invalid';
                    kingrossValid = false;
                }
                break;
            case 'kinnett':
                kinnettValid = value.length >= 3;
                if (fieldValidationErrors.kinnett = kinnettValid) {
                    fieldValidationErrors.kinnett = '';
                    kinnettValid = true;
                } else {
                    fieldValidationErrors.kinnett = ' is-invalid';
                    kinnettValid = false;
                }
                break;
            case 'kindepend':
                kindependValid = value.length >= 1;
                if (fieldValidationErrors.kindepend = kindependValid) {
                    fieldValidationErrors.kindepend = '';
                    kindependValid = true;
                } else {
                    fieldValidationErrors.kindepend = ' is-invalid';
                    kindependValid = false;
                }
                break;
            default:
                break;
        }
        
        this.setState({ formErrors: fieldValidationErrors,
                        kintaxValid, kinepfValid, kinoccuValid, kingrossValid, kinnettValid, kindependValid
                    }, this.validateForm);
    }

    validateForm() {
        const { 
            kintaxValid, kinepfValid, kinoccuValid, kingrossValid,
            kinnettValid, kindependValid, formValid
        } = this.state;

        this.setState({
            formValid: 
                kintaxValid && kinepfValid && kinoccuValid &&
                kingrossValid && kinnettValid && kindependValid
        });
        console.log(kintaxValid, kinepfValid, kinoccuValid, kingrossValid, kinnettValid, kindependValid);
        console.log(formValid);
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
                <div className={`form-group ${this.errorClass(this.state.formErrors.kintax)}`}>
                <label className="form-label">Income Tax Number</label>
                <input 
                    className={`form-control ${this.state.formErrors.kintax}`} 
                    type="number" 
                    name="kintax"
                    value={this.props.kintax} 
                    placeholder=""
                    onChange={this.handleChange}
                />
                {this.renderErrorText('kintax', this.props.kintax)}
                </div>
            </div>

            <div className="epf">
                <div className={`form-group ${this.errorClass(this.state.formErrors.kinepf)}`}>
                <label className="form-label">EPF Number</label>
                <input 
                    className={`form-control ${this.state.formErrors.kinepf}`} 
                    type="number" 
                    name="kinepf"
                    value={this.props.kinepf} 
                    onChange={this.handleChange}
                    placeholder=""
                />
                {this.renderErrorText('kinepf', this.props.kinepf)}
                </div>
            </div>

            <div className="occupation">
                <div className={`form-group ${this.errorClass(this.state.formErrors.kinoccu)}`}>
                <label className="form-label">Occupation</label>
                <input 
                    className={`form-control ${this.state.formErrors.kinoccu}`} 
                    type="text" 
                    name="kinoccu"
                    value={this.props.kinoccu}
                    onChange={this.handleChange} 
                    placeholder=""
                    maxLength="50"
                />
                {this.renderErrorText('kinoccu', this.props.kinoccupation)}
                </div>
            </div>
            <div className="gross">
                <div className={`form-group ${this.errorClass(this.state.formErrors.kingross)}`}>
                <label className="form-label">Gross Salary</label>
                <input 
                    className={`form-control ${this.state.formErrors.kingross}`} 
                    type="number" 
                    name="kingross"
                    value={this.props.kingross}
                    onChange={this.handleChange} 
                    placeholder="" 
                />
                {this.renderErrorText('kingross', this.props.kingross)}
                </div>
                </div>
            <div className="nett">
                <div className={`form-group ${this.errorClass(this.state.formErrors.kinnett)}`}>
                <label className="form-label">Nett Salary</label>
                <input 
                    className={`form-control ${this.state.formErrors.kinnett}`} 
                    type="number" 
                    name="kinnett"
                    value={this.props.kinnett}
                    onChange={this.handleChange}
                    placeholder="" 
                />
                {this.renderErrorText('kinnett', this.props.kinnett)}
                </div>
            </div>

            <div className="depend">
                <div className={`form-group ${this.errorClass(this.state.formErrors.kindepend)}`}>
                <label className="form-label">Number of Family Dependants</label>
                <input 
                    className={`form-control ${this.state.formErrors.kindepend}`} 
                    type="number" 
                    name="kindepend"
                    value={this.props.kindepend}
                    onChange={this.handleChange}
                    placeholder=""
                />
                {this.renderErrorText('kindepend', this.props.kindepend)}
                </div>
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

export default connect(mapStateToProps, { formUpdate, formValidate })(KinWorking);