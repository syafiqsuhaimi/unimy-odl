import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formUpdate, formValidate } from '../actions';
import KinWorking from './KinWorking';

class KinInfo extends Component {
    constructor(props) {
        super(props);
        this.handleWorkedClick = this.handleWorkedClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleNotWorkedClick = this.handleNotWorkedClick.bind(this);
        this.state = {
            isWorking: false,
            formErrors: {
                kinname: '', kinic: '', kinpost: '', kinphone: '', kinmail: '', kinwork: ''
            },
            kinnameValid: false,
            kinicValid: false,
            kinpostValid: false,
            kinphoneValid: false,
            kinmailValid: false,
            kinworkValid: false,
            formValid: false
        };
    }
    
    handleWorkedClick() {
        this.setState({ isWorking: true });
    }
    
    handleNotWorkedClick() {
        this.setState({isWorking: false, kinworkValid: true });
        this.validateField('kinwork', 'click');
    }

   handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.props.formUpdate({ prop: name, value });

    this.validateField(name, value);
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let kinnameValid = this.state.kinnameValid;
        let kinicValid = this.state.kinicValid;
        let kinpostValid = this.state.kinpostValid;
        let kinphoneValid = this.state.kinphoneValid;
        let kinmailValid = this.state.kinmailValid;
        let kinworkValid = this.state.kinworkValid;

        switch (fieldName) {
            case 'kinname':
                kinnameValid = value.length >= 3 && value.match(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'@-]+$/u);
                if (fieldValidationErrors.kinname = kinnameValid) {
                    fieldValidationErrors.kinname = '';
                    kinnameValid = true;
                } else {
                    fieldValidationErrors.kinname = ' is-invalid';
                    kinnameValid = false;
                }
                break;
            case 'kinic':
                kinicValid = value.length === 12;
                if (fieldValidationErrors.kinic = kinicValid) {
                    fieldValidationErrors.kinic = '';
                    kinicValid = true;
                } else {
                    fieldValidationErrors.kinic = ' is-invalid';
                    kinicValid = false;
                }
                break;
            case 'kinpost':
                kinpostValid = value.length === 5;
                if (fieldValidationErrors.kinpost = kinpostValid) {
                    fieldValidationErrors.kinpost = '';
                    kinpostValid = true;
                } else {
                    fieldValidationErrors.kinpost = ' is-invalid';
                    kinpostValid = false;
                }
                break;
            case 'kinphone':
                kinphoneValid = value.length >= 10;
                if (fieldValidationErrors.kinphone = kinphoneValid) {
                    fieldValidationErrors.kinphone = '';
                    kinphoneValid = true;
                } else {
                    fieldValidationErrors.kinphone = ' is-invalid';
                    kinphoneValid = false;
                }
                break;
            case 'kinmail':
                kinmailValid = value.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
                if (fieldValidationErrors.kinmail = kinmailValid) {
                    fieldValidationErrors.kinmail = '';
                    kinmailValid = true;
                } else {
                    fieldValidationErrors.kinmail = ' is-invalid';
                    kinmailValid = false;
                }
                break;
            case 'kinwork':
                kinworkValid = value.length > 0;
                if (fieldValidationErrors.kinwork = kinworkValid) {
                    fieldValidationErrors.kinwork = '';
                    kinworkValid = true;
                } else {
                    fieldValidationErrors.kinwork = 
                    kinworkValid = false;
                }
                break;
            default:
                break;
        }

        this.setState({ formErrors: fieldValidationErrors,
                                    kinnameValid,
                                    kinicValid,
                                    kinpostValid,
                                    kinphoneValid,
                                    kinmailValid, 
                                    kinworkValid
                    }, this.validateForm);
    }

    validateForm() {
        const { 
            kinnameValid, kinicValid, kinpostValid,
            kinphoneValid, kinmailValid, formValid, kinworkValid
        } = this.state;

        this.setState({
            formValid: kinnameValid && kinicValid && kinpostValid &&
            kinphoneValid && kinmailValid && kinworkValid
        })
    }

