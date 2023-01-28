"use strict";

import React from "react";
import ReactDOM from "react-dom";

import moment from "moment";

import Table from "../core/Table.react";
import TableStore from "../../stores/TableStore";

import DatePicker from "../core/DatePicker.react";

import DatePickerStore from "../../stores/DatePickerStore";

import {ContentMountPoint} from "../../constants/Constants";

import ContextMenuItemsCommon from "../shared/ContextMenuItems.Common";

import FlkViewer from "../shared/FlkViewer.react";

import InFileApiUtils from "../../utils/isolated/InFileApiUtils";

import AppStateAddActionCreator from "../../actions/AppStateAddActionCreator";

import InputBoxString from "../simple/InputBoxString.react";

import TableGetItemByIdEndActionCreator from "../../actions/TableGetItemByIdEndActionCreator";
	
class InputStreamFiles extends React.Component{
	constructor(props) {
	    super(props);
		let date=new Date();
		this.state= {
			filter:{
				dateEnd:moment(date).format("YYYY-MM-DD"),
				dateBegin:moment(new Date(date.getFullYear(), date.getMonth(), date.getDate()-10)).format("YYYY-MM-DD")
			},
			orderTableId:null,
			orderControllerName:null,
			reportLink:null
		};
	}

	componentWillMount()
	{
		if (this.props.initials!=null)
		{
			this.setState({
				filter:{
					dateEnd:moment(this.props.initials.dateEnd).format("YYYY-MM-DD"),
					dateBegin:moment(this.props.initials.dateBegin).format("YYYY-MM-DD")
				}
			});
		}
	}

    render()
	{
		let tableContextMenuConfig={
			mountPoint:"inputFileListSvc",
			items:[
				{
					key:"sendFlkProtocol",
					onClick:(event, props)=>{
						SendFlkProtocol(TableStore.getRightClickedRowId(props.ownerId));
					},
					caption:"Отправить протокол ФЛК",
					inRole:["mtr"],
					isVisible:CheckSendProtocolFlkVisibility
				},
				{
					key:"removeFile",
					onClick:(event, props)=>{
						ShowRemoveFileWindow(TableStore.getRightClickedRowId(props.ownerId), TableStore.getFieldValue(props.ownerId, TableStore.getRightClickedRowId(props.ownerId), "fileName"));
					},
					caption:"Удалить файл",
					inRole:["admin", "mtr"]
				},
				{
					key:"ShowColumnEditor",
					onClick:(event, props)=>{
						ContextMenuItemsCommon.showColumnEditor(event, props);
						},
					caption:"Состав колонок",
					mountPoint:"inputFileListSvc"
				},
				{
					key:"SaveTableSettings",
					onClick:(event, props)=>{ContextMenuItemsCommon.saveTableSettings(event, props);},
					caption:"Сохранить настройки таблицы"
				}
			]
		};
		let commandCells=[
			{
				fieldName:"flkLogName",
				commandType:"link",
				onClick:function(id)
				{
					let flkLogId=TableStore.getFieldValue("inputFileList", id, "flkLogId");
					if (flkLogId==null)
					{
						return;
					}
					ReactDOM.unmountComponentAtNode(document.getElementById("filesWindowMountPoint"));
                    ReactDOM.render(<FlkViewer id="inputFlkViewer" 
										flkLogId={flkLogId} 
										tableConfig={{
											'data-table-id':"inputFlkRecords",
											'data-table-controller':"inputStream/InFlkLog",
											itemsPerPage:20,
											canParallize:true, 
											hidePaginatorIfSinglePage:true
										}}>
                    </FlkViewer>,
									document.getElementById("filesWindowMountPoint")
								);
				}
			},
			{
				fieldName:"regDescr",
				commandType:"link",
				onClick:function(id)
				{
					let idRegistry=TableStore.getFieldValue("inputFileList", id, "idRegistry");
					AppStateAddActionCreator.add("InputRegistryView", "InputStream", {id:idRegistry});
				}
			}
		];
		
		return 	<div className="card input-stream" style={{'minHeight':80+"vh", overflow:"visible"}}>
					<div className="card-content">
						<div style={{display:"flex", justifyContent:"flex-start"}}>
							<div style={{display:"flex", justifyContent:"flex-start", alignItems:"center"}}>
								<DatePicker id="fstart" defaultValue={this.state.filter.dateBegin} caption="С" allowEmpty={false}></DatePicker>
								<DatePicker id="fend" defaultValue={this.state.filter.dateEnd} caption="По" allowEmpty={false}></DatePicker>
							</div>
							<a className="waves-effect waves-light btn" onClick={(event) => {let filter={
						    	    dateBegin:DatePickerStore.getValue("fstart"),
							        dateEnd:DatePickerStore.getValue("fend")			
					    		};
					            this.setState({filter:filter});}}>Показать</a>
						</div>
						<div>
							<Table  data-table-id="inputFileList" 
									data-table-controller="inputStream/InFileList" 
									style={{'maxHeight':55+"vh", width:100+"%"}} 
									itemsPerPage="20"
									canParallize={true}
									conditionObj={this.state.filter}
									contextMenuConfig={tableContextMenuConfig}
									commandCells={commandCells}>
							</Table>
						</div>
						<div id="filesWindowMountPoint"></div>
					</div>				
				</div>;
	}
};


function SendFlkProtocol(idFile)
{
	if (idFile==null)
	{
		Materialize.toast("Ошибка определения идентификатора реестра");
		return;
	}
	InFileApiUtils.sendFlkProtocol(idFile)
	.then(data=>{
		if (data!=null&&data.error!=null)
		{
			Materialize.toast(data.error);
		}
		else
		{
			Materialize.toast("Операция завершена", 2500);
		}
	})
	.catch(err=>{
		Materialize.toast(err);
	});
}

function GetRightClickedFileIdFlk()
{
	let id=TableStore.getRightClickedRowId("inputFileList");
	if (id==null)
		return false;
	let val=TableStore.getFieldValue("inputFileList", id, "flkLogId");
	return val;
}

function CheckSendProtocolFlkVisibility()
{
	return GetRightClickedFileIdFlk()>0;
}

function ShowRemoveFileWindow(idFile, nameFile)
{
	if (idFile==null)
	{
		return;
	}
	let mountPoint=document.getElementById("filesWindowMountPoint");
	ReactDOM.unmountComponentAtNode(mountPoint);
	ReactDOM.render(<InputBoxString id="fileRemoveBasement" textCaption={"Основание для удаления файла "+nameFile} onOkClick={RemoveFile} idFile={idFile} text="qwe"></InputBoxString>, 
		mountPoint);
	$("#fileRemoveBasement").openModal();
}

function RemoveFile(comment, props)
{
	InFileApiUtils.removeFile(props.idFile, comment)
	.then(data=>{
		if (data!=null&&data.error!=null)
		{
			Materialize.toast(data.error);
		}
		else
		{
			Materialize.toast("Операция завершена", 2500);
			TableGetItemByIdEndActionCreator.getItemByIdEnd("inputFileList", props.idFile, null);
		}
	},
    err=>{
		Materialize.toast(err);
	});
}

export default InputStreamFiles;