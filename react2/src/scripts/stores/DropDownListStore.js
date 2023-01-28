"use strict";

import {EventEmitter} from "events";

import Dispatcher from "../dispatcher/Dispatcher";

import {ActionTypes} from "../constants/Constants";

const DROPDOWNLIST_CHANGE_EVENT="dropdownlist_change_"; //prefix for event
const DROPDOWNLIST_SELECT_EVENT="dropdownlist_select_";

let Data=new Map();
let SelectedItems=new Map();

let DropDownListStore=Object.assign({}, EventEmitter.prototype, {
	emitListChange:function(ddlistId)
	{
		this.emit(DROPDOWNLIST_CHANGE_EVENT+ddlistId);
	},
	addListChangeListener:function(ddlistId, callback)
	{
		this.on(DROPDOWNLIST_CHANGE_EVENT+ddlistId, callback);
	},
	removeListChangeListener:function(ddlistId, callback)
	{
		this.removeListener(DROPDOWNLIST_CHANGE_EVENT+ddlistId, callback);
	},
	emitListSelect:function(ddlistId)
	{
		this.emit(DROPDOWNLIST_SELECT_EVENT+ddlistId);
	},
	addListSelectListener:function(ddlistId, callback)
	{
		this.on(DROPDOWNLIST_SELECT_EVENT+ddlistId, callback);
	},
	removeListSelectListener:function(ddlistId, callback)
	{
		this.removeListener(DROPDOWNLIST_SELECT_EVENT+ddlistId, callback);
	},
	getData:function(ddlistId)
	{
		let res=Data.get(ddlistId);
		if (!res)
		{
			res=[];
		}
		return res;
	},
	getSelectedItem:function(ddlistId)
	{
		let item=SelectedItems.get(ddlistId);
		if (item===undefined)
		{
			return null;
		}
		let data=Data.get(ddlistId);
		if (!data)
		{
			return null;
		}
		let rslt=data.filter(function(value)
			{
				return value.key==item;
			});
		if (rslt.length==0)
		{
			return null;
		}
		return rslt[0];
	},
	getItem:function(ddlistId, key)
	{
		let data=Data.get(ddlistId);
		if (!data)
		{
			return null;
		}
		let rslt=data.filter(function(value)
			{
				value.key==key;
			});
		if (rslt.length==0)
		{
			return null;
		}
		return rslt[0];
	}
});

function SetData(ddlistId, data)
{
	Data.set(ddlistId, data);
}

function SetSelectedItem(ddlistId, key) {
    SelectedItems.set(ddlistId, (key == null || key.toString == null) ? null : key.toString());
}

function RemoveData(ddlistId)
{
	Data.delete(ddlistId);
	SelectedItems.delete(ddlistId);
}

DropDownListStore.dispatchToken=Dispatcher.register(function(action)
	{
		switch(action.type)
		{
			case ActionTypes.C_DROPDOWNLIST_GET_DATA:
				SetData(action.ddlistId, action.data);
				DropDownListStore.emitListChange(action.ddlistId);
				break;
			case ActionTypes.C_DROPDOWNLIST_SELECT_ITEM:
				SetSelectedItem(action.ddlistId, action.key);
				DropDownListStore.emitListSelect(action.ddlistId);
				break;
			case ActionTypes.C_DROPDOWNLIST_DESTROY:
				RemoveData(action.ddlistId);
				break;
			default:
				break;
		}
	}
);

export default DropDownListStore;