"use strict";

import $http from "../../common/Ajax";

import Globals from "../../Globals";
const ServerPath = Globals.SERVER_PATH;

import { LogLevel } from "../../common/LogLevel";
import Logger from "../../common/Logger";

import StatusBarIncrLongrunner from "../../actions/StatusBarIncrLongrunner";
import StatusBarDecrLongrunner from "../../actions/StatusBarDecrLongrunner";

function groupRequestsToLetter(id) {
    if (id === null) {
        return Promise.reject("Недопустимое значение аргументов");
    }
    StatusBarIncrLongrunner.incrLongrunner();
    let task = $http(ServerPath + "outputStream/OutMoRequestOps/OutMoGroupRequestsToLetter/" + id)
        .post()
        .then(
            data => {
                StatusBarDecrLongrunner.decrLongrunner();
                return data;
            },
            err => {
                StatusBarDecrLongrunner.decrLongrunner();
                Logger.log("OutLettersApiUtils groupRequestsToLetter " + id, LogLevel.Error, { err: err });
                return "Запрос был отклонён сервером " + id;
            });
    return task;
}

function ungroupLetterToRaw(id) {
    if (id === null) {
        return Promise.reject("Недопустимое значение аргументов");
    }
    StatusBarIncrLongrunner.incrLongrunner();
    let task = $http(ServerPath + "outputStream/OutMoRequestOps/OutUngroupLetterToRaw/" + id)
        .post()
        .then(
            data => {
                StatusBarDecrLongrunner.decrLongrunner();
                return data;
            },
            err => {
                StatusBarDecrLongrunner.decrLongrunner();
                Logger.log("OutLettersApiUtils groupRequestsToLetter " + id, LogLevel.Error, { err: err });
                return "Запрос был отклонён сервером " + id;
            });
    return task;
}


function sendToExcluded(id) {
    if (id === null) {
        return Promise.reject("Недопустимое значение аргументов");
    }
    StatusBarIncrLongrunner.incrLongrunner();
    let task = $http(ServerPath + "outputStream/OutMoRequestOps/OutMoExcludeAsFinishedRequestsFromLetterOrNew/" + id)
        .post()
        .then(
            data => {
                StatusBarDecrLongrunner.decrLongrunner();
                return data;
            },
            err => {
                StatusBarDecrLongrunner.decrLongrunner();
                Logger.log("OutLettersApiUtils sendToExcluded " + id, LogLevel.Error, { err: err });
                return "Запрос был отклонён сервером " + id;
            });
    return task;
}

function sendToArch(id) {
    if (id === null) {
        return Promise.reject("Недопустимое значение аргументов");
    }
    StatusBarIncrLongrunner.incrLongrunner();
    let task = $http(ServerPath + "outputStream/OutMoRequestOps/OutMoSendLetterToArchive/" + id)
        .post()
        .then(
            data => {
                StatusBarDecrLongrunner.decrLongrunner();
                return data;
            },
            err => {
                StatusBarDecrLongrunner.decrLongrunner();
                Logger.log("OutLettersApiUtils sendToArch " + id, LogLevel.Error, { err: err });
                return "Запрос был отклонён сервером " + id;
            });
    return task;
}

function sendToNew(id) {
    if (id === null) {
        return Promise.reject("Недопустимое значение аргументов");
    }
    StatusBarIncrLongrunner.incrLongrunner();
    let task = $http(ServerPath + "outputStream/OutMoRequestOps/OutMoExcludeAsNewRequestsFromLetter/" + id)
        .post()
        .then(
            data => {
                StatusBarDecrLongrunner.decrLongrunner();
                return data;
            },
            err => {
                StatusBarDecrLongrunner.decrLongrunner();
                Logger.log("OutLettersApiUtils sendToNew " + id, LogLevel.Error, { err: err });
                return "Запрос был отклонён сервером " + id;
            });
    return task;
}

function turnBackToNewOrLettered(id) {
    if (id === null) {
        return Promise.reject("Недопустимое значение аргументов");
    }
    StatusBarIncrLongrunner.incrLongrunner();
    let task = $http(ServerPath + "outputStream/OutMoRequestOps/OutMoIncludeFinishedRequestsBackToLetterOrNew/" + id)
        .post()
        .then(
            data => {
                StatusBarDecrLongrunner.decrLongrunner();
                return data;
            },
            err => {
                StatusBarDecrLongrunner.decrLongrunner();
                Logger.log("OutLettersApiUtils turnBackToNewOrLettered " + id, LogLevel.Error, { err: err });
                return "Запрос был отклонён сервером " + id;
            });
    return task;
}

export default {
    groupRequestsToLetter,
    sendToExcluded,
    sendToArch,
    ungroupLetterToRaw,
    sendToNew,
    turnBackToNewOrLettered
};