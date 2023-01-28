"use strict";

import React from "react";
import ReactDOM from "react-dom";
import moment from "moment";

import Table from "../core/Table.react";
import RejectSelector from "../RejectSelector.react";
import Attachment from "../erz/Attachment.react";

import TableStore from "../../stores/TableStore";
import UserSettingsStore from "../../stores/UserSettingsStore";

import AppStateSetStateActionCreator from "../../actions/AppStateSetStateActionCreator";
import TableUnselectAllActionCreator from "../../actions/TableUnselectAllActionCreator";
import RejectSelectorSetCaseIdsActionCreator from "../../actions/RejectSelectorSetCaseIdsActionCreator";
import TableGetItemByIdStartActionCreator from "../../actions/TableGetItemByIdStartActionCreator";
import TableGetItemByIdEndActionCreator from "../../actions/TableGetItemByIdEndActionCreator";
import TableGetDataStartActionCreator from "../../actions/TableGetDataStartActionCreator";
import TableFilterActionCreator from "../../actions/TableFilterActionCreator";

import ContextMenuItemsCommon from "../shared/ContextMenuItems.Common";

import MoCaseBtnApiUtils from "../../utils/isolated/MoCaseBtnApiUtils";
import MoRegistryApiUtils from "../../utils/isolated/MoRegistryApiUtils";

import InformerSetInfoActionCreator from "../../actions/InformerSetInfoActionCreator";

import InputBoxString from "../simple/InputBoxString.react";

import History from "../history/History.react";


