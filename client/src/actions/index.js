export const FORM_UPDATE = 'form_update';
export const FORM_SUBMIT = 'form_submit';

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
        console.log({
            name, ic, nationality, dob, 
            gender, address, postcode, negeri, 
            phone, email, tax, epf, occupation,
            gross, nett, depend, kinname, relation, 
            kinnat, kinic, kinadd, kinpost, 
            kinstate, kinphone, kinmail,
            kintax, kinepf, kinoccu,
            kingross, kinnett, kindepend, iccopy, payslip
        });
        dispatch({ type: FORM_SUBMIT });
   }
};
