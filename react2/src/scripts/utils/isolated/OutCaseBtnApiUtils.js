"use strict";

import $http from "../../common/Ajax";

import Globals from "../../Globals";
const ServerPath = Globals.SERVER_PATH;

import { LogLevel } from "../../common/LogLevel";
import Logger from "../../common/Logger";

import StatusBarIncrLongrunner from "../../actions/StatusBarIncrLongrunner";
import StatusBarDecrLongrunner from "../../actions/StatusBarDecrLongrunner";

function createD(caseIds) {
    let rslt = new Promise((resolve, reject) => {
        if (caseIds == null || !Array.isArray(caseIds) || caseIds.length == 0)
            return;
        StatusBarIncrLongrunner.incrLongrunner();
        let tasks = [];
        caseIds.forEach(caseId => {
            tasks.push($http(ServerPath + "outputStream/OutCaseDOps/OutCreateCaseD/" + caseId)
                .post()
                .then(data => {
                    return Object.assign({}, data, { originId: caseId });
                })
                .catch(err => {
                    Logger.log("OutCaseBtnApiUtils createD " + caseId, LogLevel.Error, { err: err });
                    return "Запрос был отклонён сервером " + caseId;
                }));
        });
        Promise.all(tasks)
            .then(data => {
                StatusBarDecrLongrunner.decrLongrunner();
                resolve(data);
            },
                err => {
                    StatusBarDecrLongrunner.decrLongrunner();
                    reject(err);
                });
    });
    return rslt;
}

function removeD(id) {
    if (id == null)
        return;
    StatusBarIncrLongrunner.incrLongrunner();
    let task = $http(ServerPath + "outputStream/OutCaseDOps/OutRemoveCaseD/" + id)
        .post()
        .then(data => {
            StatusBarDecrLongrunner.decrLongrunner();
            return data;
        },
            err => {
                StatusBarDecrLongrunner.decrLongrunner();
                return { error: err};
            });
    return task;
}

