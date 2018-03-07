import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formUpdate, formValidate } from '../actions';
import Working from './Working';

class PersonalInfo extends Component {
    constructor(props) {
        super(props);
        this.handleWorkedClick = this.handleWorkedClick.bind(this);
        this.handleNotWorkedClick = this.handleNotWorkedClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.renderErrorText = this.renderErrorText.bind(this);
        this.state = {
            isWorking: false,
            formErrors: { 
                name: '', ic: '', dob: '', postcode: '', phone: '', email: '',
                nationality: '', gender: '', address: '', negeri: '', work: ''
            },
            nameValid: false,
            icValid: false,
            dobValid: false,
            postcodeValid: false,
            phoneValid: false,
            emailValid: false,
            natValid: false,
            genderValid: false,
            addressValid: false,
            negeriValid: false,
            workValid: false,
            formValid: false
        };
    }
    
    handleWorkedClick() {
        this.setState({ isWorking: true });
    }
    
    handleNotWorkedClick() {
        this.setState({isWorking: false, workValid: true });
        this.validateField('work', 'click');
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
        let dobValid = this.state.dobValid;
        let postcodeValid = this.state.postcodeValid;
        let phoneValid = this.state.phoneValid;
        let emailValid = this.state.emailValid;
        let natValid = this.state.natValid;
        let genderValid = this.state.genderValid;
        let addressValid = this.state.addressValid;
        let negeriValid = this.state.negeriValid;
        let workValid = this.state.workValid;

        switch (fieldName) {
            case 'name':
                nameValid = value.length >= 6 && value.match(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'@-]+$/u);
                if  (fieldValidationErrors.name = nameValid) {
                    fieldValidationErrors.name = '';
                    nameValid = true;
                } else {
                    fieldValidationErrors.name = ' is-invalid';
                    nameValid = false;
                }
                break;
            case 'ic':
                icValid = value.match(/^\d{6}-\d{2}-\d{4}$/);
                if (fieldValidationErrors.ic = icValid) {
                    fieldValidationErrors.ic = '';
                    icValid = true;
                } else {
                    fieldValidationErrors.ic = ' is-invalid';
                    icValid = false;
                }
                break;
            case 'dob':
                dobValid = value.match(/(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.](19|20)\d\d/);
                if (fieldValidationErrors.dob = dobValid) {
                    fieldValidationErrors.dob = '';
                    dobValid = true;
                } else {
                    fieldValidationErrors.dob = ' is-invalid';
                    dobValid = false;
                }
                break;
            case 'postcode':
                postcodeValid = value.length >= 5;
                if (fieldValidationErrors.postcode = postcodeValid) {
                    fieldValidationErrors.postcode = '';
                    postcodeValid = true;
                } else {
                    fieldValidationErrors.postcode = ' is-invalid';
                    postcodeValid = false;
                }
                break;
            case 'phone':
                phoneValid = value.match(/^[01]+\d{1}-\d{7}$/);
                if (fieldValidationErrors.phone = phoneValid) {
                    fieldValidationErrors.phone = '';
                    phoneValid = true;
                } else {
                    fieldValidationErrors.phone = ' is-invalid';
                    phoneValid = false;
                }
                break;
            case 'email':
                emailValid = value.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
                if (fieldValidationErrors.email = emailValid) {
                    fieldValidationErrors.email = '';
                    emailValid = true;
                } else {
                    fieldValidationErrors.email = ' is-invalid';
                    emailValid = false;
                }
                break;
            case 'nationality':
                natValid = value.length > 0;
                if (fieldValidationErrors.nationality = natValid) {
                    fieldValidationErrors.nationality = '';
                    natValid = true;
                } else {
                    fieldValidationErrors.nationality = ' is-invalid';
                    natValid = false;
                }
                break;
            case 'gender':
                genderValid = value.length > 0;
                if (fieldValidationErrors.gender = genderValid) {
                    fieldValidationErrors.gender = '';
                    genderValid = true;
                } else {
                    fieldValidationErrors.gender = ' is-invalid';
                    genderValid = false;
                }
                break;
            case 'address':
                addressValid = value.length > 0;
                if (fieldValidationErrors.address = addressValid) {
                    fieldValidationErrors.address = '';
                    addressValid = true;
                } else {
                    fieldValidationErrors.address = ' is-invalid';
                    addressValid = false;
                }
                break;
            case 'negeri':
                negeriValid = value.length > 0;
                if (fieldValidationErrors.negeri = negeriValid) {
                    fieldValidationErrors.negeri = '';
                    negeriValid = true;
                } else {
                    fieldValidationErrors.negeri = 
                    negeriValid = false;
                }
                break;
            case 'work':
                workValid = value.length > 0;
                if (fieldValidationErrors.work = workValid) {
                    fieldValidationErrors.work = '';
                    workValid = true;
                } else {
                    fieldValidationErrors.work = 
                    workValid = false;
                }
                break;
            default: 
                break;
        }

        this.setState({ formErrors: fieldValidationErrors,
                    nameValid,
                    icValid,
                    dobValid,
                    postcodeValid,
                    phoneValid,
                    emailValid,
                    natValid,
                    genderValid,
                    addressValid,
                    negeriValid, 
                    workValid
                }, this.validateForm);
    }
    // function below is for disabling button
    validateForm() {
        this.setState({ 
            formValid: 
                this.state.nameValid && 
                this.state.icValid && 
                this.state.dobValid &&
                this.state.postcodeValid &&
                this.state.phoneValid &&
                this.state.emailValid &&
                this.state.natValid &&
                this.state.genderValid && 
                this.state.addressValid &&
                this.state.negeriValid &&
                this.state.workValid
        });
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
            workingForm = <Working />;  
        } else {
            workingForm = null;
        }

        return (
            <div className="App-body">
            <div className="test">
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
                </div>

                <div className="ic">
                <div className={`form-group ${this.errorClass(this.state.formErrors.ic)}`}>
                    <label className="form-label">IC Number</label>
                    <input 
                        className="form-control" 
                        type="text" 
                        value={this.props.ic} 
                        name="ic"
                        placeholder="i.e: xxxxxx-xx-xxxx"
                        onChange={this.handleChange}
                    />
                    {this.renderErrorText('ic', this.props.ic)}
                </div>
                </div>
                <div className="nationality">
                    <label className="form-label">Nationality</label>
                    <select
                        className="form-control" 
                        value={this.props.nationality} 
                        name="nationality"
                        placeholder=""
                        onChange={this.handleChange}
                        required
                    >
                        <option value="">-- select one --</option>
                        <option value="afghan">Afghan</option>
                        <option value="albanian">Albanian</option>
                        <option value="algerian">Algerian</option>
                        <option value="american">American</option>
                        <option value="andorran">Andorran</option>
                        <option value="angolan">Angolan</option>
                        <option value="antiguans">Antiguans</option>
                        <option value="argentinean">Argentinean</option>
                        <option value="armenian">Armenian</option>
                        <option value="australian">Australian</option>
                        <option value="austrian">Austrian</option>
                        <option value="azerbaijani">Azerbaijani</option>
                        <option value="bahamian">Bahamian</option>
                        <option value="bahraini">Bahraini</option>
                        <option value="bangladeshi">Bangladeshi</option>
                        <option value="barbadian">Barbadian</option>
                        <option value="barbudans">Barbudans</option>
                        <option value="batswana">Batswana</option>
                        <option value="belarusian">Belarusian</option>
                        <option value="belgian">Belgian</option>
                        <option value="belizean">Belizean</option>
                        <option value="beninese">Beninese</option>
                        <option value="bhutanese">Bhutanese</option>
                        <option value="bolivian">Bolivian</option>
                        <option value="bosnian">Bosnian</option>
                        <option value="brazilian">Brazilian</option>
                        <option value="british">British</option>
                        <option value="bruneian">Bruneian</option>
                        <option value="bulgarian">Bulgarian</option>
                        <option value="burkinabe">Burkinabe</option>
                        <option value="burmese">Burmese</option>
                        <option value="burundian">Burundian</option>
                        <option value="cambodian">Cambodian</option>
                        <option value="cameroonian">Cameroonian</option>
                        <option value="canadian">Canadian</option>
                        <option value="cape verdean">Cape Verdean</option>
                        <option value="central african">Central African</option>
                        <option value="chadian">Chadian</option>
                        <option value="chilean">Chilean</option>
                        <option value="chinese">Chinese</option>
                        <option value="colombian">Colombian</option>
                        <option value="comoran">Comoran</option>
                        <option value="congolese">Congolese</option>
                        <option value="costa rican">Costa Rican</option>
                        <option value="croatian">Croatian</option>
                        <option value="cuban">Cuban</option>
                        <option value="cypriot">Cypriot</option>
                        <option value="czech">Czech</option>
                        <option value="danish">Danish</option>
                        <option value="djibouti">Djibouti</option>
                        <option value="dominican">Dominican</option>
                        <option value="dutch">Dutch</option>
                        <option value="east timorese">East Timorese</option>
                        <option value="ecuadorean">Ecuadorean</option>
                        <option value="egyptian">Egyptian</option>
                        <option value="emirian">Emirian</option>
                        <option value="equatorial guinean">Equatorial Guinean</option>
                        <option value="eritrean">Eritrean</option>
                        <option value="estonian">Estonian</option>
                        <option value="ethiopian">Ethiopian</option>
                        <option value="fijian">Fijian</option>
                        <option value="filipino">Filipino</option>
                        <option value="finnish">Finnish</option>
                        <option value="french">French</option>
                        <option value="gabonese">Gabonese</option>
                        <option value="gambian">Gambian</option>
                        <option value="georgian">Georgian</option>
                        <option value="german">German</option>
                        <option value="ghanaian">Ghanaian</option>
                        <option value="greek">Greek</option>
                        <option value="grenadian">Grenadian</option>
                        <option value="guatemalan">Guatemalan</option>
                        <option value="guinea-bissauan">Guinea-Bissauan</option>
                        <option value="guinean">Guinean</option>
                        <option value="guyanese">Guyanese</option>
                        <option value="haitian">Haitian</option>
                        <option value="herzegovinian">Herzegovinian</option>
                        <option value="honduran">Honduran</option>
                        <option value="hungarian">Hungarian</option>
                        <option value="icelander">Icelander</option>
                        <option value="indian">Indian</option>
                        <option value="indonesian">Indonesian</option>
                        <option value="iranian">Iranian</option>
                        <option value="iraqi">Iraqi</option>
                        <option value="irish">Irish</option>
                        <option value="israeli">Israeli</option>
                        <option value="italian">Italian</option>
                        <option value="ivorian">Ivorian</option>
                        <option value="jamaican">Jamaican</option>
                        <option value="japanese">Japanese</option>
                        <option value="jordanian">Jordanian</option>
                        <option value="kazakhstani">Kazakhstani</option>
                        <option value="kenyan">Kenyan</option>
                        <option value="kittian and nevisian">Kittian and Nevisian</option>
                        <option value="kuwaiti">Kuwaiti</option>
                        <option value="kyrgyz">Kyrgyz</option>
                        <option value="laotian">Laotian</option>
                        <option value="latvian">Latvian</option>
                        <option value="lebanese">Lebanese</option>
                        <option value="liberian">Liberian</option>
                        <option value="libyan">Libyan</option>
                        <option value="liechtensteiner">Liechtensteiner</option>
                        <option value="lithuanian">Lithuanian</option>
                        <option value="luxembourger">Luxembourger</option>
                        <option value="macedonian">Macedonian</option>
                        <option value="malagasy">Malagasy</option>
                        <option value="malawian">Malawian</option>
                        <option value="malaysian">Malaysian</option>
                        <option value="maldivan">Maldivan</option>
                        <option value="malian">Malian</option>
                        <option value="maltese">Maltese</option>
                        <option value="marshallese">Marshallese</option>
                        <option value="mauritanian">Mauritanian</option>
                        <option value="mauritian">Mauritian</option>
                        <option value="mexican">Mexican</option>
                        <option value="micronesian">Micronesian</option>
                        <option value="moldovan">Moldovan</option>
                        <option value="monacan">Monacan</option>
                        <option value="mongolian">Mongolian</option>
                        <option value="moroccan">Moroccan</option>
                        <option value="mosotho">Mosotho</option>
                        <option value="motswana">Motswana</option>
                        <option value="mozambican">Mozambican</option>
                        <option value="namibian">Namibian</option>
                        <option value="nauruan">Nauruan</option>
                        <option value="nepalese">Nepalese</option>
                        <option value="new zealander">New Zealander</option>
                        <option value="ni-vanuatu">Ni-Vanuatu</option>
                        <option value="nicaraguan">Nicaraguan</option>
                        <option value="nigerien">Nigerien</option>
                        <option value="north korean">North Korean</option>
                        <option value="northern irish">Northern Irish</option>
                        <option value="norwegian">Norwegian</option>
                        <option value="omani">Omani</option>
                        <option value="pakistani">Pakistani</option>
                        <option value="palauan">Palauan</option>
                        <option value="panamanian">Panamanian</option>
                        <option value="papua new guinean">Papua New Guinean</option>
                        <option value="paraguayan">Paraguayan</option>
                        <option value="peruvian">Peruvian</option>
                        <option value="polish">Polish</option>
                        <option value="portuguese">Portuguese</option>
                        <option value="qatari">Qatari</option>
                        <option value="romanian">Romanian</option>
                        <option value="russian">Russian</option>
                        <option value="rwandan">Rwandan</option>
                        <option value="saint lucian">Saint Lucian</option>
                        <option value="salvadoran">Salvadoran</option>
                        <option value="samoan">Samoan</option>
                        <option value="san marinese">San Marinese</option>
                        <option value="sao tomean">Sao Tomean</option>
                        <option value="saudi">Saudi</option>
                        <option value="scottish">Scottish</option>
                        <option value="senegalese">Senegalese</option>
                        <option value="serbian">Serbian</option>
                        <option value="seychellois">Seychellois</option>
                        <option value="sierra leonean">Sierra Leonean</option>
                        <option value="singaporean">Singaporean</option>
                        <option value="slovakian">Slovakian</option>
                        <option value="slovenian">Slovenian</option>
                        <option value="solomon islander">Solomon Islander</option>
                        <option value="somali">Somali</option>
                        <option value="south african">South African</option>
                        <option value="south korean">South Korean</option>
                        <option value="spanish">Spanish</option>
                        <option value="sri lankan">Sri Lankan</option>
                        <option value="sudanese">Sudanese</option>
                        <option value="surinamer">Surinamer</option>
                        <option value="swazi">Swazi</option>
                        <option value="swedish">Swedish</option>
                        <option value="swiss">Swiss</option>
                        <option value="syrian">Syrian</option>
                        <option value="taiwanese">Taiwanese</option>
                        <option value="tajik">Tajik</option>
                        <option value="tanzanian">Tanzanian</option>
                        <option value="thai">Thai</option>
                        <option value="togolese">Togolese</option>
                        <option value="tongan">Tongan</option>
                        <option value="trinidadian or tobagonian">Trinidadian or Tobagonian</option>
                        <option value="tunisian">Tunisian</option>
                        <option value="turkish">Turkish</option>
                        <option value="tuvaluan">Tuvaluan</option>
                        <option value="ugandan">Ugandan</option>
                        <option value="ukrainian">Ukrainian</option>
                        <option value="uruguayan">Uruguayan</option>
                        <option value="uzbekistani">Uzbekistani</option>
                        <option value="venezuelan">Venezuelan</option>
                        <option value="vietnamese">Vietnamese</option>
                        <option value="welsh">Welsh</option>
                        <option value="yemenite">Yemenite</option>
                        <option value="zambian">Zambian</option>
                        <option value="zimbabwean">Zimbabwean</option>
                    </select>
                    {/* <div className="Invalid-feedback">
                    Please enter a valid name.
                    </div> */}
                    {this.renderErrorText('nationality', this.props.nationality)}
                </div>
                <div className="dob">

                    <div className={`form-group ${this.errorClass(this.state.formErrors.dob)}`}>
                    <label className="form-label">Date of Birth</label>
                    <input
                        className="form-control" 
                        type="text" 
                        placeholder="i.e: dd/mm/yyyy"
                        name="dob"

                    <label className="Form-label">Date of Birth</label>
                    <input 
                        className="Form-input" 
                        type="date" 
                        placeholder=""

                        value={this.props.dob}
                        onChange={this.handleChange}   
                    />
                    {this.renderErrorText('dob', this.props.dob)}
                    </div>
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
                    Please enter a valid name.
                    </div> */}
                    {this.renderErrorText('gender', this.props.gender)}
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
                    {this.renderErrorText('address', this.props.address)}
                </div>
                <div className="postcode">
                    <div className={`form-group ${this.errorClass(this.state.formErrors.postcode)}`}>
                    <label className="form-label">Postcode</label>
                    <input 
                        className="form-control" 
                        type="number" 
                        value={this.props.postcode}
                        name="postcode"
                        onChange={this.handleChange} 
                        placeholder="" 
                    />
                    {this.renderErrorText('postcode', this.props.postcode)}
                    </div>
                </div>
                <div className="state">
                    <label className="form-label">State</label>
                    <select 
                        className="form-control" 
                        style={{ height: 27 }} 
                        value={this.props.negeri}
                        name="negeri"
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
                    Please enter a valid name.
                    </div> */}
                    {this.renderErrorText('negeri', this.props.negeri)}
                </div>
                <div className="phone">
                    <div className={`form-group ${this.errorClass(this.state.formErrors.phone)}`}>
                    <label className="form-label">Phone Number</label>
                    <input 
                        className="form-control" 
                        type="text" 
                        value={this.props.phone}
                        name="phone"
                        onChange={this.handleChange} 
                        placeholder="i.e: 01x-xxxxxxx"
                    />
                    {this.renderErrorText('phone', this.props.phone)}
                    </div>
                </div>

                <div className="email">
                    <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>                                  
                    <label className="form-label">Email Address</label>
                    <input 
                        className="form-control" 
                        type="email" 
                        value={this.props.email}
                        name="email"
                        onChange={this.handleChange} 
                        placeholder="you@example.com"
                    />
                    {this.renderErrorText('email', this.props.email)}
                    </div>
                </div>
            </form>
            <div className="work">
                    <label className="form-label">Are you currently working?</label>
                    <div className="Button-row-col">
                        <button onClick={this.handleWorkedClick} className="Form-button">Yes</button>
                        <button onClick={this.handleNotWorkedClick} className="Form-button">No</button>
                    </div>
                    {this.renderErrorText('work', this.state.isWorking)}
                </div>
            </div>
            {workingForm}
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

export default connect(mapStateToProps, { formUpdate, formValidate })(PersonalInfo);
