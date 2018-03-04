import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formUpdate } from '../actions';
import KinWorking from './KinWorking';

class KinInfo extends Component {
    constructor(props) {
        super(props);
        this.handleWorkedClick = this.handleWorkedClick.bind(this);
        //this.handleNotWorkedClick = this.handleNotWorkedClick.bind(this);
        this.state = {isWorking: false};
    }
    
    handleWorkedClick() {
        this.setState({isWorking: true});
    }
    /*
    handleNotWorkedClick() {
        this.setState({isWorking: false});
    }
    */
    render() {
        const isWorking = this.state.isWorking;
        
        let workingForm = null;
        if (isWorking) {
            workingForm = <KinWorking />;  
        } else {
            workingForm = null;
        }

        return (
            <div className="App-body">
                <form className="kinFormStyle">
                <div className="name">
                    <label className="form-label">Kin Full Name (As per IC)</label>
                    <input 
                            className="form-control" 
                            type="text" 
                            value={this.props.kinname}
                            onChange={event => this.props.formUpdate({ prop: 'kinname', value: event.target.value })}
                            placeholder=""
                    />
                    {/* <div className="Invalid-feedback">
                    Please enter a valid name.
                    </div> */}
                </div>

                <div className="relation">
                    <label className="form-label">Relationship with Applicant</label>
                    <input 
                        className="form-control" 
                        type="text" 
                        value={this.props.relation}
                        onChange={event => this.props.formUpdate({ prop: 'relation', value: event.target.value })}
                        placeholder=""
                    />
                    {/* <div className="Invalid-feedback">
                    Please enter a valid name.
                    </div> */}
                </div>

                <div className="nationality">
                    <label className="form-label">Nationality</label>
                    <input 
                        className="form-control" 
                        type="text" 
                        value={this.props.kinnat}
                        onChange={event => this.props.formUpdate({ prop: 'kinnat', value: event.target.value })}
                        placeholder=""
                    />
                    {/* <div className="Invalid-feedback">
                    Please enter a valid name.
                    </div> */}
                </div>

                <div className="ic">
                    <label className="form-label">IC Number</label>
                    <input 
                        className="form-control" 
                        type="number" 
                        value={this.props.kinic}
                        onChange={event => this.props.formUpdate({ prop: 'kinic', value: event.target.value })}
                        placeholder=""
                    />
                    {/* <div className="Invalid-feedback">
                    Please enter a valid name.
                    </div> */}
                </div>

                <div className="address">
                    <label className="form-label">Permanent Address</label>
                    <input 
                        className="form-control" 
                        type="text" 
                        value={this.props.kinadd}
                        onChange={event => this.props.formUpdate({ prop: 'kinadd', value: event.target.value })}
                        placeholder=""
                    />
                    {/* <div className="Invalid-feedback">
                    Please enter a valid name.
                    </div> */}
                </div>

                <div className="postcode">
                    <label className="form-label">Postcode</label>
                    <input 
                        className="form-control" 
                        type="number" 
                        value={this.props.kinpost}
                        onChange={event => this.props.formUpdate({ prop: 'kinpost', value: event.target.value })}
                        placeholder="" 
                        required
                    />
                    {/* <div className="Invalid-feedback">
                        Valid first name is required.
                    </div> */}
                </div>
                <div className="state">
                    <label className="form-label">State</label>
                    <select 
                        className="form-control" 
                        style={{ height: 27 }} 
                        value={this.props.kinstate}
                        onChange={event => this.props.formUpdate({ prop: 'kinstate', value: event.target.value })}
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
                        value={this.props.kinphone}
                        onChange={event => this.props.formUpdate({ prop: 'kinphone', value: event.target.value })}
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
                        value={this.props.kinmail}
                        onChange={event => this.props.formUpdate({ prop: 'kinmail', value: event.target.value })}
                        placeholder="you@example.com"
                    />
                    {/* <div className="Invalid-feedback">
                    Please enter a valid name.
                    </div> */}
                </div>

                <div className="work">
                    <label className="form-label">Currently working?</label>
                    <div className="Button-row-col">
                        <button onClick={this.handleWorkedClick} className="Form-button">Yes</button>
                        <button className="Form-button">No</button>
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
        kinname, relation, kinnat,
        kinic, kinadd, kinpost, 
        kinstate, kinphone, kinmail
    } = state.form;

    return {
        kinname, relation, kinnat,
        kinic, kinadd, kinpost, 
        kinstate, kinphone, kinmail
    };
}

export default connect(mapStateToProps, { formUpdate })(KinInfo);