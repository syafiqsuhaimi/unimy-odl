import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formUpdate } from '../actions';
import KinWorking from './KinWorking';

class KinInfo extends Component {
    constructor(props) {
        super(props);
        this.handleWorkedClick = this.handleWorkedClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        //this.handleNotWorkedClick = this.handleNotWorkedClick.bind(this);
        this.state = {
            isWorking: false,
            formErrors: {
                kinname: '', kinic: '', kinpost: '', kinphone: '', kinmail: ''
            },
            kinnameValid: false,
            kinicValid: false,
            kinpostValid: false,
            kinphoneValid: false,
            kinmailValid: false,
            formValid: false
        };
    }
    
    handleWorkedClick() {
        this.setState({isWorking: true});
    }
    /*
    handleNotWorkedClick() {
        this.setState({isWorking: false});
    }
    */
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

        switch (fieldName) {
            case 'kinname':
                kinnameValid = value.length >= 6 && value.match(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'@-]+$/u);
                fieldValidationErrors.kinname = kinnameValid? '' : ' is-invalid';
                break;
            case 'kinic':
                kinicValid = value.length == 12;
                fieldValidationErrors.kinic = kinicValid? '' : ' is-invalid';
                break;
            case 'kinpost':
                kinpostValid = value.length >=5;
                fieldValidationErrors.kinpost = kinpostValid? '' : ' is-invalid';
            case 'kinphone':
                kinphoneValid = value.length >= 10;
                fieldValidationErrors.kinphone = kinphoneValid? '' : ' is-invalid';
                break;
            case 'kinmail':
                kinmailValid = value.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
                fieldValidationErrors.kinmail = kinmailValid? '' : ' is-invalid';
                break;
            default:
                break;
        }

        this.setState({ formErrors: fieldValidationErrors,
                                    kinnameValid,
                                    kinicValid,
                                    kinpostValid,
                                    kinphoneValid,
                                    kinmailValid
                    }, this.validateForm);
    }

    validateForm() {
        this.setState({
            formValid: this.state.kinnameValid
        })
    }

    errorClass(error) {
        return (error.length === 0? '' : 'has-error');
    }

    renderErrorText(name, value) {
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
                            className="form-control" 
                            type="text" 
                            value={this.props.kinname}
                            name="kinname"
                            onChange={this.handleChange}
                            placeholder=""
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
                        required
                    >
                        <option value="">-- select one --</option>
                        <option value="mother">Mother</option>
                        <option value="father">Father</option>
                        <option value="brother">Brother</option>
                        <option value="sister">Sister</option>
                        <option value="spouse">Spouse</option>
                        <option value="grandfather">Grandfather</option>
                        <option value="grandmother">Grandmother</option>
                        <option value="uncle">Uncle</option>
                        <option value="aunty">Aunty</option>
                        <option value="cousin">Cousin</option>
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
                </div>

                <div className="ic">
                    <div className={`form-group ${this.errorClass(this.state.formErrors.kinname)}`}>
                    <label className="form-label">IC Number</label>
                    <input 
                        className="form-control" 
                        type="number" 
                        value={this.props.kinic}
                        name="kinic"
                        onChange={this.handleChange}
                        placeholder="i.e: xxxxxx-xx-xxxx"
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
                    />
                    {/* <div className="Invalid-feedback">
                    Please enter a valid name.
                    </div> */}
                </div>

                <div className="postcode">
                    <div className={`form-group ${this.errorClass(this.state.formErrors.kinpost)}`}>
                    <label className="form-label">Postcode</label>
                    <input 
                        className="form-control" 
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
                        className="form-control" 
                        type="number" 
                        name="kinphone"
                        value={this.props.kinphone}
                        onChange={this.handleChange}
                        placeholder="i.e: 01x-xxxxxxx"
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
                        className="form-control" 
                        type="email" 
                        name="kinmail"
                        value={this.props.kinmail}
                        onChange={this.handleChange}
                        placeholder="you@example.com"
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
                        <button className="Form-button">No</button>
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

export default connect(mapStateToProps, { formUpdate })(KinInfo);