class MoRegistryView extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        MoRegistryApiUtils.getRegShortInfo(this.props.initials.id)
            .then(data => {
                InformerSetInfoActionCreator.setInfo(data);
            });
        AppStateSetStateActionCreator.setState({
            id: this.props.initials.id,
            type: this.props.initials.type
        });
    }
    componentWillUnmount() {
        InformerSetInfoActionCreator.setInfo(null);
    }
    render() {
        let tableId = null;
        if (this.props == null || this.props.initials.type == null) {
            return <div>Неизвестный тип файла</div>;
        }
        switch (this.props.initials.type[0]) {
            case "H":
                tableId = "moCasesCommon";
                break;
            case "T":
                tableId = "moCasesHmp";
                break;
            case "D":
                tableId = "moCasesDisp";
                break;
            case "C":
                tableId = "moCasesOnk";
                break;
            default:
                return <div>Неизвестный тип файла</div>;
        }

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
                        'data-table-id': "moKsg",
                        'data-table-controller': "moStream/MoKsgView",
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
                        'data-table-id': "moStreamServices",
                        'data-table-controller': "moStream/MoServiceView",
                        itemsPerPage: "20",
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
                            'data-table-id': "moOnkSl",
                            'data-table-controller': "moStream/MoOnkSlView",
                            itemsPerPage: "20",
                            canParallize: true
                        },
                        cons: {
                            'data-table-id': "moOnkCons",
                            'data-table-controller': "moStream/MoOnkConsView",
                            itemsPerPage: "20",
                            canParallize: true
                        },
                        napr: {
                            'data-table-id': "moOnkNapr",
                            'data-table-controller': "moStream/MoOnkNaprView",
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
                        'data-table-id': "moCaseSanctions",
                        'data-table-controller': "moStream/MoCaseSanctionsView",
                        style: { 'maxHeight': 450 + "px" },
                        itemsPerPage: "20",
                        hidePaginatorIfSinglePage: true,
                        canParallize: true,
                        buttonsConfig: [{
                            id: 0,
                            hint: "Удалить отказ",
                            iconName: "delete",
                            className: "md-normal",
                            casesTableId: tableId,
                            onClick: RemoveRefuse
                        }]
                    }
                },
                {
                    id: "subNotices",
                    caption: "Визуальный контроль",
                    order: 5,
                    isActive: false,
                    type: "Table",
                    tabulatorConfigMods: { id: "id" },
                    config: {
                        'data-table-id': "moCaseNotices",
                        'data-table-controller': "moStream/MoCaseMekNoticesView",
                        style: { 'maxHeight': 450 + "px" },
                        itemsPerPage: "20",
                        hidePaginatorIfSinglePage: true,
                        canParallize: true
                    }
                }
            ]
        };
        let buttonsConfig = [
            {
                id: 0,
                hint: "Добавить отказ",
                iconName: "rotate_left",
                className: "md-red",
                casesTableId: tableId,
                onClick: function (id) {
                    OpenRejectSelector([id]);
                },
                isVisible: (id, props) => {
                    return TableStore.getFieldValue(props.ownerId, id, "sumP") == null;
                }
            }
        ];

        let tableContextMenuConfig = {
            mountPoint: `${tableId}Svc`,
            items: [
                {
                    key: "addRefuse",
                    onClick: (event, props) => { OpenRejectSelector(GetIds(props.ownerId)); },
                    caption: "Отказать",
                    isVisible: CheckAddRefuseVisible
                },
                {
                    key: "accept",
                    casesTableId: tableId,
                    onClick: (event, props) => { AcceptCases(GetIds(props.ownerId), props); },
                    caption: "Оплатить",
                    inRole: ["mtr"],
                    isVisible: CheckAcceptVisible
                },
                {
                    key: "undoAccept",
                    casesTableId: tableId,
                    onClick: (event, props) => { UndoAcceptCases(GetIds(props.ownerId), props); },
                    caption: "Снять оплату",
                    inRole: ["mtr"],
                    isVisible: CheckUndoAcceptVisible
                },
                {
                    key: "updateComment",
                    casesTableId: tableId,
                    onClick: (event, props) => { OpenCommentUpdater(GetIds(props.ownerId), props); },
                    caption: "Изменить комментарий",
                    inRole: ["mtr"],
                    isVisible: CheckUpdateCommentVisible
                },
                {
                    key: "ShowRefusedOnly",
                    casesTableId: tableId,
                    onClick: (event, props) => {
                        TableFilterActionCreator.filter(props.casesTableId, "oplata", { items: { 2: true, 3: true }, showEmpty: false, showNotEmpty: false });
                    },
                    caption: "Показать только отказанные"
                },
                {
                    key: "history",
                    onClick: (event, props) => { ShowHistory(props); },
                    caption: "Поиск счетов",
                    inRole: ["mtr", "ofs", "kmp"]
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
                    key: "SwitchExportStatusOn",
                    caption: "Экспорт на территорию вкл/выкл",
                    inRole: ["mtr"],
                    onClick: (event, props) => {
                        SwitchExportStatus(props);
                    }
                },
                {
                    key: "addExpertise",
                    onClick: (event, props) => { OpenExpCreator(GetIds(props.ownerId)); },
                    caption: "Добавить в выборку для экспертизы",
                    isVisible: true
                },
                {
                    key: "ShowColumnEditor",
                    onClick: (event, props) => {
                        ContextMenuItemsCommon.showColumnEditor(event, props);
                    },
                    caption: "Состав колонок",
                    mountPoint: `${tableId}Svc`
                },
                {
                    key: "SaveTableSettings",
                    onClick: (event, props) => { ContextMenuItemsCommon.saveTableSettings(event, props); },
                    caption: "Сохранить настройки таблицы"
                }
            ]
        };

        return <div className="card input-stream" style={{ 'minHeight': 80 + "vh", overflow: "visible" }}>
            <div className="card-content">
                <Table data-table-id={tableId}
                    data-table-controller="moStream/MoCaseDescrView"
                    itemsPerPage="5"
                    conditionObj={this.props.initials.id}
                    canParallize={true}
                    contextMenuConfig={tableContextMenuConfig}
                    contextMenuConfig={tableContextMenuConfig}
                    tabulatorConfig={tabulatorConfig}
                    buttonsConfig={buttonsConfig}
                    rowStyleMod={SetRowStyle}
                    hasPaginatorOnTop={true}
                    onPageSwitch={() => { document.location = "#windowTop" }}>
                </Table>
                <RejectSelector id="rejectSelector" onSuccess={AddReject} onTemplateAdd={AddTemplate} onTemplateRemove={RemoveTemplate} casesTableId={tableId}
                    tableConfig={{
                        'data-table-id': "moRefuseCodeSelector",
                        'data-table-controller': "moStream/MoSankCode",
                        itemsPerPage: 20,
                        canParallize: false,
                        hasPaginatorOnTop: true

                    }}
                    tableTemplatesConfig={{
                        'data-table-id': "moUserRefuseSelector",
                        'data-table-controller': "moStream/MoUserSankCode",
                        itemsPerPage: 20,
                        canParallize: false,
                        hasPaginatorOnTop: true
                    }}>
                </RejectSelector>
                <div id="tempMountPoint"></div>
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

