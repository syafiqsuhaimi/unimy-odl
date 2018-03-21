import axios from 'axios';

export const FORM_UPDATE = 'form_update';
export const FORM_SUBMIT_SUCCESS = 'form_submit_success';
export const FORM_SUBMIT_FAIL = 'form_submit_fail';
export const VALIDATION_SUCCESS = 'validation_success';
export const VALIDATION_FAIL = 'validation_fail';
export const WORKING = 'working';
export const NOT_WORKING = 'not_working';
export const ENABLE_BUTTON = 'enable_button';

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
        let applicant = {
            name, ic, nationality, dob, gender, address, 
            postcode, negeri, phone, email, tax, epf, 
            occupation, gross, nett, depend, kinname, 
            relation, kinnat, kinic, kinadd, kinpost, 
            kinstate, kinphone, kinmail, kintax, kinepf, 
            kinoccu, kingross, kinnett, kindepend, 
            iccopy, payslip 
        };

        console.log('applicant:', applicant);

        let data =  new FormData();
        data.append('pdfs',iccopy);
        data.append('pdfs',payslip);
        let config = {
            headers: { 'content-type': 'application/pdf' }
        }

        axios.post('http://localhost:8888/upload_attachment', data, config)
          .then((result) => {
              console.log('upload success:',result);
              applicant.iccopy = result.data[0].url;
              applicant.payslip = result.data[1].url;

              axios.post('http://localhost:8888/post-data', applicant)
              .then(function (response) {
                  console.log(response);
                  dispatch({ type: FORM_SUBMIT_SUCCESS });
              })
              .catch(function (error) {
                  console.log(error);
                  dispatch({ type: FORM_SUBMIT_FAIL });
              });
          })
          .catch((error) => {
            console.log(error);
            dispatch({ type: FORM_SUBMIT_FAIL });
            
          });

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

export const checkIsWorking = (isWorking) => {
    console.log("isworking in action :" ,isWorking);
    if (isWorking) {
        return {
            type: WORKING,
            payload: null
        }
    }
    return {
        type: NOT_WORKING,
        payload: null
    }
    
};

export const enabledButton = () => {
    return {
        type: ENABLE_BUTTON,
        payload: null
    }
}