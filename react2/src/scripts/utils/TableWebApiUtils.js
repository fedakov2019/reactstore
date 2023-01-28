"use strict";

import $http from "../common/Ajax";

import Globals from "../Globals";
const ServerPath=Globals.SERVER_PATH;

import {LogLevel} from "../common/LogLevel";
import Logger from "../common/Logger";

import StatusBarIncrLongrunner from "../actions/StatusBarIncrLongrunner";
import StatusBarDecrLongrunner from "../actions/StatusBarDecrLongrunner";

import TableGetDataEndActionCreator from "../actions/TableGetDataEndActionCreator";
import TableGetItemByIdEndActionCreator from "../actions/TableGetItemByIdEndActionCreator";
import TableSettingsIdSyncActionCreator from "../actions/TableSettingsIdSyncActionCreator";


export default {
	getData:function(tableId, controllerName)
	{
		//TableGetDataEndActionCreator.getDataEnd(tableId, {data:[], headers:[], settings:null})
		StatusBarIncrLongrunner.incrLongrunner();
		$http(ServerPath+controllerName+"/GetItemCount").get().then(count=>{
			let itemsPerPage=1000;
			let n=count%itemsPerPage;
			n=(n>0)?(count-n)/itemsPerPage+1:count/itemsPerPage;
			n = n === 0 ? 1 : n;
			let all={
				data:[],
				headers:[],
				settings:null
			};
			let arr=[];
			for(let i=0;i<n;i++)
			{
				arr.push($http(ServerPath+controllerName+"/GetData/"+i+"/"+itemsPerPage+"/"+tableId)
					.get()
					.then(data=>{
						Array.prototype.push.apply(all.data, data.data);
						all.headers=data.headers;
						all.settings=data.settings;
						data=undefined;
					})
					.catch(err=>{
						Materialize.toast("При загрузке данных возникла ошибка, обновите страницу");
						Logger.log("TableWebApiUtils getData "+tableId, LogLevel.Error, {err:err});
					})
				)
			}
			Promise.all(arr)
			.then(data=>{
				StatusBarDecrLongrunner.decrLongrunner();
				TableGetDataEndActionCreator.getDataEnd(tableId, all);
			}).catch(data=>{
				Logger.log("TableWebApiUtils getDataAll "+tableId, LogLevel.Error, {err:data});
				StatusBarDecrLongrunner.decrLongrunner();
				TableGetDataEndActionCreator.getDataEnd(tableId, {data:[], headers:[], settings:null});				
			});		
		}).catch(data=>{
			Logger.log("TableWebApiUtils GetItemCount "+tableId, LogLevel.Error, {xhr:data, text:data.statusText, err:data.responseText});
			StatusBarDecrLongrunner.decrLongrunner();
			TableGetDataEndActionCreator.getDataEnd(tableId, null);
		});
	},
	getDataConditional:function(tableId, controllerName, conditionObj)
	{
		//TableGetDataEndActionCreator.getDataEnd(tableId, {data:[], headers:[], settings:null})
		StatusBarIncrLongrunner.incrLongrunner();
		$http(ServerPath+controllerName+"/GetItemCount").post(conditionObj).then(count=>{
			let itemsPerPage=1000;
			let n=count%itemsPerPage;
			n=(n>0)?(count-n)/itemsPerPage+1:count/itemsPerPage;
		    n = n === 0 ? 1 : n;
			let all={
				data:[],
				headers:[],
				settings:null
			};
			let arr=[];
		    for(let i=0;i<n;i++)
			{
				arr.push($http(ServerPath+controllerName+"/GetData/"+i+"/"+itemsPerPage+"/"+tableId)
					.post(conditionObj)
					.then(data=>{
						Array.prototype.push.apply(all.data, data.data);
						all.headers=data.headers;
						all.settings=data.settings;
						data=undefined;
					})
					.catch(err=>{
						Logger.log("TableWebApiUtils getDataConditional "+tableId, LogLevel.Error, {err:err});
					})
				)
			}
			Promise.all(arr)
			.then(data=>{
				StatusBarDecrLongrunner.decrLongrunner();
				TableGetDataEndActionCreator.getDataEnd(tableId, all);
			}).catch(data=>{
				Logger.log("TableWebApiUtils getDataAll "+tableId, LogLevel.Error, {err:data});
				StatusBarDecrLongrunner.decrLongrunner();
				TableGetDataEndActionCreator.getDataEnd(tableId, {data:[], headers:[], settings:null});				
			});		
		}).catch(data=>{
			Logger.log("TableWebApiUtils GetItemCountConditional "+tableId, LogLevel.Error, {xhr:data, text:data.statusText, err:data.responseText});
			StatusBarDecrLongrunner.decrLongrunner();
			TableGetDataEndActionCreator.getDataEnd(tableId, null);
		});
	},
	getDataUntilEmpty:function(tableId, controllerName)
	{
		//TableGetDataEndActionCreator.getDataEnd(tableId, {data:[], headers:[], settings:null})
		StatusBarIncrLongrunner.incrLongrunner();

		let all={
			data:[],
			headers:[],
			settings:null
		};
		let itemsPerPage=1000;

		let getPortion=function(tableId, controllerName, pageNumber)
		{
			$http(ServerPath+controllerName+"/GetData/"+pageNumber+"/"+itemsPerPage+"/"+tableId)
			.get()
			.then(data=>{
				if (data.data.length>0)
				{
					Array.prototype.push.apply(all.data, data.data);
				}
				all.headers=data.headers;
				all.settings=data.settings;					
				if (data.data.length==itemsPerPage)
				{
					getPortion(tableId, controllerName, pageNumber+1);
				}
				else
				{
					StatusBarDecrLongrunner.decrLongrunner();
					TableGetDataEndActionCreator.getDataEnd(tableId, all);
				}
				data=undefined;
			})
			.catch(err=>{
				Logger.log("TableWebApiUtils getData "+tableId, LogLevel.Error, {err:err});
				StatusBarDecrLongrunner.decrLongrunner();
				TableGetDataEndActionCreator.getDataEnd(tableId, {data:[], headers:[], settings:null});
			});
		}

		getPortion(tableId, controllerName, 0);		
	},
	getDataUntilEmptyConditional:function(tableId, controllerName, conditionObj)
	{
		//TableGetDataEndActionCreator.getDataEnd(tableId, {data:[], headers:[], settings:null})
		StatusBarIncrLongrunner.incrLongrunner();

		let all={
			data:[],
			headers:[],
			settings:null
		};
		let itemsPerPage=1000;

		let getPortion=function(tableId, controllerName, pageNumber)
		{
			$http(ServerPath+controllerName+"/GetData/"+pageNumber+"/"+itemsPerPage+"/"+tableId)
			.post(conditionObj)
			.then(data=>{
				if (data.data.length>0)
				{
					Array.prototype.push.apply(all.data, data.data);
				}
				all.headers=data.headers;
				all.settings=data.settings;					
				if (data.data.length==itemsPerPage)
				{
					getPortion(tableId, controllerName, pageNumber+1);
				}
				else
				{
					StatusBarDecrLongrunner.decrLongrunner();
					TableGetDataEndActionCreator.getDataEnd(tableId, all);
				}
				data=undefined;
			})
			.catch(err=>{
				Logger.log("TableWebApiUtils getData "+tableId, LogLevel.Error, {err:err});
				StatusBarDecrLongrunner.decrLongrunner();
				TableGetDataEndActionCreator.getDataEnd(tableId, {data:[], headers:[], settings:null});
			});
		}

		getPortion(tableId, controllerName, 0);		
	},
	getItemById:function(tableId, controllerName, itemId)
	{
		StatusBarIncrLongrunner.incrLongrunner();
		$http(ServerPath+controllerName+"/GetItemById/"+itemId)
			.get()
			.then(data=>{
				StatusBarDecrLongrunner.decrLongrunner();
				TableGetItemByIdEndActionCreator.getItemByIdEnd(tableId, itemId, data);
			})
			.catch(data=>{
				Logger.log("TableWebApiUtils GetItemById "+tableId, LogLevel.Error, {xhr:data, text:data.statusText, err:data.responseText});
				StatusBarDecrLongrunner.decrLongrunner();				
			});
	},
	saveSettings:function(tableId, columnSettings, id)
	{
		let obj={
			tableId:tableId,
			columnSettings:columnSettings,
			id:id
		};
		StatusBarIncrLongrunner.incrLongrunner();
		$http(ServerPath+"Interior/PostUserTableSettings")
		.post(obj)
		.then(data=>{
			TableSettingsIdSyncActionCreator.sync(tableId, data);
			StatusBarDecrLongrunner.decrLongrunner();
		}/*.bind(this)*/)
		.catch(err=>{
			StatusBarDecrLongrunner.decrLongrunner();
			Logger.log("SaveTableSettings _onClick "+tableId, LogLevel.Error, {err:err});
		});
	}
};