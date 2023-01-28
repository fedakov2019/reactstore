"use strict";

import React from "react";
import ReactDOM from "react-dom";

import moment from "moment";

import Table from "../core/Table.react";
import TableStore from "../../stores/TableStore";
import TableGetItemByIdStartActionCreator from "../../actions/TableGetItemByIdStartActionCreator";

import DatePicker from "../core/DatePicker.react";
import DatePickerStore from "../../stores/DatePickerStore";

import ContextMenuItemsCommon from "../shared/ContextMenuItems.Common";

import UserInfoStore from "../../stores/UserInfoStore";
import DocumentViewer from "../DocumentViewer.react";

import OutLettersApiUtils from "../../utils/isolated/OutLettersApiUtils";

class OutputStreamLettersView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lockDataRaw: true,
            lockDataLettered: true,
            lockDataFin: true,
            lockDataArch: true,
            eDataRaw: false,
            eDataLettered: false,
            eDataFin: false,
            eDataArch: false,

            filterArch: {
                dateBegin: moment(new Date()).format("YYYY-MM-DD"),
                dateEnd: moment(new Date()).format("YYYY-MM-DD")
            }
        };
    }

    render() {
        let outputRequestRawContextMenuConfig = {
            mountPoint: "outputRequestRawSvc",
            items: [
                {
                    key: "GroupToLetter",
                    caption: "Создать пакет",
                    inRole: ["mtr"],
                    onClick: (event, props) => {
                        GroupToLetter(props);
                    },
                    isVisible: true,
                    lockDataLettered: this.state.lockDataLettered
                },
                {
                    key: "Exclude",
                    caption: "Отправить в исключённые",
                    inRole: ["mtr"],
                    onClick: (event, props) => {
                        SendToExcluded(props);
                    },
                    isVisible: true
                },
                {
                    key: "ShowColumnEditor",
                    onClick: (event, props) => {
                        ContextMenuItemsCommon.showColumnEditor(event, props);
                    },
                    caption: "Состав колонок",
                    mountPoint: "outputRequestRawSvc"
                },
                {
                    key: "SaveTableSettings",
                    onClick: (event, props) => { ContextMenuItemsCommon.saveTableSettings(event, props); },
                    caption: "Сохранить настройки таблицы"
                }
            ]
        };

        let outputRequestLetteredContextMenuConfig = {
            mountPoint: "outputRequestLetteredSvc",
            items: [
                {
                    key: "ViewLetter",
                    caption: "Письмо в МО",
                    inRole: ["mtr"],
                    onClick: (event, props) => {
                        ShowLetter(props);
                    }
                },
                {
                    key: "SendToArch",
                    caption: "Отправить в архив",
                    inRole: ["mtr"],
                    onClick: (event, props) => {
                        SendToArch(props);
                    }
                },
                {
                    key: "UngroupPack",
                    caption: "Расформировать пакет (отправить все позиции в необработанные)",
                    inRole: ["mtr"],
                    onClick: (event, props) => {
                        UngroupLetter(props);
                    }
                },
                {
                    key: "MarkAsRaw",
                    caption: "Отправить в необработанные",
                    inRole: ["mtr"],
                    onClick: (event, props) => {
                        SendToNew(props);
                    }
                },
                {
                    key: "MarkAsFin",
                    caption: "Отправить в исключённые",
                    inRole: ["mtr"],
                    onClick: (event, props) => {
                        SendToExcluded(props);
                    }
                },
                {
                    key: "ShowColumnEditor",
                    onClick: (event, props) => {
                        ContextMenuItemsCommon.showColumnEditor(event, props);
                    },
                    caption: "Состав колонок",
                    mountPoint: "outputRequestLetteredSvc"
                },
                {
                    key: "SaveTableSettings",
                    onClick: (event, props) => { ContextMenuItemsCommon.saveTableSettings(event, props); },
                    caption: "Сохранить настройки таблицы"
                }
            ]
        };

        let outputRequestFinContextMenuConfig = {
            mountPoint: "outputRequestFinSvc",
            items: [
                {
                    key: "BackToNewOrLettered",
                    caption: "Вернуть в работу",
                    inRole: ["mtr"],
                    onClick: (event, props) => {
                        TurnBackToNewOrLettered(props);
                    },
                    isVisible: true,
                    lockDataLettered: this.state.lockDataLettered,
                    lockDataRaw: this.state.lockDataRaw
                },
                {
                    key: "ShowColumnEditor",
                    onClick: (event, props) => {
                        ContextMenuItemsCommon.showColumnEditor(event, props);
                    },
                    caption: "Состав колонок",
                    mountPoint: "outputRequestRawSvc"
                },
                {
                    key: "SaveTableSettings",
                    onClick: (event, props) => { ContextMenuItemsCommon.saveTableSettings(event, props); },
                    caption: "Сохранить настройки таблицы"
                }
            ]
        };

        let outputRequestArchContextMenuConfig = {
            mountPoint: "outputRequestArchSvc",
            items: [
                {
                    key: "ViewLetter",
                    caption: "Письмо в МО",
                    inRole: ["mtr"],
                    onClick: (event, props) => {
                        ShowLetter(props);
                    }
                },
                {
                    key: "ShowColumnEditor",
                    onClick: (event, props) => {
                        ContextMenuItemsCommon.showColumnEditor(event, props);
                    },
                    caption: "Состав колонок",
                    mountPoint: "outputRequestLetteredSvc"
                },
                {
                    key: "SaveTableSettings",
                    onClick: (event, props) => { ContextMenuItemsCommon.saveTableSettings(event, props); },
                    caption: "Сохранить настройки таблицы"
                }
            ]
        };

        return <div>
            <ul className="collapsible popout" data-collapsible="expandable">
                <li style={{ marginBottom: "10px" }}>
                    <div className="collapsible-header" style={{ lineHeight: "3rem" }} onClick={(event) => {
                        if (this.state.lockDataRaw) {
                            if (!this.state.eDataRaw) {
                                this.setState({
                                    lockDataRaw: false,
                                    eDataRaw: true
                                });
                            } else {
                                this.setState({
                                    lockDataRaw: true,
                                    eDataRaw: false
                                });
                            }
                        }
                    }}><i className="material-icons">filter_drama</i>Необработанные запросы
                        </div>
                    <div className="collapsible-body">
                        <div style={{ margin: "7px" }}>
                            <Table data-table-id="outputRequestRaw"
                                data-table-controller="outputStream/OutMoRequestRawView"
                                style={{ 'maxHeight': "60%", width: "100%" }}
                                itemsPerPage="20"
                                canParallize={true}
                                contextMenuConfig={outputRequestRawContextMenuConfig}
                                conditionObj={1}
                                lockData={this.state.lockDataRaw}
                                skipAutoLoad={true} />
                            <div id="outputRequestRawSvc" />
                        </div>
                    </div>
                </li>
                <li style={{ marginBottom: "10px" }}>
                    <div className="collapsible-header" style={{ lineHeight: "3rem" }} onClick={(event) => {
                        if (this.state.lockDataLettered) {
                            if (!this.state.eDataLettered) {
                                this.setState({
                                    lockDataLettered: false,
                                    eDataLettered: true
                                });
                            } else {
                                this.setState({
                                    lockDataLettered: true,
                                    eDataLettered: false
                                });
                            }
                        }
                    }}><i className="material-icons">filter_drama</i>Письма
                        </div>
                    <div className="collapsible-body">
                        <div style={{ margin: "7px" }}>
                            <Table data-table-id="outputRequestLettered"
                                data-table-controller="outputStream/OutMoRequestLetteredView"
                                style={{ 'maxHeight': "60%", width: "100%" }}
                                itemsPerPage="20"
                                canParallize={true}
                                contextMenuConfig={outputRequestLetteredContextMenuConfig}
                                conditionObj={1}
                                lockData={this.state.lockDataLettered}
                                skipAutoLoad={true} />
                            <div id="outputRequestLetteredSvc" />
                        </div>
                    </div>
                </li>
                <li style={{ marginBottom: "10px" }}>
                    <div className="collapsible-header" style={{ lineHeight: "3rem" }} onClick={(event) => {
                        if (!this.state.eDataArch) {
                            this.setState({
                                eDataArch: true
                            });
                        } else {
                            this.setState({
                                lockDataArch: true,
                                eDataArch: false
                            });
                        }
                    }}><i className="material-icons">filter_drama</i>Исключённые запросы</div>
                    <div className="collapsible-body">
                        <div>
                            <div className="row" style={{ margin: '10px' }}>
                                <div className="col s2">
                                    <DatePicker id="start3" defaultValue={moment(new Date()).subtract(2, 'month').format("YYYY-MM-DD")} caption="С" allowEmpty={false}></DatePicker>
                                </div>
                                <div className="col s2">
                                    <DatePicker id="end3" defaultValue={moment(new Date()).format("YYYY-MM-DD")} caption="По" allowEmpty={false}></DatePicker>
                                </div>
                                <div className="col s8">
                                    <a className="waves-effect waves-light btn" onClick={(event) => {
                                        let filter = {
                                            dateBegin: DatePickerStore.getValue("start3"),
                                            dateEnd: DatePickerStore.getValue("end3")
                                        };
                                        this.setState({
                                            lockDataFin: false,
                                            filterFin: filter
                                        });
                                    }}>Показать</a>
                                </div>
                            </div>
                        </div>
                        <div style={{ margin: "7px" }}>
                            <Table data-table-id="outputRequestFin"
                                data-table-controller="outputStream/OutMoRequestFinView"
                                style={{ 'maxHeight': "60%", width: "100%" }}
                                itemsPerPage="20"
                                canParallize={true}
                                contextMenuConfig={outputRequestFinContextMenuConfig}
                                conditionObj={this.state.filterFin}
                                lockData={this.state.lockDataFin}
                                skipAutoLoad={true} />
                            <div id="outputRequestFinSvc" />
                        </div>
                    </div>
                </li>
                <li style={{ marginBottom: "10px" }}>
                    <div className="collapsible-header" style={{ lineHeight: "3rem" }}><i className="material-icons">filter_drama</i>Архив писем</div>
                    <div className="collapsible-body">
                        <div>
                            <div className="row" style={{ margin: '10px' }}>
                                <div className="col s2">
                                    <DatePicker id="start4" defaultValue={moment(new Date()).subtract(2, 'month').format("YYYY-MM-DD")} caption="С" allowEmpty={false}></DatePicker>
                                </div>
                                <div className="col s2">
                                    <DatePicker id="end4" defaultValue={moment(new Date()).format("YYYY-MM-DD")} caption="По" allowEmpty={false}></DatePicker>
                                </div>
                                <div className="col s8">
                                    <a className="waves-effect waves-light btn" onClick={(event) => {
                                        let filter = {
                                            dateBegin: DatePickerStore.getValue("start4"),
                                            dateEnd: DatePickerStore.getValue("end4")
                                        };
                                        this.setState({
                                            lockDataArch: false,
                                            filterArch: filter
                                        });
                                    }}>Показать</a>
                                </div>
                            </div>
                        </div>
                        <div style={{ margin: "7px" }}>
                            <Table data-table-id="outputRequestArch"
                                data-table-controller="outputStream/OutMoRequestArchView"
                                style={{ 'maxHeight': "60%", width: "100%" }}
                                itemsPerPage="20"
                                canParallize={true}
                                contextMenuConfig={outputRequestArchContextMenuConfig}
                                conditionObj={this.state.filterArch}
                                lockData={this.state.lockDataArch}
                                skipAutoLoad={true} />
                            <div id="outputRequestArchSvc" />
                        </div>
                    </div>
                </li>
            </ul>
            <div id="docMountPoint" />
        </div>;
    }

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

