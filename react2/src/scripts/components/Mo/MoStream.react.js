"use strict";

import React from "react";
import ReactDOM from "react-dom";

import moment from "moment";

import MedOrgSelector from "./MedOrgSelector.react";

import Table from "../core/Table.react";
import TableStore from "../../stores/TableStore";
import TableGetItemByIdStartActionCreator from "../../actions/TableGetItemByIdStartActionCreator";
import TableRowSelectActionCreator from "../../actions/TableRowSelectActionCreator";

import AppStateSetStateActionCreator from "../../actions/AppStateSetStateActionCreator";
import AppStateAddActionCreator from "../../actions/AppStateAddActionCreator";

import ContextMenuItemsCommon from "../shared/ContextMenuItems.Common";

import MoOrderSelector from "./MoOrderSelector.react";

import MoAddMtrOrderWnd from "./MoAddMtrOrderWnd.react";

import MoRegistryApiUtils from "../../utils/isolated/MoRegistryApiUtils";

import MoRefuseRemover from "./MoRefuseRemover.react";

import UserInfoStore from "../../stores/UserInfoStore";

import DocumentViewer from "../DocumentViewer.react";

class MoStream extends React.Component{
    constructor (props) {
        super(props);
        let date=new Date();
        if (props.initials == null) {
            this.state = {
                filter: {
                    dateEnd: moment(date),
                    dateBegin: moment(new Date(date.getFullYear(), date.getMonth(), date.getDate() - 10)),
                    codeMo: [],
                    nameMo: ""
                }
            };
        } else {
            this.state = {
                filter: {
                    dateEnd:moment(props.initials.filter.dateEnd),
                    dateBegin:moment(props.initials.filter.dateBegin),
                    codeMo:props.initials.filter.codeMo,
                    nameMo:props.initials.filter.nameMo
                }
            };
        }
    }

    componentDidMount() {
        
    }

