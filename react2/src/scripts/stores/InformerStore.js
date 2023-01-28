"use strict";

import {EventEmitter} from "events";

import Dispatcher from "../dispatcher/Dispatcher";

import {ActionTypes} from "../constants/Constants";

const INFORMER_CHANGE_EVENT="table_change_";

let Data={};

let InformerStore=Object.assign({}, EventEmitter.prototype, {
	emitInformerChange:function()
	{
		this.emit(INFORMER_CHANGE_EVENT);
	},
	addInformerChangeListener:function(callback)
	{
		this.on(INFORMER_CHANGE_EVENT, callback);
	},
	removeInformerChangeListener:function(callback)
	{
		this.removeListener(INFORMER_CHANGE_EVENT, callback);
	},
	getText:function()
	{
		if (Data==null||Data.text==undefined||Data.text==null)
		{
			return null;
		}
		return Data.text.toString();
	},
	getData:function()
	{
		return Object.assign({}, Data);
	}
});

InformerStore.dispatchToken=Dispatcher.register(function(action){
	switch(action.type)
	{
		case ActionTypes.C_INFORMER_SET:
			Data=action.obj;
			InformerStore.emitInformerChange();
			break;
		default:
			break;
	}
});

export default InformerStore;