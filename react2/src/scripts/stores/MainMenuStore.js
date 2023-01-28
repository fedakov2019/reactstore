"use strict";

import {EventEmitter} from "events";

import Dispatcher from "../dispatcher/Dispatcher";

import {ActionTypes} from "../constants/Constants";

const CHANGE_EVENT="change";

let Data=[];

function ProcessResponse(data)
{
	Data=data;
}

let MainMenuStore=Object.assign({}, EventEmitter.prototype, {
	emitChange:function()
	{
		this.emit(CHANGE_EVENT);
	},
	addChangeListener:function(callback)
	{
		this.on(CHANGE_EVENT, callback);
	},
	removeChangeListener:function(callback)
	{
		this.removeListener(CHANGE_EVENT, callback);
	},
	get:function()
	{
		return Data;
	}
});

MainMenuStore.dispatchToken=Dispatcher.register(function(action)
	{
		switch (action.type)
		{
			case ActionTypes.C_MAINMENU_GET:
				ProcessResponse(action.data);
				MainMenuStore.emitChange();
				break;
			defauDatalt:
				break;
		}
	});

export default MainMenuStore;