    render() {
        let tableContextMenuConfig={
            mountPoint:"moStreamRegistrySvc",
            items:[
			{
			    key:"mekRepeat",
			    onClick:(event, props)=>{
			        RepeatMek(TableStore.getRightClickedRowId(props.ownerId), props.ownerId, props.tableControllerName);
			    },
			    caption:"Повторить МЭК (все будут удалены и проставлены заново)",
			    inRole:["admin"],
			    isVisible:CheckMekRepeatVisible
			},
			{
			    key:"addRemark",
			    onClick:(event, props)=> { AddRemark(props); },
			    caption:"Отметить как просмотренный",
			    inRole:["mtr", "kmp", "ofs"],
			    isVisible:CheckAddRemarkVisible
			},
			{
			    key:"removeRemark",
			    onClick:(event, props)=> { RemoveRemark(props); },
			    caption:"Снять отметку о просмотре",
			    inRole:["mtr", "kmp", "ofs"],
			    isVisible:CheckRemoveRemarkVisible
			},
			{
			    key:"addOrderMtr",
			    onClick:(event, props)=>{ShowMtrOrderWnd(props)},
			    caption:"Создать указание",
			    inRole:["mtr"],
			    isVisible:CheckAddOrderMtrVisible
			},
			{
			    key:"addOrderMo",
			    onClick:(event, props)=>{ShowMoOrderSelector(props)},
			    caption:"Добавить к счёту-фактуре",
			    inRole:["mtr"],
			    isVisible:CheckAddOrderMoVisible
			},
			{
			    key:"removeFromOrderMo",
			    onClick: (event, props) => {RemoveRegistryFromOrderMo(props)},
			    caption:"Исключить из счёта-фактуры",
			    inRole:["mtr"],
			    isVisible:CheckRemoveFromOrderMoVisible
			},
			{
			    key:"removeOrderMo",
			    onClick: (event, props) => {RemoveOrderMo(props)},
			    caption:"Удалить счёт-фактуру",
			    inRole:["mtr"],
			    isVisible:CheckRemoveOrderMoVisible
			},
			{
			    key:"showRefusesList",
			    onClick:(event, props)=>{
			        ShowRefusesList(TableStore.getRightClickedRowId(props.ownerId));
			    },
			    caption:"Отказы (список)",
			    inRole:["mtr"]
			},
			{
			    key:"showRefusesGrouped",
			    onClick:(event, props)=>{
			        ShowRefusesGrouped(TableStore.getRightClickedRowId(props.ownerId));
			    },
			    caption:"Отказы (группа)",
			    inRole:["mtr"]
			},
			{
			    key:"showRefuseRemover",
			    onClick:(event, props)=>{
			        ShowRefuseRemover(TableStore.getRightClickedRowId(props.ownerId));
			    },
			    caption:"Удалить отказы (список)",
			    inRole:["mtr"],
			    isVisible:CheckShowRefuseRemoverVisible
			},
			{
			    key:"showPayOrder",
			    onClick:(event, props)=> { ShowPayOrder(props); },
			    caption:"Указание на оплату",
			    inRole:["mtr"],
			    isVisible:CheckShowPayOrderVisible
			},
			{
			    key:"showActRefuses",
			    onClick:(event, props)=> { ShowActRefuses(props); },
			    caption:"Ведомость неоплаченных",
			    inRole:["mtr"],
			    isVisible:CheckShowActRefusesVisible
			},
			{
			    key:"showActMekFull",
			    onClick:(event, props)=> { ShowActMekFull(props); },
			    caption:"Акт МЭК",
			    inRole:["mtr"],
			    isVisible:CheckShowActMekFullVisible
			},
			{
			    key:"showActMekShort",
			    onClick:(event, props)=> { ShowActMekShort(props); },
			    caption:"Справка МЭК",
			    inRole:["mtr"],
			    isVisible:CheckShowActMekShortVisible
			},
			{
			    key:"showEkmpRequest",
			    onClick:(event, props)=> { ShowEkmpRequest(props); },
			    caption:"Запрос ЭКМП (умершие)",
			    inRole:["mtr"],
			    isVisible:CheckShowEkmpRequestVisible
			},
			{
			    key:"sendMekProtocol",
			    onClick:(event, props)=>{
			        SendMekProtocol(props);
			    },
			    caption:"Отправить протокол МЭК",
			    inRole:["mtr"],
			    isVisible:CheckSendMekProtocolVisible
			},
			{
			    key:"removeOrderMtr",
			    onClick:(event, props)=>{
			        RemoveOrderMtr(props);
			    },
			    caption:"Удалить указание",
			    inRole:["mtr"],
			    isVisible:CheckRemoveOrderMtrVisible
			},
			{
			    key:"removeRegistry",
			    onClick:(event, props)=>{
			        RemoveRegistry(props);
			    },
			    caption:"Удалить реестр",
			    inRole:["admin"],
			    isVisible:CheckRemoveRegistryVisible
			},
			{
			    key:"ShowColumnEditor",
			    onClick:(event, props)=>{
			        ContextMenuItemsCommon.showColumnEditor(event, props);
			    },
			    caption:"Состав колонок",
			    mountPoint:"moStreamRegistrySvc"
			},
			{
			    key:"SaveTableSettings",
			    onClick:(event, props)=>{ContextMenuItemsCommon.saveTableSettings(event, props);},
			    caption:"Сохранить настройки таблицы"
			}
            ]
        };
        const buttonsConfig = [
	    {
	        id:0,
	        hint:"Просмотр реестра",
	        iconName:"input",
	        className:"md-normal",
	        onClick:function(id) {
	            let type = TableStore.getFieldValue("moStreamRegistry", id, "registryType");
	            AppStateAddActionCreator.add("MoRegistryView", "MedOrgStream", {id, type});
	        }
	    }
        ];
        return 	<div className="card input-stream" style={{'minHeight':80+"vh", overflow:"visible"}}>
					<div className="card-content">
						<div style={{display:"flex", justifyContent:"flex-start", alignItems:"center"}}>
                        	    <a className="waves-effect waves-light btn" onClick={this._showMoSelector.bind(this)}>{this.state.filter.codeMo==null||this.state.filter.codeMo.length==0?"Выбрать МО": `${this.state.filter.nameMo} с ${this.state.filter.dateBegin.format("DD.MM.YYYY")} по ${this.state.filter.dateEnd.format("DD.MM.YYYY")}`}</a>
                        </div>
						<div>
                        <Table  data-table-id="moStreamRegistry" 
data-table-controller="moStream/MoRegistryList"
itemsPerPage="20"
conditionObj={{
    dateBegin:this.state.filter.dateBegin.format("YYYY-MM-DD"),
    dateEnd:this.state.filter.dateEnd.format("YYYY-MM-DD"),
    codes:this.state.filter.codeMo
}}
canParallize={true}
contextMenuConfig={tableContextMenuConfig}
buttonsConfig={buttonsConfig}
infoZone={InfoZone}
    >
</Table>
</div>
</div>

<div id="documentMountPoint"></div>					
</div>;
}

_showMoSelector(event) {
    //$('#medOrgSelector').openModal();
    let elem = <MedOrgSelector id="medOrgSelector" dateBegin={this.state.filter.dateBegin} dateEnd={
this.state.filter.dateEnd} style={{ maxHeight: "90vh" }}
    onOk={(newFilter) => {
                this.setState({ filter: newFilter });
                AppStateSetStateActionCreator.setState({
                    filter: newFilter
                });
}}></MedOrgSelector>;
    let mountPoint = document.getElementById("documentMountPoint");
    ReactDOM.unmountComponentAtNode(mountPoint);
    ReactDOM.render(elem, mountPoint);
    $("#medOrgSelector").openModal();
}
};

