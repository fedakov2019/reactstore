"use strict";

import React from "react";

import moment from "moment";

import Table from "../core/Table.react";

import DatePicker from "../core/DatePicker.react";
import DatePickerStore from "../../stores/DatePickerStore";

class PersonHistoryView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lockData: true,

            filter: {
                lastName: null,
                firstName: null,
                middleName: null,
                birthday: null,
                enp: null
            }
        };
    }

    render() {
        return <div>
            <div className="row" style={{ margin: '10px' }}>
                <div className="input-field col s3">
                    <input type="text" id="lastName" onChange={(event) => {
                        this.setState({filter: Object.assign({}, this.state.filter, { lastName: event.currentTarget.value }), lockData:true });
                    }} value={this.state.lastName} />
                    <label htmlFor="lastName">Фамилия</label>
                </div>
                <div className="input-field col s3">
                    <input type="text" id="firstName" onChange={(event) => {
                        this.setState({ filter: Object.assign({}, this.state.filter, { firstName: event.currentTarget.value }), lockData: true });
                    }} value={this.state.firstName} />
                    <label htmlFor="firstName">Имя</label>
                </div>
                <div className="input-field col s3">
                    <input type="text" id="middleName" onChange={(event) => {
                        this.setState({ filter: Object.assign({}, this.state.filter, { middleName: event.currentTarget.value }), lockData: true });
                    }} value={this.state.middleName} />
                    <label htmlFor="lastName">Отчество</label>
                </div>
            </div>
            <div className="row" style={{ margin: '10px' }}>
                <div className="col s6">
                    <DatePicker id="dr" caption="Дата рождения" allowEmpty={true} />
                </div>
            </div>
            <div className="row" style={{ margin: '10px' }}>
                <div className="input-field col s3">
                    <input type="text" id="enp" onChange={(event) => {
                        this.setState({ filter: Object.assign({}, this.state.filter, { enp: event.currentTarget.value }), lockData: true });
                    }} value={this.state.enp} />
                    <label htmlFor="enp">ЕНП</label>
                </div>
            </div>
            <div className="row" style={{ margin: '10px' }}>
                <div className="col s8">
                    <a className="waves-effect waves-light btn" onClick={(event) => {
                        this.setState({ filter: Object.assign({}, this.state.filter, { birthday: DatePickerStore.getValue("dr") }), lockData: false });
                    }}>Искать</a>
                </div>
            </div>
            <div style={{ margin: "7px" }}>
                <Table data-table-id="personHistory"
                    data-table-controller="history/PersonHistory"
                    style={{ 'maxHeight': "60%", width: "100%" }}
                    itemsPerPage="20"
                    canParallize={true}
                    conditionObj={this.state.filter}
                    lockData={this.state.lockData}
                    skipAutoLoad={true} />
                <div id="histSvc" />
            </div>
        </div>;
    }
}

export default PersonHistoryView;