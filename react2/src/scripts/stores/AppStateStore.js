"use strict";

import {EventEmitter} from "events";

import Dispatcher from "../dispatcher/Dispatcher";

import {ActionTypes} from "../constants/Constants";

const CHANGE_EVENT="change"; //if collection changed. 
//const MOVE_EVENT='move'; //if any movement trough collection

let Data=[];
let ActiveIndex=-1;
let MaxLength=20;

let AppStateStore=Object.assign({}, EventEmitter.prototype, {
	emitChange:function()
	{
		this.emit(CHANGE_EVENT);
	},
	addChangeListener:function(callback)
	{
		this.on(CHANGE_EVENT, callback);
	},
	removeChangeListener:function(callback) {
	    this.removeListener(CHANGE_EVENT, callback);
	},
	/*emitMove:function()
	{
		this.emit(MOVE_EVENT);
	},
	addMoveListener:function(callback)
	{
		this.on(MOVE_EVENT, callback);
	},
	removeMoveListener:function(callback) {
	    this.removeListener(MOVE_EVENT, callback);
	},*/
	hasLeft:function()
	{
		return ActiveIndex>0;
	},
	hasRight:function()
	{
		return ActiveIndex<Data.length-1;
	},
	getCurrent:function()
	{
	    return Data[ActiveIndex];
	},
	getLeft:function()
	{
		if (ActiveIndex>0)
		{
			return Data[ActiveIndex-1];
		}
		return null;
	},
	getRight:function()
	{
		if(ActiveIndex+1<MaxLength)
		{
			return Data[ActiveIndex+1];
		}
		return null;
	},
	getAllData:function()
	{
		return Data;
	},
	getActiveIndex:function()
	{
		return ActiveIndex;
	}
});

function Add(commandName, activeItemName, initials)
{
	//remove rigth elems, i.e. 'ex-future'
	Data.splice(ActiveIndex+1);
    //create Present
	if (activeItemName == undefined || activeItemName == null || activeItemName == "") {
	    activeItemName = commandName;
	}
    Data.push({ command: commandName, activeItemName: activeItemName , initials:initials});
    //ActiveIndex++;
    ActiveIndex = Data.length-1;
	//cut history, if it's too long
	if (ActiveIndex+1>=MaxLength)
	{
	    Data=Data.splice(0, ActiveIndex-MaxLength+1);
	    //ActiveIndex=MaxLength-1;
	    ActiveIndex = Data.length-1;
	}
};

function GoLeft()
{
	if (AppStateStore.hasLeft())
	{
		ActiveIndex--;
		return true;
	}
	return false;
};

function GoRight()
{
	if (AppStateStore.hasRight())
	{
		ActiveIndex++;
		return true;
	}
	return false;
};

function SetState(obj)
{
	Data[ActiveIndex].initials=obj;
};

AppStateStore.dispatchToken=Dispatcher.register(function(action)
	{
		switch(action.type)
		{
			case ActionTypes.I_APPSTATE_ADD:
			    Add(action.commandName, action.activeItemName, action.initials);
			    AppStateStore.emitChange();
			    //AppStateStore.emitMove();
				break;
			case ActionTypes.I_APPSTATE_GO_LEFT:
				if(GoLeft())
				{
				    AppStateStore.emitChange();
					//AppStateStore.emitMove();
				}
				break;
			case ActionTypes.I_APPSTATE_GO_RIGHT:
				if (GoRight())
				{
				    AppStateStore.emitChange();
					//AppStateStore.emitMove();
				}
				break;
			case ActionTypes.I_APPSTATE_SETUP:
				Data=action.data;
				ActiveIndex = Number.parseInt(action.activeIndex);
				AppStateStore.emitChange();
				//AppStateStore.emitMove();
				break;
			case ActionTypes.I_APPSTATE_SET_STATE:
				SetState(action.state);
				break;
			case ActionTypes.I_APPSTATE_SAVE_LOCAL:
				break;
			default:
				break;
		}
	});

export default AppStateStore;