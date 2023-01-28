"use strict";

import React from "react";

import DatePicker from "../core/DatePicker.react";
import DatePickerStore from "../../stores/DatePickerStore";

import {FormatDateInt as FormatDate} from "../../common/DateAddons";

class InputBoxDateString extends React.Component{
    constructor (props) {
        super(props);
		this.state={
		    text:null,
		    date:this.props.dateDefault==null?FormatDate(new Date()):this.props.dateDefault
		};
	}
	render()
	{
		return 	<div id={this.props.id} className="modal" style={this.props.style}>
					<div className="modal-content">
						<DatePicker id={this.props.id+"##datePicker"} caption={this.props.dateCaption} defaultValue={this.state.date}></DatePicker>
						<div className="input-field">
							<input id={this.props.id+"##text"} type="text" className="validate" onChange={this._onTextChange.bind(this)} defaultValue={this.state.text} value={this.state.text}></input>
							<label htmlFor={this.props.id+"##text"}>{this.props.textCaption}</label>
						</div>
					</div>
					<div className="modal-footer">
						<a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Отмена</a>
						<a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat" onClick={this._onOkClick.bind(this)}>OK</a>
					</div>
				</div>
	}
	_onOkClick(event)
	{
		let date=DatePickerStore.getValue(this.props.id+"##datePicker");
		this.props.onOkClick(date, this.state.text);
	}
	_onTextChange(event)
	{
		this.setState({
			text:event.currentTarget.value,
			date:DatePickerStore.getRawValue(this.props.id+"##datePicker")
		});
	}
};

export default InputBoxDateString;