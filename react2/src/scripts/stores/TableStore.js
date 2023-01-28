"use strict";

import {EventEmitter} from "events";

import Dispatcher from "../dispatcher/Dispatcher";

import {ActionTypes} from "../constants/Constants";

import UniEditorStore from "./UniEditorStore";

const TABLE_CHANGE_EVENT="table_change_"; //prefix for set of events.
const PROCESSED_HEADERS_CHANGE_EVENT="processed_headers_change_";
const ROW_COUNT_CHANGE_EVENT="items_count_change_";

//map of objects
//each oject corresponeded to Table object by table's id (because it's possible there >1 table per page)
let Data=new Map();

let TableStore=Object.assign({}, EventEmitter.prototype, {
	emitTableChange:function(tableId)
	{
		this.emit(TABLE_CHANGE_EVENT+tableId);
	},
	addTableChangeListener:function(tableId, callback)
	{
		this.on(TABLE_CHANGE_EVENT+tableId, callback);
	},
	removeTableChangeListener:function(tableId, callback)
	{
		this.removeListener(TABLE_CHANGE_EVENT+tableId, callback);
	},

	emitProcessedHeadersChange:function(tableId)
	{
		this.emit(PROCESSED_HEADERS_CHANGE_EVENT+tableId);
	},
	addProcessedHeadersChangeListener:function(tableId, callback)
	{
		this.on(PROCESSED_HEADERS_CHANGE_EVENT+tableId, callback);
	},
	removeProcessedHeadersChangeListener:function(tableId, callback)
	{
		this.removeListener(PROCESSED_HEADERS_CHANGE_EVENT+tableId, callback);
	},

    exists(tableId) {
        let tableData = Data.get(tableId);
        if (!tableData) {
            return false;
        }
        return true;
	},
	hasData:function(tableId)
	{
		let tableData=Data.get(tableId);
		if (!tableData||!tableData.data||tableData.data.length==0||!tableData.processedHeaders)
		{
			return false;
		}
		return true;
	},
	getData:function(tableId)
	{
		let tableData=Data.get(tableId);
		if (!tableData||!tableData.data||!tableData.processedHeaders)
		{
			return [];
		}
		if (!tableData.headers||tableData.headers.length==0)
		{
			return [];
		}
		let keyFieldName=tableData.keyFieldName;
		let filterList=tableData.headers.filter(function(value){
			return value.filter!=null;
		});
		let rslt;
		if (filterList.length==0)
		{
			rslt=tableData.data;
		}
		else
		{
			rslt=Filter(tableData.data, filterList);
		}
		rslt=rslt.slice(tableData.currentPageNum*tableData.itemsPerPage, tableData.currentPageNum*tableData.itemsPerPage+tableData.itemsPerPage)
		.map(data=>{
			let keyFieldValue=null;
			if (keyFieldName)
			{
				keyFieldValue=data[keyFieldName];
			}
			let rowData=tableData.processedHeaders.map(function(header)
				{
					/*format data*/
					if ((header.format=="ld"||header.format=="ldt")&&(data[header.fieldName]!=null))
					{
						switch(header.format)
						{
							case "ld":
								return data[header.fieldName].toLocaleDateString();
								break;
							case "ldt":
								return data[header.fieldName].toLocaleString();
								break;
							default:
								return data[header.fieldName];
								break;
						}
					}
					else
					{
						return data[header.fieldName];
					}					
				});
			let row=new RowData(keyFieldValue, rowData, data["hasChildren"]);
			return row;
		}/*.bind(this)*/);
		return rslt;
	},
	getFieldValue:function(tableId, keyFieldValue, targetFieldName)
	{
		let tableData=Data.get(tableId);
		if (!tableData||!tableData.data)
		{
			return null;
		}
		let row=tableData.data.find(val=>{return val[tableData.keyFieldName]==keyFieldValue});
		if (row==null)
		{
			return null;
		}
		return row[targetFieldName];
	},
	getFieldUniques:function(tableId, targetFieldName)
	{
		let tableData=Data.get(tableId);
		if (!tableData||!tableData.data)
		{
			return null;
		}
		let fieldValues=new Set(tableData.data.map(val=>{return val[targetFieldName]}));
		let rslt=[];
		for (let item of fieldValues)
		{
			rslt.push(item);
		}
		return rslt;
    },
    getFieldValuesFiltered: function(tableId, keyFieldName, keyFieldValue, targetFieldName) {
        let tableData = Data.get(tableId);
        if (!tableData || !tableData.data) {
            return null;
        }
        let rslt = tableData.data.filter(row => {
            return row[keyFieldName] == keyFieldValue;
        }).map(row => { return row[targetFieldName]; });

        return rslt;
    },
	getHeaders:function(tableId)
	{
		let tableData=Data.get(tableId);
		if (!tableData||!tableData.processedHeaders)
		{
			return [];
		}
		return tableData.processedHeaders.map(val=>{return Object.assign({}, val)});
	},
	getAllHeaders:function(tableId)
	{
		let tableData=Data.get(tableId);
		if (!tableData||!tableData.headers)
		{
			return [];
		}
		return tableData.headers.map(val=>{return Object.assign({}, val)});
	},
	getHeaderShifted:function(tableId, fieldName, shift)
	{
		let tableData=Data.get(tableId);
		if (!tableData||!tableData.processedHeaders||!tableData.processedHeaders.length)
		{
			return;
		}
		let current=tableData.processedHeaders.filter(function(value){
			return value.fieldName==fieldName;
		});
		if (current.length!=1)
		{
			return;
		}
		let index=tableData.processedHeaders.indexOf(current[0])+shift;
		return tableData.processedHeaders[index];
	},
	getHeaderType:function(tableId, fieldName)
	{
		let tableData=Data.get(tableId);
		if (!tableData)
		{
			return null;
		}
		let headers=tableData.headers.filter(val=>{
			return val.fieldName==fieldName;
		});
		if (headers.length!=1)
		{
			return null;
		}
		if (headers[0].type)
		{
			return headers[0].type;
		}
		else
		{
			return "string";
		}
	},
	getRowCount:function(tableId)
	{
		let tableData=Data.get(tableId);
		if (!tableData||!tableData.rowCount)
		{
			return 0;
		}
		return tableData.rowCount;
	},
	getCurrentPageNum:function(tableId)
	{
		let tableData=Data.get(tableId);
		if (!tableData||!tableData.currentPageNum)
		{
			return 0;
		}
		return tableData.currentPageNum;
	},
	getItemsPerPage:function(tableId)
	{
		let tableData=Data.get(tableId);
		if (!tableData)
		{
			return 0;
		}
		return tableData.itemsPerPage;
	},
	getPageCount:function(tableId)
	{
		return GetPageCount(tableId);
	},
	getFilter:function(tableId, fieldName)
	{
		let tableData=Data.get(tableId);
		if (!tableData||!tableData.headers)
		{
			return null;
		}
		let res=tableData.headers.filter(val=>{return val.fieldName==fieldName});
		if (res.length==0)
		{
			return null;
		}
		return res[0].filter;
	},
	getFiltersFormatted:function(tableId)
	{
		let rslt=[];
		let tableData=Data.get(tableId);
		if (!tableData||!tableData.headers||tableData.headers.length==0)
		{
			return null;
		}
		else
		{
			let filterList=tableData.headers.filter(val=>{
				return val.filter!=null;
			});
			if (filterList.length==0)
			{
				return null;
			}
			for(let item of filterList)
			{
				if (item.filterType=="list"||item.type=="boolean")
				{
					let val="";
					if (item.filter.showEmpty)
					{
						val=" показывать пустые";
					}
					if (item.filter.showNotEmpty)
					{
						val=(val==""?"":(val+" ИЛИ "))+" показывать непустые";
					}
					let val2=Object.keys(item.filter.items).filter(value=>{return item.filter.items[value]==true;}).join(" ИЛИ ");
					val='"'+item.caption+'" = '+val+(val==""||val2==""?"":" ИЛИ ")+val2;
					rslt.push(val);
				}
				else
				{
					switch(item.type)
					{
						case "string":
							let val1=null;
							let val2=null;
							if (item.filter.regExp!=null)
							{
								
								if (item.filter.regExp.source[0]=="^")
								{
									val1='"'+item.caption+'" начинается с "'+item.filter.regExp.source.substr(1)+'"';
								}
								else
								{
									val1='"'+item.caption+'" содержит "'+item.filter.regExp.source+'"';
								}
							}
							if (item.filter.showEmpty)
							{
								val2='"'+item.caption+'" показывать пустые';
							}
							if (val1||val2)
							{
								if (val1&&val2)
								{
									rslt.push(val1+" ИЛИ "+val2);
								}
								else
								{
									rslt.push(val1?val1:val2);
								}
							}
							break;
						case "date":
							if (item.filter.startDate!=null)
							{
								rslt.push('"'+item.caption+'" c "'+item.filter.startDate.toLocaleDateString()+'"');
							}
							if (item.filter.endDate!=null)
							{
								rslt.push('"'+item.caption+'" по "'+item.filter.endDate.toLocaleDateString()+'"');
							}
							break;
						case "number":
							if (item.filter.minValue!=null)
							{
								rslt.push('"'+item.caption+'" c '+item.filter.minValue);
							}
							if (item.filter.maxValue!=null)
							{
								rslt.push('"'+item.caption+'" по '+item.filter.maxValue);
							}
							break;
						default:break;
					}
				}
			}
		}
		if (rslt.length>0)
		{
			return "("+rslt.join(")И(")+")";
		}
		else
		{
			return null;
		}
	},
	getSettings:function(tableId)
	{
		let tableData=Data.get(tableId);
		if (!tableData)
		{
			return [];
		}
		return tableData.settings;
	},
	getSettingsId:function(tableId)
	{
		let tableData=Data.get(tableId);
		if (!tableData)
		{
			return [];
		}
		return tableData.settingsId;
	},
	isRowSelected:function(tableId, id)
	{
	    let tableData=Data.get(tableId);
	    if (!tableData||tableData.selectedRows==null)
	    {
	        return false;
	    }
	    return tableData.selectedRows.has(id);
	},
	getSelectedRows:function(tableId)
	{
	    let tableData=Data.get(tableId);
	    if (!tableData||tableData.selectedRows==null)
	    {
	        return null;
	    }
	    let rslt=[];
	    for (let item of tableData.selectedRows)
	    {
	        rslt.push(item);
	    }
	    return rslt;
	},
	isRowEdited:function(tableId, id)
	{
	    let tableData=Data.get(tableId);
	    if (!tableData||tableData.editedRows==null)
	    {
	        return false;
	    }
	    return tableData.editedRows.has(id);
	},
	getEditedRows:function(tableId)
	{
	    let tableData=Data.get(tableId);
	    if (!tableData||tableData.editedRows==null)
	    {
	        return null;
	    }
	    let rslt=[];
	    for (let item of tableData.editedRows)
	    {
	        rslt.push(item);
	    }
	    return rslt;
	},
	getEditedRowValues(tableId, id) {
	    let tableData=Data.get(tableId);
	    if (!tableData||!tableData.data)
	    {
	        return null;
	    }
	    let row = tableData.data.find(val => { return val[tableData.keyFieldName] == id });
	    if (row==null)
	    {
	        return null;
	    }
	    row = Object.assign({}, row);
	    let editables = tableData.headers.filter(val => { return val.isEditable === true; });
	    editables.forEach(val => {
	        let newVal=UniEditorStore.getValue(`${tableId}-${val.fieldName}-${id}`);
	        if (newVal !== undefined) {
	            row[val.fieldName] = newVal;
	        }
	    });
	    return row;
	},
	locateTableIds:function(tablePrefix, parentId)
	{
		return LocateTableIds(tablePrefix, parentId);
	},
	getRightClickedRowId:function(tableId)
	{
		let tableData=Data.get(tableId);
		if (!tableData)
		{
			return null;
		}
		return tableData.rightClickedRowId;
	}
});