    errorClass(error) {
        return (error.length === 0? '' : 'has-error');
    }

    renderErrorText(name, value) {
        this.props.formValidate(this.state.formValid);
        if (this.state.formErrors[name] === ' is-invalid') {
            return (
                <div className="alert alert-danger">
                    "{value}"{this.state.formErrors[name]}
                </div>
            );
        }
        return;
    }

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
                <div className="test">
                <form className="kinFormStyle">
                <div className="name">
                    <div className={`form-group ${this.errorClass(this.state.formErrors.kinname)}`}>
                    <label className="form-label">Kin Full Name (As per IC)</label>
                    <input 
                            className={`form-control ${this.state.formErrors.kinname}`}
                            type="text" 
                            value={this.props.kinname}
                            name="kinname"
                            onChange={this.handleChange}
                            placeholder=""
                            maxLength="50"
                    />
                    {/* <div className="Invalid-feedback">
                    Please enter a valid name.
                    </div> */}
                    {this.renderErrorText('kinname', this.props.kinname)}
                    </div>
                </div>

                <div className="relation">
                    <label className="form-label">Relationship with Applicant</label>
                    <select 
                        className="form-control" 
                        value={this.props.relation}
                        name="relation"
                        onChange={this.handleChange}
                        placeholder=""
                        maxLength="15"
                        required
                    >
                        <option value="">-- select one --</option>
                        <option value="Mother">Mother</option>
                        <option value="Father">Father</option>
                        <option value="Brother">Brother</option>
                        <option value="Sister">Sister</option>
                        <option value="Spouse">Spouse</option>
                        <option value="Grandfather">Grandfather</option>
                        <option value="Grandmother">Grandmother</option>
                        <option value="Uncle">Uncle</option>
                        <option value="Aunty">Aunty</option>
                        <option value="Cousin">Cousin</option>
                    </select>
                    {/* <div className="Invalid-feedback">
                    Please enter a valid name.
                    </div> */}
                </div>

