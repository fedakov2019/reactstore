"use strict";

import React from "react";
import ReactDOM from "react-dom";

import moment from "moment";

import Table from "../core/Table.react";
import RejectSelector from "../RejectSelector.react";
import MoRequestForm from "./MoRequestForm.react";

import DEditor from "./DEditor.react";

import Attachment from "../erz/Attachment.react";

import TableStore from "../../stores/TableStore";
import UserSettingsStore from "../../stores/UserSettingsStore";


import AppStateSetStateActionCreator from "../../actions/AppStateSetStateActionCreator";
import TableUnselectAllActionCreator from "../../actions/TableUnselectAllActionCreator";
import RejectSelectorSetCaseIdsActionCreator from "../../actions/RejectSelectorSetCaseIdsActionCreator";
import TableGetItemByIdStartActionCreator from "../../actions/TableGetItemByIdStartActionCreator";
import TableGetItemByIdEndActionCreator from "../../actions/TableGetItemByIdEndActionCreator";
import TableGetDataStartActionCreator from "../../actions/TableGetDataStartActionCreator";

import OutCaseBtnApiUtils from "../../utils/isolated/OutCaseBtnApiUtils";

import ContextMenuItemsCommon from "../shared/ContextMenuItems.Common";

import OutRegistryApiUtils from "../../utils/isolated/OutRegistryApiUtils";

import InformerSetInfoActionCreator from "../../actions/InformerSetInfoActionCreator";

import UserInfoStore from "../../stores/UserInfoStore";
import DocumentViewer from "../DocumentViewer.react";