function SetData(tableId, data)
{
	let tableData=Data.get(tableId);
	if (!tableData)
	{
		tableData=new TableData(tableId);
		Data.set(tableId, tableData);
	}
	if (!data)
	{
		return;
	}
	tableData.isDataFormatted=false;
	tableData.data=data.data;
	tableData.headers = data.headers;
	if (data.settings!=null)
	{
	    tableData.settings = data.settings.columnSettings;
		tableData.settingsId=data.settings.id;
	}
	else
	{
		tableData.settings = [];
		tableData.settingsId=null;
	}
	tableData.rowCount=data.data.length;
	let keyFields=tableData.headers.filter(function(header){
		return header.isKeyField;
	});
	if (keyFields.length>0)
	{
		tableData.keyFieldName=keyFields[0].fieldName;
	}
		
}

function SetSettingsId(tableId, settingsId)
{
	let tableData=Data.get(tableId);
	if (!tableData)
	{
		return;
	}
	if (tableData.settingsId!=null||tableData.settingsId==settingsId)
	{
		return;
	}
	tableData.settingsId=settingsId;
}

//formatting data according to header.format
function FormatData(tableId, itemId)
{
	let tableData=Data.get(tableId);
	if (!tableData)
	{
		return;
	}
	if ((tableData.isDataFormatted&&itemId==null)
		||!tableData.headers||tableData.headers.length==0
		||!tableData.data||tableData.data.length==0)
	{
		return;
	}
	let formatHeaders=tableData.headers.filter(function(value)
		{
			return value.format;
		});
	formatHeaders.forEach(function(header)
		{
			let data=tableData.data;
			if (itemId!=null)
			{
				data=data.filter(val=>{return val[tableData.keyFieldName]==itemId});
			}
			data.forEach(function(item)
			{
				item[header.fieldName]=Format(item[header.fieldName], header.format);
			});
		});
	//calculating data type
	if (itemId==null)
	{
		let headers=tableData.headers;
		headers.forEach(value=>{
			if ((value.format=="ld")||(value.format=="ldt"))
			{
				value.type="date";
				return;
			}
			else if (value.format=="number")
			{
				value.type="number";
				return;
			}
			else if (value.format=="boolean")
			{
				value.type="boolean";
				return;
			}
			let tmp=tableData.data.filter(val=>{return val[value.fieldName]!=null;});
			if (tmp.length==0)
			{
				value.type="string";
				return;
			}
			switch(typeof tmp[0][value.fieldName])
			{
				case "string":
					value.type="string";
					break;
				case "number":
					value.type="number";
					break;
				case "boolean":
					value.type="boolean";
					break;
				//removed test for Date - if it wasn't marked as 'ld' or 'ldt', it's still a string
				default:
					value.type="string";
					break;
			}
		});
		tableData.isDataFormatted=true;
	}
}
function Format(value, format)
{
	let tmp=null;
	if (value==null||format==null)
	{
		return value;
	}
	else
	{
		switch(format)
		{
			case "ld":
				tmp=new Date(value);
				if (!isNaN(tmp))
				{
					return tmp;
				}
				break;
			case "ldt":
				tmp=new Date(value);
				if (!isNaN(tmp))
				{
					return tmp;
				}
                break;
			default:
				return value;
				break;
		}
	}	
}

