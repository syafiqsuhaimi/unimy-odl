import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formUpdate } from '../actions';
import FileDragAndDrop from 'react-file-drag-and-drop';

class Upload extends Component {
    constructor(props) {
        super(props);
        this.handleICDrop = this.handleICDrop.bind(this);
        this.handlePayDrop = this.handlePayDrop.bind(this);
    }
    
    handleICDrop(dataTransfer) {
        this.props.formUpdate({ prop: 'iccopy', value: dataTransfer.files[0]})
        console.log('attachment out state:',dataTransfer.files[0]);
    }

    handlePayDrop(dataTransfer) {
        this.props.formUpdate({ prop: 'payslip', value: dataTransfer.files[0]})
        console.log('attachment out state:',dataTransfer.files[0]);
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
                                        onChange={event => this.props.formUpdate({ prop: 'iccopy', value: event.target.files[0] })} 
                                    />
                                </FileDragAndDrop>
                            </div>
                    </div>

                    <div className="Upload-row">
                        <label className="form-label">2. Upload your Pay Slip</label>
                        <div className="Drag-drop">
                            <FileDragAndDrop name='payslip' onDrop={this.handlePayDrop}>
                                Drop files here...
                                <input 
                                    type="file"
                                    onChange={event => this.props.formUpdate({ prop: 'payslip', value: event.target.files[0] })}
                                />
                            </FileDragAndDrop>
                        </div>
                    </div>
                </form>
            </div>
            </div>
        );
    }
}

export default connect(null, { formUpdate })(Upload);
