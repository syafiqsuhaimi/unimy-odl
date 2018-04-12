import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formUpdate,fieldValidate, formValidate, checkIsWorking } from '../actions';
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

    componentDidMount() {
        this.setState((state) => ({
            formValid: 
            this.props.nameValid && this.props.icValid && this.props.dobValid && this.props.postcodeValid &&
            this.props.phoneValid && this.props.emailValid && this.props.natValid && this.props.genderValid && 
            this.props.addressValid && this.props.negeriValid && this.props.workValid
        }));
      }
    
    handleWorkedClick() {
        this.setState({ isWorking: true });
        this.props.checkIsWorking(true);
    }
    
    handleNotWorkedClick() {
        //this.setState({isWorking: false, workValid: true });
        this.props.formUpdate({ prop: "isWorking", value: false });
        this.setState({ workValid: true });
        this.validateField('work', 'click');
        this.props.checkIsWorking(false);
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
                nameValid = value.length >= 3 && value.match(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'@-]+$/u);
                if  (fieldValidationErrors.name = nameValid) {
                    fieldValidationErrors.name = '';
                    this.props.fieldValidate({ prop: 'nameValid' , value: true });
                } else {
                    fieldValidationErrors.name = ' is-invalid';
                    this.props.fieldValidate({ prop: 'nameValid' , value: false });
                }
                break;
            case 'ic':
                icValid = value.length === 12;
                if (fieldValidationErrors.ic = icValid) {
                    fieldValidationErrors.ic = '';
                    this.props.fieldValidate({ prop: 'icValid' , value: true });
                } else {
                    fieldValidationErrors.ic = ' is-invalid';
                    this.props.fieldValidate({ prop: 'icValid' , value: false });
                }
                break;
            case 'dob':
                dobValid = value.length > 0;
                if (fieldValidationErrors.dob = dobValid) {
                    fieldValidationErrors.dob = '';
                    this.props.fieldValidate({ prop: 'dobValid' , value: true });
                } else {
                    fieldValidationErrors.dob = ' is-invalid';
                    this.props.fieldValidate({ prop: 'dobValid' , value: false });
                }
                break;
            case 'postcode':
                postcodeValid = value.length === 5;
                if (fieldValidationErrors.postcode = postcodeValid) {
                    fieldValidationErrors.postcode = '';
                    this.props.fieldValidate({ prop: 'postcodeValid' , value: true });
                } else {
                    fieldValidationErrors.postcode = ' is-invalid';
                    this.props.fieldValidate({ prop: 'postcodeValid' , value: false });
                }
                break;
            case 'phone':
                phoneValid = value.length >= 10;

                if (fieldValidationErrors.phone = phoneValid) {
                    fieldValidationErrors.phone = '';
                    this.props.fieldValidate({ prop: 'phoneValid' , value: true });
                } else {
                    fieldValidationErrors.phone = ' is-invalid';
                    this.props.fieldValidate({ prop: 'phoneValid' , value: false });
                }
                break;
            case 'email':
                emailValid = value.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
                if (fieldValidationErrors.email = emailValid) {
                    fieldValidationErrors.email = '';
                    this.props.fieldValidate({ prop: 'emailValid' , value: true });
                } else {
                    fieldValidationErrors.email = ' is-invalid';
                    this.props.fieldValidate({ prop: 'emailValid' , value: false });
                }
                break;
            case 'nationality':
                natValid = value.length > 0;
                if (fieldValidationErrors.nationality = natValid) {
                    fieldValidationErrors.nationality = '';
                    this.props.fieldValidate({ prop: 'natValid' , value: true });
                } else {
                    fieldValidationErrors.nationality = ' is-invalid';
                    this.props.fieldValidate({ prop: 'natValid' , value: false });
                }
                break;
            case 'gender':
                genderValid = value.length > 0;
                if (fieldValidationErrors.gender = genderValid) {
                    fieldValidationErrors.gender = '';
                    this.props.fieldValidate({ prop: 'genderValid' , value: true });
                } else {
                    fieldValidationErrors.gender = ' is-invalid';
                    this.props.fieldValidate({ prop: 'genderValid' , value: false });
                }
                break;
            case 'address':
                addressValid = value.length > 0;
                if (fieldValidationErrors.address = addressValid) {
                    fieldValidationErrors.address = '';
                    this.props.fieldValidate({ prop: 'addressValid' , value: true });
                } else {
                    fieldValidationErrors.address = ' is-invalid';
                    this.props.fieldValidate({ prop: 'addressValid' , value: false });
                }
                break;
            case 'negeri':
                negeriValid = value.length > 0;
                if (fieldValidationErrors.negeri = negeriValid) {
                    fieldValidationErrors.negeri = '';
                    this.props.fieldValidate({ prop: 'negeriValid' , value: true });
                } else {
                    fieldValidationErrors.negeri = 
                    this.props.fieldValidate({ prop: 'negeriValid' , value: false });
                }
                break;
            case 'work':
                workValid = value.length > 0;
                if (fieldValidationErrors.work = workValid) {
                    fieldValidationErrors.work = '';
                    this.props.fieldValidate({ prop: 'workValid' , value: true });
                } else {
                    fieldValidationErrors.work = 
                    this.props.fieldValidate({ prop: 'workValid' , value: false });
                }
                break;
            default: 
                break;
        }
        this.validateForm();

        // this.setState({ formErrors: fieldValidationErrors,
        //             nameValid,
        //             icValid,
        //             dobValid,
        //             postcodeValid,
        //             phoneValid,
        //             emailValid,
        //             natValid,
        //             genderValid,
        //             addressValid,
        //             negeriValid, 
        //             workValid
        //         }, this.validateForm);
    }
    // function below is for disabling button
    validateForm() {
        // const { 
        //     nameValid, icValid, dobValid, postcodeValid,
        //     phoneValid, emailValid, natValid, genderValid,
        //     addressValid, negeriValid, workValid, formValid
        // } = this.state;
        console.log("nameValid", this.props.nameValid)
        this.setState((state) => ({
            formValid: 
            this.props.nameValid && this.props.icValid && this.props.dobValid && this.props.postcodeValid &&
            this.props.phoneValid && this.props.emailValid && this.props.natValid && this.props.genderValid && 
            this.props.addressValid && this.props.negeriValid
        }));
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
        const isWorking = this.props.isWorking;
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
                        maxLength="50"
                        onChange={this.handleChange} 
                    />
                    {this.renderErrorText('name',this.props.name)}
                    </div>
                </div>

                <div className="ic">
                <div className={`form-group ${this.errorClass(this.state.formErrors.ic)}`}>
                    <label className="form-label">IC Number</label>
                    <input 
                        className={`form-control ${this.state.formErrors.ic}`} 
                        type="number" 
                        value={this.props.ic} 
                        name="ic"
                        placeholder=""
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
                        <option value="Trinidadian or tobagonian">Trinidadian or Tobagonian</option>
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
                    {this.renderErrorText('nationality', this.props.nationality)}
                </div>
                <div className="dob">
                    <label className="form-label">Date of Birth</label>
                    <input
                        className={`form-control ${this.state.formErrors.dob}`}  
                        type="date" 
                        placeholder=""
                        name="dob"
                        value={this.props.dob}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="gender">
                    <label className="form-label">Gender</label>
                    <select 
                        className={`form-control ${this.state.formErrors.gender}`} 
                        name="gender"
                        value={this.props.gender} 
                        placeholder=""
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
                        className={`form-control ${this.state.formErrors.address}`} 
                        type="text" 
                        value={this.props.address}
                        name="address"
                        maxLength="200"
                        onChange={this.handleChange} 
                        placeholder=""/>
                    {this.renderErrorText('address', this.props.address)}
                </div>
                <div className="postcode">
                    <div className={`form-group ${this.errorClass(this.state.formErrors.postcode)}`}>
                    <label className="form-label">Postcode</label>
                    <input 
                        className={`form-control ${this.state.formErrors.postcode}`} 
                        type="number" 
                        value={this.props.postcode}
                        name="postcode"
                        maxLength="5"
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
                        value={this.props.negeri}
                        name="negeri"
                        placeholder=""
                        onChange={this.handleChange} 
                        required
                    >
                        <option value="">Choose...</option>
                        <option value="WP Kuala Lumpur">WP Kuala Lumpur</option>
                        <option value="WP Putrajaya">WP Putrajaya</option>
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
                        className={`form-control ${this.state.formErrors.phone}`}  
                        type="number" 
                        value={this.props.phone}
                        name="phone"
                        maxLength="15"
                        onChange={this.handleChange} 
                        placeholder=""
                    />
                    {this.renderErrorText('phone', this.props.phone)}
                    </div>
                </div>

                <div className="email">
                    <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>                                  
                    <label className="form-label">Email Address</label>
                    <input 
                        className={`form-control ${this.state.formErrors.email}`} 
                        type="email" 
                        value={this.props.email}
                        name="email"
                        onChange={this.handleChange} 
                        placeholder="you@example.com"
                        maxLength="100"
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
        email, isWorking,nameValid,
        icValid,
        dobValid,
        postcodeValid,
        phoneValid,
        emailValid,
        natValid,
        genderValid,
        addressValid,
        negeriValid,
        workValid,
        formValid
    } = state.form;

    return { 
        name, ic, nationality,
        dob, gender, address,
        postcode, negeri, phone, email, isWorking,nameValid,
        icValid,
        dobValid,
        postcodeValid,
        phoneValid,
        emailValid,
        natValid,
        genderValid,
        addressValid,
        negeriValid,
        workValid,
        formValid
    };
}

export default connect(mapStateToProps, { formUpdate, formValidate, fieldValidate, checkIsWorking })(PersonalInfo);
