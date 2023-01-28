"use strict";

import $http from "../../common/Ajax";

import Globals from "../../Globals";
const ServerPath=Globals.SERVER_PATH;

import {LogLevel} from "../../common/LogLevel";
import Logger from "../../common/Logger";


function acceptRegistry(idRegistry)
{
	return $http(ServerPath+"/InputStream/InRegistryOps/InAcceptRegistry/"+idRegistry)
	.post()
	.then(data=>{
		return data;
	})
	.catch(err=>{
		Logger.log("InRegistryApiUtils acceptRegistry "+idRegistry, LogLevel.Error, {err:err});
		return "Запрос был отклонён сервером ("+idRegistry+")";
	});
}

function repeatMek(idRegistry)
{
	return $http(ServerPath+"/InputStream/InRegistryOps/InRepeatMek/"+idRegistry)
	.post()
	.then(data=>{
		return data;
	})
	.catch(err=>{
		Logger.log("InRegistryApiUtils repeatMek "+idRegistry, LogLevel.Error, {err:err});
		return "Запрос был отклонён сервером ("+idRegistry+")";
	});
}

function addOrderMtr(idRegistry, orderDate)
{
	return $http(ServerPath+"/InputStream/InRegistryOps/InAddPaymentOrderMtr/"+idRegistry)
	.post({date:orderDate})
	.then(data=>{
		return data;
	})
	.catch(err=>{
		Logger.log("InRegistryApiUtils InAddPaymentOrderMtr "+idRegistry, LogLevel.Error, {err:err});
		return "Запрос был отклонён сервером ("+idRegistry+")";
	});
}

function removeOrderMtr(idRegistry)
{
	return $http(ServerPath+"/InputStream/InRegistryOps/InRemovePaymentOrderMtr/"+idRegistry)
	.post()
	.then(data=>{
		return data;
	})
	.catch(err=>{
		Logger.log("InRegistryApiUtils InRemovePaymentOrderMtr "+idRegistry, LogLevel.Error, {err:err});
		return "Запрос был отклонён сервером ("+idRegistry+")";
	});
}

function addOrderBuh(idRegistry, orderDate, orderNumber)
{
	return $http(ServerPath+"/InputStream/InRegistryOps/InAddPaymentOrderBuh/"+idRegistry)
	.post({date:orderDate, number:orderNumber})
	.then(data=>{
		return data;
	})
	.catch(err=>{
		Logger.log("InRegistryApiUtils InAddPaymentOrderBuh "+idRegistry, LogLevel.Error, {err:err});
		return "Запрос был отклонён сервером ("+idRegistry+")";
	});
}

function removeOrderBuh(idRegistry)
{
	return $http(ServerPath+"/InputStream/InRegistryOps/InRemovePaymentOrderBuh/"+idRegistry)
	.post()
	.then(data=>{
		return data;
	})
	.catch(err=>{
		Logger.log("InRegistryApiUtils InRemovePaymentOrderBuh "+idRegistry, LogLevel.Error, {err:err});
		return "Запрос был отклонён сервером ("+idRegistry+")";
	});
}

function sendMekProtocol(idRegistry)
{
	return $http(ServerPath+"/InputStream/InRegistryOps/InSendMekProtocol/"+idRegistry)
	.post()
	.then(data=>{
		return data;
	})
	.catch(err=>{
		Logger.log("InRegistryApiUtils InSendMekProtocol "+idRegistry, LogLevel.Error, {err:err});
		return "Запрос был отклонён сервером ("+idRegistry+")";
	});
}

function getRegShortInfo(idRegistry)
{
	return $http(ServerPath+"/InputStream/InRegistryOps/InGetShortInfo/"+idRegistry)
	.post()
	.then(data=>{
		return data;
	})
	.catch(err=>{
		Logger.log("InRegistryApiUtils InGetShortInfo "+idRegistry, LogLevel.Error, {err:err});
		return "Запрос был отклонён сервером ("+idRegistry+")";
	});	
}

function addRegistrationDate(idRegistry)
{
	return $http(ServerPath+"/InputStream/InRegistryOps/InAddRegistrationDate/"+idRegistry)
	.post()
	.then(data=>{
		return data;
	})
	.catch(err=>{
		Logger.log("InRegistryApiUtils addRegistrationDate "+idRegistry, LogLevel.Error, {err:err});
		return "Запрос был отклонён сервером ("+idRegistry+")";
	});
}

function updateRegistrationDate(idRegistry, registrationDate)
{
	return $http(ServerPath+"/InputStream/InRegistryOps/InUpdateRegistrationDate/"+idRegistry)
	.post(registrationDate)
	.then(data=>{
		return data;
	})
	.catch(err=>{
		Logger.log("InRegistryApiUtils updateRegistrationDate "+idRegistry, LogLevel.Error, {err:err});
		return "Запрос был отклонён сервером ("+idRegistry+")";
	});
}

