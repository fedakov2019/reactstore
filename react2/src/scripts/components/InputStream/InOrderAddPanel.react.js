"use strict";

import React from "react";

import DatePicker from "../core/DatePicker.react";
import DatePickerStore from "../../stores/DatePickerStore";

import ButtonOk from "../simple/ButtonOk.react";

import { uniNumber } from "../../common/NumberExtensions";

class InOrderAddPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: null,
            sum: 0
        };
    }
    render() {
        return <div className="row">
            <div className="input-field col s3">
                <input id={this.props.id + "##number"} type="text" className="validate" value={this.state.number} onChange={(event) => { this.setState({ number: event.currentTarget.value }); }}></input>
                <label htmlFor={this.props.id + "##number"}>№ платёжного поручения</label>
            </div>
            <div className="input-field col s3">
                <DatePicker id={this.props.id + "##date"} defaultValue={new Date()}></DatePicker>
            </div>
            <div className="input-field col s3">
                <input id={this.props.id + "##sum"} type="text" className="validate" value={this.state.sum} onChange={(event) => { this.setState({ sum: uniNumber(event.currentTarget.value) }); }}></input>
                <label htmlFor={this.props.id + "##sum"}>Сумма</label>
            </div>
            <div className="col s3">
                <ButtonOk onClick={() => {
                    if (this.props.onOkClick != null) {
                        this.props.onOkClick(this.state.number, DatePickerStore.getValue(this.props.id + "##date"), this.state.sum);
                    }
                }}>Создать</ButtonOk>
            </div>
        </div>;
    }
};

export default InOrderAddPanel;