function GetIds(tableId)
{
    let ids=TableStore.getSelectedRows(tableId);
    if (ids==null||!Array.isArray(ids)||ids.length<=0)
    {
        let id=TableStore.getRightClickedRowId(tableId);
        if (id!=null)
            ids=[id];
    }
    return ids;
}


function GetRightClickedRegistryStatus(props)
{
    let id=TableStore.getRightClickedRowId(props.ownerId);
    if (id==null)
        return false;
    let val=TableStore.getFieldValue(props.ownerId, id, "status");
    return val;
}

function CheckMekRepeatVisible(props)
{
    let val=GetRightClickedRegistryStatus(props);
    return val===3||val===2;
}

function CheckAddOrderMoVisible(props) {
    let id=TableStore.getRightClickedRowId(props.ownerId);
    if (id==null)
        return false;
    let val = TableStore.getFieldValue(props.ownerId, id, "payOrderMo");
    return val==null||val=="";
}

function CheckRemoveFromOrderMoVisible(props) {
    let id=TableStore.getRightClickedRowId(props.ownerId);
    if (id==null)
        return false;
    let val=TableStore.getFieldValue(props.ownerId, id, "payOrderMoDate");
    return GetRightClickedRegistryStatus(props)===3&&val!=null;
}

function CheckRemoveOrderMoVisible(props) {
    let id=TableStore.getRightClickedRowId(props.ownerId);
    if (id==null)
        return false;
    let val=TableStore.getFieldValue(props.ownerId, id, "payOrderMoDate");
    return GetRightClickedRegistryStatus(props)===3&&val!=null;
}

function CheckAddOrderMtrVisible(props) {
    let id=TableStore.getRightClickedRowId(props.ownerId);
    if (id==null)
        return false;
    let val=TableStore.getFieldValue(props.ownerId, id, "payOrderMoDate");
    return GetRightClickedRegistryStatus(props)===3&&val!=null;
}

function CheckRemoveOrderMtrVisible(props) {
    let id=TableStore.getRightClickedRowId(props.ownerId);
    if (id==null)
        return false;
    let val=TableStore.getFieldValue(props.ownerId, id, "payOrderMtrDate");
    return GetRightClickedRegistryStatus(props)===4&&val!=null;
}

function CheckShowPayOrderVisible(props)
{
    return GetRightClickedRegistryStatus(props)>=4;
}

function CheckShowActRefusesVisible(props) {
    return GetRightClickedRegistryStatus(props)>=4;
}
function CheckShowActMekFullVisible(props) {
    return GetRightClickedRegistryStatus(props)>=4;
}

function CheckShowActMekShortVisible(props) {
    return GetRightClickedRegistryStatus(props)>=4;
}

function CheckShowEkmpRequestVisible(props) {
    return GetRightClickedRegistryStatus(props)>=4;
}

function CheckSendMekProtocolVisible(props)
{
    return GetRightClickedRegistryStatus(props)>=4;
}

function CheckShowRefuseRemoverVisible(props)
{
    return GetRightClickedRegistryStatus(props)===3;
}

function CheckAddRemarkVisible(props) {
    let id=TableStore.getRightClickedRowId(props.ownerId);
    if (id==null)
        return false;
    let val=TableStore.getFieldValue(props.ownerId, id, "isViewed");
    return GetRightClickedRegistryStatus(props)===3&&val==false;
}

