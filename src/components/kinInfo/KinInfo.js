import React, { Component } from 'react';
import Working from '../common/Working';

class KinInfo extends Component {
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
                <form className="kinFormStyle">
                <div className="name">
                    <label className="Form-label">Kin Full Name (As per IC)</label>
                    <input className="Form-input" type="text" id="kin_name" placeholder=""/>
                    {/* <div className="Invalid-feedback">
                    Please enter a valid name.
                    </div> */}
                </div>

                <div className="relation">
                    <label className="Form-label">Relationship with Applicant</label>
                    <input className="Form-input" type="text" id="kin_relationship" placeholder=""/>
                    {/* <div className="Invalid-feedback">
                    Please enter a valid name.
                    </div> */}
                </div>

                <div className="nationality">
                    <label className="Form-label">Nationality</label>
                    <input className="Form-input" type="text" id="kin_nationality" placeholder=""/>
                    {/* <div className="Invalid-feedback">
                    Please enter a valid name.
                    </div> */}
                </div>

                <div className="ic">
                    <label className="Form-label">IC Number</label>
                    <input className="Form-input" type="number" id="kin_ic_number" placeholder=""/>
                    {/* <div className="Invalid-feedback">
                    Please enter a valid name.
                    </div> */}
                </div>

                <div className="address">
                    <label className="Form-label">Permanent Address</label>
                    <input className="Form-input" type="text" id="address" placeholder=""/>
                    {/* <div className="Invalid-feedback">
                    Please enter a valid name.
                    </div> */}
                </div>

                <div className="postcode">
                    <label className="Form-label">Postcode</label>
                    <input className="Form-input" type="number" id="postcode" placeholder="" required/>
                    {/* <div className="Invalid-feedback">
                        Valid first name is required.
                    </div> */}
                </div>
                <div className="state">
                    <label className="Form-label">State</label>
                    <select className="Form-input" style={{ height: 27 }} id="state" required>
                        <option value="">Choose...</option>
                        <option>WP Kuala Lumpur</option>
                        <option>WP Putrajaya</option>
                        <option>WP Labuan</option>
                        <option>Kedah</option>
                        <option>Perlis</option>
                        <option>Pulau Pinang</option>
                        <option>Kelantan</option>
                        <option>Perak</option>
                        <option>Terengganu</option>
                        <option>Pahang</option>
                        <option>Selangor</option>
                        <option>Melaka</option>
                        <option>Negeri Sembilan</option>
                        <option>Johor</option>
                        <option>Sabah</option>
                        <option>Sarawak</option>
                    </select>
                    {/* <div className="Invalid-feedback">
                        Valid last name is required.
                    </div> */}
                </div>
                <div className="phone">
                    <label className="Form-label">Phone Number</label>
                    <input className="Form-input" type="number" id="phone_number" placeholder=""/>
                    {/* <div className="Invalid-feedback">
                    Please enter a valid name.
                    </div> */}
                </div>

                <div className="email">
                    <label className="Form-label">Email Address</label>
                    <input className="Form-input" type="email" id="email" placeholder="you@example.com"/>
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
                {workingForm}
                </form>
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