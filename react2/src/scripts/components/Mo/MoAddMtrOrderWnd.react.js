"use strict";

import React from "react";

import DatePicker from "../core/DatePicker.react";
import DatePickerStore from "../../stores/DatePickerStore";

import ButtonOk from "../simple/ButtonOk.react";

import {uniNumber} from "../../common/NumberExtensions";

class MoAddMtrOrderWnd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            refundAp: null,
            refundDs: null,
            refundKs:null,
            refundSmp:null
    };
    }

    render() {
        return <div id={this.props.id} className="modal" style={this.props.style}>
				    <div className="modal-content" style={{ width: "100%", height: "90%" }}>
                        <div className="row">
                            <div className="col s2"></div>
                            <div className="input-field col s12">
                                <label htmlFor={this.props.id+"##date"}  className="active">Дата указания</label>
                                <DatePicker id={this.props.id+"##date"} defaultValue={new Date()}></DatePicker>
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id={this.props.id+"##ap"} type="text" className="validate" value={this.state.refundAp} onChange={(event)=> { this.setState({refundAp:uniNumber(event.currentTarget.value)}); }}></input>
                                <label htmlFor={this.props.id +"##ap"}>Сумма удержания АП</label>
                            </div>
                            <div className="input-field col s6">
                                <input id={this.props.id+"##ds"} type="text" className="validate" value={this.state.refundDs} onChange={(event)=> { this.setState({refundDs:uniNumber(event.currentTarget.value)}); }}></input>
                                <label htmlFor={this.props.id+"##ds"}>Сумма удержания ДС</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                                <input id={this.props.id+"##ks"} type="text" className="validate" value={this.state.refundKs} onChange={(event)=> { this.setState({refundKs:uniNumber(event.currentTarget.value)}); }}></input>
                                <label htmlFor={this.props.id+"##ks"}>Сумма удержания КС</label>
                            </div>
                            <div className="input-field col s6">
                                <input id={this.props.id+"##smp"} type="text" className="validate" value={this.state.refundSmp} onChange={(event)=> { this.setState({refundSmp:uniNumber(event.currentTarget.value)}); }}></input>
                                <label htmlFor={this.props.id+"##smp"}>Сумма удержания СМП</label>
                            </div>
                        </div>
                        <br/>
                        <div className="row">
                            <div className="col s4">&nbsp;</div>
                            <div className="col s4">
                                <ButtonOk onClick={() => {
                                    if (this.props.onOkClick != null) {
                                        this.props.onOkClick(this.props.idOrder, DatePickerStore.getValue(this.props.id+"##date"), this.state, this.props);
                                        }   
                                    }}>Создать</ButtonOk>
                            </div>
                        </div>
                    </div>
                </div>;
    }
}

export default MoAddMtrOrderWnd;