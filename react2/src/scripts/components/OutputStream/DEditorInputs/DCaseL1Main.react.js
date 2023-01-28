"use strict";

import React from "react";

import DatePicker from "../../core/DatePicker.react";
import DropDownList from "../../core/DropDownList.react";

class DCaseL1Main extends React.Component {
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
                <div className="col s2">Профиль МП</div>
                <div className="col s10">
                    <DropDownList
                        data-list-id="ProfileSelector"
                        data-list-controller="dict/Profile"
                        data-list-def-txt=""
                        idSelected={this.state.value.profil}
                        style={{ maxWidth: "95%", minWidth: 100 + "px" }}
                        onChange={
                            (props, state, value) => {
                                this.setState({ value: Object.assign({}, this.state.value, { profil: value }) });
                            }}></DropDownList>
                </div>
            </div>
            <div className="row">
                <div className="col s2">Профиль койки</div>
                <div className="col s10">
                    <DropDownList
                        data-list-id="ProfileKSelector"
                        data-list-controller="dict/ProfileK"
                        data-list-def-txt=""
                        idSelected={this.state.value.profilK}
                        style={{ maxWidth: "95%", minWidth: 100 + "px" }}
                        onChange={
                            (props, state, value) => {
                                this.setState({ value: Object.assign({}, this.state.value, { profilK: value }) });
                            }}></DropDownList>
                </div>
            </div>
            <div className="row">
                <div className="col s2">Специальность</div>
                <div className="col s10">
                    <DropDownList
                        data-list-id="PrvsSelector"
                        data-list-controller="dict/Speciality"
                        data-list-def-txt=""
                        idSelected={this.state.value.prvs}
                        style={{ maxWidth: "95%", minWidth: 100 + "px" }}
                        onChange={
                            (props, state, value) => {
                                this.setState({ value: Object.assign({}, this.state.value, { prvs: value }) });
                            }}></DropDownList>
                </div>
            </div>
            <div className="row">
                <div className="col s2">Признак детского профиля</div>
                <div className="col s10">
                    <DropDownList
                        data-list-id="DetSelector"
                        data-list-controller="dict/DetProfile"
                        data-list-def-txt=""
                        idSelected={this.state.value.det}
                        style={{ maxWidth: "95%", minWidth: 100 + "px" }}
                        onChange={
                            (props, state, value) => {
                                this.setState({ value: Object.assign({}, this.state.value, { det: value }) });
                            }}></DropDownList>
                </div>
            </div>
            <div className="row">
                <div className="col s2">Цель посещения</div>
                <div className="col s10">
                    <DropDownList
                        data-list-id="PCelSelector"
                        data-list-controller="dict/GoalFederal"
                        data-list-def-txt=""
                        idSelected={this.state.value.pCel}
                        style={{ maxWidth: "95%", minWidth: 100 + "px" }}
                        onChange={
                            (props, state, value) => {
                                this.setState({ value: Object.assign({}, this.state.value, { pCel: value }) });
                            }}></DropDownList>
                </div>
            </div>
            <div className="row">
                <div className="col s2">Диагноз первичный</div>
                <div className="col s4">
                    <input type="text" id="ds0" value={this.state.value.ds0}
                        onChange={
                            event => {
                                event.preventDefault();
                                event.stopPropagation();
                                this.setState({ value: Object.assign({}, this.state.value, { ds0: event.currentTarget.value }) });
                            }}></input>
                </div>
                <div className="col s2">Диагноз основной</div>
                <div className="col s4">
                    <input type="text" id="ds1" value={this.state.value.ds1}
                        onChange={
                            event => {
                                event.preventDefault();
                                event.stopPropagation();
                                this.setState({ value: Object.assign({}, this.state.value, { ds1: event.currentTarget.value }) });
                            }}></input>
                </div>
            </div>
            <div className="row">
                <div className="col s2">Диагноз сопутствующ. (через ;)</div>
                <div className="col s4">
                    <input type="text" id="ds2" value={this.state.value.ds2}
                        onChange={
                            event => {
                                event.preventDefault();
                                event.stopPropagation();
                                this.setState({ value: Object.assign({}, this.state.value, { ds2: event.currentTarget.value }) });
                            }}></input>
                </div>
                <div className="col s2">Диагноз осл. (через ;)</div>
                <div className="col s4">
                    <input type="text" id="ds3" value={this.state.value.ds3}
                        onChange={
                            event => {
                                event.preventDefault();
                                event.stopPropagation();
                                this.setState({ value: Object.assign({}, this.state.value, { ds3: event.currentTarget.value }) });
                            }}></input>
                </div>
            </div>
            <div className="row">
                <div className="col s2">№ истории болезни</div>
                <div className="col s10">
                    <input type="text" id="nHistory" value={this.state.value.nHistory}
                        onChange={
                            event => {
                                event.preventDefault();
                                event.stopPropagation();
                                this.setState({ value: Object.assign({}, this.state.value, { nHistory: event.currentTarget.value }) });
                            }}></input>
                </div>
            </div>
            <div className="row">
                <div className="col s2">Комментарий к случаю</div>
                <div className="col s10">
                    <input type="text" id="comentSl" value={this.state.value.comentSl}
                        onChange={
                            event => {
                                event.preventDefault();
                                event.stopPropagation();
                                this.setState({ value: Object.assign({}, this.state.value, { comentSl: event.currentTarget.value }) });
                            }}></input>
                </div>
            </div>
        </div>;
    }
}

export default DCaseL1Main;