function addPaymentOrder(tfCode, number, date, sum) {
    return $http(ServerPath + "/InputStream/InRegistryOps/InAddPayOrder/")
        .post({ name:tfCode, number, date, sum})
        .then(data => {
            return data;
        })
        .catch(err => {
            Logger.log("InRegistryApiUtils addPaymentOrder " + { tfCode, number, date, sum}, LogLevel.Error, { err: err });
            return "Запрос был отклонён сервером (" + { tfCode, number, date, sum} + ")";
        }); 
    
}

function addRegistryToPaymentOrder(idOrder, idRegistry) {
    return $http(ServerPath + "/InputStream/InRegistryOps/InAddRegistryToPayOrder/")
        .post({ idOrder, idRegistry})
        .then(data => {
            return data;
        })
        .catch(err => {
            Logger.log("InRegistryApiUtils addRegistryToPaymentOrder " + { idOrder, idRegistry}, LogLevel.Error, { err: err });
            return "Запрос был отклонён сервером (" + { idOrder, idRegistry} + ")";
        }); 
}

function removeRegistryFromPaymentOrder(idRegistry) {
    return $http(`${ServerPath}InputStream/InRegistryOps/InRemoveRegistryFromPayOrder/${idRegistry}`)
        .post()
        .then(data => {
            return data;
        })
        .catch(err => {
            Logger.log("InRegistryApiUtils removeRegistryFromPaymentOrder " + idRegistry, LogLevel.Error, { err: err });
            return "Запрос был отклонён сервером (" + idRegistry + ")";
        }); 
}

function signPayment(idOrder) {
    return $http(`${ServerPath}InputStream/InRegistryOps/InSignPayOrder/${idOrder}`)
        .post()
        .then(data => {
            return data;
        })
        .catch(err => {
            Logger.log("InRegistryApiUtils signPayment " + idOrder, LogLevel.Error, { err: err });
            return "Запрос был отклонён сервером (" + idOrder + ")";
        }); 
}

function unsignPayment(idOrder) {
    return $http(`${ServerPath}InputStream/InRegistryOps/InUnsignPayOrder/${idOrder}`)
        .post()
        .then(data => {
            return data;
        })
        .catch(err => {
            Logger.log("InRegistryApiUtils unsignPayment " + idOrder, LogLevel.Error, { err: err });
            return "Запрос был отклонён сервером (" + idOrder + ")";
        });
}

function sendPayment(idOrder) {
    return $http(`${ServerPath}InputStream/InRegistryOps/InSendPayOrder/${idOrder}`)
        .post()
        .then(data => {
            return data;
        })
        .catch(err => {
            Logger.log("InRegistryApiUtils sendPayment " + idOrder, LogLevel.Error, { err: err });
            return "Запрос был отклонён сервером (" + idOrder + ")";
        });
}

function removePayment(idOrder) {
    return $http(`${ServerPath}InputStream/InRegistryOps/InRemovePayOrder/${idOrder}`)
        .post()
        .then(data => {
            return data;
        })
        .catch(err => {
            Logger.log("InRegistryApiUtils removePayment " + idOrder, LogLevel.Error, { err: err });
            return "Запрос был отклонён сервером (" + idOrder + ")";
        });
}

function importFromParus(dateBegin, dateEnd) {
    return $http(`${ServerPath}InputStream/InRegistryOps/InRegistryPullPaymentOrderBuhParusAsync`)
        .post({dateBegin, dateEnd})
        .then(data => {
            return data;
        })
        .catch(err => {
            Logger.log("InRegistryApiUtils pullPayOrders " + {dateBegin, dateEnd}, LogLevel.Error, { err: err });
            return "Запрос был отклонён сервером (" + dateBegin + " - " + dateEnd + ")";
        });
}

function sendPaymentPack(dateBegin, dateEnd) {
    return $http(`${ServerPath}InputStream/InRegistryOps/InSendPayOrderPack`)
        .post({ dateBegin, dateEnd })
        .then(data => {
            return data;
        })
        .catch(err => {
            Logger.log("InRegistryApiUtils sendPaymentPack " + { dateBegin, dateEnd }, LogLevel.Error, { err: err });
            return "Запрос был отклонён сервером (" + dateBegin + " - " + dateEnd + ")";
        });
}

export default {
	acceptRegistry,
	repeatMek,
	addOrderMtr,
	removeOrderMtr,
	addOrderBuh,
	removeOrderBuh,
	sendMekProtocol,
	getRegShortInfo,
	addRegistrationDate,
    updateRegistrationDate,
    addPaymentOrder,
    addRegistryToPaymentOrder,
    removeRegistryFromPaymentOrder,
    signPayment,
    unsignPayment,
    sendPayment,
    removePayment,
    importFromParus,
	sendPaymentPack
};