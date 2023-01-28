"use strict";

import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";

import Table from "../core/Table.react";
import RejectSelector from "../RejectSelector.react";
import ErzReplies from "../erz/ErzReplies.react";
import Attachment from "../erz/Attachment.react";

import TableStore from "../../stores/TableStore";
import UserSettingsStore from "../../stores/UserSettingsStore";

import UserInfoStore from "../../stores/UserInfoStore";
import DocumentViewer from "../DocumentViewer.react";

import History from "../history/History.react";

import AppStateSetStateActionCreator from "../../actions/AppStateSetStateActionCreator";
import TableUnselectAllActionCreator from "../../actions/TableUnselectAllActionCreator";
import RejectSelectorSetCaseIdsActionCreator from "../../actions/RejectSelectorSetCaseIdsActionCreator";
import TableGetItemByIdStartActionCreator from "../../actions/TableGetItemByIdStartActionCreator";
import TableGetItemByIdEndActionCreator from "../../actions/TableGetItemByIdEndActionCreator";
import TableGetDataStartActionCreator from "../../actions/TableGetDataStartActionCreator";
import ErzRepliesShowActionCreator from "../../actions/ErzRepliesShowActionCreator";

import InCaseBtnApiUtils from "../../utils/isolated/InCaseBtnApiUtils";

import ContextMenuItemsCommon from "../shared/ContextMenuItems.Common";

import IdentificationRrzModal from "../rrz/IdentificationRrzModal.react";

import InRegistryApiUtils from "../../utils/isolated/InRegistryApiUtils";

import InformerSetInfoActionCreator from "../../actions/InformerSetInfoActionCreator";

