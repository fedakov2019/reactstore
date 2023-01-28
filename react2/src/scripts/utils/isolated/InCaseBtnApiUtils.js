"use strict";

import  $http from "../../common/Ajax";

import Globals from "../../Globals";
const ServerPath=Globals.SERVER_PATH;

import {LogLevel} from "../../common/LogLevel";
import Logger from "../../common/Logger";

import StatusBarIncrLongrunner from "../../actions/StatusBarIncrLongrunner";
import StatusBarDecrLongrunner from "../../actions/StatusBarDecrLongrunner";

function addRefuseRequest(caseId, refuseIds, comment, partialSum) {
    let rslt = new Promise((resolve, reject) => {
        if (caseId == null || !Array.isArray(refuseIds) || refuseIds.length == 0) {
            return;
        }
        if (refuseIds.length > 1) {
            comment = null;
            partialSum = null;
        }
        StatusBarIncrLongrunner.incrLongrunner();
        let tasks = [];
        for (let refuseId of refuseIds) {
            let opts = {
                comment: comment,
                sum: partialSum
            };
            tasks.push($http(ServerPath + "inputStream/InCaseOps/InAddRefuseRequest/" + caseId + "/" + refuseId)
                .post(opts)
                .then(data => {
                    return data;
                })
                .catch(err => {
                    Logger.log("InCaseBtnApiUtils addRefuseRequest " + caseId, LogLevel.Error, { err: err });
                    return "Запрос был отклонён сервером " + caseId;
                }));
        }
        Promise.all(tasks)
            .then(data => {
                StatusBarDecrLongrunner.decrLongrunner();
                resolve(data);
            })
            .catch(err => {
                StatusBarDecrLongrunner.decrLongrunner();
                reject(err);
            });
    });
    return rslt;
}

function removeRefuseRequest(refuseId) {
    if (refuseId == null) {
        return Promise.reject("Недопустимое значение аргументов");
    }
    StatusBarIncrLongrunner.incrLongrunner();
    let task = $http(ServerPath + "inputStream/InCaseOps/InRemoveRefuseRequest/" + refuseId)
        .post()
        .then(
            data => {
                StatusBarDecrLongrunner.decrLongrunner();
                return data;
            },
            err => {
                StatusBarDecrLongrunner.decrLongrunner();
                Logger.log("InCaseBtnApiUtils removeRefuseRequest " + refuseId, LogLevel.Error, { err: err });
                return "Запрос был отклонён сервером " + refuseId;
            });
    return task;
}

function addRefuse(caseId, refuseIds, comment, partialSum)
{
	let rslt=new Promise((resolve, reject)=>
	{
		if (caseId==null||!Array.isArray(refuseIds)||refuseIds.length==0)
		{
			return;
		}
		if (refuseIds.length>1)
		{
			comment=null;
			partialSum=null;
		}
		StatusBarIncrLongrunner.incrLongrunner();
		let tasks=[];
		for(let refuseId of refuseIds)
		{
			let opts={
				comment:comment, 
				sum:partialSum
			};
			tasks.push($http(ServerPath+"inputStream/InCaseOps/InAddRefuse/"+caseId+"/"+refuseId)
				.post(opts)
				.then(data=>{
					return data;
				})
				.catch(err=>{
					Logger.log("InCaseBtnApiUtils addRefuse "+caseId, LogLevel.Error, {err:err});
					return "Запрос был отклонён сервером "+caseId;
				}));
		}
		Promise.all(tasks)
			.then(data=>{
				StatusBarDecrLongrunner.decrLongrunner();
				resolve(data);
			})
			.catch(err=>{
				StatusBarDecrLongrunner.decrLongrunner();
				reject(err);
			});
	});
	return rslt;
}

function removeRefuse(refuseId)
{
	if (refuseId==null)
	{
		return Promise.reject("Недопустимое значение аргументов");;
	}
	StatusBarIncrLongrunner.incrLongrunner();
	let task=$http(ServerPath+"inputStream/InCaseOps/InRemoveRefuse/"+refuseId)
				.post()
				.then(
					data=>{
						StatusBarDecrLongrunner.decrLongrunner();
						return data;
					},
					err=>{
						StatusBarDecrLongrunner.decrLongrunner();
						Logger.log("InCaseBtnApiUtils removeRefuse "+refuseId, LogLevel.Error, {err:err});
						return "Запрос был отклонён сервером "+refuseId;
					});
	return task;
}