function GetRightClickedId(tableId) {
    let id = TableStore.getRightClickedRowId(tableId);
    return id;
}

function GroupToLetter(props) {
    const id = GetRightClickedId(props.ownerId);

    OutLettersApiUtils.groupRequestsToLetter(id).then(data => {
        if (data === null || data === undefined) {
            Materialize.toast("Нет ответа сервера. Обновите страницу");
            return;
        }
        if (data.error != null) {
            Materialize.toast(data.error);
            return;
        }
        data.ids.forEach(answer => {
            TableGetItemByIdStartActionCreator.getItemByIdStart(props.ownerId, props.tableControllerName, answer);
            if (!props.lockDataLettered) {
                TableGetItemByIdStartActionCreator.getItemByIdStart("outputRequestLettered", "outputStream/OutMoRequestLetteredView", answer);
            }
        });
    },
        err => {
            Materialize.toast(err);
        });
}

function SendToExcluded(props) {
    const id = GetRightClickedId(props.ownerId);

    OutLettersApiUtils.sendToExcluded(id).then(data => {
        if (data === null || data === undefined) {
            Materialize.toast("Нет ответа сервера. Обновите страницу");
            return;
        }
        if (data.error != null) {
            Materialize.toast(data.error);
            return;
        }
        TableGetItemByIdStartActionCreator.getItemByIdStart(props.ownerId, props.tableControllerName, data.id);
    },
        err => {
            Materialize.toast(err);
        });
}