function OpenExpCreator(ids) {
    if (ids == null || !Array.isArray(ids) || ids.length <= 0) {
        Materialize.toast("Не выбраны записи");
        return;
    }
    RejectSelectorSetCaseIdsActionCreator.setCaseIds(ids);
    TableUnselectAllActionCreator.unselectAll("moRefuseCodeSelector");
    TableUnselectAllActionCreator.unselectAll("moUserRefuseSelector");
    $("#rejectSelector").openModal();
}

function OpenRejectSelector(ids) {
    if (ids == null || !Array.isArray(ids) || ids.length <= 0) {
        Materialize.toast("Не выбраны записи");
        return;
    }
    RejectSelectorSetCaseIdsActionCreator.setCaseIds(ids);
    TableUnselectAllActionCreator.unselectAll("moRefuseCodeSelector");
    TableUnselectAllActionCreator.unselectAll("moUserRefuseSelector");
    $("#rejectSelector").openModal();
}

function AddReject(selectedCases, refuseIds, comment, partialSum, props) {
    for (let caseId of selectedCases) {
        MoCaseBtnApiUtils.addRefuse(caseId, refuseIds, comment, partialSum)
            .then(
                data => {
                    let message = data.filter(val => { return val.error != null }).map(val => { return val.error }).join("; ");
                    if (message > "") {
                        Materialize.toast(message);
                        throw null; //don't need continuation
                    }
                    return data.filter(val => { return val.error == null }).map(val => { return val.id });
                },
                err => {
                    let message = data.filter(val => { return val != null }).join();
                    Materialize.toast(message);
                }
            )
            .then(refuseIds => {
                TableGetItemByIdStartActionCreator.getItemByIdStart(props.casesTableId, "moStream/MoCaseDescrView", caseId);
                let tableId = TableStore.locateTableIds("moCaseSanctions", caseId);
                if (tableId.length > 1) {
                    Materialize.toast("Ошибка идентификации подчинённой таблицы moCaseSanctions " + caseId);
                    throw null;
                } else {
                    if (tableId.length == 1) {
                        if (TableStore.hasData(tableId[0])) {
                            refuseIds.forEach(refuseId => {
                                TableGetItemByIdStartActionCreator.getItemByIdStart(tableId[0], "moStream/MoCaseSanctionsView", refuseId);
                            });
                        } else {
                            TableGetDataStartActionCreator.getDataStart(tableId[0], "moStream/MoCaseSanctionsView", true, { id: caseId });
                        }
                    } else {
                    } //do nothing - no such table in memory (not rendered?)
                }
            },
                err => { });
    }
    TableUnselectAllActionCreator.unselectAll(props.casesTableId);
}

function AddTemplate(refuseId, comment) {
    MoCaseBtnApiUtils.addRefuseTemplate(refuseId, comment)
        .then(data => {
            TableGetItemByIdStartActionCreator.getItemByIdStart("moUserRefuseSelector", "moStream/MoUserSankCode", data);
        },
            err => {
                Materialize.toast(err);
            }
        );
}

function RemoveTemplate(idTemplate) {
    MoCaseBtnApiUtils
        .removeRefuseTemplate(idTemplate)
        .then(data => {
            if (data != 0) {
                Materialize.toast(`Ошибка удаления шаблона ${data}`);
            }
            else {
                TableGetItemByIdEndActionCreator.getItemByIdEnd("moUserRefuseSelector", idTemplate, null);
            }
        })
        .catch(err => {
            Materialize.toast(err);
        });
}