function ProcessHeaders(tableId)
{
	let tableData=Data.get(tableId);
	if (!tableData)
	{
		return;
	}
	let headers=tableData.headers;
	if (!headers||headers.length==0)
	{
		tableData.processedHeaders=[];
		return;
	}
	let settings=tableData.settings;
	tableData.processedHeaders=[];
	if (!settings||settings.length==0)
	{
		headers.forEach(function(value, index)
			{
				value.isVisible=(value.isVisible===false)?false:true;
				value.order=(!value.order)?index+1:value.order;
				value.width=(!value.width)?50:value.width;
				tableData.processedHeaders.push(Object.assign({}, value));
				//return value;
			});
	}
	else {
		headers.forEach(function(value, index)
			{
				let newValue=Object.assign({}, value);
				let cs=settings.filter(function(val)
					{
						return val.fieldName==newValue.fieldName;
					});
				if (!cs||cs.length==0)
				{
					newValue.isVisible=(value.isVisible===false)?false:true;
					newValue.order=(!value.order)?index+1:value.order;
					newValue.width=(!value.width)?50:value.width;
					//return value;
				}
				else
				{
					newValue.isVisible=(value.isVisible===false||cs[0].isVisible===false)?false:true;
					newValue.order=(cs[0].order&&cs[0].order>0)?cs[0].order:((value.order&&value.order>0)?value.order:index+1);
					newValue.width=(cs[0].width&&cs[0].width>0)?cs[0].width:((value.width&&value.width>0)?value.width:50);
					newValue.sortOrder=(cs[0].sortOrder)?cs[0].sortOrder:value.sortOrder;
					//return value;
				}
				tableData.processedHeaders.push(newValue);
			});
	}
	
	tableData.processedHeaders=SortAndFilterHeaders(tableData.processedHeaders);
}

