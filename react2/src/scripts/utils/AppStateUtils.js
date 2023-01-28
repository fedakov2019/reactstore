"use strict";

export default{
	setup:function()
	{
		let _data=localStorage.getItem("AppStateStore_Data");
		let ActiveIndex=localStorage.getItem("AppStateStore_ActiveIndex");
		let _Data=null;
		if (!_data||_data==""||_data=="[]")
		{
			_Data=[];
			ActiveIndex=-1;
		}
		else
		{
			_Data=JSON.parse(_data);
			if (ActiveIndex==null||ActiveIndex<0||ActiveIndex>=_Data.length)
			{
				ActiveIndex=_Data.length-1;
			}
		}
		return {
			Data:_Data,
			ActiveIndex:ActiveIndex
		};
	},
	saveLocal:function(Data, ActiveIndex)
	{
		localStorage.setItem("AppStateStore_Data",JSON.stringify(Data));
		localStorage.setItem("AppStateStore_ActiveIndex", ActiveIndex);
	}
};