function RemoveRefuse(idRefuse, props) {
    MoCaseBtnApiUtils
        .removeRefuse(idRefuse)
        .then(data => {
            if (data.error != null) {
                Materialize.toast(data.error);
            }
            else {
                TableGetItemByIdStartActionCreator.getItemByIdStart(props.casesTableId, "moStream/MoCaseDescrView", data.id);
                let tableId = TableStore.locateTableIds("moCaseSanctions", data.id);
                if (tableId.length != 1) {
                    Materialize.toast("Ошибка идентификации подчинённой таблицы moCaseSanctions " + data.id);
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
function AcceptCases(selectedCases, props) {
    if (selectedCases == null || !Array.isArray(selectedCases) || selectedCases.length == 0) {
        Materialize.toast("Не выбраны записи");
        return;
    }
    for (let caseId of selectedCases) {
        MoCaseBtnApiUtils.acceptCase(caseId)
            .then(
                data => {
                    if (data != null && data.error != null) {
                        Materialize.toast(data.error);
                    }
                    else {
                        TableGetItemByIdStartActionCreator.getItemByIdStart(props.casesTableId, "moStream/MoCaseDescrView", caseId);
                    }
                },
                err => {
                    Materialize.toast(err);
                });
    }
    TableUnselectAllActionCreator.unselectAll(props.casesTableId);
}

function UndoAcceptCases(selectedCases, props) {
    if (selectedCases == null || !Array.isArray(selectedCases) || selectedCases.length == 0) {
        Materialize.toast("Не выбраны записи");
        return;
    }
    for (let caseId of selectedCases) {
        MoCaseBtnApiUtils.undoAcceptCase(caseId)
            .then(
                data => {
                    if (data != null && data.error != null) {
                        Materialize.toast(data.error);
                    }
                    else {
                        TableGetItemByIdStartActionCreator.getItemByIdStart(props.casesTableId, "moStream/MoCaseDescrView", caseId);
                    }
                },
                err => {
                    Materialize.toast(err);
                });
    }
    TableUnselectAllActionCreator.unselectAll(props.casesTableId);
}

function SetRowStyle(tableId, keyFieldValue) {
    let colors = UserSettingsStore.getColorSettings();
    let styleAccepted = { color: colors.filter(val => { return val.target == "acc.accept" })[0].color };
    let styleDeclined = { color: colors.filter(val => { return val.target == "acc.decline" })[0].color };
    let styleUnknown = { color: colors.filter(val => { return val.target == "acc.unknown" })[0].color };
    let styleIdentified = { color: colors.filter(val => { return val.target == "acc.identified" })[0].color };
    let key = TableStore.getFieldValue(tableId, keyFieldValue, "oplata");
    switch (key) {
        case 1:
            return styleAccepted;
            break;
        case 2:
            return styleDeclined;
            break;
        case 3:
            return styleDeclined;
            break;
        default:
            return styleUnknown;
            break;
    }
}

function OpenCommentUpdater(ids, props) {
    if (ids == null || !Array.isArray(ids) || ids.length <= 0) {
        Materialize.toast("Не выбраны записи");
        return;
    }
    ReactDOM.unmountComponentAtNode(document.getElementById("tempMountPoint"));
    ReactDOM.render(
        <InputBoxString id="setComment" textCaption="Введите комментарий" text={GetCommentText(ids, props.ownerId)} onOkClick={UpdateComment} ids={ids} casesTableId={props.casesTableId}></InputBoxString>,
        document.getElementById("tempMountPoint"));
    $("#setComment").openModal();
}

function GetCommentText(ids, tableId) {
    let comment = ids.map(id => { return TableStore.getFieldValue(tableId, id, "comentSl") }).find(val => { return val > ""; });
    if (comment == undefined) {
        return null;
    }
    return comment;
}

function UpdateComment(comment, props) {
    let selectedCases = props.ids;
    if (selectedCases == null || !Array.isArray(selectedCases) || selectedCases.length == 0) {
        Materialize.toast("Не выбраны записи");
        return;
    }
    for (let caseId of selectedCases) {
        MoCaseBtnApiUtils.updateComment(caseId, comment)
            .then(
                data => {
                    if (data != null && data.error != null) {
                        Materialize.toast(data.error);
                    }
                    else {
                        TableGetItemByIdStartActionCreator.getItemByIdStart(props.casesTableId, "moStream/MoCaseDescrView", caseId);
                    }
                },
                err => {
                    Materialize.toast(err);
                });
    }
    TableUnselectAllActionCreator.unselectAll(props.casesTableId);
}

function ShowHistory(props) {
    let enp = TableStore.getFieldValue(props.ownerId, TableStore.getRightClickedRowId(props.ownerId), "enp");
    let polisSerie = TableStore.getFieldValue(props.ownerId, TableStore.getRightClickedRowId(props.ownerId), "sPolis");
    let polisNumber = TableStore.getFieldValue(props.ownerId, TableStore.getRightClickedRowId(props.ownerId), "nPolis");
    let mountPoint = document.getElementById("tempMountPoint");
    ReactDOM.unmountComponentAtNode(document.getElementById("tempMountPoint"));
    let elem = ReactDOM.render(<History
        id="documentMounted"
        style={{ width: "90vw", maxHeight: "90vh", top: "2vh" }}
        params={{ enp: enp, polisSerie: polisSerie, polisNumber: polisNumber }}
        mountPoint="identMountPoint"></History>,
        mountPoint);
    $("#documentMounted").openModal();

}

function GetRightClickedCaseSumP(props) {
    let id = TableStore.getRightClickedRowId(props.ownerId);
    if (id == null)
        return false;
    let val = TableStore.getFieldValue(props.ownerId, id, "sumP");
    return val;
}

function CheckAddRefuseVisible(props) {
    let sum = GetRightClickedCaseSumP(props);
    return sum == null;
}

function CheckAcceptVisible(props) {
    let sum = GetRightClickedCaseSumP(props);
    return sum == null;
}

function CheckUndoAcceptVisible(props) {
    let sum = GetRightClickedCaseSumP(props);
    return sum != null;
}

function CheckUpdateCommentVisible(props) {
    let sum = GetRightClickedCaseSumP(props);
    return sum == null;
}

function ShowAttachment(props) {
    let enp = TableStore.getFieldValue(props.ownerId, TableStore.getRightClickedRowId(props.ownerId), "enp");
    let fio = TableStore.getFieldValue(props.ownerId, TableStore.getRightClickedRowId(props.ownerId), "fio");
    let dr = moment(TableStore.getFieldValue(props.ownerId, TableStore.getRightClickedRowId(props.ownerId), "dr")).format("DD.MM.YYYY");
    ReactDOM.unmountComponentAtNode(document.getElementById("tempMountPoint"));
    ReactDOM.render(<Attachment id="attachmentViewer" enp={enp} header={`${enp} ${fio} (${dr})`} style={{
        minHeight: "20vh",
        maxHeight: "95vh",
        width: "50vw",
        overflow: "visible"
    }}></Attachment>,
        document.getElementById("tempMountPoint"));
    $("#attachmentViewer").openModal();

}

function SwitchExportStatus(props) {
    let selectedCases = GetIds(props.ownerId);
    if (selectedCases == null || !Array.isArray(selectedCases) || selectedCases.length == 0) {
        Materialize.toast("Не выбраны записи");
        return;
    }
    for (let caseId of selectedCases) {
        MoCaseBtnApiUtils.switchExportStatus(caseId)
            .then(
                data => {
                    if (data != null && data.error != null) {
                        Materialize.toast(data.error);
                    }
                    else {
                        TableGetItemByIdStartActionCreator.getItemByIdStart(props.ownerId, "moStream/MoCaseDescrView", caseId);
                    }
                },
                err => {
                    Materialize.toast(err);
                });
    }
    TableUnselectAllActionCreator.unselectAll(props.casesTableId);
}

export default MoRegistryView;