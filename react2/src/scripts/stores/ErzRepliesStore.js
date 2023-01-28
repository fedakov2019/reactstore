"use strict";

import {EventEmitter} from "events";

import Dispatcher from "../dispatcher/Dispatcher";

import  {ActionTypes} from "../constants/Constants";

const ERZ_REPLIES_SHOW_EVENT="erz_replies_show_event";

let RecordId=-1;

let ErzRepliesStore=Object.assign({}, EventEmitter.prototype, {
	emitShowEvent:function()
	{
		this.emit(ERZ_REPLIES_SHOW_EVENT);
	},
	addShowListener:function(callback)
	{
		this.on(ERZ_REPLIES_SHOW_EVENT, callback);
	},
	removeShowListener:function(callback)
	{
		this.removeListener(ERZ_REPLIES_SHOW_EVENT, callback);
	},
	getRecordId:function()
	{
		return RecordId;
	}
});

ErzRepliesStore.dispatchToken=Dispatcher.register(action=>{
	switch(action.type)
	{
		case ActionTypes.ERZ_ERZ_REPLIES_SHOW:
			RecordId=action.recordId;
			ErzRepliesStore.emitShowEvent();
			break;
		default:
			break;
	}
});

export default ErzRepliesStore;