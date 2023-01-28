"use strict";

import React from "react";

import DatePicker from "../core/DatePicker.react";
import DatePickerStore from "../../stores/DatePickerStore";

import { FormatDateInt as FormatDate } from "../../common/DateAddons";

class InputBoxDateDate extends React.Component {
    render() {
        return <div id={this.props.id} className="modal" style={this.props.style}>
            <div className="modal-content">
                <div className="row">
                    <div className="col">
                        <DatePicker id={this.props.id + "##dateBeginPicker"} caption={this.props.dateBeginCaption} defaultValue={this.props.dateBeginDefault == null ? FormatDate(new Date()) : this.props.dateBeginDefault}></DatePicker>
                    </div>
                    <div className="col">
                        <DatePicker id={this.props.id + "##dateEndPicker"} caption={this.props.dateEndCaption} defaultValue={this.props.dateEndDefault == null ? FormatDate(new Date()) : this.props.dateEndDefault}></DatePicker>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Отмена</a>
                <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat" onClick={this._onOkClick.bind(this)}>OK</a>
            </div>
        </div>;
    }
    _onOkClick(event) {
        let dateBegin = DatePickerStore.getValue(this.props.id + "##dateBeginPicker");
        let dateEnd = DatePickerStore.getValue(this.props.id + "##dateEndPicker");
        this.props.onOkClick(dateBegin, dateEnd, this.props.extendedProps);
    }
};

export default InputBoxDateDate;