"use strict";

import React from "react";

import DatePicker from "../../core/DatePicker.react";
import DropDownList from "../../core/DropDownList.react";

class DPersonPred extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: props.defaultValue };
    }

    componentDidUpdate() {
        this.props.onEdit(this.props, this.state);
    }


    render() {
        return <div className="input-field col s11">
            <input type="text" id="famP" value={this.state.value.famP}
                onChange={
                    event => {
                        event.preventDefault();
                        event.stopPropagation();
                        this.setState({ value: Object.assign({}, this.state.value, { famP: event.currentTarget.value }) });
                    }}></input>
            <input type="text" id="imP" value={this.state.value.imP}
                onChange={
                    event => {
                        event.preventDefault();
                        event.stopPropagation();
                        this.setState({ value: Object.assign({}, this.state.value, { imP: event.currentTarget.value }) });
                    }}></input>
            <input type="text" id="otP" value={this.state.value.otP}
                onChange={
                    event => {
                        event.preventDefault();
                        event.stopPropagation();
                        this.setState({ value: Object.assign({}, this.state.value, { otP: event.currentTarget.value }) });
                    }}></input>
            <div className="row">
                <div className="col s3">Дата рождения</div>
                <div className="col s9">
                    <DatePicker id="birthdayP" defaultValue={this.state.value.drP} caption="Дата рождения" allowEmpty={true}
                        onChange={
                            (props, state, value) => {
                                this.setState({ value: Object.assign({}, this.state.value, { drP: value }) });
                            }}
                    ></DatePicker>
                </div>
            </div>
            <div className="row">
                <div className="col s3">Пол</div>
                <div className="col s9">
                    <DropDownList
                        data-list-id="DWSelectorP"
                        data-list-controller="dict/Sex"
                        data-list-def-txt=""
                        idSelected={this.state.value.wP}
                        style={{ maxWidth: 100 + "px", minWidth: 100 + "px" }}
                        onChange={
                            (props, state, value) => {
                                this.setState({ value: Object.assign({}, this.state.value, { wP: value }) });
                            }}></DropDownList>
                </div>
            </div>
        </div>;
    }
}

export default DPersonPred;