class InputRegistryView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            erzCaseId: -1,
            informerData: {}
        }
    }

    componentWillMount() {
        InRegistryApiUtils.getRegShortInfo(this.props.id)
            .then(data => {
                InformerSetInfoActionCreator.setInfo(data);
            });
        AppStateSetStateActionCreator.setState({
            id: this.props.id
        });
    }

    componentWillUnmount() {
        InformerSetInfoActionCreator.setInfo(null);
    }
    render() {
        let tabulatorConfig = {
            'data-id': "tabulator0",
            hideEmpty: false,
            headersStyle: { maxWidth: "90vw" },
            config: [
                {
                    id: "subKsg",
                    caption: "КСГ",
                    order: 1,
                    isActive: true,
                    type: "Table",
                    tabulatorConfigMods: { id: "id" },
                    config: {
                        'data-table-id': "inKsg",
                        'data-table-controller': "inputStream/InKsgView",
                        style: { 'maxHeight': 450 + "px" },
                        itemsPerPage: "20",
                        hidePaginatorIfSinglePage: true,
                        canParallize: true
                    }
                },
                {
                    id: "subReg",
                    caption: "Услуги",
                    order: 2,
                    isActive: false,
                    type: "Table",
                    tabulatorConfigMods: { id: "id" },
                    config: {
                        'data-table-id': "inputStreamServices",
                        'data-table-controller': "inputStream/InServiceView",
                        style: { 'maxHeight': 450 + "px" },
                        itemsPerPage: "20",
                        hidePaginatorIfSinglePage: true,
                        canParallize: true
                    }
                },
                {
                    id: "subOnko",
                    caption: "Онкология",
                    order: 3,
                    isActive: false,
                    type: "OnkoStruct",
                    tabulatorConfigMods: { id: "id" },
                    config: {
                        onk: {
                            'data-table-id': "inputOnkSl",
                            'data-table-controller': "inputStream/InOnkSlView",
                            itemsPerPage: "20",
                            canParallize: true
                        },
                        cons: {
                            'data-table-id': "inputOnkCons",
                            'data-table-controller': "inputStream/InOnkConsView",
                            itemsPerPage: "20",
                            canParallize: true
                        },
                        napr: {
                            'data-table-id': "inputOnkNapr",
                            'data-table-controller': "inputStream/InOnkNaprView",
                            style: { 'maxHeight': 450 + "px" },
                            itemsPerPage: "20",
                            hidePaginatorIfSinglePage: true,
                            canParallize: true
                        }
                    }
                },
                {
                    id: "subSanktionRequestss",
                    caption: "Запросы экспертизы",
                    order: 3,
                    isActive: false,
                    type: "Table",
                    tabulatorConfigMods: { id: "id" },
                    config: {
                        'data-table-id': "inputCaseSanctionRequests",
                        'data-table-controller': "inputStream/InCaseSanctionRequestsView",
                        style: { 'maxHeight': 450 + "px" },
                        itemsPerPage: "20",
                        hidePaginatorIfSinglePage: true,
                        canParallize: true,
                        buttonsConfig: [{
                            id: 0,
                            hint: "Удалить запрос",
                            iconName: "delete",
                            className: "md-normal",
                            onClick: RemoveRefuseRequest
                        }
                        ]
                    }
                },
                {
                    id: "subSanktions",
                    caption: "Отказы",
                    order: 3,
                    isActive: false,
                    type: "Table",
                    tabulatorConfigMods: { id: "id" },
                    config: {
                        'data-table-id': "inputCaseSanctions",
                        'data-table-controller': "inputStream/InCaseSanctionsView",
                        style: { 'maxHeight': 450 + "px" },
                        itemsPerPage: "20",
                        hidePaginatorIfSinglePage: true,
                        canParallize: true,
                        buttonsConfig: [{
                            id: 0,
                            hint: "Удалить отказ",
                            iconName: "delete",
                            className: "md-normal",
                            onClick: RemoveRefuse
                        },
                        {
                            id: 1,
                            hint: "Снять иммунитет",
                            iconName: "lock_open",
                            className: "md-normal",
                            onClick: RemoveRefuseImmunity,
                            isVisible: RemoveRefuseImmunityVisible
                        }
                        ]
                    }
                },
                {
                    id: "subNotices",
                    caption: "Визуальный контроль",
                    order: 4,
                    isActive: false,
                    type: "Table",
                    tabulatorConfigMods: { id: "id" },
                    config: {
                        'data-table-id': "inputCaseNotices",
                        'data-table-controller': "inputStream/InCaseMekNoticesView",
                        style: { 'maxHeight': 450 + "px" },
                        itemsPerPage: "20",
                        hidePaginatorIfSinglePage: true,
                        canParallize: true
                    }
                },
                {
                    id: "subPrevSanktions",
                    caption: "Предыдущие отказы (для доп. инф.)",
                    order: 5,
                    isActive: false,
                    type: "Table",
                    tabulatorConfigMods: { id: "id" },
                    isVisible: function (currentConfig) {
                        if (currentConfig.config == undefined || currentConfig.config.conditionObj == undefined || currentConfig.config.conditionObj.id == undefined) {
                            return false;
                        }
                        let res = TableStore.getFieldValue("inputStreamCases", currentConfig.config.conditionObj.id, "hasHistory");
                        return res === true;
                    },
                    config: {
                        'data-table-id': "inputCasePrevSanctions",
                        'data-table-controller': "inputStream/InCasePrevSanctionsView",
                        style: { 'maxHeight': 450 + "px" },
                        itemsPerPage: "20",
                        hidePaginatorIfSinglePage: true,
                        canParallize: true
                    }
                }
            ]
        };
        let buttonsConfig = [
            /*{
                id: 0,
                hint: "Добавить отказ",
                iconName: "rotate_left",
                className: "md-red",
                onClick: function (id) {
                    OpenRejectSelector([id]);
                }
            },*/
            {
                id: 0,
                hint: "Добавить запрос экспертизы",
                iconName: "rotate_left",
                className: "md-red",
                onClick: function (id) {
                    OpenRejectSelector([id]);
                }
            }
        ];
        let tableContextMenuConfig = {
            mountPoint: "inputStreamCasesSvc",
            items: [
                {
                    key: "addRefuseRequest",
                    onClick: (event, props) => { OpenRejectSelector(GetIds(props.ownerId)); },
                    caption: "Запросить экспертизу"
                },
                {
                    key: "accept",
                    onClick: (event, props) => { AcceptCases(GetIds(props.ownerId)); },
                    caption: "Оплатить",
                    inRole: ["mtr"]
                },
                {
                    key: "undoAccept",
                    onClick: (event, props) => { UndoAcceptCases(GetIds(props.ownerId)); },
                    caption: "Снять оплату",
                    inRole: ["mtr"]
                },
                {
                    key: "viewErz",
                    onClick: (event, props) => { ShowErzHistory(props.ownerId); },
                    caption: "История страхования (ЕРЗ)"
                },
                {
                    key: "identifyCase",
                    onClick: (event, props) => { Identify(GetIds(props.ownerId)); },
                    caption: "Идентифицировать",
                    inRole: ["mtr"]
                },
                {
                    key: "history",
                    onClick: (event, props) => { ShowHistory(props); },
                    caption: "Поиск счетов",
                    inRole: ["mtr", "ofs", "kmp"]
                },
                {
                    key: "showDocs",
                    onClick: (event, props) => {
                        ShowUfmsRequest(TableStore.getFieldValue(props.ownerId,
                            TableStore.getRightClickedRowId(props.ownerId),
                            "personId"));
                    },
                    caption: "Запрос в УФМС",
                    inRole: ["mtr"]
                },
                {
                    key: "ShowAttachment",
                    caption: "Показать прикрепление к МО",
                    inRole: ["mtr"],
                    onClick: (event, props) => {
                        ShowAttachment(props);
                    }
                },
                {
                    key: "ShowColumnEditor",
                    onClick: (event, props) => {
                        ContextMenuItemsCommon.showColumnEditor(event, props);
                    },
                    caption: "Состав колонок",
                    mountPoint: "inputStreamCasesSvc"
                },
                {
                    key: "SaveTableSettings",
                    onClick: (event, props) => { ContextMenuItemsCommon.saveTableSettings(event, props); },
                    caption: "Сохранить настройки таблицы"
                }
            ]
        };
        return <div className="card input-stream" style={{ 'minHeight': 80 + "vh", overflow: "visible" }}>
            <div id="inputStreamCasesTop1"></div>
            <div className="card-content">
                <Table data-table-id="inputStreamCases"
                    data-table-controller="inputStream/InCaseDescrView"
                    itemsPerPage="20"
                    canParallize={true}
                    conditionObj={this.props.id}
                    contextMenuConfig={tableContextMenuConfig}
                    tabulatorConfig={tabulatorConfig}
                    buttonsConfig={buttonsConfig}
                    rowStyleMod={SetRowStyle}
                    hasPaginatorOnTop={true}
                    onPageSwitch={() => { document.location = "#windowTop" }}
                ></Table>
                <RejectSelector id="rejectSelector" onSuccess={AddRefuseRequest} onTemplateAdd={AddTemplate} onTemplateRemove={RemoveTemplate}
                    tableConfig={{
                        'data-table-id': "inRefuseCodeSelector",
                        'data-table-controller': "inputStream/InSankCode",
                        itemsPerPage: 20,
                        canParallize: false,
                        hasPaginatorOnTop: true
                    }}
                    tableTemplatesConfig={{
                        'data-table-id': "inUserRefuseSelector",
                        'data-table-controller': "inputStream/InUserSankCode",
                        itemsPerPage: 20,
                        canParallize: false,
                        hasPaginatorOnTop: true
                    }}
                ></RejectSelector>
                <ErzReplies id="erzReplies" idCase={this.state.erzCaseId}
                    tableConfig={{
                        'data-table-id': "erzReplies",
                        'data-table-controller': "erz/Erz",
                        itemsPerPage: 20,
                        canParallize: false,
                        hidePaginatorIfSinglePage: true
                    }}
                ></ErzReplies>
                <div id="identMountPoint"></div>
            </div>
        </div>;
    }
};