function SortAndFilterHeaders(processedHeaders)
{
	processedHeaders.sort(function(a,b)
		{
			if (a.order<b.order)
			{
				return -1;
			}
			else
			{
				if (a.order>b.order)
				{
					return 1;
				}
				else
				{
					return 0;
				}
			}
		});
	return processedHeaders.filter(function(val)
		{
			return val.isVisible;
		});
}

function SetUserSettings(tableId, newColSettings)
{
	let tableData=Data.get(tableId);
	if (!tableData)
	{
		return 0;
	}

	let _processNewColSettings=function(oldValue, newColSettings)
	{
		if (newColSettings.width)
		{
			oldValue.width=newColSettings.width;
		}
		if (newColSettings.order)
		{
			oldValue.order=newColSettings.order;
		}
		if (newColSettings.sortOrder)
		{
			oldValue.sortOrder=newColSettings.sortOrder;
		}
		if (newColSettings.isVisible!=null)
		{
			oldValue.isVisible=newColSettings.isVisible;
		}
	}
	
	let settings=tableData.settings;
	if (!settings)
	{
		settings=[];
		tableData.settings=settings;
	}
	if (newColSettings.sortOrder) //clear previous sort settings
	{
		settings.forEach(function(val){val.sortOrder=null;});
		tableData.headers.forEach(function(val){val.sortOrder=null;});
	}
	let elems=settings.filter(function(value)
	{
		return value.fieldName==newColSettings.fieldName;
	});
	if (elems.length==0)
	{
		settings.push(newColSettings);
	}
	else
	{
		elems.forEach(function(value){
			_processNewColSettings(value, newColSettings);
		});
	}
	//if (newColSettings.order||newColSettings.sortOrder||newColSettings.isVisible!=null)
	{
		ProcessHeaders(tableId);
	}
	if (newColSettings.sortOrder) 
	//sorting all data phisically, because filtering is not so frequent as page switching, 
	//but sorting should be applied in both cases - so, it's more profitable 
	//to sort all data once and then filter/slice sorted array of data
	{
		SortData(tableId);
	}
}

