"use strict";

import React from "react";
import ReactDOM from "react-dom";

import moment from "moment";

import AppStateSetStateActionCreator from "../../actions/AppStateSetStateActionCreator";
import AppStateAddActionCreator from "../../actions/AppStateAddActionCreator";

import Table from "../core/Table.react";
import TableStore from "../../stores/TableStore";
import TableGetItemByIdStartActionCreator from "../../actions/TableGetItemByIdStartActionCreator";
import TableGetDataStartActionCreator from "../../actions/TableGetDataStartActionCreator";
import TableGetItemByIdEndActionCreator from "../../actions/TableGetItemByIdEndActionCreator";

import DropDownList from "../core/DropDownList.react";
import DatePicker from "../core/DatePicker.react";
import InputBoxDate from "../simple/InputBoxDate.react";

import DropDownListStore from "../../stores/DropDownListStore";
import DatePickerStore from "../../stores/DatePickerStore";

import UserInfoStore from "../../stores/UserInfoStore";
import DocumentViewer from "../DocumentViewer.react";

import ContextMenuItemsCommon from "../shared/ContextMenuItems.Common";

import OutRegistryApiUtils from "../../utils/isolated/OutRegistryApiUtils";


class OutputStreamRegistries extends React.Component {
    constructor(props) {
        super(props);
        let date = new Date();
        this.state = {
            filter: {
                dateEnd: moment(date).format("YYYY-MM-DD"),
                dateBegin: moment(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 10)).format("YYYY-MM-DD"),
                codeTf: null
            },
            orderTableId: null,
            orderControllerName: null,
            reportLink: null
        };
    }

    componentWillMount() {
        if (this.props.initials != null) {
            this.setState({
                filter: {
                    dateEnd: moment(this.props.initials.dateEnd).format("YYYY-MM-DD"),
                    dateBegin: moment(this.props.initials.dateBegin).format("YYYY-MM-DD"),
                    codeTf: this.props.initials.codeTf
                }
            });
        }
    }

    componentWillUpdate(nextProps, nextState) {
        AppStateSetStateActionCreator.setState({
            dateBegin: nextState.filter.dateBegin,
            dateEnd: nextState.filter.dateEnd,
            codeTf: nextState.filter.codeTf
        });
    }

    render() {
        const tableContextMenuConfig = {
            mountPoint: "outputStreamRegistrySvc",
            items: [
                {
                    key: "sendFile",
                    onClick: SendFile,
                    caption: "Отправить файл",
                    inRole: ["mtr"],
                    isVisible: CheckSendFileVisible
                },
                /*{
                    key: "undoCreateRegistry",
                    onClick: UndoCreateRegistry,
                    caption: "Расформировать реестр",
                    inRole: ["mtr"],
                    isVisible: CheckUndoCreateRegistryVisible
                },*/
                {
                    key: "createD",
                    onClick: CreateDRegistry,
                    caption: "Сформировать дополнительный реестр",
                    inRole: ["mtr"],
                    isVisible: CheckCreateDRegistryVisible
                },
                {
                    key: "undoCreateD",
                    onClick: UndoCreateDRegistry,
                    caption: "Расформировать дополнительный реестр",
                    inRole: ["mtr"],
                    isVisible: CheckUndoCreateDRegistryVisible
                },
                {
                    key: "showDExplanationLetter",
                    onClick: ShowDExplanationLetter,
                    caption: "Пояснительное письмо",
                    inRole: ["mtr"],
                    isVisible: CheckShowDExplanationLetterVisible
                },
                {
                    key: "updateRegistrationDate",
                    onClick: (event, props) => {
                        let mountPoint = document.getElementById("documentMountPoint");
                        ReactDOM.unmountComponentAtNode(mountPoint);
                        ReactDOM.render(<InputBoxDate
                            id="updateRegistrationDate"
                            style={{ width: "35%", overflow: "visible" }}
                            dateCaption="Дата регистрации реестра"
                            onOkClick={
                                (newDate) => {
                                    UpdateRegistrationDate("outputStreamRegistry", "outputStream/OutRegistryList", newDate);
                                }}
                            dateDefault={
                                TableStore.getFieldValue(props.ownerId, TableStore.getRightClickedRowId(props.ownerId), "registrationDate")
                            }
                        />,
                            mountPoint);
                        $("#updateRegistrationDate").openModal();
                    },
                    caption: "Изменить дату регистрации реестра",
                    inRole: ["mtr"],
                    isVisible: true
                },
                {
                    key: "updateMtrPayOrderDate",
                    onClick: (event, props) => {
                        let mountPoint = document.getElementById("documentMountPoint");
                        ReactDOM.unmountComponentAtNode(mountPoint);
                        ReactDOM.render(<InputBoxDate
                            id="updateMtrPayOrderDate"
                            style={{ width: "35%", overflow: "visible" }}
                            dateCaption="Дата регистрации протокола"
                            onOkClick={
                                (newDate) => {
                                    UpdateMtrPayOrderDate("outputStreamRegistry", "outputStream/OutRegistryList", newDate);
                                }}
                            dateDefault={
                            TableStore.getFieldValue(props.ownerId, TableStore.getRightClickedRowId(props.ownerId), "payOrderMtrDate")
                            }
                            />,
                            mountPoint);
                        $("#updateMtrPayOrderDate").openModal();
                    },
                    caption: "Изменить дату регистрации протокола",
                    inRole: ["mtr"],
                    isVisible: true
                },
                {
                    key: "ShowColumnEditor",
                    onClick: (event, props) => {
                        ContextMenuItemsCommon.showColumnEditor(event, props);
                    },
                    caption: "Состав колонок",
                    mountPoint: "outputStreamRegistrySvc"
                },
                {
                    key: "SaveTableSettings",
                    onClick: (event, props) => { ContextMenuItemsCommon.saveTableSettings(event, props); },
                    caption: "Сохранить настройки таблицы"
                }
            ]
        };
        const buttonsConfig = [
            {
                id: 0,
                hint: "Просмотр реестра",
                iconName: "input",
                className: "md-normal",
                onClick: function(id) {
                    AppStateAddActionCreator.add("OutputRegistryView", "OutputStream", { id });
                }
            },
            {
                id: 1,
                hint: "Редактирование доп. инф.",
                iconName: "event_available",
                className: "md-normal",
                onClick: function(id) {
                    AppStateAddActionCreator.add("OutputRegistryView", "OutputStream", { id, isD: true });
                },
                isVisible: (id, props) => {
                    let val = TableStore.getFieldValue(props.ownerId, id, "hasChildrenRaw");
                    return val===true;
                }
            }
        ];
        const tabulatorConfig = {
            'data-id': "tabulator0",
            hideEmpty: false,
            config: [
                {
                    id: "subReg",
                    order: 1,
                    isActive: true,
                    type: "Table",
                    tabulatorConfigMods: { id: "id" },
                    config: {
                        'data-table-id': "outputStreamRegistry",
                        'data-table-controller': "outputStream/OutRegistrySubList",
                        style: { 'maxHeight': 450 + "px" },
                        itemsPerPage: "20",
                        hidePaginatorIfSinglePage: true,
                        canParallize: true,
                        contextMenuConfig: tableContextMenuConfig,
                        buttonsConfig: buttonsConfig
                    }
                }
            ]
        };
        return <div className="card input-stream" style={{ 'minHeight': 80 + "vh", overflow: "visible" }}>
            <div className="card-content">
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                    <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                        <DatePicker id="start" defaultValue={this.state.filter.dateBegin} caption="С" allowEmpty={false}></DatePicker>
                        <DatePicker id="end" defaultValue={this.state.filter.dateEnd} caption="По" allowEmpty={false}></DatePicker>
                    </div>
                    <DropDownList
                        data-list-id="regSelector"
                        data-list-controller="inputStream/TfomsList"
                        data-list-def-txt="Территория"
                        idSelected={this.state.filter.codeTf}
                        style={{ maxWidth: 400 + "px", minWidth: 300 + "px" }}></DropDownList>
                    <a className="waves-effect waves-light btn" onClick={(event) => {
                        let tf = DropDownListStore.getSelectedItem("regSelector");
                        let filter = {
                            dateBegin: DatePickerStore.getValue("start"),
                            dateEnd: DatePickerStore.getValue("end"),
                            codeTf: tf != null ? tf.key : null
                        };
                        this.setState({ filter: filter });
                    }}>Показать</a>
                </div>
                <div>
                    <Table data-table-id="outputStreamRegistry"
                        data-table-controller="outputStream/OutRegistryList"
                        style={{ 'maxHeight': 55 + "vh", width: 100 + "%" }}
                        itemsPerPage="20"
                        canParallize={true}
                        conditionObj={this.state.filter}
                        contextMenuConfig={tableContextMenuConfig}
                        tabulatorConfig={tabulatorConfig}
                        buttonsConfig={buttonsConfig}>
                    </Table>
                </div>
            </div>
            <div id="documentMountPoint"></div>
        </div>;
    }
}

