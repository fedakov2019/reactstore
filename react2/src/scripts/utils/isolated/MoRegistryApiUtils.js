"use strict";

import $http from "../../common/Ajax";

import Globals from "../../Globals";
const ServerPath=Globals.SERVER_PATH;

import {LogLevel} from "../../common/LogLevel";
import Logger from "../../common/Logger";


function getRegShortInfo(idRegistry)
{
	return $http(ServerPath+"/MoStream/MoRegistryOps/MoGetShortInfo/"+idRegistry)
	.post()
	.then(data=>{
		return data;
	})
	.catch(err=>{
		Logger.log("MoRegistryApiUtils MoGetShortInfo "+idRegistry, LogLevel.Error, {err:err});
		return "Запрос был отклонён сервером ("+idRegistry+")";
	});	
}

function addOrderMo(medOrg, number, date, sumMo){
    return $http(ServerPath+"/moStream/MoRegistryOps/MoAddPaymentOrderMo/")
	.post({name:medOrg, date:date, number:number, sum:sumMo})
	.then(data=>{
		return data;
	})
	.catch(err=>{
	    Logger.log("MoRegistryApiUtils addMoOrder "+medOrg, LogLevel.Error, {err:err});
	    return "Запрос был отклонён сервером ("+medOrg+")";
	});
}

function addRegistryToOrderMo(idOrder, idRegistry) {
    return $http(ServerPath+"/moStream/MoRegistryOps/MoAddRegistryToOrderMo/")
	.post({idOrder:idOrder, idRegistry:idRegistry})
	.then(data=>{
	    return data;
	})
	.catch(err=>{
	    Logger.log("MoRegistryApiUtils addRegistryToOrderMo "+{idOrder:idOrder, idRegistry:idRegistry}, LogLevel.Error, {err:err});
	    return "Запрос был отклонён сервером ("+idRegistry+")";
	});
}

function removeRegistryFromOrderMo(idRegistry) {
    return $http(ServerPath+"/moStream/MoRegistryOps/MoRemoveRegistryFromOrderMo/"+idRegistry)
	.post()
	.then(data=>{
	    return data;
	})
	.catch(err=>{
	    Logger.log("MoRegistryApiUtils removeRegistryFromOrderMo "+idRegistry, LogLevel.Error, {err:err});
	    return "Запрос был отклонён сервером ("+idRegistry+")";
	});
}

function removeOrderMo(idOrder) {
    return $http(ServerPath+"/moStream/MoRegistryOps/MoRemovePaymentOrderMo/"+idOrder)
	.post()
	.then(data=>{
	    return data;
	})
	.catch(err=>{
	    Logger.log("MoRegistryApiUtils removeOrderMo "+idOrder, LogLevel.Error, {err:err});
	    return "Запрос был отклонён сервером ("+idOrder+")";
	});
}

function addOrderMtr(idOrderMo, date, refunds){
    return $http(ServerPath+"/moStream/MoRegistryOps/MoAddPaymentOrderMtr/")
	.post({id:idOrderMo, date, refundAp:refunds.refundAp, refundDs:refunds.refundDs, refundKs:refunds.refundKs, refundSmp:refunds.refundSmp})
	.then(data=>{
	    return data;
	})
	.catch(err=>{
	    Logger.log("MoRegistryApiUtils addOrderMtr "+idOrderMo, LogLevel.Error, {err:err});
	    return "Запрос был отклонён сервером ("+idOrderMo+")";
	});
}

function removeOrderMtr(idOrder) {
    return $http(ServerPath+"/moStream/MoRegistryOps/MoRemovePaymentOrderMtr/"+idOrder)
	.post()
	.then(data=>{
	    return data;
	})
	.catch(err=>{
	    Logger.log("MoRegistryApiUtils removeOrderMtr "+idOrder, LogLevel.Error, {err:err});
	    return "Запрос был отклонён сервером ("+idOrder+")";
	});
}

function repeatMek(idRegistry) {
    return $http(ServerPath+"/moStream/MoRegistryOps/MoRepeatMek/"+idRegistry)
	.post()
	.then(data=>{
	    return data;
	})
	.catch(err=>{
	    Logger.log("MoRegistryApiUtils repeatMek "+idRegistry, LogLevel.Error, {err:err});
	    return "Запрос был отклонён сервером ("+idRegistry+")";
	});
}

function addRegistryMark(idRegistry) {
    return $http(ServerPath+"/moStream/MoRegistryOps/MoRegistryAddPreviewMark/"+idRegistry)
	.post()
	.then(data=>{
	    return data;
	})
	.catch(err=>{
	    Logger.log("MoRegistryApiUtils addRegistryMark "+idRegistry, LogLevel.Error, {err:err});
	    return "Запрос был отклонён сервером ("+idRegistry+")";
	});
}

function removeRegistryMark(idRegistry) {
    return $http(ServerPath+"/moStream/MoRegistryOps/MoRegistryRemovePreviewMark/"+idRegistry)
	.post()
	.then(data=>{
	    return data;
	})
	.catch(err=>{
	    Logger.log("MoRegistryApiUtils removeRegistryMark "+idRegistry, LogLevel.Error, {err:err});
	    return "Запрос был отклонён сервером ("+idRegistry+")";
	});
}

function sendMekProtocol(idRegistry) {
    return $http(ServerPath + "/moStream/MoRegistryOps/MoSendMekProtocol/" + idRegistry)
        .post()
        .then(data => {
            return data;
        })
        .catch(err => {
            Logger.log("MoRegistryApiUtils MoSendMekProtocol " + idRegistry, LogLevel.Error, { err: err });
            return "Запрос был отклонён сервером (" + idRegistry + ")";
        });
}

function removeRegistry(idRegistry) {
    return $http(ServerPath + "/moStream/MoRegistryOps/MoRemoveRegistry/" + idRegistry)
        .post()
        .then(data => {
            return data;
        })
        .catch(err => {
            Logger.log("MoRegistryApiUtils MoRemoveRegistry " + idRegistry, LogLevel.Error, { err: err });
            return "Запрос был отклонён сервером (" + idRegistry + ")";
        });
}

export default {
	getRegShortInfo,
	addOrderMo,
    addRegistryToOrderMo,
    removeRegistryFromOrderMo,
    removeOrderMo,
    addOrderMtr,
    removeOrderMtr,
    repeatMek,
    addRegistryMark,
    removeRegistryMark,
    sendMekProtocol,
    removeRegistry
};