"use strict";

import  $http from "../../common/Ajax";

import Globals from "../../Globals";
const ServerPath=Globals.SERVER_PATH;

import {LogLevel} from "../../common/LogLevel";
import Logger from "../../common/Logger";

import StatusBarIncrLongrunner from "../../actions/StatusBarIncrLongrunner";
import StatusBarDecrLongrunner from "../../actions/StatusBarDecrLongrunner";

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
			tasks.push($http(ServerPath+"moStream/MoCaseOps/MoAddRefuse/"+caseId+"/"+refuseId)
				.post(opts)
				.then(data=>{
					return data;
				})
				.catch(err=>{
					Logger.log("MoCaseBtnApiUtils addRefuse "+caseId, LogLevel.Error, {err:err});
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
	let task=$http(ServerPath+"moStream/MoCaseOps/MoRemoveRefuse/"+refuseId)
				.post()
				.then(
					data=>{
						StatusBarDecrLongrunner.decrLongrunner();
						return data;
					},
					err=>{
						StatusBarDecrLongrunner.decrLongrunner();
						Logger.log("MoCaseBtnApiUtils removeRefuse "+refuseId, LogLevel.Error, {err:err});
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
	let task=$http(ServerPath+"moStream/MoCaseOps/MoAcceptCase/"+caseId)
				.post()
				.then(
					data=>{
						StatusBarDecrLongrunner.decrLongrunner();
						return data;
					},
					err=>{
						StatusBarDecrLongrunner.decrLongrunner();
						Logger.log("MoCaseBtnApiUtils acceptCase "+caseId, LogLevel.Error, {err:err});
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
	let task=$http(ServerPath+"moStream/MoCaseOps/MoUndoAcceptCase/"+caseId)
				.post()
				.then(
					data=>{
						StatusBarDecrLongrunner.decrLongrunner();
						return data;
					},
					err=>{
						StatusBarDecrLongrunner.decrLongrunner();
						Logger.log("MoCaseBtnApiUtils undoAcceptCase "+caseId, LogLevel.Error, {err:err});
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
	let task=$http(ServerPath+"moStream/MoUserSankCode/AddUserDefinedRefuse/")
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
						Logger.log("MoCaseBtnApiUtils addRefuseTemplate "+refuseId, LogLevel.Error, {err:err});
						return "Запрос на добавление шаблона отказа был отклонён сервером";
					}
					);
	return task;
}

function removeRefuseTemplate(templateId)
{
	if (templateId==null)
	{
		return Promise.reject("Недопустимое значение аргументов");;
	}
	StatusBarIncrLongrunner.incrLongrunner();
	let task=$http(ServerPath+"moStream/MoUserSankCode/RemoveUserDefinedRefuse/")
				.post(templateId)
				.then(
					data=>{
						StatusBarDecrLongrunner.decrLongrunner();
						return data;
					},
					err=>{
						StatusBarDecrLongrunner.decrLongrunner();
						Logger.log("MoCaseBtnApiUtils removeRefuseTemplate "+templateId, LogLevel.Error, {err:err});
						return "Запрос на удаление шаблона отказа был отклонён сервером";
					}
					);
	return task;
}

function updateComment(caseId, comment)
{
    if (caseId==null)
    {
        return Promise.reject("Недопустимое значение аргументов");
    }
    StatusBarIncrLongrunner.incrLongrunner();
    let task=$http(ServerPath+"moStream/MoCaseOps/MoUpdateCommentMtr/"+caseId)
				.post(comment)
				.then(
					data=>{
					    StatusBarDecrLongrunner.decrLongrunner();
					    return data;
					},
					err=>{
					    StatusBarDecrLongrunner.decrLongrunner();
					    Logger.log("MoCaseBtnApiUtils updateComment "+caseId, LogLevel.Error, {err:err});
					    return "Запрос был отклонён сервером "+caseId;
					}
					);
    return task;
}

function switchExportStatus(caseId) {
    if (caseId == null) {
        return Promise.reject("Недопустимое значение аргументов");
    }
    StatusBarIncrLongrunner.incrLongrunner();
    let task = $http(ServerPath + "moStream/MoCaseOps/MoSwitchExportToTerStatus/" + caseId)
        .post()
        .then(
            data => {
                StatusBarDecrLongrunner.decrLongrunner();
                return data;
            },
            err => {
                StatusBarDecrLongrunner.decrLongrunner();
                Logger.log("MoCaseBtnApiUtils switchExportStatus " + caseId, LogLevel.Error, { err: err });
                return "Запрос был отклонён сервером " + caseId;
            }
        );
    return task;
}

export default {
    addRefuse,
    removeRefuse,
    acceptCase,
    undoAcceptCase,
    addRefuseTemplate,
    removeRefuseTemplate,
    updateComment,
    switchExportStatus
};