function SortData(tableId)
{
	let tableData=Data.get(tableId);
	if (!tableData||!tableData.data||tableData.data.length==0||!tableData.processedHeaders||tableData.processedHeaders.length==0)
	{
		return;
	}
	let tmp=tableData.processedHeaders.filter(val=>{return (val.sortOrder==-1 || val.sortOrder==1);})
	if (tmp.length==0)
	{
		return;
	}
	tableData.data.sort((val1, val2)=>{
		let fieldName=tmp[0].fieldName;
		let sortOrder=tmp[0].sortOrder;
		
		if (val1[fieldName]==null&&val2[fieldName]==null)
		{
			return 0;
		}
		if (val1[fieldName]==null&&val2[fieldName]!=null)
		{
			return -1*sortOrder;
		}
		if (val1[fieldName]!=null&&val2[fieldName]==null)
		{
			return sortOrder;
		}

		if (tmp[0].type=="string")
		{
			if (val1[fieldName].toLocaleUpperCase()<val2[fieldName].toLocaleUpperCase())
			{
				return -1*sortOrder;
			}
			else if (val1[fieldName].toLocaleUpperCase()>val2[fieldName].toLocaleUpperCase())
			{
				return sortOrder;
			}
			else
			{
				return 0;
			}		
		}
		else
		{
			if (val1[fieldName]<val2[fieldName])
			{
				return -1*sortOrder;
			}
			else if (val1[fieldName]>val2[fieldName])
			{
				return sortOrder;
			}
			else
			{
				return 0;
			}		
		}
	});
}

function ColumnMove(tableId, processedHeaderIndex, shift)
{
	let tableData=Data.get(tableId);
	if (!tableData)
	{
		return;
	}
	let current=tableData.processedHeaders[processedHeaderIndex];
	let nextItem=tableData.processedHeaders[processedHeaderIndex+shift];
	if (!nextItem||!current)
	{
		return;
	}
	let tmp=current.order;
	SetUserSettings(
		tableId, 
		new ColumnSettings(current.fieldName, 
			null, 
			nextItem.order, 
			null, 
			null, 
			null)
		);
	SetUserSettings(
		tableId, 
		new ColumnSettings(nextItem.fieldName, 
			null, 
			tmp, 
			null, 
			null, 
			null)
		);
}

function GetPageCount(tableId)
{
	let tableData=Data.get(tableId);
	if (!tableData)
	{
		return 0;
	}
	return GetPageCountI(tableData.rowCount, tableData.itemsPerPage);
}

function GetPageCountI(rowCount, itemsPerPage)
{
	if (!rowCount||rowCount<=0||!itemsPerPage||itemsPerPage<=0)
	{
		return 0;
	}
	let mod=rowCount%itemsPerPage;
	let cnt=(rowCount-mod)/itemsPerPage;
	if (mod>0)
	{
		cnt++;
	}
	return cnt;
}

function PageResize(tableId, itemsPerPage)
{
	let tableData=Data.get(tableId);
	if (!tableData)
	{
		tableData=new TableData(tableId);
		Data.set(tableId, tableData);
	}
	tableData.itemsPerPage=Number(itemsPerPage);
	PageSwitch(tableId, tableData.currentPageNum);
}

