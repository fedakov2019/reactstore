"use strict";

import {EventEmitter} from "events";

import Dispatcher from "../dispatcher/Dispatcher";

import {ActionTypes} from "../constants/Constants";

const TABULATOR_PAGE_SWITCHED="tabulator_page_switched_";
const TABULATOR_PAGE_CHANGE="tabulator_page_change_";

let Data=new Map();

let TabulatorStore=Object.assign({}, EventEmitter.prototype, {
	emitPageSwitch:function(tabulatorId)
	{
		this.emit(TABULATOR_PAGE_SWITCHED+tabulatorId);
	},
	addPageSwitchListener:function(tabulatorId, callback)
	{
		this.on(TABULATOR_PAGE_SWITCHED+tabulatorId, callback);
	},
	removePageSwitchListener:function(tabulatorId, callback)
	{
		this.removeListener(TABULATOR_PAGE_SWITCHED+tabulatorId, callback);
	},
	emitPageChange:function(tabulatorId)
	{
		this.emit(TABULATOR_PAGE_CHANGE+tabulatorId);
	},
	addPageChangeListener:function(tabulatorId, callback)
	{
		this.on(TABULATOR_PAGE_CHANGE+tabulatorId, callback);
	},
	removePageChangeListener:function(tabulatorId, callback)
	{
		this.removeListener(TABULATOR_PAGE_CHANGE+tabulatorId, callback);
	},
	getActiveTabId:function(tabulatorId)
	{
		let tabulator=Data.get(tabulatorId);
		if (tabulator==null)
		{
			return null;
		}
		return tabulator.activeTabId;
	},
	getCaptionPostfix:function(tabulatorId, tabId)
	{
		let tabulator=Data.get(tabulatorId);
		if (tabulator==null||tabulator.tabs==null)
		{
			return null;
		}
		let tab=tabulator.tabs.get(tabId);
		if (tab==null)
		{
			return null;
		}
		return tab.captionPostfix;
	}
});

function PageSwitch(tabulatorId, tabId)
{
	let tabulator=Data.get(tabulatorId);
	if (tabulator==null)
	{
		tabulator=new Tabulator();
		Data.set(tabulatorId, tabulator);
	}
	tabulator.activeTabId=tabId;
}

function SetCaptionPostfix(tabulatorId, tabId, postfix)
{
	let tabulator=Data.get(tabulatorId);
	if (tabulator==null)
	{
		tabulator=new Tabulator();
		Data.set(tabulatorId, tabulator);
	}
	let tab=tabulator.tabs.get(tabId);
	if (tab==null)
	{
		tab=new Tab();
		tabulator.tabs.set(tabId, tab);
	}
	if (tab.captionPostfix===postfix)
	{
		return false;
	}
	else
	{
		tab.captionPostfix=postfix;
		return true;
	}
}

function Destroy(tabulatorId)
{
	Data.delete(tabulatorId);
}

TabulatorStore.dispatchToken=Dispatcher.register(function(action){
	switch(action.type)
	{
		case ActionTypes.C_TABULATOR_PAGE_SWITCH:
			PageSwitch(action.tabulatorId, action.tabId);
			TabulatorStore.emitPageSwitch(action.tabulatorId);
			break;
		case ActionTypes.C_TABULATOR_PAGE_SET_CAPTION_POSTFIX:
			if (SetCaptionPostfix(action.tabulatorId, action.tabId, action.postfix))
			{
				TabulatorStore.emitPageChange(action.tabulatorId);
			}
			break;
		case ActionTypes.C_TABULATOR_DESTROY:
			Destroy(action.tabulatorId);
			break;
		default:
			break;
	}
});

class Tabulator
{
	constructor()
	{
		this.activeTabId=null;
		this.tabs=new Map();
	}
}

class Tab
{
	constructor()
	{
		this.captionPostfix=null;
	}
}

export default TabulatorStore;