                <div className="nationality">
                    <label className="form-label">Nationality</label>
                    <select
                        className="form-control" 
                        value={this.props.kinnat} 
                        name="kinnat"
                        placeholder=""
                        onChange={this.handleChange}
                        required
                    >
                        <option value="">-- select one --</option>
                        <option value="Afghan">Afghan</option>
                        <option value="Albanian">Albanian</option>
                        <option value="Algerian">Algerian</option>
                        <option value="American">American</option>
                        <option value="Andorran">Andorran</option>
                        <option value="Angolan">Angolan</option>
                        <option value="Antiguans">Antiguans</option>
                        <option value="Argentinean">Argentinean</option>
                        <option value="Armenian">Armenian</option>
                        <option value="Australian">Australian</option>
                        <option value="Austrian">Austrian</option>
                        <option value="Azerbaijani">Azerbaijani</option>
                        <option value="Bahamian">Bahamian</option>
                        <option value="Bahraini">Bahraini</option>
                        <option value="Bangladeshi">Bangladeshi</option>
                        <option value="Barbadian">Barbadian</option>
                        <option value="Barbudans">Barbudans</option>
                        <option value="Batswana">Batswana</option>
                        <option value="Belarusian">Belarusian</option>
                        <option value="Belgian">Belgian</option>
                        <option value="Belizean">Belizean</option>
                        <option value="Beninese">Beninese</option>
                        <option value="Bhutanese">Bhutanese</option>
                        <option value="Bolivian">Bolivian</option>
                        <option value="Bosnian">Bosnian</option>
                        <option value="Brazilian">Brazilian</option>
                        <option value="British">British</option>
                        <option value="Bruneian">Bruneian</option>
                        <option value="Bulgarian">Bulgarian</option>
                        <option value="Burkinabe">Burkinabe</option>
                        <option value="Burmese">Burmese</option>
                        <option value="Burundian">Burundian</option>
                        <option value="Cambodian">Cambodian</option>
                        <option value="Cameroonian">Cameroonian</option>
                        <option value="Canadian">Canadian</option>
                        <option value="Cape verdean">Cape Verdean</option>
                        <option value="Central african">Central African</option>
                        <option value="Chadian">Chadian</option>
                        <option value="Chilean">Chilean</option>
                        <option value="Chinese">Chinese</option>
                        <option value="Colombian">Colombian</option>
                        <option value="Comoran">Comoran</option>
                        <option value="Congolese">Congolese</option>
                        <option value="Costa rican">Costa Rican</option>
                        <option value="Croatian">Croatian</option>
                        <option value="Cuban">Cuban</option>
                        <option value="Cypriot">Cypriot</option>
                        <option value="Czech">Czech</option>
                        <option value="Danish">Danish</option>
                        <option value="Djibouti">Djibouti</option>
                        <option value="Dominican">Dominican</option>
                        <option value="Dutch">Dutch</option>
                        <option value="East timorese">East Timorese</option>
                        <option value="Ecuadorean">Ecuadorean</option>
                        <option value="Egyptian">Egyptian</option>
                        <option value="Emirian">Emirian</option>
                        <option value="Equatorial guinean">Equatorial Guinean</option>
                        <option value="Eritrean">Eritrean</option>
                        <option value="Estonian">Estonian</option>
                        <option value="Ethiopian">Ethiopian</option>
                        <option value="Fijian">Fijian</option>
                        <option value="Filipino">Filipino</option>
                        <option value="Finnish">Finnish</option>
                        <option value="French">French</option>
                        <option value="Gabonese">Gabonese</option>
                        <option value="Gambian">Gambian</option>
                        <option value="Georgian">Georgian</option>
                        <option value="German">German</option>
                        <option value="Ghanaian">Ghanaian</option>
                        <option value="Greek">Greek</option>
                        <option value="Grenadian">Grenadian</option>
                        <option value="Guatemalan">Guatemalan</option>
                        <option value="Guinea-bissauan">Guinea-Bissauan</option>
                        <option value="Guinean">Guinean</option>
                        <option value="Guyanese">Guyanese</option>
                        <option value="Haitian">Haitian</option>
                        <option value="Herzegovinian">Herzegovinian</option>
                        <option value="Honduran">Honduran</option>
                        <option value="Hungarian">Hungarian</option>
                        <option value="Icelander">Icelander</option>
                        <option value="Indian">Indian</option>
                        <option value="Indonesian">Indonesian</option>
                        <option value="Iranian">Iranian</option>
                        <option value="Iraqi">Iraqi</option>
                        <option value="Irish">Irish</option>
                        <option value="Israeli">Israeli</option>
                        <option value="Italian">Italian</option>
                        <option value="Ivorian">Ivorian</option>
                        <option value="Jamaican">Jamaican</option>
                        <option value="Japanese">Japanese</option>
                        <option value="Jordanian">Jordanian</option>
                        <option value="Kazakhstani">Kazakhstani</option>
                        <option value="Kenyan">Kenyan</option>
                        <option value="Kittian and nevisian">Kittian and Nevisian</option>
                        <option value="Kuwaiti">Kuwaiti</option>
                        <option value="Kyrgyz">Kyrgyz</option>
                        <option value="Laotian">Laotian</option>
                        <option value="Latvian">Latvian</option>
                        <option value="Lebanese">Lebanese</option>
                        <option value="Liberian">Liberian</option>
                        <option value="Libyan">Libyan</option>
                        <option value="Liechtensteiner">Liechtensteiner</option>
                        <option value="Lithuanian">Lithuanian</option>
                        <option value="Luxembourger">Luxembourger</option>
                        <option value="Macedonian">Macedonian</option>
                        <option value="Malagasy">Malagasy</option>
                        <option value="Malawian">Malawian</option>
                        <option value="Malaysian">Malaysian</option>
                        <option value="Maldivan">Maldivan</option>
                        <option value="Malian">Malian</option>
                        <option value="Maltese">Maltese</option>
                        <option value="Marshallese">Marshallese</option>
                        <option value="Mauritanian">Mauritanian</option>
                        <option value="Mauritian">Mauritian</option>
                        <option value="Mexican">Mexican</option>
                        <option value="Micronesian">Micronesian</option>
                        <option value="Moldovan">Moldovan</option>
                        <option value="Monacan">Monacan</option>
                        <option value="Mongolian">Mongolian</option>
                        <option value="Moroccan">Moroccan</option>
                        <option value="Mosotho">Mosotho</option>
                        <option value="Motswana">Motswana</option>
                        <option value="Mozambican">Mozambican</option>
                        <option value="Namibian">Namibian</option>
                        <option value="Nauruan">Nauruan</option>
                        <option value="Nepalese">Nepalese</option>
                        <option value="New zealander">New Zealander</option>
                        <option value="Ni-vanuatu">Ni-Vanuatu</option>
                        <option value="Nicaraguan">Nicaraguan</option>
                        <option value="Nigerien">Nigerien</option>
                        <option value="North korean">North Korean</option>
                        <option value="Northern irish">Northern Irish</option>
                        <option value="Norwegian">Norwegian</option>
                        <option value="Omani">Omani</option>
                        <option value="Pakistani">Pakistani</option>
                        <option value="Palauan">Palauan</option>
                        <option value="Panamanian">Panamanian</option>
                        <option value="Papua new guinean">Papua New Guinean</option>
                        <option value="Paraguayan">Paraguayan</option>
                        <option value="Peruvian">Peruvian</option>
                        <option value="Polish">Polish</option>
                        <option value="Portuguese">Portuguese</option>
                        <option value="Qatari">Qatari</option>
                        <option value="Romanian">Romanian</option>
                        <option value="Russian">Russian</option>
                        <option value="Rwandan">Rwandan</option>
                        <option value="Saint lucian">Saint Lucian</option>
                        <option value="Salvadoran">Salvadoran</option>
                        <option value="Samoan">Samoan</option>
                        <option value="San marinese">San Marinese</option>
                        <option value="Sao tomean">Sao Tomean</option>
                        <option value="Saudi">Saudi</option>
                        <option value="Scottish">Scottish</option>
                        <option value="Senegalese">Senegalese</option>
                        <option value="Serbian">Serbian</option>
                        <option value="Seychellois">Seychellois</option>
                        <option value="Sierra leonean">Sierra Leonean</option>
                        <option value="Singaporean">Singaporean</option>
                        <option value="Slovakian">Slovakian</option>
                        <option value="Slovenian">Slovenian</option>
                        <option value="Solomon islander">Solomon Islander</option>
                        <option value="Somali">Somali</option>
                        <option value="South african">South African</option>
                        <option value="South korean">South Korean</option>
                        <option value="Spanish">Spanish</option>
                        <option value="Sri lankan">Sri Lankan</option>
                        <option value="Sudanese">Sudanese</option>
                        <option value="Surinamer">Surinamer</option>
                        <option value="Swazi">Swazi</option>
                        <option value="Swedish">Swedish</option>
                        <option value="Swiss">Swiss</option>
                        <option value="Syrian">Syrian</option>
                        <option value="Taiwanese">Taiwanese</option>
                        <option value="Tajik">Tajik</option>
                        <option value="Tanzanian">Tanzanian</option>
                        <option value="Thai">Thai</option>
                        <option value="Togolese">Togolese</option>
                        <option value="Tongan">Tongan</option>
                        <option value="Trinidadian or Tobagonian">Trinidadian or Tobagonian</option>
                        <option value="Tunisian">Tunisian</option>
                        <option value="Turkish">Turkish</option>
                        <option value="Tuvaluan">Tuvaluan</option>
                        <option value="Ugandan">Ugandan</option>
                        <option value="Ukrainian">Ukrainian</option>
                        <option value="Uruguayan">Uruguayan</option>
                        <option value="Uzbekistani">Uzbekistani</option>
                        <option value="Venezuelan">Venezuelan</option>
                        <option value="Vietnamese">Vietnamese</option>
                        <option value="Welsh">Welsh</option>
                        <option value="Yemenite">Yemenite</option>
                        <option value="Zambian">Zambian</option>
                        <option value="Zimbabwean">Zimbabwean</option>
                    </select>
                    {/* <div className="Invalid-feedback">
                    Please enter a valid name.
                    </div> */}
                </div>