function PageSwitch(tableId, pageNumber)
{
	let tableData=Data.get(tableId);
	if (!tableData)
	{
		tableData=new TableData(tableId);
		Data.set(tableId, tableData);
	}
	let pageCount=GetPageCountI(tableData.rowCount, tableData.itemsPerPage);
	switch(pageNumber)
	{
		case "first":
			tableData.currentPageNum=0;
			break;
		case "last":
			tableData.currentPageNum=pageCount-1;
			break;
		case "previous":
			tableData.currentPageNum--;
			break;
		case "next":
			tableData.currentPageNum++;
			break;
		default:
			tableData.currentPageNum=Number(pageNumber);
			break;
	}
	if (!tableData.currentPageNum)
	{
		tableData.currentPageNum=0;
	}
	else if (tableData.currentPageNum>=pageCount)
	{
		tableData.currentPageNum=pageCount-1;
	}
	else if (tableData.currentPageNum<0)
	{
		tableData.currentPageNum=0;
	}
	
}

function SetFilter(tableId, fieldName, filter)
{
	let tableData=Data.get(tableId);
	if (!tableData||!tableData.headers||tableData.headers.length==0)
	{
		if (tableData)
		{
			tableData.rowCount=0;
			tableData.currentPageNum=0;
		}
		return;
	}
	let headers=tableData.headers.filter(function(value){
		return value.fieldName==fieldName;
		});
	if (headers.length==1)
	{
		headers[0].filter=filter;
	}	

	let filterList=tableData.headers.filter(val=>{
		return val.filter!=null;
	});
	
	let rslt=tableData.data;
	if (filterList.length>0)
	{
		rslt=Filter(tableData.data, filterList);
	}
	tableData.rowCount=rslt.length;
	FixCurrentPageNumber(tableData);
}

function FixCurrentPageNumber(tableData)
{
	let pageCount=GetPageCountI(tableData.rowCount, tableData.itemsPerPage);
	if (!tableData.currentPageNum)
	{
		tableData.currentPageNum=0;
	}
	else if (tableData.currentPageNum>=pageCount)
	{
		tableData.currentPageNum=pageCount-1;
	}
	else if (tableData.currentPageNum<0)
	{
		tableData.currentPageNum=0;
	}
}

function Filter(data, filterList)
{
	return data.filter(val=>{
		let res=true;
		for (let item of filterList)
		{
			if (item.filterType=="list"||item.type=="boolean")
			{
				if (val[item.fieldName]===""||val[item.fieldName]==null)
				{
					res=item.filter.showEmpty===true;
				}
				else
				{
					res=item.filter.showNotEmpty===true;
					if (!res)
					{
						res=item.filter.items[val[item.fieldName].toString()]==true;
					}
				}
			}
			else
			{
				switch(item.type)
				{
					case "string":
						if (item.filter.regExp==null&&!item.filter.showEmpty)
						{

						}
						else
						{
							res=(item.filter.regExp==null&&(item.filter.showEmpty&&(val[item.fieldName]==""||val[item.fieldName]==null))) //only showNull checked
								||( //some RegEx presents
									(item.filter.regExp!=null&&item.filter.regExp.test(val[item.fieldName]))
									||(item.filter.showEmpty&&(val[item.fieldName]==""||val[item.fieldName]==null))
								);
						}
						break;
					case "date":
						if (item.filter.startDate!=null)
						{
							res=val[item.fieldName]>=item.filter.startDate;
						}
						if (res)
						{
							if (item.filter.endDateEdge!=null)
							{
								res=val[item.fieldName]<item.filter.endDateEdge;
							}
						}
						break;
					case "number":
						if (item.filter.minValue!=null)
						{
							res=val[item.fieldName]>=item.filter.minValue;
						}
						if (res)
						{
							if (item.filter.maxValue)
							{
								res=val[item.fieldName]<=item.filter.maxValue;
							}
						}
						break;
					default:
						break;
				}
			}
			if (res==false)
				break;
		}
		return res;
	});			
}

function RemoveAllFilters(tableId)
{
	let tableData=Data.get(tableId);
	if (!tableData||!tableData.headers||tableData.headers.length==0)
	{
		return;
	}
	tableData.headers.forEach(val=>{
		val.filter=null;
	});
	tableData.rowCount=tableData.data.length;
	FixCurrentPageNumber(tableData);
}

function RemoveTableData(tableId)
{
	Data.delete(tableId);
}

