"use strict";

import React from "react";

import Table from "./core/Table.react";
import TableStore from "../stores/TableStore";


import Tabulator from "./core/Tabulator.react";

import RejectSelectorStore from "../stores/RejectSelectorStore";

import Expertise from "./Expertise.react";
import ExpertiseStore from "../stores/ExpertiseStore";

let RejectSelector = React.createClass({
    getInitialState: function () {
        return {
            comment: ""
        };
    },
    componentDidMount: function () {
        TableStore.addTableChangeListener(this.props.tableConfig["data-table-id"], this._SelectionChanged);
    },
    componentWillUnmount: function () {
        TableStore.removeTableChangeListener(this.props.tableConfig["data-table-id"], this._SelectionChanged);
    },
    render: function () {
        let exp = null;
        if (this.props.isExpertise) {
            exp = <Expertise id={this.props.expertiseId}></Expertise>;
        }
        let templateAddBtn = (this.props.onTemplateAdd == null)
            ? null
            : (
                <div id={this.props.id + "OptBtn"}>
                    <a href="#!" className=" modal-action modal-close waves-effect waves-green btn-flat" onClick={this
                        ._onSuccessWithTemplateAdd}>OK (+шаблон)</a>
                </div>
            );
        let fullList = <div>
            <div className="modal-content">
                <p>Выберите отказ</p>
                <Table {...this.props.tableConfig}>
                </Table>
                <div id={this.props.id + "Opt"}>
                    <hr></hr>
                    <div className="input-field">
                        <input type="text" id="refuseComment" value={this.state.comment} onChange={this._onCommentChange}/>
                        <label htmlFor="refuseComment">Комментарий к отказу</label>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <a href="#!" className=" modal-action modal-close waves-effect waves-green btn-flat" onClick={this
                    ._onCancel}>Отмена</a>
                {templateAddBtn}
                <a href="#!" className=" modal-action modal-close waves-effect waves-green btn-flat" onClick={this
                    ._onSuccess}>OK</a>
            </div>
        </div>;

        let templateList = null;
        let container = fullList;
        if (this.props.tableTemplatesConfig != null) {
            let buttonsConfig = [
                {
                    id: 0,
                    hint: "Удалить шаблон",
                    iconName: "delete",
                    className: "md-normal",
                    onClick: this.props.onTemplateRemove
                }
            ];
            templateList = <div>
                <div className="modal-content">
                    <Table {...this.props.tableTemplatesConfig} buttonsConfig={buttonsConfig}>
                    </Table>
                </div>
                <div className="modal-footer">
                    <a href="#!" className=" modal-action modal-close waves-effect waves-green btn-flat" onClick={this
                        ._onCancel}>Отмена</a>
                    <a href="#!" className=" modal-action modal-close waves-effect waves-green btn-flat" onClick={this
                        ._onSuccessTemplate}>OK</a>
                </div>
            </div>;
            let tabulatorConfig = {
                'data-id': "refuseTabs",
                hideEmpty: false,
                headersStyle: {
                    width: "98%"
                },
                config: [
                    {
                        id: "regView",
                        order: 2,
                        caption: "Сохранённые отказы",
                        elem: templateList
                    },
                    {
                        id: "fullList",
                        order: 3,
                        caption: "Все отказы",
                        elem: fullList
                    }
                ]
            };
            if (this.props.isExpertise) {
                tabulatorConfig.config = Array.concat({
                        id: "expertise",
                        isActive: true,
                        order: 1,
                        caption: "Данные экспертизы",
                        elem: exp
                    },
                    tabulatorConfig.config);
            } else {
                tabulatorConfig.config.forEach(r => {
                    if (r.id == "regView") {
                        r.isActive = true;
                    }
                });
            }
            container = <Tabulator {...tabulatorConfig} />;
        }
        return <div id={this.props.id} className="modal bottom-sheet">
            {container}
        </div>;
    },
    _onSuccess: function () {
        let selected = TableStore.getSelectedRows(this.props.tableConfig["data-table-id"]);
        let comment = this.state.comment > "" ? this.state.comment : null;
        if (this.props.isExpertise) {

            if (selected == null) {
                selected = [null];
            }

            let dataExp = ExpertiseStore.getData(this.props.expertiseId);
            this.props.onSuccess(RejectSelectorStore.getIds(), selected, comment, dataExp, this.props);
            return;
        } else {
            this.props.onSuccess(RejectSelectorStore.getIds(), selected, comment, null, this.props);
        }
        $("#" + this.props.id).closeModal();
    },
    _onSuccessTemplate: function () {
        let selected = TableStore.getSelectedRows(this.props.tableTemplatesConfig["data-table-id"]);
        if (Array.isArray(selected)) {
            let rejects = selected.forEach(val => {
                let idRefuse = [TableStore.getFieldValue(this.props.tableTemplatesConfig["data-table-id"], val, "SankId")];
                let comment = TableStore.getFieldValue(this.props.tableTemplatesConfig["data-table-id"], val, "UserComment");
                this.props.onSuccess(RejectSelectorStore.getIds(), idRefuse, comment, null, this.props);
            });
        }
        $("#" + this.props.id).closeModal();
    },
    _onSuccessWithTemplateAdd: function () {
        let selected = TableStore.getSelectedRows(this.props.tableConfig["data-table-id"]);
        if (!Array.isArray(selected) || selected.length != 1) {
            return;
        }
        let comment = this.state.comment > "" ? this.state.comment : null;
        this.props.onTemplateAdd(selected[0], comment, this.props);
        this.props.onSuccess(RejectSelectorStore.getIds(), selected, comment, null, this.props);
        $("#" + this.props.id).closeModal();
    },
    
    _onCancel: function () {
        $("#" + this.props.id).closeModal();
    },
    _SelectionChanged: function () {
        let selected = TableStore.getSelectedRows(this.props.tableConfig["data-table-id"]);
        if (selected == null || selected.length != 1) {
            this.setState({
                comment: ""
            });
            $("#" + this.props.id + "Opt").slideUp();
            $("#" + this.props.id + "OptBtn").slideUp();
        }
        else {
            $("#" + this.props.id + "Opt").slideDown();
            $("#" + this.props.id + "OptBtn").slideDown();
        }
    },
    _onCommentChange: function (event) {
        this.setState({
            comment: event.currentTarget.value
        });
    }
});

export default RejectSelector;