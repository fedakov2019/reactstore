"use strict";

import React from "react";

import DatePicker from "../../core/DatePicker.react";
import DropDownList from "../../core/DropDownList.react";

class DPerson extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: props.defaultValue };
    }

    componentDidUpdate() {
        this.props.onEdit(this.props, this.state);
    }


    render() {
        return <div className="input-field col s11">
            <input type="text" id="fam" value={this.state.value.fam}
                onChange={
                    event => {
                        event.preventDefault();
                        event.stopPropagation();
                        this.setState({ value: Object.assign({}, this.state.value, { fam: event.currentTarget.value }) });
                    }}></input>
            <input type="text" id="im" value={this.state.value.im}
                onChange={
                    event => {
                        event.preventDefault();
                        event.stopPropagation();
                        this.setState({ value: Object.assign({}, this.state.value, { im: event.currentTarget.value }) });
                    }}></input>
            <input type="text" id="ot" value={this.state.value.ot}
                onChange={
                    event => {
                        event.preventDefault();
                        event.stopPropagation();
                        this.setState({ value: Object.assign({}, this.state.value, { ot: event.currentTarget.value }) });
                    }}></input>
            <div className="row">
                <div className="col s3">Дата рождения</div>
                <div className="col s9"><DatePicker id="birthday" defaultValue={this.state.value.dr} caption="" allowEmpty={false}
                    onChange={
                        (props, state, value) => {
                            this.setState({ value: Object.assign({}, this.state.value, { dr: value }) });
                        }}
                ></DatePicker>
                </div>
            </div>
            <div className="row">
                <div className="col s3">Пол</div>
                <div className="col s9">
                    <DropDownList
                        data-list-id="DWSelector"
                        data-list-controller="dict/Sex"
                        data-list-def-txt="Пол"
                        idSelected={this.state.value.w}
                        style={{ maxWidth: 100 + "px", minWidth: 100 + "px" }}
                        onChange={
                            (props, state, value) => {
                                this.setState({ value: Object.assign({}, this.state.value, { w: value }) });
                            }}></DropDownList>
                </div>
            </div>
            <div className="row">
                <div className="col s3">Признак новорожденного</div>
                <div className="col s9">
                    <input type="text" id="novor" value={this.state.value.novor}
                        onChange={
                            event => {
                                event.preventDefault();
                                event.stopPropagation();
                                this.setState({ value: Object.assign({}, this.state.value, { novor: event.currentTarget.value }) });
                            }}></input>
                </div>
            </div>
            <div className="row">
                <div className="col s3">Вес при рождении</div>
                <div className="col s9">
                    <input type="text" id="vNovD" value={this.state.value.vNovD}
                        onChange={
                            event => {
                                event.preventDefault();
                                event.stopPropagation();
                                this.setState({ value: Object.assign({}, this.state.value, { vNovD: event.currentTarget.value }) });
                            }}></input>
                </div>
            </div>
            <div className="row">
                <div className="col s3">Комментарий (пациент)</div>
                <div className="col s9">
                    <input type="text" id="comentP" value={this.state.value.comentP}
                        onChange={
                            event => {
                                event.preventDefault();
                                event.stopPropagation();
                                this.setState({ value: Object.assign({}, this.state.value, { comentP: event.currentTarget.value }) });
                            }}></input>
                </div>
            </div>
        </div>;
    }
}

export default DPerson;