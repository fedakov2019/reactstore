"use strict";

import $http from "../../common/Ajax";

import Globals from "../../Globals";
const ServerPath = Globals.SERVER_PATH;

import { LogLevel } from "../../common/LogLevel";
import Logger from "../../common/Logger";

import StatusBarIncrLongrunner from "../../actions/StatusBarIncrLongrunner";
import StatusBarDecrLongrunner from "../../actions/StatusBarDecrLongrunner";

function getRegShortInfo(idRegistry) {
    StatusBarIncrLongrunner.incrLongrunner();
    return $http(ServerPath + "/OutputStream/OutRegistryOps/OutGetShortInfo/" + idRegistry)
        .post()
        .then(data => {
            StatusBarDecrLongrunner.decrLongrunner();
            return data;
        },
        err => {
            StatusBarDecrLongrunner.decrLongrunner();
            Logger.log("OutRegistryApiUtils OutGetShortInfo " + idRegistry, LogLevel.Error, { err: err });
            return "Запрос был отклонён сервером (" + idRegistry + ")";
        });
}

function generateR(date) {
    StatusBarIncrLongrunner.incrLongrunner();
    return $http(ServerPath + "/OutputStream/OutRegistryOps/CreateRegistryRPack/")
        .post(date)
        .then(data => {
            StatusBarDecrLongrunner.decrLongrunner();
            return data;
        },
        err => {
            StatusBarDecrLongrunner.decrLongrunner();
            Logger.log("OutRegistryApiUtils CreateRegistryRPack " + date, LogLevel.Error, { err: err });
            return "Запрос был отклонён сервером (" + date + ")";
        });
}

function undoCreateRegisrty(idRegistry) {
    StatusBarIncrLongrunner.incrLongrunner();
    return $http(ServerPath + "/OutputStream/OutRegistryOps/UndoCreateRegistryR/" + idRegistry)
        .post()
        .then(data => {
            StatusBarDecrLongrunner.decrLongrunner();
            return data;
        },
        err => {
            StatusBarDecrLongrunner.decrLongrunner();
            Logger.log("OutRegistryApiUtils UndoCreateRegistryR " + idRegistry, LogLevel.Error, { err: err });
            return "Запрос был отклонён сервером (" + idRegistry + ")";
        });
}

function sendFile(idRegistry) {
    StatusBarIncrLongrunner.incrLongrunner();
    StatusBarIncrLongrunner.incrLongrunner();
    return $http(ServerPath + "/OutputStream/OutFileOps/SendRegistryFile/" + idRegistry)
        .post()
        .then(data => {
                StatusBarDecrLongrunner.decrLongrunner();
                return data;
            },
            err => {
                StatusBarDecrLongrunner.decrLongrunner();
                Logger.log("OutFileOps SendRegistryFile " + idRegistry, LogLevel.Error, { err: err });
                return "Запрос был отклонён сервером (" + idRegistry + ")";
            });
}

function createDRegisrty(idRegistry) {
    StatusBarIncrLongrunner.incrLongrunner();
    return $http(ServerPath + "/OutputStream/OutRegistryOps/CreateRegistryD/" + idRegistry)
        .post()
        .then(data => {
                StatusBarDecrLongrunner.decrLongrunner();
                return data;
            },
            err => {
                StatusBarDecrLongrunner.decrLongrunner();
                Logger.log("OutRegistryApiUtils CreateRegistryD " + idRegistry, LogLevel.Error, { err: err });
                return "Запрос был отклонён сервером (" + idRegistry + ")";
            });
}

function undoCreateDRegisrty(idRegistry) {
    StatusBarIncrLongrunner.incrLongrunner();
    return $http(ServerPath + "/OutputStream/OutRegistryOps/UndoCreateRegistryD/" + idRegistry)
        .post()
        .then(data => {
                StatusBarDecrLongrunner.decrLongrunner();
                return data;
            },
            err => {
                StatusBarDecrLongrunner.decrLongrunner();
                Logger.log("OutRegistryApiUtils UndoCreateRegistryD " + idRegistry, LogLevel.Error, { err: err });
                return "Запрос был отклонён сервером (" + idRegistry + ")";
            });
}

function updateMtrPayOrderDate(idRegistry, date) {
    StatusBarIncrLongrunner.incrLongrunner();
    StatusBarIncrLongrunner.incrLongrunner();
    return $http(ServerPath + "/OutputStream/OutRegistryOps/OutUpdatePaymentOrderMtr/" + idRegistry)
        .post(date)
        .then(data => {
                StatusBarDecrLongrunner.decrLongrunner();
                return data;
            },
            err => {
                StatusBarDecrLongrunner.decrLongrunner();
                Logger.log("OutFileOps updateMtrPayOrderDate " + idRegistry, LogLevel.Error, { err: err });
                return "Запрос был отклонён сервером (" + idRegistry + ")";
            });
}

function updateRegistrationDate(idRegistry, date) {
    StatusBarIncrLongrunner.incrLongrunner();
    StatusBarIncrLongrunner.incrLongrunner();
    return $http(ServerPath + "/OutputStream/OutRegistryOps/OutUpdateRegistrationDate/" + idRegistry)
        .post(date)
        .then(data => {
                StatusBarDecrLongrunner.decrLongrunner();
                return data;
            },
            err => {
                StatusBarDecrLongrunner.decrLongrunner();
                Logger.log("OutFileOps updateRegistrationDate " + idRegistry, LogLevel.Error, { err: err });
                return "Запрос был отклонён сервером (" + idRegistry + ")";
            });
}

export default {
    getRegShortInfo,
    generateR,
    undoCreateRegisrty,
    sendFile,
    createDRegisrty,
    undoCreateDRegisrty,
    updateMtrPayOrderDate,
    updateRegistrationDate
};