class OutputRegistryView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            informerData: {}
        }
    }

    componentWillMount() {
        OutRegistryApiUtils.getRegShortInfo(this.props.id)
            .then(data => {
                InformerSetInfoActionCreator.setInfo(data);
            });
        AppStateSetStateActionCreator.setState({
            id: this.props.id,
            isD: this.props.isD
        });
    }

    componentWillUnmount() {
        InformerSetInfoActionCreator.setInfo(null);
    }
    render() {
        let tableId = "outputStreamCases";
        let tableController = "outputStream/OutCaseDescrView";
        if (this.props.isD === true) {
            tableId = "outputStreamCases";
            tableController = "outputStream/OutCaseDDescrView";
        }
        let buttonsReqConfig = [
            {
                id: 0,
                hint: "Удалить запрос",
                iconName: "delete",
                className: "md-normal",
                onClick: RemoveMoRequest,
                tableId: tableId,
                tableController: tableController
            }];
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
                        'data-table-id': "outputKsg",
                        'data-table-controller': "outputStream/OutKsgView",
                        style: { 'maxHeight': 450 + "px" },
                        itemsPerPage: "20",
                        hidePaginatorIfSinglePage: true,
                        canParallize: true
                    }
                },
                {
                    id: "subServ",
                    caption: "Услуги",
                    order: 2,
                    isActive: false,
                    type: "Table",
                    tabulatorConfigMods: { id: "id" },
                    config: {
                        'data-table-id': "outputStreamServices",
                        'data-table-controller': "outputStream/OutServiceView",
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
                            'data-table-id': "outputOnkSl",
                            'data-table-controller': "outputStream/OutOnkSlView",
                            itemsPerPage: "20",
                            canParallize: true
                        },
                        cons: {
                            'data-table-id': "outputOnkCons",
                            'data-table-controller': "outputStream/OutOnkConsView",
                            itemsPerPage: "20",
                            canParallize: true
                        },
                        napr: {
                            'data-table-id': "outputOnkNapr",
                            'data-table-controller': "outputStream/OutOnkNaprView",
                            style: { 'maxHeight': 450 + "px" },
                            itemsPerPage: "20",
                            hidePaginatorIfSinglePage: true,
                            canParallize: true
                        }
                    }
                },
                {
                    id: "subSanktions",
                    caption: "Отказы",
                    order: 4,
                    isActive: false,
                    type: "Table",
                    tabulatorConfigMods: { id: "id" },
                    config: {
                        'data-table-id': "outputCaseSanctions",
                        'data-table-controller': "outputStream/OutCaseSanctionsView",
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
                        }]
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
                        let res = TableStore.getFieldValue("outputStreamCases", currentConfig.config.conditionObj.id, "hasHistory");
                        return res === true;
                    },
                    config: {
                        'data-table-id': "outputCasePrevSanctions",
                        'data-table-controller': "outputStream/OutCasePrevSanctionsView",
                        style: { 'maxHeight': 450 + "px" },
                        itemsPerPage: "20",
                        hidePaginatorIfSinglePage: true,
                        canParallize: true
                    }
                },
                {
                    id: "moRequests",
                    caption: "Запросы в МО",
                    order: 50,
                    isActive: false,
                    type: "Table",
                    tabulatorConfigMods: { id: "id" },
                    config: {
                        'data-table-id': "outputMoRequests",
                        'data-table-controller': "outputStream/OutMoRequestsView",
                        style: { 'maxHeight': 450 + "px" },
                        itemsPerPage: "20",
                        hidePaginatorIfSinglePage: true,
                        canParallize: true,
                        buttonsConfig: buttonsReqConfig
                    }
                }
            ]
        };
        let buttonsConfig = [
            {
                id: 0,
                hint: "Создать дополнительную информацию",
                iconName: "bookmark_border",
                inRole: ["mtr"],
                onClick: CreateD,
                isVisible: CreateDVisible,
                tableId: tableId,
                tableController: tableController
            },
            {
                id: 1,
                hint: "Доп. информация создана",
                iconName: "bookmark",
                inRole: ["mtr", "ofs", "kmp"],
                isVisible: HasDVisible
            },
            {
                id: 10,
                hint: "Редактировать дополнительную информацию",
                iconName: "edit",
                inRole: ["mtr"],
                onClick: ShowDEditor,
                isVisible: () => { return this.props.isD === true; },
                tableId: tableId,
                tableController: tableController
            },
            {
                id: 2,
                hint: "Создать запрос в МО",
                iconName: "chat_bubble_outline",
                inRole: ["mtr"],
                onClick: (id, props) => OpenMoRequestForm([id], props.tableId, props.tableController),
                isVisible: CreateMoRequestVisible,
                tableId: tableId,
                tableController: tableController
            },
            {
                id: 3,
                hint: "Запрос в МО создан",
                iconName: "chat_bubble",
                inRole: ["mtr", "ofs", "kmp"],
                isVisible: HasMoRequestVisible
            },
            {
                id: 4,
                hint: "Создать отказ для МО",
                iconName: "rotate_left",
                inRole: ["mtr"],
                onClick: (id) => { OpenRejectSelector([id]); },
                isVisible: () => { return this.props.isD === true; },
                tableId: tableId,
                tableController: tableController
            },
            {
                id: 5,
                hint: "Содержит отказ для МО",
                iconName: "highlight_off",
                inRole: ["mtr", "ofs", "kmp"],
                isVisible: HasRefuseMoVisible
            },
            {
                id: 100,
                hint: "Удалить дополнительную информацию",
                iconName: "delete",
                inRole: ["mtr"],
                onClick: RemoveD,
                isVisible: () => { return this.props.isD === true; },
                tableId: tableId,
                tableController: tableController
            }
        ];
        let tableContextMenuConfig = {
            mountPoint: "outputStreamCasesSvc",
            items: [
                {
                    key: "addD",
                    onClick: (event, props) => { console.log(event, props) },
                    caption: "Создать дополнительную информацию",
                    inRole: ["mtr"],
                    //isVisible: props => { CreateDVisible(GetRightClickedId(props.ownerId), props); } вообще-то работает.. но я подумала и скрыла.
                    isVisible: false
                },
                {
                    key: "createMoRequest",
                    onClick: (event, props) => { },
                    caption: "Создать запрос в МО",
                    inRole: ["mtr"],
                    isVisible: false
                },
                {
                    key: "viewMoRequests",
                    onClick: (event, props) => { },
                    caption: "Просмотреть запросы в МО",
                    isVisible: false,
                    inRole: ["mtr"]
                },
                {
                    key: "addRefuse",
                    onClick: (event, props) => { OpenRejectSelector(GetIds(props.ownerId)); },
                    caption: "Создать отказ для МО",
                    inRole: ["mtr"],
                    isVisible: false
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
                    key: "ViewPrintable",
                    onClick: (event, props) => {
                        ShowInPrintableForm(GetIds(props.ownerId));
                    },
                    inRole: ["mtr"],
                    caption: "Просмотр в форме для печати"
                },
                {
                    key: "ShowColumnEditor",
                    onClick: (event, props) => {
                        ContextMenuItemsCommon.showColumnEditor(event, props);
                    },
                    caption: "Состав колонок",
                    mountPoint: "outputStreamCasesSvc"
                },
                {
                    key: "SaveTableSettings",
                    onClick: (event, props) => { ContextMenuItemsCommon.saveTableSettings(event, props); },
                    caption: "Сохранить настройки таблицы"
                }
            ]
        };
        return <div className="card input-stream" style={{ 'minHeight': 80 + "vh", overflow: "visible" }}>
            <div id="outputStreamCasesTop1"></div>
            <div className="card-content">
                <Table data-table-id={tableId}
                    data-table-controller={tableController}
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
                <RejectSelector id="rejectSelector" onSuccess={AddReject} onTemplateAdd={AddTemplate} onTemplateRemove={RemoveTemplate}
                    tableConfig={{
                        'data-table-id': "outputRefuseCodeSelector",
                        'data-table-controller': "outputStream/OutSankCode",
                        itemsPerPage: 20,
                        canParallize: false,
                        hasPaginatorOnTop: true
                    }}
                    tableTemplatesConfig={{
                        'data-table-id': "outputUserRefuseSelector",
                        'data-table-controller': "outputStream/OutUserSankCode",
                        itemsPerPage: 20,
                        canParallize: false,
                        hasPaginatorOnTop: true
                    }}
                    isExpertise={true} expertiseId="outputExpertise"
                ></RejectSelector>
                <div id="modalMountPoint"></div>
                <div id="identMountPoint"></div>
            </div>
        </div>;
    }
};