function SetConditionalObject(tableId, conditionObj)
{
	let tableData=Data.get(tableId);
	if (!tableData||!tableData.headers||tableData.headers.length==0)
	{
		return;
	}
	tableData.conditionObj=conditionObj;
}

function SetSelectedRow(tableId, id, value)
{
	let tableData=Data.get(tableId);
	if (!tableData)
	{
		return;
	}
	if (tableData.selectedRows==null)
	{
		tableData.selectedRows=new Set();
	}
	if (value==true)
	{
		tableData.selectedRows.add(id);
	}
	else
	{
		tableData.selectedRows.delete(id);
	}
	
}

function SetEditedRow(tableId, id, value)
{
    let tableData=Data.get(tableId);
    if (!tableData)
    {
        return;
    }
    if (tableData.editedRows==null)
    {
        tableData.editedRows=new Set();
    }
    if (value==true)
    {
        tableData.editedRows.add(id);
    }
    else
    {
        tableData.editedRows.delete(id);
    }
	
}

function UnselectAllRows(tableId)
{
	let tableData=Data.get(tableId);
	if (!tableData)
	{
		return;
	}
	tableData.selectedRows=null;	
}

function UneditAllRows(tableId)
{
    let tableData=Data.get(tableId);
    if (!tableData)
    {
        return;
    }
    tableData.editedRows=null;	
}

function SetTableItem(tableId, itemId, data)
{
	let tableData=Data.get(tableId);
	if (!tableData)
	{
		return false;
	}
	let rows=tableData.data.filter(val=>{return val[tableData.keyFieldName]==itemId;})
	switch(rows.length)
	{
		case 1:
			let index=tableData.data.indexOf(rows[0]);
			if (data!=null) //update info
			{
				tableData.data[index]=data;
				return true;
			}
			else //no new item - current should be deleted
			{
				tableData.data.splice(index, 1);
				tableData.rowCount--;
				/*if (tableData.data.length==0)
				{
					RemoveTableData(tableId);
				}*/
				return false;
			}
			break;
		case 0:
			//add new item
			if (data!=null)
			{
				tableData.data.push(data);
				tableData.rowCount++;
				return true;
			}
			break;
		default:
			throw "Дубликат первичного ключа в таблице "+tableId+", id "+itemId;
	}
	
}

function LocateTableIds(tablePrefix, parentId)
{
	if (parentId==null)
	{
		return tablePrefix;
	}
	//let regExp=new RegExp('^(.*_|)'+tablePrefix+'[$]{1}[^0-9]*'+parentId+'([^0-9]+.*|)$');
	let regExp=new RegExp("^"+tablePrefix+"[$]{1}.+__"+parentId+"__.+$");
	let rslt=[];
	for(let key of Data.keys())
	{
		if (regExp.test(key))
		{
			rslt.push(key);
		}
	}
	return rslt;
}

function SetRightClickedRowId(tableId, id)
{
	let tableData=Data.get(tableId);
	if (!tableData)
	{
		return;
	}
	tableData.rightClickedRowId=id;
}

function MiscAddBtnCount(tableId, id, count)
{
	let tableData=Data.get(tableId);
	if (!tableData)
	{
		return false;
	}
	if (tableData.misc==null)
	{
		tableData.misc={};
	}
	if (tableData.misc.btnCounts==null)
	{
		tableData.misc.btnCounts=new Map();
	}
	let curMax=0;
	tableData.misc.btnCounts.forEach(val=>{
		if (val>curMax)
		{
			curMax=val;
		}
	});
	tableData.misc.btnCounts.set(id, count);
	return count>curMax;
}

function MiscRemoveBtnCount(tableId, id)
{
	let tableData=Data.get(tableId);
	if (!tableData)
	{
		return false;
	}
	if (tableData.misc==null)
	{
		return false;
	}
	let map=tableData.misc.btnCounts;
	if (map==null)
	{
		return false;
	}
	let item=map.get(id);
	if (item==undefined)
	{
		return false;
	}
	map.delete(id);
	if (map.size==0)
	{
		return item>0;
	}
	let iterator=map.values();
	let nextItem=iterator.next();
	while (!nextItem.done&&nextItem.value<item)
	{
		nextItem=iterator.next();
	}
	return nextItem.done; //if cycle is finished - all items less then deleted - we should generate update event
}

