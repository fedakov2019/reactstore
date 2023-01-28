"use strict"

import {EventEmitter} from "events";

import Dispatcher from "../dispatcher/Dispatcher";

import {ActionTypes} from "../constants/Constants";

const RRZ_SEARCH_PARAMS_CHANGED_EVENT="rrz_search_params_changed";

let Params={};

let IdentificationRrzStore=Object.assign({}, EventEmitter.prototype, {
	emitSearchParamsChanged:function()
	{
		this.emit(RRZ_SEARCH_PARAMS_CHANGED_EVENT);
	},
	addSearchParamsChangedListener:function(callback)
	{
		this.on(RRZ_SEARCH_PARAMS_CHANGED_EVENT, callback);
	},
	removeSearchParamsChangedListener:function(callback)
	{
		this.removeListener(RRZ_SEARCH_PARAMS_CHANGED_EVENT, callback);
	},
	getParams:function()
	{
		return Object.assign({}, Params);
	}
});

IdentificationRrzStore.dispatchTocken=Dispatcher.register(function(action){
	switch (action.type)
	{
		case ActionTypes.RRZ_SET_SEARCH_PARAMS:
			Params=action.params;
			IdentificationRrzStore.emitSearchParamsChanged();
			break;
		default:
			break;
	}
});

export default IdentificationRrzStore;