function CheckRemoveRemarkVisible(props) {
    let id=TableStore.getRightClickedRowId(props.ownerId);
    if (id==null)
        return false;
    let val=TableStore.getFieldValue(props.ownerId, id, "isViewed");
    return GetRightClickedRegistryStatus(props)===3&&val==true;
}

function CheckRemoveRegistryVisible(props)
{
    let val=GetRightClickedRegistryStatus(props);
    return val===3||val===2;
}

function RepeatMek(idRegistry, tableId, controllerName)
{
    if (idRegistry==null)
    {
        Materialize.toast("Ошибка определения идентификатора реестра");
        return;
    }
    MoRegistryApiUtils.repeatMek(idRegistry)
	.then(data=>{
	    if (data!=null&&data.error!=null)
	    {
	        Materialize.toast(data.error);
	    }
	    else
	    {
	        TableGetItemByIdStartActionCreator.getItemByIdStart(tableId, controllerName, idRegistry);
	        Materialize.toast("Операция завершена", 2500);
	    }
	})
	.catch(err=>{
	    Materialize.toast(err);
	});
}

function ShowMoOrderSelector(props) {
    let idsRegistry = GetIds(props.ownerId);
    if (idsRegistry == null||!Array.isArray(idsRegistry)||idsRegistry.length==0) {
        Materialize.toast("Реестр не выбран");
        return;
    }
    let hasMoOrder = idsRegistry.find(val => {
        return TableStore.getFieldValue(props.ownerId, val, "payOrderMoDate") != null;
    });
    if (hasMoOrder != null) {
        Materialize.toast("Счёт уже включён в счёт-фактуру");
        return;
    }
    let medOrgs = new Set();
    idsRegistry.forEach(val => { medOrgs.add(TableStore.getFieldValue(props.ownerId, val, "codeMo")) });
    if (medOrgs.size !== 1) {
        Materialize.toast("Выделенные счета относятся к разным МО");
        return;
    }
    let medOrg = medOrgs.values().next().value;
    let mountPoint=document.getElementById("documentMountPoint");
    ReactDOM.unmountComponentAtNode(mountPoint);
    let sumMo = idsRegistry.reduce((prev, curr) => {
        return prev + Math.round(TableStore.getFieldValue(props.ownerId, curr, "summaV") * 100);
    }, 0)/100;
    ReactDOM.render(<MoOrderSelector id="documentMounted" medOrg={medOrg} idsRegistry={idsRegistry} onRowDoubleClick={AddRegistriesToOrderMo} onAddOrder={AddMoOrder} sumMo={sumMo} style={{maxHeight:"95vh", width:"50vw", overflow:"visible"}}></MoOrderSelector>, mountPoint);
    $("#documentMounted").openModal();
}

function AddMoOrder(medOrg, number, date, sumMo, idsRegistry, callback) {
    $("#documentMounted").closeModal();
    ReactDOM.unmountComponentAtNode(document.getElementById("documentMountPoint"));
    MoRegistryApiUtils.addOrderMo(medOrg, number, date, sumMo)
        .then(data => {
                if (data.error != null) {
                    Materialize.toast(data.error);
                    return;
                }
                callback(data.id, idsRegistry);
            },
            err => {
                Materialize.toast(err);
                return;
            });
}

function AddRegistriesToOrderMo(idOrder, idsRegistry) {
    $("#documentMounted").closeModal();
    ReactDOM.unmountComponentAtNode(document.getElementById("documentMountPoint"));
    if (idOrder == null) {
        Materialize.toast("Счёт-фактура не найдена");
        return;
    }
    if (!Array.isArray(idsRegistry) || idsRegistry.length == 0) {
        Materialize.toast("Реестр не найден");
        return;
    }
    idsRegistry.forEach(id => {
        MoRegistryApiUtils.addRegistryToOrderMo(idOrder, id).then(data => {
            if (data!=null&&data.error != null) {
                Materialize.toast(data.error);
                return;
            }
            TableRowSelectActionCreator.select("moStreamRegistry", id, false);
            TableGetItemByIdStartActionCreator.getItemByIdStart("moStreamRegistry", "moStream/MoRegistryList", id);
        }, err => {
            Materialize.toast(err);
            return;
        });
    });
}

