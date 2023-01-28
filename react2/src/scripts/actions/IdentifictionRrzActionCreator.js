'use strict';

let Dispatcher=require('../dispatcher/Dispatcher');
let ActionTypes=require('../constants/Constants').ActionTypes;

module.exports={
	setParams:function(params)
	{
		Dispatcher.dispatch({
			type:ActionTypes.RRZ_SET_SEARCH_PARAMS,
			params:params
		});
	}
};