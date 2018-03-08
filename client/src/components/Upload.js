import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formUpdate } from '../actions';
import FileDragAndDrop from 'react-file-drag-and-drop';

class Upload extends Component {
    constructor(props) {
        super(props);
        this.handleDrop = this.handleDrop.bind(this);
        //this.onChange = this.onChange.bind(this);
    }
    
    handleDrop(dataTransfer) {
        console.log('attachment out state:',dataTransfer.files[0]);
        this.props.formUpdate({ prop: 'iccopy', value: dataTransfer.files[0]})
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
                                <FileDragAndDrop onDrop={this.handleDrop}>
                                    Drop files here...
                                </FileDragAndDrop>
                            </div>
                            <b>OR</b>
                            <input 
                                className = "form-control"
                                type="file" 
                                onChange={event => this.props.formUpdate({ prop: 'iccopy', value: event.target.files[0] })} 
                            />
                    </div>

                    <div className="Upload-row">
                        <label className="form-label">2. Upload your Pay Slip</label>
                        <div className="Drag-drop">
                            <FileDragAndDrop onDrop={this.handleDrop}>
                                <h5>Drop files here...</h5>
                            </FileDragAndDrop>
                        </div>
                        <b>OR</b>
                        <input 
                            className="form-control"
                            type="file"
                            onChange={event => this.props.formUpdate({ prop: 'payslip', value: event.target.files[0] })}
                        />
                    </div>
                </form>
            </div>
            </div>
        );
    }
}

export default connect(null, { formUpdate })(Upload);