function RemoveRegistryFromOrderMo(props) {
    let idsRegistry = GetIds(props.ownerId);
    if (idsRegistry == null||!Array.isArray(idsRegistry)||idsRegistry.length==0) {
        Materialize.toast("Реестр не выбран");
        return;
    }
    let hasMoOrder = idsRegistry.find(val => {
        return GetRightClickedRegistryStatus(props) != 3;
    });
    if (hasMoOrder != null) {
        Materialize.toast("На счёт-фактуру создано указание, нельзя исключить реестр");
        return;
    }
    idsRegistry.forEach(id => {
        if (TableStore.getFieldValue(props.ownerId, id, "payOrderMoDate") == null) {
            return;
        }
        MoRegistryApiUtils.removeRegistryFromOrderMo(id).then(data => {
            if (data != null && data.error != null) {
                Materialize.toast(data.error);
                return;
            }
            TableRowSelectActionCreator.select("moStreamRegistry", id, false);
            TableGetItemByIdStartActionCreator.getItemByIdStart("moStreamRegistry", "moStream/MoRegistryList", id);
        }, err => {
            Materialize.toast(err);
            return;
        });
    });
}

function RemoveOrderMo(props) {
    let idRegistry=TableStore.getRightClickedRowId(props.ownerId);
    if (idRegistry == null) {
        Materialize.toast("Счёт-фактура не выбрана");
        return;
    }
    if(GetRightClickedRegistryStatus(props) != 3){
        Materialize.toast("На счёт-фактуру создано указание");
        return;
    }
    let idOrder = TableStore.getFieldValue(props.ownerId, idRegistry, "payOrderId");
    if (idOrder == null) {
        Materialize.toast("Счёт-фактуры не существует");
    }
    MoRegistryApiUtils.removeOrderMo(idOrder).then(data => {
        if (data != null && data.error != null) {
            Materialize.toast(data.error);
            return;
        }
        let ids = TableStore.getFieldUniques(props.ownerId, "id")
            .filter(id => { return TableStore.getFieldValue(props.ownerId, id, "payOrderId") == idOrder });
        ids.forEach(id => {
            TableGetItemByIdStartActionCreator.getItemByIdStart("moStreamRegistry", "moStream/MoRegistryList", id);
        });
    }, err => {
        Materialize.toast(err);
        return;
    });
}

function ShowMtrOrderWnd(props) {
    let idRegistry=TableStore.getRightClickedRowId(props.ownerId);
    if (idRegistry == null) {
        Materialize.toast("Счёт-фактура не выбрана");
        return;
    }
    if(GetRightClickedRegistryStatus(props) != 3){
        Materialize.toast("На счёт-фактуру создано указание");
        return;
    }
    let idOrder = TableStore.getFieldValue(props.ownerId, idRegistry, "payOrderId");
    if (idOrder == null) {
        Materialize.toast("Счёт-фактуры не существует");
        return;
    }
    let mountPoint=document.getElementById("documentMountPoint");
    ReactDOM.unmountComponentAtNode(mountPoint);
    ReactDOM.render(<MoAddMtrOrderWnd id="documentMounted" idOrder={idOrder} onOkClick={AddMtrOrder} style={{maxHeight:"95vh", width:"40vw", overflow:"visible"}} ownerId={props.ownerId}></MoAddMtrOrderWnd>, mountPoint);
    $("#documentMounted").openModal();
}

function AddMtrOrder(idOrder, date, refunds={}, props) {
    $("#documentMounted").closeModal();
    ReactDOM.unmountComponentAtNode(document.getElementById("documentMountPoint"));

    if (idOrder == null) {
        Materialize.toast("Не найдена счёт-фактура");
        return;
    }
    if (date == null) {
        Materialize.toast("Не указана дата указания");
        return;
    }

    MoRegistryApiUtils.addOrderMtr(idOrder, date, refunds).then(data => {
        if (data != null && data.error != null) {
            Materialize.toast(data.error);
            return;
        }
        let ids = TableStore.getFieldUniques(props.ownerId, "id")
            .filter(id => { return TableStore.getFieldValue(props.ownerId, id, "payOrderId") == idOrder });
        ids.forEach(id => {
            TableGetItemByIdStartActionCreator.getItemByIdStart("moStreamRegistry", "moStream/MoRegistryList", id);
        });
    }, err => {
        Materialize.toast(err);
        return;
    });
}

