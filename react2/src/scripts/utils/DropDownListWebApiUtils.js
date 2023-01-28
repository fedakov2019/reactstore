"use strict";

import $http from "../common/Ajax";

import Globals from "../Globals";
const ServerPath=Globals.SERVER_PATH;

import {LogLevel} from "../common/LogLevel";
import Logger from "../common/Logger";

import StatusBarIncrLongrunner from "../actions/StatusBarIncrLongrunner";
import StatusBarDecrLongrunner from "../actions/StatusBarDecrLongrunner";

import DropDownListGetDataEndActionCreator from "../actions/DropDownListGetDataEndActionCreator";

export default {
	getData:function(ddlistId, controllerName)
	{
		StatusBarIncrLongrunner.incrLongrunner();
		$http(ServerPath+controllerName+"/GetList")
		.get()
		.then(data=>{
			DropDownListGetDataEndActionCreator.getDataEnd(ddlistId, data);
			StatusBarDecrLongrunner.decrLongrunner();
		})
		.catch(err=>{
			DropDownListGetDataEndActionCreator.getDataEnd(ddlistId, []);							
			Logger.log("DropDownListWebApiUtils getData "+ddlistId, LogLevel.Error, {err:err});
			StatusBarDecrLongrunner.decrLongrunner();
		});
	}
};