function RemoveRefuseImmunityVisible(id, props) {
    let val = TableStore.getFieldValue(props.ownerId, id, "isImmune");
    return val == true;
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

function OpenRejectSelector(ids) {
    if (ids == null || !Array.isArray(ids) || ids.length <= 0) {
        Materialize.toast("Не выбраны записи");
        return;
    }
    RejectSelectorSetCaseIdsActionCreator.setCaseIds(ids);
    TableUnselectAllActionCreator.unselectAll("inRefuseCodeSelector");
    TableUnselectAllActionCreator.unselectAll("inUserRefuseSelector");
    $("#rejectSelector").openModal();
}

function AddRefuseRequest(selectedCases, refuseIds, comment, partialSum) {
    for (let caseId of selectedCases) {
        InCaseBtnApiUtils.addRefuseRequest(caseId, refuseIds, comment, partialSum)
            .then(
                data => {
                    let message = data.filter(val => { return val.error != null }).map(val => { return val.error })
                        .join("; ");
                    if (message > "") {
                        Materialize.toast(message);
                        throw null; //does't need continuation
                    }
                    return data.filter(val => { return val.error == null }).map(val => { return val.id });
                },
                err => {
                    let message = data.filter(val => { return val != null }).join();
                    Materialize.toast(message);
                }
            )
            .then(refuseIds => {

                let bindedIds = TableStore.getFieldValuesFiltered("inputStreamCases",
                    "caseL0Id",
                    TableStore.getFieldValue("inputStreamCases", caseId, "caseL0Id"),
                    "id");

                for (let bindedId of bindedIds) {
                    TableGetItemByIdStartActionCreator.getItemByIdStart("inputStreamCases",
                        "inputStream/InCaseDescrView",
                        bindedId);
                    let tableId = TableStore.locateTableIds("inputCaseSanctionRequests", bindedId);
                    if (tableId.length > 1) {
                        Materialize.toast("Ошибка идентификации подчинённой таблицы inputCaseSanctionRequests " +
                            bindedId);
                        throw null;
                    } else {
                        if (tableId.length == 1) {
                            TableGetDataStartActionCreator.getDataStart(tableId[0],
                                "inputStream/InCaseSanctionRequestsView",
                                true,
                                { id: bindedId });
                        } else {
                        } //do nothing - no such table in memory (not rendered?)
                    }
                }
            },
                err => { });
    }
    TableUnselectAllActionCreator.unselectAll("inputStreamCases");
}

function AddReject(selectedCases, refuseIds, comment, partialSum) {
    for (let caseId of selectedCases) {
        InCaseBtnApiUtils.addRefuse(caseId, refuseIds, comment, partialSum)
            .then(
                data => {
                    let message = data.filter(val => { return val.error != null }).map(val => { return val.error })
                        .join("; ");
                    if (message > "") {
                        Materialize.toast(message);
                        throw null; //does't need continuation
                    }
                    return data.filter(val => { return val.error == null }).map(val => { return val.id });
                },
                err => {
                    let message = data.filter(val => { return val != null }).join();
                    Materialize.toast(message);
                }
            )
            .then(refuseIds => {

                    let bindedIds = TableStore.getFieldValuesFiltered("inputStreamCases",
                        "caseL0Id",
                        TableStore.getFieldValue("inputStreamCases", caseId, "caseL0Id"),
                        "id");

                    for (let bindedId of bindedIds) {
                        TableGetItemByIdStartActionCreator.getItemByIdStart("inputStreamCases",
                            "inputStream/InCaseDescrView",
                            bindedId);
                        let tableId = TableStore.locateTableIds("inputCaseSanctions", bindedId);
                        if (tableId.length > 1) {
                            Materialize.toast("Ошибка идентификации подчинённой таблицы inputCaseSanctions " +
                                bindedId);
                            throw null;
                        } else {
                            if (tableId.length == 1) {
                                TableGetDataStartActionCreator.getDataStart(tableId[0],
                                    "inputStream/InCaseSanctionsView",
                                    true,
                                    { id: bindedId });
                            } else {
                            } //do nothing - no such table in memory (not rendered?)
                        }
                    }
                },
                err => {});
    }
    TableUnselectAllActionCreator.unselectAll("inputStreamCases");
}

function AddTemplate(refuseId, comment) {
    InCaseBtnApiUtils.addRefuseTemplate(refuseId, comment)
        .then(data => {
            TableGetItemByIdStartActionCreator.getItemByIdStart("inUserRefuseSelector", "inputStream/InUserSankCode", data);
        },
        err => {
            Materialize.toast(err);
        }
        );
}

function RemoveTemplate(idTemplate) {
    InCaseBtnApiUtils
        .removeRefuseTemplate(idTemplate)
        .then(data => {
            if (data != 0) {
                Materialize.toast(`Ошибка удаления шаблона ${data}`);
            }
            else {
                TableGetItemByIdEndActionCreator.getItemByIdEnd("inUserRefuseSelector", idTemplate, null);
            }
        })
        .catch(err => {
            Materialize.toast(err);
        });
}

function RemoveRefuseRequest(idRefuseRequest) {
    InCaseBtnApiUtils
        .removeRefuseRequest(idRefuseRequest)
        .then(data => {
            if (data.error != null) {
                Materialize.toast(data.error);
            }
            else {
                let bindedIds = TableStore.getFieldValuesFiltered("inputStreamCases",
                    "caseL0Id",
                    TableStore.getFieldValue("inputStreamCases", data.id, "caseL0Id"),
                    "id");

                for (let bindedId of bindedIds) {
                    TableGetItemByIdStartActionCreator.getItemByIdStart("inputStreamCases", "inputStream/InCaseDescrView", bindedId);
                    let tableId = TableStore.locateTableIds("inputCaseSanctionRequests", bindedId);
                    if (tableId.length == 0)
                        continue;
                    if (tableId.length != 1) {
                        Materialize.toast("Ошибка идентификации подчинённой таблицы inputCaseSanctionRequests " + bindedId);
                        Materialize.toast("Обновите страницу");
                    }
                    else {
                        TableGetItemByIdEndActionCreator.getItemByIdEnd(tableId[0], idRefuseRequest, null);
                    }
                }
            }
        })
        .catch(err => {
            Materialize.toast(err);
        });
}

function RemoveRefuse(idRefuse) {
    InCaseBtnApiUtils
        .removeRefuse(idRefuse)
        .then(data => {
            if (data.error != null) {
                Materialize.toast(data.error);
            }
            else {
                let bindedIds = TableStore.getFieldValuesFiltered("inputStreamCases",
                    "caseL0Id",
                    TableStore.getFieldValue("inputStreamCases", data.id, "caseL0Id"),
                    "id");

                for (let bindedId of bindedIds) {
                    TableGetItemByIdStartActionCreator.getItemByIdStart("inputStreamCases", "inputStream/InCaseDescrView", bindedId);
                    let tableId = TableStore.locateTableIds("inputCaseSanctions", bindedId);
                    if (tableId.length == 0)
                        continue;
                    if (tableId.length != 1) {
                        Materialize.toast("Ошибка идентификации подчинённой таблицы inputCaseSanctions " + bindedId);
                        Materialize.toast("Обновите страницу");
                    }
                    else {
                        TableGetItemByIdEndActionCreator.getItemByIdEnd(tableId[0], idRefuse, null);
                    }
                }
            }
        })
        .catch(err => {
            Materialize.toast(err);
        });
}

function RemoveRefuseImmunity(idRefuse) {
    InCaseBtnApiUtils
        .removeRefuseImmunity(idRefuse)
        .then(data => {
            if (data.error != null) {
                Materialize.toast(data.error);
            }
            else {
                let tableId = TableStore.locateTableIds("inputCaseSanctions", data.id);
                if (tableId.length != 1) {
                    Materialize.toast("Ошибка идентификации подчинённой таблицы inputCaseSanctions " + data.id);
                    Materialize.toast("Обновите страницу");
                }
                else {
                    TableGetItemByIdStartActionCreator.getItemByIdStart(tableId[0], "inputStream/InCaseSanctionsView", idRefuse);
                }
            }
        })
        .catch(err => {
            Materialize.toast(err);
        });
}

function AcceptCases(selectedCases) {
    if (selectedCases == null || !Array.isArray(selectedCases) || selectedCases.length == 0) {
        Materialize.toast("Не выбраны записи");
        return;
    }
    for (let caseId of selectedCases) {
        InCaseBtnApiUtils.acceptCase(caseId)
            .then(
            data => {
                if (data != null && data.error != null) {
                    Materialize.toast(data.error);
                }
                else {
                    TableGetItemByIdStartActionCreator.getItemByIdStart("inputStreamCases", "inputStream/InCaseDescrView", caseId);
                }
            },
            err => {
                Materialize.toast(err);
            });
    }
    TableUnselectAllActionCreator.unselectAll("inputStreamCases");
}

function UndoAcceptCases(selectedCases) {
    if (selectedCases == null || !Array.isArray(selectedCases) || selectedCases.length == 0) {
        Materialize.toast("Не выбраны записи");
        return;
    }
    for (let caseId of selectedCases) {
        InCaseBtnApiUtils.undoAcceptCase(caseId)
            .then(
            data => {
                if (data != null && data.error != null) {
                    Materialize.toast(data.error);
                }
                else {
                    TableGetItemByIdStartActionCreator.getItemByIdStart("inputStreamCases", "inputStream/InCaseDescrView", caseId);
                }
            },
            err => {
                Materialize.toast(err);
            });
    }
    TableUnselectAllActionCreator.unselectAll("inputStreamCases");
}

function Identify() {
    let ids = GetIds("inputStreamCases");
    if (ids == null || !Array.isArray(ids) || ids.length == 0) {
        Materialize.toast("Не выбраны записи для идентификации");
        return;
    }
    let id = ids[0];
    let datesTreatment = `\n`;
    ids.forEach((id, i) => {
        datesTreatment += `${TableStore.getFieldValue("inputStreamCases", id, "period")}${(i % 3 != 2) ? "; " : `\n`}`;
    })
    ReactDOM.unmountComponentAtNode(document.getElementById("identMountPoint"));
    ReactDOM.render(<IdentificationRrzModal
        onResultRowDoubleClick={function (polisId) { AddIdentityInfo(polisId, ids); }}
        id="identityModal"
        style={{ width: "75%", overflow: "visible" }}
        firstName={TableStore.getFieldValue("inputStreamCases", id, "firstName")}
        middleName={TableStore.getFieldValue("inputStreamCases", id, "middleName")}
        lastName={TableStore.getFieldValue("inputStreamCases", id, "lastName")}
        birthday={TableStore.getFieldValue("inputStreamCases", id, "dr")}
        polisSerie={TableStore.getFieldValue("inputStreamCases", id, "polisSerie")}
        polisNumber={TableStore.getFieldValue("inputStreamCases", id, "polisNumber")}
        datesTreatment={datesTreatment}
    ></IdentificationRrzModal>, document.getElementById("identMountPoint"));
    $("#identityModal").openModal();
}

function AddIdentityInfo(polisId, caseIds) {
    $("#identityModal").closeModal();
    TableUnselectAllActionCreator.unselectAll("inputStreamCases");
    caseIds.forEach(caseId => {
        InCaseBtnApiUtils.identifyCase(caseId, polisId)
            .then(
            data => {
                if (data != null && data.error != null) {
                    Materialize.toast(data.error);
                }
                else {
                    TableGetItemByIdStartActionCreator.getItemByIdStart("inputStreamCases", "inputStream/InCaseDescrView", caseId);
                }
            },
            err => {
                Materialize.toast(err);
            });
    });
}

function ShowErzHistory() {
    let id = TableStore.getRightClickedRowId("inputStreamCases");
    if (id == null || id <= 0)
        return;
    ErzRepliesShowActionCreator.show(id);
}

function ShowUfmsRequest(personId) {
    let params = {
        PersonId: personId,
        UserName: UserInfoStore.get().shortName,
        UserPhone: UserInfoStore.get().phoneNumber
    }
    let mountPoint = document.getElementById("identMountPoint");
    ReactDOM.unmountComponentAtNode(document.getElementById("identMountPoint"));
    let elem = ReactDOM.render(<DocumentViewer
        id="documentMounted"
        style={{ width: "75vw", maxHeight: "96vh", height: "96vh", top: "2vh" }}
        reportPath="%2fInStream%2fDocuments%2fFMSRequest&rs:Command=Render"
        params={params}
        mountPoint="identMountPoint"></DocumentViewer>,
        mountPoint);
    $("#documentMounted").openModal();
}

function ShowHistory(props) {
    let rrzPolisId = TableStore.getFieldValue(props.ownerId, TableStore.getRightClickedRowId(props.ownerId), "rrzPolisId");
    let polisSerie = TableStore.getFieldValue(props.ownerId, TableStore.getRightClickedRowId(props.ownerId), "polisSerie");
    let polisNumber = TableStore.getFieldValue(props.ownerId, TableStore.getRightClickedRowId(props.ownerId), "polisNumber");
    let mountPoint = document.getElementById("identMountPoint");
    ReactDOM.unmountComponentAtNode(document.getElementById("identMountPoint"));
    let elem = ReactDOM.render(<History
        id="documentMounted"
        style={{ width: "90vw", maxHeight: "90vh", top: "2vh" }}
        params={{ rrzPolisId: rrzPolisId, polisSerie: polisSerie, polisNumber: polisNumber }}
        mountPoint="identMountPoint"></History>,
        mountPoint);
    $("#documentMounted").openModal();

}

function ShowAttachment(props) {
    let enp = TableStore.getFieldValue(props.ownerId, TableStore.getRightClickedRowId(props.ownerId), "enp");
    let fio = TableStore.getFieldValue(props.ownerId, TableStore.getRightClickedRowId(props.ownerId), "fio");
    let dr = moment(TableStore.getFieldValue(props.ownerId, TableStore.getRightClickedRowId(props.ownerId), "dr")).format("DD.MM.YYYY");
    ReactDOM.unmountComponentAtNode(document.getElementById("identMountPoint"));
    ReactDOM.render(<Attachment id="attachmentViewer" enp={enp} header={`${enp} ${fio} (${dr})`} style={{
        minHeight: "20vh",
        maxHeight: "95vh",
        width: "50vw",
        overflow: "visible"
    }}></Attachment>,
        document.getElementById("identMountPoint"));
    $("#attachmentViewer").openModal();

}

function SetRowStyle(tableId, keyFieldValue) {
    let colors = UserSettingsStore.getColorSettings();
    let styleAccepted = { color: colors.filter(val => { return val.target == "acc.accept" })[0].color };
    let styleDeclined = { color: colors.filter(val => { return val.target == "acc.decline" })[0].color };
    let styleUnknown = { color: colors.filter(val => { return val.target == "acc.unknown" })[0].color };
    let styleIdentified = { color: colors.filter(val => { return val.target == "acc.identified" })[0].color };
    let key = TableStore.getFieldValue(tableId, keyFieldValue, "oplataL1Fin");
    let subkeyValue = TableStore.getFieldValue(tableId, keyFieldValue, "sankRequestItFin");
    let subkey = (subkeyValue == null);
    switch (key) {
        case 1:
            return subkey ? styleAccepted : styleDeclined;
            break;
        case 2:
            return styleDeclined;
            break;
        case 3:
            return styleDeclined;
            break;
        default:
            if (!subkey) {
                return styleDeclined;
            }
            let rrzIdentified = TableStore.getFieldValue(tableId, keyFieldValue, "rrzIdentificationStateId");
            let isIdentified = rrzIdentified == 2 || rrzIdentified == 4 || rrzIdentified == 5;
            if (isIdentified == true) {
                return subkey ? styleIdentified : styleDeclined;
            }
            else {
                return styleUnknown;
            }
            break;
    }
}

export default InputRegistryView;