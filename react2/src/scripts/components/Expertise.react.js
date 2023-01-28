"use strict";

import React from "react";

import DatePicker from "./core/DatePicker.react";
import DropDownList from "./core/DropDownList.react";
import Table from "./core/Table.react";
import Collection from "./core/Collection.react";

import CollectionAddItemActionCreator from "../actions/CollectionAddItemActionCreator";
import ExpertiseUpdateActionCreator from "../actions/ExpertiseUpdateActionCreator";

import ExpertiseStore from "../stores/ExpertiseStore.js";
import TableStore from "../stores/TableStore.js";

import { uniNumber } from "../common/NumberExtensions";

class Expertise extends React.Component {
    constructor(props) {
        super(props);

        let initials = ExpertiseStore.getData(this.props.id);

        if (initials == null) {
            initials = {
                typeExp: null,
                sumExp: null,
                actNum: null,
                actDate: new Date(),
                expLst: {},
                expMeeCode: null
            };
        }

        ExpertiseUpdateActionCreator.update(this.props.id, initials);

        this.state = initials;

        this.settleState = this.settleState.bind(this);
        this.onStoreChange = this.onStoreChange.bind(this);
    }

    componentWillMount() {
        ExpertiseStore.addChangeListener(this.props.id, this.onStoreChange);
    }

    componentWillUnmount() {
        ExpertiseStore.removeChangeListener(this.props.id, this.onStoreChange);
    }

    settleState(newState) {
        let data = Object.assign({}, ExpertiseStore.getData(this.props.id), newState);
        ///this.setState(data);
        ExpertiseUpdateActionCreator.update(this.props.id, data);
    }

    onStoreChange() {
        //let state = ExpertiseStore.getData(this.props.id);
        //this.setState(state);
    }

    addExpert(id) {
        let a = {};
        var elem = TableStore.getFieldValue("F004Experts", id, "NExpert") +
            " " +
            TableStore.getFieldValue("F004Experts", id, "Name") +
            " // " +
            TableStore.getFieldValue("F004Experts", id, "SertData");
        a[id] = elem;
        CollectionAddItemActionCreator.addItem("expList", a);
    }

    render() {
        let buttonsConfig = [
            {
                id: 0,
                hint: "Добавить эксперта",
                iconName: "add_circle_outline",
                inRole: ["mtr"],
                onClick: this.addExpert,
                isVisible: true
            }
        ];
        return <div id={this.props.id}>
            <div className="row">
                <div className="col s12">
                    <DropDownList
                        data-list-id="expTypeSelector"
                        data-list-controller="dict/SankType"
                        data-list-def-txt="Тип экспертизы"
                        idSelected={this.state.typeExp}
                        style={{ maxWidth: 400 + "px", minWidth: 300 + "px" }}
                        onChange={(props, state, value) => {
                            this.settleState({ typeExp: value });
                        }}
                    />
                </div>
            </div>
            <div className="row">
                <div className="input-field col s6">
                    <input id={this.props.id + "##sum"} type="text" className="validate" value={this.state.sumExp}
                        onChange={(event) => {
                            this.settleState({
                                sumExp: uniNumber(event.currentTarget.value)
                            });
                        }} />
                    <label htmlFor={this.props.id + "##ap"}>Сумма</label>
                </div>
            </div>
            <div className="row">
                <div className="col s2"></div>
                <div className="input-field col s6">
                    <label htmlFor={this.props.id + "##actDate"} className="active">Дата акта</label>
                    <DatePicker id={this.props.id + "##actDate"} defaultValue={new Date()}
                        onChange={(props, state, value) => {
                            this.settleState({ actDate: value });
                        }}
                    />
                </div>
                <div className="input-field col s6">
                    <input id={this.props.id + "##actNum"} type="text" className="validate" value={this.state.actNum}
                        onChange={(event) => {
                            this.settleState({ actNum: event.currentTarget.value });
                        }} />
                    <label htmlFor={this.props.id + "##num"}>№ акта</label>
                </div>
            </div>
            <div>Эксперты</div>
            <div className="input-field col s10">
                <input id={this.props.id + "##expMeeCode"} type="text" className="validate" value={this.state.expMeeCode}
                    onChange={(event) => {
                        this.settleState({ expMeeCode: event.currentTarget.value });
                    }} />
                <label htmlFor={this.props.id + "##expMeeCode"}>Код эксперта (МЭЭ) - не более 8 символов</label>
            </div>
            <Collection id="expList"
                onChange={(props, state, value) => {
                    this.settleState({ expLst: value });
                }} />
            <Table data-table-id="F004Experts"
                data-table-controller="dict/Experts"
                itemsPerPage="10"
                canParallize={true}
                buttonsConfig={buttonsConfig}
                hasPaginatorOnTop={true}
                onPageSwitch={() => { document.location = "#windowTop" }} />
        </div>;
    }
}



export default Expertise;