function GetIds(tableId) {
    let ids = TableStore.getSelectedRows(tableId);
    if (ids == null || !Array.isArray(ids) || ids.length <= 0) {
        let id = TableStore.getRightClickedRowId(tableId);
        if (id != null)
            ids = [id];
    }
    return ids;
}

function GetRightClickedId(tableId) {
    let id = TableStore.getRightClickedRowId(tableId);
    return id;
}

function CreateD(id, props) {
    OutCaseBtnApiUtils.createD([id])
        .then(
            dataArr => {
                if (dataArr == null)
                    return;
                dataArr.forEach(data => {
                    if (data != null && data.error != null) {
                        Materialize.toast(data.error);
                        return;
                    }
                    TableGetItemByIdStartActionCreator.getItemByIdStart(props.tableId, props.tableController, id);
                });
            },
            err => {
                Materialize.toast(err);
                return;
            });
}

function RemoveD(id, props) {
    OutCaseBtnApiUtils.removeD([id])
        .then(
            data => {
                if (data != null && data.error != null) {
                    Materialize.toast(data.error);
                    return;
                }
                TableGetItemByIdEndActionCreator.getItemByIdEnd(props.tableId, id, null);
            },
            err => {
                Materialize.toast(err);
                return;
            });
}

function CreateDVisible(id, props) {
    let val = TableStore.getFieldValue(props.ownerId, id, "status");
    return val == 120 || val == 130;
}

