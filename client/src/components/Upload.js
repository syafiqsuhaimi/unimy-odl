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
        this.state = {
            icDrop: '',
            payslipDrop: '',
            formErrors: {
                iccopy: '',
                payslip: ''
            },
            iccopyValid: false,
            payslipValid: false,
            formValid: false
        }
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.files[0];
        this.props.formUpdate({ prop: [name], value });
        this.validateField(name, value);
    }

    handleICDrop(dataTransfer) {
        this.props.formUpdate({ prop: 'iccopy', value: dataTransfer.files[0] })
        console.log('attachment out state:',dataTransfer.files[0]);
        this.validateField('iccopy', dataTransfer.files[0]);
        this.setState({ icDrop: dataTransfer.files[0].name });
    }

    handlePayDrop(dataTransfer) {
        this.props.formUpdate({ prop: 'payslip', value: dataTransfer.files[0]})
        console.log('attachment out state:',dataTransfer.files[0]);
        this.validateField('payslip', dataTransfer.files[0]);
        this.setState({ payslipDrop: dataTransfer.files[0].name });
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
                <div>{this.state.icDrop}</div>
            );
        }

        if (name === 'payslip') {
            return (
                <div>{this.state.payslipDrop}</div>
            );
        }
    }

    render() {
        return (
            <div className="App-body">
            <div className="App-content">
                <form className="Form">

                    <div className="Upload-row">
                            <label className="form-label">1. Upload your IC Copy</label>
                            <div className="Drag-drop">
                                <FileDragAndDrop name='iccopy' onDrop={this.handleICDrop}>
                                    Drop files here...
                                    <input 
                                        className = "Upload-input"
                                        type="file" 
                                        name="iccopy"
                                        onChange={this.handleChange} 
                                    />
                                    {this.renderDropFiles('iccopy')}
                                </FileDragAndDrop>
                            </div>
                            {this.renderErrorText('iccopy')}
                    </div>

                    <div className="Upload-row">
                        <label className="form-label">2. Upload your Pay Slip</label>
                        <div className="Drag-drop">
                            <FileDragAndDrop name='payslip' onDrop={this.handlePayDrop}>
                                Drop files here...
                                <input 
                                    type="file"
                                    name="payslip"
                                    onChange={this.handleChange}
                                />
                                {this.renderDropFiles('payslip')}
                            </FileDragAndDrop>
                        </div>
                        {this.renderErrorText('payslip')}
                    </div>
                </form>
            </div>
            </div>
        );
    }
}

export default connect(null, { formUpdate, formValidate })(Upload);