function RemoveOrderMtr(props)
{
    let idRegistry=TableStore.getRightClickedRowId(props.ownerId);
    if (idRegistry == null) {
        Materialize.toast("Счёт-фактура не выбрана");
        return;
    }
    if(GetRightClickedRegistryStatus(props) > 4){
        Materialize.toast("Реестр МО включён в реестр на территорию");
        return;
    }
    if(GetRightClickedRegistryStatus(props) < 4){
        Materialize.toast("Реестр находится в обработке");
        return;
    }
    let idOrder = TableStore.getFieldValue(props.ownerId, idRegistry, "payOrderId");
    if (idOrder == null) {
        Materialize.toast("Счёт-фактуры не существует");
        return;
    }
    if (TableStore.getFieldValue(props.ownerId, idRegistry, "payOrderMtrNum") == null &&
        TableStore.getFieldValue(props.ownerId, idRegistry, "payOrderMtrDate") == null) {
        Materialize.toast("Указания не существует");
        return;
    }
    MoRegistryApiUtils.removeOrderMtr(idOrder).then(data => {
        if (data != null && data.error != null) {
            Materialize.toast(data.error);
            return;
        }
        let ids = TableStore.getFieldUniques(props.ownerId, "id")
            .filter(id => { return TableStore.getFieldValue(props.ownerId, id, "payOrderId") == idOrder });
        ids.forEach(id => {
            TableGetItemByIdStartActionCreator.getItemByIdStart("moStreamRegistry", "moStream/MoRegistryList", id);
        });
    }, err => {
        Materialize.toast(err);
        return;
    });
}


function ShowRefusesList(idRegistry)
{
let params={
    RegistryId:idRegistry
}
let mountPoint=document.getElementById("documentMountPoint");
let elem=ReactDOM.render(<DocumentViewer 
id="documentMounted" 
style={{width:"75vw", maxHeight:"96vh", height:"96vh", top:"2vh"}} 
reportPath="%2fMoStream%2fOther%2fRegistryRefusesList&rs:Command=Render"
params={params} 
mountPoint="documentMountPoint"></DocumentViewer>, 
mountPoint);
$("#documentMounted").openModal();
}

function ShowRefusesGrouped(idRegistry)
{
    let params={
        RegistryId:idRegistry
    }
    let mountPoint=document.getElementById("documentMountPoint");
    let elem=ReactDOM.render(<DocumentViewer 
		id="documentMounted" 
		style={{width:"75vw", maxHeight:"96vh", height:"96vh", top:"2vh"}} 
reportPath="%2fMoStream%2fOther%2fRegistryRefusesGrouped&rs:Command=Render"
params={params} 
mountPoint="documentMountPoint"></DocumentViewer>, 
mountPoint);
$("#documentMounted").openModal();
}

function ShowRefuseRemover(idRegistry)
{
    let params={
        idRegistry:idRegistry,
        parentTableController:"moStream/MoRegistryList",
        parentTableId:"moStreamRegistry"
    }
    let mountPoint=document.getElementById("documentMountPoint");
    //ReactDOM.unmountComponentAtNode('documentMountPoint');
    ReactDOM.render(<MoRefuseRemover 
        id="documentMounted" 
        style={{width:"75vw", maxHeight:"96vh", top:"2vh"}} 
        params={params} 
        mountPoint="documentMountPoint"></MoRefuseRemover>, 
        mountPoint);
    $("#documentMounted").openModal();
}

function CheckOrderInfo(props) {
        if (props == null) {
            Materialize.toast("Некорректный аргумент");
            return;
        }
        let idRegistry = TableStore.getRightClickedRowId(props.ownerId);
        if (idRegistry == null) {
            Materialize.toast("Не выбран реестр");
            return;
        }
        if(GetRightClickedRegistryStatus(props) <=3){
            Materialize.toast("На счёт-фактуру не создано указание");
            return;
        }
        let idOrder = TableStore.getFieldValue(props.ownerId, idRegistry, "payOrderId");
        if (idOrder == null) {
            Materialize.toast("Счёт-фактура не создана");
            return;
        }
        return {
            PayOrderId:idOrder,
            UserName:UserInfoStore.get().shortName,
            UserPhone:UserInfoStore.get().phoneNumber
        }
}

