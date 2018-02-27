import React, { Component } from 'react';
import logo from './logo_unimy.jpg';
import PersonalInfo from './components/personalInfo/PersonalInfo';
import KinInfo from './components/kinInfo/KinInfo';
import Upload from './components/uploadDocument/Upload';

class App extends Component {
  constructor(props) {
      super(props);
      this.moveSectionClick = this.moveSectionClick.bind(this);
      this.state = {componentIndex: 0};
  }

  moveSectionClick(index) {
      this.setState({componentIndex: index});
  }

  render() {
    const componentIndex = this.state.componentIndex;
    
    let Form, Footer, index = null;

    if (componentIndex === 0) {
        index = 0
        Form = <PersonalInfo />; 
        Footer = <footer className="App-footer">
                    <button onClick={this.moveSectionClick.bind(this,index+1)} className="btn_primary">Continue</button>
                  </footer>; 
    } else if(componentIndex === 1) {
        index = 1
        Form = <KinInfo />; 
        Footer = <footer className="App-footer">
                    <button onClick={this.moveSectionClick.bind(this,index-1)} className="btn_secondary">Previous</button>
                    <button onClick={this.moveSectionClick.bind(this,index+1)} className="btn_primary">Continue</button>
                 </footer>; 
    } else if(componentIndex === 2) {
      index = 2
      Form = <Upload />; 
      Footer = <footer className="App-footer">
                  <button onClick={this.moveSectionClick.bind(this,index+1)} className="btn_primary" style={{ width: 250 }}>Submit your application</button>
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

export default App;