function HasDVisible(id, props) {
    let val = TableStore.getFieldValue(props.ownerId, id, "status");
    return val == 140 || val == 150;
}

function OpenMoRequestForm(ids, tableId, tableController) {
    ReactDOM.unmountComponentAtNode(document.getElementById("modalMountPoint"));
    ReactDOM.render(<MoRequestForm id="moRequestForm" onOkClick={CreateMoRequest} ids={ids} style={{
        minHeight: "50vh",
        maxHeight: "95vh",
        width: "50vw",
        overflow: "visible"
    }}
        tableId={tableId} tableController={tableController}
    ></MoRequestForm>,
        document.getElementById("modalMountPoint"));
    $("#moRequestForm").openModal();
}

function CreateMoRequest(ids, text, date, tableId, tableController) {
    $("#moRequestForm").closeModal();
    if (ids == null || !Array.isArray(ids) || ids.length == 0) {
        return;
    }
    /*if (text == null || text == "") {
        Materialize.toast("Не задан текст запроса");
    }*/
    if (date == null) {
        return;
    }
    ids.forEach(id => {
        OutCaseBtnApiUtils.addMoRequest(id, date, text).then(data => {
            if (data != null && data.error != null) {
                Materialize.toast(data.error);
            }
            TableGetItemByIdStartActionCreator.getItemByIdStart(tableId,
                tableController,
                id);
            let subTableId = TableStore.locateTableIds("outputMoRequests", id);
            if (subTableId.length > 1) {
                Materialize.toast("Ошибка идентификации подчинённой таблицы outputMoRequests " + caseId);
                throw null;
            }
            else {
                if (subTableId.length == 1) {
                    if (TableStore.hasData(subTableId[0])) {
                        TableGetItemByIdStartActionCreator.getItemByIdStart(subTableId[0], "outputStream/OutMoRequestsView", data.id);
                    } else {
                        TableGetDataStartActionCreator.getDataStart(subTableId [0], "outputStream/OutMoRequestsView", true, { id: id });
                    }
                }
            }
        },
            err => {
                Materialize.toast(err);
            });
    });
}

function CreateMoRequestVisible(id, props) {
    let val = TableStore.getFieldValue(props.ownerId, id, "status");
    return val == 120; /* || val == 140 || val == 130;*/
}

function HasMoRequestVisible(id, props) {
    let val = TableStore.getFieldValue(props.ownerId, id, "status");
    return val == 130;
}

function RemoveMoRequest(id, props) {
    if (id == null) {
        return;
    }
    OutCaseBtnApiUtils.removeMoRequest(id).then(data => {
        if (data != null && data.error != null) {
            Materialize.toast(data.error);
        }
        TableGetItemByIdStartActionCreator.getItemByIdStart(props.tableId,
            props.tableController,
            data.id);
        let tableId = TableStore.locateTableIds("outputMoRequests", data.id);
        if (tableId.length > 1) {
            Materialize.toast("Ошибка идентификации подчинённой таблицы outputMoRequests " + data.id);
            throw null;
        }
        else {
            TableGetItemByIdEndActionCreator.getItemByIdEnd(tableId[0], id, null);
        }
    },
        err => {
            Materialize.toast(err);
        });
}

/*-----------------*/

function ShowDEditor(id, props) {
    ReactDOM.unmountComponentAtNode(document.getElementById("modalMountPoint"));

    OutCaseBtnApiUtils.getDRaw(id)
        .then(data => {
            if (data == null) {
                Materialize.toast("Сервер не вернул результата");
            }
            ReactDOM.render(<DEditor id="dEditor" onOkClick={ApplyDEdits} idCase={id} style={{
                minHeight: "20vh",
                maxHeight: "95vh",
                width: "50vw",
                overflow: "visible"
            }}
                tableId={props.tableId} tableController={props.tableController}
                initialData={data} onClick={ApplyDEdits}
            ></DEditor>,
                document.getElementById("modalMountPoint"));
            $("#dEditor").openModal();
        }, err => {
            Materialize.toast(err);
        });
}