                <div className="ic">
                    <div className={`form-group ${this.errorClass(this.state.formErrors.kinic)}`}>
                    <label className="form-label">IC Number</label>
                    <input 
                        className={`form-control ${this.state.formErrors.kinic}`}
                        type="number" 
                        value={this.props.kinic}
                        name="kinic"
                        onChange={this.handleChange}
                        placeholder=""
                    />
                    {this.renderErrorText('kinic', this.props.kinic)}
                    {/* <div className="Invalid-feedback">
                    Please enter a valid name.
                    </div> */}
                    </div>
                </div>

                <div className="address">
                    <label className="form-label">Permanent Address</label>
                    <input 
                        className="form-control" 
                        type="text" 
                        value={this.props.kinadd}
                        onChange={event => this.props.formUpdate({ prop: 'kinadd', value: event.target.value })}
                        placeholder=""
                        maxLength="200"
                    />
                    {/* <div className="Invalid-feedback">
                    Please enter a valid name.
                    </div> */}
                </div>

                <div className="postcode">
                    <div className={`form-group ${this.errorClass(this.state.formErrors.kinpost)}`}>
                    <label className="form-label">Postcode</label>
                    <input 
                        className={`form-control ${this.state.formErrors.kinpost}`}
                        type="number"
                        name="kinpost" 
                        value={this.props.kinpost}
                        onChange={this.handleChange}
                        placeholder="" 
                        required
                    />
                    {this.renderErrorText('kinpost', this.props.kinpost)}
                    {/* <div className="Invalid-feedback">
                        Valid first name is required.
                    </div> */}
                    </div>
                </div>
                <div className="state">
                    <label className="form-label">State</label>
                    <select 
                        className="form-control" 
                        placeholder=""
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
                    <div className={`form-group ${this.errorClass(this.state.formErrors.kinphone)}`}>
                    <label className="form-label">Phone Number</label>
                    <input 
                        className={`form-control ${this.state.formErrors.kinphone}`} 
                        type="number" 
                        name="kinphone"
                        value={this.props.kinphone}
                        onChange={this.handleChange}
                        placeholder=""
                    />
                    {this.renderErrorText('kinphone', this.props.kinphone)}
                    {/* <div className="Invalid-feedback">
                    Please enter a valid name.
                    </div> */}
                    </div>
                </div>

                <div className="email">
                    <div className={`form-group ${this.errorClass(this.state.formErrors.kinmail)}`}>
                    <label className="form-label">Email Address</label>
                    <input 
                        className={`form-control ${this.state.formErrors.kinmail}`}
                        type="email" 
                        name="kinmail"
                        value={this.props.kinmail}
                        onChange={this.handleChange}
                        placeholder="you@example.com"
                        maxLength="100"
                    />
                    {/* <div className="Invalid-feedback">
                    Please enter a valid name.
                    </div> */}
                    {this.renderErrorText('kinmail', this.props.kinmail)}
                    </div>
                </div>
                </form>
                <div className="work">
                    <label className="form-label">Currently working?</label>
                    <div className="Button-row-col">
                        <button onClick={this.handleWorkedClick} className="Form-button">Yes</button>
                        <button onClick={this.handleNotWorkedClick} className="Form-button">No</button>
                    </div>
                </div>
                </div>
                {workingForm}
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

export default connect(mapStateToProps, { formUpdate, formValidate })(KinInfo);