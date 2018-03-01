import { FORM_UPDATE, FORM_SUBMIT } from '../actions';

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
    kindepend: '', iccopy: '', payslip: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FORM_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case FORM_SUBMIT:
            return INITIAL_STATE;
        default:
            return state;
    }
}