"use strict";

import React from "react";

import DropDownList from "../../core/DropDownList.react";
import DatePicker from "../../core/DatePicker.react";

class DPersonDoc extends React.Component {
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
                <div className="col s5">ЕНП</div>
                <div className="col s7">
                    <input type="text" id="enp" value={this.state.value.enp}
                        onChange={
                            event => {
                                event.preventDefault();
                                event.stopPropagation();
                                this.setState({ value: Object.assign({}, this.state.value, { enp: event.currentTarget.value }) });
                            }} />
                </div>
            </div>

            <div className="row">
                <div className="col s5">
                    <DropDownList
                        data-list-id="VPolisSelector"
                        data-list-controller="dict/TypePolis"
                        data-list-def-txt="Тип полиса"
                        idSelected={this.state.value.vPolis}
                        style={{ maxWidth: "95%", minWidth: 100 + "px" }}
                        onChange={
                            (props, state, value) => {
                                this.setState({ value: Object.assign({}, this.state.value, { vPolis: value }) });
                            }} />
                </div>
                <div className="col s2">
                    <input type="text" id="sPolis" value={this.state.value.sPolis}
                        onChange={
                            event => {
                                event.preventDefault();
                                event.stopPropagation();
                                this.setState({ value: Object.assign({}, this.state.value, { sPolis: event.currentTarget.value }) });
                            }}/>
                </div>
                    <div className="col s5">
                        <input type="text" id="nPolis" value={this.state.value.nPolis}
                            onChange={
                                event => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    this.setState({ value: Object.assign({}, this.state.value, { nPolis: event.currentTarget.value }) });
                                }} />
                    </div>
                </div>

                <div className="row">
                    <div className="col s5">ОКАТО территории страхования</div>
                    <div className="col s7">
                        <input type="text" id="stOkato" value={this.state.value.stOkato}
                            onChange={
                                event => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    this.setState({ value: Object.assign({}, this.state.value, { stOkato: event.currentTarget.value }) });
                                }} />
                    </div>
                </div>

                <div className="row">
                    <div className="col s5">
                        <DropDownList
                            data-list-id="DocTypeSelector"
                            data-list-controller="dict/TypeDocument"
                            data-list-def-txt="Тип документа"
                            idSelected={this.state.value.docType}
                            style={{ maxWidth: "95%", minWidth: "100px" }}
                            onChange={
                                (props, state, value) => {
                                    this.setState({ value: Object.assign({}, this.state.value, { docType: value }) });
                                }}></DropDownList>
                    </div>
                    <div className="col s2">
                        <input type="text" id="docSer" value={this.state.value.docSer}
                            onChange={
                                event => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    this.setState({ value: Object.assign({}, this.state.value, { docSer: event.currentTarget.value }) });
                                }}></input>
                    </div>
                    <div className="col s5">
                        <input type="text" id="docNum" value={this.state.value.docNum}
                            onChange={
                                event => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    this.setState({ value: Object.assign({}, this.state.value, { docNum: event.currentTarget.value }) });
                                }} />
                    </div>
                </div>
                <div className="row">
                    <div className="col s4">
                        <DatePicker id="docDate" defaultValue={this.state.value.docDate} caption="Дата выдачи док-та" allowEmpty={true}
                            onChange={
                                (props, state, value) => {
                                    this.setState({ value: Object.assign({}, this.state.value, { docDate: value }) });
                                }}
                        ></DatePicker>
                    </div>
                    <div className="col s8"></div>
                </div>
                <div>
                    <div className="col s8">
                        <input type="text" id="docOrg" value={this.state.value.docOrg}
                               onChange={
                                event => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    this.setState({ value: Object.assign({}, this.state.value, { docOrg: event.currentTarget.value }) });
                                }}></input>
                    </div>
                </div>

                <div className="row">
                    <div className="col s5">СНИЛС</div>
                    <div className="col s7">

                        <input type="text" id="snils" value={this.state.value.snils}
                            onChange={
                                event => {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    this.setState({ value: Object.assign({}, this.state.value, { snils: event.currentTarget.value }) });
                                }} />
                    </div>
                </div>

            </div >;
    
        }
    }
    
export default DPersonDoc;