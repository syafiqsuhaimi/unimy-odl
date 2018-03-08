import { FORM_UPDATE, FORM_SUBMIT, VALIDATION_SUCCESS, VALIDATION_FAIL, WORKING, NOT_WORKING } from '../actions';

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
    kindepend: '', iccopy: '', payslip: '', 
    buttonDisabled: true, isWorking: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FORM_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case FORM_SUBMIT:
            return INITIAL_STATE;
        case VALIDATION_SUCCESS: 
            return { ...state, buttonDisabled: false };
        case VALIDATION_FAIL:
            return { ...state, buttonDisabled: true };
        case WORKING: 
            console.log('working in reducer');
            return { ...state, isWorking: true };
        case NOT_WORKING:
            return { ...state, isWorking: false };
        default:
            return state;
    }
}