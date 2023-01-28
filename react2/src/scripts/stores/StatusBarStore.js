"use strict";

import {EventEmitter} from "events";

import Dispatcher from "../dispatcher/Dispatcher";
import {ActionTypes} from "../constants/Constants";

const CHANGE_LONGRUNNER_EVENT="change_longrunning";

let LongrunnersCounter=0;

let StatusBarStore=Object.assign({}, EventEmitter.prototype, {
	emitLongrunnerChange:function()
	{
		this.emit(CHANGE_LONGRUNNER_EVENT);
	},
	addLongrunnerChange:function(callback)
	{
		this.on(CHANGE_LONGRUNNER_EVENT, callback);
	},
	removeLongrunnerChange:function(callback)
	{
		this.removeListener(CHANGE_LONGRUNNER_EVENT, callback);
	},
	hasLongRunners:function()
	{
		return LongrunnersCounter>0;
	}
});

function IncrLongrunner()
{
	LongrunnersCounter++;	
}

function DecrLongrunner()
{
	LongrunnersCounter--;
}

StatusBarStore.dispatchToken=Dispatcher.register(function(action)
	{
		switch (action.type)
		{
			case ActionTypes.I_STATUSBAR_INCR_LONGRUNNER:
				IncrLongrunner();
				if (LongrunnersCounter==1)
				{
					StatusBarStore.emitLongrunnerChange();
				}
				break;
			case ActionTypes.I_STATUSBAR_DECR_LONGRUNNER:
				DecrLongrunner();
				if (LongrunnersCounter==0)
				{
					StatusBarStore.emitLongrunnerChange();
				}
				break;
			default:
				break;
		}
	});

export default StatusBarStore;