"use strict";

import React from "react";
import ReactDOM from "react-dom";

import moment from "moment";

import AppStateSetStateActionCreator from "../../actions/AppStateSetStateActionCreator";
import AppStateAddActionCreator from "../../actions/AppStateAddActionCreator";

import Table from "../core/Table.react";
import TableStore from "../../stores/TableStore";
import TableGetDataStartActionCreator from "../../actions/TableGetDataStartActionCreator";

import DropDownList from "../core/DropDownList.react";
import DatePicker from "../core/DatePicker.react";

import DropDownListStore from "../../stores/DropDownListStore";
import DatePickerStore from "../../stores/DatePickerStore";

import InRegistryApiUtils from "../../utils/isolated/InRegistryApiUtils";
import TableGetItemByIdStartActionCreator from "../../actions/TableGetItemByIdStartActionCreator";

import UserInfoStore from "../../stores/UserInfoStore";
import DocumentViewer from "../DocumentViewer.react";

import InputBoxDate from "../simple/InputBoxDate.react";
import InputBoxDateString from "../simple/InputBoxDateString.react";
import InputBoxDateDate from "../simple/InputBoxDateDate.react";

import ContextMenuItemsCommon from "../shared/ContextMenuItems.Common";

import InputStreamRefuseRemover from "./InputStreamRefuseRemover.react";

import InOrderSelector from "./InOrderSelector.react";

class InputStreamRegistries extends React.Component {
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

    shouldComponentUpdate(nextProps, nextState) {
        return !(this.state.filter.dateEnd == nextState.filter.dateEnd &&
            this.state.filter.dateBegin == nextState.filter.dateBegin &&
            this.state.filter.codeTf == nextState.filter.codeTf
        );
    }

    componentWillUpdate(nextProps, nextState) {
        AppStateSetStateActionCreator.setState({
            dateBegin: nextState.filter.dateBegin,
            dateEnd: nextState.filter.dateEnd,
            codeTf: nextState.filter.codeTf
        });
    }

