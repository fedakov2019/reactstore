"use strict";

import Dispatcher from "../dispatcher/Dispatcher";

import {ActionTypes} from "../constants/Constants";

let CaseIds=[];

let RejectSelectorStore=Object.assign({}, {
	getIds:function()
	{
		return CaseIds;
	}
});

RejectSelectorStore.dispatchToken=Dispatcher.register(function(action)
	{
		switch(action.type)
		{
			case ActionTypes.IN_REJECT_SELECTOR_SET_IDS:
				CaseIds=action.caseIds;
				break;
			default:
				break;
		}
	});

export default RejectSelectorStore;