function ShowLetter(props) {
    const id = TableStore.getFieldValue(props.ownerId, GetRightClickedId(props.ownerId), "idLetter");
    if (id == null) {
        return;
    }

    let params = {
        UserName: UserInfoStore.get().shortName,
        UserPhone: UserInfoStore.get().phoneNumber,
        UserDepartment: UserInfoStore.get().department,
        UserJob: UserInfoStore.get().position,
        UserEMail: UserInfoStore.get().email,
        LetterId: id
    };

    let mountPoint = document.getElementById("docMountPoint");
    let elem = ReactDOM.render(<DocumentViewer
        id="documentMounted"
        style={{ width: "75vw", maxHeight: "96vh", height: "96vh", top: "2vh" }}
        reportPath="%2fOutStream%2fDocuments%2fOutMoLetter&rs:Command=Render"
        params={params}
        mountPoint="modalMountPoint" />,
        mountPoint);
    $("#documentMounted").openModal();

}

function SendToArch(props) {
    const id = GetRightClickedId(props.ownerId);
    OutLettersApiUtils.sendToArch(id).then(data => {
        if (data === null || data === undefined) {
            Materialize.toast("Нет ответа сервера. Обновите страницу");
            return;
        }
        if (data.error != null) {
            Materialize.toast(data.error);
            return;
        }
        if (data.ids != null && Array.isArray(data.ids)) {
            data.ids.forEach(rowId => {
                TableGetItemByIdStartActionCreator.getItemByIdStart(props.ownerId, props.tableControllerName, rowId);
            });
        }

    },
        err => {
            Materialize.toast(err);
        });
}