function ApplyDEdits(edits, props) {
    OutCaseBtnApiUtils.updateD(edits).then(data => {
        if (Array.isArray(data)) {
        }
        else {
            data = [data];
        }
        data = data.filter(r => r != null);
        data.filter(r => r != null && r.error != null).forEach(r => Materialize.toast(r.error));
        data.filter(r => r != null && r.id != null)
            .map(r => r.id)
            .filter((value, index, self) => { return self.indexOf(value) === index; })
            .forEach(r => TableGetItemByIdStartActionCreator.getItemByIdStart(props.tableId,
                props.tableController,
                r/*edits[0].id*/));

    },
        err => {
            Materialize.toast(err);
        });
}


/*------------------------*/



function HasRefuseMoVisible(id, props) {
    return false;
}

function AddRefuseMoVisible(id, props) {
    let val = TableStore.getFieldValue(props.ownerId, id, "status");
    return val == 170;
}


function OpenRejectSelector(ids) {
    if (ids == null || !Array.isArray(ids) || ids.length <= 0) {
        Materialize.toast("Не выбраны записи");
        return;
    }
    RejectSelectorSetCaseIdsActionCreator.setCaseIds(ids);

    TableUnselectAllActionCreator.unselectAll("outputRefuseCodeSelector");
    TableUnselectAllActionCreator.unselectAll("outputUserRefuseSelector");

    $("#rejectSelector").openModal();
}

function AddReject(selectedCases, refuseIds, comment, data) {
    if (data == null) {
        Matetialize.toast("Не указаны сведения об экспертизе");
        return;
    }
    for (let caseId of selectedCases) {
        OutCaseBtnApiUtils.addRefuse(caseId, refuseIds, comment, data)
            .then(
                data => {
                    let message = data.filter(val => { return val.error != null }).map(val => { return val.error })
                        .join("; ");
                    if (message > "") {
                        Materialize.toast(message);
                        throw null; //doesn't need continuation
                    }
                    return data.filter(val => { return val.error == null }).map(val => { return val.id });
                },
                err => {
                    let message = data.filter(val => { return val != null }).join();
                    Materialize.toast(message);
                }
            )
            .then(refuseIds => {
                TableGetItemByIdStartActionCreator.getItemByIdStart("outputStreamCases",
                    "outputStream/OutCaseDDescrView",
                    caseId);
                let tableId = TableStore.locateTableIds("outputCaseSanctions", caseId);
                if (tableId.length > 1) {
                    Materialize.toast("Ошибка идентификации подчинённой таблицы outputCaseSanctions " + caseId);
                    throw null;
                } else {
                    if (tableId.length == 1) {
                        if (TableStore.hasData(tableId[0])) {
                            refuseIds.forEach(refuseId => {
                                TableGetItemByIdStartActionCreator.getItemByIdStart(tableId[0],
                                    "outputStream/OutCaseSanctionsView",
                                    refuseId);
                            });
                        } else {
                            TableGetDataStartActionCreator.getDataStart(tableId[0],
                                "outputStream/OutCaseSanctionsView",
                                true,
                                { id: caseId });
                        }
                    } else {
                    } //do nothing - no such table in memory (not rendered?)
                }
            },
                err => { });
    }
    TableUnselectAllActionCreator.unselectAll("outputStreamCases");
}

function AddTemplate(refuseId, comment) {
    throw "not verified";
    OutCaseBtnApiUtils.addRefuseTemplate(refuseId, comment)
        .then(data => {
            TableGetItemByIdStartActionCreator.getItemByIdStart("outputUserRefuseSelector", "outputStream/OutUserSankCode", data);
        },
            err => {
                Materialize.toast(err);
            }
        );
}