function GetRightClickedRegistryStatus(props) {
    let id = TableStore.getRightClickedRowId(props.ownerId);
    if (id == null)
        return false;
    let val = TableStore.getFieldValue(props.ownerId, id, "status");
    return val;
}

function GetIds(tableId) {
    let ids = TableStore.getSelectedRows(tableId);
    if (ids == null || !Array.isArray(ids) || ids.length <= 0) {
        let id = TableStore.getRightClickedRowId(tableId);
        if (id != null)
            ids = [id];
    }
    return ids;
}

function CheckSendFileVisible(props) {
    let status = GetRightClickedRegistryStatus(props);
    return status >= 11;
}

function CheckUndoCreateRegistryVisible(props) {
    let status = GetRightClickedRegistryStatus(props);
    return status === 11 || status === 12;
}

function CheckCreateDRegistryVisible(props) {
    let id = TableStore.getRightClickedRowId(props.ownerId);
    if (id == null)
        return false;
    let val = TableStore.getFieldValue(props.ownerId, id, "hasChildrenRaw");
    return val === true;
}

function CheckUndoCreateDRegistryVisible(props) {
    let id = TableStore.getRightClickedRowId(props.ownerId);
    if (id == null)
        return false;
    let val = TableStore.getFieldValue(props.ownerId, id, "isChildren");
    return val == true;
}

