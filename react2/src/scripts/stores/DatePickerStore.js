"use strict";

import {EventEmitter} from "events";

import Dispatcher from "../dispatcher/Dispatcher";

import {ActionTypes} from "../constants/Constants";

const CHANGE_EVENT="change_";

let Data=new Map();

let DatePickerStore=Object.assign({}, EventEmitter.prototype, {
	emitChange:function(itemId)
	{
		this.emit(CHANGE_EVENT+itemId);
	},
	addChangeListener:function(itemId, callback)
	{
		this.on(CHANGE_EVENT+itemId, callback);
	},
	removeChangeListener:function(itemId, callback)
	{
		this.removeListener(CHANGE_EVENT+itemId, callback);
	},
	getRawValue:function(itemId)
	{
		let data=Data.get(itemId);
		return data;
	},
	getValue:function(itemId)
	{
		let data=Data.get(itemId);
		if (data!=null&&data._isAMomentObject==true)
		{
			return data.format("YYYY-MM-DD");
		}
		return null;
	}
});

function SetValue(itemId, value)
{
	Data.set(itemId, value);
}

function Destroy(itemId)
{
	Data.delete(itemId);
}

DatePickerStore.dispatchToken=Dispatcher.register(action=>{
	switch(action.type)
	{
		case ActionTypes.C_DATE_PICKER_CHANGE:
			SetValue(action.itemId, action.value);
			DatePickerStore.emitChange(action.itemId);
			break;
		case ActionTypes.C_DATE_PICKER_DESTROY:
			Destroy(action.itemId);
			break;			
		default:
			break;
	}
});

export default DatePickerStore;