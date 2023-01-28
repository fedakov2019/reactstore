"use strict";

import React from "react";

import IdentificationRrzActionCreator from "../../actions/IdentificationRrzActionCreator";

import DatePicker from "../core/DatePicker.react";
import DatePickerStore from "../../stores/DatePickerStore";

import ButtonGo from "../simple/ButtonGo.react";

class IdentificationRrzParams extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            firstName: null,
            middleName: null,
            lastName: null,
            birthday: null,
            polisSerie: null,
            polisNumber: null,
            emptyMiddleName: false
        }
    }

    componentWillMount()
	{
		let tmp=Object.assign({}, this.state);
		if (this.props.firstName!=null)
		{
			tmp.firstName=this.props.firstName;
		}
		if (this.props.lastName!=null)
		{
			tmp.lastName=this.props.lastName;
		}
		if (this.props.middleName!=null)
		{
			tmp.middleName=this.props.middleName;
			tmp.emptyMiddleName=false;
		}
		else
		{
			tmp.middleName="";
			tmp.emptyMiddleName=true;
		}
		if (this.props.birthday!=null)
		{
			tmp.birthday=this.props.birthday;
		}
		if (this.props.polisSerie!=null)
		{
			tmp.polisSerie=this.props.polisSerie;
		}
		if (this.props.polisNumber!=null)
		{
			tmp.polisNumber=this.props.polisNumber;
		}
		this.setState(tmp);
	}
	componentDidMount()
	{
		$("#"+this.props.id+"DatesTreatment").trigger("keydown");
	}
	render()
	{
		return 	<div>
					<div>
						<div className="row">
							<div className="input-field col s4">
								<input id={this.props.id+"##lastName"} type="text" onChange={(event) => {this.setState({lastName:event.currentTarget.value});}} value={this.state.lastName}></input>
								<label htmlFor={this.props.id+"##lastName"}>Фамилия</label>
							</div>
							<div className="input-field col s4">
								<input id={this.props.id+"##firstName"} type="text" onChange={(event) => {this.setState({firstName:event.currentTarget.value});}} value={this.state.firstName}></input>
								<label htmlFor={this.props.id+"##firstName"}>Имя</label>
							</div>
							<div className="input-field col s4">
								<input id={this.props.id+"##middleName"} type="text" onChange={(event) => {this.setState({middleName:event.currentTarget.value});}} value={this.state.middleName}></input>
								<label htmlFor={this.props.id+"##middleName"}>Отчество</label>
							</div>
						</div>
						<div className="row">
							<div className="col s8">
								<DatePicker id={this.props.id+"##birthday"} defaultValue={this.state.birthday} caption="Дата рождения" allowEmpty={true}></DatePicker>
							</div>
							<div className=" col s2">
								<input className="filled-in" type="checkBox" checked={this.state.emptyMiddleName?"checked":null} id={this.props.id+"##emptyMiddleName"} onChange={(event) => {this.setState({emptyMiddleName:!this.state.emptyMiddleName});}}></input>
								<label htmlFor={this.props.id+"##emptyMiddleName"}>Нет отчества</label>
							</div>
						</div>
						<div className="row">
							<div className="input-field col s2">
								<input id={this.props.id+"##polisSerie"} type="text" onChange={(event) => {this.setState({polisSerie:event.currentTarget.value});}} value={this.state.polisSerie}></input>
								<label htmlFor={this.props.id+"##polisSerie"}>Серия полиса</label>
							</div>
							<div className="input-field col s4">
								<input id={this.props.id+"##polisNumber"} type="text" onChange={(event) => {this.setState({polisNumber:event.currentTarget.value});}} value={this.state.polisNumber}></input>
								<label htmlFor={this.props.id+"##polisNumber"}>Номер полиса</label>
							</div>
							<div className="input-field col s6">
								<textarea disabled id={this.props.id+"DatesTreatment"} type="text" defaultValue={this.props.datesTreatment} className="materialize-textarea"></textarea>
								<label htmlFor={this.props.id+"DatesTreatment"}>Даты лечения</label>
							</div>
						</div>
						<div className="row">
							<div className="col s4">
								<ButtonGo onClick={(event) => {
		                            IdentificationRrzActionCreator.setParams({
								    firstName:this.state.firstName,
								    middleName:this.state.middleName,
								    lastName:this.state.lastName,
								    emptyMiddleName:this.state.emptyMiddleName,
								    birthday:DatePickerStore.getValue(this.props.id+"##birthday"),
								    polisSerie:this.state.polisSerie,
								    polisNumber:this.state.polisNumber
								});
		                    }}>Проверить</ButtonGo>
							</div>
						</div>
					</div>
				</div>;
	}
};

module.exports=IdentificationRrzParams;