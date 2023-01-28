"use strict";

import  $http from "../../common/Ajax";

import Globals from "../../Globals";
const ServerPath=Globals.SERVER_PATH;

import {LogLevel} from "../../common/LogLevel";
import Logger from "../../common/Logger";

import StatusBarIncrLongrunner from "../../actions/StatusBarIncrLongrunner";
import StatusBarDecrLongrunner from "../../actions/StatusBarDecrLongrunner";

function addInMedOrgPlan(idMedOrg, year, uslOk, volumeAll, volumeFed, moneyAll, moneyFed)
{
    if (idMedOrg==null||idMedOrg==""||year==null||uslOk==null||volumeAll==null||volumeFed==null||moneyAll==null||moneyFed==null)
        {
            return Promise.reject("Ошибка в данных");
        }
        StatusBarIncrLongrunner.incrLongrunner();
        return $http(ServerPath+"/misc/InMedOrgPlanOps/InAddMedOrgPlan")
        .post({medOrgId:idMedOrg, year, uslOk, volumeAll, volumeFed, moneyAll, moneyFed})
        .then(data=>{
            StatusBarDecrLongrunner.decrLongrunner();
            return data;
        },
        err=>{
            Logger.log("InMedOrgPlanOps InAddMedOrgPlan "+{idMedOrg, year, uslOk, volumeAll, volumeFed, moneyAll, moneyFed}, LogLevel.Error, {err:err});
            StatusBarDecrLongrunner.decrLongrunner();
            return "Запрос был отклонён сервером ("+{idMedOrg, year, uslOk, volumeAll, volumeFed, moneyAll, moneyFed}+")";
        });
}

function removeInMedOrgPlan(id)
{
    if (id==null)
    {
        return Promise.reject("Ошибка в данных");
    }
    StatusBarIncrLongrunner.incrLongrunner();
    return $http(ServerPath+"/misc/InMedOrgPlanOps/InRemoveMedOrgPlan/"+id)
    .post()
    .then(data=>{
        StatusBarDecrLongrunner.decrLongrunner();
        return data;
    },
    err=>{
        Logger.log("InMedOrgPlanOps InRemoveMedOrgPlan "+id, LogLevel.Error, {err:err});
        StatusBarDecrLongrunner.decrLongrunner();
        return "Запрос был отклонён сервером ("+id+")";
    });
}

function updateInMedOrgPlan(id, volumeAll, volumeFed, moneyAll, moneyFed)
{
    if (volumeAll==null||volumeFed==null||moneyAll==null||moneyFed==null)
    {
        return Promise.reject("Ошибка в данных");
    }
    const rx = new RegExp("^[0-9]{1,10}(\.[0-9]{1,2}){0,1}$");
    if (!rx.test(volumeAll)) {
        return Promise.reject(`Некорректный объём (общ.) ${volumeAll}`);
    }
    if (!rx.test(volumeFed)) {
        return Promise.reject(`Некорректный объём (фед.) ${volumeFed}`);
    }
    if (!rx.test(moneyAll)) {
        return Promise.reject(`Некорректная сумма (общ.) ${moneyAll}`);
    }
    if (!rx.test(moneyFed)) {
        return Promise.reject(`Некорректная сумма (фед.) ${moneyFed}`);
    }
    StatusBarIncrLongrunner.incrLongrunner();
    return $http(ServerPath+"/misc/InMedOrgPlanOps/InUpdateMedOrgPlan")
    .post({id, volumeAll, volumeFed, moneyAll, moneyFed})
    .then(data=>{
        StatusBarDecrLongrunner.decrLongrunner();
        return data;
    },
    err=>{
        Logger.log("InMedOrgPlanOps InUpdateMedOrgPlan "+{id, volumeAll, volumeFed, moneyAll, moneyFed}, LogLevel.Error, {err:err});
        StatusBarDecrLongrunner.decrLongrunner();
        return "Запрос был отклонён сервером ("+{id, volumeAll, volumeFed, moneyAll, moneyFed}+")";
    });
}

export {addInMedOrgPlan, removeInMedOrgPlan, updateInMedOrgPlan};