TableStore.dispatchToken=Dispatcher.register(function(action)
	{
		switch(action.type)
		{
			case ActionTypes.C_TABLE_CREATE:
				break;
			case ActionTypes.C_TABLE_DESTROY:
				RemoveTableData(action.tableId);
				TableStore.emitTableChange(action.tableId);
				break;
			case ActionTypes.C_TABLE_GET_DATA:
			    SetData(action.tableId, action.data);
			    FormatData(action.tableId);
				ProcessHeaders(action.tableId);
				SortData(action.tableId);
				TableStore.emitTableChange(action.tableId);
				break;
			case ActionTypes.C_TABLE_COLUMN_RESIZE:
				SetUserSettings(action.tableId, new ColumnSettings(action.fieldName, null, null, action.newWidth, null));
				TableStore.emitProcessedHeadersChange(action.tableId);
				break;
			case ActionTypes.C_TABLE_COLUMN_MOVE:
				ColumnMove(action.tableId, action.processedHeaderIndex, action.shift);
				TableStore.emitTableChange(action.tableId);
				break;
			case ActionTypes.C_TABLE_SORT:
				SetUserSettings(action.tableId, new ColumnSettings(action.fieldName, null, null, null, action.sortOrder));
				TableStore.emitTableChange(action.tableId);
				break;
			case ActionTypes.C_TABLE_FILTER:
				if (action!=null&&action.removeAll)
				{
					RemoveAllFilters(action.tableId);
				}
				else
				{
					SetFilter(action.tableId, action.fieldName, action.filter);
				}
				TableStore.emitTableChange(action.tableId);
				break;
			case ActionTypes.C_TABLE_PAGE_SWITCH:
				PageSwitch(action.tableId, action.pageNumber)
				TableStore.emitTableChange(action.tableId);
				break;
			case ActionTypes.C_TABLE_PAGE_RESIZE:
				PageResize(action.tableId, action.itemsPerPage);
				TableStore.emitTableChange(action.tableId);
				break;
			case ActionTypes.C_TABLE_SELECT_ROW:
				SetSelectedRow(action.tableId, action.id, action.value);
				TableStore.emitTableChange(action.tableId);
				break;
		    case ActionTypes.C_TABLE_EDIT_ROW_INLINE:
		        SetEditedRow(action.tableId, action.id, action.value);
		        TableStore.emitTableChange(action.tableId);
		        break;
			case ActionTypes.C_TABLE_UNSELECT_ALL:
			    UnselectAllRows(action.tableId);
			    UneditAllRows(action.tableId);
				TableStore.emitTableChange(action.tableId);
				break;
			case ActionTypes.C_TABLE_SETTINGS_ID_SYNC:
				SetSettingsId(action.tableId, action.settingsId);
				break;
			case ActionTypes.C_TABLE_COLUMN_VISIBLE:
				SetUserSettings(action.tableId, new ColumnSettings(action.fieldName, action.isVisible, null, null, null));
				TableStore.emitTableChange(action.tableId);
				break;
			case ActionTypes.C_TABLE_GET_ITEM_BY_ID:
				if (SetTableItem(action.tableId, action.itemId, action.data)===true)
				{
					FormatData(action.tableId, action.itemId);
				}
				TableStore.emitTableChange(action.tableId);
				break;
			case ActionTypes.C_TABLE_RIGHT_CLICK_ROW:
				SetRightClickedRowId(action.tableId, action.id);
				break;
			default:
				break;
		}
	}
);

class TableData
{
	constuctor(tableId)
	{
		this.tableId=tableId;
		this.keyFieldName=null;
		this.data=[];
		this.headers=[];
		this.isDataFormatted=false;
		this.settings=[]; //table settings from User profile
		this.settingsId=null, //id of row with settings in database table
		this.processedHeaders=[]; //result of headers * settings
		this.filters=[]; //client-side filters
		this.currentPageNum=0;
		this.itemsPerPage=20;
		this.rowCount=0;
		this.conditionObj=null; //conditions for server-side selection
		this.selectedRows=new Set();//id's of selected rows
	    this.editedRows = new Set();
		this.rightClickedRowId=null;
	}
}


class RowData
{
	constructor(keyFieldValue, rowData, hasChildren)
	{
		this.rowData=rowData;
		this.keyFieldValue=keyFieldValue;
		this.hasChildren=hasChildren;
	}
}

class ColumnSettings
{
	constructor(fieldName, isVisible, order, width, sortOrder, format)
	{
		this.fieldName=fieldName;
		this.isVisible=isVisible;
		this.order=order;
		this.width=width;
		this.sortOrder=sortOrder;
		this.filter=null;
	}
}

export default TableStore;