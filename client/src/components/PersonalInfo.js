import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formUpdate } from '../actions';
import Working from './Working';

class PersonalInfo extends Component {
    constructor(props) {
        super(props);
        this.handleWorkedClick = this.handleWorkedClick.bind(this);
        this.handleNotWorkedClick = this.handleNotWorkedClick.bind(this);
        this.state = {isWorking: false};
    }
    
    handleWorkedClick() {
        this.setState({isWorking: true});
    }
    
    handleNotWorkedClick() {
        this.setState({isWorking: false});
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
                    <label className="Form-label">Full Name (As per IC)</label>
                    <input 
                        className="Form-input" 
                        type="text" 
                        value={this.props.name} 
                        placeholder=""
                        onChange={event => this.props.formUpdate({ prop: 'name', value: event.target.value })}    
                    />
                    {/* <div className="Invalid-feedback">
                    Please enter a valid name.
                    </div> */}
                </div>

                <div className="ic">
                    <label className="Form-label">IC Number</label>
                    <input 
                        className="Form-input" 
                        type="number" 
                        value={this.props.ic} 
                        placeholder=""
                        onChange={event => this.props.formUpdate({ prop: 'ic', value: event.target.value })}
                    />
                    {/* <div className="Invalid-feedback">
                    Please enter a valid name.
                    </div> */}
                </div>
                <div className="nationality">
                    <label className="Form-label">Nationality</label>
                    <input 
                        className="Form-input" 
                        type="text" 
                        value={this.props.nationality} 
                        placeholder=""
                        onChange={event => this.props.formUpdate({ prop: 'nationality', value: event.target.value })}
                    />
                    {/* <div className="Invalid-feedback">
                    Please enter a valid name.
                    </div> */}
                </div>
                <div className="dob">
                    <label className="Form-label">Date of Birth</label>
                    <input 
                        className="Form-input" 
                        type="date" 
                        placeholder=""
                        value={this.props.dob}
                        onChange={event => this.props.formUpdate({ prop: 'dob', value: event.target.value })}   
                    />
                    {/* <div className="Invalid-feedback">
                        Valid first name is required.
                    </div> */}
                </div>
                <div className="gender">
                    <label className="Form-label">Gender</label>
                    <select 
                        className="Form-label" 
                        style={{ height: 27 }}
                        onChange={event => this.props.formUpdate({ prop: 'gender', value: event.target.value })} 
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
                    <label className="Form-label">Permanent Address</label>
                    <input 
                        className="Form-input" 
                        type="text" 
                        value={this.props.address}
                        onChange={event => this.props.formUpdate({ prop: 'address', value: event.target.value })} 
                        placeholder=""/>
                    {/* <div className="Invalid-feedback">
                    Please enter a valid name.
                    </div> */}
                </div>
                <div className="postcode">
                    <label className="Form-label">Postcode</label>
                    <input 
                        className="Form-input" 
                        type="number" 
                        value={this.props.postcode}
                        onChange={event => this.props.formUpdate({ prop: 'postcode', value: event.target.value })} 
                        placeholder="" 
                        required/>
                    {/* <div className="Invalid-feedback">
                        Valid first name is required.
                    </div> */}
                </div>
                <div className="state">
                    <label className="Form-label">State</label>
                    <select 
                        className="Form-input" 
                        style={{ height: 27 }} 
                        value={this.props.negeri}
                        onChange={event => this.props.formUpdate({ prop: 'negeri', value: event.target.value })} 
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
                    <label className="Form-label">Phone Number</label>
                    <input 
                        className="Form-input" 
                        type="number" 
                        value={this.props.phone}
                        onChange={event => this.props.formUpdate({ prop: 'phone', value: event.target.value })} 
                        placeholder=""
                    />
                    {/* <div className="Invalid-feedback">
                    Please enter a valid name.
                    </div> */}
                </div>

                <div className="email">
                    <label className="Form-label">Email Address</label>
                    <input 
                        className="Form-input" 
                        type="email" 
                        value={this.props.email}
                        onChange={event => this.props.formUpdate({ prop: 'email', value: event.target.value })} 
                        placeholder="you@example.com"
                    />
                    {/* <div className="Invalid-feedback">
                    Please enter a valid name.
                    </div> */}
                </div>

                <div className="work">
                    <label className="Form-label">Are you currently working?</label>
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
