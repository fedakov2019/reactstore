"use strict";

import $http from "../../common/Ajax";

import Globals from "../../Globals";
const ServerPath=Globals.SERVER_PATH;

import {LogLevel} from "../../common/LogLevel";
import Logger from "../../common/Logger";

import StatusBarIncrLongrunner from "../../actions/StatusBarIncrLongrunner";
import StatusBarDecrLongrunner from "../../actions/StatusBarDecrLongrunner";

function sendFlkProtocol(idFile)
{
    StatusBarIncrLongrunner.incrLongrunner();
	return $http(ServerPath+"/OutputStream/OutFileOps/SendFlkToTer/"+idFile)
	.post()
	.then(data=>{
	    StatusBarDecrLongrunner.decrLongrunner();
		return data;
	})
	.catch(err=>{
        Logger.log("OutFileApiUtils sendFlkProtocol "+idFile, LogLevel.Error, {err:err});
	    StatusBarDecrLongrunner.decrLongrunner();
        return "Запрос был отклонён сервером (" + idFile+")";
	});
}
export default {
    sendFlkProtocol
};