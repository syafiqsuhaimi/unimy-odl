import axios from 'axios';

export const FORM_UPDATE = 'form_update';
export const FORM_SUBMIT = 'form_submit';
export const VALIDATION_SUCCESS = 'validation_success';
export const VALIDATION_FAIL = 'validation_fail';

export const formUpdate = ({ prop, value }) => {
    return {
        type: FORM_UPDATE,
        payload: { prop, value }
    };
};

export const formSubmit = ({ 
    name, ic, nationality, dob, gender, address, 
    postcode, negeri, phone, email, tax, epf, 
    occupation, gross, nett, depend, kinname, 
    relation, kinnat, kinic, kinadd, kinpost, 
    kinstate, kinphone, kinmail, kintax, kinepf, 
    kinoccu, kingross, kinnett, kindepend, 
    iccopy, payslip 
}) => {
   /* push to database */
   return (dispatch) => {
        let applicant = JSON.stringify({
            name, ic, nationality, dob, gender, address, 
            postcode, negeri, phone, email, tax, epf, 
            occupation, gross, nett, depend, kinname, 
            relation, kinnat, kinic, kinadd, kinpost, 
            kinstate, kinphone, kinmail, kintax, kinepf, 
            kinoccu, kingross, kinnett, kindepend, 
            iccopy, payslip 
        });

        
        axios.post('http://localhost:8888/post-student', applicant)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        dispatch({ type: FORM_SUBMIT });
   }
};

export const formValidate = (validation) => {
    if (validation) {
        return {
            type: VALIDATION_SUCCESS,
            payload: null
        }
    }

    return {
        type: VALIDATION_FAIL,
        payload: null
    }
    
}

