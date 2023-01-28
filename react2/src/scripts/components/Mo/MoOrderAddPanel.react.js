"use strict";

import React from "react";

import DatePicker from "../core/DatePicker.react";
import DatePickerStore from "../../stores/DatePickerStore";

import ButtonOk from "../simple/ButtonOk.react";

import {uniNumber} from "../../common/NumberExtensions";

class MoOrderAddPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number:null,
            sumMo:this.props.sumMo
        };
    }
    render(){ 
        return <div className="row">
        <div className="input-field col s3">
            <input id={this.props.id+"##number"} type="text" className="validate" value={this.state.idMedOrg} onChange={(event)=> { this.setState({number:event.currentTarget.value}); }}></input>
            <label htmlFor={this.props.id+"##number"}>№ счёта-фактуры</label>
        </div>
        <div className="input-field col s3">
            <DatePicker id={this.props.id+"##date"} defaultValue={new Date()}></DatePicker>
        </div>
        <div className="input-field col s3">
            <input id={this.props.id+"##sum"} type="text" pattern="[0-9]{1,}[\.|,][0-9]{0,2}" className="validate" value={this.state.sumMo} onChange={(event)=> { this.setState({sumMo:uniNumber(event.currentTarget.value)}); }}></input>
            <label className="active" htmlFor={this.props.id+"##sum"}>Сумма МО</label>
        </div>
        <div className="col s3">
            <ButtonOk onClick={() => {
            if (this.props.onOkClick != null) {
                //console.log(this.state);
                this.props.onOkClick(this.state.number, DatePickerStore.getValue(this.props.id+"##date"), this.state.sumMo);
            }
        }}>Создать</ButtonOk>
        </div>
        </div>;
    }
};

export default MoOrderAddPanel;