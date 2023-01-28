"use strict";

import React from "react";

import DatePicker from "../../core/DatePicker.react";
import DropDownList from "../../core/DropDownList.react";

class DCaseL0Main extends React.Component {
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
                <div className="col s2">Напр. на лечение</div>
                <div className="col s6">
                    <DropDownList
                        data-list-id="NprMoSelector"
                        data-list-controller="dict/MedicalOrgs"
                        data-list-def-txt="МО, направившее на лечение"
                        idSelected={this.state.value.nprMo}
                        style={{ maxWidth: "95%", minWidth: 100 + "px" }}
                        onChange={
                            (props, state, value) => {
                                this.setState({ value: Object.assign({}, this.state.value, { nprMo: value }) });
                            }}></DropDownList>
                </div>
                <div className="col s4">
                    <DatePicker id="nprDatePicker" defaultValue={this.state.value.nprDate} caption="Дата напр." allowEmpty={true}
                        onChange={
                            (props, state, value) => {
                                this.setState({ value: Object.assign({}, this.state.value, { nprDate: value }) });
                            }}
                    ></DatePicker>
                </div>
            </div>
            <div className="row">
                <div className="col s2">Результат</div>
                <div className="col s10">
                    <DropDownList
                        data-list-id="RsltSelector"
                        data-list-controller="dict/Result"
                        data-list-def-txt=""
                        idSelected={this.state.value.rslt}
                        style={{ maxWidth: "95%", minWidth: 100 + "px" }}
                        onChange={
                            (props, state, value) => {
                                this.setState({ value: Object.assign({}, this.state.value, { rslt: value }) });
                            }}></DropDownList>
                </div>
            </div>
            <div className="row">
                <div className="col s2">Исход</div>
                <div className="col s10">
                    <DropDownList
                        data-list-id="IshodSelector"
                        data-list-controller="dict/Ishod"
                        data-list-def-txt=""
                        idSelected={this.state.value.ishod}
                        style={{ maxWidth: "95%", minWidth: 100 + "px" }}
                        onChange={
                            (props, state, value) => {
                                this.setState({ value: Object.assign({}, this.state.value, { ishod: value }) });
                            }}></DropDownList>
                </div>
            </div>
            <div className="row">
                <div className="col s2">Способ оплаты</div>
                <div className="col s10">
                    <DropDownList
                        data-list-id="IdspSelector"
                        data-list-controller="dict/PaymentCode"
                        data-list-def-txt=""
                        idSelected={this.state.value.idsp}
                        style={{ maxWidth: "95%", minWidth: 100 + "px" }}
                        onChange={
                            (props, state, value) => {
                                this.setState({ value: Object.assign({}, this.state.value, { idsp: value }) });
                            }}></DropDownList>
                </div>
            </div>
            <div className="row">
                <div className="col s2">Форма МП</div>
                <div className="col s10">
                    <DropDownList
                        data-list-id="FormSelector"
                        data-list-controller="dict/Form"
                        data-list-def-txt=""
                        idSelected={this.state.value.forPom}
                        style={{ maxWidth: "95%", minWidth: 100 + "px" }}
                        onChange={
                            (props, state, value) => {
                                this.setState({ value: Object.assign({}, this.state.value, { forPom: value }) });
                            }}></DropDownList>
                </div>
            </div>
            <div className="row">
                <div className="col s2">Вид МП</div>
                <div className="col s10">
                    <DropDownList
                        data-list-id="VidSelector"
                        data-list-controller="dict/Vid"
                        data-list-def-txt=""
                        idSelected={this.state.value.vidPom}
                        style={{ maxWidth: "95%", minWidth: 100 + "px" }}
                        onChange={
                            (props, state, value) => {
                                this.setState({ value: Object.assign({}, this.state.value, { vidPom: value }) });
                            }}></DropDownList>
                </div>
            </div>
        </div>;
    }
}

export default DCaseL0Main;