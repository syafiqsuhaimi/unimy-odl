import axios from 'axios';

export const FORM_UPDATE = 'form_update';
export const FORM_SUBMIT = 'form_submit';
export const VALIDATION_SUCCESS = 'validation_success';
export const VALIDATION_FAIL = 'validation_fail';

export const formUpdate = ({ prop, value }) => {
    //console.log({ prop, value });
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

       console.log('attachment in state:', iccopy);
        let applicant = {
            name, ic, nationality, dob, gender, address, 
            postcode, negeri, phone, email, tax, epf, 
            occupation, gross, nett, depend, kinname, 
            relation, kinnat, kinic, kinadd, kinpost, 
            kinstate, kinphone, kinmail, kintax, kinepf, 
            kinoccu, kingross, kinnett, kindepend, 
            iccopy, payslip 
        };

        let data =  new FormData();
        data.append('ic_copy',iccopy);
        data.append('pay_slip',payslip);
        let config = {
            headers: { 'content-type': 'application/pdf' }
        }

        axios.post('http://localhost:8888/upload_attachment', data, config)
          .then((result) => {
              console.log('upload success');
          });

        // axios.post('http://localhost:8888/post-data', applicant)
        //     .then(function (response) {
        //         console.log(response);
        //         let formData = new FormData();
        //               const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        //               axios.post('http://localhost:8888/upload-attachment', iccopy, config)
        //                 .then((result) => {
        //                     console.log('upload success');
        //                 });
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

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
    
};

