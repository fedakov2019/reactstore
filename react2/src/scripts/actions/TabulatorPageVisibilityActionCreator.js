'use strict';

let Dispatcher=require('../dispatcher/Dispatcher');
let ActionTypes=require('../constants/Constants').ActionTypes;

module.exports={
	setVisibility:function(tabulatorId, tabId, isVisible)
	{
		Dispatcher.dispatch({
			type:ActionTypes.C_TABULATOR_PAGE_VISIBLE,
			tabulatorId:tabulatorId, 
			tabId:tabId,
			isVisible:isVisible
		});
	}
};