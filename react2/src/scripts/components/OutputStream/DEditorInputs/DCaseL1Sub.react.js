"use strict";

import React from "react";

import DatePicker from "../../core/DatePicker.react";
import DropDownList from "../../core/DropDownList.react";

class DCaseL1Sub extends React.Component {
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
                <div className="col s4">Период случая</div>
                <div className="col s4">
                    <DatePicker id="date1Picker" defaultValue={this.state.value.date1} caption="С" allowEmpty={false}
                        onChange={
                            (props, state, value) => {
                                this.setState({ value: Object.assign({}, this.state.value, { date1: value }) });
                            }}
                    ></DatePicker>
                </div>
                <div className="col s4">
                    <DatePicker id="date2Picker" defaultValue={this.state.value.date2} caption="По" allowEmpty={false}
                        onChange={
                            (props, state, value) => {
                                this.setState({ value: Object.assign({}, this.state.value, { date2: value }) });
                            }}
                    ></DatePicker>
                </div>
            </div>
            <div className="row">
                <div className="col s4">Признак диспансеризации</div>
                <div className="col s8">
                    <input type="text" id="disp" value={this.state.value.disp}
                        onChange={
                            event => {
                                event.preventDefault();
                                event.stopPropagation();
                                this.setState({ value: Object.assign({}, this.state.value, { disp: event.currentTarget.value }) });
                            }}></input>
                </div>
            </div>
            <div className="row">
                <div className="col s4">Продолжительность госпитализации (к/дн, пац/дн)</div>
                <div className="col s8">
                    <input type="text" id="kd" value={this.state.value.kd}
                        onChange={
                            event => {
                                event.preventDefault();
                                event.stopPropagation();
                                this.setState({ value: Object.assign({}, this.state.value, { kd: event.currentTarget.value }) });
                            }}></input>
                </div>
            </div>
            <div className="row">
                <div className="col s2">Характер осн. заболевания</div>
                <div className="col s10">
                    <DropDownList
                        data-list-id="CZabSelector"
                        data-list-controller="dict/CZab"
                        data-list-def-txt=""
                        idSelected={this.state.value.cZab}
                        style={{ maxWidth: "95%", minWidth: 100 + "px" }}
                        onChange={
                            (props, state, value) => {
                                this.setState({ value: Object.assign({}, this.state.value, { cZab: value }) });
                            }}></DropDownList>
                </div>
            </div>
            <div className="row">
                <div className="col s2">Диспансерное наблюдение</div>
                <div className="col s10">
                    <DropDownList
                        data-list-id="DNSelector"
                        data-list-controller="dict/DispObservation"
                        data-list-def-txt=""
                        idSelected={this.state.value.dn}
                        style={{ maxWidth: "95%", minWidth: 100 + "px" }}
                        onChange={
                            (props, state, value) => {
                                this.setState({ value: Object.assign({}, this.state.value, { dn: value }) });
                            }}></DropDownList>
                </div>
            </div>
            <div className="row">
                <div className="col s4">Признак реабилитации</div>
                <div className="col s8">
                    <input type="text" id="reab" value={this.state.value.reab}
                        onChange={
                            event => {
                                event.preventDefault();
                                event.stopPropagation();
                                this.setState({ value: Object.assign({}, this.state.value, { reab: event.currentTarget.value }) });
                            }}></input>
                </div>
            </div>
            <div className="row">
                <div className="col s4">Кол-во единиц оплаты МП</div>
                <div className="col s8">
                    <input type="text" id="edCol" value={this.state.value.edCol}
                        onChange={
                            event => {
                                event.preventDefault();
                                event.stopPropagation();
                                this.setState({ value: Object.assign({}, this.state.value, { edCol: event.currentTarget.value }) });
                            }}></input>
                </div>
            </div>
        </div>;
    }
}

export default DCaseL1Sub;