function CheckShowDExplanationLetterVisible(props) {
    let id = TableStore.getRightClickedRowId(props.ownerId);
    if (id == null)
        return false;
    let val = TableStore.getFieldValue(props.ownerId, id, "isChildren");
    return val == true;
}

function SendFile(event, props) {
    let ids = GetIds(props.ownerId);
    if (ids == null || !Array.isArray(ids) || ids.length == 0) {
        return;
    }
    ids.forEach(id => {
        OutRegistryApiUtils.sendFile(id)
            .then(data => {
                if (data != null && data.error != null) {
                    Materialize.toast(data.error);
                }
                TableGetItemByIdStartActionCreator.getItemByIdStart(props.ownerId, props.tableControllerName, id);
            },
            err => {
                Materialize.toast(err);
            });
    });
}

function UndoCreateRegistry(event, props) {
    let ids = GetIds(props.ownerId);
    if (ids == null || !Array.isArray(ids) || ids.length == 0) {
        return;
    }
    ids.forEach(id => {
        OutRegistryApiUtils.undoCreateRegisrty(id)
            .then(data => {
                if (data != null && data.error != null) {
                    Materialize.toast(data.error);
                }
                TableGetItemByIdStartActionCreator.getItemByIdStart("outputStreamRegistry",
                    "outputStream/OutRegistryList",
                    id);
            },
            err => {
                Materialize.toast(err);
            });
    });

}

