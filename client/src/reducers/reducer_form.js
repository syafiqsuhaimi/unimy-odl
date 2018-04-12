import { 
    FORM_UPDATE, 
    FORM_SUBMIT_SUCCESS, 
    FORM_SUBMIT_FAIL,
    FIELD_VALIDATE,
    VALIDATION_SUCCESS, 
    VALIDATION_FAIL, 
    WORKING, 
    NOT_WORKING 
} from '../actions';

const INITIAL_STATE = {
    name: '', ic: '', nationality: '',
    dob: '', gender: '', address: '',
    postcode: '', negeri: '', phone: '',
    email: '', tax: '', epf: '',
    occupation: '', gross: '', nett: '',
    depend: '', kinname: '', relation: '',
    kinnat: '', kinic: '', kinadd: '',
    kinpost: '', kinstate: '', kinphone: '',
    kinmail: '', kintax: '', kinepf: '',
    kinoccu: '', kingross: '', kinnett: '',
    kindepend: '', iccopy: '', payslip: '',nameValid: false,
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
    formValid: false, 
    buttonDisabled: true, isWorking: false, 
    submitSucess: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FORM_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case FORM_SUBMIT_SUCCESS:
            return { submitSuccess: true };
        case FORM_SUBMIT_FAIL:
            return { submitSuccess: false };
        case FIELD_VALIDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case VALIDATION_SUCCESS: 
            return { ...state, buttonDisabled: false };
        case VALIDATION_FAIL:
            return { ...state, buttonDisabled: true };
        case WORKING: 
            return { ...state, isWorking: true };
        case NOT_WORKING:
            return { ...state, isWorking: false };
        default:
            return state;
    }
}