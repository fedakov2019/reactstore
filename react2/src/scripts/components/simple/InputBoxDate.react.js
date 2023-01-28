"use strict";

import React from "react";

import DatePicker from "../core/DatePicker.react";
import DatePickerStore from "../../stores/DatePickerStore";

import {FormatDateInt as FormatDate} from "../../common/DateAddons";

class InputBoxDate extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return <div id={this.props.id} className="modal" style={this.props.style}>
					<div className="modal-content">
						<DatePicker id={this.props.id + "##datePicker"} caption={this.props.dateCaption} defaultValue={this.props.dateDefault==null?FormatDate(new Date()):this.props.dateDefault}></DatePicker>
					</div>
					<div className="modal-footer">
						<a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Отмена</a>
						<a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat" onClick={this._onOkClick.bind(this)}>OK</a>
					</div>
				</div>;
    }
	_onOkClick(event)
	{
		let date=DatePickerStore.getValue(this.props.id+"##datePicker");
		this.props.onOkClick(date);
	}
};

export default InputBoxDate;