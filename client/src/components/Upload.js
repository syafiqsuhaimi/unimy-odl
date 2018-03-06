import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formUpdate } from '../actions';
import FileDragAndDrop from 'react-file-drag-and-drop';

class Upload extends Component {
    constructor(props) {
        super(props);
        this.handleDrop = this.handleDrop.bind(this);
        //this.onChange = this.onChange.bind(this);
        this.state ={
            file:null
        }
    }
    
    handleDrop(dataTransfer) {
        this.state.file = dataTransfer.files;
        console.log(this.state.file,"successs");
    }
    /*
    onChange(e) {
        this.setState({file:e.target.files[0]})
    }
    */
    render() {
        return (
            <div className="App-body">
            <div className="App-content">
                <form className="Form">

                    <div className="Upload-row">
                            <label className="Upload-label">1. Upload your IC Copy</label>
                            <div className="Drag-drop">
                                <FileDragAndDrop onDrop={this.handleDrop}>
                                    Drop files here...
                                    <input 
                                        type="file" 
                                        onChange={event => this.props.formUpdate({ prop: 'iccopy', value: event.target.files[0] })} 
                                    />
                                </FileDragAndDrop>
                                
                            </div>
                    </div>

                    <div className="Form-row">
                        <label className="Form-label">2. Upload your Pay Slip</label>
                        <div className="Drag-drop">
                            <FileDragAndDrop onDrop={this.handleDrop}>
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