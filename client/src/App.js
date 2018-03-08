import React, { Component } from 'react';
import { connect } from 'react-redux';
import Steps, { Step } from 'rc-steps';
import MediaQuery from 'react-responsive';

import { customMedia } from './Variables';
import { formSubmit } from './actions';
import logo from './logo_unimy.jpg';
import PersonalInfo from './components/PersonalInfo';
import KinInfo from './components/KinInfo';
import Upload from './components/Upload';

class App extends Component {
  constructor(props) {
      super(props);
      this.moveSectionClick = this.moveSectionClick.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state = {componentIndex: 0}
  }

  moveSectionClick(index) {
    this.setState({componentIndex: index});
  }

  handleSubmit(){
    const {
      name, ic, nationality, dob, 
      gender, address, postcode, negeri, 
      phone, email, tax, epf, occupation,
      gross, nett, depend, kinname, relation, 
      kinnat, kinic, kinadd, kinpost, 
      kinstate, kinphone, kinmail,
      kintax, kinepf, kinoccu,
      kingross, kinnett, kindepend, iccopy, payslip
    } = this.props;

    this.props.formSubmit({ 
      name, ic, nationality, dob, 
      gender, address, postcode, negeri, 
      phone, email, tax, epf, occupation,
      gross, nett, depend, kinname, relation, 
      kinnat, kinic, kinadd, kinpost, 
      kinstate, kinphone, kinmail,
      kintax, kinepf, kinoccu,
      kingross, kinnett, kindepend, iccopy, payslip
    });
  }

  render() {
    const componentIndex = this.state.componentIndex;
    let Form, Footer, index = null;

    if (componentIndex === 0) {
       if (this.props.isWorking){
         index = 1;
       }else{
         index = 0;
       }
        Form = <PersonalInfo />; 
        Footer = <footer className="App-footer">
                    <button onClick={this.moveSectionClick.bind(this,index+1)} className="btn_primary" disabled={this.props.buttonDisabled}>Continue</button>
                  </footer>; 
    } else if(componentIndex === 1) {
        index = 1
        Form = <KinInfo />; 
        Footer = <footer className="App-footer">
                    <button onClick={this.moveSectionClick.bind(this,index-1)} className="btn_secondary">Previous</button>
                    <button onClick={this.moveSectionClick.bind(this,index+1)} className="btn_primary" disabled={this.props.buttonDisabled}>Continue</button>
                 </footer>; 
    } else if(componentIndex === 2) {
      index = 2
      Form = <Upload />; 
      Footer = <footer className="App-footer">
                  <button 
                    onClick={this.handleSubmit} 
                    className="btn_primary" 
                    style={{ width: 250 }}
                    disabled={this.props.buttonDisabled}
                  >
                    Submit your application
                  </button>
               </footer>; 
    }

    return (
   <div className="App">
      <div className="Container">
        <header className="App-header">
           <img src={logo} className="App-logo" alt="logo" />
           <p className="App-title">Application Form</p> 
           <div className="Header-end"></div>
        </header>
        {Form}
        <div className="App-progress-bar">
        <MediaQuery query={customMedia.desktop}>
          <Steps direction="vertical" className="progressContainer" current={index}>
            <Step 
              icon="user"
              title="Personal Information" 
              description="Tell us your basic information to help us proceed in your application" 
              style={{ marginBottom: 50 }}
            />
            <Step 
              icon="file"
              title="Next of Kin Information" 
              description="If you are a working applicant, you can skip this"
              style={{ marginBottom: 50 }} 
            />
            <Step 
              icon="file-text"
              title="Documents Upload" 
              description="Please provide us with the required documents to process your application" 
            />
          </Steps>
        </MediaQuery>
        <MediaQuery query={customMedia.mobile}>
          <Steps 
            direction="horizontal" 
            labelPlacement="vertical"
            current={index}
          >
            <Step 
              status="finish"
              icon="user"
              title="Personal Information" 
            />
            <Step 
              status="process"
              icon="file"
              title="Next of Kin Information"
            />
            <Step 
              status="wait"
              icon="file-text"
              title="Documents Upload"
            />
          </Steps>
        </MediaQuery>
        </div>
        {Footer}
      </div>
    </div>
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <h1 className="App-title">Welcome to React</h1>
      //   </header>
      //   <p className="App-intro">
      //     This is my first react app. ahhagja nbfhhad jahdaj ha had aj dhadje jadvjegdjw cjhadna s ahajdas hjashaj
      //   </p>
      // </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { 
    name, ic, nationality, dob, 
    gender, address, postcode, negeri, 
    phone, email, tax, epf, occupation,
    gross, nett, depend, kinname, relation, 
    kinnat, kinic, kinadd, kinpost, 
    kinstate, kinphone, kinmail,
    kintax, kinepf, kinoccu,
    kingross, kinnett, kindepend, iccopy, payslip, buttonDisabled, isWorking
  } = state.form;

  return {
    name, ic, nationality, dob, 
    gender, address, postcode, negeri, 
    phone, email, tax, epf, occupation,
    gross, nett, depend, kinname, relation, 
    kinnat, kinic, kinadd, kinpost, 
    kinstate, kinphone, kinmail,
    kintax, kinepf, kinoccu,
    kingross, kinnett, kindepend, iccopy, payslip, buttonDisabled, isWorking
  }
}

export default connect(mapStateToProps, { formSubmit })(App);