function addRefuse(caseId, refuseIds, comment, data) {
    let rslt = new Promise((resolve, reject) => {
        if (caseId == null  || !Array.isArray(refuseIds)/* || refuseIds.length == 0*/) {
            return;
        }
        if (refuseIds.length > 1) {
            comment = null;
        }
        StatusBarIncrLongrunner.incrLongrunner();
        let tasks = [];
        for (let refuseId of refuseIds) {
            let opts = {
                comment: comment,
                typeExp: data.typeExp,
                sumExp: data.sumExp,
                actNum: data.actNum,
                actDate: data.actDate,
                expLst: Object.keys(data.expLst),
                expMeeCode: data.expMeeCode
            };
            tasks.push($http(ServerPath + "outputStream/OutCaseDOps/OutAddRefuseD/" + caseId + "/" + refuseId)
                .post(opts)
                .then(data => {
                    return data;
                },
                    err => {
                        Logger.log("OutCaseBtnApiUtils addRefuse " + caseId, LogLevel.Error, { err: err });
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

function removeRefuse(refuseId) {
    if (refuseId == null) {
        return Promise.reject("Недопустимое значение аргументов");
    }
    StatusBarIncrLongrunner.incrLongrunner();
    let task = $http(ServerPath + "outputStream/OutCaseDOps/OutRemoveRefuseD/" + refuseId)
        .post()
        .then(
            data => {
                StatusBarDecrLongrunner.decrLongrunner();
                return data;
            },
            err => {
                StatusBarDecrLongrunner.decrLongrunner();
                Logger.log("OutCaseBtnApiUtils removeRefuse " + refuseId, LogLevel.Error, { err: err });
                return "Запрос был отклонён сервером " + refuseId;
            });
    return task;
}

function addMoRequest(caseId, date, text) {
    if (caseId == null) {
        return Promise.reject("Некорректный идентификатор случая");
    }
    if (date == null/* || text == null || text === ""*/) {
        return Promise.reject("Некорректныt параметры запроса");
    }
    StatusBarIncrLongrunner.incrLongrunner();
    let opts = {
        date,
        text
    };
    let task = $http(ServerPath + "outputStream/OutCaseDOps/OutCreateMoRequest/" + caseId)
        .post(opts)
        .then(data => {
            StatusBarDecrLongrunner.decrLongrunner();
            return data;
        },
            err => {
                Logger.log("OutCaseBtnApiUtils addMoRequest " + caseId, LogLevel.Error, { err: err });
                StatusBarDecrLongrunner.decrLongrunner();
                return "Запрос был отклонён сервером " + caseId;
            });
    return task;
}

function removeMoRequest(id) {
    if (id == null)
        return;
    StatusBarIncrLongrunner.incrLongrunner();
    let task = $http(ServerPath + "outputStream/OutCaseDOps/OutRemoveMoRequest/" + id)
        .post()
        .then(data => {
            StatusBarDecrLongrunner.decrLongrunner();
            return data;
        },
            err => {
                StatusBarDecrLongrunner.decrLongrunner();
                return err;
            });
    return task;
}

function addRefuseTemplate(refuseId, comment) {
    if (refuseId == null) {
        return Promise.reject("Недопустимое значение аргументов");;
    }
    StatusBarIncrLongrunner.incrLongrunner();
    let task = $http(ServerPath + "outputStream/OutUserSankCode/AddUserDefinedRefuse/")
        .post({
            SankId: refuseId,
            UserComment: comment
        })
        .then(
            data => {
                StatusBarDecrLongrunner.decrLongrunner();
                return data;
            },
            err => {
                StatusBarDecrLongrunner.decrLongrunner();
                Logger.log("OutCaseBtnApiUtils addRefuseTemplate " + refuseId, LogLevel.Error, { err: err });
                return "Запрос на добавление шаблона отказа был отклонён сервером";
            }
        );
    return task;
}

function removeRefuseTemplate(templateId) {
    if (templateId == null) {
        return Promise.reject("Недопустимое значение аргументов");;
    }
    StatusBarIncrLongrunner.incrLongrunner();
    let task = $http(ServerPath + "outputStream/OutUserSankCode/RemoveUserDefinedRefuse/")
        .post(templateId)
        .then(
            data => {
                StatusBarDecrLongrunner.decrLongrunner();
                return data;
            },
            err => {
                StatusBarDecrLongrunner.decrLongrunner();
                Logger.log("OutCaseBtnApiUtils removeRefuseTemplate " + templateId, LogLevel.Error, { err: err });
                return "Запрос на удаление шаблона отказа был отклонён сервером";
            }
        );
    return task;
}

function getDRaw(idCase) {
    if (idCase == null) {
        return Promise.reject("Недопустимое значение аргументов");;
    }
    StatusBarIncrLongrunner.incrLongrunner();
    let task = $http(ServerPath + `outputStream/OutCaseDOps/OutGetDRaw/${idCase}`)
        .post()
        .then(
            data => {
                StatusBarDecrLongrunner.decrLongrunner();
                return data;
            },
            err => {
                StatusBarDecrLongrunner.decrLongrunner();
                Logger.log("OutCaseBtnApiUtils getDRaw " + idCase, LogLevel.Error, { err: err });
                return "Запрос данных отклонён сервером";
            }
        );
    return task;
}

function updateD(changes) {
    if (changes == null) {
        return Promise.reject("Недопустимое значение аргументов");;
    }
    StatusBarIncrLongrunner.incrLongrunner();
    let task = $http(ServerPath + `outputStream/OutCaseDOps/OutUpdateDFields/`)
        .post(changes)
        .then(
            data => {
                StatusBarDecrLongrunner.decrLongrunner();
                return data;
            },
            err => {
                StatusBarDecrLongrunner.decrLongrunner();
                Logger.log("OutCaseBtnApiUtils updateD " + changes, LogLevel.Error, { err: err });
                return "Запрос данных отклонён сервером";
            }
        );
    return task;
}

export default {
    createD,
    removeD,
    addRefuse,
    removeRefuse,
    addMoRequest,
    removeMoRequest,
    addRefuseTemplate,
    removeRefuseTemplate,
    getDRaw,
    updateD
};