function UngroupLetter(props) {
    const id = GetRightClickedId(props.ownerId);

    OutLettersApiUtils.ungroupLetterToRaw(id).then(data => {
        if (data === null || data === undefined) {
            Materialize.toast("Нет ответа сервера. Обновите страницу");
            return;
        }
        if (data.error != null) {
            Materialize.toast(data.error);
            return;
        }
        data.ids.forEach(answer => {
            TableGetItemByIdStartActionCreator.getItemByIdStart(props.ownerId, props.tableControllerName, answer);
            if (!props.lockDataRaw) {
                TableGetItemByIdStartActionCreator.getItemByIdStart("outputRequestRaw", "outputStream/OutMoRequestRawView", answer);
            }
        });
    },
        err => {
            Materialize.toast(err);
        });
}

function SendToNew(props) {
    const id = GetRightClickedId(props.ownerId);

    OutLettersApiUtils.sendToNew(id).then(data => {
            if (data === null || data === undefined) {
                Materialize.toast("Нет ответа сервера. Обновите страницу");
                return;
            }
            if (data.error != null) {
                Materialize.toast(data.error);
                return;
            }
        TableGetItemByIdStartActionCreator.getItemByIdStart(props.ownerId, props.tableControllerName, data.id);
            if (!props.lockDataRaw) {
                TableGetItemByIdStartActionCreator.getItemByIdStart("outputRequestRaw",
                    "outputStream/OutMoRequestRawView",
                    data.id);
            }
        },
        err => {
            Materialize.toast(err);
        });
}

function TurnBackToNewOrLettered(props) {
    const id = GetRightClickedId(props.ownerId);

    OutLettersApiUtils.turnBackToNewOrLettered(id).then(data => {
            if (data === null || data === undefined) {
                Materialize.toast("Нет ответа сервера. Обновите страницу");
                return;
            }
            if (data.error != null) {
                Materialize.toast(data.error);
                return;
            }
            TableGetItemByIdStartActionCreator.getItemByIdStart(props.ownerId, props.tableControllerName, data.id);
            if (!props.lockDataRaw) {
                TableGetItemByIdStartActionCreator.getItemByIdStart("outputRequestRaw",
                    "outputStream/OutMoRequestRawView",
                    data.id);
        }
            if (!props.lockDataLettered) {
                TableGetItemByIdStartActionCreator.getItemByIdStart("outputRequestLettered",
                    "outputStream/OutMoRequestLetteredView",
                    data.id);
            }
        },
        err => {
            Materialize.toast(err);
        });
}

export default OutputStreamLettersView;