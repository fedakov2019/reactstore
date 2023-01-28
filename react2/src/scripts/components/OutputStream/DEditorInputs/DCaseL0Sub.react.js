"use strict";

import React from "react";

import DatePicker from "../../core/DatePicker.react";
import DropDownList from "../../core/DropDownList.react";

class DCaseL0Sub extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: props.defaultValue };
    }

    componentDidUpdate() {
        this.props.onEdit(this.props, this.state);
    }


    render() {
        return <div className="input-field col s11">
            <div className="row">
                <div className="col s4">Период ЗС</div>
                <div className="col s4">
                    <DatePicker id="dateZ1Picker" defaultValue={this.state.value.dateZ1} caption="С" allowEmpty={false}
                        onChange={
                            (props, state, value) => {
                                this.setState({ value: Object.assign({}, this.state.value, { dateZ1: value }) });
                            }}
                    ></DatePicker>
                </div>
                <div className="col s4">
                    <DatePicker id="dateZ2Picker" defaultValue={this.state.value.dateZ2} caption="По" allowEmpty={false}
                        onChange={
                            (props, state, value) => {
                                this.setState({ value: Object.assign({}, this.state.value, { dateZ2: value }) });
                            }}
                    ></DatePicker>
                </div>
            </div>
            <div className="row">
                <div className="col s4">Призн. МП в рамках 2 этапа дисп.</div>
                <div className="col s8">
                    <input type="text" id="pDisp2" value={this.state.value.pDisp2}
                        onChange={
                            event => {
                                event.preventDefault();
                                event.stopPropagation();
                                this.setState({ value: Object.assign({}, this.state.value, { pDisp2: event.currentTarget.value }) });
                            }}></input>
                </div>
            </div>
            <div className="row">
                <div className="col s4">Продолжительность госпитализации (к/дн, пац/дн)</div>
                <div className="col s8">
                    <input type="text" id="kdZ" value={this.state.value.kdZ}
                        onChange={
                            event => {
                                event.preventDefault();
                                event.stopPropagation();
                                this.setState({ value: Object.assign({}, this.state.value, { kdZ: event.currentTarget.value }) });
                            }}></input>
                </div>
            </div>
            <div className="row">
                <div className="col s4">Вес при рождении (через ;)</div>
                <div className="col s8">
                    <input type="text" id="vNovM" value={this.state.value.vNovM}
                        onChange={
                            event => {
                                event.preventDefault();
                                event.stopPropagation();
                                this.setState({ value: Object.assign({}, this.state.value, { vNovM: event.currentTarget.value }) });
                            }}></input>
                </div>
            </div>
            <div className="row">
                <div className="col s4">Особый случай (коды через ;)</div>
                <div className="col s8">
                    <input type="text" id="osSluch" value={this.state.value.osSluch}
                        onChange={
                            event => {
                                event.preventDefault();
                                event.stopPropagation();
                                this.setState({ value: Object.assign({}, this.state.value, { osSluch: event.currentTarget.value }) });
                            }}></input>
                </div>
            </div>
            <div className="row">
                <div className="col s4">Признак внутрибольничного перевода</div>
                <div className="col s8">
                    <input type="text" id="vbP" value={this.state.value.vbP}
                        onChange={
                            event => {
                                event.preventDefault();
                                event.stopPropagation();
                                this.setState({ value: Object.assign({}, this.state.value, { vbP: event.currentTarget.value }) });
                            }}></input>
                </div>
            </div>
        </div>;
    }
}

export default DCaseL0Sub;