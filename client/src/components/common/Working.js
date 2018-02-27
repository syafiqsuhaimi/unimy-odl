import React, { Component } from 'react';

class Working extends Component {       
    render() {
        return (
        <form className="workingFormStyle">
            <div className="tax">
                <label className="Form-label">Income Tax Number</label>
                <input className="Form-input" type="number" id="income_tax_number" placeholder=""/>
                {/* <div className="Invalid-feedback">
                Please enter a valid name.
                </div> */}
            </div>

            <div className="epf">
                <label className="Form-label">EPF Number</label>
                <input className="Form-input" type="number" id="epf_number" placeholder=""/>
                {/* <div className="Invalid-feedback">
                Please enter a valid name.
                </div> */}
            </div>

            <div className="occupation">
                <label className="Form-label">Occupation</label>
                <input className="Form-input" type="text" id="occupation" placeholder=""/>
                {/* <div className="Invalid-feedback">
                Please enter a valid name.
                </div> */}
            </div>
            <div className="gross">
                <label className="Form-label">Gross Salary</label>
                <input className="Form-input" type="text" style={{width: 105}} id="gross_salary" placeholder="" required/>
                {/* <div className="Invalid-feedback">
                    Valid first name is required.
                </div> */}
                </div>
                <div className="nett">
                <label className="Form-label">Nett Salary</label>
                <input className="Form-input" type="text" style={{width: 105}} id="nett_salary" placeholder="" required/>
                {/* <div className="Invalid-feedback">
                    Valid last name is required.
                </div> */}
            </div>

            <div className="depend">
                <label className="Form-label">Number of Family Dependants</label>
                <input className="Form-input" type="number" id="number_of_family" placeholder=""/>
                {/* <div className="Invalid-feedback">
                Please enter a valid name.
                </div> */}
            </div>
        </form>
        );
    }
}

export default Working;