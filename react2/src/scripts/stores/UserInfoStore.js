"use strict";

import {EventEmitter} from "events";

import Dispatcher from "../dispatcher/Dispatcher";
import {ActionTypes} from "../constants/Constants";

const CHANGE_EVENT="change";

let Data={};

let UserInfoStore=Object.assign({}, EventEmitter.prototype, {
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
	get:function(){
		return Data;
	}
});

UserInfoStore.dispatchToken=Dispatcher.register(function(action)
	{
		switch(action.type)
		{
			case ActionTypes.C_USERINFO_GET:
				Data=action.data;
				UserInfoStore.emitChange();
				break;
			default:
				break;
		}
	});

export default UserInfoStore;