function CreateDRegistry(event, props) {
    let id = TableStore.getRightClickedRowId(props.ownerId);
    if (id == null)
        return false;
    OutRegistryApiUtils.createDRegisrty(id)
        .then(data => {
            TableGetItemByIdStartActionCreator.getItemByIdStart("outputStreamRegistry", "outputStream/OutRegistryList", id);
            let tableId = TableStore.locateTableIds("outputStreamRegistry", id);
            if (tableId.length > 1) {
                Materialize.toast("Ошибка идентификации подчинённой таблицы outputStreamRegistry " + id);
                throw null;
            }
            else {
                if (tableId.length == 1) {
                    if (TableStore.hasData(tableId[0])) {
                        TableGetItemByIdStartActionCreator.getItemByIdStart(tableId[0], "outputStream/OutRegistrySubList", data.id);
                    }
                    else {
                        TableGetDataStartActionCreator.getDataStart(tableId[0], "outputStream/OutRegistrySubList", true, { data: id });
                    }
                }
                else
                { } //do nothing - no such table in memory (not rendered?)
            }
        },
        err => {
            Materialize.toast(err);
        });
}

function UndoCreateDRegistry(event, props) {
    let id = TableStore.getRightClickedRowId(props.ownerId);
    if (id == null)
        return false;
    OutRegistryApiUtils.undoCreateDRegisrty(id)
        .then(data => {
            if (data.error != null) {
                Materialize.toast(data.error);
                return;
            }
            TableGetItemByIdStartActionCreator.getItemByIdStart("outputStreamRegistry", "outputStream/OutRegistryList", data.id);
            let tableId = TableStore.locateTableIds("outputStreamRegistry", data.id);
            if (tableId.length != 1) {
                Materialize.toast("Ошибка идентификации подчинённой таблицы outputStreamRegistry " + data.id);
                Materialize.toast("Обновите страницу");
            }
            else {
                TableGetItemByIdEndActionCreator.getItemByIdEnd(tableId[0], id, null);
            }
        },
        err => {
            Materialize.toast(err);
        });
}

function ShowDExplanationLetter(event, props) {
    let id = TableStore.getRightClickedRowId(props.ownerId);
    if (id == null) {
        return;
    }
    let params = {
        RegistryId: id,
        UserName: UserInfoStore.get().shortName,
        UserPhone: UserInfoStore.get().phoneNumber,
        UserDepartment: UserInfoStore.get().department,
        UserJob: UserInfoStore.get().position,
        UserEMail: UserInfoStore.get().email
    }
    let mountPoint = document.getElementById("documentMountPoint");
    let elem = ReactDOM.render(<DocumentViewer
        id="documentMounted"
        style={{ width: "75vw", maxHeight: "96vh", height: "96vh", top: "2vh" }}
        reportPath="%2fOutStream%2fDocuments%2fOutDExplanationLetter&rs:Command=Render"
        params={params}
        mountPoint="documentMountPoint"></DocumentViewer>,
        mountPoint);
    $("#documentMounted").openModal();
}

function UpdateRegistrationDate(ownerId, tableControllerName, date) {
    let ids = GetIds(ownerId);
    if (ids == null || !Array.isArray(ids) || ids.length == 0) {
        return;
    }
    ids.forEach(id => {
        OutRegistryApiUtils.updateRegistrationDate(id, date)
            .then(data => {
                    if (data != null && data.error != null) {
                        Materialize.toast(data.error);
                    }
                    TableGetItemByIdStartActionCreator.getItemByIdStart(ownerId, tableControllerName, id);
                },
                err => {
                    Materialize.toast(err);
                });
    });
}

function UpdateMtrPayOrderDate(ownerId, tableControllerName, date) {
    let ids = GetIds(ownerId);
    if (ids == null || !Array.isArray(ids) || ids.length == 0) {
        return;
    }
    ids.forEach(id => {
        OutRegistryApiUtils.updateMtrPayOrderDate(id, date)
            .then(data => {
                    if (data != null && data.error != null) {
                        Materialize.toast(data.error);
                    }
                    TableGetItemByIdStartActionCreator.getItemByIdStart(ownerId, tableControllerName, id);
                },
                err => {
                    Materialize.toast(err);
                });
    });
}

export default OutputStreamRegistries;