    render() {
        let tableContextMenuConfig = {
            mountPoint: "inputStreamRegistrySvc",
            items: [
                {
                    key: "accept",
                    onClick: (event, props) => {
                        AcceptRegistry(TableStore.getRightClickedRowId(props.ownerId), props.ownerId, props.tableControllerName);
                    },
                    caption: "Принять к оплате",
                    inRole: ["mtr"],
                    isVisible: CheckAcceptVisible
                },
                {
                    key: "mekRepeat",
                    onClick: (event, props) => {
                        RepeatMek(TableStore.getRightClickedRowId(props.ownerId), props.ownerId, props.tableControllerName);
                    },
                    caption: "Повторить МЭК (автоматичские отказы будут удалены и проставлены заново)",
                    inRole: ["admin"],
                    isVisible: CheckMekRepeatVisible
                },
                {
                    key: "addOrderMtr",
                    onClick: (event, props) => {
                        $("#setOrderDate").openModal();
                        this.setState({
                            orderTableId: props.ownerId,
                            orderControllerName: props.tableControllerName
                        });
                    },
                    caption: "Создать указание",
                    inRole: ["mtr"],
                    isVisible: CheckAddOrderMtrVisible
                },
                /*{
                    key: "addRegToPayOrder",
                    onClick: (event, props) => { AddRegToPayment(props); },
                    caption: "Включить реестр в платёжное поручение",
                    inRole: ["mtr"],
                    isVisible: AddRegToPaymentVisible
                },
                {
                    key: "remRegFromPayOrder",
                    onClick: (event, props) => { RemoveRegFromPayment(props); },
                    caption: "Исключить реестр из платёжного поручения",
                    inRole: ["mtr"],
                    isVisible: RemoveRegFromPaymentVisible
                },*/
                {
                    key: "signPayOrder",
                    onClick: (event, props) => { SignPayment(props); },
                    caption: "Подтвердить платёжное поручение",
                    inRole: ["mtr"],
                    isVisible: SignPaymentVisible
                },
                {
                    key: "unsignPayOrder",
                    onClick: (event, props) => { UnsignPayment(props); },
                    caption: "Снять подтверждение с платёжного поручения",
                    inRole: ["admin"],
                    isVisible: UnsignPaymentVisible
                },
                {
                    key: "sendPayOrder",
                    onClick: (event, props) => { SendPayment(props); },
                    caption: "Отправить платёжное поручение",
                    inRole: ["mtr"],
                    isVisible: SendPaymentVisible
                },
                {
                    key: "viewPayOrder",
                    onClick: (event, props) => { ViewPayment(props); },
                    caption: "Просмотреть платёжное поручение",
                    inRole: ["mtr"],
                    isVisible: ViewPaymentVisible
                },
                /*{
                    key: "addOrderBuh",
                    onClick: (event, props) => {
                        $("#setOrderDateNumber").openModal();
                        this.setState({
                            orderTableId: props.ownerId,
                            orderControllerName: props.tableControllerName
                        });
                    },
                    caption: "Создать платёжное поручение",
                    inRole: ["mtr"],
                    isVisible: CheckAddOrderBuhVisible
                },*/
                {
                    key: "importPayments",
                    onClick: (event, props) => {
                        ShowImportFromParusParams(props);
                    },
                    caption: "Импорт платёжных поручений (Парус)",
                    inRole: ["mtr"],
                    extendedProps: {
                        tableId: "inputStreamRegistry",
                        controllerName: "inputStream/InRegistryList",
                        conditionObj: this.state.filter,
                        canParallize:true
                    }
                },
                {
                    key: "sendPayOrderPack",
                    onClick: (event, props) => { ShowSendPaymentPack(props); },
                    caption: "Отправить платёжные поручения за период",
                    inRole: ["mtr"],
                    extendedProps: {
                        tableId: "inputStreamRegistry",
                        controllerName: "inputStream/InRegistryList",
                        conditionObj: this.state.filter,
                        canParallize: true
                    },
                    isVisible: SendPaymentPackVisible
                },
                {
                    key: "showRefusesList",
                    onClick: (event, props) => {
                        ShowRefusesList(TableStore.getRightClickedRowId(props.ownerId));
                    },
                    caption: "Отказы (список)",
                    inRole: ["mtr"]
                },
                {
                    key: "showRefusesGrouped",
                    onClick: (event, props) => {
                        ShowRefusesGrouped(TableStore.getRightClickedRowId(props.ownerId));
                    },
                    caption: "Отказы (группа)",
                    inRole: ["mtr"]
                },
                {
                    key: "showRefuseRemover",
                    onClick: (event, props) => {
                        ShowRefuseRemover(TableStore.getRightClickedRowId(props.ownerId));
                    },
                    caption: "Удалить отказы (список)",
                    inRole: ["mtr"],
                    isVisible: CheckShowRefuseRemoverVisible
                },
                {
                    key: "showDocs",
                    onClick: (event, props) => {
                        ShowDocs(TableStore.getRightClickedRowId(props.ownerId));
                    },
                    caption: "Письмо об оплате",
                    inRole: ["mtr"],
                    isVisible: CheckShowDocsVisible
                },
                {
                    key: "showPayOrder",
                    onClick: (event, props) => {
                        ShowPayOrder(TableStore.getRightClickedRowId(props.ownerId));
                        this.setState({
                            orderTableId: props.ownerId,
                            orderControllerName: props.controllerName
                        });
                    },
                    caption: "Указание на оплату",
                    inRole: ["mtr"],
                    isVisible: CheckShowPayOrderVisible
                },
                {
                    key: "sendMekProtocol",
                    onClick: (event, props) => {
                        SendMekProtocol(TableStore.getRightClickedRowId(props.ownerId), props.ownerId, props.tableControllerName);
                    },
                    caption: "Отправить протокол МЭК",
                    inRole: ["mtr"],
                    isVisible: CheckSendMekProtocolVisible
                },
                {
                    key: "removeOrderMtr",
                    onClick: (event, props) => {
                        RemoveOrderMtr(TableStore.getRightClickedRowId(props.ownerId), props.ownerId, props.tableControllerName);
                    },
                    caption: "Удалить указание",
                    inRole: ["admin", "adminmtr"],
                    isVisible: CheckRemoveOrderMtrVisible
                },
                {
                    key: "removePayOrder",
                    onClick: (event, props) => {
                        RemovePayment(props);
                    },
                    caption: "Удалить платёжное поручение",
                    inRole: ["mtr"],
                    isVisible: RemovePaymentVisible
                },
                /*{
                    key: "removeOrderBuh",
                    onClick: (event, props) => {
                        RemoveOrderBuh(TableStore.getRightClickedRowId(props.ownerId), props.ownerId, props.tableControllerName);
                    },
                    caption: "Удалить платёжное поручение",
                    inRole: ["mtr"],
                    isVisible: CheckRemoveOrderBuhVisible
                },*/
                {
                    key: "showCaseSatusesRep",
                    onClick: (event, props) => {
                        ShowCaseSatusesRep(TableStore.getRightClickedRowId(props.ownerId));
                        this.setState({
                            orderTableId: props.ownerId,
                            orderControllerName: props.controllerName
                        });
                    },
                    caption: "Отчёт по оплате случаев",
                    inRole: ["mtr"]
                },
                {
                    key: "ShowColumnEditor",
                    onClick: (event, props) => {
                        ContextMenuItemsCommon.showColumnEditor(event, props);
                    },
                    caption: "Состав колонок",
                    mountPoint: "inputStreamRegistrySvc"
                },
                {
                    key: "SaveTableSettings",
                    onClick: (event, props) => { ContextMenuItemsCommon.saveTableSettings(event, props); },
                    caption: "Сохранить настройки таблицы"
                },
            ]
        };
        let buttonsConfig = [
            {
                id: 0,
                hint: "Просмотр реестра",
                iconName: "input",
                className: "md-normal",
                onClick: function (id) {
                    AppStateAddActionCreator.add("InputRegistryView", "InputStream", { id });
                }
            },
            {
                id: 1,
                hint: "Зарегистрировать",
                iconName: "alarm_add",
                className: "md-normal",
                isVisible: function (id, props) {
                    let roles = UserInfoStore.get().roles;
                    if (roles == null || !Array.isArray(roles)) {
                        return false;
                    }
                    if (roles.findIndex(val => { return val == "mtr" }) < 0) {
                        return false;
                    }
                    return TableStore.getFieldValue(props.ownerId, id, "registrationDate") == null;
                },
                onClick: function (id, props) {
                    AddRegistrationDate(id, props.ownerId, props.controllerName);
                }
            },
            {
                id: 2,
                hint: "Изменить дату регистрации",
                iconName: "alarm",
                className: "md-normal",
                isVisible: function (id, props) {
                    let roles = UserInfoStore.get().roles;
                    if (roles == null || !Array.isArray(roles)) {
                        return false;
                    }
                    if (roles.findIndex(val => { return val == "mtr" }) < 0) {
                        return false;
                    }
                    return TableStore.getFieldValue(props.ownerId, id, "registrationDate") != null;
                },
                onClick: function (id, props) {
                    let mountPoint = document.getElementById("documentMountPoint");
                    ReactDOM.unmountComponentAtNode(mountPoint);
                    ReactDOM.render(<InputBoxDate
                        id="setRegistrationDate"
                        style={{ width: "35%", overflow: "visible" }}
                        dateCaption="Дата регистрации"
                        onOkClick={(registrationDate) => { UpdateRegistrationDate(this.state.rowId, registrationDate, this.state.orderTableId, this.state.orderControllerName); }}
                        dateDefault={TableStore.getFieldValue(props.ownerId, id, "registrationDate")}>
                    </InputBoxDate>,
                        mountPoint);
                    $("#setRegistrationDate").openModal();
                    this.setState({
                        orderTableId: props.ownerId,
                        orderControllerName: props.controllerName,
                        rowId: id
                    });
                }.bind(this)
            }
        ];
        let tabulatorConfig = {
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
                        'data-table-id': "inputStreamRegistry",
                        'data-table-controller': "inputStream/InRegistrySubList",
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
                    <Table data-table-id="inputStreamRegistry"
                        data-table-controller="inputStream/InRegistryList"
                        style={{ 'maxHeight': 55 + "vh", width: 100 + "%" }}
                        itemsPerPage="20"
                        canParallize={true}
                        conditionObj={this.state.filter}
                        contextMenuConfig={tableContextMenuConfig}
                        tabulatorConfig={tabulatorConfig}
                        buttonsConfig={buttonsConfig}>
                    </Table>
                </div>
                <InputBoxDate id="setOrderDate" style={{ width: "35%", overflow: "visible" }} dateCaption="Дата указания" onOkClick={(orderDate) => { AddOrderMtr(TableStore.getRightClickedRowId(this.state.orderTableId), orderDate, this.state.orderTableId, this.state.orderControllerName); }}></InputBoxDate>
                <InputBoxDateString id="setOrderDateNumber" style={{ width: "35%", overflow: "visible" }} dateCaption="Дата плат. поручения" textCaption="№ плат. поручения" onOkClick={(orderDate, orderNumber) => { AddOrderBuh(TableStore.getRightClickedRowId(this.state.orderTableId), orderDate, orderNumber, this.state.orderTableId, this.state.orderControllerName); }}></InputBoxDateString>
            </div>
            <div id="documentMountPoint"></div>
        </div>;
    }
    /*
        _addOrderMtrEnvelope:function(orderDate)
        {
            AddOrderMtr(TableStore.getRightClickedRowId(this.state.orderTableId), orderDate, this.state.orderTableId, this.state.orderControllerName);
        },
        _addOrderBuhEnvelope:function(orderDate, orderNumber)
        {
            AddOrderBuh(TableStore.getRightClickedRowId(this.state.orderTableId), orderDate, orderNumber, this.state.orderTableId, this.state.orderControllerName);
        },
        _setRegistarationDateEnvelope:function(registrationDate)
        {
            UpdateRegistrationDate(this.state.rowId, registrationDate, this.state.orderTableId, this.state.orderControllerName);
        }*/
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

function GetRightClickedRegistryStatus(props) {
    let id = TableStore.getRightClickedRowId(props.ownerId);
    if (id == null)
        return false;
    let val = TableStore.getFieldValue(props.ownerId, id, "status");
    return val;
}

function CheckAcceptVisible(props) {
    return GetRightClickedRegistryStatus(props) === 3;
}

function CheckMekRepeatVisible(props) {
    let val = GetRightClickedRegistryStatus(props);
    return val === 3 || val === 2;
}

function CheckAddOrderMtrVisible(props) {
    let id = TableStore.getRightClickedRowId(props.ownerId);
    if (id == null)
        return false;
    let summaP = TableStore.getFieldValue(props.ownerId, id, "summaP");
    let summaPFin = TableStore.getFieldValue(props.ownerId, id, "summaPFin");
    let summaRefused = TableStore.getFieldValue(props.ownerId, id, "summaRefused");
    summaP = summaP == null ? 0 : summaP;
    summaPFin = summaPFin == null ? 0 : summaPFin;
    summaRefused = summaRefused == null ? 0 : summaRefused;
    return GetRightClickedRegistryStatus(props) === 3 && Math.abs(summaP - summaPFin - summaRefused) < 0.0001;
}

function CheckRemoveOrderMtrVisible(props) {
    let id = TableStore.getRightClickedRowId(props.ownerId);
    if (id == null)
        return false;
    let val = TableStore.getFieldValue(props.ownerId, id, "payOrderBuhDate");
    return GetRightClickedRegistryStatus(props) === 4 && val == null;
}

function CheckAddOrderBuhVisible(props) {
    let id = TableStore.getRightClickedRowId(props.ownerId);
    if (id == null)
        return false;
    let val = TableStore.getFieldValue(props.ownerId, id, "payOrderBuhDate");
    return GetRightClickedRegistryStatus(props) === 4 && val == null;
}

function CheckRemoveOrderBuhVisible(props) {
    let id = TableStore.getRightClickedRowId(props.ownerId);
    if (id == null)
        return false;
    let val = TableStore.getFieldValue(props.ownerId, id, "payOrderBuhDate");
    return GetRightClickedRegistryStatus(props) === 4 && val != null;
}

function CheckShowDocsVisible(props) {
    return GetRightClickedRegistryStatus(props) === 4;
}

function CheckShowPayOrderVisible(props) {
    return GetRightClickedRegistryStatus(props) === 4;
}

function CheckSendMekProtocolVisible(props) {
    return GetRightClickedRegistryStatus(props) === 4;
}

function CheckShowRefuseRemoverVisible(props) {
    return GetRightClickedRegistryStatus(props) === 3;
}

function RemovePaymentVisible(props) {
    let id = TableStore.getRightClickedRowId(props.ownerId);
    if (id == null)
        return false;
    let val = TableStore.getFieldValue(props.ownerId, id, "payOrderId");
    return GetRightClickedRegistryStatus(props) === 4 && val != null;
}

function AddRegToPaymentVisible(props) {
    return false;
    let id = TableStore.getRightClickedRowId(props.ownerId);
    if (id == null)
        return false;
    let val = TableStore.getFieldValue(props.ownerId, id, "payOrderId");
    return GetRightClickedRegistryStatus(props) === 4 && val == null;
}

function RemoveRegFromPaymentVisible(props) {
    return false;
    let id = TableStore.getRightClickedRowId(props.ownerId);
    if (id == null)
        return false;
    let idPayOrder = TableStore.getFieldValue(props.ownerId, id, "payOrderId");
    let isSigned = TableStore.getFieldValue(props.ownerId, id, "isSigned");
    return GetRightClickedRegistryStatus(props) === 4 && idPayOrder != null && isSigned !== true;
}

function SignPaymentVisible(props) {
    let id = TableStore.getRightClickedRowId(props.ownerId);
    if (id == null)
        return false;
    let idPayOrder = TableStore.getFieldValue(props.ownerId, id, "payOrderId");
    let isSigned = TableStore.getFieldValue(props.ownerId, id, "isSigned");
    return GetRightClickedRegistryStatus(props) === 4 && idPayOrder != null && isSigned !== true;
}

function SendPaymentVisible(props) {
    let id = TableStore.getRightClickedRowId(props.ownerId);
    if (id == null)
        return false;
    let idPayOrder = TableStore.getFieldValue(props.ownerId, id, "payOrderId");
    let isSigned = TableStore.getFieldValue(props.ownerId, id, "isSigned");
    return GetRightClickedRegistryStatus(props) === 4 && idPayOrder != null && isSigned == true;
}

function SendPaymentPackVisible(props) {
    let id = TableStore.getRightClickedRowId(props.ownerId);
    if (id == null)
        return false;
    let idPayOrder = TableStore.getFieldValue(props.ownerId, id, "payOrderId");
    return GetRightClickedRegistryStatus(props) === 4 && idPayOrder != null;
}

function UnsignPaymentVisible(props) {
    let id = TableStore.getRightClickedRowId(props.ownerId);
    if (id == null)
        return false;
    let idPayOrder = TableStore.getFieldValue(props.ownerId, id, "payOrderId");
    let isSigned = TableStore.getFieldValue(props.ownerId, id, "isSigned");
    return GetRightClickedRegistryStatus(props) === 4 && idPayOrder != null && isSigned == true;
}

function ViewPaymentVisible(props) {
    let id = TableStore.getRightClickedRowId(props.ownerId);
    if (id == null)
        return false;
    let val = TableStore.getFieldValue(props.ownerId, id, "payOrderId");
    return GetRightClickedRegistryStatus(props) === 4 && val != null;
}

function AddPayment(tfCode, number, date, sum) {
    return InRegistryApiUtils.addPaymentOrder(tfCode, number, date, sum);
}

function AddRegToPaymentInternal(idOrder, idsRegistry, tableId, controllerName) {
    $("#inOrderSelector").closeModal("");
    ReactDOM.unmountComponentAtNode(document.getElementById("documentMountPoint"));
    if (idOrder == null) {
        Materialize.toast("Не выбрано платёжное поручение");
        return;
    }
    if (idsRegistry == null || !Array.isArray(idsRegistry) || idsRegistry.length == 0) {
        Materialize.toast("Не выбраны реестры для включения в платёжное поручение");
        return;
    }
    idsRegistry.forEach(idRegistry => {
        InRegistryApiUtils.addRegistryToPaymentOrder(idOrder, idRegistry).then(data => {
            if (data != null && data.error != null) {
                Materialize.toast(data.error);
            }
            TableGetItemByIdStartActionCreator.getItemByIdStart(tableId, controllerName, idRegistry);
        },
            err => {
                Materialize.toast(err);
            });
    });
}

function ShowImportFromParusParams(props) {
    ReactDOM.unmountComponentAtNode(document.getElementById("documentMountPoint"));
    let mountPoint = document.getElementById("documentMountPoint");
    ReactDOM.unmountComponentAtNode(mountPoint);
    let db = moment().subtract(1, "month");
    let elem = ReactDOM.render(<InputBoxDateDate {...{
        id: "parusPeriod",
        dateBeginCaption: "С ",
        dateEndCaption: "По ",
        dateBeginDefault: db.startOf("month").format("YYYY-MM-DD"),
        dateEndDefault: db.endOf("month").format("YYYY-MM-DD"),
        style: { width: "40%" },
        extendedProps: props.extendedProps,
        onOkClick: ImportFromParus
    }}>
    </InputBoxDateDate>, mountPoint);
    $("#parusPeriod").openModal();
}

function ShowSendPaymentPack(props) {
    ReactDOM.unmountComponentAtNode(document.getElementById("documentMountPoint"));
    let mountPoint = document.getElementById("documentMountPoint");
    ReactDOM.unmountComponentAtNode(mountPoint);
    let db = moment().subtract(1, "month");
    let elem = ReactDOM.render(<InputBoxDateDate {...{
        id: "payOrderPeriod",
        dateBeginCaption: "С ",
        dateEndCaption: "По ",
        dateBeginDefault: db.startOf("month").format("YYYY-MM-DD"),
        dateEndDefault: db.endOf("month").format("YYYY-MM-DD"),
        style: { width: "40%" },
        extendedProps: props.extendedProps,
        onOkClick: SendPaymentPack
    }}>
    </InputBoxDateDate>, mountPoint);
    $("#payOrderPeriod").openModal();
}

function SendPaymentPack(dateBegin, dateEnd, extendedProps) {
    InRegistryApiUtils.sendPaymentPack(dateBegin, dateEnd).then(data => {

            if (data != null && data.error != null) {
                Materialize.toast(data.error);
            }
            if (data != null && data.comment != null) {
                Materialize.toast(data.comment);
            }
            TableGetDataStartActionCreator.getDataStart(extendedProps.tableId, extendedProps.controllerName, extendedProps.canParallize, extendedProps.conditionObj);
        },
        err => {
            Materialize.toast(err);
        });
}

function ImportFromParus(dateBegin, dateEnd, extendedProps) {
    InRegistryApiUtils.importFromParus(dateBegin, dateEnd).then(data => {

            if (data != null && data.error != null) {
                Materialize.toast(data.error);
            }
            if (data != null && data.comment != null) {
                Materialize.toast(data.comment);
            }
        TableGetDataStartActionCreator.getDataStart(extendedProps.tableId, extendedProps.controllerName, extendedProps.canParallize, extendedProps.conditionObj);
        },
        err => {
            Materialize.toast(err);
        });
}

function RemovePayment(props) {
    let id = TableStore.getRightClickedRowId(props.ownerId);
    if (id == null) {
        return;
    }
    let idOrder = TableStore.getFieldValue(props.ownerId, id, "payOrderId");
    if (idOrder == null) {
        Materialize.toast("Не выбрано платёжное поручение");
        return;
    }
    InRegistryApiUtils.removePayment(idOrder).then(data => {
        if (data != null && data.error != null) {
            Materialize.toast(data.error);
            return;
        }
        let ids = TableStore.getFieldUniques(props.ownerId, "id")
            .filter(id => { return TableStore.getFieldValue(props.ownerId, id, "payOrderId") == idOrder });
        ids.forEach(id => {
            TableGetItemByIdStartActionCreator.getItemByIdStart(props.ownerId, props.tableControllerName, id);
        });
    }, err => {
        Materialize.toast(err);
        return;
    });
}

function AddRegToPayment(props) {
    let id = TableStore.getRightClickedRowId(props.ownerId);
    if (id == null) {
        return;
    }
    let tfCode = TableStore.getFieldValue(props.ownerId, id, "tfSrc");
    let idsRegistry = GetIds(props.ownerId);
    let orderProps = {
        id: "inOrderSelector",
        style: null,
        onAddOrder: (tfCode, number, date, sum) => {
            AddPayment(tfCode, number, date, sum).then(data => {
                if (data.error != null) {
                    Materialize.toast(data.error);
                    return;
                }
                AddRegToPaymentInternal(data.id, idsRegistry, props.ownerId, props.tableControllerName);
            },
                err => { console.log(err) });
        },
        tfCode: tfCode,
        idsRegistry: idsRegistry,
        onRowDoubleClick: AddRegToPaymentInternal,
        tableId: props.ownerId,
        tableControllerName: props.tableControllerName
    };
    let mountPoint = document.getElementById("documentMountPoint");
    ReactDOM.unmountComponentAtNode(mountPoint);
    let elem = ReactDOM.render(<InOrderSelector {...orderProps}></InOrderSelector>, mountPoint);
    $("#inOrderSelector").openModal();
}

function RemoveRegFromPayment(props) {
    let id = TableStore.getRightClickedRowId(props.ownerId);
    if (id == null) {
        return;
    }
    let idsRegistry = GetIds(props.ownerId);
    if (idsRegistry == null || !Array.isArray(idsRegistry) || idsRegistry.length == 0) {
        return;
    }
    idsRegistry.forEach(idRegistry => {
        InRegistryApiUtils.removeRegistryFromPaymentOrder(idRegistry).then(data => {
            if (data != null && data.error != null) {
                Materialize.toast(data.error);
            }
            TableGetItemByIdStartActionCreator.getItemByIdStart(props.ownerId, props.tableControllerName, idRegistry);
        },
            err => {
                Materialize.toast(err);
            });
    });
}

function SignPayment(props) {
    let id = TableStore.getRightClickedRowId(props.ownerId);
    if (id == null) {
        return;
    }
    let idOrder = TableStore.getFieldValue(props.ownerId, id, "payOrderId");
    if (idOrder == null) {
        Materialize.toast("Не выбрано платёжное поручение");
        return;
    }
    InRegistryApiUtils.signPayment(idOrder).then(data => {
        if (data != null && data.error != null) {
            Materialize.toast(data.error);
            return;
        }
        let ids = TableStore.getFieldUniques(props.ownerId, "id")
            .filter(id => { return TableStore.getFieldValue(props.ownerId, id, "payOrderId") == idOrder });
        ids.forEach(id => {
            TableGetItemByIdStartActionCreator.getItemByIdStart(props.ownerId, props.tableControllerName, id);
        });
    }, err => {
        Materialize.toast(err);
        return;
    });
}

function UnsignPayment(props) {
    let id = TableStore.getRightClickedRowId(props.ownerId);
    if (id == null) {
        return;
    }
    let idOrder = TableStore.getFieldValue(props.ownerId, id, "payOrderId");
    if (idOrder == null) {
        Materialize.toast("Не выбрано платёжное поручение");
        return;
    }
    InRegistryApiUtils.unsignPayment(idOrder).then(data => {
        if (data != null && data.error != null) {
            Materialize.toast(data.error);
            return;
        }
        let ids = TableStore.getFieldUniques(props.ownerId, "id")
            .filter(id => { return TableStore.getFieldValue(props.ownerId, id, "payOrderId") == idOrder });
        ids.forEach(id => {
            TableGetItemByIdStartActionCreator.getItemByIdStart(props.ownerId, props.tableControllerName, id);
        });
    }, err => {
        Materialize.toast(err);
        return;
    });
}

function SendPayment(props) {
    let id = TableStore.getRightClickedRowId(props.ownerId);
    if (id == null) {
        return;
    }
    let idOrder = TableStore.getFieldValue(props.ownerId, id, "payOrderId");
    if (idOrder == null) {
        Materialize.toast("Не выбрано платёжное поручение");
        return;
    }
    InRegistryApiUtils.sendPayment(idOrder).then(data => {
        if (data != null && data.error != null) {
            Materialize.toast(data.error);
            return;
        }
        let ids = TableStore.getFieldUniques(props.ownerId, "id")
            .filter(id => { return TableStore.getFieldValue(props.ownerId, id, "payOrderId") == idOrder });
        ids.forEach(id => {
            TableGetItemByIdStartActionCreator.getItemByIdStart(props.ownerId, props.tableControllerName, id);
        });
    },
        err => {
            Materialize.toast(err);
            return;
        });
}

function ViewPayment(props) {
    let id = TableStore.getRightClickedRowId(props.ownerId);
    if (id == null) {
        return;
    }
    let idOrder = TableStore.getFieldValue(props.ownerId, id, "payOrderId");
    if (idOrder == null) {
        Materialize.toast("Не выбрано платёжное поручение");
        return;
    }
    let params = {
        PayOrderId: idOrder,
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
        reportPath="%2fInStream%2fDocuments%2fInPayorderBuh&rs:Command=Render"
        params={params}
        mountPoint="documentMountPoint"></DocumentViewer>,
        mountPoint);
    $("#documentMounted").openModal();
}

function AcceptRegistry(idRegistry, tableId, controllerName) {
    if (idRegistry == null) {
        Materialize.toast("Ошибка определения идентификатора реестра");
        return;
    }
    InRegistryApiUtils.acceptRegistry(idRegistry)
        .then(data => {
            if (data != null && data.error != null) {
                Materialize.toast(data.error);
            }
            else {
                TableGetItemByIdStartActionCreator.getItemByIdStart(tableId, controllerName, idRegistry);
                Materialize.toast("Операция завершена", 2500);
            }
        })
        .catch(err => {
            Materialize.toast(err);
        });
}

function RepeatMek(idRegistry, tableId, controllerName) {
    if (idRegistry == null) {
        Materialize.toast("Ошибка определения идентификатора реестра");
        return;
    }
    InRegistryApiUtils.repeatMek(idRegistry)
        .then(data => {
            if (data != null && data.error != null) {
                Materialize.toast(data.error);
            }
            else {
                TableGetItemByIdStartActionCreator.getItemByIdStart(tableId, controllerName, idRegistry);
                Materialize.toast("Операция завершена", 2500);
            }
        })
        .catch(err => {
            Materialize.toast(err);
        });
}

function AddOrderMtr(idRegistry, orderDate, tableId, controllerName) {
    if (idRegistry == null) {
        Materialize.toast("Ошибка определения идентификатора реестра");
        return;
    }
    InRegistryApiUtils.addOrderMtr(idRegistry, orderDate)
        .then(data => {
            if (data != null && data.error != null) {
                Materialize.toast(data.error);
            }
            else {
                TableGetItemByIdStartActionCreator.getItemByIdStart(tableId, controllerName, idRegistry);
                Materialize.toast("Операция завершена", 2500);
            }
        })
        .catch(err => {
            Materialize.toast(err);
        });
}

function RemoveOrderMtr(idRegistry, tableId, controllerName) {
    if (idRegistry == null) {
        Materialize.toast("Ошибка определения идентификатора реестра");
        return;
    }
    InRegistryApiUtils.removeOrderMtr(idRegistry)
        .then(data => {
            if (data != null && data.error != null) {
                Materialize.toast(data.error);
            }
            else {
                TableGetItemByIdStartActionCreator.getItemByIdStart(tableId, controllerName, idRegistry);
                Materialize.toast("Операция завершена", 2500);
            }
        })
        .catch(err => {
            Materialize.toast(err);
        });
}

function AddOrderBuh(idRegistry, orderDate, orderNumber, tableId, controllerName) {
    if (idRegistry == null) {
        Materialize.toast("Ошибка определения идентификатора реестра");
        return;
    }
    InRegistryApiUtils.addOrderBuh(idRegistry, orderDate, orderNumber)
        .then(data => {
            if (data != null && data.error != null) {
                Materialize.toast(data.error);
            }
            else {
                TableGetItemByIdStartActionCreator.getItemByIdStart(tableId, controllerName, idRegistry);
                Materialize.toast("Операция завершена", 2500);
            }
        })
        .catch(err => {
            Materialize.toast(err);
        });
}

function RemoveOrderBuh(idRegistry, tableId, controllerName) {
    if (idRegistry == null) {
        Materialize.toast("Ошибка определения идентификатора реестра");
        return;
    }
    InRegistryApiUtils.removeOrderBuh(idRegistry)
        .then(data => {
            if (data != null && data.error != null) {
                Materialize.toast(data.error);
            }
            else {
                TableGetItemByIdStartActionCreator.getItemByIdStart(tableId, controllerName, idRegistry);
                Materialize.toast("Операция завершена", 2500);
            }
        })
        .catch(err => {
            Materialize.toast(err);
        });
}

function ShowDocs(idRegistry) {
    let params = {
        RegistryId: idRegistry,
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
        reportPath="%2fInStream%2fDocuments%2fInLetter&rs:Command=Render"
        params={params}
        mountPoint="documentMountPoint"></DocumentViewer>,
        mountPoint);
    $("#documentMounted").openModal();
}

function ShowRefusesList(idRegistry) {
    let params = {
        RegistryId: idRegistry
    }
    let mountPoint = document.getElementById("documentMountPoint");
    let elem = ReactDOM.render(<DocumentViewer
        id="documentMounted"
        style={{ width: "75vw", maxHeight: "96vh", height: "96vh", top: "2vh" }}
        reportPath="%2fInStream%2fOther%2fRegistryRefusesList&rs:Command=Render"
        params={params}
        mountPoint="documentMountPoint"></DocumentViewer>,
        mountPoint);
    $("#documentMounted").openModal();
}

function ShowRefusesGrouped(idRegistry) {
    let params = {
        RegistryId: idRegistry
    }
    let mountPoint = document.getElementById("documentMountPoint");
    let elem = ReactDOM.render(<DocumentViewer
        id="documentMounted"
        style={{ width: "75vw", maxHeight: "96vh", height: "96vh", top: "2vh" }}
        reportPath="%2fInStream%2fOther%2fRegistryRefusesGrouped&rs:Command=Render"
        params={params}
        mountPoint="documentMountPoint"></DocumentViewer>,
        mountPoint);
    $("#documentMounted").openModal();
}

function ShowRefuseRemover(idRegistry) {
    let params = {
        idRegistry: idRegistry,
        parentTableController: "inputStream/InRegistryList",
        parentTableId: "inputStreamRegistry"
    }
    let mountPoint = document.getElementById("documentMountPoint");
    let elem = ReactDOM.render(<InputStreamRefuseRemover
        id="documentMounted"
        style={{ width: "75vw", maxHeight: "96vh", top: "2vh" }}
        params={params}
        mountPoint="documentMountPoint"></InputStreamRefuseRemover>,
        mountPoint);
    $("#documentMounted").openModal();
}

function ShowPayOrder(idRegistry) {
    let params = {
        RegistryId: idRegistry,
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
        reportPath="%2fInStream%2fDocuments%2fInPayOrder&rs:Command=Render"
        params={params}
        mountPoint="documentMountPoint"></DocumentViewer>,
        mountPoint);
    $("#documentMounted").openModal();
}

function ShowCaseSatusesRep(idRegistry) {
    let params = {
        RegistryId: idRegistry
    }
    let mountPoint = document.getElementById("documentMountPoint");
    let elem = ReactDOM.render(<DocumentViewer
        id="documentMounted"
        style={{ width: "75vw", maxHeight: "96vh", height: "96vh", top: "2vh" }}
        reportPath="%2fInStream%2fServiceReports%2fCaseStatuses&rs:Command=Render"
        params={params}
        mountPoint="documentMountPoint"></DocumentViewer>,
        mountPoint);
    $("#documentMounted").openModal();
}

function SendMekProtocol(idRegistry, tableId, controllerName) {
    if (idRegistry == null) {
        Materialize.toast("Ошибка определения идентификатора реестра");
        return;
    }
    InRegistryApiUtils.sendMekProtocol(idRegistry)
        .then(data => {
            if (data != null && data.error != null) {
                Materialize.toast(data.error);
            }
            else {
                TableGetItemByIdStartActionCreator.getItemByIdStart(tableId, controllerName, idRegistry);
                Materialize.toast("Операция завершена", 2500);
            }
        })
        .catch(err => {
            Materialize.toast(err);
        });
}

function AddRegistrationDate(idRegistry, tableId, controllerName) {
    if (idRegistry == null) {
        Materialize.toast("Ошибка определения идентификатора реестра");
        return;
    }
    InRegistryApiUtils.addRegistrationDate(idRegistry)
        .then(data => {
            if (data != null && data.error != null) {
                Materialize.toast(data.error);
            }
            else {
                TableGetItemByIdStartActionCreator.getItemByIdStart(tableId, controllerName, idRegistry);
                Materialize.toast("Операция завершена", 2500);
            }
        })
        .catch(err => {
            Materialize.toast(err);
        });
}

function UpdateRegistrationDate(idRegistry, registrationDate, tableId, controllerName) {
    if (idRegistry == null) {
        Materialize.toast("Ошибка определения идентификатора реестра");
        return;
    }
    InRegistryApiUtils.updateRegistrationDate(idRegistry, registrationDate)
        .then(data => {
            if (data != null && data.error != null) {
                Materialize.toast(data.error);
            }
            else {
                TableGetItemByIdStartActionCreator.getItemByIdStart(tableId, controllerName, idRegistry);
                Materialize.toast("Операция завершена", 2500);
            }
        })
        .catch(err => {
            Materialize.toast(err);
        });
}

export default InputStreamRegistries;