function acceptCase(caseId)
{
	if (caseId==null)
	{
		return Promise.reject("Недопустимое значение аргументов");;
	}
	StatusBarIncrLongrunner.incrLongrunner();
	let task=$http(ServerPath+"inputStream/InCaseOps/InAcceptCase/"+caseId)
				.post()
				.then(
					data=>{
						StatusBarDecrLongrunner.decrLongrunner();
						return data;
					},
					err=>{
						StatusBarDecrLongrunner.decrLongrunner();
						Logger.log("InCaseBtnApiUtils acceptCase "+caseId, LogLevel.Error, {err:err});
						return "Запрос был отклонён сервером "+caseId;
					}
					);
	return task;
}

function undoAcceptCase(caseId)
{
	if (caseId==null)
	{
		return Promise.reject("Недопустимое значение аргументов");;
	}
	StatusBarIncrLongrunner.incrLongrunner();
	let task=$http(ServerPath+"inputStream/InCaseOps/InUndoAcceptCase/"+caseId)
				.post()
				.then(
					data=>{
						StatusBarDecrLongrunner.decrLongrunner();
						return data;
					},
					err=>{
						StatusBarDecrLongrunner.decrLongrunner();
						Logger.log("InCaseBtnApiUtils undoAcceptCase "+caseId, LogLevel.Error, {err:err});
						return "Запрос был отклонён сервером "+caseId;
					}
					);
	return task;
}

function identifyCase(caseId, polisId)
{
	if (caseId==null)
	{
		return Promise.reject("Недопустимое значение аргументов");
	}
	StatusBarIncrLongrunner.incrLongrunner();
	let task=$http(ServerPath+"inputStream/InCaseOps/InSetIdentity/")
				.post({
					caseId:caseId, 
					polisId:polisId
				})
				.then(
					data=>{
						StatusBarDecrLongrunner.decrLongrunner();
						return data;
					},
					err=>{
						StatusBarDecrLongrunner.decrLongrunner();
						Logger.log("InCaseBtnApiUtils identifyCase "+caseId, LogLevel.Error, {err:err});
						return "Запрос был отклонён сервером "+caseId;
					}
					);
	return task;
}

function addRefuseTemplate(refuseId, comment)
{
	if (refuseId==null)
	{
		return Promise.reject("Недопустимое значение аргументов");;
	}
	StatusBarIncrLongrunner.incrLongrunner();
	let task=$http(ServerPath+"inputStream/InUserSankCode/AddUserDefinedRefuse/")
				.post({
					SankId:refuseId,
					UserComment:comment
				})
				.then(
					data=>{
						StatusBarDecrLongrunner.decrLongrunner();
						return data;
					},
					err=>{
						StatusBarDecrLongrunner.decrLongrunner();
						Logger.log("InCaseBtnApiUtils addRefuseTemplate "+refuseId, LogLevel.Error, {err:err});
						return "Запрос на добавление шаблона отказа был отклонён сервером";
					}
					);
	return task;
}

function removeRefuseTemplate(templateId)
{
	if (templateId==null)
	{
		return Promise.reject("Недопустимое значение аргументов");
	}
	StatusBarIncrLongrunner.incrLongrunner();
	let task=$http(ServerPath+"inputStream/InUserSankCode/RemoveUserDefinedRefuse/")
				.post(templateId)
				.then(
					data=>{
						StatusBarDecrLongrunner.decrLongrunner();
						return data;
					},
					err=>{
						StatusBarDecrLongrunner.decrLongrunner();
						Logger.log("InCaseBtnApiUtils removeRefuseTemplate "+templateId, LogLevel.Error, {err:err});
						return "Запрос на удаление шаблона отказа был отклонён сервером";
					}
					);
	return task;
}

function removeRefuseImmunity(refuseId) {
    if (refuseId == null) {
        return Promise.reject("Недопустимое значение аргументов");
    }
    StatusBarIncrLongrunner.incrLongrunner();
    let task = $http(ServerPath + "inputStream/InCaseOps/InRemoveRefuseImmunity/" + refuseId)
        .post()
        .then(
        data => {
            StatusBarDecrLongrunner.decrLongrunner();
            return data;
        },
        err => {
            StatusBarDecrLongrunner.decrLongrunner();
            Logger.log("InCaseBtnApiUtils removeRefuseImmunity " + refuseId, LogLevel.Error, { err: err });
            return "Запрос был отклонён сервером " + refuseId;
        });
    return task;
}

export default {
    addRefuse,
    removeRefuse,
    acceptCase,
    undoAcceptCase,
    identifyCase,
    addRefuseTemplate,
    removeRefuseTemplate,
    removeRefuseImmunity,
    addRefuseRequest,
    removeRefuseRequest
};