"use strict";

import {EventEmitter} from "events";

import Dispatcher from "../dispatcher/Dispatcher";
import {ActionTypes} from "../constants/Constants";

const CHANGE_COLOR_EVENT="change_color";
const CHANGE_TABLE_EVENT="change_table";

let ColorSettings=[];
let TableSettings=[];

import UserSettingsSetActionCreator from "../actions/UserSettingsSetActionCreator";

let UserSettingsStore=Object.assign({}, EventEmitter.prototype, {
	emitChangeColor:function()
	{
		this.emit(CHANGE_COLOR_EVENT);
	},
	addChangeColorListener:function(callback)
	{
		this.on(CHANGE_COLOR_EVENT, callback);
	},
	removeChangeColorListener:function(callback)
	{
		this.removeListener(CHANGE_COLOR_EVENT, callback);
	},
	emitChangeTable:function()
	{
		this.emit(CHANGE_TABLE_EVENT);
	},
	addChangeTableListener:function(callback)
	{
		this.on(CHANGE_TABLE_EVENT, callback);
	},
	removeChangTableeListener:function(callback)
	{
		this.removeListener(CHANGE_TABLE_EVENT, callback);
	},
	getColorSettings:function()
	{
		return ColorSettings;
	},
	setNewColorSettings:function(id, newColor)
	{
		for(let i=0; i< ColorSettings.length;i++)
		{
			if (ColorSettings[i].id==id)
			{
				ColorSettings[i].newColor=newColor;
				break;
			}
		}
	},
	getTableSettings:function(tableName)
	{
		return TableSettings.filter(function(item){return item.target==tableName;});
	},
	getChangedColorSettings:function()
	{
		let rslt=[];
		for (let i=0;i<ColorSettings.length;i++)
		{
			if (ColorSettings[i].newColor
				&&ColorSettings[i].newColor!=ColorSettings[i].color)
			{
				let newColor=Object.assign({}, ColorSettings[i]);
				newColor.color=newColor.newColor;
				delete newColor.newColor;
				rslt.push(newColor);
			}
		}
		return rslt;
	}
});

function AcceptChangedColors()
{
	for (let i=0;i<ColorSettings.length;i++)
	{
		if (ColorSettings[i].newColor
			&&ColorSettings[i].newColor!=ColorSettings[i].color)
		{
			ColorSettings[i].color=ColorSettings[i].newColor;
			delete ColorSettings[i].newColor;
		}
	}
}

UserSettingsStore.dispatchToken=Dispatcher.register(function(action)
	{
		switch (action.type)
		{
			case ActionTypes.C_USER_SETTINGS_COLOR_GET:
				ColorSettings=action.data;
				UserSettingsStore.emitChangeColor();
				break;
			case ActionTypes.C_USER_SETTINGS_TABLE_GET:
				ColorSettings=action.data;
				UserSettingsStore.emitChangeTable();
				break;
			case ActionTypes.C_USER_SETTINGS_COLOR_SET:
				AcceptChangedColors();
				UserSettingsStore.emitChangeColor();
				break;
			case ActionTypes.C_USER_SETTINGS_TABLE_SET:
				UserSettingsSetActionCreator.userSettingsTableSet(action.newValue);
				break;
			default:
				break;
		}
	});

export default UserSettingsStore;
