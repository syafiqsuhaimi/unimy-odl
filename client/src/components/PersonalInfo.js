import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formUpdate } from '../actions';
import Working from './Working';
import { FormErrors } from './FormErrors';

class PersonalInfo extends Component {
    constructor(props) {
        super(props);
        this.handleWorkedClick = this.handleWorkedClick.bind(this);
        this.handleNotWorkedClick = this.handleNotWorkedClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            isWorking: false,
            formErrors: { 
                name: '', ic: ''
            },
            nameValid: false,
            icValid: false,
            formValid: false
        };
    }
    
    handleWorkedClick() {
        this.setState({isWorking: true});
    }
    
    handleNotWorkedClick() {
        this.setState({isWorking: false});
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.props.formUpdate({ prop: name , value });

        this.validateField(name, value);
    }
    
    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let nameValid = this.state.nameValid;
        let icValid = this.state.icValid;
        console.log('inside: ' + this.state.formErrors.name);

        switch (fieldName) {
            case 'name':
                nameValid = value.length >= 6;
                fieldValidationErrors.name = nameValid? '' : ' is-invalid';
                break;
            case 'ic':
                icValid = value.match(/([0-9]{6})([-])([0-9]{2})([-])([0-9]{4})/);
                fieldValidationErrors.ic = icValid? '' : ' is-invalid';
                break;
            default: 
                break;
        }

        this.setState({ formErrors: fieldValidationErrors,
                    nameValid: nameValid,
                    icValid: icValid
                }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.nameValid && this.state.icValid });
    }

    errorClass(error) {
        return (error.length === 0? '' : 'has-error');
    }

    renderErrorText(name, value) {
        console.log(name, value);
        console.log(this.state.formErrors[name]);
        if (this.state.formErrors[name] > 0) {
            return (
                <div>
                    {value}{this.state.formErrors}
                </div>
            );
        }
        return;
    }

    render() {
        const isWorking = this.state.isWorking;
        
        let workingForm = null;
        if (isWorking) {
            workingForm = <Working />;  
        } else {
            workingForm = null;
        }

        return (
            <div className="App-body">
            <form className="personalFormStyle">

                <div className="name">
                    <div className={`form-group ${this.errorClass(this.state.formErrors.name)}`}>
                    <label className="form-label">Full Name (As per IC)</label>
                    <input 
                        className={`form-control ${this.state.formErrors.name}`} 
                        type="text" 
                        value={this.props.name} 
                        name="name"
                        placeholder=""
                        onChange={this.handleChange} 
                    />
                    {this.renderErrorText('name',this.props.name)}
                    </div>
                    {/* <div className="Invalid-feedback">
                    Please enter a valid name.
                    </div> */}
                </div>

                <div className="ic">
                <div className={`form-group ${this.errorClass(this.state.formErrors.ic)}`}>
                    <label className="form-label">IC Number</label>
                    <input 
                        className="form-control" 
                        type="number" 
                        value={this.props.ic} 
                        name="ic"
                        placeholder="i.e: xxxxxx-xx-xxxx"
                        onChange={this.handleChange}
                    />
                </div>
                    {/* <div className="Invalid-feedback">
                    Please enter a valid name.
                    </div> */}
                </div>
                <div className="nationality">
                    <label className="form-label">Nationality</label>
                    <input 
                        className="form-control" 
                        type="text" 
                        value={this.props.nationality} 
                        name="nationality"
                        placeholder=""
                        onChange={this.handleChange}
                    />
                    {/* <div className="Invalid-feedback">
                    Please enter a valid name.
                    </div> */}
                </div>
                <div className="dob">
                    <label className="form-label">Date of Birth</label>
                    <input 
                        className="form-control" 
                        type="text" 
                        placeholder=""
                        name="dob"
                        value={this.props.dob}
                        onChange={this.handleChange}   
                    />
                    {/* <div className="Invalid-feedback">
                        Valid first name is required.
                    </div> */}
                </div>
                <div className="gender">
                    <label className="form-label">Gender</label>
                    <select 
                        className="form-control" 
                        style={{ height: 27 }}
                        name="gender"
                        onChange={this.handleChange} 
                        required
                    >
                        <option value="">Choose...</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    {/* <div className="Invalid-feedback">
                        Valid last name is required.
                    </div> */}
                </div>
                <div className="address">
                    <label className="form-label">Permanent Address</label>
                    <input 
                        className="form-control" 
                        type="text" 
                        value={this.props.address}
                        name="address"
                        onChange={this.handleChange} 
                        placeholder=""/>
                    {/* <div className="Invalid-feedback">
                    Please enter a valid name.
                    </div> */}
                </div>
                <div className="postcode">
                    <label className="form-label">Postcode</label>
                    <input 
                        className="form-control" 
                        type="number" 
                        value={this.props.postcode}
                        name="postcode"
                        onChange={this.handleChange} 
                        placeholder="" 
                        required/>
                    {/* <div className="Invalid-feedback">
                        Valid first name is required.
                    </div> */}
                </div>
                <div className="state">
                    <label className="form-label">State</label>
                    <select 
                        className="form-control" 
                        style={{ height: 27 }} 
                        value={this.props.negeri}
                        name="state"
                        onChange={this.handleChange} 
                        required
                    >
                        <option value="">Choose...</option>
                        <option value="Kuala Lumpur">WP Kuala Lumpur</option>
                        <option value="Putrajaya">WP Putrajaya</option>
                        <option value="Labuan">WP Labuan</option>
                        <option value="Kedah">Kedah</option>
                        <option value="Perlis">Perlis</option>
                        <option value="Pulau Pinang">Pulau Pinang</option>
                        <option value="Kelantan">Kelantan</option>
                        <option value="Perak">Perak</option>
                        <option value="Terengganu">Terengganu</option>
                        <option value="Pahang">Pahang</option>
                        <option value="Selangor">Selangor</option>
                        <option value="Melaka">Melaka</option>
                        <option value="Negeri Sembilan">Negeri Sembilan</option>
                        <option value="Johor">Johor</option>
                        <option value="Sabah">Sabah</option>
                        <option value="Sarawak">Sarawak</option>
                    </select>
                    {/* <div className="Invalid-feedback">
                        Valid last name is required.
                    </div> */}
                </div>
                <div className="phone">
                    <label className="form-label">Phone Number</label>
                    <input 
                        className="form-control" 
                        type="number" 
                        value={this.props.phone}
                        name="phone"
                        onChange={this.handleChange} 
                        placeholder=""
                    />
                    {/* <div className="Invalid-feedback">
                    Please enter a valid name.
                    </div> */}
                </div>

                <div className="email">
                    <label className="form-label">Email Address</label>
                    <input 
                        className="form-control" 
                        type="email" 
                        value={this.props.email}
                        name="email"
                        onChange={this.handleChange} 
                        placeholder="you@example.com"
                    />
                    {/* <div className="Invalid-feedback">
                    Please enter a valid name.
                    </div> */}
                </div>

                <div className="work">
                    <label className="form-label">Are you currently working?</label>
                    <div className="Button-row-col">
                        <button onClick={this.handleWorkedClick} className="Form-button">Yes</button>
                        <button onClick={this.handleNotWorkedClick} className="Form-button">No</button>
                    </div>
                </div>
            </form>
            {workingForm}

               
            <div className="App-progress-bar">
                <div className="Section">
                    <h5 className="Section-title">
                    Personal Information
                    </h5>
                    <p className="Section-description">
                    Tell us your basic information to help us proceed your application.
                    </p>
                </div>

                <div className="Section">
                    <h5 className="Section-title">
                    Next of Kin Information
                    </h5>
                    <p className="Section-description">
                    If you are a working applicant, you can skip this.
                    </p>
                </div>

                <div className="Section">
                    <h5 className="Section-title">
                    Documents Upload
                    </h5>
                    <p className="Section-description">
                    Please provide us with the required documents to process your application.
                    </p>
                </div>

            </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { 
        name, ic, nationality,
        dob, gender, address,
        postcode, negeri, phone,
        email
    } = state.form;

    return { 
        name, ic, nationality,
        dob, gender, address,
        postcode, negeri, phone, email
    };
}

export default connect(mapStateToProps, { formUpdate })(PersonalInfo);