function RemoveTemplate(idTemplate) {
    throw "not verified";
    OutCaseBtnApiUtils
        .removeRefuseTemplate(idTemplate)
        .then(data => {
            if (data != 0) {
                Materialize.toast(`Ошибка удаления шаблона ${data}`);
            }
            else {
                TableGetItemByIdEndActionCreator.getItemByIdEnd("outputUserRefuseSelector", idTemplate, null);
            }
        })
        .catch(err => {
            Materialize.toast(err);
        });
}

function RemoveRefuse(idRefuse) {
    OutCaseBtnApiUtils
        .removeRefuse(idRefuse)
        .then(data => {
            if (data.error != null) {
                Materialize.toast(data.error);
            }
            else {
                TableGetItemByIdStartActionCreator.getItemByIdStart("outputStreamCases", "outputStream/OutCaseDDescrView", data.id);
                let tableId = TableStore.locateTableIds("outputCaseSanctions", data.id);
                if (tableId.length != 1) {
                    Materialize.toast("Ошибка идентификации подчинённой таблицы outputCaseSanctions " + data.id);
                    Materialize.toast("Обновите страницу");
                }
                else {
                    TableGetItemByIdEndActionCreator.getItemByIdEnd(tableId[0], idRefuse, null);
                }
            }
        })
        .catch(err => {
            Materialize.toast(err);
        });
}

function ShowAttachment(props) {
    let enp = TableStore.getFieldValue(props.ownerId, GetRightClickedId(props.ownerId), "enp");
    let fio = TableStore.getFieldValue(props.ownerId, GetRightClickedId(props.ownerId), "fio");
    let dr = moment(TableStore.getFieldValue(props.ownerId, GetRightClickedId(props.ownerId), "dr")).format("DD.MM.YYYY");
    ReactDOM.unmountComponentAtNode(document.getElementById("modalMountPoint"));
    ReactDOM.render(<Attachment id="attachmentViewer" enp={enp} header={`${enp} ${fio} (${dr})`} style={{
        minHeight: "20vh",
        maxHeight: "95vh",
        width: "50vw",
        overflow: "visible"
    }}></Attachment>,
        document.getElementById("modalMountPoint"));
    $("#attachmentViewer").openModal();

}


function ShowInPrintableForm(ids) {
    if (ids == null || ids.length == 0) {
        return;
    }

    /*let params = {
        RegistryId: id,
        UserName: UserInfoStore.get().shortName,
        UserPhone: UserInfoStore.get().phoneNumber,
        UserDepartment: UserInfoStore.get().department,
        UserJob: UserInfoStore.get().position,
        UserEMail: UserInfoStore.get().email
    }*/

    let params = {
        ids
    }

    let mountPoint = document.getElementById("modalMountPoint");
    let elem = ReactDOM.render(<DocumentViewer
        id="documentMounted"
        style={{ width: "75vw", maxHeight: "96vh", height: "96vh", top: "2vh" }}
        reportPath="%2fOutStream%2fMisc%2fOutSelectedAccountsView&rs:Command=Render"
        params={params}
        mountPoint="modalMountPoint"></DocumentViewer>,
        mountPoint);
    $("#documentMounted").openModal();

}

function SetRowStyle(tableId, keyFieldValue) {
    let colors = UserSettingsStore.getColorSettings();
    let styleAccepted = { color: colors.filter(val => { return val.target === "acc.accept" })[0].color };
    let styleDeclined = { color: colors.filter(val => { return val.target === "acc.decline" })[0].color };
    let styleUnknown = { color: colors.filter(val => { return val.target === "acc.unknown" })[0].color };
    let styleIdentified = { color: colors.filter(val => { return val.target === "acc.identified" })[0].color };
    let key = TableStore.getFieldValue(tableId, keyFieldValue, "oplataL1Fin");
    switch (key) {
        case 1:
            return styleAccepted;
        case 2:
            return styleDeclined;
        case 3:
            return styleDeclined;
        default:
            return styleUnknown;
    }
}

export default OutputRegistryView;