function ShowPayOrder(props) {
    let params = CheckOrderInfo(props);
    if (params == null) {
        return;
    }
    let mountPoint=document.getElementById("documentMountPoint");
    let elem=ReactDOM.render(<DocumentViewer
		id="documentMounted" 
		style={{width:"75vw", maxHeight:"96vh", height:"96vh", top:"2vh"}} 
reportPath="%2fMoStream%2fDocuments%2fMoPayOrder&rs:Command=Render"
params={params} 
mountPoint="documentMountPoint"></DocumentViewer>, 
mountPoint);
$("#documentMounted").openModal();
}

function ShowActRefuses(props)
{
    let params = CheckOrderInfo(props);
    if (params == null) {
        return;
    }
    let mountPoint=document.getElementById("documentMountPoint");
    let elem=ReactDOM.render(<DocumentViewer
                id="documentMounted" 
                style={{width:"75vw", maxHeight:"96vh", height:"96vh", top:"2vh"}} 
                reportPath="%2fMoStream%2fDocuments%2fMoActRefuses&rs:Command=Render"
		        params={params} 
                mountPoint="documentMountPoint"></DocumentViewer>, 
            mountPoint);
    $("#documentMounted").openModal();
}

function ShowActMekFull(props)
{
    let params = CheckOrderInfo(props);
    if (params == null) {
        return;
    }
    let mountPoint=document.getElementById("documentMountPoint");
    let elem=ReactDOM.render(<DocumentViewer
        id="documentMounted" 
        style={{width:"75vw", maxHeight:"96vh", height:"96vh", top:"2vh"}} 
        reportPath="%2fMoStream%2fDocuments%2fMoActMek&rs:Command=Render"
        params={Object.assign({}, params, {ShortForm:0})} 
        mountPoint="documentMountPoint"></DocumentViewer>, 
        mountPoint);
    $("#documentMounted").openModal();
}

function ShowActMekShort(props)
{
    let params = CheckOrderInfo(props);
    if (params == null) {
        return;
    }
    let mountPoint=document.getElementById("documentMountPoint");
    let elem=ReactDOM.render(<DocumentViewer
                id="documentMounted" 
                style={{width:"75vw", maxHeight:"96vh", height:"96vh", top:"2vh"}} 
        reportPath="%2fMoStream%2fDocuments%2fMoActMek&rs:Command=Render"
        params={Object.assign({}, params, {ShortForm:1})} 
        mountPoint="documentMountPoint"></DocumentViewer>, 
        mountPoint);
    $("#documentMounted").openModal();
}

function ShowEkmpRequest(props)
{
    let params = CheckOrderInfo(props);
    if (params == null) {
        return;
    }
    let mountPoint=document.getElementById("documentMountPoint");
    let elem=ReactDOM.render(<DocumentViewer
                    id="documentMounted" 
                    style={{width:"75vw", maxHeight:"96vh", height:"96vh", top:"2vh"}} 
                    reportPath="%2fMoStream%2fDocuments%2fMoEkmpRequest&rs:Command=Render"
        params={params} 
        mountPoint="documentMountPoint"></DocumentViewer>, 
        mountPoint);
    $("#documentMounted").openModal();
}


function SendMekProtocol(props) {
    let idsRegistry = GetIds(props.ownerId);
    if (idsRegistry == null || !Array.isArray(idsRegistry) || idsRegistry.length == 0) {
        Materialize.toast("Реестр не выбран");
        return;
    }
    let hasErrors = idsRegistry.find(val => {
        return GetRightClickedRegistryStatus(props) < 4;
    });
    if (hasErrors != null) {
        Materialize.toast("На счёт-фактуру не создано указание, нельзя отправить протокол");
        return;
    }
    const tableId = props.ownerId;
    const controllerName = props.tableControllerName;
    idsRegistry.forEach(idRegistry => {
        MoRegistryApiUtils.sendMekProtocol(idRegistry)
            .then(data => {
                if (data != null && data.error != null) {
                    Materialize.toast(data.error);
                }
                else {
                    TableGetItemByIdStartActionCreator.getItemByIdStart(tableId, controllerName, idRegistry);
                    TableRowSelectActionCreator.select(tableId, idRegistry, false);
                    Materialize.toast("Операция завершена", 2500);
                }
            })
            .catch(err => {
                Materialize.toast(err);
            });
    });
}

