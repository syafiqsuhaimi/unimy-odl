import React, { Component } from 'react';

function Working() {
    return (
        <form>
            <div className="tax">
                <label className="Form-label">Income Tax Number</label>
                <input 
                    className="Form-input" 
                    type="number" 
                    id="income_tax_number" 
                    placeholder=""
                />
                {/* <div className="Invalid-feedback">
                Please enter a valid name.
                </div> */}
            </div>

            <div className="epf">
                <label className="Form-label">EPF Number</label>
                <input className="Form-input" type="number" id="epf_number" placeholder=""/>
                {/* <div className="Invalid-feedback">
                Please enter a valid name.
                </div> */}
            </div>

            <div className="occupation">
                <label className="Form-label">Occupation</label>
                <input className="Form-input" type="text" id="occupation" placeholder=""/>
                {/* <div className="Invalid-feedback">
                Please enter a valid name.
                </div> */}
            </div>
            <div className="gross">
                <label className="Form-label">Gross Salary</label>
                <input className="Form-input" type="text" style={{width: 105}} id="gross_salary" placeholder="" required/>
                {/* <div className="Invalid-feedback">
                    Valid first name is required.
                </div> */}
                </div>
                <div className="nett">
                <label className="Form-label">Nett Salary</label>
                <input className="Form-input" type="text" style={{width: 105}} id="nett_salary" placeholder="" required/>
                {/* <div className="Invalid-feedback">
                    Valid last name is required.
                </div> */}
            </div>

            <div className="depend">
                <label className="Form-label">Number of Family Dependants</label>
                <input className="Form-input" type="number" id="number_of_family" placeholder=""/>
                {/* <div className="Invalid-feedback">
                Please enter a valid name.
                </div> */}
            </div>
        </form>
    );
}

class KinInfo extends Component {
    constructor(props) {
        super(props);
        this.handleWorkedClick = this.handleWorkedClick.bind(this);
        this.handleNotWorkedClick = this.handleNotWorkedClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            isWorking: false, name: '', relation: '',
            ic: '', nationality: '',
            address: '', postcode: '', state: '',
            phone: '', email: '', tax: ''
        };
    }
    
    handleWorkedClick() {
        this.setState({isWorking: true});
    }

    handleNotWorkedClick() {
        this.setState({isWorking: false});
    }

    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name]: value });
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
                <form className="kinFormStyle">
                <div className="name">
                    <label className="Form-label">Kin Full Name (As per IC)</label>
                    <input 
                        className="Form-input" 
                        type="text" 
                        id="kin_name" 
                        placeholder=""
                        name="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                    {/* <div className="Invalid-feedback">
                    Please enter a valid name.
                    </div> */}
                </div>

                <div className="relation">
                    <label className="Form-label">Relationship with Applicant</label>
                    <input 
                        className="Form-input" 
                        type="text" 
                        id="kin_relationship" 
                        placeholder=""
                        name="relation"
                        value={this.state.relation}
                        onChange={this.handleChange}
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
                        id="kin_nationality" 
                        placeholder=""
                        name="nationality"
                        value={this.state.nationality}
                        onChange={this.handleChange}
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
                        id="kin_ic_number" 
                        placeholder=""
                        name="ic"
                        value={this.state.ic}
                        onChange={this.handleChange}
                    />
                    {/* <div className="Invalid-feedback">
                    Please enter a valid name.
                    </div> */}
                </div>

                <div className="address">
                    <label className="Form-label">Permanent Address</label>
                    <input 
                        className="Form-input" 
                        type="text" 
                        id="address" 
                        placeholder=""
                        name="address"
                        value={this.state.address}
                        onChange={this.handleChange}
                    />
                    {/* <div className="Invalid-feedback">
                    Please enter a valid name.
                    </div> */}
                </div>

                <div className="postcode">
                    <label className="Form-label">Postcode</label>
                    <input 
                        className="Form-input" 
                        type="number" 
                        id="postcode" 
                        placeholder="" 
                        required
                        name="postcode"
                        value={this.state.postcode}
                        onChange={this.handleChange}
                    />
                    {/* <div className="Invalid-feedback">
                        Valid first name is required.
                    </div> */}
                </div>
                <div className="state">
                    <label className="Form-label">State</label>
                    <select 
                        className="Form-input" 
                        style={{ height: 27 }} 
                        id="state" 
                        required
                        name="state"
                        onChange={this.handleChange}
                    >
                        <option value="">Choose...</option>
                        <option value="Kuala Lumpur">WP Kuala Lumpur</option>
                        <option value="Putrajaya">WP Putrajaya</option>
                        <option value="Labuan">WP Labuan</ option>
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
                        id="phone_number" 
                        placeholder=""
                        name="phone"
                        value={this.state.phone}
                        onChange={this.handleChange}
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
                        id="email" 
                        placeholder="you@example.com"
                        name="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    {/* <div className="Invalid-feedback">
                    Please enter a valid name.
                    </div> */}
                </div>

                <div className="work">
                    <label className="Form-label">Currently working?</label>
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

export default KinInfo;