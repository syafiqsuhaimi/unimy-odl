import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formUpdate, formValidate } from '../actions';
import FileDragAndDrop from 'react-file-drag-and-drop';

class Upload extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.renderErrorText = this.renderErrorText.bind(this);
        this.renderDropFiles = this.renderDropFiles.bind(this);
        this.handleICDrop = this.handleICDrop.bind(this);
        this.handlePayDrop = this.handlePayDrop.bind(this);
        this.cancelIC = this.cancelIC.bind(this);
        this.cancelPayslip = this.cancelPayslip.bind(this);
        this.state = {
            icDrop: '',
            payslipDrop: '',
            formErrors: {
                iccopy: '',
                payslip: ''
            },
            iccopyValid: false,
            payslipValid: false,
            formValid: false, 
            ICDropped : false,
            payslipDropped : false
        }
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.files[0];
        this.props.formUpdate({ prop: [name], value });
        this.validateField(name, value);
        if(name==="iccopy"){
            this.setState({ 
                icDrop: value.name,
                ICDropped : true
             });
        }else if(name==="payslip"){
            this.setState({ 
                payslipDrop: value.name,
                payslipDropped : true
             });
        }
    }

    handleICDrop(dataTransfer) {
        this.props.formUpdate({ prop: 'iccopy', value: dataTransfer.files[0] })
        console.log('attachment out state:',dataTransfer.files[0]);
        this.validateField('iccopy', dataTransfer.files[0]);
        this.setState({ 
            icDrop: dataTransfer.files[0].name,
            ICDropped : true
         });
    }

    handlePayDrop(dataTransfer) {
        this.props.formUpdate({ prop: 'payslip', value: dataTransfer.files[0]})
        console.log('attachment out state:',dataTransfer.files[0]);
        this.validateField('payslip', dataTransfer.files[0]);
        this.setState({
             payslipDrop: dataTransfer.files[0].name,
             payslipDropped : true
        });
    }

    cancelIC(){
        this.props.formUpdate({ prop: 'iccopy', value: '' })
        this.setState({ICDropped : false});
        this.props.formValidate(false);
    }

    cancelPayslip(){
        this.props.formUpdate({ prop: 'payslip', value: '' })
        this.setState({payslipDropped : false});
        this.props.formValidate(false);
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let iccopyValid = this.state.iccopyValid;
        let payslipValid = this.state.payslipValid;

        switch (fieldName) {
            case 'iccopy':
                iccopyValid = value.name.length > 0;
                if (fieldValidationErrors.iccopy = iccopyValid) {
                    fieldValidationErrors.iccopy = '';
                    iccopyValid = true;
                } else {
                    fieldValidationErrors.iccopy = 'Please upload your IC copy.';
                    iccopyValid = false;
                }
                break;
            case 'payslip':
                payslipValid = value.name.length > 0;
                if (fieldValidationErrors.payslip = payslipValid) {
                    fieldValidationErrors.payslip = '';
                    payslipValid = true;
                } else {
                    fieldValidationErrors.payslip = 'Please upload your payslip copy.';
                    payslipValid = false;
                }
                break;
            default: 
                break;
        }

        this.setState({ formErrors: fieldValidationErrors,
                        iccopyValid, payslipValid
        }, this.validateForm);
    }
 
    validateForm() {
        this.setState({
            formValid: this.state.iccopyValid && this.state.payslipValid
        });
    }

    renderErrorText(name) {
        this.props.formValidate(this.state.formValid);
        if (this.state.formErrors[name] !== '') {
            return (
                <div className="alert alert-danger">
                    {this.state.formErrors[name]}
                </div>
            );
        }
    }

    renderDropFiles(name) {
        if (name === 'iccopy') {
            return (
                <div className="attachment">{this.state.icDrop}</div>
            );
        }

        if (name === 'payslip') {
            return (
                <div className="attachment">{this.state.payslipDrop}</div>
            );
        }
    }

    render() {

        let UploadIC,UploadPayslip = null;

        if (!this.state.ICDropped){
            UploadIC = <div className="Drag-drop">
                                <FileDragAndDrop name='iccopy' onDrop={this.handleICDrop}>
                                    <div className="drop-zone">
                                        <h5 className="Title" >Drag and drop file here...</h5>
                                        <h6 className="Subtitle" >or</h6>
                                        <input className="Upload-input"
                                        //style={{display: 'none'}}
                                        //ref={(ref) => this.uploadIC = ref}
                                        type="file" 
                                        name="iccopy"
                                        onChange={this.handleChange} 
                                        />
                                        {/* <button onClick={this.browseFile} name="iccopy" className="btn_primary Upload-input">Select File</button> */}
                                    </div>
                                </FileDragAndDrop>
                      </div>; 
        }else{
            UploadIC = <div className="after-drop">   
                            {this.renderDropFiles('iccopy')}  
                            <button onClick={this.cancelIC} className="btn_primary cancel-button">Cancel</button>                            
                    </div>; 
        }

        if (!this.state.payslipDropped){
            UploadPayslip = <div className="Drag-drop">
                                <FileDragAndDrop name='payslip' onDrop={this.handlePayDrop}>
                                    <div className="drop-zone">
                                        <h5 className="Title" >Drag and drop file here...</h5>
                                        <h6 className="Subtitle" >or</h6>
                                        <input className="Upload-input"
                                        //style={{display: 'none'}}
                                        //ref={(ref) => this.uploadIC = ref}
                                        type="file" 
                                        name="payslip"
                                        onChange={this.handleChange} 
                                        />
                                        {/* <button onClick={this.browseFile} name="iccopy" className="btn_primary Upload-input">Select File</button> */}
                                    </div>
                                </FileDragAndDrop>
                      </div>; 
        }else{
            UploadPayslip = <div className="after-drop">   
                            {this.renderDropFiles('payslip')}  
                            <button onClick={this.cancelPayslip} className="btn_primary cancel-button">Cancel</button>                            
                    </div>; 
        }

        return (
            <div className="App-body">
            <div className="App-content">
                <form className="Form">

                    <div className="Upload-row">
                            <label className="form-label">1. Upload your IC Copy</label>
                            {UploadIC}
                            {this.renderErrorText('iccopy')}
                    </div>

                    <div className="Upload-row">
                        <label className="form-label">2. Upload your Pay Slip</label>
                        {UploadPayslip}
                        {this.renderErrorText('payslip')}
                    </div>
                </form>
            </div>
            </div>
        );
    }
}

export default connect(null, { formUpdate, formValidate })(Upload);