function AddRemark(props) {
    let idsRegistry = GetIds(props.ownerId);
    if (idsRegistry == null || !Array.isArray(idsRegistry) || idsRegistry.length == 0) {
        Materialize.toast("Реестр не выбран");
        return;
    }
    let hasErrors = idsRegistry.find(val => {
        return GetRightClickedRegistryStatus(props)!=3;
    });
    if (hasErrors != null) {
        Materialize.toast("На счёт-фактуру создано указание, нельзя изменить отметку о просмотре");
        return;
    }
    const tableId = props.ownerId;
    const controllerName = props.tableControllerName;
    idsRegistry.forEach(id => {
        MoRegistryApiUtils.addRegistryMark(id)
            .then(data => {
                    if (data != null && data.error != null) {
                        Materialize.toast(data.error);
                        return;
                    }
                    TableRowSelectActionCreator.select(tableId, id, false);
                    TableGetItemByIdStartActionCreator
                        .getItemByIdStart(tableId, controllerName, id);
                    TableRowSelectActionCreator.select(tableId, idRegistry, false);
                },
                err => {
                    Materialize.toast(err);
                    return;
                });
    });
}

function RemoveRemark(props) {
    let idsRegistry = GetIds(props.ownerId);
    if (idsRegistry == null || !Array.isArray(idsRegistry) || idsRegistry.length == 0) {
        Materialize.toast("Реестр не выбран");
        return;
    }
    let hasErrors = idsRegistry.find(val => {
        return GetRightClickedRegistryStatus(props) != 3;
    });
    if (hasErrors != null) {
        Materialize.toast("На счёт-фактуру создано указание, нельзя изменить отметку о просмотре");
        return;
    }
    const tableId = props.ownerId;
    const controllerName = props.tableControllerName;
    idsRegistry.forEach(id => {
        MoRegistryApiUtils.removeRegistryMark(id)
            .then(data => {
                if (data != null && data.error != null) {
                    Materialize.toast(data.error);
                    return;
                }
                TableRowSelectActionCreator.select(tableId, id, false);
                TableGetItemByIdStartActionCreator
                    .getItemByIdStart(tableId, controllerName, id);
            },
                err => {
                    Materialize.toast(err);
                    return;
                });
    });
}

function RemoveRegistry(props) {
    let idsRegistry = GetIds(props.ownerId);
    if (idsRegistry == null || !Array.isArray(idsRegistry) || idsRegistry.length == 0) {
        Materialize.toast("Реестр не выбран");
        return;
    }
    idsRegistry.forEach(id => {
        MoRegistryApiUtils.removeRegistry(id)
            .then(data => {
                if (data != null && data.error != null) {
                    Materialize.toast(data.error);
                    return;
                }
                TableRowSelectActionCreator.select("moStreamRegistry", id, false);
                TableGetItemByIdStartActionCreator
                    .getItemByIdStart("moStreamRegistry", "moStream/MoRegistryList", id);
            },
                err => {
                    Materialize.toast(err);
                    return;
                });
    });
}

function InfoZone(tableId) {
    var rows = TableStore.getSelectedRows(tableId);
    if (rows == null || !Array.isArray(rows)||rows.length==0) {
        return null;
    }
    let cnt = rows.length;
    let cntPos = rows.reduce((prev, curr) => {
        var curVal = TableStore.getFieldValue(tableId, curr, "countCases");
        return prev + Math.round((curVal == null ? 0 : curVal)*100);
    }, 0)/100;
    let sumV = rows.reduce((prev, curr) => {
        var curVal = TableStore.getFieldValue(tableId, curr, "summaV");
        return prev + Math.round((curVal == null ? 0 : curVal)*100);
    }, 0)/100;
    let sumP = rows.reduce((prev, curr) => {
        var curVal = TableStore.getFieldValue(tableId, curr, "summaP");
        return prev + Math.round((curVal == null ? 0 : curVal)*100);
    }, 0)/100;
    let sumRefused = rows.reduce((prev, curr) => {
        var curVal = TableStore.getFieldValue(tableId, curr, "summaRefused");
        return prev + Math.round((curVal == null ? 0 : curVal)*100);
    }, 0)/100;
    return `Реестров: ${cnt}. Позиций ${cntPos} на сумму ${sumV} руб., принято ${sumP} руб., отказано ${sumRefused} руб.`;
}

export default MoStream;