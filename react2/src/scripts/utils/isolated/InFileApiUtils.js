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
	return $http(ServerPath+"/InputStream/InFileOps/SendFlkToTer/"+idFile)
	.post()
	.then(data=>{
	    StatusBarDecrLongrunner.decrLongrunner();
		return data;
	})
	.catch(err=>{
        Logger.log("InFileApiUtils sendFlkProtocol "+idFile, LogLevel.Error, {err:err});
	    StatusBarDecrLongrunner.decrLongrunner();
        return "Запрос был отклонён сервером (" + idFile+")";
	});
}

function removeFile(idFile, comment)
{
    StatusBarIncrLongrunner.incrLongrunner();
	return $http(ServerPath+"/InputStream/InFileOps/RemoveFile/"+idFile)
	.post(comment)
	.then(data=>{
	    StatusBarDecrLongrunner.decrLongrunner();
		return data;
	},
	err=>{
        Logger.log("InFileApiUtils removeFile "+idFile, LogLevel.Error, {err:err});
	    StatusBarDecrLongrunner.decrLongrunner();
		return "Запрос был отклонён сервером ("+idFile+")";
	});
}

export default {
    sendFlkProtocol,
    removeFile
};